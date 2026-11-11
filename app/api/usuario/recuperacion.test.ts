import { beforeEach, describe, expect, it, vi } from "vitest"
import { NextRequest } from "next/server"

const h = vi.hoisted(() => ({
  usuarioFind: vi.fn(),
  usuarioUpdate: vi.fn(),
  recFind: vi.fn(),
  recFindFirst: vi.fn(),
  recCreate: vi.fn(),
  recDeleteMany: vi.fn(),
  recUpdateMany: vi.fn(),
  tx: vi.fn(),
  enviar: vi.fn(),
  despues: [] as (() => Promise<void>)[],
}))
vi.mock("next/server", async (orig) => ({
  ...(await orig<typeof import("next/server")>()),
  after: (fn: () => Promise<void>) => h.despues.push(fn),
}))
vi.mock("@/lib/prisma", () => ({
  prisma: {
    usuario: { findUnique: (a: unknown) => h.usuarioFind(a), update: (a: unknown) => h.usuarioUpdate(a) },
    recuperacionPassword: {
      findUnique: (a: unknown) => h.recFind(a),
      findFirst: (a: unknown) => h.recFindFirst(a),
      create: (a: unknown) => h.recCreate(a),
      deleteMany: (a: unknown) => h.recDeleteMany(a),
      updateMany: (a: unknown) => h.recUpdateMany(a),
    },
    $transaction: (ops: unknown[]) => h.tx(ops),
  },
}))
vi.mock("@/lib/correo", () => ({ enviarCorreo: (c: unknown) => h.enviar(c) }))

import { POST as recuperar } from "./recuperar/route"
import { POST as restablecer } from "./restablecer/route"
import { hashToken, MENSAJE_RECUPERACION } from "@/lib/recuperacion"
import { verifyPassword } from "@/lib/auth"

const post = (url: string, body: unknown) =>
  new NextRequest(`http://localhost${url}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

beforeEach(() => {
  for (const f of [h.usuarioFind, h.usuarioUpdate, h.recFind, h.recFindFirst, h.recCreate, h.recDeleteMany, h.recUpdateMany, h.tx, h.enviar]) f.mockReset()
  h.despues.length = 0
  h.recFindFirst.mockResolvedValue(null)
  h.tx.mockResolvedValue([])
  h.enviar.mockResolvedValue(true)
})

describe("POST /api/usuario/recuperar", () => {
  it("responde lo mismo exista o no la cuenta y solo envía si existe", async () => {
    h.usuarioFind.mockResolvedValueOnce(null)
    const a = await recuperar(post("/api/usuario/recuperar", { email: "nadie@example.com" }))
    h.usuarioFind.mockResolvedValueOnce({ id: 3, username: "ana", email: "ana@example.com" })
    const b = await recuperar(post("/api/usuario/recuperar", { email: "ana@example.com" }))
    expect(a.status).toBe(200)
    expect(b.status).toBe(200)
    expect(await a.json()).toEqual({ mensaje: MENSAJE_RECUPERACION })
    expect(await b.json()).toEqual({ mensaje: MENSAJE_RECUPERACION })
    expect(h.despues).toHaveLength(1) // el correo se envía después de responder
    await h.despues[0]()
    expect(h.enviar).toHaveBeenCalledOnce()
  })

  it("guarda solo el hash del enlace y el enlace lleva el token", async () => {
    h.usuarioFind.mockResolvedValue({ id: 3, username: "ana", email: "ana@example.com" })
    await recuperar(post("/api/usuario/recuperar", { email: "Ana@Example.com" }))
    await h.despues[0]()
    const correo = h.enviar.mock.calls[0][0]
    const token = /token=([\w-]+)/.exec(correo.text)![1]
    expect(h.recCreate.mock.calls[0][0].data.tokenHash).toBe(hashToken(token))
    expect(h.recCreate.mock.calls[0][0].data.tokenHash).not.toContain(token)
    expect(h.recCreate.mock.calls[0][0].data.expiraEn.getTime()).toBeGreaterThan(Date.now())
    expect(correo.to).toBe("ana@example.com")
  })

  it("no envía otro enlace si se pidió uno hace menos de un minuto", async () => {
    h.usuarioFind.mockResolvedValue({ id: 3, username: "ana", email: "ana@example.com" })
    h.recFindFirst.mockResolvedValue({ id: 1 })
    const res = await recuperar(post("/api/usuario/recuperar", { email: "ana@example.com" }))
    expect(res.status).toBe(200)
    expect(h.despues).toHaveLength(0)
  })

  it("rechaza un correo mal escrito", async () => {
    expect((await recuperar(post("/api/usuario/recuperar", { email: "no-es-correo" }))).status).toBe(400)
  })
})

describe("POST /api/usuario/restablecer", () => {
  const vigente = (extra = {}) => ({ id: 9, userId: 3, usadoEn: null, expiraEn: new Date(Date.now() + 60_000), ...extra })

  it("cambia la contraseña con un enlace vigente, la guarda cifrada y lo gasta", async () => {
    h.recFind.mockResolvedValue(vigente())
    h.recUpdateMany.mockResolvedValue({ count: 1 })
    const res = await restablecer(post("/api/usuario/restablecer", { token: "abc", password: "nuevaClave123" }))
    expect(res.status).toBe(200)
    expect(h.recFind.mock.calls[0][0].where.tokenHash).toBe(hashToken("abc"))
    const guardada = h.usuarioUpdate.mock.calls[0][0].data.password as string
    expect(guardada).not.toContain("nuevaClave123")
    expect((await verifyPassword(guardada, "nuevaClave123")).ok).toBe(true)
    expect(h.recDeleteMany).toHaveBeenCalled()
  })

  it.each([
    ["inexistente", null],
    ["vencido", vigente({ expiraEn: new Date(Date.now() - 1000) })],
    ["ya usado", vigente({ usadoEn: new Date() })],
  ])("rechaza un enlace %s", async (_n, registro) => {
    h.recFind.mockResolvedValue(registro)
    const res = await restablecer(post("/api/usuario/restablecer", { token: "abc", password: "nuevaClave123" }))
    expect(res.status).toBe(400)
    expect(h.usuarioUpdate).not.toHaveBeenCalled()
  })

  it("si otra petición gastó el enlace al mismo tiempo, no cambia nada", async () => {
    h.recFind.mockResolvedValue(vigente())
    h.recUpdateMany.mockResolvedValue({ count: 0 })
    const res = await restablecer(post("/api/usuario/restablecer", { token: "abc", password: "nuevaClave123" }))
    expect(res.status).toBe(400)
    expect(h.usuarioUpdate).not.toHaveBeenCalled()
  })

  it("exige una contraseña de al menos 8 caracteres", async () => {
    const res = await restablecer(post("/api/usuario/restablecer", { token: "abc", password: "corta" }))
    expect(res.status).toBe(400)
    expect(h.recFind).not.toHaveBeenCalled()
  })
})
