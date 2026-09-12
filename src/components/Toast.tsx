import React from 'react';
import { Sparkles, Check, Heart, ShoppingBag } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'cart' | 'wishlist' | 'info';
  title: string;
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          onClick={() => onDismiss(t.id)}
          className="pointer-events-auto bg-[#FFFDF9] border border-[#B99A62] p-4 rounded-[2px] shadow-xl flex items-start gap-3 transition-all duration-300 animate-slide-up cursor-pointer hover:bg-[#F8F1E7]"
        >
          <div className="w-8 h-8 rounded-full bg-[#E4D1B8]/60 flex items-center justify-center text-[#B99A62] shrink-0 mt-0.5">
            {t.type === 'cart' && <ShoppingBag className="w-4 h-4" />}
            {t.type === 'wishlist' && <Heart className="w-4 h-4 fill-[#B99A62]" />}
            {t.type === 'info' && <Sparkles className="w-4 h-4" />}
          </div>
          <div className="flex-1">
            <h5 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#3B2A20]">
              {t.title}
            </h5>
            <p className="text-xs text-[#654B39] font-light mt-0.5 leading-snug">
              {t.message}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
