import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { InstantSearch, Configure, useHits } from 'react-instantsearch'
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import 'instantsearch.css/themes/satellite.css'
import { exportMeilisearchData } from '../../lib/exportData'
import {
  ChevronLeft,
  Download,
  X,
  Info,
  Loader2,
  ZoomIn,
  ZoomOut,
  Search,
} from 'lucide-react'
import Button from '../../components/ui/Button'
import { ScrollArea } from '../../components/ui/ScrollArea'
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet'
import L, { LatLngExpression, GeoJSON as LeafletGeoJSON, Layer } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import FloodControlProjectsTab from './tab'

// Import lookup data
import infraYearData from '../../data/flood_control/lookups/InfraYear_with_counts.json'
import typeOfWorkData from '../../data/flood_control/lookups/TypeofWork_with_counts.json'
import philippinesRegionsData from '../../data/philippines-regions.json'

// Define types for our data
interface DataItem {
  value: string
  count: number
}

// Define types for region data and GeoJSON properties
interface RegionData {
  id: string
  name: string
  description?: string
  population?: string
  capital?: string
  area?: string
  provinces?: string[]
  wikipedia?: string
  loading?: boolean
  projectCount?: number
  totalCost?: number
}

interface RegionProperties {
  name: string // Region name from GeoJSON
  capital?: string
  population?: string
  provinces?: string[]
  // Add other properties from your GeoJSON if needed
}

interface FloodControlProject {
  GlobalID?: string
  objectID?: string
  ProjectDescription?: string
  InfraYear?: string
  Region?: string
  Province?: string
  Municipality?: string
  TypeofWork?: string
  Contractor?: string
  ContractCost?: string
  Latitude?: string
  Longitude?: string
}

// Custom component to access Meilisearch hits for map
const MapHitsComponent = ({
  onHitsUpdate,
}: {
  onHitsUpdate: (hits: FloodControlProject[]) => void
}) => {
  const { hits } = useHits<FloodControlProject>()

  useEffect(() => {
    onHitsUpdate(hits)
  }, [hits, onHitsUpdate])

  return null
}

// Meilisearch configuration
const MEILISEARCH_HOST =
  import.meta.env.VITE_MEILISEARCH_HOST || 'http://localhost'
const MEILISEARCH_PORT = import.meta.env.VITE_MEILISEARCH_PORT || '7700'
const MEILISEARCH_SEARCH_API_KEY =
  import.meta.env.VITE_MEILISEARCH_SEARCH_API_KEY ||
  'your_public_search_key_here'

// Create search client with proper type casting
const meiliSearchInstance = instantMeiliSearch(
  `${MEILISEARCH_HOST}:${MEILISEARCH_PORT}`,
  MEILISEARCH_SEARCH_API_KEY,
  {
    primaryKey: 'GlobalID',
    keepZeroFacets: true,
  }
)

// Extract the searchClient from meiliSearchInstance
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const searchClient = meiliSearchInstance.searchClient as any

// Define filter dropdown component props
interface FilterDropdownProps {
  name: string
  options: DataItem[]
  value: string
  onChange: (value: string) => void
  searchable?: boolean
}

// Filter dropdown component with search capability
const FilterDropdown: React.FC<FilterDropdownProps> = ({
  name,
  options,
  value,
  onChange,
  searchable = false,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredOptions =
    searchable && searchTerm
      ? options.filter((option) =>
          option.value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : options

  return (
    <div className="relative">
      <button
        type="button"
        className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">{value ? value : `Select ${name}`}</span>
        <ChevronLeft
          className={`w-4 h-4 ml-2 transform ${
            isOpen ? 'rotate-90' : '-rotate-90'
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {searchable && (
            <div className="p-2 border-b border-gray-200">
              <input
                type="text"
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}

          <ScrollArea className="max-h-60">
            <div className="py-1">
              <button
                type="button"
                className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${
                  !value ? 'bg-blue-50 text-blue-600' : ''
                }`}
                onClick={() => {
                  onChange('')
                  setIsOpen(false)
                }}
              >
                All
              </button>

              {filteredOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${
                    value === option.value ? 'bg-blue-50 text-blue-600' : ''
                  }`}
                  onClick={() => {
                    onChange(option.value)
                    setIsOpen(false)
                  }}
                >
                  <div className="flex justify-between items-center">
                    <span className="truncate">{option.value}</span>
                    <span className="text-gray-500 text-xs">
                      {option.count}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  )
}

const FloodControlProjectsMap: React.FC = () => {
  // State for filters
  const [filters, setFilters] = useState({
    InfraYear: '',
    TypeofWork: '',
  })

  // State for search term
  const [searchTerm, setSearchTerm] = useState<string>('')

  // Loading state for export
  const [isExporting, setIsExporting] = useState<boolean>(false)

  // Map states
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null)
  const [hoveredRegionName, setHoveredRegionName] = useState<string | null>(
    null
  )
  const [mapData] = useState<GeoJSON.FeatureCollection<any, RegionProperties>>(
    philippinesRegionsData as GeoJSON.FeatureCollection<any, RegionProperties>
  )
  const [isLoadingDetails, setIsLoadingDetails] = useState(false)
  const [mapProjects, setMapProjects] = useState<FloodControlProject[]>([])
  const [zoomLevel, setZoomLevel] = useState<number>(6)
  const mapRef = useRef<L.Map>(null)
  const geoJsonLayerRef = useRef<LeafletGeoJSON | null>(null)

  const initialCenter: LatLngExpression = [12.8797, 121.774] // Philippines center
  const initialZoom = 6

  // Handle filter change
  const handleFilterChange = (filterName: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }))
  }

  // Export data function
  const handleExportData = async () => {
    // Set loading state
    setIsExporting(true)

    // Build filter string based on selected filters
    const filterStrings: string[] = ['type = "flood_control"']

    if (filters.InfraYear) {
      filterStrings.push(`FundingYear = ${filters.InfraYear}`)
    }

    if (filters.TypeofWork) {
      filterStrings.push(`TypeofWork = "${filters.TypeofWork}"`)
    }

    // Add selected region filter if one is selected
    if (selectedRegion && selectedRegion.name) {
      filterStrings.push(`Region = "${selectedRegion.name}"`)
    }

    const filterString = filterStrings.join(' AND ')

    try {
      await exportMeilisearchData({
        host: MEILISEARCH_HOST,
        port: MEILISEARCH_PORT,
        apiKey: MEILISEARCH_SEARCH_API_KEY,
        indexName: 'bettergov_flood_control',
        filters: filterString,
        searchTerm,
        filename: 'flood-control-projects-map',
      })
      // Show success message
      alert('Data exported successfully!')
    } catch (error) {
      console.error('Error exporting data:', error)
      alert('Failed to export data. Please try again.')
    } finally {
      // Reset loading state
      setIsExporting(false)
    }
  }

  // Build filter string for Meilisearch
  const buildFilterString = (): string => {
    // Start with an empty array - we'll add filters as needed
    const filterStrings: string[] = []

    // Always filter by type - format it correctly
    filterStrings.push('type = "flood_control"')

    // InfraYear is not filterable, try using FundingYear instead if they represent the same data
    if (filters.InfraYear && filters.InfraYear.trim()) {
      filterStrings.push(`FundingYear = ${filters.InfraYear.trim()}`)
    }

    if (filters.TypeofWork && filters.TypeofWork.trim()) {
      filterStrings.push(`TypeofWork = "${filters.TypeofWork.trim()}"`)
    }

    // Add selected region filter if one is selected
    if (selectedRegion && selectedRegion.name) {
      filterStrings.push(`Region = "${selectedRegion.name}"`)
    }

    return filterStrings.length > 0 ? filterStrings.join(' AND ') : ''
  }

  const getRegionName = (
    feature: GeoJSON.Feature<any, RegionProperties>
  ): string => {
    const props = feature.properties
    return props?.name || ''
  }

  // Style for GeoJSON features
  const regionStyle = (feature?: GeoJSON.Feature<any, RegionProperties>) => {
    if (!feature) return {}
    const regionName = getRegionName(feature)
    const isSelected = selectedRegion?.id === regionName
    const isHovered = hoveredRegionName === regionName

    return {
      fillColor: isSelected ? '#6D28D9' : isHovered ? '#A78BFA' : '#EDE9FE',
      weight: isSelected || isHovered ? 2 : 1,
      opacity: 1,
      color: isSelected || isHovered ? '#4C1D95' : '#A78BFA',
      fillOpacity: 0.7,
    }
  }

  // Handle region click
  const onRegionClick = useCallback(
    (feature: GeoJSON.Feature<any, RegionProperties>) => {
      if (!feature.properties) return
      const props = feature.properties
      const regionName = props.name

      const regionDetails: RegionData = {
        id: regionName,
        name: regionName,
        loading: true,
      }
      setSelectedRegion(regionDetails)

      // Center map on the region
      if (mapRef.current && feature.geometry) {
        // We know this is a valid geometry
        const bounds = L.geoJSON(feature.geometry).getBounds()
        mapRef.current.fitBounds(bounds)
        setZoomLevel(mapRef.current.getZoom())
      }
    },
    []
  )

  // Event handlers for each feature
  const onEachFeature = (
    feature: GeoJSON.Feature<any, RegionProperties>,
    layer: Layer
  ) => {
    layer.on({
      click: () => onRegionClick(feature),
      mouseover: (e) => {
        setHoveredRegionName(getRegionName(feature))
        e.target.setStyle(regionStyle(feature)) // Re-apply style with hover state
        e.target.bringToFront()
      },
      mouseout: (e) => {
        setHoveredRegionName(null)
        // Reset to default style or selected style if it's the selected region
        if (geoJsonLayerRef.current) {
          geoJsonLayerRef.current.resetStyle(e.target)
        }
      },
    })
  }

  const handleZoomIn = () => mapRef.current?.zoomIn()
  const handleZoomOut = () => mapRef.current?.zoomOut()

  // Update search term when it changes in the search box
  const handleSearchChange = (query: string) => {
    setSearchTerm(query)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Flood Control Projects Map | BetterGov.ph</title>
        <meta
          name="description"
          content="Explore flood control projects on an interactive map"
        />
      </Helmet>

      {/* Simplified layout with minimal filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          {/* Page header */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Flood Control Projects Map
            </h1>
            <Button
              variant="outline"
              leftIcon={isExporting ? null : <Download className="w-4 h-4" />}
              onClick={handleExportData}
              disabled={isExporting}
            >
              {isExporting ? 'Exporting...' : 'Export Data'}
            </Button>
          </div>

          {/* View Tabs */}
          <FloodControlProjectsTab selectedTab="map" />

          {/* Minimal filters - only search, year, and type of work */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Search Projects
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Search projects, contractors, municipality..."
                    value={searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                  />
                </div>
              </div>

              <div className="min-w-[150px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year
                </label>
                <FilterDropdown
                  name="Year"
                  options={infraYearData.InfraYear}
                  value={filters.InfraYear}
                  onChange={(value) => handleFilterChange('InfraYear', value)}
                />
              </div>

              <div className="min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type of Work
                </label>
                <FilterDropdown
                  name="Type of Work"
                  options={typeOfWorkData.TypeofWork}
                  value={filters.TypeofWork}
                  onChange={(value) => handleFilterChange('TypeofWork', value)}
                  searchable
                />
              </div>
            </div>
          </div>

          {/* Map View - now takes full width */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="h-[700px] relative">
              {/* Fixed InstantSearch implementation - should wrap the entire map section like in contractor page */}
              <InstantSearch
                indexName="bettergov_flood_control"
                searchClient={searchClient}
                future={{ preserveSharedStateOnUnmount: true }}
              >
                <Configure
                  hitsPerPage={1000}
                  filters={buildFilterString()}
                  query={searchTerm}
                  attributesToRetrieve={[
                    'ProjectDescription',
                    'Municipality',
                    'Province',
                    'Region',
                    'ContractID',
                    'TypeofWork',
                    'ContractCost',
                    'GlobalID',
                    'InfraYear',
                    'Contractor',
                    'Latitude',
                    'Longitude',
                  ]}
                />
                <MapHitsComponent onHitsUpdate={setMapProjects} />
                <MapContainer
                  center={initialCenter}
                  zoom={initialZoom}
                  style={{ height: '100%', width: '100%' }}
                  ref={mapRef}
                  whenReady={() => {
                    if (mapRef.current) {
                      mapRef.current.on('zoomend', () => {
                        if (mapRef.current) {
                          setZoomLevel(mapRef.current.getZoom())
                        }
                      })
                    }
                  }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  {mapData && mapData.features && (
                    <GeoJSON
                      ref={geoJsonLayerRef}
                      data={mapData}
                      style={regionStyle}
                      onEachFeature={onEachFeature}
                    />
                  )}

                  {/* Show project markers only when zoomed in and we have projects */}
                  {zoomLevel > 8 &&
                    mapProjects.map((project) => {
                      // Check if we have valid coordinates
                      if (!project.Latitude || !project.Longitude) return null

                      const lat = parseFloat(project.Latitude)
                      const lng = parseFloat(project.Longitude)

                      // Validate coordinates
                      if (isNaN(lat) || isNaN(lng)) return null

                      return (
                        <Marker
                          key={project.GlobalID || project.objectID}
                          position={[lat, lng]}
                        >
                          <Popup>
                            <div className="min-w-[200px]">
                              <h3 className="font-bold text-gray-900">
                                {project.ProjectDescription ||
                                  'Unnamed Project'}
                              </h3>
                              <p className="text-sm text-gray-600 mt-1">
                                <strong>Region:</strong>{' '}
                                {project.Region || 'N/A'}
                              </p>
                              <p className="text-sm text-gray-600">
                                <strong>Province:</strong>{' '}
                                {project.Province || 'N/A'}
                              </p>
                              <p className="text-sm text-gray-600">
                                <strong>Municipality:</strong>{' '}
                                {project.Municipality || 'N/A'}
                              </p>
                              <p className="text-sm text-gray-600">
                                <strong>Contractor:</strong>{' '}
                                {project.Contractor || 'N/A'}
                              </p>
                              <p className="text-sm text-gray-600">
                                <strong>Cost:</strong> ₱
                                {project.ContractCost || 'N/A'}
                              </p>
                            </div>
                          </Popup>
                        </Marker>
                      )
                    })}
                </MapContainer>
              </InstantSearch>

              {/* Zoom Controls */}
              <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleZoomIn}
                  aria-label="Zoom in"
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleZoomOut}
                  aria-label="Zoom out"
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
              </div>

              {/* Region Details Panel */}
              {selectedRegion && (
                <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-md z-[1000]">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-900">
                      {selectedRegion.name}
                    </h3>
                    <button
                      onClick={() => setSelectedRegion(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {selectedRegion.loading ? (
                    <div className="flex items-center justify-center py-4">
                      <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                    </div>
                  ) : (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">
                        <strong>Projects:</strong> {mapProjects.length}
                      </p>
                      {mapProjects.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-600">
                            <strong>Zoom in to see project locations</strong>
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Showing{' '}
                            {
                              mapProjects.filter(
                                (p) => p.Latitude && p.Longitude
                              ).length
                            }{' '}
                            projects with location data
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Data Source Information */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center mb-4">
              <Info className="w-5 h-5 text-blue-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-800">
                About This Data
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              This map displays flood control infrastructure projects across the
              Philippines. Click on a region to filter projects by that area.
              Zoom in to see individual project locations. You can also use the
              filters to narrow down projects by year, type of work, and search
              terms.
            </p>
            <p className="text-sm text-gray-500">
              Source: Department of Public Works and Highways (DPWH) Flood
              Control Information System
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FloodControlProjectsMap
