import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Phone, MapPin, Facebook, Instagram } from 'lucide-react';
import { usePublicStore } from '@/store/publicStore';

export function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const settings = usePublicStore((state) => state.settings);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/classes', label: 'Classes' },
    { to: '/hours', label: 'Hours' },
    { to: '/sales', label: 'Sales & Specials' },
    { to: '/new', label: "What's New" },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-earth-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top bar */}
          <div className="py-2 border-b border-earth-200 flex justify-between items-center text-sm">
            <a
              href={`tel:${settings?.phone || '(785) 890-2027'}`}
              className="flex items-center gap-2 text-sage-700 hover:text-sage-900 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 rounded"
            >
              <Phone className="w-4 h-4" />
              <span>{settings?.phone || '(785) 890-2027'}</span>
            </a>
            <a
              href="https://www.google.com/maps/place/1201+E+U.S.+24+Hwy,+Goodland,+KS+67735"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sage-700 hover:text-sage-900 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 rounded"
            >
              <MapPin className="w-4 h-4" />
              <span className="hidden sm:inline">Visit Us</span>
            </a>
          </div>

          {/* Main nav */}
          <div className="py-4 flex items-center justify-between">
            <Link
              to="/"
              className="flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 rounded"
            >
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-sage-800">
                {settings?.storeName || 'Wild Roots Garden & Gifts'}
              </h1>
              <p className="text-sm text-sage-600">
                {settings?.tagline || 'Garden center and retail gifts'}
              </p>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 ${
                      isActive
                        ? 'bg-sage-100 text-sage-900'
                        : 'text-sage-700 hover:bg-sage-50'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-sage-700 hover:bg-sage-50 focus:outline-none focus:ring-2 focus:ring-sage-500"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav className="lg:hidden border-t border-earth-200 bg-white">
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500 ${
                      isActive
                        ? 'bg-sage-100 text-sage-900'
                        : 'text-sage-700 hover:bg-sage-50'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-sage-800 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-serif font-bold mb-2">
                {settings?.storeName || 'Wild Roots Garden & Gifts'}
              </h3>
              <p className="text-sage-200 text-sm">
                {settings?.tagline || 'Garden center and retail gifts'}
              </p>
            </div>

            {/* Address */}
            <div>
              <h4 className="font-semibold mb-2">Visit Us</h4>
              <address className="not-italic text-sage-200 text-sm">
                {settings?.address || '1201 E U.S. 24 Hwy'}
                <br />
                Goodland, KS 67735
              </address>
              <a
                href={`tel:${settings?.phone || '(785) 890-2027'}`}
                className="block mt-2 text-sage-200 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sage-800 rounded"
              >
                {settings?.phone || '(785) 890-2027'}
              </a>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-semibold mb-2">Connect With Us</h4>
              <div className="flex gap-4">
                <a
                  href={
                    settings?.facebook ||
                    'https://www.facebook.com/share/1G7fvpezSY/?mibextid=wwXIfr'
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-sage-700 hover:bg-sage-600 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href={
                    settings?.instagram ||
                    'https://www.instagram.com/wildrootsgardenandgifts'
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-sage-700 hover:bg-sage-600 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-sage-700 text-center text-sage-300 text-sm">
            <p>
              © {new Date().getFullYear()} {settings?.storeName || 'Wild Roots Garden & Gifts'}. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}