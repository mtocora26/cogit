import Image from "next/image"
import { Star } from "lucide-react"

interface UserCardProps {
  name: string
  avatar: string
  level: number
  points: number
  rank?: number
}

export default function UserCard({ name, avatar, level, points, rank }: UserCardProps) {
  return (
    <div className="bg-[#1e2330] rounded-lg p-4 flex items-center gap-4">
      {rank && <div className="text-2xl font-bold text-gray-400">#{rank}</div>}
      <div className="h-12 w-12 rounded-full overflow-hidden">
        <Image src={avatar || "/placeholder.svg"} alt={name} width={48} height={48} className="object-cover" />
      </div>
      <div>
        <div className="font-medium">{name}</div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <div>Nivel {level}</div>
          <div className="w-1 h-1 rounded-full bg-gray-500"></div>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
            {points} pts
          </div>
        </div>
      </div>
    </div>
  )
}
