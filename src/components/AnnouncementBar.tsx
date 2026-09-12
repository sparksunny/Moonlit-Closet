import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

const MESSAGES = [
  'Complimentary Nationwide Delivery on Selected Collections',
  'Worldwide Express Bridal Shipping | Inquire for Bespoke Orders',
  'Private Bridal Consultations Available at Our Lahore & Islamabad Salons',
];

export const AnnouncementBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      id="announcement-bar"
      className="bg-[#E4D1B8] text-[#3B2A20] text-[11px] sm:text-xs tracking-[0.2em] uppercase font-medium py-2 px-4 transition-colors duration-300 border-b border-[#D8C2A5]/60 relative z-40"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button
          id="announcement-prev-btn"
          onClick={() => setCurrentIndex((prev) => (prev - 1 + MESSAGES.length) % MESSAGES.length)}
          className="hidden sm:inline-flex p-1 hover:text-[#B99A62] transition-colors focus:outline-none"
          aria-label="Previous announcement"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        <div className="flex-1 text-center flex items-center justify-center gap-2 overflow-hidden px-2">
          <Sparkles className="w-3 h-3 text-[#B99A62] shrink-0" />
          <span className="truncate transition-all duration-500 ease-in-out">
            {MESSAGES[currentIndex]}
          </span>
          <Sparkles className="w-3 h-3 text-[#B99A62] shrink-0" />
        </div>

        <button
          id="announcement-next-btn"
          onClick={() => setCurrentIndex((prev) => (prev + 1) % MESSAGES.length)}
          className="hidden sm:inline-flex p-1 hover:text-[#B99A62] transition-colors focus:outline-none"
          aria-label="Next announcement"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
