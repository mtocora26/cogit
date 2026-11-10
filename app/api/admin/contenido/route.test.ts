import { beforeEach, describe, expect, it, vi } from "vitest"
import { NextRequest, NextResponse } from "next/server"
import { CATALOGO_INICIAL } from "@/lib/misiones-catalogo"

// Dobles: el guardia (un estudiante recibe 403, un administrador pasa) y el guardado en la base.
const h = vi.hoisted(() => {
  class NivelNoEncontrado extends Error {}
  return { requireAdmin: vi.fn(), guardarNivel: vi.fn(), NivelNoEncontrado }
})
vi.mock("@/lib/admin-guard", () => ({ requireAdmin: (req: unknown) => h.requireAdmin(req) }))
vi.mock("@/lib/contenido", () => ({
  guardarNivel: (n: unknown) => h.guardarNivel(n),
  leerCatalogo: async () => CATALOGO_INICIAL,
  NivelNoEncontrado: h.NivelNoEncontrado,
}))
const requireAdmin = h.requireAdmin
const guardarNivel = h.guardarNivel
const NivelNoEncontrado = h.NivelNoEncontrado

import { PUT } from "./route"

const peticion = (body: unknown) =>
  new NextRequest("http://localhost/api/admin/contenido", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  })
const nivelValido = () => JSON.parse(JSON.stringify(CATALOGO_INICIAL.niveles[0]))

beforeEach(() => {
  requireAdmin.mockReset()
  guardarNivel.mockReset()
})

describe("PUT /api/admin/contenido", () => {
  it("un estudiante recibe 403 y no se guarda nada", async () => {
    requireAdmin.mockResolvedValue(NextResponse.json({ error: "Acceso denegado" }, { status: 403 }))
    const res = await PUT(peticion({ nivel: nivelValido() }))
    expect(res.status).toBe(403)
    expect(guardarNivel).not.toHaveBeenCalled()
  })

  it("sin sesión recibe 401", async () => {
    requireAdmin.mockResolvedValue(NextResponse.json({ error: "No autenticado" }, { status: 401 }))
    const res = await PUT(peticion({ nivel: nivelValido() }))
    expect(res.status).toBe(401)
    expect(guardarNivel).not.toHaveBeenCalled()
  })

  it("un administrador guarda contenido válido y se refleja en el catálogo devuelto", async () => {
    requireAdmin.mockResolvedValue({ id: 1 })
    const nivel = nivelValido()
    nivel.objetivo = "Nuevo objetivo del nivel"
    nivel.actividades[0].minutos = 5
    const res = await PUT(peticion({ nivel }))
    expect(res.status).toBe(200)
    expect(guardarNivel).toHaveBeenCalledTimes(1)
    expect(guardarNivel.mock.calls[0][0]).toMatchObject({ objetivo: "Nuevo objetivo del nivel" })
    expect(guardarNivel.mock.calls[0][0].actividades[0].minutos).toBe(5)
    expect((await res.json()).niveles).toBeDefined()
  })

  it("rechaza contenido inválido (400) sin tocar la base, indicando el campo", async () => {
    requireAdmin.mockResolvedValue({ id: 1 })
    const nivel = nivelValido()
    nivel.actividades[1].minutos = 0
    nivel.actividades[2].juego = "no-existe"
    nivel.objetivo = "   "
    const res = await PUT(peticion({ nivel }))
    expect(res.status).toBe(400)
    const j = await res.json()
    const campos = j.detalles.map((d: { campo: string }) => d.campo)
    expect(campos).toContain("objetivo")
    expect(campos).toContain("actividades.1.minutos")
    expect(campos).toContain("actividades.2.juego")
    expect(guardarNivel).not.toHaveBeenCalled()
  })

  it("rechaza un cuerpo que no es JSON o no trae el nivel", async () => {
    requireAdmin.mockResolvedValue({ id: 1 })
    expect((await PUT(peticion("no es json"))).status).toBe(400)
    expect((await PUT(peticion({}))).status).toBe(400)
    expect(guardarNivel).not.toHaveBeenCalled()
  })

  it("si el nivel aún no está en la base responde 409", async () => {
    requireAdmin.mockResolvedValue({ id: 1 })
    guardarNivel.mockRejectedValue(new NivelNoEncontrado("1"))
    const res = await PUT(peticion({ nivel: nivelValido() }))
    expect(res.status).toBe(409)
  })
})
