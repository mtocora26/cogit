import { beforeEach, describe, expect, it, vi } from "vitest"
import { NextRequest, NextResponse } from "next/server"

const h = vi.hoisted(() => ({
  getSession: vi.fn(),
  findUnique: vi.fn(),
  upsert: vi.fn(),
  deleteMany: vi.fn(),
}))
vi.mock("@/lib/auth", () => ({
  getSession: (req: unknown) => h.getSession(req),
  unauthorized: () => NextResponse.json({ error: "No autenticado" }, { status: 401 }),
  forbidden: () => NextResponse.json({ error: "Acceso denegado" }, { status: 403 }),
}))
vi.mock("@/lib/prisma", () => ({
  prisma: {
    progreso: { findUnique: (a: unknown) => h.findUnique(a), upsert: (a: unknown) => h.upsert(a) },
    progresoParcial: { deleteMany: (a: unknown) => h.deleteMany(a) },
  },
}))

import { POST } from "./route"

const post = (body: unknown) =>
  new NextRequest("http://localhost/api/progreso", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
const resultado = (extra: Record<string, unknown> = {}) => ({
  seccion: "minijuegos",
  nivel: "sudoku",
  actividad: "medio",
  completado: true,
  tiempo: 120,
  ...extra,
})

beforeEach(() => {
  h.getSession.mockReset().mockResolvedValue({ uid: 7, rol: "estudiante" })
  h.findUnique.mockReset().mockResolvedValue(null)
  h.upsert.mockReset().mockImplementation(async (a: { create: unknown }) => a.create)
  h.deleteMany.mockReset()
})

describe("POST /api/progreso con minijuegos", () => {
  it("sin sesión recibe 401", async () => {
    h.getSession.mockResolvedValue(null)
    expect((await POST(post(resultado()))).status).toBe(401)
  })

  it("guarda el resultado con los puntos del nivel, no los del cliente", async () => {
    const res = await POST(post(resultado({ score: 99999 })))
    expect(res.status).toBe(200)
    const { create } = h.upsert.mock.calls[0][0]
    expect(create).toMatchObject({ userId: 7, seccion: "minijuegos", nivel: "sudoku", actividad: "medio", score: 20, tiempo: 120 })
  })

  it("repetir un nivel no suma puntos y conserva el mejor tiempo", async () => {
    h.findUnique.mockResolvedValue({ completado: true, score: 20, tiempo: 90 })
    await POST(post(resultado({ tiempo: 150 })))
    expect(h.upsert.mock.calls[0][0].update).toMatchObject({ score: 20, tiempo: 90 })
    await POST(post(resultado({ tiempo: 60 })))
    expect(h.upsert.mock.calls[1][0].update).toMatchObject({ score: 20, tiempo: 60 })
  })

  it("rechaza juegos o niveles desconocidos y resultados sin completar", async () => {
    expect((await POST(post(resultado({ nivel: "ajedrez" })))).status).toBe(400)
    expect((await POST(post(resultado({ actividad: "imposible" })))).status).toBe(400)
    expect((await POST(post(resultado({ completado: false })))).status).toBe(400)
    expect((await POST(post(resultado({ tiempo: -5 })))).status).toBe(400)
    expect(h.upsert).not.toHaveBeenCalled()
  })
})
