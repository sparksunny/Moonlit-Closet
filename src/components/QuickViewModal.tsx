import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Check, Clock, Sparkles, MessageCircle, ShieldCheck } from 'lucide-react';
import { Product } from '../types';
import { Currency, formatPrice } from '../utils/formatters';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, size: string, quantity: number, notes?: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  currency,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
}) => {
  if (!isOpen || !product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'S');
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [quantity, setQuantity] = useState<number>(1);
  const [customNotes, setCustomNotes] = useState<string>('');
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);

  const handleAdd = () => {
    onAddToCart(product, selectedSize, quantity, customNotes);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 800);
  };

  const images = [product.image, product.secondaryImage].filter(Boolean) as string[];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#3B2A20]/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-[#FFFDF9] border border-[#D8C2A5] rounded-[2px] shadow-2xl overflow-hidden z-10 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#FFFDF9]/90 border border-[#D8C2A5] flex items-center justify-center text-[#3B2A20] hover:text-[#B99A62] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 max-h-[88vh] overflow-y-auto">
          
          {/* Left: Image Gallery (5 cols) */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col bg-[#F8F1E7]/40">
            {/* Main Displayed Image */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-[2px] border border-[#D8C2A5]/70 shadow-sm bg-[#F3E8DA] mb-4">
              <img
                src={selectedImage}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-[#3B2A20] text-[#F8F1E7] text-[9px] uppercase tracking-[0.2em] font-medium px-2 py-0.5 rounded-[1px]">
                  {product.categoryLabel}
                </span>
              </div>
            </div>

            {/* Thumbnail Selection */}
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-20 rounded-[1px] overflow-hidden border-2 transition-colors ${
                      selectedImage === img ? 'border-[#3B2A20]' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt="Thumbnail view"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details & Purchase Form (7 cols) */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Category & Color */}
              <div className="flex items-center justify-between text-xs text-[#654B39] mb-1.5">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#B99A62] font-semibold">
                  {product.categoryLabel}
                </span>
                <span className="capitalize">{product.colorName}</span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-2xl sm:text-3xl text-[#3B2A20] font-normal leading-tight mb-2">
                {product.name}
              </h2>

              {/* Price */}
              <p className="font-sans text-xl font-medium text-[#3B2A20] mb-4">
                {formatPrice(product.pricePKR, currency)}
              </p>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#654B39] font-light leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Specs Chips */}
              <div className="space-y-2 py-3 border-y border-[#D8C2A5]/50 mb-6 text-xs text-[#654B39]">
                <div className="flex justify-between">
                  <span className="font-medium text-[#3B2A20]">Fabric:</span>
                  <span>{product.fabric}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-[#3B2A20]">Artisanship:</span>
                  <span>{product.workType}</span>
                </div>
                <div className="flex justify-between items-center text-[#B99A62]">
                  <span className="flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5" /> Dispatch Time:
                  </span>
                  <span>{product.deliveryTime}</span>
                </div>
              </div>

              {/* Size Selector */}
              <div className="mb-5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#3B2A20]">
                    Select Size:
                  </span>
                  <span className="text-[11px] text-[#B99A62] underline cursor-pointer">
                    Size Guide
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider rounded-[1px] transition-colors border ${
                        selectedSize === sz
                          ? 'border-[#3B2A20] bg-[#3B2A20] text-[#F8F1E7]'
                          : 'border-[#D8C2A5] text-[#3B2A20] hover:border-[#B99A62]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Made-to-measure note if chosen */}
              {selectedSize.includes('Custom') && (
                <div className="mb-5 p-3 bg-[#F8F1E7] border border-[#D8C2A5] rounded-[1px]">
                  <p className="text-[11px] uppercase tracking-wider text-[#B99A62] font-semibold mb-1">
                    Bespoke Measurements
                  </p>
                  <input
                    type="text"
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    placeholder="Enter bust, waist, hips, height (e.g. 36-28-38, 5'6)"
                    className="w-full text-xs p-2 bg-[#FFFDF9] border border-[#D8C2A5] focus:outline-none"
                  />
                </div>
              )}

              {/* Quantity */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs uppercase tracking-wider text-[#654B39]">Quantity:</span>
                <div className="flex items-center border border-[#D8C2A5] bg-[#F8F1E7]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2.5 py-1 text-xs text-[#3B2A20] hover:text-[#B99A62]"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-medium text-[#3B2A20]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2.5 py-1 text-xs text-[#3B2A20] hover:text-[#B99A62]"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-[#D8C2A5]/50">
              <div className="flex gap-3">
                <button
                  id="modal-add-to-bag-btn"
                  onClick={handleAdd}
                  disabled={addedAnimation}
                  className={`flex-1 py-3.5 text-xs uppercase tracking-[0.25em] font-medium rounded-[2px] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                    addedAnimation
                      ? 'bg-[#B99A62] text-white'
                      : 'bg-[#3B2A20] hover:bg-[#4D372A] text-[#F8F1E7]'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`w-12 h-12 rounded-[2px] border flex items-center justify-center transition-colors cursor-pointer ${
                    isWishlisted
                      ? 'border-[#B99A62] bg-[#B99A62]/10 text-[#B99A62]'
                      : 'border-[#D8C2A5] text-[#3B2A20] hover:border-[#B99A62]'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#B99A62]' : ''}`} />
                </button>
              </div>

              {/* Direct Atelier WhatsApp Inquiry */}
              <a
                href={`https://wa.me/923008459123?text=Hello%20MOONLIT%20CLOSET,%20I%20would%20like%20to%20inquire%20about%20the%20${encodeURIComponent(product.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-[#F8F1E7] hover:bg-[#E4D1B8]/70 border border-[#D8C2A5] text-[#3B2A20] text-[11px] uppercase tracking-[0.2em] font-medium rounded-[2px] flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>Inquire with Bridal Concierge on WhatsApp</span>
              </a>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#654B39]/80 uppercase tracking-widest pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B99A62]" />
                <span>100% Authentic Fabric & Hand Embroidered</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
