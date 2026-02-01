"use client"

import type React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getAllCategories } from "@/lib/data-utils"
import { useState } from "react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const categories = getAllCategories()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/pretraga?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-red-600 text-white py-1">
        <div className="container mx-auto px-4 text-sm text-center">
          Najnovije vijesti • Ažuriramo 24/7 • Vaš pouzdani izvor informacija
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-red-600 text-white px-3 py-2 rounded font-bold text-xl">DN</div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dnevne Vijesti</h1>
              <p className="text-sm text-gray-600">Vaš izvor informacija</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-red-600 font-medium">
              Početna
            </Link>
            {categories.slice(0, 5).map((category) => (
              <Link
                key={category.id}
                href={`/kategorija/${category.slug}`}
                className="text-gray-700 hover:text-red-600 font-medium"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="hidden md:flex items-center space-x-2">
              <Input
                type="search"
                placeholder="Pretraži vijesti..."
                className="w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" size="sm" className="bg-red-600 hover:bg-red-700">
                <Search className="h-4 w-4" />
              </Button>
            </form>

            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col space-y-3">
              <Link href="/" className="text-gray-700 hover:text-red-600 font-medium">
                Početna
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/kategorija/${category.slug}`}
                  className="text-gray-700 hover:text-red-600 font-medium"
                >
                  {category.name}
                </Link>
              ))}
              <form onSubmit={handleSearch} className="flex items-center space-x-2 mt-4">
                <Input
                  type="search"
                  placeholder="Pretraži vijesti..."
                  className="flex-1"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" size="sm" className="bg-red-600 hover:bg-red-700">
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
