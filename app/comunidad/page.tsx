import NavBar from "@/components/nav-bar"

/**
 * REQ-009: la comunidad del MVP es demostrativa y de solo lectura. No hay publicar, responder, "me gusta"
 * ni búsqueda, porque nada se guardaría. Las publicaciones son ejemplos escritos para el MVP, no de estudiantes reales.
 */
const EJEMPLOS = [
  {
    categoria: "Ayuda",
    titulo: "¿Cómo resolver el nivel 5 de Robot Programmer?",
    texto:
      "Estoy atascado en el nivel 5. Intenté usar bucles, pero no logro que el robot llegue a la meta. ¿Alguien tiene una pista?",
  },
  {
    categoria: "Tutorial",
    titulo: "Estrategias para resolver Sudokus difíciles",
    texto:
      "Cuando una casilla tiene un solo número posible, ponlo. Si no hay ninguna así, busca el número que solo cabe en un lugar de la fila, la columna o el cuadro.",
  },
  {
    categoria: "Sugerencia",
    titulo: "Un minijuego nuevo de patrones",
    texto:
      "Me gustaría un minijuego dedicado a reconocer patrones. Complementaría a los que ya existen.",
  },
]

export default function ComunidadPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar activePage="comunidad" />
      <main className="container mx-auto max-w-3xl px-4 py-10">
        <h1 className="font-display text-4xl font-bold">Comunidad</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Así se verá la comunidad de COGIT: un lugar para pedir ayuda, compartir estrategias y proponer ideas.
        </p>

        <p role="note" className="mt-6 rounded-lg border border-border bg-card px-4 py-3 text-sm">
          <strong className="font-semibold">Demostración.</strong> Estas publicaciones son ejemplos escritos para el MVP: no son de
          estudiantes reales, y por ahora no se puede publicar ni responder.
        </p>

        <ul className="mt-8 space-y-4">
          {EJEMPLOS.map((p) => (
            <li key={p.titulo} className="rounded-xl border border-border bg-card p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-full bg-neuron/15 px-2 py-1 font-medium text-neuron">{p.categoria}</span>
                <span className="rounded-full border border-border px-2 py-1 text-muted-foreground">Ejemplo de demostración</span>
              </div>
              <h2 className="mt-3 font-display text-xl font-semibold">{p.titulo}</h2>
              <p className="mt-2 text-muted-foreground">{p.texto}</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
