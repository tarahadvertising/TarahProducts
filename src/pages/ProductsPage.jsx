import React, { useMemo } from 'react';
import { MessageSquare, Search } from 'lucide-react';
import ProductCard from '../components/products/ProductCard';
import { products } from '../data/products';
import { getGeneralInquiryWhatsAppUrl } from '../utils/whatsapp';

export default function ProductsPage({
  selectedCategory = 'all',
  setSelectedCategory,
  onOpenProduct,
  onAddToCart
}) {
  // Filter by category if passed from navbar/footer
  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (selectedCategory && selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }
    return result;
  }, [selectedCategory]);
  return (
    <div className="min-h-screen bg-[#f7f7fa] text-[#1a1a1a]">
      
      {/* Full-Width Tarah Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-12 sm:py-16 md:py-20 border-b border-red-800 shadow-md">
        
        {/* Background Image & Light Overlay Layers */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/images/hero-bg.jpg"
            alt="Tarah Advertising Hero Background"
            className="w-full h-full object-cover object-center opacity-90"
          />
          {/* Subtle Dark & Red Gradient to ensure text readability without hiding image */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>

        {/* Hero Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Headline, Subtitle & WhatsApp CTA */}
            <div className="lg:col-span-8 space-y-3 sm:space-y-4 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight drop-shadow-md">
                Premium Corporate Gifts, <br className="hidden sm:inline" />
                Signage &amp; Displays
              </h1>

              <p className="text-xs sm:text-sm md:text-base text-white/95 font-medium max-w-2xl leading-relaxed drop-shadow-sm">
                Dubai&apos;s direct factory production with express dispatch across the UAE.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <a
                  href={getGeneralInquiryWhatsAppUrl("Catalog Hero Inquiry")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#cf2037] hover:bg-[#b0162a] text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-xl shadow-black/30 transition-all hover:scale-105 active:scale-95 cursor-pointer border border-white/20"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Instant WhatsApp Quote</span>
                </a>
              </div>
            </div>

            {/* Right Column: Decorative Brand Accent */}
            <div className="hidden lg:flex lg:col-span-4 justify-end opacity-80 pointer-events-none">
              <img 
                src="/service_bg.svg" 
                alt="" 
                className="w-full max-w-xs h-auto object-contain filter invert brightness-200 opacity-30"
                aria-hidden="true"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Main Catalog Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">

        {/* Products Grid: 4 Columns */}
        {filteredProducts.length === 0 ? (
          <div className="py-12 text-center bg-white border border-dashed border-slate-300 rounded-2xl p-6 space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#111827]">
                No products found
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-0.5">
                There are no products available in this category.
              </p>
            </div>
            {selectedCategory !== 'all' && (
              <button
                onClick={() => setSelectedCategory && setSelectedCategory('all')}
                className="bg-[#cf2037] hover:bg-[#b0162a] text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-all cursor-pointer"
              >
                View All Products
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenProduct={onOpenProduct}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
