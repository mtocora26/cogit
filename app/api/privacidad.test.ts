import { beforeEach, describe, expect, it, vi } from "vitest"
import { NextRequest, NextResponse } from "next/server"

// REQ-016: una cuenta no puede consultar datos privados de otra; el ranking no expone correo ni contraseña.
const h = vi.hoisted(() => ({ getSession: vi.fn(), progresoFindMany: vi.fn(), usuarioFindMany: vi.fn() }))
vi.mock("@/lib/auth", () => ({
  getSession: (r: unknown) => h.getSession(r),
  unauthorized: () => NextResponse.json({ error: "No autenticado" }, { status: 401 }),
  forbidden: () => NextResponse.json({ error: "Acceso denegado" }, { status: 403 }),
}))
vi.mock("@/lib/prisma", () => ({
  prisma: {
    progreso: { findMany: (a: unknown) => h.progresoFindMany(a) },
    usuario: { findMany: (a: unknown) => h.usuarioFindMany(a) },
  },
}))

import { GET as progreso } from "./progreso/route"
import { GET as ranking } from "./ranking/route"

const get = (url: string) => new NextRequest(`http://localhost${url}`)

beforeEach(() => {
  h.getSession.mockReset()
  h.progresoFindMany.mockReset().mockResolvedValue([])
  h.usuarioFindMany.mockReset().mockResolvedValue([])
})

describe("GET /api/progreso", () => {
  it("un estudiante no puede consultar el progreso de otra cuenta", async () => {
    h.getSession.mockResolvedValue({ uid: 1, rol: "estudiante" })
    const res = await progreso(get("/api/progreso?userId=2"))
    expect(res.status).toBe(403)
    expect(h.progresoFindMany).not.toHaveBeenCalled()
  })

  it("sin userId devuelve solo el progreso de la propia cuenta", async () => {
    h.getSession.mockResolvedValue({ uid: 1, rol: "estudiante" })
    await progreso(get("/api/progreso"))
    expect(h.progresoFindMany.mock.calls[0][0].where).toEqual({ userId: 1 })
  })

  it("un administrador sí puede consultar otra cuenta", async () => {
    h.getSession.mockResolvedValue({ uid: 9, rol: "admin" })
    expect((await progreso(get("/api/progreso?userId=2"))).status).toBe(200)
    expect(h.progresoFindMany.mock.calls[0][0].where).toEqual({ userId: 2 })
  })

  it("sin sesión recibe 401", async () => {
    h.getSession.mockResolvedValue(null)
    expect((await progreso(get("/api/progreso"))).status).toBe(401)
  })
})

describe("GET /api/ranking", () => {
  it.each(["alltime", "weekly"])("(%s) no pide ni devuelve correo ni contraseña", async (type) => {
    h.usuarioFindMany.mockResolvedValue([{ id: 1, username: "ana", rol: "estudiante", progreso: [{ score: 10 }] }])
    const res = await ranking(get(`/api/ranking?type=${type}`))
    const select = h.usuarioFindMany.mock.calls[0][0].select
    expect(Object.keys(select)).not.toContain("email")
    expect(Object.keys(select)).not.toContain("password")
    expect(await res.json()).toEqual([{ id: 1, name: "ana", points: 10, rank: 1 }])
  })

  it("solo incluye a quienes aceptan aparecer", async () => {
    await ranking(get("/api/ranking"))
    expect(h.usuarioFindMany.mock.calls[0][0].where.visibleEnRanking).toBe(true)
  })
})
