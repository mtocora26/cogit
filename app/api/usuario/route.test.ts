import { beforeEach, describe, expect, it, vi } from "vitest"
import { NextRequest } from "next/server"

const h = vi.hoisted(() => ({ findUnique: vi.fn(), create: vi.fn() }))
vi.mock("@/lib/prisma", () => ({
  prisma: { usuario: { findUnique: (a: unknown) => h.findUnique(a), create: (a: unknown) => h.create(a) } },
}))

import { POST } from "./route"
import { TERMINOS_VERSION } from "@/lib/terminos"

const post = (body: unknown) =>
  new NextRequest("http://localhost/api/usuario", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
const datos = (extra: Record<string, unknown> = {}) => ({
  username: "ana_01",
  email: "ana@example.com",
  password: "unaClaveLarga1",
  aceptaTerminos: true,
  ...extra,
})

beforeEach(() => {
  h.findUnique.mockReset().mockResolvedValue(null)
  h.create.mockReset().mockImplementation(async (a: { data: Record<string, unknown> }) => ({ id: 1, ...a.data }))
})

describe("POST /api/usuario: términos y condiciones", () => {
  it.each([[undefined], [false], ["true"]])("sin aceptación explícita (%s) no crea la cuenta", async (v) => {
    const res = await POST(post(datos({ aceptaTerminos: v })))
    expect(res.status).toBe(400)
    expect((await res.json()).error).toBe("Debes aceptar los términos y condiciones")
    expect(h.create).not.toHaveBeenCalled()
  })

  it("con aceptación crea la cuenta y guarda versión y fecha", async () => {
    const res = await POST(post(datos()))
    expect(res.status).toBe(200)
    const { data } = h.create.mock.calls[0][0]
    expect(data.terminosVersion).toBe(TERMINOS_VERSION)
    expect(data.terminosAceptadosEn).toBeInstanceOf(Date)
    expect(data.rol).toBe("estudiante")
  })
})
