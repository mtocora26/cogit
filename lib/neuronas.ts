import { prisma } from "@/lib/prisma"

/** Una neurona se recupera cada 30 minutos. Es la única regla de recarga de la plataforma. */
export const MINUTOS_RECARGA = 30
const MS_RECARGA = MINUTOS_RECARGA * 60 * 1000

export interface EstadoNeuronas {
  neuronas: number
  maxNeuronas: number
  /** Segundos que faltan para la próxima neurona; 0 si están completas. */
  segundosParaRecarga: number
  /** Cuenta de pruebas: no pierde neuronas. */
  modoPruebas: boolean
}

type Fila = { id: number; neuronas: number; maxNeuronas: number; ultimaRecarga: Date | null; modoPruebas: boolean }

function estado(f: { neuronas: number; maxNeuronas: number; ultimaRecarga: Date | null; modoPruebas: boolean }): EstadoNeuronas {
  const max = f.maxNeuronas || 5
  const falta =
    f.neuronas >= max || !f.ultimaRecarga
      ? 0
      : Math.max(1, Math.ceil((f.ultimaRecarga.getTime() + MS_RECARGA - Date.now()) / 1000))
  return { neuronas: f.neuronas, maxNeuronas: max, segundosParaRecarga: falta, modoPruebas: f.modoPruebas }
}

/** Aplica las recargas pendientes y guarda el resultado. Se usa al entrar y al consultar. */
export async function sincronizarNeuronas(userId: number): Promise<EstadoNeuronas | null> {
  const u: Fila | null = await prisma.usuario.findUnique({
    where: { id: userId },
    select: { id: true, neuronas: true, maxNeuronas: true, ultimaRecarga: true, modoPruebas: true },
  })
  if (!u) return null
  const max = u.maxNeuronas || 5
  if (u.modoPruebas && u.neuronas < max) {
    const a = await prisma.usuario.update({ where: { id: userId }, data: { neuronas: max }, select: { neuronas: true, maxNeuronas: true, ultimaRecarga: true, modoPruebas: true } })
    return estado(a)
  }
  if (u.neuronas >= max) return estado(u)
  const base = (u.ultimaRecarga ?? new Date()).getTime()
  const recargas = Math.floor((Date.now() - base) / MS_RECARGA)
  if (recargas <= 0) return estado({ ...u, ultimaRecarga: u.ultimaRecarga ?? new Date(base) })
  const neuronas = Math.min(max, u.neuronas + recargas)
  const a = await prisma.usuario.update({
    where: { id: userId },
    data: { neuronas, ultimaRecarga: new Date(base + recargas * MS_RECARGA) },
    select: { neuronas: true, maxNeuronas: true, ultimaRecarga: true, modoPruebas: true },
  })
  return estado(a)
}

/** Descuenta una neurona por un error. Nunca baja de 0 y no descuenta en modo pruebas. */
export async function perderNeurona(userId: number): Promise<EstadoNeuronas | null> {
  const actual = await sincronizarNeuronas(userId)
  if (!actual || actual.modoPruebas || actual.neuronas <= 0) return actual
  // Si estaban completas, la cuenta atrás empieza ahora (no desde la última recarga antigua).
  const empezar = actual.neuronas >= actual.maxNeuronas
  const r = await prisma.usuario.updateMany({
    where: { id: userId, neuronas: { gt: 0 } },
    data: { neuronas: { decrement: 1 }, ...(empezar ? { ultimaRecarga: new Date() } : {}) },
  })
  return r.count ? sincronizarNeuronas(userId) : actual
}
