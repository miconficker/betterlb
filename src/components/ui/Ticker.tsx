import React, { useState, useEffect } from 'react'
import {
  DollarSign,
  Pen as Yen,
  Euro as EuroSign,
  PoundSterling,
} from 'lucide-react'
import { weatherData } from '../../data/weather'
import { forexRates } from '../../data/forex'

const getCurrencyIcon = (code: string) => {
  switch (code) {
    case 'USD':
      return <DollarSign className="h-4 w-4" />
    case 'JPY':
      return <Yen className="h-4 w-4" />
    case 'EUR':
      return <EuroSign className="h-4 w-4" />
    case 'GBP':
      return <PoundSterling className="h-4 w-4" />
    default:
      return null
  }
}

const Ticker: React.FC = () => {
  const [currentRateIndex, setCurrentRateIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  // Rotate through the forex rates
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)

      // Wait for animation to complete before changing the index
      setTimeout(() => {
        setCurrentRateIndex((prevIndex) => (prevIndex + 1) % forexRates.length)
        setIsAnimating(false)
      }, 500) // Match this with the CSS animation duration
    }, 4000) // Show each rate for 4 seconds

    return () => clearInterval(interval)
  }, [])

  const currentRate = forexRates[currentRateIndex]

  return (
    <div className="bg-blue-950 text-white py-1.5">
      <div className="container mx-auto px-4 flex justify-end">
        <div className="flex justify-end items-center">
          {/* Forex ticker */}
          <div className="flex-1 overflow-hidden pr-4">
            <div className="relative h-6 flex items-center">
              <div
                className={`flex items-center transition-all duration-200 ${
                  isAnimating
                    ? 'opacity-0 translate-y-2'
                    : 'opacity-100 translate-y-0'
                }`}
              >
                <div className="inline-flex items-center space-x-1">
                  <span className="text-accent-200">
                    {getCurrencyIcon(currentRate.code)}
                  </span>
                  <span className="text-xs font-medium">
                    {currentRate.code}
                  </span>
                  <span className="text-xs text-accent-100">
                    ₱{currentRate.buyingRate.toFixed(2)} / ₱
                    {currentRate.sellingRate.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Weather information */}
          <div className="flex items-center space-x-6 pl-4 border-l border-accent-500">
            {weatherData.map((data) => (
              <div key={data.location} className="flex items-center space-x-2">
                <span className="text-xs font-medium text-accent-100">
                  {data.location}
                </span>
                <span className="text-xs text-white">{data.temperature}°C</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ticker
