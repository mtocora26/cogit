import { NIVELES, SECCION } from "@/lib/misiones-catalogo"

export default function AdminContenido() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-3xl font-semibold">Contenido de misiones</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          REQ-011 pide que un administrador pueda editar el contenido de las misiones. Hoy las misiones viven en el código de la
          aplicación, no en la base de datos, así que esta pantalla solo las lista. La edición se habilita cuando el contenido se
          mueva a la base.
        </p>
      </header>

      <section aria-labelledby="catalogo">
        <h2 id="catalogo" className="mb-3 font-display text-xl font-semibold">
          {SECCION.title} <span className="text-base font-normal text-muted-foreground">· {SECCION.subtitle}</span>
        </h2>
        <ul className="divide-y divide-border rounded-xl border border-border bg-card">
          {NIVELES.map((n) => (
            <li key={n.id} className="px-5 py-4">
              <p className="font-medium">
                Nivel {n.id}: {n.title}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{n.text}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
