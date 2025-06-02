import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import * as Tabs from '@radix-ui/react-tabs';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import SearchInput from '../components/ui/SearchInput';
import serviceCategories from '../data/service_categories.json';
import services from '../data/services.json';

const ITEMS_PER_PAGE = 12;

const ServicesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredServices = useMemo(() => {
    let filtered = services;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        service =>
          service.service.toLowerCase().includes(query) ||
          service.category.toLowerCase().includes(query) ||
          service.subcategory.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        service => service.category === selectedCategory
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredServices.length / ITEMS_PER_PAGE);
  const paginatedServices = filteredServices.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page on category change
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Government Services
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Access official government services quickly and easily.
            Find what you need for citizenship, business, education, and more.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <SearchInput
            placeholder="Search for services..."
            onSearch={handleSearch}
            icon={<Search className="h-5 w-5 text-gray-400" />}
            size="lg"
          />
        </div>

        {/* Category Tabs */}
        <Tabs.Root
          value={selectedCategory}
          onValueChange={handleCategoryChange}
          className="mb-8"
        >
          <Tabs.List className="flex flex-wrap gap-2 border-b border-gray-200">
            <Tabs.Trigger
              value="all"
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors
                ${selectedCategory === 'all'
                  ? 'bg-primary-50 text-primary-600 border-b-2 border-primary-500'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              All Services
            </Tabs.Trigger>
            {serviceCategories.categories.map((category) => (
              <Tabs.Trigger
                key={category.category}
                value={category.category}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors
                  ${selectedCategory === category.category
                    ? 'bg-primary-50 text-primary-600 border-b-2 border-primary-500'
                    : 'text-gray-600 hover:text-primary-600'
                  }`}
              >
                {category.category}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </Tabs.Root>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {paginatedServices.map((service, index) => (
            <Card key={index} hoverable>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  {service.service}
                </h3>
                <div className="mb-4">
                  <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-primary-100 text-primary-800 mr-2">
                    {service.category}
                  </span>
                  <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-800">
                    {service.subcategory}
                  </span>
                </div>
                <a
                  href={service.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center"
                >
                  Access Service
                  <svg
                    className="ml-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <Button
                key={page}
                variant={currentPage === page ? 'primary' : 'outline'}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;