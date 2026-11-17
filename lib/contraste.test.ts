import { readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"
import { contraste, leerTokens } from "@/lib/contraste"

// REQ-014: el texto normal debe tener al menos 4.5:1 de contraste en ambos temas.
const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8")

// [texto, fondo]: combinaciones que usan las pantallas (texto sobre página, tarjetas, paneles y botones).
const PARES: [string, string][] = [
  ["foreground", "background"],
  ["card-foreground", "card"],
  ["popover-foreground", "popover"],
  ["secondary-foreground", "secondary"],
  ["accent-foreground", "accent"],
  ["muted-foreground", "background"],
  ["muted-foreground", "card"],
  ["muted-foreground", "secondary"],
  ["primary-foreground", "primary"],
  ["destructive-foreground", "destructive"],
  ["neuron", "background"],
  ["neuron", "card"],
  ["neuron", "secondary"],
  ["signal", "background"],
  ["signal", "card"],
  ["destructive", "background"],
  // Escala de grises usada como texto secundario (text-gray-300/400).
  ["g-300", "background"],
  ["g-400", "background"],
  ["g-400", "card"],
  ["g-400", "secondary"],
]

describe.each([
  ["claro", ":root" as const],
  ["oscuro", ".dark" as const],
])("contraste del tema %s", (_nombre, selector) => {
  const t = { ...leerTokens(css, ":root"), ...leerTokens(css, selector) }
  it.each(PARES)("%s sobre %s ≥ 4.5:1", (texto, fondo) => {
    expect(t[texto], `falta el token ${texto}`).toBeDefined()
    expect(t[fondo], `falta el token ${fondo}`).toBeDefined()
    expect(contraste(t[texto], t[fondo])).toBeGreaterThanOrEqual(4.5)
  })
})
