import { useState, useMemo } from 'react'
import { Search, Landmark, MapPin, Phone, Mail, ExternalLink } from 'lucide-react'
import diplomaticData from '../../../data/directory/diplomatic.json'

interface Organization {
  organization_name: string
  address: string
  contact: string
  email?: string
  website?: string
  head: string
  title: string
}

export default function InternationalOrganizationsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  
  // Get international organizations data
  const organizations = diplomaticData["International Organization"] || []
  
  // Filter organizations based on search term
  const filteredOrganizations = useMemo(() => {
    return organizations.filter((org: Organization) => 
      org.organization_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.head.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [organizations, searchTerm])

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            International Organizations
          </h1>
          <p className="text-gray-500 mt-1">
            {organizations.length} international organizations in the Philippines
          </p>
        </div>
        
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="search"
            placeholder="Search organizations..."
            className="pl-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredOrganizations.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-lg border">
          <div className="mx-auto w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-4">
            <Landmark className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No organizations found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search term.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredOrganizations.map((org: Organization, index) => (
            <div key={index} className="bg-white rounded-lg border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 text-lg">{org.organization_name}</h3>
                  <div className="bg-purple-50 text-purple-700 text-xs font-medium px-2 py-1 rounded-full">
                    Organization
                  </div>
                </div>
                
                <div className="space-y-2 text-sm mt-4">
                  {org.address && (
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                      <span className="text-gray-600">{org.address}</span>
                    </div>
                  )}
                  
                  {org.contact && (
                    <div className="flex items-start">
                      <Phone className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                      <span className="text-gray-600">{org.contact}</span>
                    </div>
                  )}
                  
                  {org.email && (
                    <div className="flex items-start">
                      <Mail className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                      <a 
                        href={`mailto:${org.email}`} 
                        className="text-primary-600 hover:underline"
                      >
                        {org.email}
                      </a>
                    </div>
                  )}
                  
                  {org.website && (
                    <div className="flex items-start">
                      <ExternalLink className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                      <a
                        href={org.website.startsWith('http') ? org.website : `https://${org.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:underline"
                      >
                        Website
                      </a>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="font-medium text-gray-900">{org.head}</p>
                  <p className="text-sm text-gray-600">{org.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
