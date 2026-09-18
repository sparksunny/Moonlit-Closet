import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, X, Sparkles, Heart, Eye, ShoppingBag } from 'lucide-react';
import { Product, CategoryType, OccasionType, SiteContent } from '../types';
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
  content?: SiteContent['wardrobe'];
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
  content,
}) => {
  const [selectedOccasion, setSelectedOccasion] = useState<OccasionType>('all');
  const [sortOption, setSortOption] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // The 2 primary groups
  const groups: { key: CategoryType; label: string; count: number; subtitle: string }[] = [
    { 
      key: 'bridal', 
      label: '1) Bridal Collection', 
      count: products.filter(p => p.category === 'bridal').length,
      subtitle: 'Heirloom peshwas, farshi lehengas & architectural veils'
    },
    { 
      key: 'party-wear', 
      label: '2) Party Wear', 
      count: products.filter(p => p.category === 'party-wear').length,
      subtitle: 'Luxury festive pret, organza, velvets & all new arrival edits'
    },
  ];

  const occasions: { key: OccasionType; label: string }[] = [
    { key: 'all', label: 'All Occasions' },
    { key: 'nikkah', label: 'Nikkah' },
    { key: 'mehndi', label: 'Mehndi' },
    { key: 'engagement', label: 'Engagement' },
    { key: 'reception', label: 'Reception' },
  ];

  // Helper to filter and sort a given list of products
  const filterAndSort = (items: Product[]) => {
    return items
      .filter((p) => {
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
  };

  const bridalProducts = useMemo(() => {
    return filterAndSort(products.filter((p) => p.category === 'bridal'));
  }, [products, selectedOccasion, sortOption]);

  const partyWearProducts = useMemo(() => {
    return filterAndSort(products.filter((p) => p.category === 'party-wear'));
  }, [products, selectedOccasion, sortOption]);

  const resetFilters = () => {
    setSelectedOccasion('all');
    setSortOption('featured');
  };

  // Determine whether to display Bridal, Party Wear, or Both
  const showBridal = activeCategory === 'all' || activeCategory === 'bridal';
  const showPartyWear = activeCategory === 'all' || activeCategory === 'party-wear';

  return (
    <div id="catalog-section" className="bg-[#FFFDF9]">
      
      {/* 2-Group Selector Navigation Banner */}
      <div className="sticky top-[69px] z-20 bg-[#F8F1E7]/95 backdrop-blur-md border-b border-[#D8C2A5]/60 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.25em] font-medium text-[#654B39]">
                Collections:
              </span>
              <span className="text-xs font-serif italic text-[#3B2A20]">
                2 Signature Groups
              </span>
            </div>

            {/* The 2 Groups Tabs + View Both */}
            <div className="flex items-center gap-2">
              {groups.map((grp) => (
                <button
                  key={grp.key}
                  id={`tab-group-${grp.key}`}
                  onClick={() => onChangeCategory(grp.key)}
                  className={`px-4 sm:px-5 py-2 text-xs uppercase tracking-[0.16em] font-medium rounded-[1px] transition-all cursor-pointer flex items-center gap-2 ${
                    activeCategory === grp.key
                      ? 'bg-[#3B2A20] text-[#F8F1E7] shadow-sm'
                      : 'bg-white text-[#3B2A20] border border-[#D8C2A5] hover:border-[#B99A62]'
                  }`}
                >
                  <span>{grp.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    activeCategory === grp.key ? 'bg-[#523B2D] text-[#E4D1B8]' : 'bg-[#F3E8DA] text-[#654B39]'
                  }`}>
                    {grp.count}
                  </span>
                </button>
              ))}

              <button
                id="tab-group-all"
                onClick={() => onChangeCategory('all')}
                className={`px-3 sm:px-4 py-2 text-xs uppercase tracking-[0.16em] font-medium rounded-[1px] transition-all cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-[#B99A62] text-white shadow-sm'
                    : 'bg-transparent text-[#654B39] hover:text-[#3B2A20]'
                }`}
              >
                View Both
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Filter & Sort Controls Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center justify-between py-3 px-4 bg-[#F8F1E7] border border-[#D8C2A5]/60 rounded-[2px] text-xs">
          
          {/* Left: Occasion Filters */}
          <div className="flex items-center gap-4">
            <button
              id="mobile-filters-btn"
              onClick={() => setMobileFilterOpen(true)}
              className="md:hidden flex items-center gap-1.5 font-medium text-[#3B2A20] uppercase tracking-wider py-1"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Occasion Filters</span>
            </button>

            <div className="hidden md:flex items-center gap-2">
              <span className="text-[#654B39] font-medium uppercase tracking-wider text-[10px] mr-1">
                Filter by Occasion:
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

          {/* Right: Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-[#654B39] font-medium uppercase tracking-wider text-[10px]">
              Sort By:
            </span>
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

        {/* Active Occasion Filter Notification */}
        {selectedOccasion !== 'all' && (
          <div className="flex items-center gap-2 mt-4 text-xs">
            <span className="text-[11px] text-[#654B39] tracking-wider uppercase font-medium">
              Filtered for:
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E4D1B8]/70 text-[#3B2A20] text-[11px] rounded-[1px]">
              {occasions.find((o) => o.key === selectedOccasion)?.label}
              <X
                className="w-3 h-3 cursor-pointer hover:text-[#B99A62]"
                onClick={() => setSelectedOccasion('all')}
              />
            </span>
            <button
              onClick={resetFilters}
              className="text-[11px] text-[#B99A62] underline hover:text-[#3B2A20] ml-2 tracking-wider uppercase"
            >
              Clear Occasion Filter
            </button>
          </div>
        )}
      </div>

      {/* SECTION 1: BRIDAL COLLECTION */}
      {showBridal && (
        <section 
          id="bridal-collection-section" 
          className="py-14 sm:py-20 border-b border-[#D8C2A5]/40"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section 1 Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#D8C2A5]/50 gap-4">
              <div>
                <span className="text-[11px] uppercase tracking-[0.28em] font-medium text-[#B99A62] block mb-2">
                  Section 01 • Group 1
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#3B2A20] font-normal tracking-tight">
                  Bridal Collection
                </h2>
                <p className="text-[#654B39] text-sm font-light mt-1 max-w-xl">
                  Bespoke heirloom peshwas, farshi lehengas, and royal veils hand-embroidered with tilla, vasli, and natural seed pearls.
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs uppercase tracking-wider text-[#654B39]">
                  {bridalProducts.length} {bridalProducts.length === 1 ? 'Creation' : 'Creations'} Available
                </span>
              </div>
            </div>

            {/* Bridal Grid */}
            {bridalProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 sm:gap-8">
                {bridalProducts.map((product) => (
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
              <div className="text-center py-12 px-4 bg-[#F8F1E7] border border-[#D8C2A5]/50 rounded-[2px]">
                <p className="font-serif text-lg text-[#3B2A20] mb-1">No bridal pieces match this occasion filter</p>
                <button
                  onClick={resetFilters}
                  className="mt-3 text-xs uppercase tracking-wider text-[#B99A62] underline hover:text-[#3B2A20]"
                >
                  Reset Filter
                </button>
              </div>
            )}

          </div>
        </section>
      )}

      {/* SECTION 2: PARTY WEAR */}
      {showPartyWear && (
        <section 
          id="party-wear-section" 
          className="py-14 sm:py-20 bg-[#F8F1E7]/40"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section 2 Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#D8C2A5]/50 gap-4">
              <div>
                <span className="text-[11px] uppercase tracking-[0.28em] font-medium text-[#B99A62] block mb-2">
                  Section 02 • Group 2
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#3B2A20] font-normal tracking-tight">
                  Party Wear
                </h2>
                <p className="text-[#654B39] text-sm font-light mt-1 max-w-xl">
                  Festive luxury pret, sheer organza kurtas, plush velvet edits, and jewel-toned ensembles — showcasing all new arrival designs and signature releases.
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs uppercase tracking-wider text-[#654B39]">
                  {partyWearProducts.length} {partyWearProducts.length === 1 ? 'Design' : 'Designs'} Available
                </span>
              </div>
            </div>

            {/* Party Wear Grid */}
            {partyWearProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {partyWearProducts.map((product) => (
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
              <div className="text-center py-12 px-4 bg-[#F8F1E7] border border-[#D8C2A5]/50 rounded-[2px]">
                <p className="font-serif text-lg text-[#3B2A20] mb-1">No party wear pieces match this occasion filter</p>
                <button
                  onClick={resetFilters}
                  className="mt-3 text-xs uppercase tracking-wider text-[#B99A62] underline hover:text-[#3B2A20]"
                >
                  Reset Filter
                </button>
              </div>
            )}

          </div>
        </section>
      )}

      {/* Mobile Occasions Slide-Over Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
          <div className="w-80 bg-[#FFFDF9] h-full p-6 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#D8C2A5]">
                <h3 className="font-serif text-lg text-[#3B2A20]">Occasion Filters</h3>
                <button onClick={() => setMobileFilterOpen(false)}>
                  <X className="w-5 h-5 text-[#3B2A20]" />
                </button>
              </div>

              <div className="mt-6 space-y-2">
                {occasions.map((occ) => (
                  <button
                    key={occ.key}
                    onClick={() => {
                      setSelectedOccasion(occ.key);
                      setMobileFilterOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-xs rounded-[1px] transition-colors ${
                      selectedOccasion === occ.key
                        ? 'bg-[#3B2A20] text-white font-medium'
                        : 'text-[#3B2A20] hover:bg-[#F8F1E7]'
                    }`}
                  >
                    {occ.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                resetFilters();
                setMobileFilterOpen(false);
              }}
              className="w-full py-2.5 bg-[#F8F1E7] border border-[#D8C2A5] text-[#3B2A20] text-xs uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
