import { Outlet } from 'react-router-dom'
import DiplomaticSidebar from './DiplomaticSidebar'

export default function DiplomaticLayout() {
  return (
    <div className="container py-6 md:py-10">
      <div className="flex flex-col md:flex-row gap-6">
        <DiplomaticSidebar />
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
