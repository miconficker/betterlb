import { Outlet } from 'react-router-dom'
import ConstitutionalSidebar from './ConstitutionalSidebar'

export default function ConstitutionalLayout() {
  return (
    <div className="flex flex-col md:flex-row gap-6 h-full">
      {/* Sidebar */}
      <ConstitutionalSidebar />

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <Outlet />
      </div>
    </div>
  )
}
