import { useState } from "react";
import { Link, useLocation } from "react-router";
import logo from "../../assets/images/logo.svg.svg";

export function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const isActive = (path: string) =>
    location.pathname === path ||
    location.pathname.startsWith(path + "/");

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#E7E5E4] bg-white/80 backdrop-blur-md">
        {/* 🔒 SAME CONTAINER AS ALL PAGES */}
        <div className="mx-auto flex h-[56px] max-w-[1120px] items-center justify-between px-6 sm:h-[80px] md:px-10">

          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-2 text-[#1C1917]"
          >
            <img
              src={logo}
              alt="Designers Colony"
              className="h-5 w-5 sm:h-6 sm:w-6"
            />

            <span className="hidden sm:inline text-[18px] font-semibold tracking-tight">
              Designers Colony
            </span>

            <span className="inline sm:hidden text-[16px] font-semibold tracking-tight">
              DC
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden sm:flex items-center gap-6">
            <Link
              to="/"
              className={`text-[15px] font-medium transition-colors ${
                isActive("/")
                  ? "text-[#1C1917]"
                  : "text-[#78716C] hover:text-[#1C1917]"
              }`}
            >
              Jobs
            </Link>

            <Link
              to="/community"
              className={`text-[15px] font-medium transition-colors ${
                isActive("/community")
                  ? "text-[#1C1917]"
                  : "text-[#78716C] hover:text-[#1C1917]"
              }`}
            >
              Community
            </Link>

            <Link
              to="/chai-talks"
              className={`text-[15px] font-medium transition-colors ${
                isActive("/chai-talks")
                  ? "text-[#1C1917]"
                  : "text-[#78716C] hover:text-[#1C1917]"
              }`}
            >
              Chai Talks ☕
            </Link>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={toggleMenu}
            className="sm:hidden flex h-10 w-10 items-center justify-center text-[#1C1917]"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm sm:hidden"
            onClick={closeMenu}
          />

          <div className="fixed top-[56px] left-0 right-0 z-40 border-b border-[#E7E5E4] bg-white shadow-lg sm:hidden">
            <nav className="space-y-1 px-6 py-4">
              <Link
                to="/"
                onClick={closeMenu}
                className={`block rounded-lg px-4 py-3 text-[15px] font-medium ${
                  isActive("/")
                    ? "bg-[#F5F5F4] text-[#1C1917]"
                    : "text-[#78716C]"
                }`}
              >
                Jobs
              </Link>

              <Link
                to="/community"
                onClick={closeMenu}
                className={`block rounded-lg px-4 py-3 text-[15px] font-medium ${
                  isActive("/community")
                    ? "bg-[#F5F5F4] text-[#1C1917]"
                    : "text-[#78716C]"
                }`}
              >
                Community
              </Link>

              <Link
                to="/chai-talks"
                onClick={closeMenu}
                className={`block rounded-lg px-4 py-3 text-[15px] font-medium ${
                  isActive("/chai-talks")
                    ? "bg-[#F5F5F4] text-[#1C1917]"
                    : "text-[#78716C]"
                }`}
              >
                Chai Talks ☕
              </Link>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
