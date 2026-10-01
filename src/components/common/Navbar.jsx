import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, ArrowLeft } from 'lucide-react';
import Logo from './Logo';

export default function Navbar({ 
  currentPage, 
  setCurrentPage,
  cartCount = 0,
  openCartDrawer,
  onBackToProducts
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (pageId) => {
    setMobileMenuOpen(false);
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      className={`sticky top-0 z-40 transition-all duration-300 bg-[#cf2037] text-white shadow-md ${
        isScrolled ? 'py-2.5 shadow-lg shadow-black/15' : 'py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Tarah Official Logo & Back Navigation if on PDP */}
          <div className="flex items-center gap-3">
            {currentPage === 'product-detail' && (
              <button
                onClick={onBackToProducts || (() => handleNavClick('products'))}
                className="p-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer mr-1"
                title="Back to Catalog"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}

            <button 
              onClick={() => handleNavClick('products')}
              className="flex items-center cursor-pointer text-left transition-transform hover:scale-[1.02]"
              aria-label="Tarah Advertising Products"
            >
              <Logo className="h-8 sm:h-9" variant="white" />
            </button>
          </div>

          {/* Center Navigation Links: Products */}
          <nav className="hidden md:flex items-center gap-2">
            <button
              onClick={() => handleNavClick('products')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-150 cursor-pointer ${
                currentPage === 'products'
                  ? 'bg-white text-[#cf2037] shadow-xs'
                  : 'text-white hover:bg-white/15'
              }`}
            >
              All Products
            </button>
          </nav>

          {/* Right Action: Cart Drawer Trigger */}
          <div className="flex items-center gap-2.5">
            {/* Tarah Red Cart Button with Live Counter */}
            <button
              onClick={openCartDrawer}
              className="relative flex items-center gap-2 bg-white hover:bg-slate-50 text-[#111827] px-3.5 py-2 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer font-bold text-xs sm:text-sm"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-[#cf2037]" />
              <span className="hidden sm:inline">Cart</span>
              
              {cartCount > 0 ? (
                <span className="bg-[#cf2037] text-white font-extrabold text-xs px-2 py-0.5 rounded-full shadow-2xs">
                  {cartCount}
                </span>
              ) : (
                <span className="bg-slate-200 text-slate-700 font-bold text-xs px-1.5 py-0.5 rounded-full">
                  0
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#b5182c] border-t border-white/20 px-4 pt-3 pb-4 animate-in slide-in-from-top-3 duration-200 text-white shadow-xl">
          <div className="space-y-2">
            <button
              onClick={() => handleNavClick('products')}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                currentPage === 'products' ? 'bg-white text-[#cf2037] font-bold' : 'hover:bg-white/15 text-white'
              }`}
            >
              <span>Products Catalog</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (openCartDrawer) openCartDrawer();
              }}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-white/15 text-white cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                <span>View Cart ({cartCount})</span>
              </span>
              {cartCount > 0 && (
                <span className="bg-white text-[#cf2037] font-extrabold text-xs px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
