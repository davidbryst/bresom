import { Link } from "@remix-run/react";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav aria-label="Navigation principale" className="fixed w-full top-0 z-50 cardGlass-nav ">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between py-4">
        {/* Logo */}
        <Link to="/" className="text-white text-lg sm:text-xl font-extrabold relative z-10">
          david.abraham
        </Link>

        {/* Menu Hamburger pour Mobile */}
        <button
          onClick={toggleMenu}
          className="md:hidden hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Ouvrir le menu"
          aria-expanded={isMenuOpen}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 relative z-10">
          <Link to="#Dos" className="text-white/90 hover:text-white transition-colors text-sm lg:text-base">
            Activités
          </Link>
          <Link to="#Experiences" className="text-white/90 hover:text-white transition-colors text-sm lg:text-base">
            Expériences 
          </Link>
          {/* <Link to="#Skills" className="text-white/90 hover:text-white transition-colors text-sm lg:text-base">
            Mes compétences
          </Link> */}
          <Link to="#Projects" className="text-white/90 hover:text-white transition-colors text-sm lg:text-base">
            Projets 
          </Link>
          <Link to="#Contact" className="text-white/90 hover:text-white transition-colors text-sm lg:text-base">
            Contacts
          </Link>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="md:hidden absolute hidden top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200">
          <div className="px-4 py-6 space-y-4">
            <Link 
              to="#Dos" 
              onClick={closeMenu}
              className="block text-gray-700 hover:text-gray-900 transition-colors py-2"
            >
              Mes Activités
            </Link>
            <Link 
              to="#Experiences" 
              onClick={closeMenu}
              className="block text-gray-700 hover:text-gray-900 transition-colors py-2"
            >
              Mes expériences professionnelles
            </Link>
            <Link 
              to="#Skills" 
              onClick={closeMenu}
              className="block text-gray-700 hover:text-gray-900 transition-colors py-2"
            >
              Mes compétences
            </Link>
            <Link 
              to="#Projects" 
              onClick={closeMenu}
              className="block text-gray-700 hover:text-gray-900 transition-colors py-2"
            >
              Mes projets 
            </Link>
            <Link 
              to="#Contact" 
              onClick={closeMenu}
              className="block text-gray-700 hover:text-gray-900 transition-colors py-2"
            >
              Contact 
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
} 