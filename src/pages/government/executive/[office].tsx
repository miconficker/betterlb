import { useParams, Link } from 'react-router-dom'
import Button from '../../../components/ui/Button'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import executiveData from '../../../data/directory/executive.json'

interface Office {
  office_name: string
  address?: string
  trunkline?: string
  website?: string
  [key: string]: any
}

// Recursive component to render nested office details
function OfficeDetailSection({
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
      <ul className="space-y-2">
        {data.map((item, index) => (
          <li key={index} className="pl-4 border-l-2 border-gray-200">
            <OfficeDetailSection data={item} level={level + 1} />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div
      className={`space-y-4 ${
        level > 0 ? 'pl-4 border-l-2 border-gray-100' : ''
      }`}
    >
      {Object.entries(data).map(([key, value]) => {
        if (key === 'office_name' || value === undefined) return null

        const label = key
          .split('_')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')

        return (
          <div key={key} className="space-y-1">
            <h3 className="text-sm font-medium text-gray-500">{label}</h3>
            <div className="pl-2">
              <OfficeDetailSection data={value} level={level + 1} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function OfficeDetail() {
  const { office: officeName } = useParams<{ office: string }>()
  const office = (executiveData as Office[]).find(
    (o) => o.office_name === decodeURIComponent(officeName || '')
  )

  if (!office) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">Office not found</h2>
        <Button asChild>
          <Link to="/government/executive" className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Executive Directory
          </Link>
        </Button>
      </div>
    )
  }

  // Extract top-level details
  const { office_name, address, trunkline, website, ...details } = office

  return (
    <div className="space-y-6">
      <Button variant="outline" asChild className="mb-6">
        <Link to="/government/executive" className="no-underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Executive Directory
        </Link>
      </Button>

      <div className="space-y-6">
        <div className="border-b pb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {office_name}
          </h1>

          {(address || trunkline || website) && (
            <div className="mt-4 space-y-2">
              {address && (
                <p className="text-gray-600 flex items-start">
                  <svg
                    className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {address}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 pt-2">
                {website && (
                  <a
                    href={
                      website.startsWith('http')
                        ? website
                        : `https://${website}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary-600 hover:text-primary-800 hover:underline text-sm"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Visit Website
                  </a>
                )}
                {trunkline && (
                  <div className="flex items-center text-sm text-gray-600">
                    <svg
                      className="h-4 w-4 text-gray-500 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    {trunkline}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Office Details
          </h2>
          <div className="space-y-6">
            <OfficeDetailSection data={details} />
          </div>
        </div>
      </div>
    </div>
  )
}
