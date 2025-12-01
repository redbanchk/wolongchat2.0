import React, { useState, KeyboardEvent } from 'react';

interface InputAreaProps {
  onSend: (text: string) => void;
  disabled: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full bg-[#1e1a18] border-t-4 border-sgs-wood p-4 lg:p-6 shadow-[0_-10px_20px_rgba(0,0,0,0.5)] z-20 relative">
      {/* Decorative top pattern */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-repeat-x opacity-30" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/wood-pattern.png')"}}></div>

      <div className="max-w-4xl mx-auto flex gap-4 items-end">
        
        {/* Input Wrapper (Scroll style) */}
        <div className="flex-1 relative bg-sgs-paper rounded-sm shadow-inner border border-sgs-wood/50 p-1 h-16 flex items-center">
            {/* Scroll ends decoration */}
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-sgs-wood rounded-l-sm"></div>
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-sgs-wood rounded-r-sm"></div>
            
            <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder={disabled ? "丞相正在推演..." : "主公请书写..."}
            className="w-full bg-transparent border-none px-4 text-black placeholder-gray-500 font-serif focus:outline-none focus:ring-0 text-lg mx-2"
            />
        </div>
        
        {/* Send Button (Seal Style - Horizontal) */}
        <button
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          className={`
            w-32 h-16 flex-shrink-0 flex items-center justify-center rounded-lg border-4 transition-all duration-200 transform
            ${disabled || !input.trim() 
                ? 'bg-gray-700 border-gray-600 text-gray-500 cursor-not-allowed opacity-50 grayscale' 
                : 'bg-sgs-red border-red-900 text-white shadow-lg hover:scale-105 active:scale-95 active:shadow-inner'
            }
          `}
          title="Send"
        >
          <div className={`border-2 border-white/30 w-[90%] h-[85%] flex items-center justify-center rounded-md ${!disabled && input.trim() ? 'animate-pulse-slow' : ''}`}>
            <span className="font-calligraphy text-3xl text-shadow-black tracking-widest pt-1">
                启言
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default InputArea;