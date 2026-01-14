
import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface ProfileProps {
  coins: number;
  onRecharge: () => void;
  lang: Language;
  setLang: (l: Language) => void;
}

// Fixed missing closing brace and default export
const Profile: React.FC<ProfileProps> = ({ coins, onRecharge, lang, setLang }) => {
  const t = TRANSLATIONS[lang];
  const languages: Language[] = ['en', 'hi', 'es', 'ar', 'fr', 'pt', 'ru', 'ja', 'zh', 'de'];

  return (
    <div className="p-4">
      <div className="flex flex-col items-center py-6">
        <div className="relative">
          <img 
            src="https://picsum.photos/seed/user/200" 
            className="w-24 h-24 rounded-full border-4 border-red-600 object-cover" 
            alt="User" 
          />
          <div className="absolute bottom-0 right-0 bg-red-600 p-1.5 rounded-full text-[10px] border-2 border-slate-950">
            <i className="fas fa-crown text-white"></i>
          </div>
        </div>
        <h2 className="mt-4 text-xl font-bold text-white tracking-tight">Premium Adult User</h2>
        <div className="bg-red-600/10 text-red-500 text-[10px] px-3 py-0.5 rounded-full font-black mt-2">VERIFIED 21+</div>
      </div>

      <div className="bg-slate-900 rounded-3xl p-6 shadow-xl mb-6 border border-white/5">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-1">{t.coins}</p>
            <div className="flex items-center gap-2">
              <i className="fas fa-coins text-yellow-500 text-2xl"></i>
              <span className="text-3xl font-black text-white">{coins}</span>
            </div>
          </div>
          <button 
            onClick={onRecharge}
            className="bg-gradient-to-r from-red-600 to-pink-600 px-6 py-2.5 rounded-full text-white font-bold text-sm shadow-lg active:scale-95"
          >
            {t.recharge}
          </button>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-3 px-2">Language / भाषा</p>
        <div className="grid grid-cols-5 gap-2">
          {languages.map(l => (
            <button 
              key={l}
              onClick={() => setLang(l)}
              className={`py-2 rounded-xl text-[10px] font-black transition-all border ${lang === l ? 'bg-white text-black border-white' : 'bg-slate-900 text-slate-400 border-white/10'}`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <button className="w-full bg-slate-900 border border-white/5 p-4 rounded-2xl flex items-center justify-between text-slate-300">
          <div className="flex items-center gap-4">
            <i className="fas fa-lock text-red-500"></i>
            <span className="text-sm font-medium">Privacy Settings</span>
          </div>
          <i className="fas fa-chevron-right text-xs text-slate-700"></i>
        </button>
        <button className="w-full bg-slate-900 border border-white/5 p-4 rounded-2xl flex items-center justify-between text-slate-300">
          <div className="flex items-center gap-4">
            <i className="fas fa-id-card text-blue-500"></i>
            <span className="text-sm font-medium">Verification Status</span>
          </div>
          <span className="text-[10px] bg-green-500/10 text-green-500 px-2 py-1 rounded font-bold uppercase">Active</span>
        </button>
      </div>

      <div className="mt-10 text-center">
        <button 
          onClick={() => {
            localStorage.removeItem('age_verified');
            window.location.reload();
          }}
          className="text-red-500 text-sm font-bold opacity-70"
        >
          Logout & Reset
        </button>
      </div>
    </div>
  );
};

export default Profile;
