import React from 'react';
import { Sparkles, Feather, HeartHandshake } from 'lucide-react';
import craftDetailImg from '../assets/images/artisan_craft_detail_1789228889907.jpg';

export const CraftsmanshipSection: React.FC = () => {
  return (
    <section 
      id="craftsmanship-section" 
      className="py-16 sm:py-24 bg-[#E4D1B8]/40 border-b border-[#D8C2A5]/60 relative overflow-hidden"
    >
      {/* Delicate background pattern lines */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#B99A62_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
          <span className="text-[11px] uppercase tracking-[0.3em] font-medium text-[#B99A62] block mb-2">
            The Philosophy
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] text-[#3B2A20] font-normal tracking-tight mb-3">
            Crafted With Intention
          </h2>
          <div className="w-12 h-[1px] bg-[#B99A62] mx-auto mb-4"></div>
          <p className="text-[#654B39] text-sm sm:text-base font-light leading-relaxed">
            Honoring generations of subcontinent couture heritage through meticulous patience and timeless design.
          </p>
        </div>

        {/* 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Feature 1 */}
          <div className="bg-[#FFFDF9]/80 backdrop-blur-xs border border-[#D8C2A5]/70 p-8 rounded-[2px] shadow-[0_4px_20px_rgba(59,42,32,0.03)] flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="w-14 h-14 rounded-full border border-[#B99A62]/60 flex items-center justify-center text-[#3B2A20] mb-6 bg-[#F8F1E7]">
              <Sparkles className="w-6 h-6 stroke-[1.2] text-[#B99A62]" />
            </div>
            <h3 className="font-serif text-xl text-[#3B2A20] font-normal mb-3">
              Intricate Embroidery
            </h3>
            <p className="text-[#654B39] text-sm font-light leading-relaxed">
              Delicate hand-inspired detailing designed to celebrate timeless artistry. From antique tilla to micro-dabka, every motif tells a story.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-[#FFFDF9]/80 backdrop-blur-xs border border-[#D8C2A5]/70 p-8 rounded-[2px] shadow-[0_4px_20px_rgba(59,42,32,0.03)] flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="w-14 h-14 rounded-full border border-[#B99A62]/60 flex items-center justify-center text-[#3B2A20] mb-6 bg-[#F8F1E7]">
              <Feather className="w-6 h-6 stroke-[1.2] text-[#B99A62]" />
            </div>
            <h3 className="font-serif text-xl text-[#3B2A20] font-normal mb-3">
              Premium Fabrics
            </h3>
            <p className="text-[#654B39] text-sm font-light leading-relaxed">
              Thoughtfully selected fabrics chosen for comfort, movement, and elegance — unadulterated 80g raw silks, diaphanous organzas, and pure brocades.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-[#FFFDF9]/80 backdrop-blur-xs border border-[#D8C2A5]/70 p-8 rounded-[2px] shadow-[0_4px_20px_rgba(59,42,32,0.03)] flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="w-14 h-14 rounded-full border border-[#B99A62]/60 flex items-center justify-center text-[#3B2A20] mb-6 bg-[#F8F1E7]">
              <HeartHandshake className="w-6 h-6 stroke-[1.2] text-[#B99A62]" />
            </div>
            <h3 className="font-serif text-xl text-[#3B2A20] font-normal mb-3">
              Made for Moments
            </h3>
            <p className="text-[#654B39] text-sm font-light leading-relaxed">
              Designed to make celebrations feel personal, memorable, and beautifully yours. Created with love to become treasured family heirlooms.
            </p>
          </div>

        </div>

        {/* Atelier Craftsmanship Callout Banner */}
        <div className="mt-12 bg-[#FFFDF9] border border-[#D8C2A5] rounded-[2px] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-[1px] overflow-hidden shrink-0 border border-[#D8C2A5]">
              <img
                src={craftDetailImg}
                alt="Artisan at embroidery loom"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-serif text-lg text-[#3B2A20] font-normal">
                Bespoke Bridal Consultations
              </h4>
              <p className="text-xs text-[#654B39] font-light mt-0.5">
                Schedule a one-on-one virtual or in-person atelier session with our master couturiers.
              </p>
            </div>
          </div>

          <a
            href="#newsletter-section"
            className="px-6 py-2.5 border border-[#3B2A20] text-[#3B2A20] text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-[#3B2A20] hover:text-[#F8F1E7] transition-colors shrink-0"
          >
            Book An Appointment
          </a>
        </div>

      </div>
    </section>
  );
};
