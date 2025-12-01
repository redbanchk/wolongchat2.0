import React from 'react';
import { PRESET_QUESTIONS } from '../constants';
import { PresetQuestion } from '../types';

interface PresetOptionsProps {
  onSelect: (question: PresetQuestion) => void;
}

const PresetOptions: React.FC<PresetOptionsProps> = ({ onSelect }) => {
  return (
    <div className="flex flex-col gap-6 mt-6 animate-[fadeIn_1s_ease-out]">
        <div className="flex items-center justify-center gap-4">
             <div className="h-px w-12 bg-sgs-gold opacity-50"></div>
             <div className="text-center text-sgs-gold text-sm opacity-80 font-serif tracking-widest">
                — 锦囊妙计 —
            </div>
             <div className="h-px w-12 bg-sgs-gold opacity-50"></div>
        </div>

      <div className="flex flex-wrap justify-center gap-6">
        {PRESET_QUESTIONS.map((q) => (
          <button
            key={q.id}
            onClick={() => onSelect(q)}
            className="group relative w-32 h-40 bg-sgs-wood border-2 border-sgs-gold/60 rounded-lg shadow-lg 
                       hover:-translate-y-2 hover:shadow-2xl hover:border-sgs-gold transition-all duration-300
                       overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
            
            {/* Inner Content */}
            <div className="absolute inset-1 border border-dashed border-sgs-gold/30 rounded flex flex-col items-center justify-center p-2">
                
                {/* Icon/Symbol */}
                <div className="w-10 h-10 mb-2 rounded-full bg-sgs-dark border border-sgs-gold flex items-center justify-center">
                    <span className="font-calligraphy text-sgs-gold text-lg">策</span>
                </div>

                {/* Text (Vertical) */}
                <span className="font-serif text-lg text-sgs-paper group-hover:text-white group-hover:font-bold transition-all writing-vertical-rl tracking-widest h-20">
                    {q.label}
                </span>
            </div>

            {/* Shine Effect */}
            <div className="absolute -top-10 -left-10 w-20 h-40 bg-white/10 rotate-45 transform group-hover:translate-x-40 transition-transform duration-700 pointer-events-none"></div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PresetOptions;