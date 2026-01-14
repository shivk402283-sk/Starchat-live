
import React from 'react';
import { Player, Language } from '../types';
import { MOCK_GIRLS, CALL_RATE_PER_MIN, TRANSLATIONS } from '../constants';

interface HomeProps {
  onCall: (player: Player) => void;
  lang: Language;
}

const Home: React.FC<HomeProps> = ({ onCall, lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="p-3">
      {/* Promo Banner */}
      <div className="mb-6 mt-2 overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 via-red-500 to-purple-900 p-6 shadow-xl relative border border-white/10">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-yellow-400 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded">GLOBAL 21+</span>
            <h2 className="text-xl font-black text-white italic">{t.quick_match}</h2>
          </div>
          <p className="text-xs text-pink-100 leading-relaxed font-medium">
            Connect with verified 21+ adults from all over the world.<br/>Private & Discreete.
          </p>
          <div className="flex items-center gap-4 mt-5">
            <button 
              onClick={() => onCall(MOCK_GIRLS[Math.floor(Math.random() * MOCK_GIRLS.length)])}
              className="bg-white text-red-600 px-6 py-2.5 rounded-full font-black text-sm shadow-xl active:scale-95 transition-all flex items-center gap-2"
            >
              <i className="fas fa-globe-americas"></i>
              {t.quick_match}
            </button>
            <span className="text-[10px] text-white/70 font-bold uppercase tracking-widest">{t.rate}</span>
          </div>
        </div>
        <i className="fas fa-video absolute right-[-20px] bottom-[-20px] text-white opacity-10 text-[140px] rotate-[-15deg]"></i>
      </div>

      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="text-white font-black text-lg">Worldwide Picks</h3>
        <div className="flex gap-1">
           <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></span>
           <span className="text-[10px] text-red-500 font-black">2,491 ONLINE</span>
        </div>
      </div>

      {/* Profile Grid */}
      <div className="grid grid-cols-2 gap-4">
        {MOCK_GIRLS.map((player) => (
          <div 
            key={player.id} 
            className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[3/4.2] group border border-white/5 bg-slate-900"
          >
            <img 
              src={player.imageUrl} 
              alt={player.name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
            />
            
            <div className="absolute top-3 left-3 flex flex-col gap-1">
              <div className="bg-black/60 backdrop-blur-md px-2 py-1 rounded-full flex items-center gap-1.5 border border-white/10">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-white text-[9px] font-black uppercase tracking-wider">{t.online}</span>
              </div>
              <div className="bg-red-600 px-2 py-0.5 rounded-full self-start text-[8px] font-black text-white border border-white/10">21+</div>
            </div>

            <div className="absolute top-3 right-3 bg-white/10 backdrop-blur-md w-7 h-5 flex items-center justify-center rounded border border-white/10 overflow-hidden shadow-lg">
                <img 
                  src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${player.countryCode}.svg`} 
                  className="w-full h-full object-cover"
                />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 p-3.5 w-full">
              <div className="mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-white font-black text-base">{player.name}</span>
                  <span className="text-slate-400 text-xs font-medium">{player.age}</span>
                </div>
                <div className="flex items-center gap-1 text-slate-500 text-[10px] font-medium">
                  <i className="fas fa-map-marker-alt text-red-500"></i>
                  {player.location}
                </div>
              </div>

              <button 
                onClick={() => onCall(player)}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 py-2.5 rounded-xl text-white text-[11px] font-black transition shadow-lg active:scale-95 flex items-center justify-center gap-2 border border-white/10 uppercase"
              >
                <i className="fas fa-video"></i>
                {t.start_call}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
