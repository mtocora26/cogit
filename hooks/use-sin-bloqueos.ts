"use client"

import { useEffect, useState } from "react"

interface UsuarioLocal {
  id?: number
  rol?: string
  modoPruebas?: boolean
}

/**
 * Indica si la cuenta actual debe ver el contenido sin bloqueos (admin o modo pruebas).
 * Lee localStorage y, si el dato está desactualizado, lo refresca desde /api/usuario/me.
 * Así no hace falta cerrar sesión después de activar `modoPruebas` en la base.
 */
export function useSinBloqueos() {
  const [sinBloqueos, setSinBloqueos] = useState(false)
  const [modoPruebas, setModoPruebas] = useState(false)

  useEffect(() => {
    let cancel = false

    const aplicar = (u: UsuarioLocal | null) => {
      if (cancel || !u) return
      setSinBloqueos(u.rol === "admin" || u.modoPruebas === true)
      setModoPruebas(u.modoPruebas === true)
    }

    try {
      const raw = localStorage.getItem("usuario")
      if (raw) {
        const u = JSON.parse(raw) as UsuarioLocal
        aplicar(u)
        // Si el navegador ya tiene el campo, no hace falta consultar la sesión otra vez.
        if (typeof u.modoPruebas === "boolean") return
      }
    } catch {}

    fetch("/api/usuario/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((u: UsuarioLocal | null) => {
        aplicar(u)
        if (u?.id) {
          try {
            localStorage.setItem("usuario", JSON.stringify(u))
            localStorage.setItem("userId", String(u.id))
            localStorage.setItem("userRol", u.rol ?? "estudiante")
          } catch {}
        }
      })
      .catch(() => {})

    return () => {
      cancel = true
    }
  }, [])

  return { sinBloqueos, modoPruebas }
}
