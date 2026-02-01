import Link from "next/link"
import Image from "next/image"
import { Clock, User } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Article } from "@/lib/types"
import { formatDate } from "@/lib/data-utils"

interface ArticleCardProps {
  article: Article
  featured?: boolean
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  if (featured) {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <Link href={`/vijest/${article.slug}`}>
          <div className="relative h-64 md:h-80">
            <Image src={article.imageUrl || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <Badge className="mb-2" style={{ backgroundColor: article.category.color }}>
                {article.category.name}
              </Badge>
              <h2 className="text-xl md:text-2xl font-bold mb-2 text-balance">{article.title}</h2>
              <p className="text-sm text-gray-200 mb-2 text-pretty">{article.excerpt}</p>
              <div className="flex items-center space-x-4 text-xs text-gray-300">
                <div className="flex items-center space-x-1">
                  <User className="h-3 w-3" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{formatDate(article.publishedAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/vijest/${article.slug}`}>
        <div className="relative h-48">
          <Image src={article.imageUrl || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
        </div>
        <CardContent className="p-4">
          <Badge className="mb-2" style={{ backgroundColor: article.category.color }}>
            {article.category.name}
          </Badge>
          <h3 className="font-bold text-lg mb-2 text-balance hover:text-red-600 transition-colors">{article.title}</h3>
          <p className="text-gray-600 text-sm mb-3 text-pretty">{article.excerpt}</p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <User className="h-3 w-3" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
