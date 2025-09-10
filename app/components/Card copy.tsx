import React from "react";

interface CardProps {
    titre: string;
    description: string;
    imageUrl?: string;
    children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ titre, description, imageUrl, children }) => {
    return (
        <div className="  relative flex font-semibold overflow-hidden cursor-pointer  shadow-[0_6px_6px_rgba(0,0,0,0.2),0_0_20px_rgba(0,0,0,0.1)]  transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,2.2)]  py-6 px-10 rounded-[1rem]  hover:py-7 hover:px-11 hover:rounded-[1.5rem]">
            <div className="  absolute inset-0 z-20  box-shadow-[inset_2px_2px_1px_0_rgba(255,255,255,0.5),inset_-1px_-1px_1px_1px_rgba(255,255,255,0.5)]  overflow-hidden  pointer-events-none"
                style={{boxShadow:"inset 2px 2px 1px 0 rgba(255,255,255,0.5), inset -1px -1px 1px 1px rgba(255,255,255,0.5)",}}></div>
            <div className="  absolute inset-0 z-10  bg-white/25  pointer-events-none"></div>
            <div className="  absolute inset-0 z-0  overflow-hidden  pointer-events-none  backdrop-blur-[3px]  [filter:url(#glass-distortion)]  isolation-isolate"
                style={{backdropFilter: "blur(3px)", filter: "url(#glass-distortion)",isolation: "isolate",}}  ></div>
            <div className="z-30 text-[2rem] relative">
                <h2 className="title-responsive font-bold text-white">{titre}</h2>
                <p className="text-responsive text-white/80">{description}</p>
            </div>
            {/* <svg className="hidden">
        <filter
          id="glass-distortion"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          filterUnits="objectBoundingBox"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01 0.01"
            numOctaves="1"
            seed="5"
            result="turbulence"
          />

          <feComponentTransfer in="turbulence" result="mapped">
            <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
            <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
            <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
          </feComponentTransfer>

          <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />

          <feSpecularLighting
            in="softMap"
            surfaceScale="5"
            specularConstant="1"
            specularExponent="100"
            lightingColor="white"
            result="specLight"
          >
            <fePointLight x="-200" y="-200" z="300" />
          </feSpecularLighting>

          <feComposite
            in="specLight"
            operator="arithmetic"
            k1="0"
            k2="1"
            k3="1"
            k4="0"
            result="litImage"
          />

          <feDisplacementMap
            in="SourceGraphic"
            in2="softMap"
            scale="150"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg> */}
        </div>
    );
};

export default Card;