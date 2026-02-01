"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminHeader } from "@/components/admin-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { isAdminAuthenticated, saveArticle, generateArticleId, createSlug } from "@/lib/admin-utils"
import { getAllCategories } from "@/lib/data-utils"
import type { Article } from "@/lib/types"

export default function NewArticlePage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const categories = getAllCategories()

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    imageUrl: "",
    categoryId: "",
    author: "",
    featured: false,
    tags: "",
  })

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.push("/admin/login")
      return
    }
    setLoading(false)
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const selectedCategory = categories.find((c) => c.id === formData.categoryId)
    if (!selectedCategory) {
      alert("Molimo odaberite kategoriju")
      setSaving(false)
      return
    }

    const article: Article = {
      id: generateArticleId(),
      title: formData.title,
      slug: createSlug(formData.title),
      excerpt: formData.excerpt,
      content: formData.content.replace(/\n/g, "<br>"),
      imageUrl: formData.imageUrl || "/placeholder.svg?height=400&width=600",
      category: selectedCategory,
      author: formData.author,
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      featured: formData.featured,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      readTime: Math.ceil(formData.content.split(" ").length / 200),
    }

    saveArticle(article)
    router.push("/admin")
  }

  if (loading) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Učitavanje...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />

      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Novi članak</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Naslov članka *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Unesite naslov članka"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="author">Autor *</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      placeholder="Ime autora"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Kategorija *</Label>
                    <Select
                      value={formData.categoryId}
                      onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Odaberite kategoriju" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="imageUrl">URL slike</Label>
                    <Input
                      id="imageUrl"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      placeholder="https://example.com/slika.jpg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="tags">Tagovi (odvojeni zarezom)</Label>
                    <Input
                      id="tags"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      placeholder="politika, vlada, zakon"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => setFormData({ ...formData, featured: !!checked })}
                    />
                    <Label htmlFor="featured">Izdvojeni članak</Label>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="excerpt">Kratki opis *</Label>
                    <Textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      placeholder="Kratki opis članka koji će se prikazati na početnoj strani"
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="content">Sadržaj članka *</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Unesite pun sadržaj članka..."
                      rows={15}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="bg-red-600 hover:bg-red-700" disabled={saving}>
                  {saving ? "Čuvanje..." : "Objavi članak"}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.push("/admin")}>
                  Otkaži
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
