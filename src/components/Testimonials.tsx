import React from 'react';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/content';

export const Testimonials: React.FC = () => {
  return (
    <section 
      id="testimonials-section" 
      className="py-16 sm:py-24 bg-[#FFFDF9] border-b border-[#D8C2A5]/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
          <span className="text-[11px] uppercase tracking-[0.3em] font-medium text-[#B99A62] block mb-2">
            Real Brides & Celebrations
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#3B2A20] font-normal tracking-tight mb-3">
            Loved by Women Who Celebrate Beautifully
          </h2>
          <div className="w-12 h-[1px] bg-[#B99A62] mx-auto mb-4"></div>
          <p className="text-[#654B39] text-sm sm:text-base font-light leading-relaxed">
            Heartfelt reflections from brides across Pakistan and beyond who wore MOONLIT CLOSET on their landmark days.
          </p>
        </div>

        {/* 3 Editorial Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-[#F8F1E7] border border-[#D8C2A5]/70 p-8 sm:p-10 rounded-[2px] flex flex-col justify-between relative shadow-[0_4px_20px_rgba(59,42,32,0.03)] hover:shadow-md transition-shadow"
            >
              <div>
                {/* Quotation icon accent */}
                <Quote className="w-8 h-8 text-[#B99A62]/40 mb-4 stroke-[1.2]" />

                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-5">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-[#B99A62] text-[#B99A62]"
                    />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="font-serif text-base sm:text-lg text-[#3B2A20] italic font-normal leading-relaxed mb-6">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-[#D8C2A5]/50 flex items-center justify-between">
                <div>
                  <p className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-[#3B2A20]">
                    — {t.author}
                  </p>
                  <p className="text-[11px] text-[#654B39]/70 font-light mt-0.5">
                    {t.city}
                  </p>
                </div>
                {t.occasion && (
                  <span className="text-[10px] uppercase tracking-wider text-[#B99A62] bg-[#FFFDF9] border border-[#D8C2A5]/60 px-2 py-0.5 rounded-[1px]">
                    {t.occasion}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
