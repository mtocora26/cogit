import { redirect } from "next/navigation"

export default function AdminUsuarios() {
  // Dummy: solo muestra mensaje, aquí iría la gestión avanzada de usuarios
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Gestión de Usuarios</h1>
      <p className="text-gray-300">Aquí podrás buscar, filtrar y editar usuarios. (Próximamente)</p>
    </div>
  )
}
