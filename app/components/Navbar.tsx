import { Link } from "@remix-run/react";

export default function Navbar() {
  return (
    <nav className="fixed w-full top-0 z-50 bg-white/5 backdrop-blur-md border-b border-white/10 supports-[backdrop-filter]:bg-white/2">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between py-4">
        {/* Logo */}
        <Link to="/" className="text-white text-xl font-semibold relative z-10">
          BRESOM.17
        </Link>
        {/* <Link to="/" className="text-white text-xl font-semibold relative z-10">
          DAVID.ABRAHAM
        </Link> */}

        {/* Navigation Links */}
        <div className="flex items-center gap-8 relative z-10">
          <Link to="/" className="text-white/80 hover:text-white transition-colors">
            Accueil 
          </Link>
          <Link to="/work" className="text-white/80 hover:text-white transition-colors">
            Mes experience professionnelle
          </Link>
          <Link to="/work" className="text-white/80 hover:text-white transition-colors">
            Mes compétences
          </Link>
          <Link to="/work" className="text-white/80 hover:text-white transition-colors">
            Mes projets 
          </Link>
          <Link to="/blog" className="text-white/80 hover:text-white transition-colors">
            Blog
          </Link>
          {/* <div className="relative group">
            <button className="text-white/80 hover:text-white transition-colors flex items-center gap-1">
              More
              <span className="text-xs">▾</span>
            </button>
          </div> */}
          
          {/* Settings Button */}
          {/* <button className="text-white/80 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.432l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.432l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.248a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </button> */}
        </div>
      </div>
    </nav>
  );
} 