import React, { useState, useEffect } from 'react'
import * as LucideIcons from 'lucide-react'
import { Card, CardHeader, CardContent } from '../ui/Card'
import { WeatherData, ForexRate } from '../../types'
import { useLanguage } from '../../contexts/LanguageContext'
import CriticalHotlinesWidget from '../widgets/CriticalHotlinesWidget'

const InfoWidgets: React.FC = () => {
  const { translate } = useLanguage()
  const [weatherData, setWeatherData] = useState<WeatherData[]>([])
  const [forexRates, setForexRates] = useState<ForexRate[]>([])
  const [isLoadingWeather, setIsLoadingWeather] = useState<boolean>(true)
  const [isLoadingForex, setIsLoadingForex] = useState<boolean>(true)
  const [weatherError, setWeatherError] = useState<string | null>(null)
  const [forexError, setForexError] = useState<string | null>(null)

  // Function to map OpenWeatherMap icon codes to Lucide icon names
  const mapWeatherIconToLucide = (iconCode: string): string => {
    const iconMap: Record<string, string> = {
      '01d': 'Sun', // clear sky day
      '01n': 'Moon', // clear sky night
      '02d': 'CloudSun', // few clouds day
      '02n': 'CloudMoon', // few clouds night
      '03d': 'Cloud', // scattered clouds
      '03n': 'Cloud',
      '04d': 'Cloud', // broken clouds
      '04n': 'Cloud',
      '09d': 'CloudDrizzle', // shower rain
      '09n': 'CloudDrizzle',
      '10d': 'CloudRain', // rain
      '10n': 'CloudRain',
      '11d': 'CloudLightning', // thunderstorm
      '11n': 'CloudLightning',
      '13d': 'CloudSnow', // snow
      '13n': 'CloudSnow',
      '50d': 'Cloud', // mist
      '50n': 'Cloud',
    }

    return iconMap[iconCode] || 'Cloud' // Default to Cloud if icon code not found
  }

  // Function to get weather icon component
  const getWeatherIcon = (iconName: string) => {
    const Icon = LucideIcons[iconName as keyof typeof LucideIcons]
    return Icon ? <Icon className="h-8 w-8" /> : null
  }

  // Fetch weather data
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setIsLoadingWeather(true)
        setWeatherError(null)

        const response = await fetch('https://api.bettergov.ph/weather')

        if (!response.ok) {
          throw new Error(`Failed to fetch weather data: ${response.status}`)
        }

        const data = await response.json()

        // Transform API data to match our WeatherData type
        const transformedData: WeatherData[] = Object.keys(data).map(
          (key: any) => ({
            location: key,
            temperature: Math.round(data[key].main.temp), // Round temperature to nearest integer
            condition: data[key].weather[0].description,
            icon: mapWeatherIconToLucide(data[key].weather[0].icon),
          })
        )

        setWeatherData(transformedData)
      } catch (error) {
        console.error('Error fetching weather data:', error)
        setWeatherError(
          error instanceof Error
            ? error.message
            : 'Failed to fetch weather data'
        )
      } finally {
        setIsLoadingWeather(false)
      }
    }

    fetchWeatherData()
  }, [])

  // Fetch forex data
  useEffect(() => {
    const fetchForexData = async () => {
      try {
        setIsLoadingForex(true)
        setForexError(null)

        const response = await fetch('https://api.bettergov.ph/forex')

        if (!response.ok) {
          throw new Error(`Failed to fetch forex data: ${response.status}`)
        }

        const data = await response.json()

        // Transform API data to match our ForexRate type
        // BSP API returns rates with PHP as the base currency
        // We'll display the top 6 currencies
        const transformedData: ForexRate[] = data.rates
          .filter((rate: any) =>
            ['USD', 'EUR', 'JPY', 'GBP', 'AUD', 'SGD'].includes(rate.symbol)
          )
          .map((rate: any) => ({
            currency: rate.country,
            code: rate.symbol,
            rate: rate.phpEquivalent,
          }))

        setForexRates(transformedData)
      } catch (error) {
        console.error('Error fetching forex data:', error)
        setForexError(
          error instanceof Error ? error.message : 'Failed to fetch forex data'
        )
      } finally {
        setIsLoadingForex(false)
      }
    }

    fetchForexData()
  }, [])

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weather Widget */}
          <Card>
            <CardHeader className="bg-primary-50">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <LucideIcons.Cloud className="h-5 w-5 mr-2 text-primary-600" />
                {translate('weather.title')}
              </h3>
            </CardHeader>
            <CardContent>
              {isLoadingWeather ? (
                <div className="flex justify-center items-center h-40">
                  <LucideIcons.Loader className="h-8 w-8 animate-spin text-primary-600" />
                </div>
              ) : weatherError ? (
                <div className="text-center p-4 text-red-500">
                  <LucideIcons.AlertCircle className="h-8 w-8 mx-auto mb-2" />
                  <p>{weatherError}</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {weatherData.map((location) => (
                    <div
                      key={location.location}
                      className="flex flex-col items-center p-3 rounded-lg border border-gray-100 bg-white uppercase"
                    >
                      <div className="text-accent-500 mb-1">
                        {getWeatherIcon(location.icon)}
                      </div>
                      <div className="font-semibold text-lg">
                        {location.location}
                      </div>
                      <div className="text-2xl font-bold">
                        {location.temperature}°C
                      </div>
                      <div className="text-sm text-gray-500 text-center">
                        {location.condition}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="text-right mt-4">
                <a
                  href="/weather"
                  className="text-primary-600 text-sm hover:underline"
                >
                  Detailed Forecast
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Forex Widget */}
          <Card>
            <CardHeader className="bg-primary-50">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <LucideIcons.BarChart3 className="h-5 w-5 mr-2 text-primary-600" />
                {translate('forex.title')}
              </h3>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Currency
                      </th>
                      <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ₱ Rate
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {isLoadingForex ? (
                      <tr>
                        <td colSpan={3} className="px-3 py-8 text-center">
                          <LucideIcons.Loader className="h-6 w-6 animate-spin mx-auto text-primary-600" />
                        </td>
                      </tr>
                    ) : forexError ? (
                      <tr>
                        <td
                          colSpan={3}
                          className="px-3 py-4 text-center text-red-500"
                        >
                          <LucideIcons.AlertCircle className="h-6 w-6 mx-auto mb-2" />
                          <p>{forexError}</p>
                        </td>
                      </tr>
                    ) : forexRates.length === 0 ? (
                      <tr>
                        <td
                          colSpan={3}
                          className="px-3 py-4 text-center text-gray-500"
                        >
                          No forex data available
                        </td>
                      </tr>
                    ) : (
                      forexRates.map((rate) => (
                        <tr key={rate.code} className="hover:bg-gray-50">
                          <td className="px-3 py-2 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="font-medium text-gray-900">
                                {rate.code}
                              </div>
                              <div className="text-gray-500 text-sm ml-2">
                                {rate.currency}
                              </div>
                            </div>
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-right text-sm font-medium">
                            ₱{rate.rate.toFixed(2)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <div className="text-right mt-4">
                <a
                  href="/forex"
                  className="text-primary-600 text-sm hover:underline"
                >
                  More Currencies
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Hotlines Widget */}
          <div className="lg:col-span-1">
            <CriticalHotlinesWidget maxItems={4} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default InfoWidgets
