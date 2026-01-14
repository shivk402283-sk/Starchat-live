
import React from 'react';
import { View, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  currentView: View;
  setView: (view: View) => void;
  coins: number;
  hideNav?: boolean;
  lang: Language;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, setView, coins, hideNav, lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      {/* Header */}
      {!hideNav && (
        <header className="bg-slate-950/80 backdrop-blur-lg p-4 flex justify-between items-center border-b border-white/5 z-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-red-600 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
              <i className="fas fa-video text-white text-xs"></i>
            </div>
            <h1 className="text-xl font-black italic bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent tracking-tighter">
              STARCHAT <span className="text-[10px] bg-red-600 text-white p-0.5 rounded not-italic">21+</span>
            </h1>
          </div>
          <div 
            onClick={() => setView('RECHARGE')}
            className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-full border border-white/5 cursor-pointer hover:bg-slate-800 transition"
          >
            <i className="fas fa-coins text-yellow-500 text-xs"></i>
            <span className="font-black text-sm text-white">{coins}</span>
            <i className="fas fa-plus-circle text-[10px] text-red-500"></i>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-slate-950 pb-20">
        {children}
      </main>

      {/* Navigation */}
      {!hideNav && (
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-slate-950/90 backdrop-blur-xl border-t border-white/5 flex justify-around items-center py-3 px-6 safe-bottom shadow-2xl z-50">
          <button 
            onClick={() => setView('HOME')}
            className={`flex flex-col items-center gap-1 transition-all ${currentView === 'HOME' ? 'text-red-500 scale-110' : 'text-slate-500'}`}
          >
            <i className={`fas fa-compass text-xl`}></i>
            <span className="text-[9px] font-black uppercase tracking-widest">{t.home}</span>
          </button>
          
          <button 
            onClick={() => setView('MESSAGES')}
            className={`flex flex-col items-center gap-1 transition-all ${currentView === 'MESSAGES' ? 'text-red-500 scale-110' : 'text-slate-500'}`}
          >
            <i className="fas fa-comment-alt text-xl"></i>
            <span className="text-[9px] font-black uppercase tracking-widest">{t.inbox}</span>
          </button>
          
          <button 
            onClick={() => setView('PROFILE')}
            className={`flex flex-col items-center gap-1 transition-all ${currentView === 'PROFILE' ? 'text-red-500 scale-110' : 'text-slate-500'}`}
          >
            <i className="fas fa-user-shield text-xl"></i>
            <span className="text-[9px] font-black uppercase tracking-widest">{t.profile}</span>
          </button>
        </nav>
      )}
    </div>
  );
};

export default Layout;
