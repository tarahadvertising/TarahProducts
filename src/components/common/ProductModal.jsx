import React, { useState } from 'react';
import { 
  X, 
  MessageSquare, 
  ShoppingBag, 
  Clock, 
  Package, 
  Check, 
  Printer
} from 'lucide-react';
import { getProductWhatsAppUrl } from '../../utils/whatsapp';
import { companyInfo } from '../../data/company';

export default function ProductModal({ 
  product, 
  isOpen, 
  onClose, 
  onAddToCart,
  isInCart = false
}) {
  const [quantity, setQuantity] = useState(product?.moq || '50');
  const [selectedColor, setSelectedColor] = useState(
    product?.colors && product.colors.length > 0 ? product.colors[0] : ''
  );
  const [notes, setNotes] = useState('');
  const [addedNotice, setAddedNotice] = useState(false);

  if (!isOpen || !product) return null;

  const handleWhatsAppInquiry = () => {
    const url = getProductWhatsAppUrl(product, quantity, selectedColor, notes);
    window.open(url, '_blank');
  };

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart({
        ...product,
        quantity: quantity,
        selectedColor: selectedColor
      });
      setAddedNotice(true);
      setTimeout(() => setAddedNotice(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-3xl bg-white text-[#2d333a] border border-slate-200 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-black transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Product Image & Badges */}
          <div className="relative bg-slate-50 flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-slate-200">
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-h-[360px] object-cover rounded-2xl shadow-md border border-slate-200"
            />
            {product.badge && (
              <span className="absolute top-8 left-8 bg-[#cf2037] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                {product.badge}
              </span>
            )}
            <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm border border-slate-200 rounded-xl p-3 flex items-center justify-between text-xs shadow-sm">
              <span className="text-slate-500 font-medium">Product Code:</span>
              <span className="font-mono font-bold text-[#cf2037] bg-red-50 border border-red-100 px-2 py-0.5 rounded">{product.sku}</span>
            </div>
          </div>

          {/* Right Column: Information, Specs & WhatsApp CTA */}
          <div className="p-6 sm:p-7 flex flex-col justify-between space-y-4 max-h-[85vh] overflow-y-auto">
            
            <div className="space-y-3">
              <div>
                <span className="text-[11px] font-bold text-[#cf2037] uppercase tracking-wider block">
                  Tarah Advertising UAE
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#111827] leading-tight mt-0.5">
                  {product.name}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>

              {/* Quick Specs Cards */}
              <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                <div className="bg-[#f8f9fa] border border-slate-200 rounded-xl p-2.5">
                  <div className="flex items-center gap-1.5 text-slate-500 mb-0.5">
                    <Package className="w-3.5 h-3.5 text-[#cf2037]" />
                    <span className="text-[10px] uppercase font-bold">Min. Order (MOQ)</span>
                  </div>
                  <span className="font-bold text-[#2d333a]">{product.moq}</span>
                </div>

                <div className="bg-[#f8f9fa] border border-slate-200 rounded-xl p-2.5">
                  <div className="flex items-center gap-1.5 text-slate-500 mb-0.5">
                    <Clock className="w-3.5 h-3.5 text-[#cf2037]" />
                    <span className="text-[10px] uppercase font-bold">UAE Lead Time</span>
                  </div>
                  <span className="font-bold text-[#2d333a]">{product.leadTime}</span>
                </div>
              </div>

              {/* Branding Methods */}
              {product.brandingMethods && product.brandingMethods.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-semibold text-slate-600 flex items-center gap-1">
                    <Printer className="w-3.5 h-3.5 text-[#cf2037]" />
                    Custom Branding Methods:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.brandingMethods.map((method, i) => (
                      <span 
                        key={i}
                        className="text-[11px] bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded-lg font-medium"
                      >
                        {method}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Color choices if available */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-semibold text-slate-600">
                    Select Preferred Finish / Color:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.colors.map((color, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                          selectedColor === color
                            ? 'bg-[#cf2037] text-white border-[#cf2037] font-semibold'
                            : 'bg-white text-slate-700 border-slate-300 hover:border-[#cf2037]'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Features List */}
              {product.features && product.features.length > 0 && (
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-semibold text-[#2d333a]">
                    Product Specifications:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#cf2037] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quantity & Notes input */}
              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="col-span-1">
                  <label className="text-[10px] text-slate-600 font-medium block mb-1">Estimated Qty:</label>
                  <input
                    type="text"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-2 text-xs text-[#2d333a] focus:outline-none focus:border-[#cf2037]"
                    placeholder="e.g. 100"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-[10px] text-slate-600 font-medium block mb-1">Artwork / Custom Note:</label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Need gold foil logo"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-2 text-xs text-[#2d333a] placeholder-slate-400 focus:outline-none focus:border-[#cf2037]"
                  />
                </div>
              </div>

            </div>

            {/* CTA Buttons */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <button
                type="button"
                onClick={handleWhatsAppInquiry}
                className="w-full bg-[#cf2037] hover:bg-[#b0162a] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2.5 shadow-md shadow-red-700/20 transition-all hover:scale-[1.01] active:scale-98 cursor-pointer"
              >
                <MessageSquare className="w-5 h-5 fill-white" />
                <span>Inquire This Product on WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleAdd}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  addedNotice
                    ? 'bg-red-50 text-[#cf2037] border border-red-200'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{addedNotice ? '✓ Added to RFQ List!' : isInCart ? 'Update in RFQ Bag' : '+ Add to Multi-Product Quote Bag'}</span>
              </button>

              <p className="text-[10px] text-center text-slate-500">
                Official Tarah Advertising Dubai Desk: {companyInfo.whatsapp}
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
