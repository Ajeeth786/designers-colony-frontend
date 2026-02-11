import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { useAuth } from '../hooks/useAuth.tsx';

export function Header() {
  const location = useLocation();
  const { isLoggedIn, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E7E5E4]">
        <div className="h-[56px] sm:h-[80px] sm:max-w-[1120px] sm:mx-auto px-6 sm:px-6 md:px-10 lg:px-10 xl:px-20 flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/"
            onClick={closeMenu}
            className="text-[16px] sm:text-[18px] font-semibold text-[#1C1917] tracking-tight leading-[20px] sm:leading-normal"
          >
            <span className="hidden sm:inline">Designers Colony</span>
            <span className="inline sm:hidden">DC</span>
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden sm:flex items-center gap-8">
            {isLoggedIn && (
              <nav className="flex items-center gap-6">
                <Link
                  to="/"
                  className={`text-[15px] font-medium transition-colors duration-150 ${
                    location.pathname === '/' 
                      ? 'text-[#1C1917]' 
                      : 'text-[#78716C] hover:text-[#1C1917]'
                  }`}
                >
                  Jobs
                </Link>
                <Link
                  to="/community"
                  className={`text-[15px] font-medium transition-colors duration-150 ${
                    location.pathname.startsWith('/community')
                      ? 'text-[#1C1917]' 
                      : 'text-[#78716C] hover:text-[#1C1917]'
                  }`}
                >
                  Community
                </Link>
                <Link
                  to="/tracker"
                  className={`text-[15px] font-medium transition-colors duration-150 ${
                    location.pathname === '/tracker' 
                      ? 'text-[#1C1917]' 
                      : 'text-[#78716C] hover:text-[#1C1917]'
                  }`}
                >
                  Tracker
                </Link>
              </nav>
            )}
            
            {!isLoggedIn && location.pathname === '/' && (
              <nav className="flex items-center gap-6">
                <Link
                  to="/community"
                  className="text-[14px] font-medium text-[#78716C] hover:text-[#1C1917] transition-colors duration-150"
                >
                  Community
                </Link>
                <Link
                  to="/tracker"
                  className="text-[14px] font-medium text-[#78716C] hover:text-[#1C1917] transition-colors duration-150"
                >
                  Tracker
                </Link>
              </nav>
            )}

            {isLoggedIn && (
              <button
                onClick={logout}
                className="text-[14px] font-medium text-[#78716C] hover:text-[#1C1917] transition-colors duration-150"
              >
                Sign out
              </button>
            )}
          </div>

          {/* Mobile Hamburger Icon */}
          <button
            onClick={toggleMenu}
            className="sm:hidden w-10 h-10 flex items-center justify-center text-[#1C1917]"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              // Close icon (X)
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              // Hamburger icon
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="sm:hidden fixed inset-0 bg-black/20 z-40 backdrop-blur-sm"
            onClick={closeMenu}
          />
          
          {/* Menu Panel */}
          <div className="sm:hidden fixed top-[56px] left-0 right-0 z-40 bg-white border-b border-[#E7E5E4] shadow-lg">
            <nav className="px-6 py-4 space-y-1">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/"
                    onClick={closeMenu}
                    className={`block px-4 py-3 rounded-lg text-[15px] font-medium transition-colors ${
                      location.pathname === '/'
                        ? 'bg-[#F5F5F4] text-[#1C1917]'
                        : 'text-[#78716C] hover:bg-[#FAFAF9] hover:text-[#1C1917]'
                    }`}
                  >
                    Jobs
                  </Link>
                  <Link
                    to="/community"
                    onClick={closeMenu}
                    className={`block px-4 py-3 rounded-lg text-[15px] font-medium transition-colors ${
                      location.pathname.startsWith('/community')
                        ? 'bg-[#F5F5F4] text-[#1C1917]'
                        : 'text-[#78716C] hover:bg-[#FAFAF9] hover:text-[#1C1917]'
                    }`}
                  >
                    Community
                  </Link>
                  <Link
                    to="/tracker"
                    onClick={closeMenu}
                    className={`block px-4 py-3 rounded-lg text-[15px] font-medium transition-colors ${
                      location.pathname === '/tracker'
                        ? 'bg-[#F5F5F4] text-[#1C1917]'
                        : 'text-[#78716C] hover:bg-[#FAFAF9] hover:text-[#1C1917]'
                    }`}
                  >
                    Tracker
                  </Link>
                  
                  {/* Divider */}
                  <div className="h-px bg-[#E7E5E4] my-2" />
                  
                  <button
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                    className="block w-full text-left px-4 py-3 rounded-lg text-[15px] font-medium text-[#78716C] hover:bg-[#FAFAF9] hover:text-[#1C1917] transition-colors"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/community"
                    onClick={closeMenu}
                    className={`block px-4 py-3 rounded-lg text-[15px] font-medium transition-colors ${
                      location.pathname.startsWith('/community')
                        ? 'bg-[#F5F5F4] text-[#1C1917]'
                        : 'text-[#78716C] hover:bg-[#FAFAF9] hover:text-[#1C1917]'
                    }`}
                  >
                    Community
                  </Link>
                  <Link
                    to="/tracker"
                    onClick={closeMenu}
                    className={`block px-4 py-3 rounded-lg text-[15px] font-medium transition-colors ${
                      location.pathname === '/tracker'
                        ? 'bg-[#F5F5F4] text-[#1C1917]'
                        : 'text-[#78716C] hover:bg-[#FAFAF9] hover:text-[#1C1917]'
                    }`}
                  >
                    Tracker
                  </Link>
                </>
              )}
            </nav>
          </div>
        </>
      )}
    </>
  );
}
