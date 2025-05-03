import Link from "next/link"
import { Search, MessageSquare, Users, Filter, PlusCircle, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NavBar from "@/components/nav-bar"
import ForumPost from "@/components/forum-post"
import UserCard from "@/components/user-card"

export default function ComunidadPage() {
  // Datos de ejemplo para las publicaciones del foro
  const forumPosts = [
    {
      id: 1,
      title: "¿Cómo resolver el nivel 5 de Robot Programmer?",
      category: "Ayuda",
      author: "AlexMaster",
      avatar: "/placeholder.svg?height=100&width=100",
      date: "Hace 2 horas",
      replies: 8,
      likes: 12,
      content:
        "Estoy atascado en el nivel 5 de Robot Programmer. He intentado usar bucles pero no logro que el robot llegue al objetivo final. ¿Alguien tiene alguna pista?",
      tags: ["robot-programmer", "nivel-5", "ayuda"],
    },
    {
      id: 2,
      title: "Estrategias avanzadas para resolver Sudokus difíciles",
      category: "Tutorial",
      author: "LogicQueen",
      avatar: "/placeholder.svg?height=100&width=100",
      date: "Hace 1 día",
      replies: 15,
      likes: 34,
      content:
        "Después de completar todos los niveles de Sudoku, quiero compartir algunas estrategias avanzadas que me han ayudado a resolver los puzzles más difíciles...",
      tags: ["sudoku", "estrategias", "tutorial"],
    },
    {
      id: 3,
      title: "Reto semanal: Crea un algoritmo para resolver nonogramas",
      category: "Reto",
      author: "PuzzlePro",
      avatar: "/placeholder.svg?height=100&width=100",
      date: "Hace 3 días",
      replies: 23,
      likes: 45,
      content:
        "Este es el reto de la semana: desarrollar un algoritmo que pueda resolver nonogramas automáticamente. Compartan sus soluciones y discutamos los enfoques...",
      tags: ["nonogramas", "algoritmos", "reto-semanal"],
    },
    {
      id: 4,
      title: "Mi experiencia aprendiendo pensamiento computacional con COGIT",
      category: "Experiencia",
      author: "NewLearner",
      avatar: "/placeholder.svg?height=100&width=100",
      date: "Hace 5 días",
      replies: 12,
      likes: 28,
      content:
        "Quiero compartir mi experiencia después de un mes usando COGIT. He notado una gran mejora en mi capacidad para resolver problemas y pensar de manera estructurada...",
      tags: ["experiencia", "aprendizaje", "progreso"],
    },
    {
      id: 5,
      title: "Sugerencia: Añadir un nuevo minijuego de patrones",
      category: "Sugerencia",
      author: "BrainHacker",
      avatar: "/placeholder.svg?height=100&width=100",
      date: "Hace 1 semana",
      replies: 42,
      likes: 76,
      content:
        "Me encantaría ver un nuevo minijuego enfocado en reconocimiento de patrones. Creo que complementaría muy bien los juegos existentes y ayudaría a desarrollar habilidades adicionales...",
      tags: ["sugerencia", "minijuegos", "patrones"],
    },
  ]

  // Datos de ejemplo para usuarios activos
  const activeUsers = [
    { name: "CodeNinja", avatar: "/placeholder.svg?height=100&width=100", level: 14, points: 2320 },
    { name: "LogicQueen", avatar: "/placeholder.svg?height=100&width=100", level: 13, points: 2180 },
    { name: "PuzzlePro", avatar: "/placeholder.svg?height=100&width=100", level: 12, points: 2050 },
  ]

  // Datos de ejemplo para categorías populares
  const popularCategories = [
    { name: "Ayuda", count: 156, icon: "❓" },
    { name: "Tutoriales", count: 89, icon: "📚" },
    { name: "Retos", count: 124, icon: "🏆" },
    { name: "Sugerencias", count: 67, icon: "💡" },
    { name: "Experiencias", count: 93, icon: "🚀" },
  ]

  return (
    <div className="min-h-screen bg-[#1a1d23] text-white">
      {/* Navbar */}
      <NavBar activePage="comunidad" />

      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Comunidad</h1>
            <p className="text-gray-400 mt-1">Comparte ideas, soluciones y conecta con otros estudiantes</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Nueva Publicación
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar en el foro..."
              className="pl-10 bg-[#1e2330] border-gray-700 focus:border-purple-500"
            />
          </div>
          <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtrar
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Forum Posts */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="recientes" className="w-full">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="recientes">Recientes</TabsTrigger>
                <TabsTrigger value="populares">Populares</TabsTrigger>
                <TabsTrigger value="sin-respuesta">Sin Respuesta</TabsTrigger>
                <TabsTrigger value="guardados">Guardados</TabsTrigger>
              </TabsList>

              <TabsContent value="recientes" className="space-y-6">
                {forumPosts.map((post) => (
                  <ForumPost key={post.id} post={post} />
                ))}
              </TabsContent>

              <TabsContent value="populares" className="space-y-6">
                {forumPosts
                  .sort((a, b) => b.likes - a.likes)
                  .map((post) => (
                    <ForumPost key={post.id} post={post} />
                  ))}
              </TabsContent>

              <TabsContent value="sin-respuesta" className="space-y-6">
                <div className="bg-[#1e2330] rounded-lg p-8 text-center">
                  <MessageSquare className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">No hay publicaciones sin respuesta</h3>
                  <p className="text-gray-400 mb-4">
                    ¡Nuestra comunidad es muy activa! Todas las publicaciones tienen respuestas.
                  </p>
                  <Button className="bg-purple-600 hover:bg-purple-700">Ver todas las publicaciones</Button>
                </div>
              </TabsContent>

              <TabsContent value="guardados" className="space-y-6">
                <div className="bg-[#1e2330] rounded-lg p-8 text-center">
                  <Bookmark className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">No tienes publicaciones guardadas</h3>
                  <p className="text-gray-400 mb-4">
                    Guarda publicaciones interesantes para acceder a ellas más tarde.
                  </p>
                  <Button className="bg-purple-600 hover:bg-purple-700">Explorar publicaciones</Button>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-8 flex justify-center">
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                Cargar más publicaciones
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Active Users */}
            <div className="bg-[#1e2330] rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-5 w-5 text-blue-400" />
                <h3 className="text-lg font-bold">Usuarios Activos</h3>
              </div>
              <div className="space-y-3">
                {activeUsers.map((user, index) => (
                  <UserCard key={index} name={user.name} avatar={user.avatar} level={user.level} points={user.points} />
                ))}
              </div>
              <Button variant="link" className="text-blue-400 p-0 h-auto mt-2 w-full text-center">
                Ver todos los usuarios
              </Button>
            </div>

            {/* Popular Categories */}
            <div className="bg-[#1e2330] rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">Categorías Populares</h3>
              <div className="space-y-2">
                {popularCategories.map((category, index) => (
                  <Link
                    key={index}
                    href={`/comunidad/categoria/${category.name.toLowerCase()}`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-[#1a1d23] transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <div className="text-xl">{category.icon}</div>
                      <span>{category.name}</span>
                    </div>
                    <div className="bg-[#1a1d23] text-xs px-2 py-1 rounded-full">{category.count}</div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Community Guidelines */}
            <div className="bg-[#1e2330] rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">Normas de la Comunidad</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <div className="min-w-4 text-purple-400">•</div>
                  <div>Sé respetuoso con todos los miembros</div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-4 text-purple-400">•</div>
                  <div>Comparte conocimiento y ayuda a otros</div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-4 text-purple-400">•</div>
                  <div>Evita el spam y contenido duplicado</div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-4 text-purple-400">•</div>
                  <div>Da crédito cuando uses ideas de otros</div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-4 text-purple-400">•</div>
                  <div>Reporta contenido inapropiado</div>
                </li>
              </ul>
              <Button variant="link" className="text-purple-400 p-0 h-auto mt-2">
                Ver normas completas
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
