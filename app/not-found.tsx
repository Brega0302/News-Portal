import Link from "next/link"
import { Home, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <div className="bg-red-600 text-white px-4 py-3 rounded font-bold text-3xl mx-auto w-fit mb-4">DN</div>
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Stranica nije pronađena</h2>
          <p className="text-gray-600 mb-8">Stranica koju tražite ne postoji ili je premještena.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="bg-red-600 hover:bg-red-700">
              <Home className="h-4 w-4 mr-2" />
              Početna stranica
            </Button>
          </Link>
          <Link href="/pretraga">
            <Button variant="outline">
              <Search className="h-4 w-4 mr-2" />
              Pretraži vijesti
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
