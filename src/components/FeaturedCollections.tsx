import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { FEATURED_COLLECTIONS } from '../data/content';
import { CategoryType } from '../types';

interface FeaturedCollectionsProps {
  onSelectCollection: (category: CategoryType) => void;
}

export const FeaturedCollections: React.FC<FeaturedCollectionsProps> = ({ onSelectCollection }) => {
  return (
    <section 
      id="collections-section" 
      className="py-16 sm:py-24 bg-[#FFFDF9] border-b border-[#D8C2A5]/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-[11px] uppercase tracking-[0.3em] font-medium text-[#B99A62] block mb-2">
            The MOONLIT CLOSET Anthology
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#3B2A20] font-normal tracking-tight mb-3">
            Curated for Your Moment
          </h2>
          <div className="w-12 h-[1px] bg-[#B99A62] mx-auto mb-4"></div>
          <p className="text-[#654B39] text-sm sm:text-base font-light leading-relaxed">
            Collections designed to make every celebration feel extraordinary.
          </p>
        </div>

        {/* Collections 3-Card Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {FEATURED_COLLECTIONS.map((col) => (
            <div
              key={col.id}
              id={`collection-card-${col.categoryKey}`}
              onClick={() => onSelectCollection(col.categoryKey)}
              className="group cursor-pointer relative overflow-hidden rounded-[2px] bg-[#F8F1E7] border border-[#D8C2A5]/50 shadow-[0_4px_20px_rgba(59,42,32,0.04)] hover:shadow-[0_12px_32px_rgba(59,42,32,0.1)] transition-all duration-500"
            >
              {/* Image Container with portrait ratio */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#F3E8DA]">
                <img
                  src={col.image}
                  alt={`MOONLIT CLOSET ${col.title} Collection`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                />

                {/* Darkening & warm vignette overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#3B2A20]/80 via-[#3B2A20]/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-500"></div>

                {/* Micro Category Tag */}
                <div className="absolute top-4 left-4">
                  <span className="bg-[#F8F1E7]/90 text-[#3B2A20] text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 font-medium rounded-[1px] shadow-sm">
                    {col.tag}
                  </span>
                </div>

                {/* Floating Content at bottom */}
                <div className="absolute bottom-0 inset-x-0 p-6 sm:p-7 flex flex-col justify-end transform transition-transform duration-500 group-hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-2xl sm:text-3xl text-[#FFFDF9] font-normal tracking-wide">
                        {col.title}
                      </h3>
                      <p className="text-xs text-[#E4D1B8] font-light mt-1 max-w-[85%] leading-snug">
                        {col.subtitle}
                      </p>
                    </div>

                    {/* Arrow Action Badge */}
                    <div className="w-10 h-10 rounded-full border border-[#FFFDF9]/40 flex items-center justify-center text-[#FFFDF9] bg-[#3B2A20]/30 backdrop-blur-sm group-hover:bg-[#B99A62] group-hover:border-[#B99A62] transition-all duration-300 shrink-0 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <ArrowUpRight className="w-4 h-4 stroke-[1.8]" />
                    </div>
                  </div>

                  {/* Refined line reveal on hover */}
                  <div className="w-0 group-hover:w-full h-[1px] bg-[#B99A62] mt-4 transition-all duration-500"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
