import React, { useState, useEffect } from 'react';
import { PRODUCTS } from './data/products';
import { Product, CartItem, CategoryType, OccasionType } from './types';
import { Currency } from './utils/formatters';

import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeaturedCollections } from './components/FeaturedCollections';
import { BridalEditorial } from './components/BridalEditorial';
import { TrendingCollection } from './components/TrendingCollection';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { ProductCollectionGrid } from './components/ProductCollectionGrid';
import { OccasionGuide } from './components/OccasionGuide';
import { Testimonials } from './components/Testimonials';
import { InstagramGallery } from './components/InstagramGallery';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';

import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchOverlay } from './components/SearchOverlay';
import { QuickViewModal } from './components/QuickViewModal';
import { CheckoutModal } from './components/CheckoutModal';
import { ConsultationModal } from './components/ConsultationModal';
import { Toast, ToastMessage } from './components/Toast';

export default function App() {
  // Global State
  const [currency, setCurrency] = useState<Currency>('PKR');
  
  // Cart State with localStorage persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('moonlit_closet_cart') || localStorage.getItem('moonlit_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist State with localStorage persistence
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('moonlit_closet_wishlist') || localStorage.getItem('moonlit_wishlist');
      return saved ? new Set(JSON.parse(saved)) : new Set(['celeste-embroidered-ensemble', 'mehr-champagne-kurta-set']);
    } catch {
      return new Set();
    }
  });

  // Filter category state in catalog
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');

  // Modals & Drawers
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync Cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('moonlit_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [cartItems]);

  // Sync Wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('moonlit_wishlist', JSON.stringify(Array.from(wishlistIds)));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [wishlistIds]);

  const addToast = (type: 'cart' | 'wishlist' | 'info', title: string, message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const handleAddToCart = (product: Product, size: string = 'S', quantity: number = 1, notes?: string) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        if (notes) updated[existingIndex].customNotes = notes;
        return updated;
      } else {
        return [...prev, { product, size, quantity, customNotes: notes }];
      }
    });

    addToast('cart', 'Added to Shopping Bag', `${product.name} (${size}) has been reserved.`);
  };

  const handleUpdateCartQuantity = (productId: string, size: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.size === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string, size: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.size === size))
    );
  };

  const handleOrderComplete = () => {
    setCartItems([]);
    addToast('info', 'Order Reservation Confirmed', 'Our bridal concierge will contact you via WhatsApp.');
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
        addToast('wishlist', 'Removed from Wishlist', `${product.name} removed from your saved pieces.`);
      } else {
        next.add(product.id);
        addToast('wishlist', 'Saved to Wishlist', `${product.name} added to your private favorites.`);
      }
      return next;
    });
  };

  const handleMoveToBag = (product: Product) => {
    handleAddToCart(product, product.sizes[0] || 'S', 1);
    setWishlistIds((prev) => {
      const next = new Set(prev);
      next.delete(product.id);
      return next;
    });
  };

  // Navigation smoothly scrolls to anchor
  const handleNavigateSection = (sectionId: string, filterCategory?: string) => {
    if (filterCategory) {
      setActiveCategory(filterCategory as CategoryType);
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Wishlist products array
  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.has(p.id));

  return (
    <div className="min-h-screen bg-[#F8F1E7] text-[#3B2A20] flex flex-col font-sans">
      
      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Premium Navigation / Header */}
      <Header
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlistIds.size}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        currency={currency}
        onSelectCurrency={setCurrency}
        onNavigateSection={handleNavigateSection}
      />

      <main className="flex-1">
        {/* 3. Hero Section */}
        <Hero
          onExploreBridal={() => handleNavigateSection('catalog-section', 'bridal')}
          onViewCollection={() => handleNavigateSection('collections-section')}
        />

        {/* 4. Featured Collections ("Curated for Your Moment") */}
        <FeaturedCollections
          onSelectCollection={(cat) => handleNavigateSection('catalog-section', cat)}
        />

        {/* 5. Bridal Editorial Section ("The Art of Craft") */}
        <BridalEditorial
          onDiscoverCraft={() => handleNavigateSection('craftsmanship-section')}
        />

        {/* 6. New Arrivals / Trending Collection */}
        <TrendingCollection
          products={PRODUCTS}
          currency={currency}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={setQuickViewProduct}
          onAddToCart={(p) => handleAddToCart(p, p.sizes[0] || 'S', 1)}
          onViewAll={() => handleNavigateSection('catalog-section')}
        />

        {/* 7. Craftsmanship Section ("Crafted With Intention") */}
        <CraftsmanshipSection />

        {/* 8. Product Collection Grid with Filters & Sort */}
        <ProductCollectionGrid
          products={PRODUCTS}
          currency={currency}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={setQuickViewProduct}
          onAddToCart={(p) => handleAddToCart(p, p.sizes[0] || 'S', 1)}
          activeCategory={activeCategory}
          onChangeCategory={setActiveCategory}
        />

        {/* 9. Bridal Occasion Guide ("Find Your Perfect Look") */}
        <OccasionGuide
          onSelectOccasion={(occ) => {
            handleNavigateSection('catalog-section');
          }}
        />

        {/* 10. Customer Testimonials ("Loved by Women Who Celebrate Beautifully") */}
        <Testimonials />

        {/* 11. Instagram / Social Gallery ("Follow the MOONLIT CLOSET Edit") */}
        <InstagramGallery />

        {/* 12. Newsletter Signup ("Be First to Discover What's New") */}
        <Newsletter
          onSubscribed={(email) =>
            addToast('info', 'Subscribed', `Welcome to the MOONLIT CLOSET Gazette (${email}).`)
          }
        />
      </main>

      {/* 13. Premium Footer */}
      <Footer
        onNavigateCategory={(cat) => handleNavigateSection('catalog-section', cat)}
        onOpenConsultationModal={() => setConsultationOpen(true)}
      />

      {/* Interactive Drawers and Overlays */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        currency={currency}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onOpenCheckout={() => setCheckoutOpen(true)}
      />

      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        currency={currency}
        onRemoveFromWishlist={handleToggleWishlist}
        onMoveToBag={handleMoveToBag}
        onQuickView={setQuickViewProduct}
      />

      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        products={PRODUCTS}
        currency={currency}
        onSelectProduct={setQuickViewProduct}
      />

      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        currency={currency}
        isWishlisted={quickViewProduct ? wishlistIds.has(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cartItems={cartItems}
        currency={currency}
        onOrderComplete={handleOrderComplete}
      />

      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />

      <Toast toasts={toasts} onDismiss={removeToast} />

    </div>
  );
}
