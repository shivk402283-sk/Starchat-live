
import React, { useState, useEffect } from 'react';
import { View, Player, Language, RechargeOption } from './types';
import { MOCK_GIRLS, RECHARGE_OPTIONS, CALL_RATE_PER_MIN } from './constants';
import Layout from './components/Layout';
import Home from './components/Home';
import Messages from './components/Messages';
import Profile from './components/Profile';
import Recharge from './components/Recharge';
import VideoCall from './components/VideoCall';
import AgeGate from './components/AgeGate';
import AdminPanel from './components/AdminPanel';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('AGE_GATING');
  const [coins, setCoins] = useState<number>(0);
  const [activeCallPlayer, setActiveCallPlayer] = useState<Player | null>(null);
  const [lang, setLang] = useState<Language>('en');
  
  // Dynamic settings managed by Admin
  const [girls, setGirls] = useState<Player[]>(MOCK_GIRLS);
  const [rechargePlans, setRechargePlans] = useState<RechargeOption[]>(RECHARGE_OPTIONS);
  const [callRate, setCallRate] = useState<number>(CALL_RATE_PER_MIN);

  useEffect(() => {
    const savedCoins = localStorage.getItem('star_coins');
    const isVerified = localStorage.getItem('age_verified');
    const savedLang = localStorage.getItem('app_lang') as Language;
    
    // Load Admin modifications
    const savedGirls = localStorage.getItem('admin_girls');
    const savedPlans = localStorage.getItem('admin_plans');
    const savedRate = localStorage.getItem('admin_rate');

    if (savedCoins) setCoins(parseInt(savedCoins));
    else setCoins(10);

    if (savedLang) setLang(savedLang);
    if (savedGirls) setGirls(JSON.parse(savedGirls));
    if (savedPlans) setRechargePlans(JSON.parse(savedPlans));
    if (savedRate) setCallRate(parseInt(savedRate));

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
    if (coins < callRate) {
      alert("Insufficient coins! Please recharge to start a call.");
      setCurrentView('RECHARGE');
      return;
    }
    setActiveCallPlayer(player);
    setCurrentView('CALL');
  };

  