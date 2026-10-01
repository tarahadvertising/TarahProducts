import React, { useState, useEffect } from 'react';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import QuoteDrawer from './components/common/QuoteDrawer';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import { MessageSquare, ShoppingBag, Phone } from 'lucide-react';
import { getGeneralInquiryWhatsAppUrl } from './utils/whatsapp';
import { companyInfo } from './data/company';

export default function App() {
  const [currentPage, setCurrentPage] = useState('products'); // 'products', 'product-detail'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('tarah_rfq_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync cart items to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tarah_rfq_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }
  }, [cartItems]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleOpenProduct = (product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToProducts = () => {
    setCurrentPage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (productToAdd) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.id === productToAdd.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = (updated[existingIndex].quantity || 1) + (productToAdd.quantity || 1);
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty
        };
        showToast(`Updated "${productToAdd.name}" quantity to ${newQty}!`);
        return updated;
      } else {
        showToast(`Added "${productToAdd.name}" to cart!`);
        return [...prev, {
          ...productToAdd,
          quantity: productToAdd.quantity || 1
        }];
      }
    });
    // Open cart drawer so user sees the addition
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
    showToast("Item removed from cart");
  };

  const handleUpdateCartQty = (productId, newQty) => {
    const qtyNum = Number(newQty);
    if (qtyNum <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems(prev => prev.map(item => {
      if (item.id === productId) {
        return { ...item, quantity: qtyNum };
      }
      return item;
    }));
  };

  const handleClearCart = () => {
    setCartItems([]);
    showToast("Cleared cart");
  };

  const handleNavigateToProducts = (categoryId = 'all') => {
    setSelectedCategory(categoryId);
    setCurrentPage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f7f7fa] text-[#1a1a1a] flex flex-col font-sans selection:bg-[#cf2037] selection:text-white pb-16 sm:pb-0">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 bg-[#111827] border border-[#cf2037] text-white text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-3">
          <span className="w-2 h-2 rounded-full bg-[#cf2037]"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navbar with Live Cart Counter */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cartCount={cartItems.reduce((acc, i) => acc + (Number(i.quantity) || 1), 0)}
        openCartDrawer={() => setIsCartOpen(true)}
        onBackToProducts={handleBackToProducts}
      />

      {/* Page Content: Product Detail Page OR Catalog Page */}
      <main className="flex-1">
        {currentPage === 'product-detail' && selectedProduct ? (
          <ProductDetailPage
            product={selectedProduct}
            onBack={handleBackToProducts}
            onAddToCart={handleAddToCart}
            onOpenProduct={handleOpenProduct}
          />
        ) : (
          <ProductsPage
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onOpenProduct={handleOpenProduct}
            onAddToCart={handleAddToCart}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        setCurrentPage={handleNavigateToProducts}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Shopping Cart Drawer (Checkout via WhatsApp) */}
      <QuoteDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQty={handleUpdateCartQty}
        onClearCart={handleClearCart}
        onNavigateToProducts={() => {
          setIsCartOpen(false);
          handleNavigateToProducts('all');
        }}
      />

      {/* Mobile Bottom Fixed Quick-Action Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-2 flex items-center justify-between gap-2 shadow-2xl">
        <a
          href={getGeneralInquiryWhatsAppUrl("Mobile Quick WhatsApp Inquiry")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-[#25d366] hover:bg-[#20ba59] text-white font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-emerald-700/20"
        >
          <MessageSquare className="w-4 h-4 fill-white" />
          <span>WhatsApp Inquiry</span>
        </a>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative bg-slate-100 hover:bg-slate-200 border border-slate-300 text-[#111827] p-2.5 rounded-xl flex items-center justify-center shrink-0 cursor-pointer"
          aria-label="View Shopping Cart"
        >
          <ShoppingBag className="w-5 h-5 text-slate-700" />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#cf2037] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-2xs">
              {cartItems.reduce((acc, i) => acc + (Number(i.quantity) || 1), 0)}
            </span>
          )}
        </button>

        <a
          href={`tel:${companyInfo.phoneRaw}`}
          className="bg-red-50 hover:bg-red-100 border border-red-200 text-[#cf2037] p-2.5 rounded-xl flex items-center justify-center shrink-0"
          aria-label="Call Tarah office"
        >
          <Phone className="w-5 h-5" />
        </a>
      </div>

    </div>
  );
}
