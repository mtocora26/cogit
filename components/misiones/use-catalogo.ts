"use client"

import { useEffect, useState } from "react"
import { CatalogoSchema, type Catalogo } from "@/lib/contenido-schema"
import { CATALOGO_INICIAL } from "@/lib/misiones-catalogo"

let ultimo: Catalogo | null = null

/**
 * Catálogo de misiones tal como está en la base (validado). `null` mientras carga; si no se puede leer,
 * se usa el contenido inicial para que la app siga funcionando.
 */
export function useCatalogo(): Catalogo | null {
  const [catalogo, setCatalogo] = useState<Catalogo | null>(ultimo)
  useEffect(() => {
    let cancel = false
    fetch("/api/misiones/catalogo", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j) => {
        const p = CatalogoSchema.safeParse(j)
        ultimo = p.success ? p.data : (ultimo ?? CATALOGO_INICIAL)
      })
      .catch(() => {
        ultimo = ultimo ?? CATALOGO_INICIAL
      })
      .finally(() => !cancel && setCatalogo(ultimo))
    return () => {
      cancel = true
    }
  }, [])
  return catalogo
}
