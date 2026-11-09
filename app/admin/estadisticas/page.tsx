import { prisma } from "@/lib/prisma"
import { NIVELES, SECCION } from "@/lib/misiones-catalogo"

export const dynamic = "force-dynamic"

const thread = (t: number) => `hsl(${Math.round(186 + 91 * t)} 100% calc(var(--tl0) - var(--tld) * ${t}))`
const DIAS = 14

export default async function AdminEstadisticas() {
  const desde = new Date()
  desde.setHours(0, 0, 0, 0)
  desde.setDate(desde.getDate() - (DIAS - 1))

  const [registros, completadas] = await Promise.all([
    prisma.usuario.findMany({ where: { creadoEn: { gte: desde } }, select: { creadoEn: true } }),
    prisma.progreso.findMany({ where: { completado: true }, select: { seccion: true, nivel: true, userId: true } }),
  ])

  // Registros por día (últimos 14 días, en la zona horaria del servidor)
  const porDia = Array.from({ length: DIAS }, (_, i) => {
    const d = new Date(desde)
    d.setDate(desde.getDate() + i)
    return { d, n: 0 }
  })
  for (const r of registros) {
    const idx = Math.floor((new Date(r.creadoEn).setHours(0, 0, 0, 0) - desde.getTime()) / 86400000)
    if (porDia[idx]) porDia[idx].n++
  }
  const maxDia = Math.max(1, ...porDia.map((x) => x.n))

  // Avance por nivel
  const niveles = NIVELES.map((n) => {
    const filas = completadas.filter((c) => c.seccion === SECCION.id && c.nivel === n.id)
    return { ...n, actividades: filas.length, estudiantes: new Set(filas.map((f) => f.userId)).size }
  })
  const maxAct = Math.max(1, ...niveles.map((n) => n.actividades))

  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-display text-3xl font-semibold">Estadísticas</h1>
        <p className="mt-2 text-muted-foreground">Datos reales de la base. Sin datos todavía, las barras quedan vacías.</p>
      </header>

      <section aria-labelledby="niveles">
        <h2 id="niveles" className="mb-3 font-display text-xl font-semibold">Avance por nivel · {SECCION.title}</h2>
        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border text-muted-foreground">
              <tr>
                <th scope="col" className="px-5 py-3 font-medium">Nivel</th>
                <th scope="col" className="px-5 py-3 font-medium">Estudiantes con actividad completada</th>
                <th scope="col" className="px-5 py-3 font-medium">Actividades completadas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {niveles.map((n, i) => (
                <tr key={n.id}>
                  <td className="px-5 py-3 font-medium">{n.title}</td>
                  <td className="px-5 py-3 tabular-nums">{n.estudiantes}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <span className="w-6 tabular-nums">{n.actividades}</span>
                      <span aria-hidden className="h-2.5 w-full max-w-48 rounded-[2px] bg-accent">
                        <span className="block h-full rounded-[2px]" style={{ width: `${(n.actividades / maxAct) * 100}%`, background: thread(i / 2) }} />
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="registros">
        <h2 id="registros" className="mb-3 font-display text-xl font-semibold">Registros por día · últimos {DIAS} días</h2>
        <div className="overflow-x-auto rounded-xl border border-border bg-card p-5">
          <ol className="flex min-w-[32rem] items-end gap-1.5">
            {porDia.map((x, i) => (
              <li key={i} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-xs tabular-nums text-muted-foreground">{x.n}</span>
                <span
                  aria-hidden
                  className="w-full rounded-[3px]"
                  style={{ height: `${8 + (x.n / maxDia) * 56}px`, background: x.n ? thread(i / (DIAS - 1)) : "hsl(var(--accent))" }}
                />
                <span className="text-[0.7rem] text-muted-foreground">{x.d.getDate()}/{x.d.getMonth() + 1}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  )
}
