import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { Currency, formatPrice } from '../utils/formatters';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  currency: Currency;
  onSelectProduct: (product: Product) => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isOpen,
  onClose,
  products,
  currency,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const quickTags = [
    'Bridal Collection',
    'Party Wear',
    'Bridal Peshwas',
    'Zardozi',
    'Nikkah',
    'Raw Silk',
    'Velvet',
  ];

  const results = query.trim()
    ? products.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.workType.toLowerCase().includes(q) ||
          p.colorName.toLowerCase().includes(q) ||
          p.occasion.toLowerCase().includes(q)
        );
      })
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Background Overlay */}
      <div
        className="fixed inset-0 bg-[#3B2A20]/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Search Container */}
      <div className="relative max-w-3xl mx-auto mt-12 sm:mt-20 px-4 sm:px-6 z-10">
        <div className="bg-[#FFFDF9] border border-[#D8C2A5] shadow-2xl rounded-[2px] overflow-hidden">
          
          {/* Input Header */}
          <div className="p-4 sm:p-6 border-b border-[#D8C2A5]/60 flex items-center gap-3">
            <Search className="w-5 h-5 text-[#B99A62] shrink-0 stroke-[1.5]" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search bridal, formal, embroidery, silhouettes..."
              className="flex-1 bg-transparent text-sm sm:text-base text-[#3B2A20] placeholder-[#654B39]/50 focus:outline-none font-light"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-xs text-[#654B39] hover:text-[#3B2A20] uppercase tracking-wider"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 text-[#3B2A20] hover:text-[#B99A62] transition-colors ml-1"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Filter Tags */}
          <div className="px-4 sm:px-6 py-3 bg-[#F8F1E7] border-b border-[#D8C2A5]/40 flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-[10px] uppercase tracking-widest text-[#654B39] font-medium shrink-0">
              Popular:
            </span>
            <div className="flex gap-1.5 shrink-0">
              {quickTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-2.5 py-0.5 bg-[#FFFDF9] border border-[#D8C2A5]/80 hover:border-[#B99A62] text-[#3B2A20] rounded-[1px] text-[11px] transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Search Results Area */}
          <div className="max-h-96 overflow-y-auto p-4 sm:p-6 divide-y divide-[#D8C2A5]/30">
            {query.trim() === '' ? (
              <div className="py-10 text-center text-[#654B39]">
                <p className="font-serif text-lg text-[#3B2A20] mb-1">
                  Explore the MOONLIT CLOSET Archive
                </p>
                <p className="text-xs font-light max-w-sm mx-auto">
                  Type a silhouette, occasion (such as Nikkah, Walima), or handcraft technique like Zardozi, Pearls, or Organza.
                </p>
              </div>
            ) : results.length === 0 ? (
              <div className="py-10 text-center text-[#654B39]">
                <p className="font-serif text-lg text-[#3B2A20] mb-1">
                  No matching garments found
                </p>
                <p className="text-xs font-light">
                  Try searching for "bridal", "ivory", "kurta", or "lehenga".
                </p>
              </div>
            ) : (
              <div>
                <p className="text-[11px] uppercase tracking-wider text-[#654B39] font-medium mb-3">
                  Found {results.length} {results.length === 1 ? 'Design' : 'Designs'}
                </p>
                <div className="space-y-3">
                  {results.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                      className="flex items-center gap-4 p-2.5 hover:bg-[#F8F1E7] rounded-[1px] cursor-pointer transition-colors group"
                    >
                      <div className="w-14 h-18 rounded-[1px] overflow-hidden bg-[#F3E8DA] shrink-0 border border-[#D8C2A5]/50">
                        <img
                          src={product.image}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <span className="text-[9px] uppercase tracking-[0.2em] text-[#B99A62] font-semibold">
                          {product.categoryLabel}
                        </span>
                        <h4 className="font-serif text-base text-[#3B2A20] group-hover:text-[#B99A62] transition-colors leading-snug">
                          {product.name}
                        </h4>
                        <p className="text-xs text-[#654B39]/80 font-light line-clamp-1">
                          {product.subtitle}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium text-[#3B2A20]">
                          {formatPrice(product.pricePKR, currency)}
                        </span>
                        <div className="text-[10px] text-[#B99A62] flex items-center justify-end gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
                          <span>View</span>
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
