export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  imageUrl: string
  category: Category
  author: string
  publishedAt: string
  updatedAt: string
  featured: boolean
  tags: string[]
  readTime: number
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  color: string
}

export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "editor" | "author"
}

export interface SearchFilters {
  category?: string
  dateFrom?: string
  dateTo?: string
  query?: string
  tags?: string[]
}
