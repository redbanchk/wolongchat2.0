import React from 'react';

const CharacterDisplay: React.FC = () => {
  return (
    <div className="hidden lg:flex flex-col items-center justify-center w-[400px] h-full bg-sgs-dark relative border-r-4 border-sgs-wood shadow-2xl z-10">
      
      {/* Background Texture/Pattern */}
      <div className="absolute inset-0 bg-pattern-cloud opacity-20 pointer-events-none"></div>
      
      {/* Character Card Container */}
      <div className="relative w-[320px] h-[520px] bg-sgs-wood rounded-lg shadow-card p-2 border border-sgs-gold/30">
        
        {/* Card Frame Inner */}
        <div className="relative w-full h-full border-[3px] border-sgs-gold rounded-md overflow-hidden bg-gray-900">
          
          {/* Character Image */}
          <img 
            src="https://picsum.photos/seed/zhuge/400/600?grayscale" 
            alt="诸葛亮画像" 
            className="w-full h-full object-cover sepia-[.3] contrast-125 hover:scale-105 transition-transform duration-1000"
          />
          
          {/* Faction/Element Overlay (Shu Han Green/Gold) */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-black/90 pointer-events-none"></div>

          {/* Card Title / Name */}
          <div className="absolute bottom-6 right-4 z-20 flex flex-col items-end">
            <h2 className="text-5xl font-calligraphy text-white text-shadow-black tracking-widest mb-1">
                诸葛亮
            </h2>
            <div className="text-sgs-gold font-serif text-sm tracking-[0.5em] uppercase border-t border-sgs-gold pt-1">
                Wolong
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Bottom Quote area resembling flavor text on a card */}
      <div className="mt-8 px-8 text-center">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-sgs-gold to-transparent mb-4 opacity-50"></div>
        <p className="font-serif text-sgs-paper/70 text-sm leading-7 italic">
        “鞠躬尽瘁，死而后已。”
        </p>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-sgs-gold to-transparent mt-4 opacity-50"></div>
      </div>
    </div>
  );
};

export default CharacterDisplay;