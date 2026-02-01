import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArticleCard } from "@/components/article-card"
import { Badge } from "@/components/ui/badge"
import { getCategoryBySlug, getArticlesByCategory } from "@/lib/data-utils"
import type { Metadata } from "next"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = getCategoryBySlug(params.slug)

  if (!category) {
    return {
      title: "Kategorija nije pronađena - Dnevne Vijesti",
    }
  }

  return {
    title: `${category.name} - Dnevne Vijesti`,
    description: `Najnovije vijesti iz kategorije ${category.name}. ${category.description}`,
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.slug)

  if (!category) {
    notFound()
  }

  const articles = getArticlesByCategory(params.slug)

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

          {/* Category header */}
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Badge style={{ backgroundColor: category.color }} className="text-white text-lg px-4 py-2">
                {category.name}
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{category.name}</h1>
            <p className="text-lg text-gray-600 mb-4">{category.description}</p>
            <p className="text-sm text-gray-500">
              {articles.length} {articles.length === 1 ? "članak" : "članaka"} u ovoj kategoriji
            </p>
          </div>

          {/* Articles grid */}
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <p className="text-gray-500 text-lg mb-4">Nema objavljenih članaka u ovoj kategoriji</p>
              <Link href="/" className="text-red-600 hover:text-red-700 font-medium">
                Vratite se na početnu stranicu
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
