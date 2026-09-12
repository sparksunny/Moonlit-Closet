import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { OCCASIONS } from '../data/content';
import { OccasionType } from '../types';

interface OccasionGuideProps {
  onSelectOccasion: (occ: OccasionType) => void;
}

export const OccasionGuide: React.FC<OccasionGuideProps> = ({ onSelectOccasion }) => {
  return (
    <section 
      id="occasions-section" 
      className="py-16 sm:py-24 bg-[#F8F1E7] border-b border-[#D8C2A5]/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#B99A62]" />
            <span className="text-[11px] uppercase tracking-[0.3em] font-medium text-[#B99A62]">
              Wedding Festivities
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#3B2A20] font-normal tracking-tight mb-3">
            Find Your Perfect Look
          </h2>
          <div className="w-12 h-[1px] bg-[#B99A62] mx-auto mb-4"></div>
          <p className="text-[#654B39] text-sm sm:text-base font-light leading-relaxed">
            Curated silhouettes tailored to each sacred celebration in the Pakistani wedding journey.
          </p>
        </div>

        {/* 4 Occasions Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {OCCASIONS.map((occ) => (
            <div
              key={occ.id}
              id={`occasion-card-${occ.filterKey}`}
              onClick={() => onSelectOccasion(occ.filterKey)}
              className="group cursor-pointer flex flex-col bg-[#FFFDF9] border border-[#D8C2A5]/60 rounded-[2px] overflow-hidden shadow-xs hover:shadow-[0_10px_30px_rgba(59,42,32,0.08)] transition-all duration-500"
            >
              {/* Image Container with portrait ratio */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#F3E8DA]">
                <img
                  src={occ.image}
                  alt={`MOONLIT CLOSET ${occ.title} Bridal Look`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform group-hover:scale-104 transition-transform duration-700 ease-out"
                />

                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#3B2A20]/60 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity"></div>

                {/* Micro Occasion Tag */}
                <div className="absolute top-3 left-3">
                  <span className="bg-[#FFFDF9]/90 backdrop-blur-xs text-[#3B2A20] text-[9px] uppercase tracking-[0.2em] font-medium px-2.5 py-1 rounded-[1px]">
                    {occ.subtitle}
                  </span>
                </div>
              </div>

              {/* Text Block Below */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl text-[#3B2A20] font-normal mb-1 group-hover:text-[#B99A62] transition-colors">
                    {occ.title}
                  </h3>
                  <p className="text-xs text-[#654B39] font-light leading-relaxed mb-4">
                    {occ.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#D8C2A5]/30 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] font-medium text-[#3B2A20] group-hover:text-[#B99A62] transition-colors">
                  <span>EXPLORE OCCASION EDIT</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
