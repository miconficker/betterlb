import { useNavigate, useParams, Link, useLocation } from 'react-router-dom'
import {
  Search,
  Building,
  LandPlot,
  Users,
  BookOpen,
  GanttChart,
} from 'lucide-react'
import { useState } from 'react'
import legislativeData from '../../../../data/directory/legislative.json'

export default function LegislativeSidebar() {
  const [searchTerm, setSearchTerm] = useState('')
  const { chamber: chamberParam } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  // Get unique chambers from the data
  const chambers = legislativeData.map((item: any) => item.chamber)

  // Filter chambers based on search term
  const filteredChambers = chambers.filter((chamber) =>
    chamber.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleChamberSelect = (chamber: string) => {
    navigate(`/government/legislative/${encodeURIComponent(chamber)}`)
  }

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
            placeholder="Search legislative..."
            className="pl-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="border rounded-lg overflow-hidden bg-white">
          <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
            <nav className="p-2 space-y-4 pt-4">
              {/* Senate Section */}
              <div>
                <h3 className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Senate
                </h3>
                <ul className="space-y-1">
                  <li>
                    <Link
                      to="/government/legislative/Senate of the Philippines (19th Congress)"
                      className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                        chamberParam ===
                        'Senate of the Philippines (19th Congress)'
                          ? 'bg-primary-50 text-primary-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Building className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                      <span>Senate of the Philippines (19th Congress)</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/government/legislative/senate-committees"
                      className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                        isActive('/government/legislative/senate-committees')
                          ? 'bg-primary-50 text-primary-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <BookOpen className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                      <span>Committees</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* House of Representatives Section */}
              <div>
                <h3 className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                  House of Representatives
                </h3>
                <ul className="space-y-1">
                  <li>
                    <Link
                      to="/government/legislative/House of Representatives (19th Congress)"
                      className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                        chamberParam ===
                        'House of Representatives (19th Congress)'
                          ? 'bg-primary-50 text-primary-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <LandPlot className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                      <span>House of Representatives (19th Congress)</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/government/legislative/house-members"
                      className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                        isActive('/government/legislative/house-members')
                          ? 'bg-primary-50 text-primary-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Users className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                      <span>Members by Province</span>
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
