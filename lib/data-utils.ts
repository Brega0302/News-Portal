import type { Article, Category, SearchFilters } from "./types"
import { mockArticles, categories } from "./mock-data"

// Check if we're in browser and have stored articles
function getArticlesSource(): Article[] {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("articles")
    if (stored) {
      return JSON.parse(stored)
    }
  }
  return mockArticles
}

export function getAllArticles(): Article[] {
  return getArticlesSource().sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export function getFeaturedArticles(): Article[] {
  return getArticlesSource().filter((article) => article.featured)
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return getArticlesSource().filter((article) => article.category.slug === categorySlug)
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getArticlesSource().find((article) => article.slug === slug)
}

export function getAllCategories(): Category[] {
  return categories
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug)
}

export function searchArticles(filters: SearchFilters): Article[] {
  let filteredArticles = getArticlesSource()

  if (filters.category) {
    filteredArticles = filteredArticles.filter((article) => article.category.slug === filters.category)
  }

  if (filters.query) {
    const query = filters.query.toLowerCase()
    filteredArticles = filteredArticles.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.content.toLowerCase().includes(query) ||
        article.tags.some((tag) => tag.toLowerCase().includes(query)),
    )
  }

  if (filters.dateFrom) {
    filteredArticles = filteredArticles.filter(
      (article) => new Date(article.publishedAt) >= new Date(filters.dateFrom!),
    )
  }

  if (filters.dateTo) {
    filteredArticles = filteredArticles.filter((article) => new Date(article.publishedAt) <= new Date(filters.dateTo!))
  }

  if (filters.tags && filters.tags.length > 0) {
    filteredArticles = filteredArticles.filter((article) => filters.tags!.some((tag) => article.tags.includes(tag)))
  }

  return filteredArticles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("sr-RS", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  return getArticlesSource()
    .filter((a) => a.id !== article.id && a.category.id === article.category.id)
    .slice(0, limit)
}
