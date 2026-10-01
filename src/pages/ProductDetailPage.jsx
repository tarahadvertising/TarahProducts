import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ShieldCheck,
  Truck,
  RotateCcw,
  MessageSquare,
  ShoppingBag,
  Check,
  Share2,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { getProductOrderWhatsAppUrl } from '../utils/whatsapp';
import { products } from '../data/products';

export default function ProductDetailPage({
  product,
  onBack,
  onAddToCart,
  onOpenProduct
}) {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState(
    product.sizes && product.sizes.length > 0 ? product.sizes[0].name : ''
  );
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0] : ''
  );
  const [quantity, setQuantity] = useState(product.moq || 1);
  const [is360Active, setIs360Active] = useState(false);
  const [manualAngle, setManualAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartAngle, setDragStartAngle] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState('specs');

  // Reset state when product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedImage(product.image);
    setSelectedSize(product.sizes && product.sizes.length > 0 ? product.sizes[0].name : '');
    setSelectedColor(product.colors && product.colors.length > 0 ? product.colors[0] : '');
    setQuantity(product.moq || 1);
    setIs360Active(false);
    setManualAngle(0);
  }, [product]);

  // Calculate price dynamically based on size modifier
  const currentSizeObj = product.sizes?.find((s) => s.name === selectedSize);
  const sizePriceOffset = currentSizeObj?.priceOffset || 0;
  const unitPrice = Number(product.price || 0) + sizePriceOffset;
  const originalUnitPrice = Number(product.originalPrice || 0) + sizePriceOffset;
  const itemTotal = (unitPrice * quantity).toFixed(2);

  // 360 rotation handlers
  const handlePointerDown = (e) => {
    setIsDragging(true);
    setDragStartX(e.clientX || (e.touches && e.touches[0].clientX) || 0);
    setDragStartAngle(manualAngle);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const deltaX = clientX - dragStartX;
    const angleDelta = (deltaX / 250) * 360;
    const newAngle = (dragStartAngle + angleDelta) % 360;
    setManualAngle(newAngle >= 0 ? newAngle : 360 + newAngle);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handleAddToCartClick = () => {
    if (onAddToCart) {
      onAddToCart({
        id: `${product.id}-${selectedSize || 'std'}-${selectedColor || 'def'}`,
        originalProductId: product.id,
        name: product.name,
        sku: product.sku,
        category: product.category,
        image: product.image,
        selectedSize,
        selectedColor,
        quantity,
        unitPrice,
        price: unitPrice
      });
    }
  };

  const handleDirectWhatsAppOrder = () => {
    const url = getProductOrderWhatsAppUrl(product, {
      selectedSize,
      selectedColor,
      quantity,
      unitPrice
    });
    window.open(url, '_blank');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Related products from same category or others
  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="bg-[#f7f7fa] min-h-screen py-4 sm:py-6 text-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6">

        {/* Top Breadcrumb & Back Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 py-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1 font-semibold text-[#cf2037] hover:underline cursor-pointer mr-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Products</span>
            </button>
            <span className="hover:text-slate-800 cursor-pointer" onClick={onBack}>Products</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="capitalize">{product.category.replace('-', ' & ')}</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="font-semibold text-slate-800 truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </span>
          </div>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1 text-slate-600 hover:text-[#cf2037] bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 cursor-pointer shadow-2xs text-xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
          </button>
        </div>

        {/* Main Product Container */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

            {/* LEFT COLUMN: Gallery & Interactive Preview (5 cols) */}
            <div className="lg:col-span-5 flex flex-col space-y-4">
              
              {/* Main Image Showcase Stage */}
              <div className="relative w-full aspect-square bg-[#fcfcfd] rounded-2xl border border-slate-100 flex items-center justify-center p-6 overflow-hidden select-none">
                
                {/* Badge Overlay */}
                <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
                  {product.badge && (
                    <span className="bg-[#cf2037] text-white text-[10px] font-bold px-2.5 py-1 rounded shadow-xs uppercase tracking-wider">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Discount Tag */}
                {product.discount && (
                  <div className="absolute top-3 right-3 z-20 bg-slate-900 text-white font-extrabold text-xs px-2 py-0.5 rounded shadow-xs">
                    {product.discount}
                  </div>
                )}

                {/* Interactive 360 View Mode OR Standard Zoom View */}
                {is360Active ? (
                  <div
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing relative"
                  >
                    <div
                      style={{
                        transform: `scale(1.15) rotateY(${manualAngle}deg)`,
                        transformStyle: 'preserve-3d',
                        transition: isDragging ? 'none' : 'transform 0.1s ease-out'
                      }}
                      className="relative w-full h-full flex items-center justify-center"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain filter drop-shadow-xl pointer-events-none"
                      />
                      <img
                        src={product.backImage || product.image}
                        alt=""
                        className="absolute inset-0 w-full h-full object-contain filter drop-shadow-xl pointer-events-none"
                        style={{
                          transform: 'rotateY(180deg)',
                          backfaceVisibility: 'hidden'
                        }}
                      />
                    </div>
                    <span className="absolute bottom-2 bg-black/70 text-white text-[10px] font-medium px-2.5 py-1 rounded-full backdrop-blur-xs">
                      Drag left/right to spin 360°
                    </span>
                  </div>
                ) : (
                  <img
                    src={selectedImage}
                    alt={product.name}
                    className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-300 hover:scale-105"
                  />
                )}
              </div>

              {/* Thumbnails Strip */}
              <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                {/* Front Thumbnail */}
                <button
                  onClick={() => {
                    setIs360Active(false);
                    setSelectedImage(product.image);
                  }}
                  className={`w-16 h-16 rounded-xl border-2 p-1 bg-white shrink-0 transition-all cursor-pointer ${
                    !is360Active && selectedImage === product.image
                      ? 'border-[#cf2037] shadow-sm'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <img
                    src={product.image}
                    alt="Front view"
                    className="w-full h-full object-contain"
                  />
                </button>

                {/* Back Thumbnail if available */}
                {product.backImage && (
                  <button
                    onClick={() => {
                      setIs360Active(false);
                      setSelectedImage(product.backImage);
                    }}
                    className={`w-16 h-16 rounded-xl border-2 p-1 bg-white shrink-0 transition-all cursor-pointer ${
                      !is360Active && selectedImage === product.backImage
                        ? 'border-[#cf2037] shadow-sm'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <img
                      src={product.backImage}
                      alt="Back view"
                      className="w-full h-full object-contain"
                    />
                  </button>
                )}

                {/* Gallery shots */}
                {product.gallery
                  ?.filter((img) => img !== product.image && img !== product.backImage)
                  .map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setIs360Active(false);
                        setSelectedImage(img);
                      }}
                      className={`w-16 h-16 rounded-xl border-2 p-1 bg-white shrink-0 transition-all cursor-pointer ${
                        !is360Active && selectedImage === img
                          ? 'border-[#cf2037] shadow-sm'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <img
                        src={img}
                        alt="Angle"
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}

                {/* 360 Spin View Toggle Button */}
                <button
                  onClick={() => setIs360Active(!is360Active)}
                  className={`w-16 h-16 rounded-xl border-2 p-1 flex flex-col items-center justify-center shrink-0 transition-all cursor-pointer ${
                    is360Active
                      ? 'border-[#cf2037] bg-red-50 text-[#cf2037] font-bold'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                  title="Interactive 360 View"
                >
                  <RotateCcw className="w-5 h-5 animate-spin-slow" />
                  <span className="text-[10px] font-bold mt-1">360°</span>
                </button>
              </div>

              {/* Guarantees Strip */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center text-slate-600">
                <div className="p-2 bg-slate-50 rounded-xl flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-[#cf2037]" />
                  <span className="text-[10px] font-semibold">100% Quality</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-xl flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-[#cf2037]" />
                  <span className="text-[10px] font-semibold">Express UAE</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-xl flex flex-col items-center gap-1">
                  <Sparkles className="w-4 h-4 text-[#cf2037]" />
                  <span className="text-[10px] font-semibold">Custom Printing</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Product Configuration & Purchase (7 cols) */}
            <div className="lg:col-span-7 flex flex-col space-y-5">
              
              {/* Brand and Title */}
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-bold text-[#cf2037] uppercase tracking-wider">
                    TARAH ADVERTISING
                  </span>
                  <span className="text-[10px] bg-red-50 text-[#cf2037] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 border border-red-200">
                    <Check className="w-3 h-3 text-[#cf2037] stroke-[3]" />
                    Official UAE Supplier
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] leading-snug tracking-tight">
                  {product.fullName || product.name}
                </h1>

                {/* SKU Bar */}
                <div className="mt-2.5 flex items-center gap-3 text-xs text-slate-500">
                  <span>SKU: <strong className="text-slate-700 font-mono">{product.sku}</strong></span>
                  <span className="text-slate-300">|</span>
                  <span className="text-emerald-600 font-semibold">In Stock & Ready</span>
                </div>
              </div>

              {/* Price Box in Tarah Styling */}
              <div className="p-4 bg-[#fafafc] rounded-2xl border border-slate-200/80 space-y-1">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-xs text-slate-500 font-semibold uppercase">Was:</span>
                  <span className="text-sm text-slate-400 line-through font-medium">
                    AED {originalUnitPrice.toFixed(2)}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs font-bold text-slate-600">AED</span>
                    <span className="text-3xl font-black text-[#111827] tracking-tight">
                      {unitPrice.toFixed(2)}
                    </span>
                  </div>
                  {product.discount && (
                    <span className="bg-[#cf2037] text-white font-extrabold text-xs px-2 py-0.5 rounded-md">
                      {product.discount}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500">
                  All prices are in AED and include standard UAE 5% VAT. Direct Dubai factory pricing.
                </p>
              </div>

              {/* Size / Dimension Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">
                      Select Size / Dimension:
                    </span>
                    <span className="text-slate-500">{selectedSize}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => {
                      const isSelected = selectedSize === size.name;
                      return (
                        <button
                          key={size.name}
                          onClick={() => setSelectedSize(size.name)}
                          className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#cf2037] bg-red-50/70 text-[#cf2037] shadow-2xs font-bold'
                              : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                          }`}
                        >
                          <span>{size.name}</span>
                          {size.priceOffset > 0 && (
                            <span className="text-[10px] opacity-75 ml-1 font-normal">
                              (+AED {size.priceOffset})
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Color / Finish Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">
                      Select Color / Finish:
                    </span>
                    <span className="text-slate-500">{selectedColor}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => {
                      const isSelected = selectedColor === color;
                      return (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#cf2037] bg-red-50/70 text-[#cf2037] shadow-2xs font-bold'
                              : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                          }`}
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-slate-300 shrink-0"
                            style={{
                              backgroundColor:
                                color.toLowerCase().includes('black')
                                  ? '#1f2937'
                                  : color.toLowerCase().includes('gold')
                                  ? '#d97706'
                                  : color.toLowerCase().includes('red')
                                  ? '#dc2626'
                                  : color.toLowerCase().includes('silver')
                                  ? '#94a3b8'
                                  : '#cbd5e1'
                            }}
                          />
                          <span>{color}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Selector & Live Item Total */}
              <div className="pt-2 flex items-center justify-between gap-4 border-t border-slate-100 flex-wrap">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-700">Quantity:</span>
                  <div className="flex items-center border border-slate-300 rounded-xl bg-white overflow-hidden shadow-2xs">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 hover:bg-slate-100 text-slate-700 font-bold transition-colors cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 text-xs font-bold text-[#111827] min-w-[36px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1.5 hover:bg-slate-100 text-slate-700 font-bold transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-slate-500 block">Item Subtotal:</span>
                  <span className="text-xl font-extrabold text-[#111827]">
                    AED {itemTotal}
                  </span>
                </div>
              </div>

              {/* Action Buttons: Add to Cart (Tarah Red) & Buy via WhatsApp */}
              <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Tarah Red Add to Cart Button */}
                <button
                  onClick={handleAddToCartClick}
                  className="w-full flex items-center justify-center gap-2 bg-[#cf2037] hover:bg-[#b0162a] text-white font-extrabold py-3.5 px-6 rounded-xl shadow-md transition-all active:scale-[0.98] cursor-pointer"
                >
                  <ShoppingBag className="w-5 h-5 text-white" />
                  <span>Add to Cart</span>
                </button>

                {/* Direct Order via WhatsApp */}
                <button
                  onClick={handleDirectWhatsAppOrder}
                  className="w-full flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#20ba59] text-white font-bold py-3.5 px-6 rounded-xl shadow-md shadow-emerald-600/20 transition-all active:scale-[0.98] cursor-pointer"
                >
                  <MessageSquare className="w-5 h-5 fill-white" />
                  <span>Order via WhatsApp</span>
                </button>
              </div>

              {/* Service Badges */}
              <div className="pt-2 text-xs text-slate-500 space-y-1.5 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#cf2037] shrink-0" />
                  <span><strong>Express UAE Dispatch:</strong> Quick delivery across Dubai, Abu Dhabi & all Emirates.</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#cf2037] shrink-0" />
                  <span><strong>Quality Guarantee:</strong> Direct Dubai factory production with precision quality check.</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Tabbed Product Details: Specifications & Overview */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-6 lg:p-8 space-y-6">
          <div className="flex items-center gap-4 border-b border-slate-200">
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 text-sm font-bold border-b-2 transition-all cursor-pointer ${
                activeTab === 'specs'
                  ? 'border-[#cf2037] text-[#cf2037]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Specifications & Details
            </button>
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 text-sm font-bold border-b-2 transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'border-[#cf2037] text-[#cf2037]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Description & Features
            </button>
          </div>

          {activeTab === 'specs' ? (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-[#111827]">
                Product Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-xs">
                {product.specifications &&
                  Object.entries(product.specifications).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between py-2 border-b border-slate-100"
                    >
                      <span className="text-slate-500 font-medium">{key}</span>
                      <span className="text-slate-900 font-semibold text-right">{value}</span>
                    </div>
                  ))}
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Minimum Order (MOQ)</span>
                  <span className="text-slate-900 font-semibold">{product.moq} Piece(s)</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Standard Lead Time</span>
                  <span className="text-slate-900 font-semibold">{product.leadTime}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-[#111827]">
                Product Overview
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>

              <h4 className="text-sm font-bold text-[#111827] pt-2">
                Key Features & Advantages:
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs text-slate-700">
                {product.features?.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#cf2037] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Similar / Recommended Products */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg sm:text-xl font-extrabold text-[#111827] tracking-tight">
              Recommended Products for Your Brand
            </h3>
            <button
              onClick={onBack}
              className="text-xs font-semibold text-[#cf2037] hover:underline cursor-pointer"
            >
              View Full Catalog →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onOpenProduct && onOpenProduct(rel)}
                className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 flex flex-col justify-between hover:shadow-lg hover:border-[#cf2037]/40 transition-all cursor-pointer group"
              >
                <div className="w-full aspect-square bg-[#fcfcfd] rounded-xl flex items-center justify-center p-3 overflow-hidden relative">
                  <img
                    src={rel.image}
                    alt={rel.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>

                <div className="mt-3 space-y-1">
                  <span className="text-[10px] text-[#cf2037] uppercase font-semibold block truncate">
                    {rel.category}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-[#111827] line-clamp-1 group-hover:text-[#cf2037] transition-colors">
                    {rel.name}
                  </h4>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[10px] text-slate-500 font-semibold">AED</span>
                    <span className="text-sm font-extrabold text-[#111827]">
                      {Number(rel.price).toFixed(2)}
                    </span>
                    {rel.originalPrice && (
                      <span className="text-[10px] text-slate-400 line-through">
                        AED {Number(rel.originalPrice).toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
