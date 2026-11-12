import Link from "next/link"
import { Logo } from "@/components/brand/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { TERMINOS_FECHA, TERMINOS_SECCIONES, TERMINOS_VERSION } from "@/lib/terminos"

export const metadata = { title: "Términos y condiciones · COGIT" }

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background/90 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <Link href="/" aria-label="COGIT, inicio" className="flex min-h-11 items-center">
            <Logo className="h-8 w-auto" />
          </Link>
          <ThemeToggle />
        </div>
      </header>
      <main className="container mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-bold">Términos y condiciones</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Versión {TERMINOS_VERSION} · vigente desde el <time dateTime={TERMINOS_FECHA}>{TERMINOS_FECHA}</time>
        </p>
        <div className="mt-8 space-y-6">
          {TERMINOS_SECCIONES.map((s) => (
            <section key={s.titulo}>
              <h2 className="text-xl font-semibold">{s.titulo}</h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">{s.texto}</p>
            </section>
          ))}
        </div>
        <p className="mt-10">
          <Link href="/registro" className="inline-flex min-h-11 items-center text-purple-400 hover:text-purple-300">
            Volver al registro
          </Link>
        </p>
      </main>
    </div>
  )
}
