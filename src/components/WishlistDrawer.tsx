import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';
import { Currency, formatPrice } from '../utils/formatters';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  currency: Currency;
  onRemoveFromWishlist: (product: Product) => void;
  onMoveToBag: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  currency,
  onRemoveFromWishlist,
  onMoveToBag,
  onQuickView,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#3B2A20]/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF9] border-l border-[#D8C2A5] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-[#D8C2A5]/50 flex items-center justify-between bg-[#F8F1E7]">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#B99A62] fill-[#B99A62]" />
              <h2 className="font-serif text-xl text-[#3B2A20] font-normal tracking-wide">
                Saved Creations ({wishlistProducts.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-[#3B2A20] hover:text-[#B99A62] transition-colors"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#D8C2A5]/40">
            {wishlistProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#F8F1E7] border border-[#D8C2A5] flex items-center justify-center text-[#B99A62] mb-4">
                  <Heart className="w-6 h-6 stroke-[1.2]" />
                </div>
                <h3 className="font-serif text-xl text-[#3B2A20] mb-2">No Saved Items</h3>
                <p className="text-xs text-[#654B39] font-light max-w-xs mb-6">
                  Click the heart icon on any bridal or formal piece to save it to your private wishlist.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#3B2A20] text-[#F8F1E7] text-xs uppercase tracking-[0.2em] font-medium rounded-[1px]"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div key={product.id} className="py-4 flex gap-4">
                  <div
                    onClick={() => {
                      onClose();
                      onQuickView(product);
                    }}
                    className="w-20 h-26 rounded-[1px] overflow-hidden bg-[#F3E8DA] shrink-0 border border-[#D8C2A5]/60 cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4
                          onClick={() => {
                            onClose();
                            onQuickView(product);
                          }}
                          className="font-serif text-sm sm:text-base text-[#3B2A20] font-normal leading-snug cursor-pointer hover:text-[#B99A62]"
                        >
                          {product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveFromWishlist(product)}
                          className="text-[#654B39]/70 hover:text-red-700 transition-colors p-1"
                          aria-label="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[10px] uppercase tracking-wider text-[#B99A62] mt-0.5 font-medium">
                        {product.categoryLabel}
                      </p>
                      <p className="font-sans text-xs font-semibold text-[#3B2A20] mt-1.5">
                        {formatPrice(product.pricePKR, currency)}
                      </p>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => {
                          onMoveToBag(product);
                        }}
                        className="w-full py-1.5 px-3 bg-[#3B2A20] text-[#F8F1E7] text-[10px] uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-1.5 hover:bg-[#4D372A] transition-colors rounded-[1px]"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-6 bg-[#F8F1E7] border-t border-[#D8C2A5]/70 text-center">
            <p className="text-[11px] text-[#654B39]/80 uppercase tracking-widest">
              Wishlist saved to current session
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
