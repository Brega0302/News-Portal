import Link from "next/link"
import { getAllCategories } from "@/lib/data-utils"

export function Footer() {
  const categories = getAllCategories()

  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-red-600 text-white px-3 py-2 rounded font-bold text-xl">DN</div>
              <div>
                <h3 className="text-xl font-bold">Dnevne Vijesti</h3>
                <p className="text-sm text-gray-400">Vaš izvor informacija</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Dnevne Vijesti su vaš pouzdani izvor najnovijih informacija iz Srbije i svijeta. Pratimo sve važne
              događaje 24/7 i donosimo vam objektivne i provjerene vijesti.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Facebook
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Twitter
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Instagram
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold mb-4">Kategorije</h4>
            <ul className="space-y-2">
              {categories.slice(0, 6).map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/kategorija/${category.slug}`}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4">Korisni linkovi</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/o-nama" className="text-gray-400 hover:text-white transition-colors text-sm">
                  O nama
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Kontakt
                </Link>
              </li>
              <li>
                <Link href="/pretraga" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Pretraga
                </Link>
              </li>
              <li>
                <Link href="/privatnost" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Politika privatnosti
                </Link>
              </li>
              <li>
                <Link href="/uslovi" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Uslovi korišćenja
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Admin panel
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">© 2024 Dnevne Vijesti. Sva prava zadržana.</p>
        </div>
      </div>
    </footer>
  )
}
