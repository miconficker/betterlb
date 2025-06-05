import { useState, useMemo } from 'react'
import { Search, Globe, MapPin, Phone, Mail, ExternalLink } from 'lucide-react'
import diplomaticData from '../../../data/directory/diplomatic.json'

interface DiplomaticMission {
  country: string
  office_name: string
  address: string
  contact: string
  email?: string
  website?: string
  representative: string
  title: string
}

export default function DiplomaticMissionsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  
  // Get diplomatic missions data
  const missions = diplomaticData["Diplomatic Mission"] || []
  
  // Filter missions based on search term
  const filteredMissions = useMemo(() => {
    return missions.filter((mission: DiplomaticMission) => 
      mission.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mission.office_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mission.representative.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [missions, searchTerm])

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Diplomatic Missions
          </h1>
          <p className="text-gray-500 mt-1">
            {missions.length} diplomatic missions in the Philippines
          </p>
        </div>
        
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="search"
            placeholder="Search missions..."
            className="pl-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredMissions.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-lg border">
          <div className="mx-auto w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-4">
            <Globe className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No diplomatic missions found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search term.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMissions.map((mission: DiplomaticMission, index) => (
            <div key={index} className="bg-white rounded-lg border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 text-lg">{mission.country}</h3>
                  <div className="bg-blue-50 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
                    Mission
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">{mission.office_name}</p>
                
                <div className="space-y-2 text-sm">
                  {mission.address && (
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                      <span className="text-gray-600">{mission.address}</span>
                    </div>
                  )}
                  
                  {mission.contact && (
                    <div className="flex items-start">
                      <Phone className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                      <span className="text-gray-600">{mission.contact}</span>
                    </div>
                  )}
                  
                  {mission.email && (
                    <div className="flex items-start">
                      <Mail className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                      <a 
                        href={`mailto:${mission.email}`} 
                        className="text-primary-600 hover:underline"
                      >
                        {mission.email}
                      </a>
                    </div>
                  )}
                  
                  {mission.website && (
                    <div className="flex items-start">
                      <Globe className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                      <a
                        href={mission.website.startsWith('http') ? mission.website : `https://${mission.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:underline flex items-center"
                      >
                        <span>{mission.website}</span>
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="font-medium text-gray-900">{mission.representative}</p>
                  <p className="text-sm text-gray-600">{mission.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
