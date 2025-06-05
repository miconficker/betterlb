import { useNavigate, useParams, Link, useLocation } from 'react-router-dom'
import { Search, Globe, Building2, Landmark } from 'lucide-react'
import { useState } from 'react'
import diplomaticData from '../../../../data/directory/diplomatic.json'

export default function DiplomaticSidebar() {
  const [searchTerm, setSearchTerm] = useState('')
  const { category: categoryParam } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  
  // Check if a path is active
  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <div className="w-full md:w-80 flex-shrink-0">
      <div className="sticky top-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="search"
            placeholder="Search diplomatic..."
            className="pl-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="border rounded-lg overflow-hidden bg-white">
          <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
            <nav className="p-2 space-y-4 pt-4">
              <div>
                <h3 className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Diplomatic Categories
                </h3>
                <ul className="space-y-1">
                  <li>
                    <Link
                      to="/government/diplomatic/missions"
                      className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                        isActive('/government/diplomatic/missions')
                          ? 'bg-primary-50 text-primary-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Globe className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                      <span>Diplomatic Missions</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/government/diplomatic/consulates"
                      className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                        isActive('/government/diplomatic/consulates')
                          ? 'bg-primary-50 text-primary-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Building2 className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                      <span>Consulates</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/government/diplomatic/organizations"
                      className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                        isActive('/government/diplomatic/organizations')
                          ? 'bg-primary-50 text-primary-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Landmark className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                      <span>International Organizations</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}
