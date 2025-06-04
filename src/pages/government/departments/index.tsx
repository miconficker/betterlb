import { useParams } from 'react-router-dom'
import { MapPin, Phone, ExternalLink, Building2, Mail } from 'lucide-react'
import departmentsData from '../../../data/directory/departments.json'
import { useState, useEffect } from 'react'

interface Department {
  office_name: string
  address?: string
  trunkline?: string
  website?: string
  email?: string
  [key: string]: any
}

// Recursive component to render department details
function DepartmentDetailSection({
  data,
  level = 0,
}: {
  data: any
  level?: number
}) {
  if (data === null || typeof data !== 'object') {
    return <span className="text-gray-700">{String(data)}</span>
  }

  if (Array.isArray(data)) {
    return (
      <ul className={`space-y-2 ${level > 0 ? 'pl-4' : ''}`}>
        {data.map((item, index) => (
          <li key={index} className="border-l-2 pl-4 border-gray-100">
            <DepartmentDetailSection data={item} level={level + 1} />
          </li>
        ))}
      </ul>
    )
  }

  // Skip these keys as they're displayed in the header
  const skipKeys = ['office_name', 'address', 'trunkline', 'website', 'email']

  const entries = Object.entries(data).filter(
    ([key]) => !skipKeys.includes(key)
  )

  if (entries.length === 0) return null

  return (
    <div
      className={`space-y-4 ${
        level > 0 ? 'pl-4 border-l-2 border-gray-100' : ''
      }`}
    >
      {entries.map(([key, value]) => {
        if (value === undefined || value === null) return null

        const label = key
          .split('_')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')

        return (
          <div key={key} className="space-y-1">
            <h3 className="font-medium text-gray-900">{label}</h3>
            <div className="text-gray-600">
              <DepartmentDetailSection data={value} level={level + 1} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function DepartmentsIndex() {
  const { department: departmentParam } = useParams()
  const [selectedDept, setSelectedDept] = useState<Department | null>(null)
  const departments = departmentsData as Department[]

  // Set selected department based on URL param or first department
  useEffect(() => {
    if (departmentParam) {
      const dept = departments.find(
        (d) => d.office_name === decodeURIComponent(departmentParam)
      )
      if (dept) {
        setSelectedDept(dept)
      }
    } else if (departments.length > 0) {
      setSelectedDept(departments[0])
    } else {
      setSelectedDept(null)
    }
  }, [departmentParam, departments])

  if (!selectedDept) {
    return (
      <div className="bg-white rounded-lg border p-8 text-center h-full flex flex-col items-center justify-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-4">
          <Building2 className="h-6 w-6 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">
          No department selected
        </h3>
        <p className="text-gray-500 max-w-md">
          Select a department from the list to view its details and contact
          information.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border overflow-hidden h-full">
      <div className="p-6 border-b">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedDept.office_name.replace('DEPARTMENT OF ', '')}
            </h2>

            {selectedDept.address && (
              <p className="mt-2 text-gray-600 flex items-start">
                <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                <span>{selectedDept.address}</span>
              </p>
            )}
          </div>

          <div className="flex space-x-2">
            {selectedDept.website && (
              <a
                href={
                  selectedDept.website.startsWith('http')
                    ? selectedDept.website
                    : `https://${selectedDept.website}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1.5 border border-gray-200 rounded-md text-sm font-medium hover:bg-gray-50"
              >
                <span>Website</span>
                <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          {selectedDept.trunkline && (
            <div className="flex items-center text-gray-600">
              <Phone className="h-4 w-4 text-gray-500 mr-1.5 flex-shrink-0" />
              <span>{selectedDept.trunkline}</span>
            </div>
          )}

          {selectedDept.email && (
            <a
              href={`mailto:${selectedDept.email}`}
              className="flex items-center text-gray-600 hover:text-primary-600"
            >
              <Mail className="h-4 w-4 text-gray-500 mr-1.5 flex-shrink-0" />
              <span>{selectedDept.email}</span>
            </a>
          )}
        </div>
      </div>

      <div className="p-6">
        <DepartmentDetailSection data={selectedDept} />
      </div>
    </div>
  )
}
