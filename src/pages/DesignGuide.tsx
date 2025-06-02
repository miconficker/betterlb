import React from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import SearchInput from '../components/ui/SearchInput';
import { Search } from 'lucide-react';

const ColorBlock = ({ color, name, value }: { color: string; name: string; value: string }) => (
  <div className="flex items-center space-x-2">
    <div className={`w-12 h-12 rounded ${color}`} />
    <div>
      <div className="font-medium">{name}</div>
      <div className="text-sm text-gray-500">{value}</div>
    </div>
  </div>
);

const TypographyExample = ({ className, label }: { className: string; label: string }) => (
  <div className="mb-4">
    <div className={className}>The quick brown fox jumps over the lazy dog</div>
    <div className="text-sm text-gray-500 mt-1">{label}</div>
  </div>
);

const DesignGuide: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Design Guidelines</h1>

        {/* Typography */}
        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-2xl font-semibold">Typography</h2>
            <p className="text-gray-600">Plus Jakarta Sans is our primary font family</p>
          </CardHeader>
          <CardContent>
            <TypographyExample
              className="text-4xl font-bold"
              label="Heading 1 - text-4xl font-bold"
            />
            <TypographyExample
              className="text-3xl font-semibold"
              label="Heading 2 - text-3xl font-semibold"
            />
            <TypographyExample
              className="text-2xl font-medium"
              label="Heading 3 - text-2xl font-medium"
            />
            <TypographyExample
              className="text-xl"
              label="Heading 4 - text-xl"
            />
            <TypographyExample
              className="text-base"
              label="Body - text-base"
            />
            <TypographyExample
              className="text-sm"
              label="Small - text-sm"
            />
          </CardContent>
        </Card>

        {/* Colors */}
        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-2xl font-semibold">Colors</h2>
            <p className="text-gray-600">Our color palette</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h3 className="font-medium mb-4">Primary</h3>
                <div className="space-y-4">
                  <ColorBlock color="bg-primary-500" name="Primary 500" value="#0066eb" />
                  <ColorBlock color="bg-primary-600" name="Primary 600" value="#0052bc" />
                  <ColorBlock color="bg-primary-700" name="Primary 700" value="#003d8d" />
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-4">Secondary</h3>
                <div className="space-y-4">
                  <ColorBlock color="bg-secondary-500" name="Secondary 500" value="#ff4d00" />
                  <ColorBlock color="bg-secondary-600" name="Secondary 600" value="#cc3e00" />
                  <ColorBlock color="bg-secondary-700" name="Secondary 700" value="#992e00" />
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-4">Accent</h3>
                <div className="space-y-4">
                  <ColorBlock color="bg-accent-500" name="Accent 500" value="#f58900" />
                  <ColorBlock color="bg-accent-600" name="Accent 600" value="#c46e00" />
                  <ColorBlock color="bg-accent-700" name="Accent 700" value="#935200" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Components */}
        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-2xl font-semibold">Components</h2>
            <p className="text-gray-600">Common UI components and their variants</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* Buttons */}
              <div>
                <h3 className="font-medium mb-4">Buttons</h3>
                <div className="flex flex-wrap gap-4">
                  <Button>Default Button</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                  <Button isLoading>Loading</Button>
                </div>
              </div>

              {/* Search Input */}
              <div>
                <h3 className="font-medium mb-4">Search Input</h3>
                <div className="max-w-md">
                  <SearchInput
                    placeholder="Search..."
                    icon={<Search className="h-5 w-5 text-gray-500" />}
                  />
                </div>
              </div>

              {/* Cards */}
              <div>
                <h3 className="font-medium mb-4">Cards</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold">Card Title</h3>
                    </CardHeader>
                    <CardContent>
                      <p>Basic card with header and content</p>
                    </CardContent>
                  </Card>
                  <Card hoverable>
                    <CardHeader>
                      <h3 className="text-lg font-semibold">Hoverable Card</h3>
                    </CardHeader>
                    <CardContent>
                      <p>Card with hover effect</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Layout Guidelines */}
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-semibold">Layout Guidelines</h2>
            <p className="text-gray-600">Spacing and layout principles</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Container</h3>
                <p className="text-gray-600">
                  Use the container class for consistent page width and responsive padding:
                  <code className="ml-2 px-2 py-1 bg-gray-100 rounded">container mx-auto px-4</code>
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Spacing</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Section spacing: py-12 (3rem top and bottom)</li>
                  <li>Component spacing: space-y-6 or gap-6 (1.5rem)</li>
                  <li>Text spacing: space-y-2 (0.5rem)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Responsive Design</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Mobile first approach</li>
                  <li>Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)</li>
                  <li>Use grid-cols-* for responsive grid layouts</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DesignGuide;