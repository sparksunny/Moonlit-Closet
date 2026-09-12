import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import bridalEditorialImg from '../assets/images/bridal_collection_1789228838332.jpg';
import craftDetailImg from '../assets/images/artisan_craft_detail_1789228889907.jpg';

interface BridalEditorialProps {
  onDiscoverCraft: () => void;
}

export const BridalEditorial: React.FC<BridalEditorialProps> = ({ onDiscoverCraft }) => {
  return (
    <section 
      id="bridal-editorial-section" 
      className="py-16 sm:py-24 bg-[#F8F1E7] border-b border-[#D8C2A5]/40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Side: Large Portrait Image (Editorial Style) */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Offset Accent Border Frame */}
              <div className="absolute -top-4 -left-4 w-full h-full border border-[#B99A62]/40 rounded-[2px] pointer-events-none hidden sm:block"></div>
              
              {/* Main Bridal Image */}
              <div className="relative aspect-[3/4] rounded-[2px] overflow-hidden shadow-[0_16px_40px_rgba(59,42,32,0.1)] bg-[#F3E8DA]">
                <img
                  src={bridalEditorialImg}
                  alt="MOONLIT CLOSET Bridal Couture - Intricate Hand Embroidery"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Floating Artisan Micro-Card Overlay */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 w-48 sm:w-56 bg-[#FFFDF9] border border-[#D8C2A5] p-3.5 shadow-xl rounded-[2px]">
                <div className="relative aspect-square overflow-hidden mb-2 rounded-[1px]">
                  <img
                    src={craftDetailImg}
                    alt="Artisan embroidery frame detail"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#3B2A20]/10"></div>
                </div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-[#B99A62] font-semibold">Atelier Lahore</p>
                <p className="font-serif text-xs text-[#3B2A20] font-medium leading-tight">Authentic Adda Needlework</p>
              </div>

            </div>
          </div>

          {/* Right Side: Editorial Content & Typography */}
          <div className="lg:col-span-6 flex flex-col justify-center pt-8 lg:pt-0">
            
            {/* Small uppercase label */}
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#B99A62]" />
              <span className="text-[11px] uppercase tracking-[0.3em] font-medium text-[#B99A62]">
                THE ART OF CRAFT
              </span>
            </div>

            {/* Large serif heading */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] leading-[1.18] text-[#3B2A20] font-normal tracking-tight mb-6">
              Every Detail, <br />
              <span className="italic font-normal text-[#523B2D]">Thoughtfully Crafted</span>
            </h2>

            {/* Decorative floral line ornament */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-[1px] bg-[#B99A62]"></span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B99A62" strokeWidth="1.5">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
              </svg>
              <span className="w-12 h-[1px] bg-[#B99A62]"></span>
            </div>

            {/* Body copy */}
            <p className="text-[#654B39] text-base sm:text-lg leading-relaxed font-light mb-6">
              From intricate embroidery to graceful silhouettes, every MOONLIT CLOSET creation is designed with patience, precision, and a deep appreciation for timeless beauty.
            </p>

            <p className="text-[#654B39]/90 text-sm leading-relaxed font-light mb-8">
              We preserve the historic art of Pakistani zardozi, badla, and dabka work by working exclusively with revered generational ustaads. Each bridal piece takes between 250 to 450 meticulous atelier hours, ensuring an heirloom garment made to be cherished for lifetimes.
            </p>

            {/* Three Micro Stats */}
            <div className="grid grid-cols-3 gap-4 py-5 mb-8 border-y border-[#D8C2A5]/50">
              <div>
                <p className="font-serif text-2xl text-[#3B2A20] font-normal">380+</p>
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#654B39] font-medium mt-0.5">Hours Per Bridal</p>
              </div>
              <div>
                <p className="font-serif text-2xl text-[#3B2A20] font-normal">100%</p>
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#654B39] font-medium mt-0.5">Pure Raw Silk</p>
              </div>
              <div>
                <p className="font-serif text-2xl text-[#3B2A20] font-normal">Bespoke</p>
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#654B39] font-medium mt-0.5">Custom Fittings</p>
              </div>
            </div>

            {/* CTA */}
            <div>
              <button
                id="bridal-editorial-discover-craft-btn"
                onClick={onDiscoverCraft}
                className="group inline-flex items-center justify-center px-8 py-3.5 bg-[#3B2A20] text-[#F8F1E7] text-xs uppercase tracking-[0.25em] font-medium rounded-[2px] transition-all duration-300 hover:bg-[#4D372A] hover:-translate-y-0.5 shadow-sm cursor-pointer"
              >
                <span>DISCOVER OUR CRAFT</span>
                <ArrowRight className="w-3.5 h-3.5 ml-2.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
