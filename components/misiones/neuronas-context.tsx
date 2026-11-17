"use client"

import React, { createContext, useCallback, useContext, useEffect, useRef, useState, ReactNode } from "react"
import { usePathname } from "next/navigation"

/** Estado de neuronas que devuelve /api/usuario/neuronas. El servidor es la única fuente de verdad. */
interface EstadoServidor {
  neuronas: number
  maxNeuronas: number
  segundosParaRecarga: number
  modoPruebas: boolean
}

interface NeuronasContextType {
  neuronas: number
  maxNeuronas: number
  /** Cuenta de pruebas: no pierde neuronas. */
  modoPruebas: boolean
  /** Sin neuronas no se puede jugar (nunca ocurre en modo pruebas). */
  sinNeuronas: boolean
  recargando: boolean
  /** Segundos que faltan para recuperar la próxima neurona. */
  segundosRecarga: number
  /** Descuenta una neurona por un error: se ve al instante y se guarda en la cuenta. */
  perderNeurona: () => void
  refrescar: () => Promise<void>
}

const NeuronasContext = createContext<NeuronasContextType | undefined>(undefined)

export function NeuronasProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [estado, setEstado] = useState<Omit<EstadoServidor, "segundosParaRecarga">>({ neuronas: 5, maxNeuronas: 5, modoPruebas: false })
  // Momento (ms) en que llega la próxima neurona; null si están completas.
  const [proxima, setProxima] = useState<number | null>(null)
  const [segundosRecarga, setSegundosRecarga] = useState(0)
  const pendientes = useRef(0)

  const aplicar = useCallback((e: EstadoServidor) => {
    setEstado({ neuronas: e.neuronas, maxNeuronas: e.maxNeuronas, modoPruebas: e.modoPruebas })
    setProxima(e.segundosParaRecarga > 0 ? Date.now() + e.segundosParaRecarga * 1000 : null)
  }, [])

  const refrescar = useCallback(async () => {
    try {
      const res = await fetch("/api/usuario/neuronas", { cache: "no-store" })
      // Si hay descuentos en vuelo, su respuesta es más reciente que esta lectura.
      if (res.ok && pendientes.current === 0) aplicar(await res.json())
    } catch {}
  }, [aplicar])

  // Al montar, al cambiar de pantalla (p. ej. tras el login) y al volver a la pestaña.
  useEffect(() => {
    refrescar()
  }, [pathname, refrescar])
  useEffect(() => {
    const alVolver = () => document.visibilityState === "visible" && refrescar()
    document.addEventListener("visibilitychange", alVolver)
    return () => document.removeEventListener("visibilitychange", alVolver)
  }, [refrescar])

  // Cuenta atrás de la próxima neurona; al llegar a 0 se pide el estado ya recargado al servidor.
  useEffect(() => {
    if (proxima === null) {
      setSegundosRecarga(0)
      return
    }
    const tick = () => {
      const s = Math.max(0, Math.ceil((proxima - Date.now()) / 1000))
      setSegundosRecarga(s)
      if (s === 0) refrescar()
    }
    tick()
    const t = setInterval(tick, 1000)
    return () => clearInterval(t)
  }, [proxima, refrescar])

  const perderNeurona = useCallback(() => {
    if (estado.modoPruebas) return
    setEstado((e) => ({ ...e, neuronas: Math.max(0, e.neuronas - 1) }))
    setProxima((p) => p ?? Date.now() + 30 * 60 * 1000)
    pendientes.current++
    fetch("/api/usuario/neuronas", { method: "POST" })
      .then(async (res) => {
        pendientes.current--
        if (res.ok && pendientes.current === 0) aplicar(await res.json())
      })
      .catch(() => {
        pendientes.current--
      })
  }, [estado.modoPruebas, aplicar])

  return (
    <NeuronasContext.Provider
      value={{
        ...estado,
        sinNeuronas: !estado.modoPruebas && estado.neuronas <= 0,
        recargando: proxima !== null,
        segundosRecarga,
        perderNeurona,
        refrescar,
      }}
    >
      {children}
    </NeuronasContext.Provider>
  )
}

export function useNeuronas() {
  const ctx = useContext(NeuronasContext)
  if (!ctx) throw new Error("useNeuronas must be used within a NeuronasProvider")
  return ctx
}
