import { beforeEach, describe, expect, it, vi } from "vitest"
import { NextRequest } from "next/server"

const h = vi.hoisted(() => ({ findUnique: vi.fn() }))
vi.mock("@/lib/prisma", () => ({ prisma: { usuario: { findUnique: (a: unknown) => h.findUnique(a) } } }))

import { getSession } from "@/lib/auth"
import { SESSION_COOKIE, huellaPassword, signSession } from "@/lib/session"

const conCookie = (token: string) =>
  new NextRequest("http://localhost/api/x", { headers: { cookie: `${SESSION_COOKIE}=${token}` } })

beforeEach(() => h.findUnique.mockReset())

describe("sesión ligada a la contraseña (REQ-017)", () => {
  it("vale mientras la contraseña no cambie", async () => {
    h.findUnique.mockResolvedValue({ password: "scrypt$a$b" })
    const token = await signSession(3, "estudiante", await huellaPassword("scrypt$a$b"))
    expect((await getSession(conCookie(token)))?.uid).toBe(3)
  })

  it("deja de valer cuando la contraseña cambia", async () => {
    const token = await signSession(3, "estudiante", await huellaPassword("scrypt$a$b"))
    h.findUnique.mockResolvedValue({ password: "scrypt$otra$nueva" })
    expect(await getSession(conCookie(token))).toBeNull()
  })

  it("deja de valer si la cuenta ya no existe", async () => {
    const token = await signSession(3, "estudiante", await huellaPassword("x"))
    h.findUnique.mockResolvedValue(null)
    expect(await getSession(conCookie(token))).toBeNull()
  })

  it("una cookie anterior sin huella sigue valiendo hasta que expire", async () => {
    const token = await signSession(3, "estudiante")
    expect((await getSession(conCookie(token)))?.uid).toBe(3)
    expect(h.findUnique).not.toHaveBeenCalled()
  })
})
