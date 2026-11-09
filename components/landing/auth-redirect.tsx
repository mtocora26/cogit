"use client"

import { useEffect } from "react"

/** Quien ya tiene sesión válida no necesita la landing: va directo a lo suyo. */
export default function AuthRedirect() {
  useEffect(() => {
    fetch("/api/usuario/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((u) => {
        if (u?.id) {
          window.location.replace(u.rol === "admin" ? "/admin" : "/misiones")
        } else {
          // Sesión vencida: se limpia lo que quedó guardado en el navegador.
          try {
            localStorage.removeItem("usuario")
            localStorage.removeItem("userId")
            localStorage.removeItem("userRol")
          } catch {
            /* localStorage bloqueado */
          }
        }
      })
      .catch(() => {})
  }, [])
  return null
}
