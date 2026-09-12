import React from 'react';
import { Instagram, Heart } from 'lucide-react';
import { SOCIAL_GALLERY } from '../data/content';

export const InstagramGallery: React.FC = () => {
  return (
    <section 
      id="social-gallery-section" 
      className="py-16 sm:py-24 bg-[#F8F1E7] border-b border-[#D8C2A5]/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-2">
            <Instagram className="w-4 h-4 text-[#B99A62]" />
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] uppercase tracking-[0.3em] font-medium text-[#B99A62] hover:underline"
            >
              @MOONLITCLOSET
            </a>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#3B2A20] font-normal tracking-tight mb-3">
            Follow the MOONLIT CLOSET Edit
          </h2>
          <div className="w-12 h-[1px] bg-[#B99A62] mx-auto mb-4"></div>
          <p className="text-[#654B39] text-sm sm:text-base font-light leading-relaxed">
            Bridal inspiration, craftsmanship, and moments worth remembering.
          </p>
        </div>

        {/* 6 Square Images Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {SOCIAL_GALLERY.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square overflow-hidden rounded-[2px] bg-[#F3E8DA] border border-[#D8C2A5]/50 cursor-pointer"
            >
              <img
                src={post.image}
                alt="MOONLIT CLOSET Instagram fashion journal"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform group-hover:scale-108 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Dark Hover Overlay with likes and caption */}
              <div className="absolute inset-0 bg-[#3B2A20]/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3 sm:p-4 text-white">
                <div className="flex justify-end">
                  <Instagram className="w-4 h-4 text-[#E4D1B8]" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-[11px] text-[#F8F1E7] font-light line-clamp-3 leading-snug">
                    {post.caption}
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-[10px] text-[#E4D1B8]">
                    <Heart className="w-3 h-3 fill-[#E4D1B8]" />
                    <span>{post.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
