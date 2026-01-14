
import React from 'react';
import { RECHARGE_OPTIONS } from '../constants';

interface RechargeProps {
  onRecharge: (amount: number, coins: number) => void;
}

const Recharge: React.FC<RechargeProps> = ({ onRecharge }) => {
  return (
    <div className="p-4 h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-white mb-2">Refill Coins</h2>
        <p className="text-slate-400 text-sm">Pick a plan and enjoy unlimited high-quality video calls.</p>
      </div>

      <div className="space-y-4 flex-1">
        {RECHARGE_OPTIONS.map((option) => (
          <div 
            key={option.amount}
            onClick={() => onRecharge(option.amount, option.coins)}
            className="bg-slate-800 p-5 rounded-3xl flex items-center justify-between border-2 border-transparent hover:border-pink-500/50 transition-all cursor-pointer group active:scale-95"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-400/10 rounded-2xl flex items-center justify-center">
                <i className="fas fa-coins text-yellow-400 text-xl"></i>
              </div>
              <div>
                <h3 className="text-white font-black text-lg">{option.coins} Coins</h3>
                <p className="text-pink-400 text-[10px] font-bold uppercase tracking-widest">{option.label}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-pink-500 px-4 py-2 rounded-xl text-white font-black text-lg group-hover:bg-pink-600 transition">
                ₹{option.amount}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-6 safe-bottom">
        <div className="bg-slate-800/50 rounded-2xl p-4 text-center">
          <p className="text-[10px] text-slate-500 uppercase tracking-tighter mb-2">Secure Payment Partners</p>
          <div className="flex justify-center gap-4 opacity-50 grayscale">
            <i className="fab fa-google-pay text-2xl"></i>
            <i className="fab fa-cc-visa text-2xl"></i>
            <i className="fab fa-cc-mastercard text-2xl"></i>
            <i className="fas fa-wallet text-2xl"></i>
          </div>
        </div>
        <p className="text-[9px] text-slate-600 text-center mt-4">
          By purchasing, you agree to our Terms of Service. Purchases are final and non-refundable.
        </p>
      </div>
    </div>
  );
};

export default Recharge;
