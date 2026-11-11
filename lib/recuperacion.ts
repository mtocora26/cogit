import { createHash, randomBytes } from "node:crypto"

export const VIGENCIA_MINUTOS = 60
export const ESPERA_SEGUNDOS = 60
export const MENSAJE_RECUPERACION =
  "Si ese correo tiene una cuenta, te enviamos un enlace para restablecer tu contraseña. Revisa tu bandeja y la carpeta de spam."

/** Token aleatorio de 256 bits para el enlace. Solo se guarda su hash. */
export function nuevoToken(): string {
  return randomBytes(32).toString("base64url")
}

export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex")
}

/** Dirección pública de la app para armar el enlace. En producción es obligatoria (evita enlaces con un Host manipulado). */
export function urlBase(origenPeticion: string): string {
  const fija = process.env.APP_URL?.replace(/\/+$/, "")
  if (fija) return fija
  if (process.env.NODE_ENV === "production") throw new Error("Falta APP_URL")
  return origenPeticion
}

const ESCAPES: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }
const escapar = (s: string) => s.replace(/[&<>"']/g, (c) => ESCAPES[c])

export function correoRecuperacion(username: string, enlace: string) {
  const text = `Hola ${username},\n\nRecibimos una solicitud para restablecer tu contraseña de COGIT. Abre este enlace (vale ${VIGENCIA_MINUTOS} minutos y solo se puede usar una vez):\n\n${enlace}\n\nSi no fuiste tú, ignora este correo: tu contraseña no cambia.`
  const html = `<p>Hola ${escapar(username)},</p><p>Recibimos una solicitud para restablecer tu contraseña de COGIT. El enlace vale ${VIGENCIA_MINUTOS} minutos y solo se puede usar una vez.</p><p><a href="${escapar(enlace)}">Restablecer mi contraseña</a></p><p>Si no fuiste tú, ignora este correo: tu contraseña no cambia.</p>`
  return { subject: "Restablece tu contraseña de COGIT", text, html }
}
