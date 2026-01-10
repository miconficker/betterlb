import { ReactNode, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { FileTextIcon, FileIcon, FileCheckIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface LegislativeLayoutProps {
  title?: string;
  description?: string;
  children?: ReactNode;
}

export default function LegislativeLayout({
  title = 'Municipal Legislative Documents',
  description = 'Browse all available resolutions, ordinances, and executive orders',
  children,
}: LegislativeLayoutProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  // Simple search state (frontend filtering optional)
  const [search, setSearch] = useState('');

  const branches = [
    {
      title: 'Resolutions',
      description: 'All council resolutions for the current term',
      icon: <FileTextIcon className='h-4 w-4' />,
      path: '/government/legislative/resolutions',
    },
    {
      title: 'Ordinances',
      description: 'All local ordinances enacted by the council',
      icon: <FileIcon className='h-4 w-4' />,
      path: '/government/legislative/ordinances',
    },
    {
      title: 'Executive Orders',
      description: 'Official executive orders from the mayor',
      icon: <FileCheckIcon className='h-4 w-4' />,
      path: '/government/legislative/executive-orders',
    },
  ];

  const isMainPage =
    currentPath === '/government/legislative' ||
    currentPath === '/government/legislative/';

  return (
    <div className='container mx-auto px-4 md:px-0'>
      <div className='py-8 md:py-12 text-center flex flex-col justify-center'>
        <h2 className='text-3xl md:text-4xl font-bold text-gray-800 mb-4'>
          {title}
        </h2>
        <p className='text-sm md:text-base text-gray-800'>{description}</p>
      </div>

      {isMainPage && (
        <>
          {/* Search Bar */}
          <div className='mb-6 md:mb-8 flex justify-center'>
            <input
              type='text'
              placeholder='Search documents...'
              value={search}
              onChange={e => setSearch(e.target.value)}
              className='w-full md:w-1/2 px-3 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500'
            />
          </div>

          {/* Card Tabs */}
          <div className='mb-8 md:mb-12 overflow-x-auto'>
            <div className='inline-grid grid-cols-1 md:grid-cols-3 gap-4 min-w-full md:min-w-0 px-4 py-2'>
              {branches.map(branch => {
                const isActive = currentPath.includes(branch.path);
                return (
                  <Link
                    key={branch.path}
                    to={branch.path}
                    className={cn(
                      'group flex flex-col p-4 rounded-md shadow-sm ring-1 ring-neutral-300',
                      'hover:bg-primary-500/95 hover:text-neutral-50',
                      isActive && 'bg-primary-500 text-neutral-50'
                    )}
                  >
                    <div className='flex items-center gap-2 mb-2 text-sm font-semibold'>
                      {branch.icon} {branch.title}
                    </div>
                    <div className='text-xs text-neutral-500 group-hover:text-neutral-200'>
                      {branch.description}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </>
      )}

      {!isMainPage && (
        <div className='px-4 md:px-0 pb-12'>{children || <Outlet />}</div>
      )}
    </div>
  );
}
