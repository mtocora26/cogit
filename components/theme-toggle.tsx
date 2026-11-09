"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

/** Cambia entre modo claro y oscuro. El estado real se lee tras montar para no desajustar la hidratación. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const dark = mounted ? resolvedTheme === "dark" : true
  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className={`grid h-11 w-11 place-items-center rounded-md text-muted-foreground transition-[background-color,color,transform] duration-150 ease-out-strong hover:bg-accent hover:text-foreground active:scale-[0.97] ${className}`}
    >
      {dark ? <Sun aria-hidden className="h-5 w-5" /> : <Moon aria-hidden className="h-5 w-5" />}
    </button>
  )
}
