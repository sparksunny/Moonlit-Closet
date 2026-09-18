import React, { useState } from 'react';
import { X, Calendar, Sparkles, Check } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    weddingDate: '',
    serviceType: 'bridal_couture',
    location: 'lahore_salon',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const msg = `*New Bridal Consultation Request*\n` +
      `• Name: ${formData.name}\n` +
      `• Phone/WhatsApp: ${formData.phone}\n` +
      (formData.weddingDate ? `• Wedding/Event Date: ${formData.weddingDate}\n` : '') +
      `• Type: ${formData.location}`;

    try {
      window.open(`https://wa.me/17163131615?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      <div className="fixed inset-0 bg-[#3B2A20]/60 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-[#FFFDF9] border border-[#D8C2A5] rounded-[2px] shadow-2xl overflow-hidden z-10 my-8">
        <div className="p-6 border-b border-[#D8C2A5]/60 flex items-center justify-between bg-[#F8F1E7]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#B99A62]" />
            <h2 className="font-serif text-xl text-[#3B2A20]">Bespoke Bridal Consultation</h2>
          </div>
          <button onClick={onClose} className="p-1 text-[#3B2A20] hover:text-[#B99A62]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-[#E4D1B8] flex items-center justify-center mx-auto mb-4 text-[#B99A62]">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-[#3B2A20] mb-2">Appointment Requested</h3>
            <p className="text-xs text-[#654B39] font-light leading-relaxed mb-6">
              Thank you, {formData.name}. Our senior bridal stylist will contact your WhatsApp ({formData.phone}) within 12 hours to confirm your private salon or video consultation.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#3B2A20] text-white text-xs uppercase tracking-widest"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-[11px] text-[#654B39] uppercase tracking-wider mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Client Name"
                className="w-full bg-[#F8F1E7] border border-[#D8C2A5] p-2 text-xs text-[#3B2A20] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-[#654B39] uppercase tracking-wider mb-1">
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 716 313 1615"
                  className="w-full bg-[#F8F1E7] border border-[#D8C2A5] p-2 text-xs text-[#3B2A20] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] text-[#654B39] uppercase tracking-wider mb-1">
                  Wedding / Event Date
                </label>
                <input
                  type="date"
                  value={formData.weddingDate || ''}
                  onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                  className="w-full bg-[#F8F1E7] border border-[#D8C2A5] p-2 text-xs text-[#3B2A20] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-[#654B39] uppercase tracking-wider mb-1">
                Consultation Type
              </label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-[#F8F1E7] border border-[#D8C2A5] p-2 text-xs text-[#3B2A20] focus:outline-none"
              >
                <option value="lahore_salon">Lahore Atelier (M.M. Alam Road)</option>
                <option value="islamabad_salon">Islamabad Studio (F-7)</option>
                <option value="virtual_intl">Worldwide Virtual Video Consultation</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#3B2A20] text-white text-xs uppercase tracking-[0.25em] font-medium hover:bg-[#4D372A] transition-colors mt-4 cursor-pointer"
            >
              Request Private Consultation
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
