import Link from "next/link"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

const fecha = (d: Date) => new Intl.DateTimeFormat("es-CO", { dateStyle: "medium", timeStyle: "short" }).format(d)

export default async function AdminResumen() {
  const [total, admins, conActividad, completadas, recientes] = await Promise.all([
    prisma.usuario.count(),
    prisma.usuario.count({ where: { rol: "admin" } }),
    prisma.usuario.count({ where: { progreso: { some: { completado: true } } } }),
    prisma.progreso.count({ where: { completado: true } }),
    prisma.usuario.findMany({ orderBy: { creadoEn: "desc" }, take: 5, select: { id: true, username: true, rol: true, creadoEn: true } }),
  ])

  const filas: [string, string][] = [
    ["Usuarios registrados", `${total} de 100 previstos para el piloto`],
    ["Estudiantes", String(total - admins)],
    ["Administradores", String(admins)],
    ["Cuentas con al menos una actividad completada", String(conActividad)],
    ["Actividades completadas", String(completadas)],
  ]

  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-display text-3xl font-semibold">Resumen</h1>
        <p className="mt-2 text-muted-foreground">Estado actual de la plataforma, leído de la base de datos.</p>
      </header>

      <section aria-labelledby="estado">
        <h2 id="estado" className="mb-3 font-display text-xl font-semibold">Estado del piloto</h2>
        <dl className="divide-y divide-border rounded-xl border border-border bg-card">
          {filas.map(([k, v]) => (
            <div key={k} className="flex flex-wrap items-baseline justify-between gap-2 px-5 py-4">
              <dt className="text-muted-foreground">{k}</dt>
              <dd className="font-medium tabular-nums">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="recientes">
        <div className="mb-3 flex items-baseline justify-between gap-3">
          <h2 id="recientes" className="font-display text-xl font-semibold">Últimos registros</h2>
          <Link href="/admin/usuarios" className="inline-flex min-h-11 items-center text-sm text-neuron underline-offset-4 hover:underline">
            Ver todos los usuarios
          </Link>
        </div>
        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border text-muted-foreground">
              <tr>
                <th scope="col" className="px-5 py-3 font-medium">Usuario</th>
                <th scope="col" className="px-5 py-3 font-medium">Rol</th>
                <th scope="col" className="px-5 py-3 font-medium">Registro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recientes.map((u) => (
                <tr key={u.id}>
                  <td className="px-5 py-3 font-medium">{u.username}</td>
                  <td className="px-5 py-3">{u.rol === "admin" ? "Administrador" : "Estudiante"}</td>
                  <td className="px-5 py-3 tabular-nums text-muted-foreground">{fecha(u.creadoEn)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
