import { useNavigate, useParams, Link, useLocation } from 'react-router-dom'
import { Search, Building2, Database, GraduationCap } from 'lucide-react'
import { useState, useMemo } from 'react'
import constitutionalData from '../../../../data/directory/constitutional.json'

interface ConstitutionalOffice {
  name: string
  office_type: string
  description?: string
  address?: string
  trunklines?: string[]
  trunk_line?: string
  website?: string
  email?: string
  [key: string]: any
}

interface ConstitutionalSidebarProps {
  onOfficeSelect?: (office: ConstitutionalOffice) => void
}

export default function ConstitutionalSidebar({
  onOfficeSelect,
}: ConstitutionalSidebarProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const { office: officeParam } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  // Only include constitutional offices (exclude GOCCs and SUCs)
  const offices = useMemo(() => {
    return constitutionalData.filter(
      (office: any) =>
        !office.office_type.includes('Government-Owned') &&
        !office.office_type.includes('GOCCs') &&
        !office.office_type.includes('State Universities') &&
        !office.office_type.includes('SUCs')
    ) as ConstitutionalOffice[]
  }, [])

  // Filter offices based on search term
  const filteredOffices = useMemo(() => {
    if (!searchTerm) return offices

    return offices.filter((office) =>
      office.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [offices, searchTerm])

  const handleOfficeSelect = (office: ConstitutionalOffice) => {
    if (onOfficeSelect) {
      onOfficeSelect(office)
    }
    navigate(`/government/constitutional/${encodeURIComponent(office.name)}`)
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
            placeholder="Search constitutional offices..."
            className="pl-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="border rounded-lg overflow-hidden bg-white">
          <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
            <nav className="p-2 space-y-4">
              {/* Constitutional offices */}
              <div>
                <h3 className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Constitutional Offices
                </h3>
                {filteredOffices.length === 0 ? (
                  <div className="p-4 text-center text-sm text-gray-500">
                    No offices found
                  </div>
                ) : (
                  <ul className="space-y-1">
                    {filteredOffices.map((office) => (
                      <li key={office.name}>
                        <button
                          onClick={() => handleOfficeSelect(office)}
                          className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                            officeParam === office.name
                              ? 'bg-primary-50 text-primary-700 font-medium'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center">
                            <Building2 className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                            <span className="truncate">{office.name}</span>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Special category links */}
              <div>
                <h3 className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Others
                </h3>
                <ul className="space-y-1">
                  <li>
                    <Link
                      to="/government/constitutional/goccs"
                      className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                        isActive('/government/constitutional/goccs')
                          ? 'bg-primary-50 text-primary-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Database className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                      <span>Government-Owned Corporations</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/government/constitutional/sucs"
                      className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                        isActive('/government/constitutional/sucs')
                          ? 'bg-primary-50 text-primary-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <GraduationCap className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                      <span>State Universities & Colleges</span>
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
