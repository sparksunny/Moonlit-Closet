import React from 'react';
import { 
  Mail, 
  MessageCircle, 
  MapPin, 
  Clock, 
  ArrowUp, 
  Sparkles, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { CategoryType, SiteContent } from '../types';

interface FooterProps {
  onNavigateCategory: (cat: CategoryType) => void;
  onOpenConsultationModal: () => void;
  onNavigateSection?: (sectionId: string, filterCategory?: string) => void;
  content?: SiteContent;
  onOpenAdmin?: () => void; // Kept optional in props to avoid breakage, but intentionally unrendered in footer
}

export const Footer: React.FC<FooterProps> = ({ 
  onNavigateCategory, 
  onOpenConsultationModal,
  onNavigateSection,
  content,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (sectionId: string, cat?: CategoryType) => {
    if (onNavigateSection) {
      onNavigateSection(sectionId, cat);
    } else if (cat) {
      onNavigateCategory(cat);
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const brandName = content?.brandName || 'MOONLIT CLOSET';
  const email = content?.contact?.email || 'moonlitgemjewels@gmail.com';
  const whatsappDisplay = content?.contact?.whatsapp || '+1 716-313-1615';
  const locationText = content?.contact?.address || 'Houston / Florida USA';
  const workingHours = content?.contact?.timings || '10:00 AM – 8:00 PM';

  // WhatsApp international link directly into chat (no direct dialing)
  const whatsAppNumberDigits = whatsappDisplay.replace(/[^0-9]/g, '') || '17163131615';
  // Ensure USA international prefix 1 is present if 10 digits
  const cleanWhatsAppNumber = whatsAppNumberDigits.length === 10 && !whatsAppNumberDigits.startsWith('1')
    ? `1${whatsAppNumberDigits}`
    : whatsAppNumberDigits;

  const whatsAppChatUrl = `https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent(
    'Hello MOONLIT CLOSET Atelier, I would like to inquire about your collections.'
  )}`;

  return (
    <footer 
      id="page-footer" 
      className="bg-[#241812] text-white pt-16 pb-12 border-t-2 border-[#ddd8cf] relative overflow-hidden"
    >
      {/* Target Anchor for Reconnected Header Contact Link */}
      <div id="contact-footer" className="absolute -top-16 left-0 h-0 w-0" />

      {/* Subtle Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#ddd8cf]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Brand Header Section */}
        <div className="pb-12 border-b border-[#ddd8cf]/25 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="text-left">
            {/* Main Heading in tracked, elegant serif typography with crisp white text */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-[0.24em] uppercase text-white font-normal leading-tight">
              {brandName}
            </h2>
            {/* Subheading in refined italic styling styled in color #ddd8cf */}
            <p className="italic text-[#ddd8cf] font-light text-sm sm:text-base tracking-wide mt-2">
              • Crafted for moments that become memories.
            </p>
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#ddd8cf] hover:text-white transition-all py-2.5 px-4 border border-[#ddd8cf]/40 hover:border-[#ddd8cf] rounded-[1px] bg-[#ddd8cf]/5 hover:bg-[#ddd8cf]/15 cursor-pointer"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 stroke-[1.75]" />
            </button>
          </div>
        </div>

        {/* 3 Main Content Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 py-12 border-b border-[#ddd8cf]/25">
          
          {/* Column 1: Brand Introduction & Essence (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#ddd8cf]" />
              <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-[#ddd8cf]">
                Haute Couture Atelier
              </span>
            </div>
            <p className="text-xs text-[#ddd8cf]/90 font-light leading-relaxed">
              At {brandName}, each ensemble represents a harmonious synthesis of traditional hand craftsmanship, pure handwoven silks, and delicate embellishments designed to transcend generations.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenConsultationModal}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-white hover:text-[#ddd8cf] py-2 px-3 border-b border-[#ddd8cf]/60 hover:border-white transition-all"
              >
                <span>Book Bespoke Consultation</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Column 2: Quick Catalog Navigation Links (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-xs uppercase tracking-[0.25em] font-semibold text-white pb-1 border-b border-[#ddd8cf]/20">
              Quick Catalog Navigation
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 text-xs font-light">
              <li>
                <button
                  onClick={() => handleNav('catalog-section', 'bridal')}
                  className="text-[#ddd8cf] hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[#ddd8cf]/60 group-hover:bg-white transition-colors" />
                  <span>Bridal Collection</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('catalog-section', 'party-wear')}
                  className="text-[#ddd8cf] hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[#ddd8cf]/60 group-hover:bg-white transition-colors" />
                  <span>Party Wear</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('catalog-section', 'all')}
                  className="text-[#ddd8cf] hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[#ddd8cf]/60 group-hover:bg-white transition-colors" />
                  <span>All Atelier Ensembles</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('craftsmanship-section')}
                  className="text-[#ddd8cf] hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[#ddd8cf]/60 group-hover:bg-white transition-colors" />
                  <span>The Craftsmanship</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('occasions-section')}
                  className="text-[#ddd8cf] hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[#ddd8cf]/60 group-hover:bg-white transition-colors" />
                  <span>Occasion Guide</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenConsultationModal}
                  className="text-[#ddd8cf] hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[#ddd8cf]/60 group-hover:bg-white transition-colors" />
                  <span>Bridal Appointments</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details & Proper Icons (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-xs uppercase tracking-[0.25em] font-semibold text-white pb-1 border-b border-[#ddd8cf]/20">
              Concierge & Atelier Contact
            </h3>
            
            <div className="space-y-3.5 text-xs text-[#ddd8cf]">
              
              {/* Location: Houston / Florida USA with MapPin */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-[1px] bg-[#ddd8cf]/10 border border-[#ddd8cf]/30 flex items-center justify-center text-white shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#ddd8cf] stroke-[1.75]" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-[#ddd8cf]/70">
                    Location
                  </span>
                  <span className="text-white font-medium text-xs">
                    {locationText}
                  </span>
                </div>
              </div>

              {/* Working Hours: 10:00 AM – 8:00 PM with Clock */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-[1px] bg-[#ddd8cf]/10 border border-[#ddd8cf]/30 flex items-center justify-center text-white shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-[#ddd8cf] stroke-[1.75]" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-[#ddd8cf]/70">
                    Working Hours
                  </span>
                  <span className="text-white font-medium text-xs">
                    {workingHours}
                  </span>
                </div>
              </div>

              {/* Email: moonlitgemjewels@gmail.com with dedicated Mail icon and direct email action */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-[1px] bg-[#ddd8cf]/10 border border-[#ddd8cf]/30 flex items-center justify-center text-white shrink-0 mt-0.5">
                  <Mail className="w-4 h-4 text-[#ddd8cf] stroke-[1.75]" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-[#ddd8cf]/70">
                    Direct Email
                  </span>
                  <a 
                    href={`mailto:${email}`}
                    className="text-white hover:text-[#ddd8cf] transition-colors underline font-medium text-xs break-all"
                  >
                    {email}
                  </a>
                </div>
              </div>

              {/* WhatsApp: +1 716-313-1615 with dedicated MessageCircle icon linking directly to WhatsApp chat (no direct dialing) */}
              <div className="flex items-start gap-3 pt-1">
                <div className="w-8 h-8 rounded-[1px] bg-[#ddd8cf]/10 border border-[#ddd8cf]/30 flex items-center justify-center text-white shrink-0 mt-0.5">
                  <MessageCircle className="w-4 h-4 text-[#ddd8cf] stroke-[1.75]" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-[#ddd8cf]/70">
                    WhatsApp Chat
                  </span>
                  <a 
                    href={whatsAppChatUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#ddd8cf] transition-colors font-medium text-xs inline-flex items-center gap-1.5 group"
                    title="Direct WhatsApp Chat (no direct dialing)"
                  >
                    <span>{whatsappDisplay}</span>
                    <span className="text-[10px] uppercase tracking-wider text-[#ddd8cf] bg-[#ddd8cf]/15 px-2 py-0.5 rounded-[1px] group-hover:bg-[#ddd8cf]/30 transition-colors flex items-center gap-1">
                      <span>Chat</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </span>
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Row: Refined Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#ddd8cf]/80 font-light gap-4">
          <p className="text-white">
            © {new Date().getFullYear()} {brandName} Couture. All Rights Reserved.
          </p>
          
          <div className="flex items-center space-x-5 text-xs text-[#ddd8cf]">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Protocol</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Bespoke Terms</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Global Courier</span>
          </div>

          <p className="text-[10px] text-[#ddd8cf]/60 uppercase tracking-widest font-mono">
            Houston • Florida • International
          </p>
        </div>

      </div>
    </footer>
  );
};
