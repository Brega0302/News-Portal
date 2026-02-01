import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getAllCategories, getAllArticles } from "@/lib/data-utils"

export function Sidebar() {
  const categories = getAllCategories()
  const recentArticles = getAllArticles().slice(0, 5)

  return (
    <aside className="space-y-6">
      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Kategorije</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/kategorija/${category.slug}`}
                className="flex items-center justify-between p-2 rounded hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium">{category.name}</span>
                <Badge variant="secondary" style={{ backgroundColor: category.color, color: "white" }}>
                  {getAllArticles().filter((a) => a.category.id === category.id).length}
                </Badge>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Articles */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Najnovije vijesti</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentArticles.map((article) => (
              <Link key={article.id} href={`/vijest/${article.slug}`} className="block group">
                <h4 className="font-medium text-sm group-hover:text-red-600 transition-colors text-balance">
                  {article.title}
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(article.publishedAt).toLocaleDateString("sr-RS")}
                </p>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Newsletter */}
      <Card className="bg-red-50">
        <CardHeader>
          <CardTitle className="text-lg text-red-800">Newsletter</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-red-700 mb-3">
            Prijavite se za naš newsletter i budite prvi koji će saznati najnovije vijesti.
          </p>
          <div className="space-y-2">
            <input
              type="email"
              placeholder="Vaš email"
              className="w-full px-3 py-2 border border-red-200 rounded text-sm"
            />
            <button className="w-full bg-red-600 text-white py-2 rounded text-sm hover:bg-red-700 transition-colors">
              Prijavite se
            </button>
          </div>
        </CardContent>
      </Card>
    </aside>
  )
}
