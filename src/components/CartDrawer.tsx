import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';
import { Currency, formatPrice } from '../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  currency: Currency;
  onUpdateQuantity: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onOpenCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout,
}) => {
  if (!isOpen) return null;

  const subtotalPKR = cartItems.reduce(
    (acc, item) => acc + item.product.pricePKR * item.quantity,
    0
  );

  const freeShippingThresholdPKR = 150000;
  const progressPercent = Math.min(100, (subtotalPKR / freeShippingThresholdPKR) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#3B2A20]/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Slide-out Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF9] border-l border-[#D8C2A5] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-[#D8C2A5]/50 flex items-center justify-between bg-[#F8F1E7]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#3B2A20] stroke-[1.5]" />
              <h2 className="font-serif text-xl text-[#3B2A20] font-normal tracking-wide">
                Your Shopping Bag ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-[#3B2A20] hover:text-[#B99A62] transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary Shipping Banner */}
          <div className="px-6 py-3 bg-[#E4D1B8]/40 border-b border-[#D8C2A5]/50 text-xs text-[#3B2A20]">
            {subtotalPKR >= freeShippingThresholdPKR ? (
              <p className="font-medium text-[#3B2A20] text-center">
                ✨ You've unlocked Complimentary Nationwide Delivery!
              </p>
            ) : (
              <div>
                <p className="text-center mb-1 text-[11px]">
                  Add <span className="font-semibold">{formatPrice(freeShippingThresholdPKR - subtotalPKR, currency)}</span> more for Complimentary Delivery
                </p>
                <div className="w-full h-1.5 bg-[#D8C2A5]/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#B99A62] transition-all duration-500 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#D8C2A5]/40">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#F8F1E7] border border-[#D8C2A5] flex items-center justify-center text-[#B99A62] mb-4">
                  <ShoppingBag className="w-6 h-6 stroke-[1.2]" />
                </div>
                <h3 className="font-serif text-xl text-[#3B2A20] mb-2">Your Bag is Empty</h3>
                <p className="text-xs text-[#654B39] font-light max-w-xs mb-6">
                  Explore our handcrafted bridal and formal collections to find your perfect celebration outfit.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#3B2A20] text-[#F8F1E7] text-xs uppercase tracking-[0.2em] font-medium rounded-[1px] hover:bg-[#4D372A]"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="py-4 flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-26 rounded-[1px] overflow-hidden bg-[#F3E8DA] shrink-0 border border-[#D8C2A5]/60">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-sm sm:text-base text-[#3B2A20] font-normal leading-snug">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id, item.size)}
                          className="text-[#654B39]/70 hover:text-red-700 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      
                      <p className="text-[11px] text-[#654B39] font-light mt-0.5">
                        Size: <span className="font-medium text-[#3B2A20]">{item.size}</span>
                      </p>
                      <p className="text-[10px] text-[#B99A62] font-light mt-0.5">
                        {item.product.fabric.split('&')[0]}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[#D8C2A5] rounded-[1px] bg-[#F8F1E7]">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.size, -1)}
                          className="px-2 py-1 text-[#3B2A20] hover:text-[#B99A62] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-medium text-[#3B2A20]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.size, 1)}
                          className="px-2 py-1 text-[#3B2A20] hover:text-[#B99A62] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="font-sans text-xs sm:text-sm font-semibold text-[#3B2A20]">
                        {formatPrice(item.product.pricePKR * item.quantity, currency)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-[#F8F1E7] border-t border-[#D8C2A5]/70 space-y-4">
              <div className="space-y-1.5 text-xs text-[#654B39]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#3B2A20]">
                    {formatPrice(subtotalPKR, currency)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Atelier Dispatch</span>
                  <span className="text-[#B99A62] font-medium">Bespoke Preparation</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-[#3B2A20] pt-2 border-t border-[#D8C2A5]/40">
                  <span>Estimated Total</span>
                  <span className="font-serif text-lg">
                    {formatPrice(subtotalPKR, currency)}
                  </span>
                </div>
              </div>

              <button
                id="cart-checkout-btn"
                onClick={() => {
                  onClose();
                  onOpenCheckout();
                }}
                className="w-full py-3.5 bg-[#3B2A20] text-[#F8F1E7] text-xs uppercase tracking-[0.25em] font-medium rounded-[2px] hover:bg-[#4D372A] transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#654B39]/80 uppercase tracking-widest">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B99A62]" />
                <span>Authentic Pakistani Haute Couture Guarantee</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
