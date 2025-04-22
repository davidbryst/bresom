export default function BackgroundParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="wave-gradient-1" gradientTransform="rotate(45)">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.03" />
          </linearGradient>
          <linearGradient id="wave-gradient-2" gradientTransform="rotate(45)">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Première couche de vagues */}
        <path
          d="M-100,120 
             C100,40 300,260 500,80 
             C700,-100 900,160 1100,60 
             L1100,600 L-100,600 Z"
          fill="url(#wave-gradient-1)"
          className="animate-wave-slow"
        />

        {/* Deuxième couche de vagues */}
        <path
          d="M-100,160 
             C150,60 350,360 550,110 
             C750,-140 950,260 1150,110 
             L1150,600 L-100,600 Z"
          fill="url(#wave-gradient-2)"
          className="animate-wave-slower"
        />

        {/* Troisième couche de vagues */}
        <path
          d="M-150,140 
             C50,240 350,20 550,160 
             C750,300 950,80 1150,180 
             L1150,600 L-150,600 Z"
          fill="url(#wave-gradient-1)"
          className="animate-wave-slowest"
        />

        {/* Quatrième couche de vagues */}
        <path
          d="M-150,180 
             C50,80 350,260 550,110 
             C750,-40 950,210 1150,110 
             L1150,600 L-150,600 Z"
          fill="url(#wave-gradient-2)"
          className="animate-wave-reverse"
        />
      </svg>
    </div>
  );
} 