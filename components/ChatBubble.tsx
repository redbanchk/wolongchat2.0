import React from 'react';
import { Message, Sender } from '../types';

interface ChatBubbleProps {
  message: Message;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isZhuge = message.sender === Sender.Zhuge;

  return (
    <div className={`flex w-full mb-8 group ${isZhuge ? 'justify-start' : 'justify-end'}`}>
      
      {/* Zhuge Avatar (Left) */}
      {isZhuge && (
        <div className="flex-shrink-0 mr-3 mt-1">
           <div className="w-12 h-12 rounded-full border-2 border-sgs-gold overflow-hidden shadow-md bg-sgs-dark">
                <img src="https://picsum.photos/seed/zhuge/100/100?grayscale" className="w-full h-full object-cover" alt="诸葛亮" />
           </div>
        </div>
      )}

      {/* Bubble Content */}
      <div
        className={`relative max-w-[80%] lg:max-w-[70%] p-5 shadow-lg border-2
        ${isZhuge 
            ? 'bg-sgs-paper text-black border-sgs-wood/30 rounded-tr-xl rounded-bl-xl rounded-br-xl' 
            : 'bg-sgs-green text-sgs-paper border-sgs-gold/50 rounded-tl-xl rounded-bl-xl rounded-br-xl'
        }
        animate-[slideIn_0.3s_ease-out]
        `}
      >
        {/* Decorative corner accents for Zhuge */}
        {isZhuge && (
             <>
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-sgs-gold rounded-tl-sm opacity-60"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-sgs-gold rounded-br-sm opacity-60"></div>
             </>
        )}

        {/* Sender Name */}
        <div className={`text-xs mb-2 font-bold tracking-wider flex items-center gap-2 ${isZhuge ? 'text-sgs-wood' : 'text-sgs-gold/80 justify-end'}`}>
            {isZhuge ? '【蜀相】诸葛孔明' : '主公'}
        </div>

        {/* Text */}
        <p className="font-serif leading-relaxed text-base lg:text-lg whitespace-pre-wrap">
          {message.text}
        </p>
      </div>

       {/* User Avatar (Right) */}
       {!isZhuge && (
        <div className="flex-shrink-0 ml-3 mt-1">
           <div className="w-12 h-12 rounded-full border-2 border-sgs-green overflow-hidden shadow-md bg-sgs-wood">
                <div className="w-full h-full flex items-center justify-center font-calligraphy text-xl text-sgs-paper bg-sgs-wood">
                    主
                </div>
           </div>
        </div>
      )}

    </div>
  );
};

export default ChatBubble;