import { leerCatalogo } from "@/lib/contenido"
import { minutosNivel } from "@/lib/misiones-catalogo"
import EditorNivel from "@/components/admin/editor-nivel"

export const dynamic = "force-dynamic"

export default async function AdminContenido() {
  const { seccion, niveles } = await leerCatalogo()
  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-3xl font-semibold">Contenido de misiones</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Edita el objetivo, la duración, las reglas y el ejemplo de cada misión. Los cambios se validan antes de guardarse y los
          estudiantes los ven al instante. Cada actividad elige su juego, así que agregar una no exige cambiar la interfaz.
        </p>
      </header>

      <section aria-labelledby="catalogo">
        <h2 id="catalogo" className="mb-3 font-display text-xl font-semibold">
          {seccion.title} <span className="text-base font-normal text-muted-foreground">· {seccion.subtitle}</span>
        </h2>
        <div className="space-y-3">
          {niveles.map((n) => (
            <details key={n.id} className="group rounded-xl border border-border bg-card">
              <summary className="flex min-h-11 cursor-pointer flex-wrap items-baseline justify-between gap-2 px-5 py-4">
                <span className="font-medium">
                  Nivel {n.id}: {n.title}
                </span>
                <span className="text-sm text-muted-foreground">
                  {n.actividades.length > 0 ? `${n.actividades.length} actividades · ≈ ${minutosNivel(n)} min` : "Próximamente"}
                </span>
              </summary>
              <div className="border-t border-border px-5 py-5">
                <EditorNivel nivel={n} />
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  )
}
