import { beforeEach, describe, expect, it, vi } from "vitest"
import { NextRequest, NextResponse } from "next/server"

const h = vi.hoisted(() => ({ getSession: vi.fn(), findUnique: vi.fn(), update: vi.fn(), deleteMany: vi.fn() }))
vi.mock("@/lib/auth", async (orig) => ({
  ...(await orig<typeof import("@/lib/auth")>()),
  getSession: (r: unknown) => h.getSession(r),
  unauthorized: () => NextResponse.json({ error: "No autenticado" }, { status: 401 }),
}))
vi.mock("@/lib/prisma", () => ({
  prisma: {
    usuario: { findUnique: (a: unknown) => h.findUnique(a), update: (a: unknown) => h.update(a) },
    recuperacionPassword: { deleteMany: (a: unknown) => h.deleteMany(a) },
  },
}))

import { POST } from "./route"
import { hashPassword, verifyPassword } from "@/lib/auth"

const post = (body: unknown) =>
  new NextRequest("http://localhost/api/usuario/cambiar-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

beforeEach(async () => {
  h.getSession.mockReset().mockResolvedValue({ uid: 4, rol: "estudiante" })
  h.findUnique.mockReset().mockResolvedValue({ id: 4, password: await hashPassword("claveActual1") })
  h.update.mockReset()
  h.deleteMany.mockReset()
})

describe("POST /api/usuario/cambiar-password", () => {
  it("sin sesión recibe 401", async () => {
    h.getSession.mockResolvedValue(null)
    expect((await POST(post({ actual: "claveActual1", nueva: "otraClave123" }))).status).toBe(401)
  })

  it("con la contraseña actual correcta guarda la nueva cifrada", async () => {
    const res = await POST(post({ actual: "claveActual1", nueva: "otraClave123" }))
    expect(res.status).toBe(200)
    const guardada = h.update.mock.calls[0][0].data.password as string
    expect(guardada).not.toContain("otraClave123")
    expect((await verifyPassword(guardada, "otraClave123")).ok).toBe(true)
    expect(h.deleteMany).toHaveBeenCalled()
  })

  it("rechaza una contraseña actual incorrecta sin cambiar nada", async () => {
    const res = await POST(post({ actual: "equivocada", nueva: "otraClave123" }))
    expect(res.status).toBe(400)
    expect(h.update).not.toHaveBeenCalled()
  })

  it("rechaza una nueva corta o igual a la actual", async () => {
    expect((await POST(post({ actual: "claveActual1", nueva: "corta" }))).status).toBe(400)
    expect((await POST(post({ actual: "claveActual1", nueva: "claveActual1" }))).status).toBe(400)
    expect(h.update).not.toHaveBeenCalled()
  })
})
