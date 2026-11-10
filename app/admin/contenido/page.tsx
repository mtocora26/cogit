import { leerCatalogo } from "@/lib/contenido"
import { minutosNivel } from "@/lib/misiones-catalogo"

export const dynamic = "force-dynamic"

export default async function AdminContenido() {
  const { seccion, niveles } = await leerCatalogo()
  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-3xl font-semibold">Contenido de misiones</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          El contenido de las misiones se lee de la base de datos. Cada actividad elige su juego por clave, así que agregar una
          actividad no exige cambiar la interfaz.
        </p>
      </header>

      <section aria-labelledby="catalogo">
        <h2 id="catalogo" className="mb-3 font-display text-xl font-semibold">
          {seccion.title} <span className="text-base font-normal text-muted-foreground">· {seccion.subtitle}</span>
        </h2>
        <ul className="divide-y divide-border rounded-xl border border-border bg-card">
          {niveles.map((n) => (
            <li key={n.id} className="px-5 py-4">
              <p className="font-medium">
                Nivel {n.id}: {n.title}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{n.text}</p>
              <p className="mt-1 text-sm">
                <span className="font-medium">Objetivo:</span> {n.objetivo}
                {n.actividades.length > 0 ? ` · ≈ ${minutosNivel(n)} min` : " · Próximamente"}
              </p>
              {n.actividades.length > 0 && (
                <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                  {n.actividades.map((a) => (
                    <li key={a.id}>
                      {a.id}. {a.title} · {a.minutos} min
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
