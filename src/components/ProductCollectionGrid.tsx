import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, X, ArrowUpDown } from 'lucide-react';
import { Product, CategoryType, OccasionType } from '../types';
import { Currency } from '../utils/formatters';
import { ProductCard } from './ProductCard';

interface ProductCollectionGridProps {
  products: Product[];
  currency: Currency;
  wishlistIds: Set<string>;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  activeCategory: CategoryType;
  onChangeCategory: (cat: CategoryType) => void;
}

export const ProductCollectionGrid: React.FC<ProductCollectionGridProps> = ({
  products,
  currency,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  activeCategory,
  onChangeCategory,
}) => {
  const [selectedOccasion, setSelectedOccasion] = useState<OccasionType>('all');
  const [sortOption, setSortOption] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categories: { key: CategoryType; label: string }[] = [
    { key: 'all', label: 'All Creations' },
    { key: 'bridal', label: 'Bridal' },
    { key: 'pret', label: 'Luxury Pret' },
    { key: 'formal', label: 'Formal' },
    { key: 'wedding-guest', label: 'Wedding Guest' },
    { key: 'accessories', label: 'Accessories' },
  ];

  const occasions: { key: OccasionType; label: string }[] = [
    { key: 'all', label: 'All Occasions' },
    { key: 'nikkah', label: 'Nikkah' },
    { key: 'mehndi', label: 'Mehndi' },
    { key: 'engagement', label: 'Engagement' },
    { key: 'reception', label: 'Reception' },
  ];

  // Filter & Sort logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (activeCategory !== 'all' && p.category !== activeCategory) {
          return false;
        }
        if (selectedOccasion !== 'all' && p.occasion !== selectedOccasion && p.occasion !== 'versatile') {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortOption === 'price-asc') return a.pricePKR - b.pricePKR;
        if (sortOption === 'price-desc') return b.pricePKR - a.pricePKR;
        return 0;
      });
  }, [products, activeCategory, selectedOccasion, sortOption]);

  const resetFilters = () => {
    onChangeCategory('all');
    setSelectedOccasion('all');
    setSortOption('featured');
  };

  return (
    <section 
      id="catalog-section" 
      className="py-16 sm:py-24 bg-[#FFFDF9] border-b border-[#D8C2A5]/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-[11px] uppercase tracking-[0.3em] font-medium text-[#B99A62] block mb-2">
            The Complete Atelier
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#3B2A20] font-normal tracking-tight mb-3">
            The MOONLIT CLOSET Wardrobe
          </h2>
          <div className="w-12 h-[1px] bg-[#B99A62] mx-auto mb-3"></div>
          <p className="text-[#654B39] text-sm sm:text-base font-light leading-relaxed">
            Discover handcrafted bridal masterpieces, luxury pret ensembles, and heritage accessories.
          </p>
        </div>

        {/* Desktop Category Tabs */}
        <div className="hidden md:flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.key}
              id={`filter-cat-${cat.key}`}
              onClick={() => onChangeCategory(cat.key)}
              className={`px-5 py-2 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-200 rounded-[1px] cursor-pointer ${
                activeCategory === cat.key
                  ? 'bg-[#3B2A20] text-[#F8F1E7] shadow-sm'
                  : 'bg-[#F8F1E7] text-[#3B2A20] border border-[#D8C2A5]/60 hover:border-[#B99A62]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Filter Control Bar (Occasion, Sorting & Results Count) */}
        <div className="flex items-center justify-between py-4 px-4 sm:px-6 bg-[#F8F1E7] border border-[#D8C2A5]/60 rounded-[2px] mb-8 text-xs">
          
          {/* Left: Occasion Filters (Desktop) & Mobile Filter Trigger */}
          <div className="flex items-center gap-4">
            <button
              id="mobile-filters-btn"
              onClick={() => setMobileFilterOpen(true)}
              className="md:hidden flex items-center gap-1.5 font-medium text-[#3B2A20] uppercase tracking-wider py-1"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>

            {/* Desktop Occasion Pills */}
            <div className="hidden md:flex items-center gap-2">
              <span className="text-[#654B39] font-medium uppercase tracking-wider text-[10px] mr-1">
                Occasion:
              </span>
              {occasions.map((occ) => (
                <button
                  key={occ.key}
                  id={`filter-occ-${occ.key}`}
                  onClick={() => setSelectedOccasion(occ.key)}
                  className={`px-2.5 py-1 text-[11px] rounded-[1px] transition-colors cursor-pointer ${
                    selectedOccasion === occ.key
                      ? 'bg-[#B99A62] text-white font-medium'
                      : 'text-[#3B2A20] hover:bg-[#E4D1B8]/60'
                  }`}
                >
                  {occ.label}
                </button>
              ))}
            </div>
          </div>

          {/* Center: Count */}
          <div className="text-[11px] uppercase tracking-wider text-[#654B39]">
            <span>{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'Design' : 'Designs'}
          </div>

          {/* Right: Sort dropdown */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-[#654B39] font-medium uppercase tracking-wider text-[10px]">
              Sort By:
            </span>
            <div className="relative">
              <select
                id="catalog-sort-select"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as any)}
                className="bg-transparent border border-[#D8C2A5] text-[#3B2A20] text-xs py-1 px-2.5 rounded-[1px] focus:outline-none focus:border-[#B99A62] cursor-pointer"
              >
                <option value="featured">Featured Edit</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

        </div>

        {/* Active Filter Chips */}
        {(activeCategory !== 'all' || selectedOccasion !== 'all') && (
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <span className="text-[11px] text-[#654B39] tracking-wider uppercase font-medium">
              Active Filters:
            </span>
            {activeCategory !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E4D1B8]/70 text-[#3B2A20] text-[11px] rounded-[1px]">
                {categories.find((c) => c.key === activeCategory)?.label}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-[#B99A62]"
                  onClick={() => onChangeCategory('all')}
                />
              </span>
            )}
            {selectedOccasion !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E4D1B8]/70 text-[#3B2A20] text-[11px] rounded-[1px]">
                {occasions.find((o) => o.key === selectedOccasion)?.label}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-[#B99A62]"
                  onClick={() => setSelectedOccasion('all')}
                />
              </span>
            )}
            <button
              onClick={resetFilters}
              className="text-[11px] text-[#B99A62] underline hover:text-[#3B2A20] ml-2 tracking-wider uppercase"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
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
        ) : (
          /* Empty state */
          <div className="text-center py-16 px-4 bg-[#F8F1E7] border border-[#D8C2A5]/50 rounded-[2px] max-w-md mx-auto">
            <h3 className="font-serif text-2xl text-[#3B2A20] mb-2 font-normal">
              No Pieces Match Your Selection
            </h3>
            <p className="text-xs text-[#654B39] font-light mb-6">
              Try adjusting your category or occasion filters to explore other creations.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 bg-[#3B2A20] text-[#F8F1E7] text-xs uppercase tracking-[0.2em] font-medium rounded-[1px]"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Mobile Filters Drawer Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-[#3B2A20]/40 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm ml-auto bg-[#FFFDF9] h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#D8C2A5]">
                <span className="font-serif text-xl text-[#3B2A20]">Filters & Categories</span>
                <button onClick={() => setMobileFilterOpen(false)}>
                  <X className="w-5 h-5 text-[#3B2A20]" />
                </button>
              </div>

              {/* Categories in Drawer */}
              <div className="mt-6">
                <p className="text-xs uppercase tracking-[0.2em] text-[#654B39] font-semibold mb-3">
                  Category
                </p>
                <div className="space-y-2">
                  {categories.map((c) => (
                    <button
                      key={c.key}
                      onClick={() => {
                        onChangeCategory(c.key);
                      }}
                      className={`block w-full text-left px-3 py-2 text-xs rounded-[1px] transition-colors ${
                        activeCategory === c.key
                          ? 'bg-[#3B2A20] text-white font-medium'
                          : 'bg-[#F8F1E7] text-[#3B2A20]'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Occasions in Drawer */}
              <div className="mt-6">
                <p className="text-xs uppercase tracking-[0.2em] text-[#654B39] font-semibold mb-3">
                  Occasion
                </p>
                <div className="space-y-2">
                  {occasions.map((o) => (
                    <button
                      key={o.key}
                      onClick={() => {
                        setSelectedOccasion(o.key);
                      }}
                      className={`block w-full text-left px-3 py-2 text-xs rounded-[1px] transition-colors ${
                        selectedOccasion === o.key
                          ? 'bg-[#B99A62] text-white font-medium'
                          : 'bg-[#F8F1E7] text-[#3B2A20]'
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#D8C2A5] flex gap-3">
              <button
                onClick={() => {
                  resetFilters();
                  setMobileFilterOpen(false);
                }}
                className="flex-1 py-2.5 border border-[#654B39] text-xs uppercase tracking-wider text-[#3B2A20]"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2.5 bg-[#3B2A20] text-white text-xs uppercase tracking-wider"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
