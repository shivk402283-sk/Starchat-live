
import React, { useState, useEffect } from 'react';
import { View, Player, Language } from './types';
import { MOCK_GIRLS } from './constants';
import Layout from './components/Layout';
import Home from './components/Home';
import Messages from './components/Messages';
import Profile from './components/Profile';
import Recharge from './components/Recharge';
import VideoCall from './components/VideoCall';
import AgeGate from './components/AgeGate';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('AGE_GATING');
  const [coins, setCoins] = useState<number>(0);
  const [activeCallPlayer, setActiveCallPlayer] = useState<Player | null>(null);
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    const savedCoins = localStorage.getItem('star_coins');
    const isVerified = localStorage.getItem('age_verified');
    const savedLang = localStorage.getItem('app_lang') as Language;

    if (savedCoins) setCoins(parseInt(savedCoins));
    else setCoins(10);

    if (savedLang) setLang(savedLang);

    if (isVerified === 'true') {
      setCurrentView('HOME');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('star_coins', coins.toString());
  }, [coins]);

  useEffect(() => {
    localStorage.setItem('app_lang', lang);
  }, [lang]);

  const handleVerify = () => {
    localStorage.setItem('age_verified', 'true');
    setCurrentView('HOME');
  };

  const handleStartCall = (player: Player) => {
    if (coins < 8) {
      alert("Insufficient coins! Please recharge to start a call.");
      setCurrentView('RECHARGE');
      return;
    }
    setActiveCallPlayer(player);
    setCurrentView('CALL');
  };

  const handleEndCall = () => {
    setActiveCallPlayer(null);
    setCurrentView('HOME');
  };

  const handleRecharge = (amount: number, extraCoins: number) => {
    setCoins(prev => prev + extraCoins);
    setCurrentView('HOME');
  };

  if (currentView === 'AGE_GATING') {
    return <AgeGate onVerify={handleVerify} lang={lang} setLang={setLang} />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'HOME':
        return <Home onCall={handleStartCall} lang={lang} />;
      case 'MESSAGES':
        return <Messages lang={lang} />;
      case 'PROFILE':
        return (
          <Profile 
            coins={coins} 
            onRecharge={() => setCurrentView('RECHARGE')} 
            lang={lang} 
            setLang={setLang} 
          />
        );
      case 'RECHARGE':
        return <Recharge onRecharge={handleRecharge} lang={lang} />;
      case 'CALL':
        return activeCallPlayer ? (
          <VideoCall 
            player={activeCallPlayer} 
            onEnd={handleEndCall} 
            coins={coins}
            setCoins={setCoins}
            lang={lang}
          />
        ) : <Home onCall={handleStartCall} lang={lang} />;
      default:
        return <Home onCall={handleStartCall} lang={lang} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col max-w-md mx-auto relative overflow-hidden shadow-2xl">
      <Layout 
        currentView={currentView} 
        setView={setCurrentView} 
        coins={coins}
        hideNav={currentView === 'CALL'}
        lang={lang}
      >
        {renderView()}
      </Layout>
    </div>
  );
};

export default App;
