import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import executiveData from '../../../data/directory/executive.json'

interface Office {
  office_name: string
  address?: string
  trunkline?: string
  website?: string
  [key: string]: any
}

export default function ExecutiveDirectory() {
  const [searchTerm, setSearchTerm] = useState('')
  const offices = executiveData as Office[]

  const filteredOffices = offices.filter((office) =>
    office.office_name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="search"
              placeholder="Search executive offices..."
              className="pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2 text-center">
            {filteredOffices.length} offices found
          </p>
        </div>
      </div>

      {filteredOffices.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No offices found matching your search.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOffices.map((office) => (
            <Link
              key={office.office_name}
              to={`/government/executive/${encodeURIComponent(
                office.office_name
              )}`}
              className="group block"
            >
              <div className="h-full border rounded-lg overflow-hidden hover:border-primary-300 transition-colors duration-200">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 mb-2 line-clamp-2">
                    {office.office_name}
                  </h2>

                  {office.address && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {office.address}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-4">
                    {office.website && (
                      <span className="inline-flex items-center text-xs text-primary-600 hover:underline">
                        Visit Website
                        <svg
                          className="w-3 h-3 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </span>
                    )}
                    {office.trunkline && (
                      <span className="text-xs text-gray-500">
                        {office.trunkline}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
