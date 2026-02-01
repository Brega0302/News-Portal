"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Plus, Edit, Trash2, Eye } from "lucide-react"
import { AdminHeader } from "@/components/admin-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { isAdminAuthenticated, getStoredArticles, deleteArticle } from "@/lib/admin-utils"
import { formatDate } from "@/lib/data-utils"
import type { Article } from "@/lib/types"

export default function AdminDashboard() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.push("/admin/login")
      return
    }

    setArticles(getStoredArticles())
    setLoading(false)
  }, [router])

  const handleDelete = (id: string) => {
    if (confirm("Da li ste sigurni da želite obrisati ovaj članak?")) {
      deleteArticle(id)
      setArticles(getStoredArticles())
    }
  }

  if (loading) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Učitavanje...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Upravljanje člancima</h1>
            <p className="text-gray-600">Ukupno članaka: {articles.length}</p>
          </div>
          <Link href="/admin/novi">
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="h-4 w-4 mr-2" />
              Novi članak
            </Button>
          </Link>
        </div>

        <div className="grid gap-6">
          {articles.map((article) => (
            <Card key={article.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="relative w-32 h-24 flex-shrink-0">
                    <Image
                      src={article.imageUrl || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge style={{ backgroundColor: article.category.color }}>{article.category.name}</Badge>
                          {article.featured && <Badge variant="secondary">Izdvojeno</Badge>}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">{article.excerpt}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>Autor: {article.author}</span>
                          <span>Objavljeno: {formatDate(article.publishedAt)}</span>
                          <span>Čitanje: {article.readTime} min</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <Link href={`/vijest/${article.slug}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/admin/uredi/${article.id}`}>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(article.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {articles.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-gray-500 mb-4">Nema objavljenih članaka</p>
                <Link href="/admin/novi">
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Dodajte prvi članak
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
