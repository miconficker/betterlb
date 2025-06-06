import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { weatherData } from '../../data/weather';
import { forexRates } from '../../data/forex';
import { useLanguage } from '../../contexts/LanguageContext';
import CriticalHotlinesWidget from '../widgets/CriticalHotlinesWidget';

const InfoWidgets: React.FC = () => {
  const { translate } = useLanguage();

  const getWeatherIcon = (iconName: string) => {
    const Icon = LucideIcons[iconName as keyof typeof LucideIcons];
    return Icon ? <Icon className="h-8 w-8" /> : null;
  };

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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {weatherData.map((location) => (
                  <div 
                    key={location.location}
                    className="flex flex-col items-center p-3 rounded-lg border border-gray-100 bg-white"
                  >
                    <div className="text-accent-500 mb-1">
                      {getWeatherIcon(location.icon)}
                    </div>
                    <div className="font-semibold text-lg">{location.location}</div>
                    <div className="text-2xl font-bold">{location.temperature}°C</div>
                    <div className="text-sm text-gray-500">{location.condition}</div>
                  </div>
                ))}
              </div>
              <div className="text-right mt-4">
                <a href="/weather" className="text-primary-600 text-sm hover:underline">
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
                        Buying Rate
                      </th>
                      <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Selling Rate
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {forexRates.map((rate) => (
                      <tr key={rate.code} className="hover:bg-gray-50">
                        <td className="px-3 py-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="font-medium text-gray-900">{rate.code}</div>
                            <div className="text-gray-500 text-sm ml-2">{rate.currency}</div>
                          </div>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-right text-sm font-medium">
                          {rate.buyingRate.toFixed(2)}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-right text-sm font-medium">
                          {rate.sellingRate.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="text-right mt-4">
                <a href="/forex" className="text-primary-600 text-sm hover:underline">
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
  );
};

export default InfoWidgets;