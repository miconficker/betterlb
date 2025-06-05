import { NavLink } from 'react-router-dom'
import { MapPin, Building2, Users } from 'lucide-react'
import lguData from '../../../../data/directory/lgu.json'

interface LocalSidebarProps {
  currentRegion?: string
}

export default function LocalSidebar({ currentRegion }: LocalSidebarProps) {
  const regions = lguData.map((regionData) => {
    let cityCount = 0

    // Count direct cities (if any)
    if (regionData.cities) {
      cityCount += regionData.cities.length
    }
    
    // Count direct municipalities (if any)
    if (regionData.municipalities) {
      cityCount += regionData.municipalities.length
    }
    
    // Count cities and municipalities in provinces (if any)
    if (regionData.provinces) {
      cityCount += regionData.provinces.reduce((total, province: any) => {
        const cities = province.cities?.length || 0
        const municipalities = province.municipalities?.length || 0
        return total + cities + municipalities
      }, 0)
    }

    return {
      name: regionData.region,
      slug: regionData.slug,
      cityCount,
    }
  })

  return (
    <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <nav className="space-y-1">
          <NavLink
            to="/government/local"
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive && !currentRegion
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`
            }
            end
          >
            <MapPin className="mr-3 h-4 w-4" />
            All Regions
          </NavLink>

          <div className="pt-2">
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Regions
            </p>
            <div className="mt-2 space-y-1  overflow-y-auto">
              {regions.map((region) => (
                <NavLink
                  key={region.slug}
                  to={`/government/local/${region.slug}`}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-sm transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`
                  }
                >
                  <div className="flex items-center justify-between">
                    <span className="truncate flex-1" title={region.name}>
                      {region.name}
                    </span>
                    <div className="flex items-center ml-2">
                      <Users className="h-3 w-3 text-gray-400 mr-1" />
                      <span className="text-xs text-gray-500">
                        {region.cityCount}
                      </span>
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}
