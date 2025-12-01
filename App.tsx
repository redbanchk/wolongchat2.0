import React, { useState, useRef, useEffect, useMemo } from 'react';
import { INITIAL_MESSAGE } from './constants';
import { Message, Sender, PresetQuestion } from './types';
import { fetchZhugeResponse } from './services/arkService';
import CharacterDisplay from './components/CharacterDisplay';
import ChatBubble from './components/ChatBubble';
import PresetOptions from './components/PresetOptions';
import InputArea from './components/InputArea';

const generateId = () => Math.random().toString(36).substr(2, 9);

const LOADING_PHRASES = [
  "闭目沉思，羽扇轻摇...",
  "捻须沉吟，默察其理...",
  "凝神思索，欲解其惑...",
  "伏案凝思，谋定应答..."
];

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [showPresets, setShowPresets] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Generate a random loading phrase every time loading starts
  const loadingText = useMemo(() => {
    return LOADING_PHRASES[Math.floor(Math.random() * LOADING_PHRASES.length)];
  }, [isLoading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, showPresets]);

  const handleUserMessage = async (text: string) => {
    const userMsg: Message = {
      id: generateId(),
      text: text,
      sender: Sender.User,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setShowPresets(false);
    setIsLoading(true);

    const responseText = await fetchZhugeResponse(messages, text);

    const zhugeMsg: Message = {
      id: generateId(),
      text: responseText,
      sender: Sender.Zhuge,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, zhugeMsg]);
    setIsLoading(false);
  };

  const handlePresetSelect = (question: PresetQuestion) => {
    handleUserMessage(question.query);
  };

  return (
    <div className="flex h-screen w-screen bg-sgs-dark overflow-hidden relative">
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 bg-pattern-cloud opacity-5 pointer-events-none z-0"></div>

      {/* Left Panel: Character */}
      <CharacterDisplay />

      {/* Right Panel: Chat Interface */}
      <div className="flex-1 flex flex-col h-full relative z-10 bg-gradient-to-br from-sgs-dark via-[#231e1c] to-[#1a1615]">
        
        {/* Header */}
        <header className="h-20 flex items-center justify-center border-b-4 border-sgs-wood bg-[#2b2623] shadow-lg relative shrink-0">
          {/* Header decoration */}
          <div className="absolute bottom-0 left-0 w-full h-px bg-sgs-gold opacity-30"></div>
          
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 opacity-50">
                {/* Left decorative symbol */}
                <svg viewBox="0 0 100 100" className="fill-sgs-gold"><path d="M50 0 L100 50 L50 100 L0 50 Z" /></svg>
             </div>
             <h1 className="text-4xl font-calligraphy text-transparent bg-clip-text bg-gradient-to-b from-sgs-gold to-[#8f6d3b] tracking-[0.2em] drop-shadow-lg">
                诸葛问策台
             </h1>
             <div className="w-8 h-8 opacity-50">
                 {/* Right decorative symbol */}
                <svg viewBox="0 0 100 100" className="fill-sgs-gold"><path d="M50 0 L100 50 L50 100 L0 50 Z" /></svg>
             </div>
          </div>
        </header>

        {/* Chat Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 relative scroll-smooth bg-pattern-cloud">
          <div className="max-w-4xl mx-auto flex flex-col min-h-full">
            
            {/* Messages */}
            {messages.map((msg) => (
              <ChatBubble key={msg.id} message={msg} />
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start w-full mb-6">
                <div className="flex items-center gap-3 bg-black/30 border border-sgs-gold/30 px-6 py-4 rounded-lg">
                   <div className="w-2 h-2 bg-sgs-gold rounded-full animate-bounce"></div>
                   <div className="w-2 h-2 bg-sgs-gold rounded-full animate-bounce delay-100"></div>
                   <div className="w-2 h-2 bg-sgs-gold rounded-full animate-bounce delay-200"></div>
                   <span className="font-serif text-sgs-gold text-sm ml-2">{loadingText}</span>
                </div>
              </div>
            )}

             {/* Preset Options Area */}
            {showPresets && !isLoading && (
                <div className="flex-1 flex items-center justify-center my-4">
                    <PresetOptions onSelect={handlePresetSelect} />
                </div>
            )}

            {/* Spacer */}
            <div ref={messagesEndRef} className="h-4" />
          </div>
        </div>

        {/* Input Area */}
        <InputArea onSend={handleUserMessage} disabled={isLoading} />
      </div>
      
      {/* Mobile Character Avatar (Floating) */}
      <div className="lg:hidden absolute top-4 left-4 z-50 w-12 h-12 rounded-full border-2 border-sgs-gold bg-sgs-dark overflow-hidden shadow-lg">
         <img src="https://picsum.photos/seed/zhuge/100/100?grayscale" alt="Avatar" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default App;
