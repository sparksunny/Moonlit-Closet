import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import heroImageDefault from '../assets/images/hero_bridal_couture_1789228816381.jpg';
import { SiteContent } from '../types';

interface HeroProps {
  onExploreBridal: () => void;
  onViewCollection: () => void;
  content?: SiteContent['hero'];
}

export const Hero: React.FC<HeroProps> = ({ onExploreBridal, onViewCollection, content }) => {
  const currentHeroImage = content?.image || heroImageDefault;

  return (
    <section 
      id="hero-section" 
      className="relative bg-[#F8F1E7] overflow-hidden border-b border-[#D8C2A5]/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Content Column (45%) */}
          <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 relative z-10">
            
            {/* Subtle botanical line-art background watermarking */}
            <svg 
              className="absolute -top-12 -left-12 w-64 h-64 text-[#D8C2A5]/30 pointer-events-none -z-10"
              viewBox="0 0 200 200" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="0.8"
            >
              <path d="M100 20 C60 50, 40 90, 40 140 C80 140, 110 110, 140 70 Z" />
              <path d="M100 20 C140 50, 160 90, 160 140 C120 140, 90 110, 60 70 Z" />
              <circle cx="100" cy="100" r="70" strokeDasharray="3 3" />
              <path d="M100 0 L100 200" strokeDasharray="2 4" />
            </svg>

            {/* Small Label */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-6 h-[1px] bg-[#B99A62]"></span>
              <span className="text-[11px] uppercase tracking-[0.3em] font-medium text-[#B99A62]">
                {content?.eyebrow || 'THE BRIDAL EDIT'}
              </span>
              <span className="w-6 h-[1px] bg-[#B99A62]"></span>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[54px] font-normal leading-[1.12] text-[#3B2A20] tracking-tight mb-5">
              {content?.titleLine1 || 'Made for Your'} <br />
              <span className="italic font-normal text-[#523B2D]">
                {content?.titleHighlight || 'Most Beautiful'}
              </span> <br />
              {content?.titleLine2 || 'Beginning'}
            </h1>

            {/* Supporting Text */}
            <p className="text-[#654B39] text-base sm:text-lg leading-relaxed font-light mb-8 max-w-md">
              {content?.description || 'Discover timeless silhouettes, delicate craftsmanship, and graceful details designed for unforgettable celebrations.'}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                id="hero-explore-bridal-btn"
                onClick={onExploreBridal}
                className="group relative inline-flex items-center justify-center px-8 py-3.5 bg-[#3B2A20] text-[#F8F1E7] text-xs uppercase tracking-[0.25em] font-medium rounded-[2px] transition-all duration-300 hover:bg-[#4D372A] hover:-translate-y-0.5 shadow-sm hover:shadow-md cursor-pointer"
              >
                <span>{content?.primaryButtonText || 'EXPLORE BRIDAL'}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-2.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                id="hero-view-collection-btn"
                onClick={onViewCollection}
                className="inline-flex items-center justify-center px-7 py-3.5 bg-transparent border border-[#654B39]/70 text-[#3B2A20] text-xs uppercase tracking-[0.25em] font-medium rounded-[2px] transition-all duration-300 hover:bg-[#3B2A20] hover:text-[#F8F1E7] hover:-translate-y-0.5 cursor-pointer"
              >
                {content?.secondaryButtonText || 'VIEW COLLECTIONS'}
              </button>
            </div>

            {/* Luxury Heritage Micro-badges */}
            <div className="mt-10 pt-6 border-t border-[#D8C2A5]/50 flex items-center justify-between text-[11px] uppercase tracking-[0.15em] text-[#654B39]/80 font-medium">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#B99A62]" /> Hand Zardozi
              </span>
              <span>•</span>
              <span>Pure Raw Silks</span>
              <span>•</span>
              <span>Bespoke Fit</span>
            </div>

          </div>

          {/* Image Column (55%) */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Refined double border frame accent */}
              <div className="absolute -inset-2.5 border border-[#B99A62]/30 rounded-[3px] pointer-events-none hidden sm:block"></div>
              
              {/* Main Editorial Image Container */}
              <div className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-[2px] shadow-[0_12px_36px_rgba(59,42,32,0.12)] bg-[#F3E8DA]">
                <img
                  src={currentHeroImage}
                  alt="MOONLIT CLOSET Couture"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700 ease-out"
                />
                
                {/* Subtle soft gradient scrim at the bottom edge */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#3B2A20]/30 via-transparent to-transparent pointer-events-none"></div>

                {/* Floating Micro Tag */}
                <div className="absolute bottom-5 left-5 right-5 sm:right-auto bg-[#F8F1E7]/90 backdrop-blur-sm border border-[#D8C2A5]/80 py-2.5 px-4 rounded-[2px] shadow-sm flex items-center justify-between sm:gap-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-[#654B39]">Signature Look</p>
                    <p className="font-serif text-sm text-[#3B2A20] font-medium">The Zarina Peshwas</p>
                  </div>
                  <span className="text-[11px] font-sans text-[#B99A62] font-semibold tracking-wider">
                    Haute Couture
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
