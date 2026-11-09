"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

interface PasswordInputProps extends Omit<React.ComponentProps<"input">, "type"> {
  /** Controla la visibilidad desde fuera, para que un solo botón maneje varios campos. */
  visible?: boolean
  onVisibleChange?: (visible: boolean) => void
  /** false: solo el campo, sin botón (útil para el campo de confirmación). */
  showToggle?: boolean
}

/**
 * Campo de contraseña con botón para mostrarla u ocultarla.
 * Por defecto va oculta. El botón se opera con teclado, tiene foco visible, un área táctil de
 * 44 px y un nombre accesible que cambia según el estado.
 */
export function PasswordInput({
  className = "",
  visible: visibleProp,
  onVisibleChange,
  showToggle = true,
  ...props
}: PasswordInputProps) {
  const [inner, setInner] = useState(false)
  const visible = visibleProp ?? inner
  const toggle = () => {
    onVisibleChange?.(!visible)
    if (visibleProp === undefined) setInner(!visible)
  }

  if (!showToggle) return <input {...props} type={visible ? "text" : "password"} className={className} />

  return (
    <div className="relative">
      <input {...props} type={visible ? "text" : "password"} className={`${className} pr-12`} />
      <button
        type="button"
        onClick={toggle}
        aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
        className="absolute inset-y-0 right-0 grid w-11 place-items-center rounded-md text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {visible ? <EyeOff aria-hidden className="h-5 w-5" /> : <Eye aria-hidden className="h-5 w-5" />}
      </button>
    </div>
  )
}
