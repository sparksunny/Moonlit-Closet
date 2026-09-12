import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, CreditCard, Building2, Truck, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';
import { Currency, formatPrice } from '../utils/formatters';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  currency: Currency;
  onOrderComplete: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  currency,
  onOrderComplete,
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Lahore',
    country: 'Pakistan',
    postalCode: '',
    paymentMethod: 'bank_transfer',
    notes: '',
  });

  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');

  const rawSubtotal = cartItems.reduce(
    (acc, item) => acc + item.product.pricePKR * item.quantity,
    0
  );

  const discountAmount = discountApplied ? Math.round(rawSubtotal * 0.1) : 0;
  const shippingFee = rawSubtotal > 150000 ? 0 : 2500;
  const finalTotalPKR = rawSubtotal - discountAmount + shippingFee;

  const handleApplyDiscount = (e: React.FormEvent) => {
    e.preventDefault();
    if (discountCode.trim().toUpperCase() === 'MOONLIT10' || discountCode.trim().toUpperCase() === 'BRIDAL') {
      setDiscountApplied(true);
    } else {
      alert('Invalid promotional code. Try "MOONLIT10" for 10% privilege discount.');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `MLC-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setOrderConfirmed(true);
    onOrderComplete();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#3B2A20]/60 backdrop-blur-xs transition-opacity"
        onClick={orderConfirmed ? onClose : undefined}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-3xl bg-[#FFFDF9] border border-[#D8C2A5] rounded-[2px] shadow-2xl overflow-hidden z-10 my-8">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#D8C2A5]/60 flex items-center justify-between bg-[#F8F1E7]">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B99A62] font-semibold">
              Secure Haute Couture Checkout
            </span>
            <h2 className="font-serif text-xl sm:text-2xl text-[#3B2A20] font-normal">
              {orderConfirmed ? 'Order Reservation Confirmed' : 'Complete Your Order'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#3B2A20] hover:text-[#B99A62] transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confirmed State */}
        {orderConfirmed ? (
          <div className="p-8 sm:p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-[#E4D1B8]/50 border border-[#B99A62] flex items-center justify-center mx-auto mb-5 text-[#B99A62]">
              <CheckCircle2 className="w-9 h-9 stroke-[1.5]" />
            </div>

            <span className="text-[11px] uppercase tracking-[0.3em] font-medium text-[#B99A62] block mb-2">
              Bespoke Order Reserved
            </span>
            
            <h3 className="font-serif text-3xl text-[#3B2A20] mb-3">
              Thank You, {formData.fullName || 'Valued Patron'}
            </h3>

            <p className="text-sm text-[#654B39] font-light max-w-md mx-auto mb-6 leading-relaxed">
              Your order reservation <span className="font-mono font-semibold text-[#3B2A20]">{orderId}</span> has been received by the MOONLIT CLOSET atelier. Our master bridal concierge will reach out to you within 24 hours to confirm custom sizing and delivery timelines.
            </p>

            <div className="bg-[#F8F1E7] border border-[#D8C2A5] p-4 rounded-[2px] max-w-md mx-auto mb-8 text-xs text-[#654B39] text-left space-y-1">
              <p><span className="font-semibold text-[#3B2A20]">Reference:</span> {orderId}</p>
              <p><span className="font-semibold text-[#3B2A20]">Contact:</span> {formData.phone || '+92 300 0000000'}</p>
              <p><span className="font-semibold text-[#3B2A20]">Email:</span> {formData.email || 'customer@example.com'}</p>
              <p><span className="font-semibold text-[#3B2A20]">Amount:</span> {formatPrice(finalTotalPKR, currency)}</p>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3.5 bg-[#3B2A20] text-[#F8F1E7] text-xs uppercase tracking-[0.25em] font-medium rounded-[2px] hover:bg-[#4D372A]"
            >
              Return to Boutique
            </button>
          </div>
        ) : (
          /* Form State */
          <form onSubmit={handlePlaceOrder} className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
            
            {/* Customer Information */}
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#3B2A20] mb-3 pb-1 border-b border-[#D8C2A5]/50">
                1. Delivery & Contact Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] text-[#654B39] uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Fatima Khan"
                    className="w-full bg-[#F8F1E7] border border-[#D8C2A5] px-3 py-2 text-xs text-[#3B2A20] rounded-[1px] focus:outline-none focus:border-[#3B2A20]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#654B39] uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="fatima@example.com"
                    className="w-full bg-[#F8F1E7] border border-[#D8C2A5] px-3 py-2 text-xs text-[#3B2A20] rounded-[1px] focus:outline-none focus:border-[#3B2A20]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#654B39] uppercase tracking-wider mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+92 300 1234567"
                    className="w-full bg-[#F8F1E7] border border-[#D8C2A5] px-3 py-2 text-xs text-[#3B2A20] rounded-[1px] focus:outline-none focus:border-[#3B2A20]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#654B39] uppercase tracking-wider mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Lahore, Karachi, Islamabad, London..."
                    className="w-full bg-[#F8F1E7] border border-[#D8C2A5] px-3 py-2 text-xs text-[#3B2A20] rounded-[1px] focus:outline-none focus:border-[#3B2A20]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] text-[#654B39] uppercase tracking-wider mb-1">
                    Street Address & House / Apt # *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="House 42, Block G, Phase 5, DHA"
                    className="w-full bg-[#F8F1E7] border border-[#D8C2A5] px-3 py-2 text-xs text-[#3B2A20] rounded-[1px] focus:outline-none focus:border-[#3B2A20]"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#3B2A20] mb-3 pb-1 border-b border-[#D8C2A5]/50">
                2. Preferred Payment Method
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className={`border p-3 rounded-[1px] cursor-pointer flex flex-col justify-between ${formData.paymentMethod === 'bank_transfer' ? 'border-[#3B2A20] bg-[#F8F1E7]' : 'border-[#D8C2A5]'}`}>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank_transfer"
                      checked={formData.paymentMethod === 'bank_transfer'}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    />
                    <Building2 className="w-4 h-4 text-[#B99A62]" />
                    <span className="text-xs font-medium text-[#3B2A20]">Bank Transfer</span>
                  </div>
                  <p className="text-[10px] text-[#654B39] mt-2">Meezan / Standard Chartered</p>
                </label>

                <label className={`border p-3 rounded-[1px] cursor-pointer flex flex-col justify-between ${formData.paymentMethod === 'card' ? 'border-[#3B2A20] bg-[#F8F1E7]' : 'border-[#D8C2A5]'}`}>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    />
                    <CreditCard className="w-4 h-4 text-[#B99A62]" />
                    <span className="text-xs font-medium text-[#3B2A20]">Card Payment</span>
                  </div>
                  <p className="text-[10px] text-[#654B39] mt-2">Visa / Mastercard / Amex</p>
                </label>

                <label className={`border p-3 rounded-[1px] cursor-pointer flex flex-col justify-between ${formData.paymentMethod === 'cod' ? 'border-[#3B2A20] bg-[#F8F1E7]' : 'border-[#D8C2A5]'}`}>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    />
                    <Truck className="w-4 h-4 text-[#B99A62]" />
                    <span className="text-xs font-medium text-[#3B2A20]">Deposit & COD</span>
                  </div>
                  <p className="text-[10px] text-[#654B39] mt-2">50% Advance Atelier Deposit</p>
                </label>
              </div>
            </div>

            {/* Promo Code & Order Summary */}
            <div className="bg-[#F8F1E7] p-4 rounded-[2px] border border-[#D8C2A5]/70 space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo Code (try MOONLIT10)"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="flex-1 bg-[#FFFDF9] border border-[#D8C2A5] px-3 py-1.5 text-xs text-[#3B2A20] uppercase"
                />
                <button
                  type="button"
                  onClick={handleApplyDiscount}
                  className="px-4 py-1.5 bg-[#3B2A20] text-white text-[11px] uppercase tracking-wider"
                >
                  Apply
                </button>
              </div>

              <div className="text-xs space-y-1.5 text-[#654B39] pt-2 border-t border-[#D8C2A5]/40">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>{formatPrice(rawSubtotal, currency)}</span>
                </div>
                {discountApplied && (
                  <div className="flex justify-between text-[#B99A62] font-medium">
                    <span>Privilege Discount (10%)</span>
                    <span>-{formatPrice(discountAmount, currency)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>{shippingFee === 0 ? 'Complimentary' : formatPrice(shippingFee, currency)}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-[#3B2A20] pt-1.5 border-t border-[#D8C2A5]/50">
                  <span>Total Payable</span>
                  <span className="font-serif text-lg">{formatPrice(finalTotalPKR, currency)}</span>
                </div>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              id="checkout-submit-order-btn"
              type="submit"
              className="w-full py-4 bg-[#3B2A20] hover:bg-[#4D372A] text-[#F8F1E7] text-xs uppercase tracking-[0.25em] font-medium rounded-[2px] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>CONFIRM ORDER RESERVATION</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-[#654B39]/70 uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B99A62]" />
              <span>Hostinger Ready • Encrypted SSL Checkout Simulation</span>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
