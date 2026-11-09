import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { SESSION_COOKIE, readSession } from "@/lib/session"
import { prisma } from "@/lib/prisma"
import AdminNav from "@/components/admin/admin-nav"

// Segunda barrera tras el middleware: el rol se lee en la base de datos, no en la cookie.
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await readSession((await cookies()).get(SESSION_COOKIE)?.value)
  if (!session) redirect("/login")
  const u = await prisma.usuario.findUnique({ where: { id: session.uid }, select: { username: true, rol: true } })
  if (!u) redirect("/login")
  if (u.rol !== "admin") redirect("/misiones")

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AdminNav username={u.username} />
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  )
}
