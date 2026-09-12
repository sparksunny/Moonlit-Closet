import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { Currency, formatPrice } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
  currency: Currency;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      id={`product-card-${product.id}`}
      className="group flex flex-col bg-[#FFFDF9] border border-[#D8C2A5]/40 rounded-[2px] overflow-hidden transition-all duration-300 hover:shadow-[0_8px_28px_rgba(59,42,32,0.08)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Wrap */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F3E8DA]">
        
        {/* Primary Image */}
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover object-center transition-all duration-700 ease-out ${
            isHovered && product.secondaryImage ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
          loading="lazy"
        />

        {/* Secondary Hover Image (if present) */}
        {product.secondaryImage && (
          <img
            src={product.secondaryImage}
            alt={`${product.name} detail view`}
            referrerPolicy="no-referrer"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out ${
              isHovered ? 'opacity-100 scale-102' : 'opacity-0 scale-100 pointer-events-none'
            }`}
            loading="lazy"
          />
        )}

        {/* Badges (New / Bestseller) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNew && (
            <span className="bg-[#3B2A20] text-[#F8F1E7] text-[9px] uppercase tracking-[0.2em] font-medium px-2 py-0.5 rounded-[1px] shadow-sm">
              NEW
            </span>
          )}
          {product.isBestseller && !product.isNew && (
            <span className="bg-[#B99A62] text-white text-[9px] uppercase tracking-[0.2em] font-medium px-2 py-0.5 rounded-[1px] shadow-sm">
              SIGNATURE
            </span>
          )}
        </div>

        {/* Wishlist Heart Icon (Upper Right) */}
        <button
          id={`wishlist-toggle-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-[#FFFDF9]/90 backdrop-blur-sm border border-[#D8C2A5]/70 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm cursor-pointer"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted
                ? 'fill-[#B99A62] text-[#B99A62]'
                : 'text-[#3B2A20] hover:text-[#B99A62]'
            }`}
          />
        </button>

        {/* Quick View Button (Desktop Hover Slide-Up) */}
        <div className="absolute bottom-3 inset-x-3 hidden sm:flex items-center gap-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <button
            id={`quick-view-btn-${product.id}`}
            onClick={() => onQuickView(product)}
            className="flex-1 py-2 px-3 bg-[#FFFDF9]/95 hover:bg-[#3B2A20] text-[#3B2A20] hover:text-[#F8F1E7] border border-[#D8C2A5] text-[10px] uppercase tracking-[0.2em] font-medium transition-colors duration-200 flex items-center justify-center gap-1.5 shadow-sm rounded-[1px] cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
          
          <button
            id={`add-bag-quick-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="w-9 h-9 bg-[#3B2A20] hover:bg-[#4D372A] text-[#F8F1E7] flex items-center justify-center transition-colors rounded-[1px] shadow-sm cursor-pointer"
            aria-label="Add to bag"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Quick Action Buttons (Always visible on mobile) */}
        <div className="absolute bottom-2 right-2 sm:hidden flex gap-1 z-10">
          <button
            onClick={() => onQuickView(product)}
            className="p-1.5 bg-[#FFFDF9]/90 rounded-full border border-[#D8C2A5] shadow-sm text-[#3B2A20]"
            aria-label="Quick View"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div 
        className="p-4 flex-1 flex flex-col justify-between cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        <div>
          {/* Category Micro-label */}
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[9px] uppercase tracking-[0.22em] text-[#B99A62] font-semibold">
              {product.categoryLabel}
            </span>
            <span className="text-[10px] text-[#654B39]/70 font-light capitalize">
              {product.colorName}
            </span>
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-base sm:text-lg text-[#3B2A20] font-normal leading-snug group-hover:text-[#B99A62] transition-colors">
            {product.name}
          </h3>

          {/* Subtitle */}
          <p className="text-xs text-[#654B39]/80 font-light mt-1 line-clamp-1">
            {product.subtitle}
          </p>
        </div>

        {/* Price & Mobile Add to Bag */}
        <div className="pt-3 mt-3 border-t border-[#D8C2A5]/30 flex items-center justify-between">
          <div>
            <p className="font-sans text-sm sm:text-base font-medium text-[#3B2A20] tracking-wide">
              {formatPrice(product.pricePKR, currency)}
            </p>
          </div>

          <button
            id={`card-add-to-cart-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="text-[10px] uppercase tracking-[0.18em] font-medium text-[#3B2A20] hover:text-[#B99A62] transition-colors py-1 flex items-center gap-1 cursor-pointer"
          >
            <span>Add to Bag</span>
          </button>
        </div>

      </div>
    </div>
  );
};
