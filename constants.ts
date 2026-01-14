
import { Player, RechargeOption, Language } from './types';

export const RECHARGE_OPTIONS: RechargeOption[] = [
  { amount: 50, coins: 50, label: 'Standard' },
  { amount: 100, coins: 110, label: 'Value' },
  { amount: 200, coins: 250, label: 'Super Saver' }
];

export const CALL_RATE_PER_MIN = 8;
export const CALL_RATE_PER_SEC = CALL_RATE_PER_MIN / 60;

export const MOCK_GIRLS: Player[] = [
  { id: '1', name: 'Aanya', age: 21, location: 'Mumbai', countryCode: 'IN', imageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=400&h=600&auto=format&fit=crop', isOnline: true, bio: 'Namaste! Let\'s talk.' },
  { id: '2', name: 'Sasha', age: 23, location: 'Moscow', countryCode: 'RU', imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&h=600&auto=format&fit=crop', isOnline: true, bio: 'Priviet! Ready for fun?' },
  { id: '3', name: 'Elena', age: 24, location: 'Rio', countryCode: 'BR', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=600&auto=format&fit=crop', isOnline: true, bio: 'Ola! Sexy vibes only.' },
  { id: '4', name: 'Chloe', age: 22, location: 'New York', countryCode: 'US', imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&h=600&auto=format&fit=crop', isOnline: true, bio: 'Hey! Want to hang out?' },
  { id: '5', name: 'Yuki', age: 21, location: 'Tokyo', countryCode: 'JP', imageUrl: 'https://images.unsplash.com/photo-1531746020798-e795c5399c5c?q=80&w=400&h=600&auto=format&fit=crop', isOnline: true, bio: 'Konnichiwa! Let\'s chat.' },
  { id: '6', name: 'Layla', age: 25, location: 'Dubai', countryCode: 'AE', imageUrl: 'https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?q=80&w=400&h=600&auto=format&fit=crop', isOnline: true, bio: 'Welcome to my world.' }
];

export const TRANSLATIONS: Record<Language, any> = {
  en: { home: 'Home', inbox: 'Inbox', profile: 'Profile', recharge: 'Recharge', start_call: 'START CALL', coins: 'Coins', online: 'Online', age_warning: 'Adult Content (21+)', age_confirm: 'I am 21+ and agree to terms', age_exit: 'I am underage', quick_match: 'Quick Match', rate: '8 Coins / Min' },
  hi: { home: 'होम', inbox: 'इनबॉक्स', profile: 'प्रोफ़ाइल', recharge: 'रिचार्ज', start_call: 'कॉल शुरू करें', coins: 'सिक्के', online: 'ऑनलाइन', age_warning: 'वयस्क सामग्री (21+)', age_confirm: 'मैं 21+ हूँ और सहमत हूँ', age_exit: 'मैं कम उम्र का हूँ', quick_match: 'क्विक मैच', rate: '8 सिक्के / मिनट' },
  es: { home: 'Inicio', inbox: 'Bandeja', profile: 'Perfil', recharge: 'Recargar', start_call: 'LLAMAR', coins: 'Monedas', online: 'En línea', age_warning: 'Contenido Adulto (21+)', age_confirm: 'Soy mayor de 21 años', age_exit: 'Soy menor de edad', quick_match: 'Emparejar', rate: '8 Monedas / Min' },
  ar: { home: 'الرئيسية', inbox: 'الرسائل', profile: 'الملف الشخصي', recharge: 'شحن', start_call: 'بدء الاتصال', coins: 'عملات', online: 'متصل', age_warning: 'محتوى للكبار (21+)', age_confirm: 'أنا فوق 21 سنة وأوافق', age_exit: 'أنا تحت السن القانوني', quick_match: 'مطابقة سريعة', rate: '8 عملات / دقيقة' },
  fr: { home: 'Accueil', inbox: 'Boîte', profile: 'Profil', recharge: 'Recharger', start_call: 'APPELER', coins: 'Pièces', online: 'En ligne', age_warning: 'Contenu Adulte (21+)', age_confirm: 'J\'ai 21 ans et plus', age_exit: 'Je suis mineur', quick_match: 'Match Rapide', rate: '8 Pièces / Min' },
  pt: { home: 'Início', inbox: 'Mensagens', profile: 'Perfil', recharge: 'Recarga', start_call: 'LIGAR', coins: 'Moedas', online: 'Online', age_warning: 'Conteúdo Adulto (21+)', age_confirm: 'Tenho 21+ anos', age_exit: 'Sou menor de idade', quick_match: 'Início Rápido', rate: '8 Moedas / Min' },
  ru: { home: 'Главная', inbox: 'Чат', profile: 'Профиль', recharge: 'Пополнить', start_call: 'ВЫЗОВ', coins: 'Монеты', online: 'В сети', age_warning: 'Контент для взрослых (21+)', age_confirm: 'Мне есть 21 год', age_exit: 'Мне нет 21 года', quick_match: 'Быстрый поиск', rate: '8 Монет / Мин' },
  ja: { home: 'ホーム', inbox: '受信箱', profile: 'プロフィール', recharge: 'チャージ', start_call: '通話開始', coins: 'コイン', online: 'オンライン', age_warning: '成人向けコンテンツ (21+)', age_confirm: '21歳以上です', age_exit: '21歳未満です', quick_match: 'クイックマッチ', rate: '8 コイン / 分' },
  zh: { home: '首页', inbox: '收件箱', profile: '个人资料', recharge: '充值', start_call: '开始通话', coins: '金币', online: '在线', age_warning: '成人内容 (21+)', age_confirm: '我已年满21岁', age_exit: '我未成年', quick_match: '快速匹配', rate: '8 金币 / 分钟' },
  de: { home: 'Start', inbox: 'Postfach', profile: 'Profil', recharge: 'Aufladen', start_call: 'ANRUFEN', coins: 'Münzen', online: 'Online', age_warning: 'Erwachseneninhalt (21+)', age_confirm: 'Ich bin 21+', age_exit: 'Ich bin minderjährig', quick_match: 'Quick Match', rate: '8 Münzen / Min' }
};
