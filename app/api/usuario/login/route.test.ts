import { beforeEach, describe, expect, it, vi } from "vitest"
import { NextRequest } from "next/server"

// Almacén en memoria de la tabla LimiteLogin para probar el bloqueo sin base de datos.
const h = vi.hoisted(() => ({
  filas: new Map<string, { clave: string; intentos: number; desde: Date }>(),
  usuario: null as null | Record<string, unknown>,
}))

vi.mock("@/lib/neuronas", () => ({ sincronizarNeuronas: vi.fn() }))
vi.mock("@/lib/prisma", () => ({
  prisma: {
    usuario: { findUnique: async () => h.usuario, update: async () => h.usuario },
    limiteLogin: {
      findUnique: async ({ where }: { where: { clave: string } }) => h.filas.get(where.clave) ?? null,
      upsert: async ({ where, create, update }: { where: { clave: string }; create: { clave: string; intentos: number; desde: Date }; update: { intentos: number; desde: Date } }) => {
        h.filas.set(where.clave, h.filas.has(where.clave) ? { ...h.filas.get(where.clave)!, ...update } : create)
      },
      update: async ({ where }: { where: { clave: string } }) => {
        const f = h.filas.get(where.clave)!
        f.intentos++
      },
      deleteMany: async ({ where }: { where: { clave: string } }) => void h.filas.delete(where.clave),
    },
  },
}))

import { POST } from "./route"
import { hashPassword } from "@/lib/auth"

const login = (username: string, password: string) =>
  POST(
    new NextRequest("http://localhost/api/usuario/login", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.1" },
      body: JSON.stringify({ username, password }),
    }),
  )

beforeEach(async () => {
  h.filas.clear()
  h.usuario = { id: 1, username: "ana", email: "a@a.co", rol: "estudiante", modoPruebas: false, neuronas: 5, maxNeuronas: 5, ultimaRecarga: null, password: await hashPassword("claveCorrecta1") }
})

describe("límite de intentos de inicio de sesión (REQ-017)", () => {
  it("tras 5 fallos bloquea con 429 y Retry-After, incluso con la contraseña correcta", async () => {
    for (let i = 0; i < 5; i++) expect((await login("ana", "mala")).status).toBe(401)
    const r = await login("ana", "claveCorrecta1")
    expect(r.status).toBe(429)
    expect(Number(r.headers.get("Retry-After"))).toBeGreaterThan(0)
  })

  it("un acceso correcto reinicia el contador del usuario", async () => {
    for (let i = 0; i < 4; i++) await login("ana", "mala")
    expect((await login("ana", "claveCorrecta1")).status).toBe(200)
    for (let i = 0; i < 4; i++) expect((await login("ana", "mala")).status).toBe(401)
  })

  it("pasada la ventana vuelve a permitir intentar", async () => {
    for (let i = 0; i < 5; i++) await login("ana", "mala")
    const f = h.filas.get("u:ana")!
    f.desde = new Date(Date.now() - 16 * 60 * 1000)
    expect((await login("ana", "claveCorrecta1")).status).toBe(200)
  })
})
