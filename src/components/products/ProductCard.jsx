import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function ProductCard({ product, onOpenProduct, onAddToCart }) {
  const handleClick = () => {
    if (onOpenProduct) {
      onOpenProduct(product);
    }
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    if (onAddToCart) {
      const defaultSize = product.sizes && product.sizes.length > 0 ? product.sizes[0].name : '';
      const defaultColor = product.colors && product.colors.length > 0 ? product.colors[0] : '';
      onAddToCart({
        id: `${product.id}-${defaultSize || 'std'}-${defaultColor || 'def'}`,
        originalProductId: product.id,
        name: product.name,
        sku: product.sku,
        category: product.category,
        image: product.image,
        selectedSize: defaultSize,
        selectedColor: defaultColor,
        quantity: product.moq || 1,
        unitPrice: product.price,
        price: product.price
      });
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group relative bg-white rounded-2xl border border-slate-200/90 hover:border-[#cf2037]/50 hover:shadow-xl transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer select-none p-3.5 sm:p-4.5"
    >
      {/* Top Media Area */}
      <div>
        {/* Badges Bar (Product Badge + Discount) */}
        <div className="flex items-center justify-between gap-1 mb-2 min-h-[22px]">
          {product.badge ? (
            <span className="bg-[#cf2037] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-2xs">
              {product.badge}
            </span>
          ) : (
            <div />
          )}

          {product.discount && (
            <span className="bg-slate-900 text-white font-extrabold text-[10px] px-2 py-0.5 rounded shadow-2xs">
              {product.discount}
            </span>
          )}
        </div>

        {/* Product Image Stage */}
        <div className="relative w-full aspect-square bg-[#fafafc] rounded-xl flex items-center justify-center p-3 sm:p-4 overflow-hidden mb-3">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-108 transition-transform duration-300"
          />
        </div>

        {/* Category */}
        <div className="text-[11px] mb-1">
          <span className="text-[#cf2037] font-semibold uppercase tracking-wider text-[10px]">
            {product.category?.replace('-', ' ')}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-bold text-[#111827] line-clamp-2 leading-snug group-hover:text-[#cf2037] transition-colors min-h-[38px]">
          {product.name}
        </h3>

        {/* Short description / tagline */}
        <p className="text-[11px] text-slate-500 line-clamp-1 mt-1">
          {product.tagline || product.shortDescription}
        </p>
      </div>

      {/* Bottom Pricing & Tarah Brand Delivery Section */}
      <div className="pt-3 mt-2 border-t border-slate-100 space-y-2">
        {/* Price in AED */}
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <span className="text-[10px] font-bold text-slate-500">AED</span>
          <span className="text-xl font-black text-[#111827] tracking-tight">
            {Number(product.price).toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-slate-400 line-through">
              AED {Number(product.originalPrice).toFixed(2)}
            </span>
          )}
        </div>

        {/* Action Button: View Details or Quick Add */}
        <div className="pt-1 flex items-center gap-2">
          <button
            onClick={handleClick}
            className="flex-1 bg-[#cf2037] hover:bg-[#b0162a] text-white text-xs font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={handleQuickAdd}
            className="p-2.5 bg-slate-900 hover:bg-black text-white rounded-xl transition-all shadow-xs cursor-pointer"
            title="Quick Add to Cart"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
