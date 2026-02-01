"use client"

import Link from "next/link"
import { LogOut, Home, Plus, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { adminLogout } from "@/lib/admin-utils"
import { useRouter } from "next/navigation"

export function AdminHeader() {
  const router = useRouter()

  const handleLogout = () => {
    adminLogout()
    router.push("/admin/login")
  }

  return (
    <header className="bg-gray-900 text-white border-b border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link href="/admin" className="flex items-center space-x-2">
              <div className="bg-red-600 text-white px-3 py-2 rounded font-bold">DN</div>
              <div>
                <h1 className="text-xl font-bold">Admin Panel</h1>
                <p className="text-sm text-gray-400">Upravljanje vijestima</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center space-x-4">
              <Link href="/admin" className="flex items-center space-x-2 text-gray-300 hover:text-white">
                <List className="h-4 w-4" />
                <span>Svi članci</span>
              </Link>
              <Link href="/admin/novi" className="flex items-center space-x-2 text-gray-300 hover:text-white">
                <Plus className="h-4 w-4" />
                <span>Novi članak</span>
              </Link>
              <Link href="/" className="flex items-center space-x-2 text-gray-300 hover:text-white">
                <Home className="h-4 w-4" />
                <span>Početna</span>
              </Link>
            </nav>
          </div>

          <Button variant="ghost" onClick={handleLogout} className="text-gray-300 hover:text-white">
            <LogOut className="h-4 w-4 mr-2" />
            Odjavi se
          </Button>
        </div>
      </div>
    </header>
  )
}
