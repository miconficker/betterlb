import React from 'react';
import { MapPin, Mountain, Palmtree, Building2, Ship } from 'lucide-react';
import { Card, CardContent } from '../../../components/ui/Card';

const PhilippinesRegions: React.FC = () => {
  const regions = [
    {
      icon: <Building2 className="h-6 w-6" />,
      name: 'National Capital Region',
      description: 'Metro Manila, the economic and political center of the Philippines',
      keyPlaces: ['Manila', 'Quezon City', 'Makati', 'Taguig'],
      image: 'https://images.pexels.com/photos/1239162/pexels-photo-1239162.jpeg',
    },
    {
      icon: <Mountain className="h-6 w-6" />,
      name: 'Cordillera Administrative Region',
      description: 'Home to ancient rice terraces and indigenous mountain cultures',
      keyPlaces: ['Baguio', 'Sagada', 'Banaue', 'Mountain Province'],
      image: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg',
    },
    {
      icon: <Palmtree className="h-6 w-6" />,
      name: 'Visayas',
      description: 'Central islands known for beaches, festivals, and historic sites',
      keyPlaces: ['Cebu', 'Boracay', 'Bohol', 'Iloilo'],
      image: 'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg',
    },
    {
      icon: <Ship className="h-6 w-6" />,
      name: 'Mindanao',
      description: 'Southern region rich in cultural diversity and natural resources',
      keyPlaces: ['Davao', 'Cagayan de Oro', 'Zamboanga', 'General Santos'],
      image: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg"
            alt="Philippine Regions"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Regions of the Philippines
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Explore the diverse regions of the Philippines, each with its unique 
                culture, landscapes, and traditions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Regions Grid */}
          <div className="lg:col-span-2">
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Major Regions</h2>
              <div className="grid gap-6">
                {regions.map((region, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-primary-100 rounded-lg text-primary-600">
                          {region.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {region.name}
                          </h3>
                          <p className="text-gray-600 mb-4">{region.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {region.keyPlaces.map((place, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800"
                              >
                                <MapPin className="h-3 w-3 mr-1" />
                                {place}
                              </span>
                            ))}
                          </div>
                          <img
                            src={region.image}
                            alt={region.name}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Regional Overview</h2>
              <div className="prose max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  The Philippines is divided into three main geographical divisions: Luzon, 
                  Visayas, and Mindanao. These are further subdivided into 17 regions, each 
                  with its own administrative center, cultural identity, and economic focus.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Each region showcases unique traditions, dialects, and cuisines, contributing 
                  to the country's rich cultural tapestry. From the mountain tribes of the 
                  Cordilleras to the seafaring communities of the Visayas, the diversity of 
                  Filipino regional cultures is remarkable.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  The regions also vary in their economic activities, from the industrial and 
                  service-oriented National Capital Region to the agricultural heartlands of 
                  Central Luzon and the resource-rich provinces of Mindanao.
                </p>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Facts</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-gray-500">Total Regions</div>
                    <div className="text-gray-900">17 Administrative Regions</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Provinces</div>
                    <div className="text-gray-900">81 Provinces</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Cities</div>
                    <div className="text-gray-900">146 Cities</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Municipalities</div>
                    <div className="text-gray-900">1,488 Municipalities</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Regional Languages</h3>
                <div className="space-y-3">
                  <div>
                    <div className="font-medium text-gray-900">Luzon</div>
                    <div className="text-sm text-gray-600">Tagalog, Ilocano, Bicolano</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Visayas</div>
                    <div className="text-sm text-gray-600">Cebuano, Hiligaynon, Waray</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Mindanao</div>
                    <div className="text-sm text-gray-600">Cebuano, Maguindanaon, Tausug</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Related Links</h3>
                <nav className="space-y-2">
                  <a
                    href="/philippines/about"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    About
                  </a>
                  <a
                    href="/philippines/history"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    History
                  </a>
                  <a
                    href="/philippines/culture"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    Culture
                  </a>
                  <a
                    href="/philippines/tourism"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    Tourism
                  </a>
                </nav>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhilippinesRegions;