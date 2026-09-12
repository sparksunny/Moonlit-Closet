import React from 'react';
import { Instagram, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { CategoryType } from '../types';

interface FooterProps {
  onNavigateCategory: (cat: CategoryType) => void;
  onOpenConsultationModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateCategory, onOpenConsultationModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#3B2A20] text-[#F8F1E7] pt-16 pb-10 border-t border-[#4D372A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Branding & Wordmark Row */}
        <div className="pb-12 border-b border-[#523B2D] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.24em] uppercase text-[#F8F1E7] block">
              MOONLIT CLOSET
            </span>
            <p className="text-xs text-[#E4D1B8]/80 tracking-[0.25em] uppercase font-light mt-1">
              Timeless Bridal Elegance • Crafted for moments that become memories.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#E4D1B8] hover:text-white transition-colors py-2 px-3 border border-[#523B2D] rounded-[1px]"
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Main Columns Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-[#523B2D]">
          
          {/* Column 1: SHOP */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.25em] font-medium text-[#B99A62] mb-4">
              SHOP
            </h4>
            <ul className="space-y-2.5 text-xs text-[#E4D1B8]/80 font-light">
              <li>
                <button
                  onClick={() => onNavigateCategory('bridal')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Bridal Couture
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateCategory('pret')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Luxury Pret
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateCategory('formal')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Formal Wear
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateCategory('wedding-guest')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Wedding Guest
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateCategory('accessories')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Bridal Accessories & Jewels
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: ABOUT */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.25em] font-medium text-[#B99A62] mb-4">
              ABOUT MOONLIT CLOSET
            </h4>
            <ul className="space-y-2.5 text-xs text-[#E4D1B8]/80 font-light">
              <li>
                <a href="#bridal-editorial-section" className="hover:text-white transition-colors">
                  Our Story & Heritage
                </a>
              </li>
              <li>
                <a href="#craftsmanship-section" className="hover:text-white transition-colors">
                  The Art of Craftsmanship
                </a>
              </li>
              <li>
                <a href="#testimonials-section" className="hover:text-white transition-colors">
                  Real MOONLIT CLOSET Brides
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenConsultationModal}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Bespoke Consultation
                </button>
              </li>
              <li>
                <a href="#social-gallery-section" className="hover:text-white transition-colors">
                  The Editorial Journal
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: CUSTOMER CARE */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.25em] font-medium text-[#B99A62] mb-4">
              CUSTOMER CARE
            </h4>
            <ul className="space-y-2.5 text-xs text-[#E4D1B8]/80 font-light">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Shipping & Delivery
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Custom Sizing & Made-to-Measure
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Returns & Exchanges Policy
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Frequently Asked Questions
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Bridal Care Guide
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: CONTACT */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.25em] font-medium text-[#B99A62] mb-4">
              ATELIER SALON
            </h4>
            <div className="space-y-3 text-xs text-[#E4D1B8]/80 font-light">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#B99A62] shrink-0 mt-0.5" />
                <span>Gulberg III, M.M. Alam Road, Lahore, Pakistan</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#B99A62] shrink-0" />
                <span>+92 (42) 3571-0980 / WhatsApp</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#B99A62] shrink-0" />
                <span>concierge@moonlitcloset.com</span>
              </p>
              <p className="flex items-center gap-2 pt-2 text-[#E4D1B8]">
                <Instagram className="w-3.5 h-3.5 text-[#B99A62] shrink-0" />
                <span>@moonlitcloset</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Row: Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#E4D1B8]/60 font-light gap-4">
          <p>© 2026 MOONLIT CLOSET Couture. All Rights Reserved.</p>
          
          <div className="flex items-center space-x-6">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms & Conditions</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Shipping Policy</span>
          </div>

          <p className="text-[10px] text-[#B99A62]/80 uppercase tracking-wider">
            Hostinger Ready • Production Build
          </p>
        </div>

      </div>
    </footer>
  );
};
