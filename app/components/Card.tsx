import React from "react";

interface CardProps {
    titre?: string;
    description?: string;
    imageUrl?: string;
    children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ titre, description, imageUrl, children }) => {
    return (
        <div className="liquidGlass-wrapper">
            <div className="liquidGlass-effect opacity-80"></div>
            <div className="liquidGlass-tint opacity-80"></div>
            <div className="liquidGlass-shine opacity-30"></div>
            <div className="liquidGlass-content">
                {children}
                {/* <h2 className="title-responsive font-bold text-white">{titre}</h2>
                <p className="text-responsive text-white/80">{description}</p> */}
            </div>
            
        </div>
    );
};

export default Card;