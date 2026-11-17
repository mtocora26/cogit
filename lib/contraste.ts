/** Contraste WCAG entre dos colores HSL ("h s% l%") de los tokens de globals.css. */

function aRgb(hsl: string): [number, number, number] {
  const [h, s, l] = hsl.trim().split(/\s+/).map((v) => parseFloat(v))
  const sat = s / 100
  const lig = l / 100
  const k = (n: number) => (n + h / 30) % 12
  const a = sat * Math.min(lig, 1 - lig)
  const f = (n: number) => lig - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  return [f(0), f(8), f(4)]
}

function luminancia([r, g, b]: [number, number, number]) {
  const c = (v: number) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)
  return 0.2126 * c(r) + 0.7152 * c(g) + 0.0722 * c(b)
}

export function contraste(a: string, b: string): number {
  const [x, y] = [luminancia(aRgb(a)), luminancia(aRgb(b))].sort((p, q) => q - p)
  return (x + 0.05) / (y + 0.05)
}

/** Lee los tokens `--nombre: h s% l%` de un bloque (`:root` o `.dark`) de globals.css. */
export function leerTokens(css: string, selector: ":root" | ".dark"): Record<string, string> {
  const ini = css.indexOf(`${selector} {`)
  const fin = css.indexOf("}", ini)
  const tokens: Record<string, string> = {}
  for (const m of css.slice(ini, fin).matchAll(/--([\w-]+):\s*([\d.]+\s+[\d.]+%\s+[\d.]+%)\s*;/g)) tokens[m[1]] = m[2]
  return tokens
}
