import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CategoryType, SiteContent } from '../types';

interface FeaturedCollectionsProps {
  onSelectCollection: (category: CategoryType) => void;
  content?: SiteContent['featuredCollections'];
}

export const FeaturedCollections: React.FC<FeaturedCollectionsProps> = ({ onSelectCollection, content }) => {
  const collections = [
    {
      id: 'col-bridal',
      title: content?.bridalTitle || 'BRIDAL COLLECTION',
      subtitle: content?.bridalSubtitle || 'Heirloom silhouettes with regal tilla, vasli & pearl embroidery',
      tag: content?.bridalTag || 'Haute Couture',
      image: content?.bridalImage,
      categoryKey: 'bridal' as CategoryType,
    },
    {
      id: 'col-party-wear',
      title: content?.partyWearTitle || 'PARTY WEAR',
      subtitle: content?.partyWearSubtitle || 'Understated elegance in sheer organza, plush velvet, and embellished raw silk',
      tag: content?.partyWearTag || 'Festive & Luxury Pret',
      image: content?.partyWearImage,
      categoryKey: 'party-wear' as CategoryType,
    },
  ];

  return (
    <section 
      id="collections-section" 
      className="py-16 sm:py-24 bg-[#FFFDF9] border-b border-[#D8C2A5]/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-[11px] uppercase tracking-[0.3em] font-medium text-[#B99A62] block mb-2">
            {content?.eyebrow || 'The MOONLIT CLOSET Anthology'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#3B2A20] font-normal tracking-tight mb-3">
            {content?.title || 'Curated for Your Moment'}
          </h2>
          <div className="w-12 h-[1px] bg-[#B99A62] mx-auto mb-4"></div>
          <p className="text-[#654B39] text-sm sm:text-base font-light leading-relaxed">
            {content?.description || 'Two iconic collections tailored for wedding ceremonies and luxury evening celebrations.'}
          </p>
        </div>

        {/* Collections 2-Card Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {collections.map((col) => (
            <div
              key={col.id}
              id={`collection-card-${col.categoryKey}`}
              onClick={() => onSelectCollection(col.categoryKey)}
              className="group cursor-pointer relative overflow-hidden rounded-[2px] bg-[#F8F1E7] border border-[#D8C2A5]/50 shadow-[0_4px_20px_rgba(59,42,32,0.04)] hover:shadow-[0_12px_32px_rgba(59,42,32,0.1)] transition-all duration-500"
            >
              {/* Image Container with portrait ratio */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#F3E8DA]">
                {col.image && (
                  <img
                    src={col.image}
                    alt={`MOONLIT CLOSET ${col.title}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transform group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  />
                )}

                {/* Darkening & warm vignette overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#3B2A20]/80 via-[#3B2A20]/25 to-transparent opacity-65 group-hover:opacity-85 transition-opacity duration-500"></div>

                {/* Micro Category Tag */}
                <div className="absolute top-5 left-5">
                  <span className="bg-[#F8F1E7]/95 text-[#3B2A20] text-[10px] uppercase tracking-[0.25em] px-3 py-1 font-semibold rounded-[1px] shadow-sm">
                    {col.tag}
                  </span>
                </div>

                {/* Floating Content at bottom */}
                <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 flex flex-col justify-end transform transition-transform duration-500 group-hover:-translate-y-1">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-2xl sm:text-3xl text-[#FFFDF9] font-normal tracking-wide">
                        {col.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#E4D1B8] font-light mt-1.5 leading-snug">
                        {col.subtitle}
                      </p>
                    </div>

                    {/* Arrow Action Badge */}
                    <div className="w-11 h-11 rounded-full border border-[#FFFDF9]/40 flex items-center justify-center text-[#FFFDF9] bg-[#3B2A20]/30 backdrop-blur-sm group-hover:bg-[#B99A62] group-hover:border-[#B99A62] transition-all duration-300 shrink-0 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <ArrowUpRight className="w-5 h-5 stroke-[1.8]" />
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
