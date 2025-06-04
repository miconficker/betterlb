import { Outlet } from 'react-router-dom'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../../components/ui/Breadcrumb'
import { Home } from 'lucide-react'

interface GovernmentLayoutProps {
  title: string
  description?: string
  children?: React.ReactNode
}

export default function GovernmentLayout({
  title,
  description,
  children,
}: GovernmentLayoutProps) {
  return (
    <div className="container mx-auto">
      <div className="px-8 py-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="flex items-center">
                <Home className="h-4 w-4 mr-2" />
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Government</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        {children || <Outlet />}
      </div>
    </div>
  )
}
