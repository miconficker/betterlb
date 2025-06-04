import { useNavigate, useParams } from 'react-router-dom'
import { Search, Building2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import departmentsData from '../../../../data/directory/departments.json'

interface Department {
  office_name: string
  address?: string
  trunkline?: string
  website?: string
  email?: string
  [key: string]: any
}

interface DepartmentsSidebarProps {
  onDepartmentSelect?: (department: Department) => void
}

export default function DepartmentsSidebar({
  onDepartmentSelect,
}: DepartmentsSidebarProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const { department: departmentParam } = useParams()
  const navigate = useNavigate()
  const departments = departmentsData as Department[]

  const filteredDepartments = departments.filter((dept) =>
    dept.office_name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDeptSelect = (dept: Department) => {
    if (onDepartmentSelect) {
      onDepartmentSelect(dept)
    }
    navigate(`/government/departments/${encodeURIComponent(dept.office_name)}`)
  }

  return (
    <div className="w-full md:w-80 flex-shrink-0">
      <div className="sticky top-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="search"
            placeholder="Search departments..."
            className="pl-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="border rounded-lg overflow-hidden bg-white">
          <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
            {filteredDepartments.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500">
                No departments found
              </div>
            ) : (
              <nav className="p-1">
                <ul className="space-y-1">
                  {filteredDepartments.map((dept) => (
                    <li key={dept.office_name}>
                      <button
                        onClick={() => handleDeptSelect(dept)}
                        className={`w-full text-left px-4 py-3 text-sm rounded-md transition-colors ${
                          departmentParam === dept.office_name
                            ? 'bg-primary-50 text-primary-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center">
                          <Building2 className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                          <span className="truncate">{dept.office_name}</span>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
