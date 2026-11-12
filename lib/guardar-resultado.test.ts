import { afterEach, describe, expect, it, vi } from "vitest"
import { guardarResultado } from "@/lib/guardar-resultado"

// REQ-018: un guardado fallido nunca se da por bueno: lanza un error que la pantalla muestra, y se puede reintentar.
afterEach(() => vi.unstubAllGlobals())
const respuesta = (status: number) => vi.fn().mockResolvedValue({ ok: status >= 200 && status < 300, status })

describe("guardarResultado", () => {
  it("si el servidor responde bien, termina sin error", async () => {
    vi.stubGlobal("fetch", respuesta(200))
    await expect(guardarResultado("sudoku", "facil", 90)).resolves.toBeUndefined()
  })
  it("si el servidor falla, lanza un error", async () => {
    vi.stubGlobal("fetch", respuesta(500))
    await expect(guardarResultado("sudoku", "facil", 90)).rejects.toThrow("No se pudo guardar")
  })
  it("sin sesión pide iniciar sesión", async () => {
    vi.stubGlobal("fetch", respuesta(401))
    await expect(guardarResultado("sudoku", "facil", 90)).rejects.toThrow("Inicia sesión")
  })
  it("sin conexión lanza un error y un segundo intento puede tener éxito", async () => {
    const fetchMock = vi.fn().mockRejectedValueOnce(new TypeError("red")).mockResolvedValueOnce({ ok: true, status: 200 })
    vi.stubGlobal("fetch", fetchMock)
    await expect(guardarResultado("robot", "3", 40)).rejects.toThrow("No hay conexión")
    await expect(guardarResultado("robot", "3", 40)).resolves.toBeUndefined()
  })
})
