
import React, { useState, useEffect, useRef } from 'react';
import { Player } from '../types';
import { CALL_RATE_PER_SEC, CALL_RATE_PER_MIN } from '../constants';

interface VideoCallProps {
  player: Player;
  onEnd: () => void;
  coins: number;
  setCoins: React.Dispatch<React.SetStateAction<number>>;
}

const VideoCall: React.FC<VideoCallProps> = ({ player, onEnd, coins, setCoins }) => {
  const [seconds, setSeconds] = useState(0);
  const [isConnecting, setIsConnecting] = useState(true);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  useEffect(() => {
    // Simulate connection delay for realism
    const connectionTimeout = setTimeout(() => {
      setIsConnecting(false);
    }, 2500);

    // Attempt to get user camera
    const getMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access denied or error:", err);
      }
    };
    getMedia();

    // Timer and Coin Deduction (8 coins/min = 0.133 coins/sec)
    const timer = setInterval(() => {
      if (!isConnecting) {
        setSeconds(prev => prev + 1);
        
        setCoins(prevCoins => {
          const nextCoins = prevCoins - CALL_RATE_PER_SEC;
          if (nextCoins <= 0) {
            clearInterval(timer);
            return 0;
          }
          return nextCoins;
        });
      }
    }, 1000);

    return () => {
      clearTimeout(connectionTimeout);
      clearInterval(timer);
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isConnecting]);

  // Handle auto-end when coins reach zero
  useEffect(() => {
    if (coins <= 0 && !isConnecting) {
      alert("Call ended: Insufficient balance. Please recharge.");
      onEnd();
    }
  }, [coins, isConnecting]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col max-w-md mx-auto h-screen overflow-hidden font-sans">
      {/* Remote Video (Full Screen) */}
      <div className="absolute inset-0 bg-slate-900">
        <img 
          src={player.imageUrl} 
          className={`w-full h-full object-cover transition-all duration-1000 ${isConnecting ? 'scale-110 blur-md opacity-50' : 'scale-100 blur-0 opacity-100'}`}
          alt="Caller"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
      </div>

      {/* Connecting Overlay */}
      {isConnecting && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="relative mb-6">
            <img src={player.imageUrl} className="w-24 h-24 rounded-full border-4 border-pink-500 object-cover shadow-2xl animate-pulse" />
            <div className="absolute -inset-4 border-2 border-pink-500/30 rounded-full animate-ping"></div>
          </div>
          <h2 className="text-white text-xl font-bold tracking-wide">Connecting to {player.name}...</h2>
          <p className="text-pink-400 text-xs mt-2 uppercase font-black tracking-widest animate-bounce">Rate: {CALL_RATE_PER_MIN} Coins / Min</p>
        </div>
      )}

      {/* Local Video (Floating) */}
      <div className="absolute top-6 right-6 w-28 h-40 bg-slate-800 rounded-2xl border-2 border-white/20 overflow-hidden shadow-2xl z-20">
        {isVideoOff ? (
          <div className="w-full h-full flex items-center justify-center bg-slate-800">
            <i className="fas fa-user-slash text-white/40"></i>
          </div>
        ) : (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            className="w-full h-full object-cover"
            style={{ transform: 'scaleX(-1)' }}
          />
        )}
      </div>

      {/* Status Bar */}
      <div className="relative z-10 p-6 flex justify-between items-start pointer-events-none">
        <div className="flex flex-col gap-2">
          <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2 border border-white/10">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            <span className="text-white text-[11px] font-bold">{formatTime(seconds)}</span>
          </div>
          <div className="bg-pink-600/80 backdrop-blur-md px-2 py-0.5 rounded-md self-start">
             <span className="text-white text-[9px] font-black uppercase">LIVE HD</span>
          </div>
        </div>
        
        <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10">
          <i className="fas fa-coins text-yellow-400 text-xs"></i>
          <span className="text-white text-xs font-bold">{Math.floor(coins)} <span className="text-[10px] opacity-60">Coins</span></span>
        </div>
      </div>

      {/* Bottom Profile Info & Controls */}
      <div className="mt-auto relative z-10 p-8 pb-12 flex flex-col items-center">
        {!isConnecting && (
          <>
            <h3 className="text-white text-2xl font-black mb-1 drop-shadow-lg">{player.name}</h3>
            <div className="flex items-center gap-2 mb-8 bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm border border-white/5">
              <i className="fas fa-map-marker-alt text-pink-500 text-[10px]"></i>
              <p className="text-white/80 text-xs font-medium uppercase tracking-widest">{player.location}</p>
            </div>
          </>
        )}

        <div className="flex items-center gap-6">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-lg active:scale-90 ${isMuted ? 'bg-red-500 text-white' : 'bg-white/10 backdrop-blur-lg text-white border border-white/20'}`}
          >
            <i className={`fas ${isMuted ? 'fa-microphone-slash' : 'fa-microphone'} text-lg`}></i>
          </button>

          <button 
            onClick={onEnd}
            className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(239,68,68,0.6)] active:scale-90 transition-all border-4 border-white/10 group"
          >
            <i className="fas fa-phone-slash text-white text-3xl transform rotate-[135deg]"></i>
          </button>

          <button 
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-lg active:scale-90 ${isVideoOff ? 'bg-red-500 text-white' : 'bg-white/10 backdrop-blur-lg text-white border border-white/20'}`}
          >
            <i className={`fas ${isVideoOff ? 'fa-video-slash' : 'fa-video'} text-lg`}></i>
          </button>
        </div>
        
        {/* Gift Button - Added for more functionality */}
        <button className="mt-8 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-500 px-6 py-2 rounded-full border border-yellow-500/40 flex items-center gap-2 transition active:scale-95">
          <i className="fas fa-gift"></i>
          <span className="text-xs font-bold uppercase">Send Gift</span>
        </button>
      </div>
    </div>
  );
};

export default VideoCall;
