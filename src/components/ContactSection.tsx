import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Instagram, 
  Sparkles 
} from 'lucide-react';
import { SiteContent } from '../types';

interface ContactSectionProps {
  content: SiteContent['contact'];
  brandName: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ content, brandName }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    interest: 'bridal',
    eventDate: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Format full inquiry message and launch direct WhatsApp chat to the owner
    const rawDigits = (content?.whatsapp || '+1 716-313-1615').replace(/[^0-9]/g, '');
    const cleanNumber = rawDigits.length === 10 && !rawDigits.startsWith('1') ? `1${rawDigits}` : rawDigits || '17163131615';
    
    const inquiryMessage = 
      `*New Atelier Inquiry for ${brandName}*\n\n` +
      `• *Client Name:* ${formData.fullName}\n` +
      `• *Phone / WhatsApp:* ${formData.phone}\n` +
      (formData.email ? `• *Email:* ${formData.email}\n` : '') +
      `• *Collection Interest:* ${formData.interest.toUpperCase()}\n` +
      (formData.eventDate ? `• *Event Date:* ${formData.eventDate}\n` : '') +
      (formData.notes ? `• *Notes / Requirements:* ${formData.notes}\n` : '');

    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(inquiryMessage)}`;
    try {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.warn('Could not open window:', err);
    }
  };

  const rawDigits = (content?.whatsapp || '+1 716-313-1615').replace(/[^0-9]/g, '');
  const cleanWhatsAppNumber = rawDigits.length === 10 && !rawDigits.startsWith('1') ? `1${rawDigits}` : rawDigits || '17163131615';

  return (
    <section id="contact-section" className="py-20 sm:py-28 bg-[#F8F1E7] border-t border-[#D8C2A5]/60 relative overflow-hidden">
      {/* Subtle Background Ornamentation */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D8C2A5]/15 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#B99A62]/10 rounded-full blur-2xl pointer-events-none -ml-24 -mb-24" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-[#B99A62]" />
            <span className="text-[11px] uppercase tracking-[0.28em] font-medium text-[#B99A62]">
              {content.eyebrow || 'Private Atelier & Bridal Concierge'}
            </span>
            <span className="w-6 h-[1px] bg-[#B99A62]" />
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#3B2A20] font-normal tracking-tight">
            {content.title || `Contact ${brandName}`}
          </h2>
          
          <p className="mt-4 text-[#654B39] text-sm sm:text-base font-light leading-relaxed">
            {content.description || 'Whether commissioning bespoke bridal couture or selecting tailored festive party wear, our dedicated concierges and master couturiers are at your service.'}
          </p>
        </div>

        {/* Content Grid: Left Details & Right Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Contact Cards & Studio Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Atelier Address Card */}
            <div className="p-6 bg-[#FFFDF9] border border-[#D8C2A5] rounded-[2px] shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-[1px] bg-[#F3E8DA] flex items-center justify-center text-[#B99A62] shrink-0">
                  <MapPin className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="font-serif text-base text-[#3B2A20] font-medium">
                    Atelier Studio
                  </h4>
                  <p className="mt-1 text-xs text-[#654B39] leading-relaxed">
                    {content.address}
                  </p>
                  <span className="inline-block mt-2 text-[10px] uppercase tracking-wider text-[#B99A62] font-semibold">
                    Private Consultations by Appointment
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Phone & WhatsApp Card */}
            <div className="p-6 bg-[#FFFDF9] border border-[#D8C2A5] rounded-[2px] shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-[1px] bg-[#F3E8DA] flex items-center justify-center text-[#B99A62] shrink-0">
                  <Phone className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div className="flex-1">
                  <h4 className="font-serif text-base text-[#3B2A20] font-medium">
                    Direct Phone & WhatsApp
                  </h4>
                  <div className="mt-1 space-y-1">
                    <p className="text-xs text-[#654B39]">
                      <span className="font-medium text-[#3B2A20]">Phone:</span>{' '}
                      <a href={`tel:${content.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-[#B99A62] transition-colors underline">
                        {content.phone}
                      </a>
                    </p>
                    {content.whatsapp && (
                      <p className="text-xs text-[#654B39]">
                        <span className="font-medium text-[#3B2A20]">WhatsApp:</span>{' '}
                        <a 
                          href={`https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent('Hello MOONLIT CLOSET, I would like to inquire about your collections.')}`}
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="hover:text-[#B99A62] transition-colors underline"
                        >
                          {content.whatsapp}
                        </a>
                      </p>
                    )}
                  </div>
                  <a
                    href={`https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent('Hello MOONLIT CLOSET Atelier, I would like to book a bespoke consultation.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 text-xs uppercase tracking-wider text-[#3B2A20] hover:text-[#B99A62] font-medium"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#B99A62]" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Email & Instagram Card */}
            <div className="p-6 bg-[#FFFDF9] border border-[#D8C2A5] rounded-[2px] shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-[1px] bg-[#F3E8DA] flex items-center justify-center text-[#B99A62] shrink-0">
                  <Mail className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="font-serif text-base text-[#3B2A20] font-medium">
                    Concierge & Socials
                  </h4>
                  <p className="mt-1 text-xs text-[#654B39]">
                    <span className="font-medium text-[#3B2A20]">Email:</span>{' '}
                    <a href={`mailto:${content.email}`} className="hover:text-[#B99A62] underline">
                      {content.email}
                    </a>
                  </p>
                  {content.instagram && (
                    <p className="mt-1 text-xs text-[#654B39]">
                      <span className="font-medium text-[#3B2A20]">Instagram:</span>{' '}
                      <span className="text-[#3B2A20] font-mono">{content.instagram}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Timings & Atelier Note */}
            <div className="p-5 bg-[#F3E8DA]/70 border border-[#D8C2A5] rounded-[2px]">
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#B99A62] shrink-0 mt-0.5" />
                <div className="text-xs text-[#654B39] space-y-1">
                  <p className="font-medium text-[#3B2A20]">
                    {content.timings || 'Monday – Saturday: 11:00 AM – 8:00 PM (PKT)'}
                  </p>
                  <p className="text-[11px] text-[#654B39]/90 font-light">
                    {content.consultationNote || 'Private bridal trials and bespoke measurement appointments are scheduled on an individual basis.'}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Appointment & Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 bg-[#FFFDF9] border border-[#D8C2A5] rounded-[2px] shadow-sm">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#D8C2A5]">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] font-medium text-[#B99A62]">
                    Concierge Desk
                  </span>
                  <h3 className="font-serif text-2xl text-[#3B2A20] mt-0.5">
                    Request an Appointment or Custom Quote
                  </h3>
                </div>
                <Sparkles className="w-5 h-5 text-[#B99A62]" />
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#F3E8DA] flex items-center justify-center text-[#B99A62]">
                    <CheckCircle2 className="w-8 h-8 stroke-[1.5]" />
                  </div>
                  <h4 className="font-serif text-2xl text-[#3B2A20]">
                    Inquiry Received
                  </h4>
                  <p className="text-xs sm:text-sm text-[#654B39] max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-medium text-[#3B2A20]">{formData.fullName}</span>. Your inquiry details have been formatted for our WhatsApp concierge.
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={`https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent(
                        `*New Atelier Inquiry for ${brandName}*\n\n` +
                        `• *Client Name:* ${formData.fullName}\n` +
                        `• *Phone / WhatsApp:* ${formData.phone}\n` +
                        (formData.email ? `• *Email:* ${formData.email}\n` : '') +
                        `• *Collection Interest:* ${formData.interest.toUpperCase()}\n` +
                        (formData.eventDate ? `• *Event Date:* ${formData.eventDate}\n` : '') +
                        (formData.notes ? `• *Notes / Requirements:* ${formData.notes}\n` : '')
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#3B2A20] text-[#FFFDF9] text-xs uppercase tracking-wider rounded-[1px] hover:bg-[#523B2D] transition-colors shadow-sm"
                    >
                      <MessageSquare className="w-4 h-4 text-[#B99A62]" />
                      <span>Open WhatsApp Chat Now</span>
                    </a>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          fullName: '',
                          phone: '',
                          email: '',
                          interest: 'bridal',
                          eventDate: '',
                          notes: '',
                        });
                      }}
                      className="px-5 py-2.5 border border-[#3B2A20] text-xs uppercase tracking-wider text-[#3B2A20] hover:bg-[#3B2A20] hover:text-[#FFFDF9] transition-colors rounded-[1px]"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.16em] font-medium text-[#3B2A20] mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your Full Name"
                        value={formData.fullName || ''}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#FFFDF9] border border-[#D8C2A5] text-[#3B2A20] text-xs rounded-[1px] focus:outline-none focus:border-[#B99A62]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.16em] font-medium text-[#3B2A20] mb-1.5">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 716 313 1615"
                        value={formData.phone || ''}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#FFFDF9] border border-[#D8C2A5] text-[#3B2A20] text-xs rounded-[1px] focus:outline-none focus:border-[#B99A62]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.16em] font-medium text-[#3B2A20] mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="moonlitgemjewels@gmail.com"
                        value={formData.email || ''}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#FFFDF9] border border-[#D8C2A5] text-[#3B2A20] text-xs rounded-[1px] focus:outline-none focus:border-[#B99A62]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.16em] font-medium text-[#3B2A20] mb-1.5">
                        Interested Collection *
                      </label>
                      <select
                        value={formData.interest}
                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#FFFDF9] border border-[#D8C2A5] text-[#3B2A20] text-xs rounded-[1px] focus:outline-none focus:border-[#B99A62]"
                      >
                        <option value="bridal">1) Bridal Collection Consultation</option>
                        <option value="party-wear">2) Party Wear & Luxury Pret</option>
                        <option value="custom">Bespoke Custom Silhouette</option>
                        <option value="studio-visit">In-Person Atelier Visit (Lahore)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.16em] font-medium text-[#3B2A20] mb-1.5">
                      Approximate Wedding / Event Date
                    </label>
                    <input
                      type="date"
                      value={formData.eventDate || ''}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FFFDF9] border border-[#D8C2A5] text-[#3B2A20] text-xs rounded-[1px] focus:outline-none focus:border-[#B99A62]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.16em] font-medium text-[#3B2A20] mb-1.5">
                      Specific Inquiries or Measurements Notes
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about the desired color palette, silhouette, or any custom embroidery requirements..."
                      value={formData.notes || ''}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FFFDF9] border border-[#D8C2A5] text-[#3B2A20] text-xs rounded-[1px] focus:outline-none focus:border-[#B99A62] resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      id="contact-form-submit-btn"
                      className="w-full py-3.5 bg-[#3B2A20] text-[#F8F1E7] text-xs uppercase tracking-[0.2em] font-medium rounded-[1px] hover:bg-[#523B2D] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                    >
                      <Send className="w-3.5 h-3.5 text-[#B99A62]" />
                      <span>Send Consultation Inquiry</span>
                    </button>
                    <p className="text-center text-[10px] text-[#654B39] mt-2">
                      Our concierge respects your privacy. Inquiries are handled with utmost discretion.
                    </p>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
