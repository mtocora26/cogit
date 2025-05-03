import Image from "next/image"
import { Trophy, Medal, Star, Crown, Zap, Brain } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NavBar from "@/components/nav-bar"
import RankingTable from "@/components/ranking-table"

export default function RankingPage() {
  // Datos de ejemplo para las tablas de clasificación
  const weeklyUsers = [
    {
      rank: 1,
      name: "AlexMaster",
      avatar: "/placeholder.svg?height=100&width=100",
      points: 2450,
      level: 15,
      streak: 7,
      change: 2,
    },
    {
      rank: 2,
      name: "CodeNinja",
      avatar: "/placeholder.svg?height=100&width=100",
      points: 2320,
      level: 14,
      streak: 12,
      change: -1,
    },
    {
      rank: 3,
      name: "LogicQueen",
      avatar: "/placeholder.svg?height=100&width=100",
      points: 2180,
      level: 13,
      streak: 5,
      change: 1,
    },
    {
      rank: 4,
      name: "PuzzlePro",
      avatar: "/placeholder.svg?height=100&width=100",
      points: 2050,
      level: 12,
      streak: 3,
      change: -1,
    },
    {
      rank: 5,
      name: "AlgoWhiz",
      avatar: "/placeholder.svg?height=100&width=100",
      points: 1920,
      level: 12,
      streak: 4,
      change: 0,
    },
    {
      rank: 6,
      name: "BrainHacker",
      avatar: "/placeholder.svg?height=100&width=100",
      points: 1840,
      level: 11,
      streak: 6,
      change: 3,
    },
    {
      rank: 7,
      name: "CyberMind",
      avatar: "/placeholder.svg?height=100&width=100",
      points: 1780,
      level: 11,
      streak: 2,
      change: -2,
    },
    {
      rank: 8,
      name: "DataDragon",
      avatar: "/placeholder.svg?height=100&width=100",
      points: 1650,
      level: 10,
      streak: 8,
      change: 0,
    },
    {
      rank: 9,
      name: "SyntaxSage",
      avatar: "/placeholder.svg?height=100&width=100",
      points: 1520,
      level: 10,
      streak: 3,
      change: 1,
    },
    {
      rank: 10,
      name: "QuantumCoder",
      avatar: "/placeholder.svg?height=100&width=100",
      points: 1490,
      level: 9,
      streak: 4,
      change: -1,
    },
  ]

  const allTimeUsers = [
    {
      rank: 1,
      name: "CodeNinja",
      avatar: "/placeholder.svg?height=100&width=100",
      points: 15320,
      level: 25,
      streak: 12,
      change: 0,
    },
    {
      rank: 2,
      name: "AlexMaster",
      avatar: "/placeholder.svg?height=100&width=100",
      points: 14450,
      level: 24,
      streak: 7,
      change: 0,
    },
    {
      rank: 3,
      name: "BrainHacker",
      avatar: "/placeholder.svg?height=100&width=100",
      points: 13840,
      level: 23,
      streak: 6,
      change: 0,
    },
    {
      rank: 4,
      name: "LogicQueen",
      avatar: "/placeholder.svg?height=100&width=100",
      points: 12180,
      level: 22,
      streak: 5,
      change: 0,
    },
    {
      rank: 5,
      name: "DataDragon",
      avatar: "/placeholder.svg?height=100&width=100",
      points: 11650,
      level: 21,
      streak: 8,
      change: 0,
    },
    {
      rank: 6,
      name: "PuzzlePro",
      avatar: "/placeholder.svg?height=100&width=100",
      points: 10050,
      level: 20,
      streak: 3,
      change: 0,
    },
    {
      rank: 7,
      name: "AlgoWhiz",
      avatar: "/placeholder.svg?height=100&width=100",
      points: 9920,
      level: 19,
      streak: 4,
      change: 0,
    },
    {
      rank: 8,
      name: "CyberMind",
      avatar: "/placeholder.svg?height=100&width=100",
      points: 9780,
      level: 18,
      streak: 2,
      change: 0,
    },
    {
      rank: 9,
      name: "SyntaxSage",
      avatar: "/placeholder.svg?height=100&width=100",
      points: 8520,
      level: 17,
      streak: 3,
      change: 0,
    },
    {
      rank: 10,
      name: "QuantumCoder",
      avatar: "/placeholder.svg?height=100&width=100",
      points: 7490,
      level: 16,
      streak: 4,
      change: 0,
    },
  ]

  const friendsUsers = [
    {
      rank: 1,
      name: "AlexMaster",
      avatar: "/placeholder.svg?height=100&width=100",
      points: 2450,
      level: 15,
      streak: 7,
      change: 0,
    },
    {
      rank: 2,
      name: "LogicQueen",
      avatar: "/placeholder.svg?height=100&width=100",
      points: 2180,
      level: 13,
      streak: 5,
      change: 0,
    },
    {
      rank: 3,
      name: "BrainHacker",
      avatar: "/placeholder.svg?height=100&width=100",
      points: 1840,
      level: 11,
      streak: 6,
      change: 0,
    },
    {
      rank: 4,
      name: "DataDragon",
      avatar: "/placeholder.svg?height=100&width=100",
      points: 1650,
      level: 10,
      streak: 8,
      change: 0,
    },
    {
      rank: 5,
      name: "QuantumCoder",
      avatar: "/placeholder.svg?height=100&width=100",
      points: 1490,
      level: 9,
      streak: 4,
      change: 0,
    },
  ]

  // Datos de ejemplo para los líderes por categoría
  const categoryLeaders = [
    { category: "Sudoku", user: "PuzzlePro", score: 3250, avatar: "/placeholder.svg?height=100&width=100" },
    { category: "Nonogramas", user: "LogicQueen", score: 2980, avatar: "/placeholder.svg?height=100&width=100" },
    { category: "Robot Programmer", user: "AlgoWhiz", score: 3120, avatar: "/placeholder.svg?height=100&width=100" },
  ]

  return (
    <div className="min-h-screen bg-[#1a1d23] text-white">
      {/* Navbar */}
      <NavBar activePage="ranking" />

      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Ranking</h1>
            <p className="text-gray-400 mt-1">Compite con otros usuarios y demuestra tus habilidades</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm flex items-center gap-1">
              <Trophy className="h-4 w-4" />
              <span>Tu posición: #42</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="container mx-auto px-4 py-4">
        <div className="bg-[#1e2330] rounded-xl p-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <Image
              src="/placeholder.svg?height=400&width=1200"
              alt="Circuit Background"
              fill
              className="object-cover"
            />
          </div>

          <h2 className="text-2xl font-bold mb-8 text-center">Líderes de la Semana</h2>

          <div className="flex flex-col md:flex-row justify-center items-end gap-4 md:gap-8">
            {/* 2nd Place */}
            <div className="order-2 md:order-1 flex flex-col items-center">
              <div className="relative">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <Medal className="h-8 w-8 text-gray-300" />
                </div>
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-gray-300">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="2nd Place"
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="mt-2 text-center">
                <div className="font-bold">CodeNinja</div>
                <div className="text-sm text-gray-300">2320 pts</div>
                <div className="bg-gray-300 text-gray-800 text-xs font-bold px-2 py-1 rounded-full mt-1">2°</div>
              </div>
              <div className="h-24 w-16 bg-gradient-to-t from-gray-700 to-gray-600 rounded-t-lg mt-4"></div>
            </div>

            {/* 1st Place */}
            <div className="order-1 md:order-2 flex flex-col items-center">
              <div className="relative">
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                  <Crown className="h-10 w-10 text-yellow-500" />
                </div>
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="1st Place"
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="mt-2 text-center">
                <div className="font-bold text-lg">AlexMaster</div>
                <div className="text-yellow-400">2450 pts</div>
                <div className="bg-yellow-500 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full mt-1">1°</div>
              </div>
              <div className="h-32 w-20 bg-gradient-to-t from-yellow-700 to-yellow-600 rounded-t-lg mt-4"></div>
            </div>

            {/* 3rd Place */}
            <div className="order-3 flex flex-col items-center">
              <div className="relative">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <Medal className="h-8 w-8 text-amber-700" />
                </div>
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-amber-700">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="3rd Place"
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="mt-2 text-center">
                <div className="font-bold">LogicQueen</div>
                <div className="text-sm text-gray-300">2180 pts</div>
                <div className="bg-amber-700 text-amber-100 text-xs font-bold px-2 py-1 rounded-full mt-1">3°</div>
              </div>
              <div className="h-16 w-16 bg-gradient-to-t from-amber-900 to-amber-800 rounded-t-lg mt-4"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Ranking Tabs */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="weekly" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="weekly">Semanal</TabsTrigger>
            <TabsTrigger value="alltime">De Todos los Tiempos</TabsTrigger>
            <TabsTrigger value="friends">Amigos</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly">
            <RankingTable users={weeklyUsers} showChange={true} />
          </TabsContent>

          <TabsContent value="alltime">
            <RankingTable users={allTimeUsers} showChange={false} />
          </TabsContent>

          <TabsContent value="friends">
            <RankingTable users={friendsUsers} showChange={false} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Category Leaders */}
      <div className="bg-[#1e2330] py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Líderes por Categoría</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {categoryLeaders.map((leader, index) => (
              <div key={index} className="bg-[#1a1d23] rounded-lg p-6 border border-blue-500/20">
                <h3 className="text-xl font-bold mb-4">{leader.category}</h3>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={leader.avatar || "/placeholder.svg"}
                      alt={leader.user}
                      width={100}
                      height={100}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-bold">{leader.user}</div>
                    <div className="text-sm text-gray-400">{leader.score} puntos</div>
                  </div>
                  <div className="ml-auto">
                    <Trophy className="h-8 w-8 text-yellow-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Your Stats */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Tus Estadísticas</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#1e2330] rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4">Rendimiento</h3>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Nivel</span>
                  <span className="text-sm font-medium">8</span>
                </div>
                <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full" style={{ width: "65%" }}></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-400">650/1000 XP</span>
                  <span className="text-xs text-gray-400">Nivel 9</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1a1d23] p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <span className="font-medium">Racha</span>
                  </div>
                  <div className="text-2xl font-bold">5 días</div>
                </div>

                <div className="bg-[#1a1d23] p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-5 w-5 text-blue-500" />
                    <span className="font-medium">Total</span>
                  </div>
                  <div className="text-2xl font-bold">1250 pts</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1e2330] rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4">Logros Recientes</h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-[#1a1d23] rounded-lg">
                <div className="bg-green-500/20 p-2 rounded-full">
                  <Trophy className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <div className="font-medium">Maestro de Algoritmos</div>
                  <div className="text-sm text-gray-400">Completaste 10 desafíos de algoritmos</div>
                </div>
                <div className="ml-auto text-xs text-gray-400">Hace 2d</div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[#1a1d23] rounded-lg">
                <div className="bg-blue-500/20 p-2 rounded-full">
                  <Zap className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <div className="font-medium">Racha de 5 días</div>
                  <div className="text-sm text-gray-400">Has practicado durante 5 días seguidos</div>
                </div>
                <div className="ml-auto text-xs text-gray-400">Hoy</div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[#1a1d23] rounded-lg">
                <div className="bg-purple-500/20 p-2 rounded-full">
                  <Brain className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <div className="font-medium">Pensador Lógico</div>
                  <div className="text-sm text-gray-400">Resolviste 5 sudokus difíciles</div>
                </div>
                <div className="ml-auto text-xs text-gray-400">Hace 3d</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
