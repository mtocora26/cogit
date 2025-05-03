import Image from "next/image"
import Link from "next/link"
import { MessageSquare, ThumbsUp, Bookmark, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ForumPostProps {
  post: {
    id: number
    title: string
    category: string
    author: string
    avatar: string
    date: string
    replies: number
    likes: number
    content: string
    tags: string[]
  }
}

export default function ForumPost({ post }: ForumPostProps) {
  // Función para obtener el color de la categoría
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "ayuda":
        return "bg-blue-500/20 text-blue-400"
      case "tutorial":
        return "bg-purple-500/20 text-purple-400"
      case "reto":
        return "bg-green-500/20 text-green-400"
      case "experiencia":
        return "bg-yellow-500/20 text-yellow-400"
      case "sugerencia":
        return "bg-orange-500/20 text-orange-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  return (
    <div className="bg-[#1e2330] rounded-lg p-6 hover:border hover:border-gray-700 transition-all">
      <div className="flex justify-between items-start mb-3">
        <div className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(post.category)}`}>
          {post.category}
        </div>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Bookmark className="h-4 w-4 text-gray-400 hover:text-purple-400" />
        </Button>
      </div>

      <Link href={`/comunidad/post/${post.id}`}>
        <h3 className="text-xl font-bold mb-2 hover:text-purple-400 transition-colors">{post.title}</h3>
      </Link>

      <p className="text-gray-300 text-sm mb-4 line-clamp-2">{post.content}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag, index) => (
          <Link
            key={index}
            href={`/comunidad/tag/${tag}`}
            className="bg-[#1a1d23] text-xs px-2 py-1 rounded-full text-gray-400 hover:bg-gray-800 transition-colors"
          >
            #{tag}
          </Link>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full overflow-hidden">
              <Image
                src={post.avatar || "/placeholder.svg"}
                alt={post.author}
                width={24}
                height={24}
                className="object-cover"
              />
            </div>
            <Link
              href={`/perfil/${post.author}`}
              className="text-sm font-medium hover:text-purple-400 transition-colors"
            >
              {post.author}
            </Link>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Clock className="h-3 w-3" />
            {post.date}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm">
            <MessageSquare className="h-4 w-4 text-gray-400" />
            <span>{post.replies}</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <ThumbsUp className="h-4 w-4 text-gray-400" />
            <span>{post.likes}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
