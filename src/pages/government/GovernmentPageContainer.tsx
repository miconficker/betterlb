import { ReactNode } from 'react'

interface GovernmentPageContainerProps {
  children: ReactNode
  sidebar?: ReactNode
  className?: string
}

export default function GovernmentPageContainer({
  children,
  sidebar,
  className = '',
}: GovernmentPageContainerProps) {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {sidebar && <aside className="flex-shrink-0">{sidebar}</aside>}
          <main className="flex-1 min-w-0">
            <div className="bg-white rounded-lg border shadow-sm p-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

interface GovernmentPageHeaderProps {
  title: string
  subtitle?: string
  actions?: ReactNode
  className?: string
}

export function GovernmentPageHeader({
  title,
  subtitle,
  actions,
  className = '',
}: GovernmentPageHeaderProps) {
  return (
    <div
      className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 ${className}`}
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        {subtitle && <p className="text-gray-600">{subtitle}</p>}
      </div>
      {actions && <div className="flex-shrink-0">{actions}</div>}
    </div>
  )
}

interface GovernmentIndexPageContainerProps {
  children: ReactNode
  className?: string
}

export function GovernmentIndexPageContainer({
  children,
  className = '',
}: GovernmentIndexPageContainerProps) {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg border shadow-sm p-8">
          {children}
        </div>
      </div>
    </div>
  )
}
