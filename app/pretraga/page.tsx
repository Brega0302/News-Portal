"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Search, Filter, Calendar, Tag } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArticleCard } from "@/components/article-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { searchArticles, getAllCategories } from "@/lib/data-utils"
import type { Article, SearchFilters } from "@/lib/types"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [results, setResults] = useState<Article[]>([])
  const [loading, setLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const [filters, setFilters] = useState<SearchFilters>({
    query: searchParams.get("q") || "",
    category: searchParams.get("category") || "all", // Updated default value to "all"
    dateFrom: searchParams.get("dateFrom") || "",
    dateTo: searchParams.get("dateTo") || "",
  })

  const categories = getAllCategories()

  useEffect(() => {
    performSearch()
  }, [])

  const performSearch = () => {
    setLoading(true)
    const searchResults = searchArticles(filters)
    setResults(searchResults)
    setLoading(false)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch()
  }

  const clearFilters = () => {
    setFilters({
      query: "",
      category: "all", // Updated default value to "all"
      dateFrom: "",
      dateTo: "",
    })
    setResults([])
  }

  const getSearchSummary = () => {
    const parts = []
    if (filters.query) parts.push(`"${filters.query}"`)
    if (filters.category !== "all") {
      const cat = categories.find((c) => c.slug === filters.category)
      if (cat) parts.push(`kategorija: ${cat.name}`)
    }
    if (filters.dateFrom) parts.push(`od: ${new Date(filters.dateFrom).toLocaleDateString("sr-RS")}`)
    if (filters.dateTo) parts.push(`do: ${new Date(filters.dateTo).toLocaleDateString("sr-RS")}`)

    return parts.length > 0 ? parts.join(", ") : "svi članci"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Back button */}
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-red-600 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Nazad na početnu
          </Link>

          {/* Search header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Pretraga vijesti</h1>

            {/* Search form */}
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    type="search"
                    placeholder="Pretražite vijesti po naslovu, sadržaju ili tagovima..."
                    value={filters.query}
                    onChange={(e) => setFilters({ ...filters, query: e.target.value })}
                    className="text-lg"
                  />
                </div>
                <Button type="submit" className="bg-red-600 hover:bg-red-700 px-8" disabled={loading}>
                  <Search className="h-4 w-4 mr-2" />
                  {loading ? "Pretražujem..." : "Pretraži"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowFilters(!showFilters)} className="px-6">
                  <Filter className="h-4 w-4 mr-2" />
                  Filteri
                </Button>
              </div>

              {/* Advanced filters */}
              {showFilters && (
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="text-lg">Napredni filteri</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="category">Kategorija</Label>
                        <Select
                          value={filters.category}
                          onValueChange={(value) => setFilters({ ...filters, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sve kategorije" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Sve kategorije</SelectItem>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.slug}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="dateFrom">Od datuma</Label>
                        <Input
                          id="dateFrom"
                          type="date"
                          value={filters.dateFrom}
                          onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                        />
                      </div>

                      <div>
                        <Label htmlFor="dateTo">Do datuma</Label>
                        <Input
                          id="dateTo"
                          type="date"
                          value={filters.dateTo}
                          onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button type="submit" size="sm" className="bg-red-600 hover:bg-red-700">
                        Primijeni filtere
                      </Button>
                      <Button type="button" variant="outline" size="sm" onClick={clearFilters}>
                        Obriši filtere
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </form>
          </div>

          {/* Search results */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Results summary */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Rezultati pretrage</h2>
                <p className="text-gray-600 mt-1">
                  {loading ? "Pretražujem..." : `Pronađeno ${results.length} članaka za: ${getSearchSummary()}`}
                </p>
              </div>

              {/* Active filters */}
              {(filters.query || filters.category !== "all" || filters.dateFrom || filters.dateTo) && (
                <div className="flex flex-wrap gap-2">
                  {filters.query && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Search className="h-3 w-3" />
                      {filters.query}
                    </Badge>
                  )}
                  {filters.category !== "all" && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      {categories.find((c) => c.slug === filters.category)?.name}
                    </Badge>
                  )}
                  {filters.dateFrom && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Od {new Date(filters.dateFrom).toLocaleDateString("sr-RS")}
                    </Badge>
                  )}
                  {filters.dateTo && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Do {new Date(filters.dateTo).toLocaleDateString("sr-RS")}
                    </Badge>
                  )}
                </div>
              )}
            </div>

            {/* Results grid */}
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Pretražujem članke...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nema rezultata</h3>
                <p className="text-gray-500 mb-4">
                  Pokušajte sa drugim ključnim riječima ili promijenite filtere pretrage.
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Obriši sve filtere
                </Button>
              </div>
            )}
          </div>

          {/* Popular searches */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-lg">Popularne pretrage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {["politika", "sport", "tehnologija", "AI", "fudbal", "ekonomija", "zdravlje"].map((term) => (
                  <Button
                    key={term}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setFilters({ ...filters, query: term })
                      performSearch()
                    }}
                    className="text-xs"
                  >
                    {term}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
