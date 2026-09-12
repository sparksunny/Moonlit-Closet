import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, Globe, ChevronDown } from 'lucide-react';
import { Currency } from '../utils/formatters';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  currency: Currency;
  onSelectCurrency: (c: Currency) => void;
  onNavigateSection: (sectionId: string, filterCategory?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  currency,
  onSelectCurrency,
  onNavigateSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Collections', sectionId: 'collections-section' },
    { label: 'Bridal', sectionId: 'catalog-section', category: 'bridal' },
    { label: 'Formal', sectionId: 'catalog-section', category: 'formal' },
    { label: 'New Arrivals', sectionId: 'new-arrivals-section' },
    { label: 'Craftsmanship', sectionId: 'craftsmanship-section' },
    { label: 'Occasions', sectionId: 'occasions-section' },
  ];

  const currencies: Currency[] = ['PKR', 'USD', 'GBP', 'AED', 'CAD'];

  return (
    <>
      <header
        id="main-header"
        className={`sticky top-0 z-30 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F8F1E7]/95 backdrop-blur-md shadow-[0_4px_20px_rgba(59,42,32,0.06)] border-b border-[#D8C2A5]/50 py-3 sm:py-4'
            : 'bg-[#F8F1E7] border-b border-[#D8C2A5]/30 py-4 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button (Left on mobile) */}
            <div className="flex items-center lg:hidden">
              <button
                id="mobile-menu-toggle-btn"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 text-[#3B2A20] hover:text-[#B99A62] transition-colors focus:outline-none"
                aria-label="Open mobile navigation"
              >
                <Menu className="w-6 h-6 stroke-[1.5]" />
              </button>
            </div>

            {/* Desktop Navigation Links (Left) */}
            <nav className="hidden lg:flex items-center space-x-7">
              {navLinks.slice(0, 4).map((link) => (
                <button
                  key={link.label}
                  id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => onNavigateSection(link.sectionId, link.category)}
                  className="text-xs uppercase tracking-[0.2em] font-medium text-[#3B2A20]/90 hover:text-[#B99A62] transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#B99A62] hover:after:w-full after:transition-all after:duration-300"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Center Brand Wordmark */}
            <div className="text-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <span className="block font-serif text-xl sm:text-2xl lg:text-3xl tracking-[0.24em] uppercase text-[#3B2A20] font-normal select-none">
                MOONLIT CLOSET
              </span>
              <span className="hidden sm:block text-[9px] tracking-[0.35em] uppercase text-[#654B39]/80 font-light mt-0.5">
                Couture • Lahore
              </span>
            </div>

            {/* Right Icons: Currency, Search, Wishlist, Bag */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              {/* Currency Selector (Desktop) */}
              <div className="relative hidden md:block">
                <button
                  id="currency-selector-btn"
                  onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                  className="flex items-center gap-1 text-[11px] font-medium tracking-wider text-[#3B2A20]/80 hover:text-[#B99A62] transition-colors py-1 px-1.5"
                  aria-label="Select currency"
                >
                  <Globe className="w-3.5 h-3.5 stroke-[1.5]" />
                  <span>{currency}</span>
                  <ChevronDown className="w-3 h-3 opacity-60" />
                </button>
                {currencyDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-28 bg-[#FFFDF9] border border-[#D8C2A5]/70 shadow-lg py-1 z-50 text-xs text-[#3B2A20]"
                    onMouseLeave={() => setCurrencyDropdownOpen(false)}
                  >
                    {currencies.map((curr) => (
                      <button
                        key={curr}
                        onClick={() => {
                          onSelectCurrency(curr);
                          setCurrencyDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 hover:bg-[#F3E8DA] transition-colors ${
                          currency === curr ? 'font-semibold text-[#B99A62]' : ''
                        }`}
                      >
                        {curr}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Search Icon */}
              <button
                id="header-search-btn"
                onClick={onOpenSearch}
                className="p-1.5 text-[#3B2A20] hover:text-[#B99A62] transition-colors focus:outline-none"
                aria-label="Search garments"
              >
                <Search className="w-5 h-5 stroke-[1.3]" />
              </button>

              {/* Wishlist Icon */}
              <button
                id="header-wishlist-btn"
                onClick={onOpenWishlist}
                className="p-1.5 text-[#3B2A20] hover:text-[#B99A62] transition-colors relative focus:outline-none"
                aria-label="View Wishlist"
              >
                <Heart className="w-5 h-5 stroke-[1.3]" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#B99A62] text-white text-[9px] font-semibold w-4 h-4 rounded-full flex items-center justify-center animate-fade-in">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Shopping Bag Icon */}
              <button
                id="header-cart-btn"
                onClick={onOpenCart}
                className="p-1.5 text-[#3B2A20] hover:text-[#B99A62] transition-colors relative focus:outline-none"
                aria-label="View Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.3]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#3B2A20] text-[#F8F1E7] text-[9px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#3B2A20]/40 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-4/5 max-w-sm bg-[#F8F1E7] h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto border-r border-[#D8C2A5]/70 animate-slide-right">
            <div>
              {/* Drawer Top */}
              <div className="flex items-center justify-between pb-6 border-b border-[#D8C2A5]/40">
                <span className="font-serif text-xl tracking-[0.2em] uppercase text-[#3B2A20]">
                  MOONLIT CLOSET
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-[#3B2A20] hover:text-[#B99A62] transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6 stroke-[1.5]" />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="mt-8 space-y-5">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => {
                      onNavigateSection(link.sectionId, link.category);
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left font-serif text-xl tracking-wider text-[#3B2A20] hover:text-[#B99A62] transition-colors py-1.5 border-b border-[#D8C2A5]/20"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>

              {/* Occasions Quick Links in Mobile */}
              <div className="mt-8 pt-6 border-t border-[#D8C2A5]/40">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#654B39] font-semibold mb-3">
                  Shop By Occasion
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {['Nikkah', 'Mehndi', 'Engagement', 'Reception'].map((occ) => (
                    <button
                      key={occ}
                      onClick={() => {
                        onNavigateSection('catalog-section', occ.toLowerCase());
                        setMobileMenuOpen(false);
                      }}
                      className="text-left py-1 text-[#3B2A20]/80 hover:text-[#B99A62]"
                    >
                      {occ}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Footer Area inside drawer */}
            <div className="pt-8 border-t border-[#D8C2A5]/40">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-wider text-[#654B39]">Currency</span>
                <div className="flex gap-2 text-xs font-medium">
                  {currencies.map((curr) => (
                    <button
                      key={curr}
                      onClick={() => onSelectCurrency(curr)}
                      className={`px-2 py-0.5 border ${
                        currency === curr
                          ? 'border-[#3B2A20] bg-[#3B2A20] text-white'
                          : 'border-[#D8C2A5] text-[#3B2A20]'
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-[#654B39]/70 text-center tracking-widest uppercase">
                Bespoke Bridal Consultations • +92 (42) 3571-0980
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
