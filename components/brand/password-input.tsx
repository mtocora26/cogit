"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

type PasswordInputProps = Omit<React.ComponentProps<"input">, "type">

/**
 * Campo de contraseña con botón para mostrarla u ocultarla.
 * Por defecto va oculta. El botón se opera con teclado, tiene foco visible, un área táctil de
 * 44 px y un nombre accesible que cambia según el estado.
 */
export function PasswordInput({ className = "", ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false)
  return (
    <div className="relative">
      <input {...props} type={visible ? "text" : "password"} className={`${className} pr-12`} />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
        className="absolute inset-y-0 right-0 grid w-11 place-items-center rounded-md text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {visible ? <EyeOff aria-hidden className="h-5 w-5" /> : <Eye aria-hidden className="h-5 w-5" />}
      </button>
    </div>
  )
}
