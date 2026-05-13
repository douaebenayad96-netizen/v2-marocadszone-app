import React from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  return (
    <nav className={`breadcrumb-container ${className}`} aria-label="Breadcrumb">
      {/* Desktop version */}
      <ol className="hidden sm:flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <FiChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            )}
            
            {item.href ? (
              <Link
                to={item.href}
                className="breadcrumb-link flex items-center text-gray-600 hover:text-blue-600 font-medium"
              >
                {item.icon && <span className="mr-1.5">{item.icon}</span>}
                {item.label}
              </Link>
            ) : (
              <span className="flex items-center text-gray-900 font-semibold">
                {item.icon && <span className="mr-1.5">{item.icon}</span>}
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>

      {/* Mobile version - show only first and last items */}
      <ol className="flex sm:hidden items-center space-x-2">
        {items.length > 0 && (
          <>
            <li className="flex items-center">
              {items[0].href ? (
                <Link
                  to={items[0].href}
                  className="breadcrumb-link flex items-center text-gray-600 hover:text-blue-600 font-medium"
                >
                  {items[0].icon && <span className="mr-1.5">{items[0].icon}</span>}
                  {items[0].label}
                </Link>
              ) : (
                <span className="flex items-center text-gray-900 font-semibold">
                  {items[0].icon && <span className="mr-1.5">{items[0].icon}</span>}
                  {items[0].label}
                </span>
              )}
            </li>
            
            {items.length > 1 && (
              <>
                <FiChevronRight className="w-4 h-4 mx-2 text-gray-400" />
                {items.length > 2 && (
                  <>
                    <span className="text-gray-400">...</span>
                    <FiChevronRight className="w-4 h-4 mx-2 text-gray-400" />
                  </>
                )}
                <li className="flex items-center">
                  <span className="flex items-center text-gray-900 font-semibold">
                    {items[items.length - 1].icon && (
                      <span className="mr-1.5">{items[items.length - 1].icon}</span>
                    )}
                    {items[items.length - 1].label.length > 30 
                      ? items[items.length - 1].label.substring(0, 30) + '...' 
                      : items[items.length - 1].label
                    }
                  </span>
                </li>
              </>
            )}
          </>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
