import React from 'react';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../products/ProductCard';
import { products } from '../../data/products';

export default function FeaturedProducts({ 
  onViewAllProducts 
}) {
  const featured = products.slice(0, 8);

  return (
    <section className="py-14 sm:py-20 bg-[#f8f9fa] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        
        {/* Section Header matching screenshot */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 sm:space-y-3">
            {/* Small red dash + uppercase label */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#cf2037] uppercase tracking-widest">
              <span className="w-5 h-[2px] bg-[#cf2037] inline-block"></span>
              <span>OUR PRODUCTS</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111827] tracking-tight leading-[1.12]">
              Everything You Need<br />
              <span className="text-[#cf2037]">for Your Brand</span>
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm md:text-base text-slate-500 leading-relaxed max-w-lg pt-1">
              Premium print, signage and display solutions to make your brand stand out.
            </p>
          </div>

          {/* Right-side Decorative Brand Accent */}
          <div className="hidden md:flex items-center flex-1 max-w-xs lg:max-w-md ml-auto opacity-75">
            <img 
              src="/service_bg.svg" 
              alt="" 
              className="w-full h-auto max-h-16 object-contain pointer-events-none"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* 4-Column Product Grid Matching Reference */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7">
          {featured.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        {/* View All Products Action */}
        <div className="flex justify-center pt-4">
          <button
            onClick={onViewAllProducts}
            className="inline-flex items-center gap-2 bg-[#cf2037] hover:bg-[#b0162a] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-md shadow-red-700/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
