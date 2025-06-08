export type LanguageType = 'en' | 'fil'

export interface NewsItem {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  category: 'national' | 'local' | 'international' | 'announcements'
  imageUrl: string
}

export interface ServiceItem {
  id: string
  title: string
  description: string
  icon: string
  url: string
  category: ServiceCategory
}

export type ServiceCategory =
  | 'citizenship'
  | 'business'
  | 'education'
  | 'health'
  | 'housing'
  | 'transportation'
  | 'tourism'
  | 'employment'

export interface WeatherData {
  location: string
  temperature: number
  condition: string
  icon: string
}

export interface ForexRate {
  currency: string
  code: string
  rate: number
}

export interface NavigationItem {
  label: string
  href: string
  children?: NavigationItem[]
}
