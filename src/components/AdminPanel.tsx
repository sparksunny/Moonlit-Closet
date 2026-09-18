import React, { useState } from 'react';
import { 
  X, 
  Save, 
  Plus, 
  Trash2, 
  Edit3, 
  Upload, 
  Image as ImageIcon, 
  Lock, 
  Unlock, 
  Check, 
  AlertCircle, 
  RotateCcw,
  Sparkles,
  ShoppingBag,
  Type,
  Eye,
  Sliders,
  LogOut,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare
} from 'lucide-react';
import { Product, SiteContent, CategoryType } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  siteContent: SiteContent;
  products: Product[];
  onSave: (content: SiteContent, products: Product[]) => void;
  onResetDefaults: () => void;
  isLoggedIn: boolean;
  onLoginSuccess: () => void;
  onLogout: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  siteContent,
  products,
  onSave,
  onResetDefaults,
  isLoggedIn,
  onLoginSuccess,
  onLogout,
}) => {
  // Authentication State
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Active Tab: 'products' | 'add-product' | 'text' | 'contact' | 'images'
  const [activeTab, setActiveTab] = useState<'products' | 'add-product' | 'text' | 'contact' | 'images'>('products');

  // Automatic logout on close
  const handleCloseWithLogout = () => {
    onLogout();
    onClose();
  };

  // Working state copies
  const [editableContent, setEditableContent] = useState<SiteContent>(siteContent);
  const [editableProducts, setEditableProducts] = useState<Product[]>(products);
  const [selectedProductToEdit, setSelectedProductToEdit] = useState<Product | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [productCategoryFilter, setProductCategoryFilter] = useState<'all' | 'bridal' | 'party-wear'>('all');
  const [productSearch, setProductSearch] = useState('');

  // New Product Draft State
  const initialNewProduct: Omit<Product, 'id'> = {
    name: '',
    subtitle: '',
    category: 'bridal',
    categoryLabel: 'Bridal Collection',
    pricePKR: 185000,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: '',
    fabric: 'Pure Raw Silk & Net Dupatta',
    workType: 'Handcrafted Zardozi, Vasli, Tilla & Cutdana',
    description: 'Bespoke hand-embellished couture ensemble crafted for milestone celebrations.',
    color: '#C5A059',
    colorName: 'Champagne Gold',
    sizes: ['XS', 'S', 'M', 'L', 'Custom Measure'],
    occasion: 'reception',
    deliveryTime: '8-10 Weeks Atelier Handcrafting',
    isNew: true,
    isBestseller: false,
  };

  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>(initialNewProduct);

  // Sync props if props change and not dirty
  React.useEffect(() => {
    setEditableContent(siteContent);
  }, [siteContent]);

  React.useEffect(() => {
    setEditableProducts(products);
  }, [products]);

  if (!isOpen) return null;

  // Handle Password Submit
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'taq@123') {
      setAuthError('');
      setPasswordInput('');
      onLoginSuccess();
    } else {
      setAuthError('Incorrect Admin Password. Please enter "taq@123" to access the control panel.');
    }
  };

  // Helper to read file upload as Data URL
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>, 
    onComplete: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (loadEvt) => {
      if (loadEvt.target?.result) {
        onComplete(loadEvt.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // Save changes handler
  const handleCommitSave = () => {
    onSave(editableContent, editableProducts);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  // Add new product handler
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name.trim()) {
      alert('Please provide a product title');
      return;
    }
    const id = `${newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const productToAdd: Product = {
      ...newProduct,
      id,
      categoryLabel: newProduct.category === 'bridal' ? 'Bridal Collection' : 'Party Wear',
    };

    const updated = [productToAdd, ...editableProducts];
    setEditableProducts(updated);
    onSave(editableContent, updated);
    setNewProduct(initialNewProduct);
    setActiveTab('products');
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  // Update existing product
  const handleUpdateProduct = (updatedProd: Product) => {
    const updatedList = editableProducts.map((p) => (p.id === updatedProd.id ? updatedProd : p));
    setEditableProducts(updatedList);
    setSelectedProductToEdit(null);
  };

  // Delete product
  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Are you sure you want to remove this garment from the boutique collection?')) {
      const updatedList = editableProducts.filter((p) => p.id !== productId);
      setEditableProducts(updatedList);
    }
  };

  // Filtered product list for manager
  const filteredProducts = editableProducts.filter((p) => {
    const matchesCat = productCategoryFilter === 'all' || p.category === productCategoryFilter;
    const matchesSearch = productSearch === '' || 
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(productSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto bg-[#261A13]/80 backdrop-blur-md animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleCloseWithLogout();
        }
      }}
    >
      
      {/* If Not Logged In, Show Password Shield */}
      {!isLoggedIn ? (
        <div 
          id="admin-login-card"
          className="relative w-full max-w-md bg-[#FFFDF9] border border-[#D8C2A5] p-6 sm:p-8 rounded-[2px] shadow-2xl"
        >
          <button
            onClick={handleCloseWithLogout}
            className="absolute top-4 right-4 p-1.5 text-[#654B39] hover:text-[#3B2A20] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <div className="w-12 h-12 mx-auto mb-3 bg-[#F3E8DA] rounded-full flex items-center justify-center text-[#B99A62]">
              <Lock className="w-6 h-6 stroke-[1.5]" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#B99A62] font-semibold block mb-1">
              Atelier Management
            </span>
            <h2 className="font-serif text-2xl text-[#3B2A20] tracking-wide">
              MOONLIT CLOSET Admin
            </h2>
            <p className="text-xs text-[#654B39] mt-1 font-light">
              Enter the authorized password to edit text, customize boutique imagery, and manage the collection.
            </p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-[0.18em] font-medium text-[#3B2A20] mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <input
                  id="admin-password-input"
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setAuthError('');
                  }}
                  placeholder="Enter admin password..."
                  className="w-full px-3.5 py-2.5 bg-[#F8F1E7]/50 border border-[#D8C2A5] text-[#3B2A20] text-sm rounded-[1px] focus:outline-none focus:border-[#B99A62] transition-colors"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-xs text-[#654B39] hover:text-[#3B2A20]"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <p className="text-[10px] text-[#8C6B4B] mt-1">
                Hint: Passcode is configured as <span className="font-mono font-semibold">taq@123</span>
              </p>
            </div>

            {authError && (
              <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-[1px] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <div className="pt-2 flex items-center gap-3">
              <button
                type="submit"
                id="admin-unlock-btn"
                className="flex-1 py-3 bg-[#3B2A20] text-[#F8F1E7] text-xs uppercase tracking-[0.2em] font-medium rounded-[1px] hover:bg-[#523B2D] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Unlock className="w-4 h-4 text-[#B99A62]" />
                <span>Unlock Control Panel</span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Logged In Full Admin Workspace */
        <div 
          id="admin-control-panel-modal"
          className="relative w-full max-w-6xl max-h-[92vh] bg-[#FFFDF9] border border-[#D8C2A5] rounded-[2px] shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header Bar */}
          <div className="bg-[#3B2A20] text-[#F8F1E7] px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-[#523B2D] shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-[1px] bg-[#B99A62]/20 border border-[#B99A62]/40 flex items-center justify-center text-[#B99A62]">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-lg tracking-wider text-[#F8F1E7]">
                    MOONLIT CLOSET Control Panel
                  </h3>
                  <span className="bg-[#B99A62]/25 text-[#E4D1B8] text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-[1px] font-medium">
                    2 Categories Active
                  </span>
                </div>
                <p className="text-[10px] text-[#E4D1B8]/70 tracking-wider font-light">
                  Bridal Collection & Party Wear • Live Boutique Editor
                </p>
              </div>
            </div>

            {/* Top Action Buttons */}
            <div className="flex items-center gap-2.5">
              {saveSuccess && (
                <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#E4D1B8] font-medium animate-fade-in bg-[#523B2D] px-3 py-1.5 rounded-[1px]">
                  <Check className="w-3.5 h-3.5 text-[#B99A62]" />
                  <span>Changes Saved Live!</span>
                </span>
              )}

              {/* SAVE CHANGES BUTTON */}
              <button
                id="admin-save-changes-btn"
                onClick={handleCommitSave}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#B99A62] text-[#3B2A20] hover:bg-[#CBB07E] font-medium text-xs uppercase tracking-[0.2em] rounded-[1px] transition-all shadow-sm hover:shadow cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>

              <button
                onClick={onResetDefaults}
                title="Restore default mock data"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-[11px] text-[#E4D1B8] hover:text-white transition-colors border border-[#523B2D] rounded-[1px]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>

              {/* LOGOUT BUTTON */}
              <button
                id="admin-logout-header-btn"
                onClick={onLogout}
                title="Log out of Admin Panel"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs uppercase tracking-wider text-[#E4D1B8] hover:text-white bg-[#523B2D] hover:bg-[#654B39] border border-[#B99A62]/40 rounded-[1px] transition-colors cursor-pointer font-medium"
              >
                <LogOut className="w-3.5 h-3.5 text-[#B99A62]" />
                <span>Logout</span>
              </button>

              <button
                onClick={handleCloseWithLogout}
                className="p-2 text-[#E4D1B8] hover:text-white transition-colors cursor-pointer"
                aria-label="Close panel and logout"
                title="Close Window & Logout"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Sub-header Tabs */}
          <div className="bg-[#F8F1E7] border-b border-[#D8C2A5]/70 px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <button
                id="admin-tab-products"
                onClick={() => {
                  setActiveTab('products');
                  setSelectedProductToEdit(null);
                }}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs uppercase tracking-wider font-medium rounded-[1px] transition-colors ${
                  activeTab === 'products'
                    ? 'bg-[#3B2A20] text-[#FFFDF9]'
                    : 'text-[#654B39] hover:text-[#3B2A20] hover:bg-[#EBDDCB]'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Products & Inventory ({editableProducts.length})</span>
              </button>

              <button
                id="admin-tab-add-product"
                onClick={() => {
                  setActiveTab('add-product');
                  setSelectedProductToEdit(null);
                }}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs uppercase tracking-wider font-medium rounded-[1px] transition-colors ${
                  activeTab === 'add-product'
                    ? 'bg-[#3B2A20] text-[#FFFDF9]'
                    : 'text-[#654B39] hover:text-[#3B2A20] hover:bg-[#EBDDCB]'
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Product</span>
              </button>

              <button
                id="admin-tab-text"
                onClick={() => {
                  setActiveTab('text');
                  setSelectedProductToEdit(null);
                }}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs uppercase tracking-wider font-medium rounded-[1px] transition-colors ${
                  activeTab === 'text'
                    ? 'bg-[#3B2A20] text-[#FFFDF9]'
                    : 'text-[#654B39] hover:text-[#3B2A20] hover:bg-[#EBDDCB]'
                }`}
              >
                <Type className="w-3.5 h-3.5" />
                <span>Edit Site Texts</span>
              </button>

              <button
                id="admin-tab-contact"
                onClick={() => {
                  setActiveTab('contact');
                  setSelectedProductToEdit(null);
                }}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs uppercase tracking-wider font-medium rounded-[1px] transition-colors cursor-pointer ${
                  activeTab === 'contact'
                    ? 'bg-[#3B2A20] text-[#FFFDF9]'
                    : 'text-[#654B39] hover:text-[#3B2A20] hover:bg-[#EBDDCB]'
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Contact Us</span>
              </button>

              <button
                id="admin-tab-images"
                onClick={() => {
                  setActiveTab('images');
                  setSelectedProductToEdit(null);
                }}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs uppercase tracking-wider font-medium rounded-[1px] transition-colors ${
                  activeTab === 'images'
                    ? 'bg-[#3B2A20] text-[#FFFDF9]'
                    : 'text-[#654B39] hover:text-[#3B2A20] hover:bg-[#EBDDCB]'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Boutique Images</span>
              </button>
            </div>

            <div className="text-[11px] text-[#654B39]">
              Live in Browser • Click <span className="font-semibold text-[#3B2A20]">Save Changes</span> to commit
            </div>
          </div>

          {/* Main Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">

            {/* TAB 1: PRODUCT INVENTORY LIST & EDIT */}
            {activeTab === 'products' && (
              <div className="space-y-6">
                {/* Filter and Search Bar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 bg-[#F8F1E7] border border-[#D8C2A5]/60 rounded-[1px]">
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-wider font-medium text-[#654B39]">
                      Filter Category:
                    </span>
                    <div className="inline-flex rounded-[1px] border border-[#D8C2A5] bg-[#FFFDF9] p-0.5 text-xs">
                      <button
                        onClick={() => setProductCategoryFilter('all')}
                        className={`px-3 py-1 rounded-[1px] ${
                          productCategoryFilter === 'all'
                            ? 'bg-[#3B2A20] text-[#F8F1E7] font-medium'
                            : 'text-[#654B39]'
                        }`}
                      >
                        All ({editableProducts.length})
                      </button>
                      <button
                        onClick={() => setProductCategoryFilter('bridal')}
                        className={`px-3 py-1 rounded-[1px] ${
                          productCategoryFilter === 'bridal'
                            ? 'bg-[#3B2A20] text-[#F8F1E7] font-medium'
                            : 'text-[#654B39]'
                        }`}
                      >
                        Bridal ({editableProducts.filter(p => p.category === 'bridal').length})
                      </button>
                      <button
                        onClick={() => setProductCategoryFilter('party-wear')}
                        className={`px-3 py-1 rounded-[1px] ${
                          productCategoryFilter === 'party-wear'
                            ? 'bg-[#3B2A20] text-[#F8F1E7] font-medium'
                            : 'text-[#654B39]'
                        }`}
                      >
                        Party Wear ({editableProducts.filter(p => p.category === 'party-wear').length})
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="Search garments..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="px-3 py-1.5 bg-[#FFFDF9] border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px] focus:outline-none focus:border-[#B99A62]"
                    />
                    <button
                      onClick={() => setActiveTab('add-product')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#3B2A20] text-[#F8F1E7] text-xs uppercase tracking-wider font-medium rounded-[1px] hover:bg-[#523B2D]"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Product</span>
                    </button>
                  </div>
                </div>

                {/* Edit Modal / Inline View if a product is selected */}
                {selectedProductToEdit ? (
                  <div className="p-6 bg-[#F8F1E7] border-2 border-[#B99A62] rounded-[2px] space-y-4 shadow-md">
                    <div className="flex items-center justify-between pb-3 border-b border-[#D8C2A5]">
                      <div className="flex items-center gap-2">
                        <Edit3 className="w-4 h-4 text-[#B99A62]" />
                        <h4 className="font-serif text-lg text-[#3B2A20]">
                          Edit Garment: {selectedProductToEdit.name}
                        </h4>
                      </div>
                      <button
                        onClick={() => setSelectedProductToEdit(null)}
                        className="text-xs text-[#654B39] hover:text-[#3B2A20] uppercase tracking-wider"
                      >
                        Cancel Editing
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-medium text-[#654B39] mb-1">
                          Product Name
                        </label>
                        <input
                          type="text"
                          value={selectedProductToEdit.name}
                          onChange={(e) => setSelectedProductToEdit({ ...selectedProductToEdit, name: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px]"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-medium text-[#654B39] mb-1">
                          Category (2 Categories Only)
                        </label>
                        <select
                          value={selectedProductToEdit.category}
                          onChange={(e) => {
                            const cat = e.target.value as CategoryType;
                            setSelectedProductToEdit({
                              ...selectedProductToEdit,
                              category: cat,
                              categoryLabel: cat === 'bridal' ? 'Bridal Collection' : 'Party Wear',
                            });
                          }}
                          className="w-full px-3 py-2 bg-white border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px]"
                        >
                          <option value="bridal">Bridal Collection</option>
                          <option value="party-wear">Party Wear</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-medium text-[#654B39] mb-1">
                          Price (PKR)
                        </label>
                        <input
                          type="number"
                          value={selectedProductToEdit.pricePKR}
                          onChange={(e) => setSelectedProductToEdit({ ...selectedProductToEdit, pricePKR: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-white border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px]"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-[10px] uppercase tracking-wider font-medium text-[#654B39] mb-1">
                          Subtitle / Silhouette
                        </label>
                        <input
                          type="text"
                          value={selectedProductToEdit.subtitle}
                          onChange={(e) => setSelectedProductToEdit({ ...selectedProductToEdit, subtitle: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px]"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-medium text-[#654B39] mb-1">
                          Occasion
                        </label>
                        <select
                          value={selectedProductToEdit.occasion}
                          onChange={(e) => setSelectedProductToEdit({ ...selectedProductToEdit, occasion: e.target.value as any })}
                          className="w-full px-3 py-2 bg-white border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px]"
                        >
                          <option value="reception">Reception / Barat</option>
                          <option value="nikkah">Nikkah</option>
                          <option value="mehndi">Mehndi & Sangeet</option>
                          <option value="engagement">Engagement</option>
                          <option value="versatile">Festive & Versatile</option>
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-[10px] uppercase tracking-wider font-medium text-[#654B39] mb-1">
                          Image URL or Uploaded Photo
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={selectedProductToEdit.image}
                            onChange={(e) => setSelectedProductToEdit({ ...selectedProductToEdit, image: e.target.value })}
                            className="flex-1 px-3 py-2 bg-white border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px]"
                          />
                          <label className="inline-flex items-center gap-1 px-3 py-2 bg-[#F3E8DA] border border-[#D8C2A5] text-xs text-[#3B2A20] cursor-pointer hover:bg-[#EBDDCB] rounded-[1px]">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, (dataUrl) => {
                                setSelectedProductToEdit({ ...selectedProductToEdit, image: dataUrl });
                              })}
                            />
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-medium text-[#654B39] mb-1">
                          Image Preview
                        </label>
                        <div className="w-16 h-20 rounded-[1px] overflow-hidden border border-[#D8C2A5] bg-[#EBE0D0]">
                          <img
                            src={selectedProductToEdit.image}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      <div className="md:col-span-3">
                        <label className="block text-[10px] uppercase tracking-wider font-medium text-[#654B39] mb-1">
                          Garment Description
                        </label>
                        <textarea
                          rows={2}
                          value={selectedProductToEdit.description}
                          onChange={(e) => setSelectedProductToEdit({ ...selectedProductToEdit, description: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px]"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedProductToEdit(null)}
                        className="px-4 py-2 border border-[#654B39] text-xs text-[#654B39] rounded-[1px]"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleUpdateProduct(selectedProductToEdit)}
                        className="px-5 py-2 bg-[#3B2A20] text-[#F8F1E7] text-xs uppercase tracking-wider font-medium rounded-[1px] hover:bg-[#523B2D]"
                      >
                        Apply Updates
                      </button>
                    </div>
                  </div>
                ) : null}

                {/* Product Table */}
                <div className="bg-[#FFFDF9] border border-[#D8C2A5] rounded-[1px] overflow-hidden">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#F8F1E7] border-b border-[#D8C2A5] text-[10px] uppercase tracking-wider text-[#654B39]">
                        <th className="py-3 px-4">Garment</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Price (PKR)</th>
                        <th className="py-3 px-4">Fabric & Craft</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#D8C2A5]/40">
                      {filteredProducts.map((prod) => (
                        <tr key={prod.id} className="hover:bg-[#FAF5ED] transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={prod.image}
                                alt={prod.name}
                                className="w-12 h-16 object-cover rounded-[1px] border border-[#D8C2A5] bg-[#F3E8DA] shrink-0"
                              />
                              <div>
                                <p className="font-serif text-sm text-[#3B2A20] font-normal">
                                  {prod.name}
                                </p>
                                <p className="text-[11px] text-[#654B39] line-clamp-1">
                                  {prod.subtitle}
                                </p>
                                <span className="text-[9px] uppercase tracking-wider text-[#B99A62]">
                                  {prod.occasion}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="py-3 px-4">
                            <span className={`inline-block px-2 py-0.5 text-[10px] uppercase tracking-wider font-medium rounded-[1px] ${
                              prod.category === 'bridal'
                                ? 'bg-[#3B2A20] text-[#F8F1E7]'
                                : 'bg-[#D8C2A5]/60 text-[#3B2A20]'
                            }`}>
                              {prod.category === 'bridal' ? 'Bridal Collection' : 'Party Wear'}
                            </span>
                          </td>

                          <td className="py-3 px-4 font-mono font-medium text-[#3B2A20]">
                            ₨ {prod.pricePKR.toLocaleString()}
                          </td>

                          <td className="py-3 px-4 text-[#654B39] max-w-xs">
                            <p className="line-clamp-1">{prod.fabric}</p>
                            <p className="text-[10px] text-[#654B39]/70 line-clamp-1">{prod.workType}</p>
                          </td>

                          <td className="py-3 px-4 text-right">
                            <div className="inline-flex items-center gap-1.5">
                              <button
                                onClick={() => setSelectedProductToEdit(prod)}
                                className="p-1.5 text-[#3B2A20] hover:text-[#B99A62] transition-colors"
                                title="Edit Product"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(prod.id)}
                                className="p-1.5 text-red-700 hover:text-red-900 transition-colors"
                                title="Delete Product"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            )}

            {/* TAB 2: ADD NEW PRODUCT */}
            {activeTab === 'add-product' && (
              <form onSubmit={handleAddProduct} className="p-6 bg-[#F8F1E7] border border-[#D8C2A5] rounded-[2px] space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#D8C2A5]">
                  <div>
                    <h4 className="font-serif text-xl text-[#3B2A20]">
                      Add New Product to Atelier
                    </h4>
                    <p className="text-xs text-[#654B39] mt-0.5">
                      Enter details for your new creation in Bridal Collection or Party Wear.
                    </p>
                  </div>
                  <span className="text-[11px] uppercase tracking-wider text-[#B99A62] font-semibold">
                    New Garment Draft
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-medium text-[#3B2A20] mb-1">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Zarrin Velvet Peshwas"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px] focus:outline-none focus:border-[#B99A62]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-medium text-[#3B2A20] mb-1">
                      Target Category *
                    </label>
                    <select
                      value={newProduct.category}
                      onChange={(e) => {
                        const cat = e.target.value as CategoryType;
                        setNewProduct({
                          ...newProduct,
                          category: cat,
                          categoryLabel: cat === 'bridal' ? 'Bridal Collection' : 'Party Wear',
                        });
                      }}
                      className="w-full px-3 py-2 bg-white border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px] focus:outline-none focus:border-[#B99A62]"
                    >
                      <option value="bridal">1) Bridal Collection</option>
                      <option value="party-wear">2) Party Wear</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-medium text-[#3B2A20] mb-1">
                      Price (PKR) *
                    </label>
                    <input
                      type="number"
                      required
                      value={newProduct.pricePKR}
                      onChange={(e) => setNewProduct({ ...newProduct, pricePKR: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-white border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px] focus:outline-none focus:border-[#B99A62]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[11px] uppercase tracking-wider font-medium text-[#3B2A20] mb-1">
                      Subtitle / Cut Description
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Handcrafted Badla & Vasli Work on Crimson Silk"
                      value={newProduct.subtitle}
                      onChange={(e) => setNewProduct({ ...newProduct, subtitle: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px] focus:outline-none focus:border-[#B99A62]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-medium text-[#3B2A20] mb-1">
                      Occasion
                    </label>
                    <select
                      value={newProduct.occasion}
                      onChange={(e) => setNewProduct({ ...newProduct, occasion: e.target.value as any })}
                      className="w-full px-3 py-2 bg-white border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px]"
                    >
                      <option value="reception">Reception / Barat</option>
                      <option value="nikkah">Nikkah</option>
                      <option value="mehndi">Mehndi & Sangeet</option>
                      <option value="engagement">Engagement</option>
                      <option value="versatile">Festive & Versatile</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[11px] uppercase tracking-wider font-medium text-[#3B2A20] mb-1">
                      Product Image (URL or Upload Direct File)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Paste image URL here or click upload..."
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        className="flex-1 px-3 py-2 bg-white border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px]"
                      />
                      <label className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#3B2A20] text-[#F8F1E7] text-xs uppercase tracking-wider font-medium cursor-pointer hover:bg-[#523B2D] rounded-[1px]">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, (dataUrl) => {
                            setNewProduct({ ...newProduct, image: dataUrl });
                          })}
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-medium text-[#654B39] mb-1">
                      Image Preview
                    </label>
                    <div className="w-20 h-24 rounded-[1px] overflow-hidden border border-[#D8C2A5] bg-[#EBE0D0]">
                      {newProduct.image ? (
                        <img
                          src={newProduct.image}
                          alt="New product preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-[#654B39]">
                          No image
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-medium text-[#3B2A20] mb-1">
                      Fabric Material
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Pure Korean Raw Silk & Organza"
                      value={newProduct.fabric}
                      onChange={(e) => setNewProduct({ ...newProduct, fabric: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-medium text-[#3B2A20] mb-1">
                      Craft / Embroidery Type
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Hand Zardozi, Cutdana, Dabka"
                      value={newProduct.workType}
                      onChange={(e) => setNewProduct({ ...newProduct, workType: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-medium text-[#3B2A20] mb-1">
                      Color Description
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ivory Gold, Deep Burgundy"
                      value={newProduct.colorName}
                      onChange={(e) => setNewProduct({ ...newProduct, colorName: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px]"
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label className="block text-[11px] uppercase tracking-wider font-medium text-[#3B2A20] mb-1">
                      Full Description
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Describe the silhouette, borders, dupattas, and bespoke atelier details..."
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px]"
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#D8C2A5]">
                  <button
                    type="button"
                    onClick={() => setActiveTab('products')}
                    className="px-4 py-2.5 border border-[#654B39] text-xs text-[#654B39] rounded-[1px]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    id="admin-submit-new-product-btn"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#3B2A20] text-[#F8F1E7] text-xs uppercase tracking-[0.2em] font-medium rounded-[1px] hover:bg-[#523B2D] transition-colors"
                  >
                    <Plus className="w-4 h-4 text-[#B99A62]" />
                    <span>Publish New Product</span>
                  </button>
                </div>
              </form>
            )}

            {/* TAB 3: EDIT SITE TEXTS */}
            {activeTab === 'text' && (
              <div className="space-y-8">
                
                {/* 1. Brand Identity */}
                <div className="p-5 bg-[#F8F1E7] border border-[#D8C2A5] rounded-[1px] space-y-4">
                  <h4 className="font-serif text-lg text-[#3B2A20] border-b border-[#D8C2A5] pb-2">
                    1. Brand Name & Header Tagline
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-medium text-[#654B39] mb-1">
                        Brand Name
                      </label>
                      <input
                        type="text"
                        value={editableContent.brandName}
                        onChange={(e) => setEditableContent({ ...editableContent, brandName: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-medium text-[#654B39] mb-1">
                        Tagline / Subtext
                      </label>
                      <input
                        type="text"
                        value={editableContent.brandTagline}
                        onChange={(e) => setEditableContent({ ...editableContent, brandTagline: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px]"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Announcement Bar Messages */}
                <div className="p-5 bg-[#F8F1E7] border border-[#D8C2A5] rounded-[1px] space-y-4">
                  <div className="flex items-center justify-between border-b border-[#D8C2A5] pb-2">
                    <h4 className="font-serif text-lg text-[#3B2A20]">
                      2. Top Announcement Messages (Rotates every 5s)
                    </h4>
                    <button
                      onClick={() => {
                        const msgs = [...editableContent.announcementMessages, 'New Atelier Special Announcement'];
                        setEditableContent({ ...editableContent, announcementMessages: msgs });
                      }}
                      className="text-xs text-[#B99A62] font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Message</span>
                    </button>
                  </div>
                  <div className="space-y-2.5">
                    {editableContent.announcementMessages.map((msg, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={msg}
                          onChange={(e) => {
                            const copy = [...editableContent.announcementMessages];
                            copy[index] = e.target.value;
                            setEditableContent({ ...editableContent, announcementMessages: copy });
                          }}
                          className="flex-1 px-3 py-2 bg-white border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px]"
                        />
                        <button
                          onClick={() => {
                            const copy = editableContent.announcementMessages.filter((_, i) => i !== index);
                            setEditableContent({ ...editableContent, announcementMessages: copy });
                          }}
                          className="p-2 text-red-700 hover:text-red-900"
                          title="Delete message"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Hero Section Text */}
                <div className="p-5 bg-[#F8F1E7] border border-[#D8C2A5] rounded-[1px] space-y-4">
                  <h4 className="font-serif text-lg text-[#3B2A20] border-b border-[#D8C2A5] pb-2">
                    3. Hero Showcase Text
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-medium text-[#654B39] mb-1">
                        Eyebrow
                      </label>
                      <input
                        type="text"
                        value={editableContent.hero.eyebrow}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          hero: { ...editableContent.hero, eyebrow: e.target.value },
                        })}
                        className="w-full px-3 py-2 bg-white border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-medium text-[#654B39] mb-1">
                        Title Line 1
                      </label>
                      <input
                        type="text"
                        value={editableContent.hero.titleLine1}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          hero: { ...editableContent.hero, titleLine1: e.target.value },
                        })}
                        className="w-full px-3 py-2 bg-white border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-medium text-[#654B39] mb-1">
                        Title Highlight (Italic)
                      </label>
                      <input
                        type="text"
                        value={editableContent.hero.titleHighlight}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          hero: { ...editableContent.hero, titleHighlight: e.target.value },
                        })}
                        className="w-full px-3 py-2 bg-white border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-medium text-[#654B39] mb-1">
                        Title Line 2
                      </label>
                      <input
                        type="text"
                        value={editableContent.hero.titleLine2}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          hero: { ...editableContent.hero, titleLine2: e.target.value },
                        })}
                        className="w-full px-3 py-2 bg-white border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-medium text-[#654B39] mb-1">
                        Primary CTA Button
                      </label>
                      <input
                        type="text"
                        value={editableContent.hero.primaryButtonText}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          hero: { ...editableContent.hero, primaryButtonText: e.target.value },
                        })}
                        className="w-full px-3 py-2 bg-white border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-medium text-[#654B39] mb-1">
                        Secondary CTA Button
                      </label>
                      <input
                        type="text"
                        value={editableContent.hero.secondaryButtonText}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          hero: { ...editableContent.hero, secondaryButtonText: e.target.value },
                        })}
                        className="w-full px-3 py-2 bg-white border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px]"
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block text-[10px] uppercase tracking-wider font-medium text-[#654B39] mb-1">
                        Hero Description
                      </label>
                      <textarea
                        rows={2}
                        value={editableContent.hero.description}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          hero: { ...editableContent.hero, description: e.target.value },
                        })}
                        className="w-full px-3 py-2 bg-white border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px]"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Editorial Section Text */}
                <div className="p-5 bg-[#F8F1E7] border border-[#D8C2A5] rounded-[1px] space-y-4">
                  <h4 className="font-serif text-lg text-[#3B2A20] border-b border-[#D8C2A5] pb-2">
                    4. Editorial Craftsmanship Section
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-medium text-[#654B39] mb-1">
                        Editorial Heading
                      </label>
                      <input
                        type="text"
                        value={editableContent.editorial.title}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          editorial: { ...editableContent.editorial, title: e.target.value },
                        })}
                        className="w-full px-3 py-2 bg-white border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-medium text-[#654B39] mb-1">
                        Artisan Location Label
                      </label>
                      <input
                        type="text"
                        value={editableContent.editorial.artisanLocation}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          editorial: { ...editableContent.editorial, artisanLocation: e.target.value },
                        })}
                        className="w-full px-3 py-2 bg-white border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px]"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] uppercase tracking-wider font-medium text-[#654B39] mb-1">
                        Lead Editorial Paragraph
                      </label>
                      <textarea
                        rows={2}
                        value={editableContent.editorial.leadParagraph}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          editorial: { ...editableContent.editorial, leadParagraph: e.target.value },
                        })}
                        className="w-full px-3 py-2 bg-white border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px]"
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION 6: CONTACT US SECTION TEXTS */}
                <div className="p-5 bg-white border border-[#D8C2A5] rounded-[1px] space-y-4">
                  <div className="flex items-center justify-between border-b border-[#D8C2A5] pb-2">
                    <h5 className="font-serif text-base text-[#3B2A20] font-medium flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#B99A62]" />
                      <span>Section 6: Contact Us & Concierge Details</span>
                    </h5>
                    <button
                      onClick={() => setActiveTab('contact')}
                      className="text-xs text-[#B99A62] hover:underline cursor-pointer"
                    >
                      Open Dedicated Contact Manager →
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-medium text-[#654B39] mb-1">
                        Contact Eyebrow
                      </label>
                      <input
                        type="text"
                        value={editableContent.contact.eyebrow || ''}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          contact: { ...editableContent.contact, eyebrow: e.target.value },
                        })}
                        className="w-full px-3 py-2 bg-white border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-medium text-[#654B39] mb-1">
                        Contact Title
                      </label>
                      <input
                        type="text"
                        value={editableContent.contact.title || ''}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          contact: { ...editableContent.contact, title: e.target.value },
                        })}
                        className="w-full px-3 py-2 bg-white border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px]"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] uppercase tracking-wider font-medium text-[#654B39] mb-1">
                        Contact Introduction
                      </label>
                      <textarea
                        rows={2}
                        value={editableContent.contact.description || ''}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          contact: { ...editableContent.contact, description: e.target.value },
                        })}
                        className="w-full px-3 py-2 bg-white border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-medium text-[#654B39] mb-1">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        value={editableContent.contact.phone || ''}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          contact: { ...editableContent.contact, phone: e.target.value },
                        })}
                        className="w-full px-3 py-2 bg-white border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-medium text-[#654B39] mb-1">
                        WhatsApp Number
                      </label>
                      <input
                        type="text"
                        value={editableContent.contact.whatsapp || ''}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          contact: { ...editableContent.contact, whatsapp: e.target.value },
                        })}
                        className="w-full px-3 py-2 bg-white border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px]"
                      />
                    </div>
                  </div>
                </div>

                {/* Save Changes Floating CTA */}
                <div className="flex justify-end pt-4">
                  <button
                    onClick={handleCommitSave}
                    className="inline-flex items-center gap-2 px-7 py-3 bg-[#B99A62] text-[#3B2A20] hover:bg-[#CBB07E] font-medium text-xs uppercase tracking-[0.2em] rounded-[1px] transition-all shadow-md cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save All Text Changes</span>
                  </button>
                </div>

              </div>
            )}

            {/* TAB: CONTACT US DEDICATED MANAGER */}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                {/* Intro Header */}
                <div className="p-4 bg-[#F8F1E7] border border-[#D8C2A5] rounded-[1px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-serif text-lg text-[#3B2A20] flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#B99A62]" />
                      <span>Contact Us & Atelier Concierge Settings</span>
                    </h4>
                    <p className="text-xs text-[#654B39] mt-0.5">
                      Control the contact section shown on your store: physical address, direct phone, WhatsApp concierge, email, and consultation hours.
                    </p>
                  </div>
                  <button
                    onClick={handleCommitSave}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#B99A62] text-[#3B2A20] hover:bg-[#CBB07E] font-medium text-xs uppercase tracking-[0.2em] rounded-[1px] transition-all shadow-sm shrink-0 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Contact Details</span>
                  </button>
                </div>

                {/* 2-Column Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Left Column: Headings & Intro */}
                  <div className="p-5 bg-white border border-[#D8C2A5] rounded-[1px] space-y-4">
                    <h5 className="font-serif text-base text-[#3B2A20] border-b border-[#D8C2A5] pb-2 font-medium flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-[#B99A62]" />
                      <span>Headings & Messaging</span>
                    </h5>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-medium text-[#654B39] mb-1">
                        Section Eyebrow Badge
                      </label>
                      <input
                        type="text"
                        value={editableContent.contact.eyebrow}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          contact: { ...editableContent.contact, eyebrow: e.target.value },
                        })}
                        placeholder="Private Atelier & Bridal Concierge"
                        className="w-full px-3 py-2 bg-white border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-medium text-[#654B39] mb-1">
                        Main Section Title
                      </label>
                      <input
                        type="text"
                        value={editableContent.contact.title}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          contact: { ...editableContent.contact, title: e.target.value },
                        })}
                        placeholder="Contact MOONLIT CLOSET"
                        className="w-full px-3 py-2 bg-white border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-medium text-[#654B39] mb-1">
                        Introduction / Description Text
                      </label>
                      <textarea
                        rows={3}
                        value={editableContent.contact.description}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          contact: { ...editableContent.contact, description: e.target.value },
                        })}
                        placeholder="Whether commissioning bespoke bridal couture or selecting tailored festive party wear..."
                        className="w-full px-3 py-2 bg-white border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-medium text-[#654B39] mb-1">
                        Private Appointment / Consultation Note
                      </label>
                      <textarea
                        rows={2}
                        value={editableContent.contact.consultationNote}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          contact: { ...editableContent.contact, consultationNote: e.target.value },
                        })}
                        placeholder="Private bridal trials and bespoke measurement appointments are scheduled on an individual basis."
                        className="w-full px-3 py-2 bg-white border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px]"
                      />
                    </div>
                  </div>

                  {/* Right Column: Direct Contact & Location */}
                  <div className="p-5 bg-white border border-[#D8C2A5] rounded-[1px] space-y-4">
                    <h5 className="font-serif text-base text-[#3B2A20] border-b border-[#D8C2A5] pb-2 font-medium flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#B99A62]" />
                      <span>Contact Channels & Location</span>
                    </h5>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-medium text-[#654B39] mb-1">
                          Direct Atelier Phone
                        </label>
                        <input
                          type="text"
                          value={editableContent.contact.phone || ''}
                          onChange={(e) => setEditableContent({
                            ...editableContent,
                            contact: { ...editableContent.contact, phone: e.target.value },
                          })}
                          placeholder="+1 716-313-1615"
                          className="w-full px-3 py-2 bg-white border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px]"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-medium text-[#654B39] mb-1">
                          WhatsApp Concierge
                        </label>
                        <input
                          type="text"
                          value={editableContent.contact.whatsapp || ''}
                          onChange={(e) => setEditableContent({
                            ...editableContent,
                            contact: { ...editableContent.contact, whatsapp: e.target.value },
                          })}
                          placeholder="+1 716-313-1615"
                          className="w-full px-3 py-2 bg-white border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-medium text-[#654B39] mb-1">
                          Concierge Email Address
                        </label>
                        <input
                          type="email"
                          value={editableContent.contact.email || ''}
                          onChange={(e) => setEditableContent({
                            ...editableContent,
                            contact: { ...editableContent.contact, email: e.target.value },
                          })}
                          placeholder="moonlitgemjewels@gmail.com"
                          className="w-full px-3 py-2 bg-white border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px]"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-medium text-[#654B39] mb-1">
                          Instagram Profile
                        </label>
                        <input
                          type="text"
                          value={editableContent.contact.instagram || ''}
                          onChange={(e) => setEditableContent({
                            ...editableContent,
                            contact: { ...editableContent.contact, instagram: e.target.value },
                          })}
                          placeholder="@moonlitcloset"
                          className="w-full px-3 py-2 bg-white border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-medium text-[#654B39] mb-1">
                        Atelier Physical Address
                      </label>
                      <input
                        type="text"
                        value={editableContent.contact.address || ''}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          contact: { ...editableContent.contact, address: e.target.value },
                        })}
                        placeholder="Houston / Florida USA"
                        className="w-full px-3 py-2 bg-white border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-medium text-[#654B39] mb-1">
                        Operating / Consultation Timings
                      </label>
                      <input
                        type="text"
                        value={editableContent.contact.timings || ''}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          contact: { ...editableContent.contact, timings: e.target.value },
                        })}
                        placeholder="10:00 AM – 8:00 PM"
                        className="w-full px-3 py-2 bg-white border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px]"
                      />
                    </div>
                  </div>

                </div>

                {/* Live Preview Card */}
                <div className="p-5 bg-[#F8F1E7] border border-[#D8C2A5] rounded-[1px] space-y-3">
                  <div className="flex items-center justify-between border-b border-[#D8C2A5]/60 pb-2">
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#3B2A20]">
                      Live Storefront Card Preview
                    </span>
                    <span className="text-[10px] text-[#B99A62] uppercase tracking-wider font-medium">Auto Updates</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                    <div className="p-3 bg-white border border-[#D8C2A5] rounded-[1px] text-xs space-y-1">
                      <span className="font-semibold text-[#3B2A20] block flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#B99A62]" />
                        <span>Address</span>
                      </span>
                      <p className="text-[#654B39] text-[11px]">{editableContent.contact.address}</p>
                    </div>
                    <div className="p-3 bg-white border border-[#D8C2A5] rounded-[1px] text-xs space-y-1">
                      <span className="font-semibold text-[#3B2A20] block flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#B99A62]" />
                        <span>Direct Channels</span>
                      </span>
                      <p className="text-[#654B39] text-[11px]">Phone: {editableContent.contact.phone}</p>
                      <p className="text-[#654B39] text-[11px]">WhatsApp: {editableContent.contact.whatsapp}</p>
                    </div>
                    <div className="p-3 bg-white border border-[#D8C2A5] rounded-[1px] text-xs space-y-1">
                      <span className="font-semibold text-[#3B2A20] block flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#B99A62]" />
                        <span>Timings & Email</span>
                      </span>
                      <p className="text-[#654B39] text-[11px]">{editableContent.contact.timings}</p>
                      <p className="text-[#B99A62] text-[11px] font-medium">{editableContent.contact.email}</p>
                    </div>
                  </div>
                </div>

                {/* Save CTA */}
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleCommitSave}
                    className="inline-flex items-center gap-2 px-7 py-3 bg-[#B99A62] text-[#3B2A20] hover:bg-[#CBB07E] font-medium text-xs uppercase tracking-[0.2em] rounded-[1px] transition-all shadow-md cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Contact Changes Live</span>
                  </button>
                </div>

              </div>
            )}

            {/* TAB 4: BOUTIQUE IMAGES MANAGER */}
            {activeTab === 'images' && (
              <div className="space-y-6">
                <div className="p-4 bg-[#F8F1E7] border border-[#D8C2A5] rounded-[1px]">
                  <h4 className="font-serif text-lg text-[#3B2A20] mb-1">
                    Boutique Image Customizer
                  </h4>
                  <p className="text-xs text-[#654B39]">
                    Easily replace any banner or editorial photo across the site by entering an image URL or uploading from your local computer.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Hero Banner Image */}
                  <div className="p-4 bg-white border border-[#D8C2A5] rounded-[1px] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider font-semibold text-[#3B2A20]">
                        Hero Editorial Main Image
                      </span>
                      <span className="text-[10px] text-[#B99A62] uppercase tracking-wider">Homepage Banner</span>
                    </div>
                    <div className="aspect-[4/3] rounded-[1px] overflow-hidden border border-[#D8C2A5] bg-[#F3E8DA]">
                      <img
                        src={editableContent.hero.image}
                        alt="Hero preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editableContent.hero.image}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          hero: { ...editableContent.hero, image: e.target.value }
                        })}
                        placeholder="Image URL..."
                        className="flex-1 px-3 py-1.5 border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px]"
                      />
                      <label className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#3B2A20] text-[#F8F1E7] text-xs uppercase tracking-wider cursor-pointer hover:bg-[#523B2D] rounded-[1px]">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, (dataUrl) => {
                            setEditableContent({
                              ...editableContent,
                              hero: { ...editableContent.hero, image: dataUrl }
                            });
                          })}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Bridal Collection Banner */}
                  <div className="p-4 bg-white border border-[#D8C2A5] rounded-[1px] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider font-semibold text-[#3B2A20]">
                        1) Bridal Collection Card Image
                      </span>
                      <span className="text-[10px] text-[#B99A62] uppercase tracking-wider">Featured Section</span>
                    </div>
                    <div className="aspect-[4/3] rounded-[1px] overflow-hidden border border-[#D8C2A5] bg-[#F3E8DA]">
                      <img
                        src={editableContent.featuredCollections.bridalImage}
                        alt="Bridal card preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editableContent.featuredCollections.bridalImage}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          featuredCollections: { ...editableContent.featuredCollections, bridalImage: e.target.value }
                        })}
                        placeholder="Image URL..."
                        className="flex-1 px-3 py-1.5 border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px]"
                      />
                      <label className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#3B2A20] text-[#F8F1E7] text-xs uppercase tracking-wider cursor-pointer hover:bg-[#523B2D] rounded-[1px]">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, (dataUrl) => {
                            setEditableContent({
                              ...editableContent,
                              featuredCollections: { ...editableContent.featuredCollections, bridalImage: dataUrl }
                            });
                          })}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Party Wear Banner */}
                  <div className="p-4 bg-white border border-[#D8C2A5] rounded-[1px] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider font-semibold text-[#3B2A20]">
                        2) Party Wear Card Image
                      </span>
                      <span className="text-[10px] text-[#B99A62] uppercase tracking-wider">Featured Section</span>
                    </div>
                    <div className="aspect-[4/3] rounded-[1px] overflow-hidden border border-[#D8C2A5] bg-[#F3E8DA]">
                      <img
                        src={editableContent.featuredCollections.partyWearImage}
                        alt="Party wear card preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editableContent.featuredCollections.partyWearImage}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          featuredCollections: { ...editableContent.featuredCollections, partyWearImage: e.target.value }
                        })}
                        placeholder="Image URL..."
                        className="flex-1 px-3 py-1.5 border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px]"
                      />
                      <label className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#3B2A20] text-[#F8F1E7] text-xs uppercase tracking-wider cursor-pointer hover:bg-[#523B2D] rounded-[1px]">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, (dataUrl) => {
                            setEditableContent({
                              ...editableContent,
                              featuredCollections: { ...editableContent.featuredCollections, partyWearImage: dataUrl }
                            });
                          })}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Bridal Editorial Portrait */}
                  <div className="p-4 bg-white border border-[#D8C2A5] rounded-[1px] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider font-semibold text-[#3B2A20]">
                        Art of Craft Editorial Portrait
                      </span>
                      <span className="text-[10px] text-[#B99A62] uppercase tracking-wider">Craftsmanship</span>
                    </div>
                    <div className="aspect-[4/3] rounded-[1px] overflow-hidden border border-[#D8C2A5] bg-[#F3E8DA]">
                      <img
                        src={editableContent.editorial.image}
                        alt="Editorial preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editableContent.editorial.image}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          editorial: { ...editableContent.editorial, image: e.target.value }
                        })}
                        placeholder="Image URL..."
                        className="flex-1 px-3 py-1.5 border border-[#D8C2A5] text-xs text-[#3B2A20] rounded-[1px]"
                      />
                      <label className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#3B2A20] text-[#F8F1E7] text-xs uppercase tracking-wider cursor-pointer hover:bg-[#523B2D] rounded-[1px]">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, (dataUrl) => {
                            setEditableContent({
                              ...editableContent,
                              editorial: { ...editableContent.editorial, image: dataUrl }
                            });
                          })}
                        />
                      </label>
                    </div>
                  </div>

                </div>

                {/* Save Changes Floating CTA */}
                <div className="flex justify-end pt-4">
                  <button
                    onClick={handleCommitSave}
                    className="inline-flex items-center gap-2 px-7 py-3 bg-[#B99A62] text-[#3B2A20] hover:bg-[#CBB07E] font-medium text-xs uppercase tracking-[0.2em] rounded-[1px] transition-all shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save All Image Changes</span>
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Footer Save Bar */}
          <div className="bg-[#F8F1E7] border-t border-[#D8C2A5] px-6 py-3.5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 text-xs text-[#654B39]">
              <Lock className="w-3.5 h-3.5 text-[#B99A62]" />
              <span>Password Authenticated session (<span className="font-mono text-[#3B2A20]">taq@123</span>)</span>
            </div>

            <div className="flex items-center gap-3">
              {/* Explicit Logout Button in Footer */}
              <button
                id="admin-logout-footer-btn"
                onClick={onLogout}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-red-800/40 text-xs uppercase tracking-wider text-red-700 hover:bg-red-50 rounded-[1px] transition-colors cursor-pointer font-medium"
              >
                <LogOut className="w-3.5 h-3.5 text-red-600" />
                <span>Logout</span>
              </button>
              <button
                onClick={handleCloseWithLogout}
                className="px-4 py-2 border border-[#654B39] text-xs uppercase tracking-wider text-[#3B2A20] hover:bg-white rounded-[1px] transition-colors cursor-pointer"
              >
                Close & Logout
              </button>
              <button
                id="admin-footer-save-btn"
                onClick={handleCommitSave}
                className="inline-flex items-center gap-2 px-6 py-2 bg-[#3B2A20] text-[#F8F1E7] hover:bg-[#523B2D] text-xs uppercase tracking-[0.2em] font-medium rounded-[1px] transition-all shadow-sm cursor-pointer"
              >
                <Save className="w-4 h-4 text-[#B99A62]" />
                <span>Save changes</span>
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
