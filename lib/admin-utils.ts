import type { Article } from "./types"
import { mockArticles } from "./mock-data"

// Simple admin authentication using localStorage
export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem("admin_authenticated") === "true"
}

export function adminLogin(password: string): boolean {
  // Simple password check - in real app this would be secure
  if (password === "admin123") {
    localStorage.setItem("admin_authenticated", "true")
    return true
  }
  return false
}

export function adminLogout(): void {
  localStorage.removeItem("admin_authenticated")
}

// Article management functions
export function getStoredArticles(): Article[] {
  if (typeof window === "undefined") return mockArticles

  const stored = localStorage.getItem("articles")
  if (stored) {
    return JSON.parse(stored)
  }

  // Initialize with mock data if no stored articles
  localStorage.setItem("articles", JSON.stringify(mockArticles))
  return mockArticles
}

export function saveArticle(article: Article): void {
  const articles = getStoredArticles()
  const existingIndex = articles.findIndex((a) => a.id === article.id)

  if (existingIndex >= 0) {
    articles[existingIndex] = article
  } else {
    articles.unshift(article)
  }

  localStorage.setItem("articles", JSON.stringify(articles))
}

export function deleteArticle(id: string): void {
  const articles = getStoredArticles()
  const filtered = articles.filter((a) => a.id !== id)
  localStorage.setItem("articles", JSON.stringify(filtered))
}

export function generateArticleId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9)
}

export function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[čćžšđ]/g, (match) => {
      const map: { [key: string]: string } = { č: "c", ć: "c", ž: "z", š: "s", đ: "d" }
      return map[match] || match
    })
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}
