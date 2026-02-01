import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, User, Clock, Tag, ArrowLeft } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArticleCard } from "@/components/article-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getArticleBySlug, getRelatedArticles, formatDate } from "@/lib/data-utils"
import type { Metadata } from "next"

interface ArticlePageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = getArticleBySlug(params.slug)

  if (!article) {
    return {
      title: "Članak nije pronađen - Dnevne Vijesti",
    }
  }

  return {
    title: `${article.title} - Dnevne Vijesti`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.imageUrl],
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.imageUrl],
    },
  }
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  const relatedArticles = getRelatedArticles(article)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-red-600 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Nazad na početnu
          </Link>

          {/* Article header */}
          <article className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative h-64 md:h-96">
              <Image src={article.imageUrl || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
            </div>

            <div className="p-6 md:p-8">
              {/* Category and meta */}
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <Badge style={{ backgroundColor: article.category.color }} className="text-white">
                  {article.category.name}
                </Badge>
                {article.featured && <Badge variant="secondary">Izdvojeno</Badge>}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-balance">{article.title}</h1>

              {/* Excerpt */}
              <p className="text-xl text-gray-600 mb-6 text-pretty">{article.excerpt}</p>

              {/* Article meta */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(article.publishedAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{article.readTime} min čitanja</span>
                </div>
              </div>

              {/* Article content */}
              <div
                className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Tags */}
              {article.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Tagovi:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Share buttons */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-700 mb-3">Podijelite članak:</p>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 bg-transparent">
                    Facebook
                  </Button>
                  <Button variant="outline" size="sm" className="text-blue-400 border-blue-200 bg-transparent">
                    Twitter
                  </Button>
                  <Button variant="outline" size="sm" className="text-blue-700 border-blue-200 bg-transparent">
                    LinkedIn
                  </Button>
                </div>
              </div>
            </div>
          </article>

          {/* Related articles */}
          {relatedArticles.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Povezani članci</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <ArticleCard key={relatedArticle.id} article={relatedArticle} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
