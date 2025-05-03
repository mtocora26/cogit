import Image from "next/image"
import { ArrowUp, ArrowDown, Minus } from "lucide-react"

interface User {
  rank: number
  name: string
  avatar: string
  points: number
  level: number
  streak: number
  change: number
}

interface RankingTableProps {
  users: User[]
  showChange: boolean
}

export default function RankingTable({ users, showChange }: RankingTableProps) {
  const getChangeIcon = (change: number) => {
    if (change > 0) {
      return <ArrowUp className="h-4 w-4 text-green-500" />
    } else if (change < 0) {
      return <ArrowDown className="h-4 w-4 text-red-500" />
    } else {
      return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  const getChangeText = (change: number) => {
    if (change > 0) {
      return <span className="text-green-500">+{change}</span>
    } else if (change < 0) {
      return <span className="text-red-500">{change}</span>
    } else {
      return <span className="text-gray-500">0</span>
    }
  }

  return (
    <div className="bg-[#1e2330] rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#1a1d23]">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Posición
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Usuario
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Nivel</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Racha</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Puntos</th>
              {showChange && (
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Cambio
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {users.map((user, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-[#1e2330]" : "bg-[#1a1d23]"}>
                <td className="px-4 py-3 whitespace-nowrap">
                  {user.rank <= 3 ? (
                    <div
                      className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                      ${
                        user.rank === 1
                          ? "bg-yellow-500 text-yellow-900"
                          : user.rank === 2
                            ? "bg-gray-300 text-gray-800"
                            : "bg-amber-700 text-amber-100"
                      }
                    `}
                    >
                      {user.rank}
                    </div>
                  ) : (
                    <div className="text-gray-300 font-medium pl-3">{user.rank}</div>
                  )}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <Image
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <div className="ml-3">
                      <div className="font-medium">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full text-xs inline-flex items-center">
                    Lvl {user.level}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <div className="text-yellow-500">🔥</div>
                    <div>{user.streak} días</div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap font-bold">{user.points}</td>
                {showChange && (
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {getChangeIcon(user.change)}
                      {getChangeText(user.change)}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
