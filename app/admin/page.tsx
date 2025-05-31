"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// Dummy data for users
const users = [
  { id: 1, name: "Juan Pérez", email: "juan@email.com", rol: "user", progreso: "Nivel 2" },
  { id: 2, name: "Ana Admin", email: "ana@email.com", rol: "admin", progreso: "Nivel 4" },
  { id: 3, name: "Carlos López", email: "carlos@email.com", rol: "user", progreso: "Nivel 1" },
]

export default function AdminDashboard() {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Check admin role from localStorage (or fetch from API in real app)
    const rol = localStorage.getItem("userRol")
    if (rol === "admin") {
      setIsAdmin(true)
    } else {
      router.replace("/login")
    }
  }, [router])

  if (!isAdmin) return null

  return (
    <div className="min-h-screen flex bg-[#181c23] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1e2330] border-r border-gray-800 flex flex-col p-6 gap-6">
        <h2 className="text-2xl font-bold mb-8">Admin</h2>
        <nav className="flex flex-col gap-4">
          <Link href="/admin" className="font-medium hover:text-purple-400">Dashboard</Link>
          <Link href="/admin/usuarios" className="font-medium hover:text-purple-400">Usuarios</Link>
          <Link href="/admin/estadisticas" className="font-medium hover:text-purple-400">Estadísticas</Link>
          <Link href="/admin/contenido" className="font-medium hover:text-purple-400">Contenido</Link>
        </nav>
        <div className="mt-auto">
          <Link href="/misiones">
            <Button variant="outline" className="w-full border-purple-500 text-purple-400 hover:bg-purple-500/10">Volver a app</Button>
          </Link>
        </div>
      </aside>
      {/* Main content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-[#23283a] rounded-lg p-6 border border-gray-800">
            <div className="text-4xl font-bold text-purple-400 mb-2">3</div>
            <div className="text-gray-300">Usuarios registrados</div>
          </div>
          <div className="bg-[#23283a] rounded-lg p-6 border border-gray-800">
            <div className="text-4xl font-bold text-blue-400 mb-2">12</div>
            <div className="text-gray-300">Actividades completadas</div>
          </div>
          <div className="bg-[#23283a] rounded-lg p-6 border border-gray-800">
            <div className="text-4xl font-bold text-green-400 mb-2">5</div>
            <div className="text-gray-300">Niveles activos</div>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4">Usuarios</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#23283a] rounded-lg border border-gray-800">
            <thead>
              <tr>
                <th className="py-2 px-4 text-left">Nombre</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Rol</th>
                <th className="py-2 px-4 text-left">Progreso</th>
                <th className="py-2 px-4 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-t border-gray-700">
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4 capitalize">{user.rol}</td>
                  <td className="py-2 px-4">{user.progreso}</td>
                  <td className="py-2 px-4">
                    <Button size="sm" variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500/10 mr-2">Ver</Button>
                    <Button size="sm" variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10">Cambiar rol</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
