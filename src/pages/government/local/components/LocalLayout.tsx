import { Outlet, useParams } from 'react-router-dom'
import LocalSidebar from './LocalSidebar'

export default function LocalLayout() {
  const { region } = useParams<{ region: string }>()

  return (
    <div className="flex h-full">
      <LocalSidebar currentRegion={region} />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}