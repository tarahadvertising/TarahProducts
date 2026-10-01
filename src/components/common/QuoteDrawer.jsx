import React, { useState } from 'react';
import {
  X,
  Trash2,
  MessageSquare,
  ShoppingBag,
  User,
  ArrowRight,
  ShieldCheck,
  Truck,
  Plus,
  Minus
} from 'lucide-react';
import { getCartOrderWhatsAppUrl } from '../../utils/whatsapp';

export default function QuoteDrawer({
  isOpen,
  onClose,
  cartItems = [],
  onRemoveItem,
  onUpdateQty,
  onClearCart,
  onNavigateToProducts
}) {
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [deliveryCity, setDeliveryCity] = useState('Dubai');
  const [specialNotes, setSpecialNotes] = useState('');

  if (!isOpen) return null;

  // Calculate Cart Subtotal
  const subtotal = cartItems.reduce((acc, item) => {
    const qty = Number(item.quantity) || 1;
    const price = Number(item.unitPrice || item.price || 0);
    return acc + qty * price;
  }, 0);

  const grandTotal = subtotal.toFixed(2);

  const handleSendOrder = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    const url = getCartOrderWhatsAppUrl(cartItems, {
      name: clientName,
      company: companyName,
      city: deliveryCity,
      notes: specialNotes
    });

    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 text-[#1a1a1a] shadow-2xl flex flex-col">

          {/* Header */}
          <div className="p-4 sm:p-5 bg-white border-b border-slate-200 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-red-50 text-[#cf2037]">
                <ShoppingBag className="w-5 h-5 text-[#cf2037]" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-[#111827]">
                  Shopping Cart
                </h3>
                <p className="text-xs text-slate-500">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery Bar in Tarah Red Theme */}
          <div className="bg-red-50/80 border-b border-red-200/80 px-4 py-2 flex items-center gap-2 text-xs text-[#cf2037]">
            <Truck className="w-4 h-4 text-[#cf2037] shrink-0" />
            <span>
              <strong>FREE Express Delivery</strong> across UAE on this order!
            </span>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 bg-[#fafafc]">
            {cartItems.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-8 h-8 text-slate-400" />
                </div>
                <div>
                  <h4 className="font-bold text-[#111827] text-base">Your Cart is Empty</h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
                    Explore our products catalog, select your custom options, and tap "Add to Cart".
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    if (onNavigateToProducts) onNavigateToProducts();
                  }}
                  className="inline-flex items-center gap-2 bg-[#cf2037] hover:bg-[#b0162a] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <span>Explore Products</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                {/* List of Products */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                    <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                      Items in Cart ({cartItems.length})
                    </span>
                    <button
                      onClick={onClearCart}
                      className="text-[#cf2037] hover:underline text-xs flex items-center gap-1 cursor-pointer font-semibold"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear All</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {cartItems.map((item) => {
                      const itemQty = Number(item.quantity) || 1;
                      const itemPrice = Number(item.unitPrice || item.price || 0);
                      const lineTotal = (itemQty * itemPrice).toFixed(2);

                      return (
                        <div
                          key={item.id}
                          className="bg-white border border-slate-200/90 rounded-2xl p-3.5 flex gap-3 shadow-2xs"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded-xl object-contain bg-[#fafafc] shrink-0 border border-slate-100 p-1"
                          />
                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div>
                              <div className="flex items-start justify-between gap-1">
                                <h4 className="text-xs font-bold text-[#111827] line-clamp-1">
                                  {item.name}
                                </h4>
                                <button
                                  onClick={() => onRemoveItem && onRemoveItem(item.id)}
                                  className="text-slate-400 hover:text-[#cf2037] transition-colors cursor-pointer p-0.5"
                                  title="Remove item"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              {/* Variants (Size & Color) */}
                              <div className="text-[11px] text-slate-500 space-y-0.5 mt-0.5">
                                {item.selectedSize && (
                                  <div>Size: <span className="font-semibold text-slate-700">{item.selectedSize}</span></div>
                                )}
                                {item.selectedColor && (
                                  <div>Color: <span className="font-semibold text-slate-700">{item.selectedColor}</span></div>
                                )}
                              </div>
                            </div>

                            {/* Quantity Controls & Line Total */}
                            <div className="mt-2 flex items-center justify-between pt-1 border-t border-slate-100">
                              {/* Quantity Stepper */}
                              <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                                <button
                                  onClick={() => {
                                    if (itemQty > 1 && onUpdateQty) {
                                      onUpdateQty(item.id, itemQty - 1);
                                    } else if (itemQty <= 1 && onRemoveItem) {
                                      onRemoveItem(item.id);
                                    }
                                  }}
                                  className="p-1 hover:bg-slate-200 text-slate-600 rounded-l cursor-pointer"
                                  aria-label="Decrease"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="px-2 text-xs font-bold text-slate-900 min-w-[20px] text-center">
                                  {itemQty}
                                </span>
                                <button
                                  onClick={() => onUpdateQty && onUpdateQty(item.id, itemQty + 1)}
                                  className="p-1 hover:bg-slate-200 text-slate-600 rounded-r cursor-pointer"
                                  aria-label="Increase"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              {/* Line Total */}
                              <div className="text-right">
                                <span className="text-[10px] text-slate-400 block font-normal">
                                  AED {itemPrice.toFixed(2)} each
                                </span>
                                <span className="text-xs font-extrabold text-[#111827]">
                                  AED {lineTotal}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Delivery & Customer Details */}
                <div className="space-y-3 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
                  <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#cf2037]" />
                    <span>Customer & Delivery Details:</span>
                  </h4>

                  <div className="space-y-2.5 text-xs">
                    <div>
                      <label className="text-slate-600 block mb-1 font-medium">Your Name / Title</label>
                      <input
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="e.g. Tariq Mansoor (CEO / Buyer)"
                        className="w-full bg-[#fafafc] border border-slate-200 rounded-xl px-3 py-2 text-[#2d333a] placeholder-slate-400 focus:outline-none focus:border-[#cf2037] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-slate-600 block mb-1 font-medium font-normal">Company Name (Optional)</label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. Al Futtaim Group LLC"
                        className="w-full bg-[#fafafc] border border-slate-200 rounded-xl px-3 py-2 text-[#2d333a] placeholder-slate-400 focus:outline-none focus:border-[#cf2037] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-slate-600 block mb-1 font-medium">Delivery Emirate / City</label>
                      <select
                        value={deliveryCity}
                        onChange={(e) => setDeliveryCity(e.target.value)}
                        className="w-full bg-[#fafafc] border border-slate-200 rounded-xl px-3 py-2 text-[#2d333a] focus:outline-none focus:border-[#cf2037] cursor-pointer"
                      >
                        <option value="Dubai">Dubai</option>
                        <option value="Abu Dhabi">Abu Dhabi</option>
                        <option value="Sharjah">Sharjah</option>
                        <option value="Ajman">Ajman</option>
                        <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                        <option value="Fujairah">Fujairah</option>
                        <option value="Umm Al Quwain">Umm Al Quwain</option>
                        <option value="Al Ain">Al Ain</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-slate-600 block mb-1 font-medium">Special Requests / Logo Artwork</label>
                      <textarea
                        rows="2"
                        value={specialNotes}
                        onChange={(e) => setSpecialNotes(e.target.value)}
                        placeholder="e.g. Send logo artwork on WhatsApp, deliver by Wednesday..."
                        className="w-full bg-[#fafafc] border border-slate-200 rounded-xl px-3 py-2 text-[#2d333a] placeholder-slate-400 focus:outline-none focus:border-[#cf2037] focus:bg-white resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Price Breakdown / Order Summary */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Items Subtotal</span>
                    <span className="font-semibold text-slate-800">AED {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>UAE VAT (5%)</span>
                    <span className="text-[#cf2037] font-semibold">Included</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Express Delivery</span>
                    <span className="text-[#cf2037] font-bold uppercase">FREE</span>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex justify-between items-baseline">
                    <span className="font-extrabold text-sm text-[#111827]">Total Amount:</span>
                    <span className="font-black text-xl text-[#cf2037]">
                      AED {grandTotal}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer Checkout Button */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-white space-y-3 shadow-lg">
              <button
                onClick={handleSendOrder}
                className="w-full bg-[#25d366] hover:bg-[#20ba59] text-white font-extrabold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-600/25 transition-all hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
              >
                <MessageSquare className="w-5 h-5 fill-white" />
                <span>Order via WhatsApp (AED {grandTotal})</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-[#cf2037] shrink-0" />
                <span>Instant order transmission to Tarah Dubai WhatsApp Sales Desk</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
