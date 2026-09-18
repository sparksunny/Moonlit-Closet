import React, { useState, useEffect } from 'react';
import { PRODUCTS } from './data/products';
import { DEFAULT_SITE_CONTENT } from './data/defaultSiteContent';
import { Product, CartItem, CategoryType, OccasionType, SiteContent } from './types';
import { Currency } from './utils/formatters';

import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeaturedCollections } from './components/FeaturedCollections';
import { BridalEditorial } from './components/BridalEditorial';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { ProductCollectionGrid } from './components/ProductCollectionGrid';
import { OccasionGuide } from './components/OccasionGuide';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';

import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchOverlay } from './components/SearchOverlay';
import { QuickViewModal } from './components/QuickViewModal';
import { CheckoutModal } from './components/CheckoutModal';
import { ConsultationModal } from './components/ConsultationModal';
import { AdminPanel } from './components/AdminPanel';
import { Toast, ToastMessage } from './components/Toast';
import { Sparkles } from 'lucide-react';

export default function App() {
  // Global State
  const [currency, setCurrency] = useState<Currency>('PKR');
  
  // Dynamic Products State with LocalStorage Persistence
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('moonlit_closet_products');
      return saved ? JSON.parse(saved) : PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

  // Dynamic Site Content State with LocalStorage Persistence and safe deep merge
  const [siteContent, setSiteContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem('moonlit_closet_site_content');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_SITE_CONTENT,
          ...parsed,
          contact: {
            ...DEFAULT_SITE_CONTENT.contact,
            ...(parsed.contact || {}),
          },
          hero: {
            ...DEFAULT_SITE_CONTENT.hero,
            ...(parsed.hero || {}),
          },
          editorial: {
            ...DEFAULT_SITE_CONTENT.editorial,
            ...(parsed.editorial || {}),
          },
          featuredCollections: {
            ...DEFAULT_SITE_CONTENT.featuredCollections,
            ...(parsed.featuredCollections || {}),
          },
          wardrobe: {
            ...DEFAULT_SITE_CONTENT.wardrobe,
            ...(parsed.wardrobe || {}),
          },
        };
      }
      return DEFAULT_SITE_CONTENT;
    } catch {
      return DEFAULT_SITE_CONTENT;
    }
  });

  // Admin Control Panel & Authentication State (Password = "taq@123")
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('moonlit_admin_auth') === 'true';
    } catch {
      return false;
    }
  });
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);

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
      localStorage.setItem('moonlit_closet_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [cartItems]);

  // Sync Wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('moonlit_closet_wishlist', JSON.stringify(Array.from(wishlistIds)));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [wishlistIds]);

  const addToast = (type: 'cart' | 'wishlist' | 'info', title: string, message: string) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Admin Operations: Save Changes
  const handleSaveAdminData = (newContent: SiteContent, newProducts: Product[]) => {
    setSiteContent(newContent);
    setProducts(newProducts);
    try {
      localStorage.setItem('moonlit_closet_site_content', JSON.stringify(newContent));
      localStorage.setItem('moonlit_closet_products', JSON.stringify(newProducts));
      addToast('info', 'Changes Saved Live', 'Website texts, imagery, and products have been saved.');
    } catch (e) {
      console.error('LocalStorage write error:', e);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all website texts, images, and products back to atelier defaults?')) {
      setSiteContent(DEFAULT_SITE_CONTENT);
      setProducts(PRODUCTS);
      try {
        localStorage.removeItem('moonlit_closet_site_content');
        localStorage.removeItem('moonlit_closet_products');
        addToast('info', 'Reset to Defaults', 'Default boutique content and products restored.');
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
    try {
      sessionStorage.setItem('moonlit_admin_auth', 'true');
    } catch (e) {
      console.warn(e);
    }
    addToast('info', 'Admin Access Granted', 'Welcome to the MOONLIT CLOSET Atelier Control Panel.');
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    try {
      sessionStorage.removeItem('moonlit_admin_auth');
    } catch (e) {
      console.warn(e);
    }
    addToast('info', 'Admin Session Locked', 'Control panel is now locked.');
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
  const wishlistProducts = products.filter((p) => wishlistIds.has(p.id));

  return (
    <div className="min-h-screen bg-[#F8F1E7] text-[#3B2A20] flex flex-col font-sans relative">
      
      {/* 1. Announcement Bar */}
      <AnnouncementBar
        messages={siteContent.announcementMessages}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenAdmin={() => setAdminPanelOpen(true)}
      />

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
        onOpenAdmin={() => setAdminPanelOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
        brandName={siteContent.brandName}
        brandTagline={siteContent.brandTagline}
      />

      <main className="flex-1">
        {/* 3. Hero Section */}
        <Hero
          onExploreBridal={() => handleNavigateSection('bridal-collection-section', 'bridal')}
          onViewCollection={() => handleNavigateSection('party-wear-section', 'party-wear')}
          content={siteContent.hero}
        />

        {/* 4. Featured Collections ("Curated for Your Moment - 2 Categories") */}
        <FeaturedCollections
          onSelectCollection={(cat) => handleNavigateSection(cat === 'bridal' ? 'bridal-collection-section' : 'party-wear-section', cat)}
          content={siteContent.featuredCollections}
        />

        {/* 5. Bridal Editorial Section ("The Art of Craft") */}
        <BridalEditorial
          onDiscoverCraft={() => handleNavigateSection('craftsmanship-section')}
          content={siteContent.editorial}
        />

        {/* 6. Craftsmanship Section ("Crafted With Intention") */}
        <CraftsmanshipSection />

        {/* 7. Product Showcase: 2 Sections & 2 Groups ("Bridal Collection" and "Party Wear") */}
        <ProductCollectionGrid
          products={products}
          currency={currency}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={setQuickViewProduct}
          onAddToCart={(p) => handleAddToCart(p, p.sizes[0] || 'S', 1)}
          activeCategory={activeCategory}
          onChangeCategory={setActiveCategory}
          content={siteContent.wardrobe}
        />

        {/* 9. Bridal Occasion Guide ("Find Your Perfect Look") */}
        <OccasionGuide
          onSelectOccasion={(occ) => {
            handleNavigateSection('catalog-section');
          }}
        />

        {/* 10. Customer Testimonials ("Loved by Women Who Celebrate Beautifully") */}
        <Testimonials />
      </main>

      {/* 13. Page Footer matching all requested specifications */}
      <Footer
        onNavigateCategory={(cat) => handleNavigateSection('catalog-section', cat)}
        onNavigateSection={handleNavigateSection}
        onOpenConsultationModal={() => setConsultationOpen(true)}
        content={siteContent}
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
        products={products}
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

      {/* Admin Control Panel Modal */}
      <AdminPanel
        isOpen={adminPanelOpen}
        onClose={() => {
          handleAdminLogout();
          setAdminPanelOpen(false);
        }}
        siteContent={siteContent}
        products={products}
        onSave={handleSaveAdminData}
        onResetDefaults={handleResetDefaults}
        isLoggedIn={isAdminLoggedIn}
        onLoginSuccess={handleAdminLogin}
        onLogout={handleAdminLogout}
      />

      <Toast toasts={toasts} onDismiss={removeToast} />

    </div>
  );
}
