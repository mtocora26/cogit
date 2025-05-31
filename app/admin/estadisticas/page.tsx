export default function AdminEstadisticas() {
  // Dummy: aquí irán gráficos y KPIs
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Estadísticas</h1>
      <p className="text-gray-300 mb-6">Panel de estadísticas generales de la plataforma.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#23283a] rounded-lg p-6 border border-gray-800">
          <div className="text-2xl font-bold text-purple-400 mb-2">Usuarios activos hoy: 2</div>
          <div className="text-gray-300">(Dummy data)</div>
        </div>
        <div className="bg-[#23283a] rounded-lg p-6 border border-gray-800">
          <div className="text-2xl font-bold text-blue-400 mb-2">Actividades completadas esta semana: 7</div>
          <div className="text-gray-300">(Dummy data)</div>
        </div>
      </div>
    </div>
  )
}
