import React, { useState } from 'react';
import { Check, Mail } from 'lucide-react';

interface NewsletterProps {
  onSubscribed: (email: string) => void;
}

export const Newsletter: React.FC<NewsletterProps> = ({ onSubscribed }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubmitted(true);
      onSubscribed(email);
      setEmail('');
    }
  };

  return (
    <section 
      id="newsletter-section" 
      className="py-16 sm:py-20 bg-[#E4D1B8]/60 border-b border-[#D8C2A5]/70"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        
        <div className="w-10 h-10 rounded-full bg-[#F8F1E7] border border-[#D8C2A5] flex items-center justify-center mx-auto mb-4 text-[#B99A62]">
          <Mail className="w-4 h-4 stroke-[1.5]" />
        </div>

        <span className="text-[11px] uppercase tracking-[0.3em] font-medium text-[#B99A62] block mb-2">
          Private Client List
        </span>
        
        <h2 className="font-serif text-3xl sm:text-4xl text-[#3B2A20] font-normal tracking-tight mb-3">
          Be First to Discover What's New
        </h2>

        <p className="text-[#654B39] text-sm sm:text-base font-light leading-relaxed mb-8 max-w-xl mx-auto">
          Receive new collection previews, bridal inspiration, private offers, and special announcements.
        </p>

        {isSubmitted ? (
          <div className="bg-[#FFFDF9] border border-[#B99A62]/60 p-4 rounded-[2px] max-w-md mx-auto text-[#3B2A20] flex items-center justify-center gap-2 shadow-xs">
            <Check className="w-4 h-4 text-[#B99A62]" />
            <span className="text-xs uppercase tracking-wider font-medium">
              Thank you for subscribing to the MOONLIT CLOSET Gazette.
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row items-stretch gap-2.5 sm:gap-2">
              <input
                id="newsletter-email-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 bg-[#FFFDF9] border border-[#D8C2A5] px-4 py-3 text-xs text-[#3B2A20] placeholder-[#654B39]/50 focus:outline-none focus:border-[#3B2A20] rounded-[2px]"
              />
              <button
                id="newsletter-subscribe-btn"
                type="submit"
                className="px-8 py-3 bg-[#3B2A20] text-[#F8F1E7] text-xs uppercase tracking-[0.25em] font-medium hover:bg-[#4D372A] transition-colors rounded-[2px] shadow-xs cursor-pointer shrink-0"
              >
                SUBSCRIBE
              </button>
            </div>
            <p className="text-[11px] text-[#654B39]/70 font-light mt-3 tracking-wide">
              By subscribing, you agree to receive occasional updates from MOONLIT CLOSET.
            </p>
          </form>
        )}

      </div>
    </section>
  );
};
