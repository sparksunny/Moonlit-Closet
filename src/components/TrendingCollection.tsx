import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { Currency } from '../utils/formatters';
import { ProductCard } from './ProductCard';

interface TrendingCollectionProps {
  products: Product[];
  currency: Currency;
  wishlistIds: Set<string>;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onViewAll: () => void;
}

export const TrendingCollection: React.FC<TrendingCollectionProps> = ({
  products,
  currency,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  onViewAll,
}) => {
  // Display the 8 core new arrival pieces
  const trendingProducts = products.slice(0, 8);

  return (
    <section 
      id="new-arrivals-section" 
      className="py-16 sm:py-24 bg-[#F8F1E7] border-b border-[#D8C2A5]/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#B99A62]" />
              <span className="text-[11px] uppercase tracking-[0.3em] font-medium text-[#B99A62]">
                Autumn / Winter Haute Couture
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#3B2A20] font-normal tracking-tight">
              New Arrivals
            </h2>
            <p className="text-[#654B39] text-sm sm:text-base font-light mt-1.5">
              Fresh expressions of timeless elegance.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <button
              id="view-all-new-arrivals-btn"
              onClick={onViewAll}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#3B2A20] hover:text-[#B99A62] transition-colors py-1 group cursor-pointer"
            >
              <span>Explore All Creations</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* 4-Column Product Grid (Responsive: 4 on desktop, 3-2 on tablet, 2 on mobile) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {trendingProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              currency={currency}
              isWishlisted={wishlistIds.has(product.id)}
              onToggleWishlist={onToggleWishlist}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
