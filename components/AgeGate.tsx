
import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface AgeGateProps {
  onVerify: () => void;
  lang: Language;
  setLang: (l: Language) => void;
}

const AgeGate: React.FC<AgeGateProps> = ({ onVerify, lang, setLang }) => {
  const t = TRANSLATIONS[lang];
  const languages: Language[] = ['en', 'hi', 'es', 'ar', 'fr', 'pt', 'ru', 'ja', 'zh', 'de'];

  return (
    <div className="fixed inset-0 bg-slate-950 z-[200] flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto overflow-y-auto">
      <div className="w-20 h-20 bg-gradient-to-tr from-red-600 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(220,38,38,0.3)] shrink-0">
        <span className="text-3xl font-black text-white">21+</span>
      </div>
      
      <h1 className="text-2xl font-black text-white mb-2 tracking-tight">
        {t.age_warning}
      </h1>
      
      <p className="text-slate-400 text-xs mb-8 leading-relaxed max-w-xs">
        This application contains adult-oriented content and live interactions. 
        You must be at least 21 years old to enter.
      </p>

      <div className="flex flex-col w-full gap-3 mb-8">
        <button 
          onClick={onVerify}
          className="w-full bg-red-600 hover:bg-red-700 py-4 rounded-xl text-white font-bold text-base shadow-xl transition-all active:scale-95"
        >
          {t.age_confirm}
        </button>
        
        <button 
          onClick={() => window.location.href = 'https://google.com'}
          className="w-full bg-slate-900 py-3 rounded-xl text-slate-500 font-bold text-xs"
        >
          {t.age_exit}
        </button>
      </div>

      <div className="w-full">
        <p className="text-[10px] text-slate-500 uppercase font-black mb-3 tracking-widest">Select Language / भाषा चुनें</p>
        <div className="grid grid-cols-5 gap-2">
          {languages.map(l => (
            <button 
              key={l}
              onClick={() => setLang(l)} 
              className={`px-1 py-2 rounded-lg text-[10px] font-black transition-all border ${lang === l ? 'bg-white text-black border-white shadow-lg' : 'bg-slate-900 text-slate-500 border-white/5'}`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-10 text-[9px] text-slate-600 px-4 italic">
        By entering, you confirm you are of legal age in your jurisdiction to view mature content and interact with other adults globally.
      </p>
    </div>
  );
};

export default AgeGate;
