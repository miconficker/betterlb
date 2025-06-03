import React from 'react'
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
  return (
    <div className="bg-blue-950 text-white py-1.5">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Forex ticker */}
          <div className="flex-1 overflow-hidden pr-8">
            <div className="animate-marquee whitespace-nowrap flex items-center space-x-8">
              {forexRates.map((rate) => (
                <div
                  key={rate.code}
                  className="inline-flex items-center space-x-2"
                >
                  <span className="text-accent-200">
                    {getCurrencyIcon(rate.code)}
                  </span>
                  <span className="text-xs font-medium">{rate.code}</span>
                  <span className="text-xs text-accent-100">
                    ₱{rate.buyingRate.toFixed(2)} / ₱
                    {rate.sellingRate.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Weather information */}
          <div className="flex items-center space-x-6 pl-6 border-l border-accent-500">
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
