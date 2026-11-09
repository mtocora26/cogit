import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/brand/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import AuthRedirect from "@/components/landing/auth-redirect"
import Loom from "@/components/landing/loom"
import NonogramDemo from "@/components/landing/nonogram-demo"
import { MissionTrace, RobotPreview, SudokuPreview } from "@/components/landing/previews"

const press = "transition-[background-color,color,transform] duration-150 ease-out-strong active:scale-[0.97]"

const SKILLS = [
  { name: "Descomposición", text: "Partir un problema grande en pasos pequeños." },
  { name: "Patrones", text: "Ver lo que se repite para no resolverlo dos veces." },
  { name: "Abstracción", text: "Quedarte con lo importante y dejar el ruido." },
  { name: "Algoritmos", text: "Ordenar instrucciones para llegar a la meta." },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AuthRedirect />

      <header className="absolute inset-x-0 top-0 z-50">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <Link href="/" aria-label="COGIT, inicio" className="flex min-h-11 items-center">
            <Logo className="h-9 w-auto sm:h-10" />
          </Link>
          <nav aria-label="Cuenta" className="flex items-center gap-1 sm:gap-2">
            <ThemeToggle />
            <Button asChild variant="ghost" className={`min-h-11 px-2 text-sm sm:px-4 sm:text-base ${press}`}>
              <Link href="/login">Ingresar</Link>
            </Button>
            <Button asChild variant="outline" className={`min-h-11 px-3 text-sm sm:px-4 sm:text-base ${press}`}>
              <Link href="/registro">Crear cuenta</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main>
        {/* Primera pantalla: el telar. Las perforaciones deciden la tela. */}
        <section className="relative pt-20 sm:pt-28">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16">
            <div>
              <h1 className="font-display text-4xl font-bold leading-[1.04] sm:text-6xl lg:text-7xl">
                Programa el patrón.
                <br />
                <span className="text-neuron">Mira cómo se teje.</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-xl">
                Misiones cortas y minijuegos de lógica para tus ratos entre clases. Cada instrucción que das cambia el
                resultado, y no necesitas saber programar.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className={`min-h-12 px-8 text-base ${press}`}>
                  <Link href="/registro">Empezar misión</Link>
                </Button>
                <Link
                  href="/login"
                  className="inline-flex min-h-11 items-center px-2 text-sm text-muted-foreground underline-offset-4 transition-colors duration-150 hover:text-foreground hover:underline"
                >
                  Ya tengo cuenta
                </Link>
              </div>
            </div>

            <Link
              href="/registro"
              className={`group hidden self-start rounded-md border border-border bg-[hsl(var(--punch))] p-5 text-[#0B0E1C] lg:block ${press} hover:-translate-y-0.5`}
            >
              <span className="block text-xl font-semibold">Siguiente tarjeta</span>
              <span className="mt-1 block text-sm text-[#2d3358]">Descomposición · Misión 1</span>
              <span aria-hidden className="mt-4 flex gap-1.5">
                {[1, 0, 1, 1, 0, 1, 0, 0, 1, 1].map((on, i) => (
                  <span key={i} className={`h-2.5 flex-1 rounded-[2px] ${on ? "bg-[#0B0E1C]" : "bg-[hsl(245_55%_84%)]"}`} />
                ))}
              </span>
            </Link>
          </div>

          <div className="mt-6 sm:mt-10">
            <Loom />
          </div>
        </section>

        {/* Prueba real: el primer nivel se juega aquí mismo */}
        <section className="border-t border-border bg-loom">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] lg:gap-16 lg:py-24">
            <div>
              <h2 className="font-display text-3xl font-semibold sm:text-4xl">Pruébalo ahora, sin cuenta.</h2>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">
                Este es un nonograma, uno de los minijuegos de COGIT. Los números dicen cuántas casillas seguidas van
                rellenas en cada fila y columna: razona, no adivines.
              </p>
            </div>
            <NonogramDemo />
          </div>
        </section>

        {/* Qué se entrena: una sola banda perforada con cuatro habilidades */}
        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <h2 className="max-w-2xl font-display text-3xl font-semibold sm:text-4xl">
            Cuatro formas de pensar, una misión a la vez.
          </h2>
          <ol className="mt-10 overflow-hidden rounded-xl bg-[hsl(var(--punch))] text-[#0B0E1C]">
            {SKILLS.map((s, i) => (
              <li
                key={s.name}
                className="grid items-center gap-x-8 gap-y-3 px-5 py-5 sm:px-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] [&:not(:first-child)]:border-t [&:not(:first-child)]:border-[hsl(245_55%_84%)]"
              >
                <div>
                  <h3 className="font-display text-xl font-semibold">{s.name}</h3>
                  <p className="mt-1 text-[#2d3358]">{s.text}</p>
                </div>
                <span aria-hidden className="flex gap-1.5">
                  {Array.from({ length: 16 }, (_, k) => (
                    <span
                      key={k}
                      className={`h-3 flex-1 rounded-[2px] ${(Math.min(k, 15 - k) * (i + 2) + i) % 4 < 2 ? "bg-[#0B0E1C]" : "bg-[hsl(245_55%_84%)]"}`}
                    />
                  ))}
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-14">
            <MissionTrace />
          </div>
        </section>

        {/* Minijuegos */}
        <section className="border-t border-border bg-card/40">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:py-24">
            <div className="lg:col-span-5">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-2xl font-semibold">Sudoku</h3>
                <span className="text-xs text-muted-foreground">Vista ilustrativa</span>
              </div>
              <p className="mt-2 text-muted-foreground">Razona qué número va en cada casilla sin adivinar.</p>
              <div className="mt-6">
                <SudokuPreview />
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-2xl font-semibold">Robot Programmer</h3>
                <span className="text-xs text-muted-foreground">Vista ilustrativa</span>
              </div>
              <div className="mt-2 flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
                <p className="max-w-xs text-muted-foreground">
                  Ordena instrucciones para guiar al robot hasta la meta. Es tu primer algoritmo.
                </p>
                <RobotPreview />
              </div>
            </div>
          </div>
        </section>

        {/* Reglas del juego */}
        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <h2 className="max-w-2xl font-display text-3xl font-semibold sm:text-4xl">Fallar no te saca del juego.</h2>
          <div className="mt-10">
            <div className="flex items-center gap-3">
              <span aria-hidden className="flex gap-1">{[1, 1, 1, 1, 0].map((on, i) => <span key={i} className={`h-5 w-3 rounded-[3px] ${on ? "bg-neuron" : "bg-border"}`} />)}</span>
              <h3 className="font-display text-2xl font-semibold">Neuronas</h3>
            </div>
            <p className="mt-3 max-w-md text-muted-foreground">
              Son tus intentos. Si te equivocas pierdes una, y se recuperan con el tiempo.
            </p>
          </div>
        </section>

        {/* Cierre */}
        <section className="border-t border-border bg-loom">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-8 px-4 py-16 sm:px-6 lg:py-24">
            <h2 className="max-w-xl font-display text-3xl font-semibold sm:text-4xl">
              Guarda tu avance y sigue con el siguiente nivel.
            </h2>
            <p className="max-w-lg text-muted-foreground">
              Tu progreso queda guardado en tu cuenta.
            </p>
            <Button asChild size="lg" className={`min-h-12 px-8 text-base ${press}`}>
              <Link href="/registro">Crear cuenta</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <Logo className="h-8 w-auto" />
          <nav aria-label="Pie de página" className="flex gap-2">
            <Link href="/login" className="inline-flex min-h-11 items-center px-2 transition-colors hover:text-foreground">
              Ingresar
            </Link>
            <Link href="/registro" className="inline-flex min-h-11 items-center px-2 transition-colors hover:text-foreground">
              Crear cuenta
            </Link>
          </nav>
          <span>© {new Date().getFullYear()} COGIT</span>
        </div>
      </footer>
    </div>
  )
}
