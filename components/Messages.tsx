
import React, { useState } from 'react';
import { MOCK_GIRLS, TRANSLATIONS } from '../constants';
import { ChatMessage, Language } from '../types';
import { getGeminiResponse } from '../services/geminiService';

interface MessagesProps {
  lang: Language;
}

const Messages: React.FC<MessagesProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [selectedPlayer, setSelectedPlayer] = useState<typeof MOCK_GIRLS[0] | null>(null);
  const [chatHistory, setChatHistory] = useState<Record<string, ChatMessage[]>>({});
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || !selectedPlayer) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date()
    };

    setChatHistory(prev => ({
      ...prev,
      [selectedPlayer.id]: [...(prev[selectedPlayer.id] || []), userMsg]
    }));
    setInput('');
    setIsTyping(true);

    const botResponseText = await getGeminiResponse(input, selectedPlayer.name, lang);
    
    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      sender: 'bot',
      text: botResponseText || "Hey!",
      timestamp: new Date()
    };

    setIsTyping(false);
    setChatHistory(prev => ({
      ...prev,
      [selectedPlayer.id]: [...(prev[selectedPlayer.id] || []), botMsg]
    }));
  };

  if (selectedPlayer) {
    return (
      <div className="flex flex-col h-full bg-slate-950">
        <div className="bg-slate-900 p-4 flex items-center gap-3 border-b border-white/5">
          <button onClick={() => setSelectedPlayer(null)} className="text-slate-400">
            <i className="fas fa-arrow-left text-lg"></i>
          </button>
          <img src={selectedPlayer.imageUrl} className="w-10 h-10 rounded-full object-cover" />
          <div>
            <h3 className="font-bold text-white text-sm">{selectedPlayer.name}</h3>
            <span className="text-green-500 text-[10px] flex items-center gap-1 uppercase font-black">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> {t.online}
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {(chatHistory[selectedPlayer.id] || []).map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                msg.sender === 'user' 
                  ? 'bg-red-600 text-white rounded-tr-none shadow-lg' 
                  : 'bg-slate-900 text-slate-200 border border-white/5 rounded-tl-none shadow-md'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-900 border border-white/5 p-3 rounded-2xl rounded-tl-none text-slate-500 text-xs italic">
                typing...
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-slate-900 border-t border-white/5 flex gap-2 items-center safe-bottom">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type..."
            className="flex-1 bg-slate-800 text-white px-4 py-2.5 rounded-full text-sm outline-none focus:ring-1 focus:ring-red-500 border border-white/5"
          />
          <button 
            onClick={handleSend}
            className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg active:scale-90"
          >
            <i className="fas fa-paper-plane text-xs"></i>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-black mb-4 text-white px-1 italic">{t.inbox}</h2>
      <div className="space-y-2">
        {MOCK_GIRLS.map((player) => (
          <div 
            key={player.id}
            onClick={() => setSelectedPlayer(player)}
            className="flex items-center gap-4 p-3 bg-slate-900 border border-white/5 rounded-2xl hover:bg-slate-800 transition cursor-pointer"
          >
            <div className="relative">
              <img src={player.imageUrl} className="w-14 h-14 rounded-full object-cover border-2 border-white/10" />
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-slate-950 rounded-full shadow-lg"></div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-0.5">
                <h3 className="font-bold text-white text-sm">{player.name}</h3>
                <span className="text-[10px] text-slate-600 font-bold uppercase tracking-tighter">Live</span>
              </div>
              <p className="text-xs text-slate-500 truncate font-medium">Click to chat with me privately...</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
