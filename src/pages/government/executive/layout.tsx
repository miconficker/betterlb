import { Outlet } from 'react-router-dom'
import GovernmentLayout from '../layout'

export default function ExecutiveLayout() {
  return (
    <GovernmentLayout 
      title="Executive Branch Directory"
      description="Explore the executive branch of the Philippine government"
    >
      <Outlet />
    </GovernmentLayout>
  )
}
