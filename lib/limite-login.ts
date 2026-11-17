import { prisma } from "@/lib/prisma"

/** REQ-017: tras demasiados fallos seguidos se bloquea el acceso un rato, por usuario y por IP. */
export const VENTANA_MS = 15 * 60 * 1000
export const MAX_POR_USUARIO = 5
export const MAX_POR_IP = 30

export const claveUsuario = (u: string) => `u:${u}`
export const claveIp = (ip: string) => `ip:${ip}`

export function ipDe(req: { headers: Headers }): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "desconocida"
}

/** Segundos que faltan para poder reintentar; 0 si no está bloqueado. */
export async function segundosBloqueado(clave: string, max: number, ahora = Date.now()): Promise<number> {
  const f = await prisma.limiteLogin.findUnique({ where: { clave } })
  if (!f || f.intentos < max) return 0
  const faltan = f.desde.getTime() + VENTANA_MS - ahora
  return faltan > 0 ? Math.ceil(faltan / 1000) : 0
}

export async function registrarFallo(clave: string, ahora = Date.now()): Promise<void> {
  const f = await prisma.limiteLogin.findUnique({ where: { clave } })
  if (!f || f.desde.getTime() + VENTANA_MS <= ahora) {
    await prisma.limiteLogin.upsert({
      where: { clave },
      create: { clave, intentos: 1, desde: new Date(ahora) },
      update: { intentos: 1, desde: new Date(ahora) },
    })
    return
  }
  await prisma.limiteLogin.update({ where: { clave }, data: { intentos: { increment: 1 } } })
}

export async function limpiarFallos(clave: string): Promise<void> {
  await prisma.limiteLogin.deleteMany({ where: { clave } })
}
