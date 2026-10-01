import React, { useState } from 'react';
import { MessageSquare, X, Send, CheckCheck } from 'lucide-react';
import { companyInfo } from '../../data/company';
import { createWhatsAppUrl } from '../../utils/whatsapp';

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const quickPrompts = [
    "I need a quote for Corporate Gift Sets",
    "I need an estimate for 3D Signboard",
    "Looking for Custom Polo Shirts & Uniforms",
    "Need Luxury Business Cards / Printing"
  ];

  const handleSend = (textToSend) => {
    const finalMsg = textToSend || customMsg || "Hello Tarah Advertising, I would like to inquire about your corporate advertising products and pricing.";
    const url = createWhatsAppUrl(finalMsg, companyInfo.whatsappNumber);
    window.open(url, '_blank');
    setCustomMsg('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-5 sm:right-7 z-50 flex flex-col items-end">
      {/* Expanded Interactive Chat Modal */}
      {isOpen && (
        <div className="mb-3 w-[330px] sm:w-[360px] bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-[#cf2037] p-4 text-white flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white text-[#cf2037] flex items-center justify-center font-bold shadow-inner">
                  <span className="text-base font-extrabold">TA</span>
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-white border-2 border-[#cf2037] rounded-full"></span>
              </div>
              <div>
                <h4 className="font-bold text-sm tracking-tight leading-tight">Tarah Advertising</h4>
                <p className="text-[11px] text-white/90">
                  Dubai Desk • Online Now
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-[#f8f9fa] text-xs space-y-3 max-h-[360px] overflow-y-auto">
            {/* Incoming Greeting Bubble */}
            <div className="bg-white border border-slate-200 p-3.5 rounded-2xl rounded-tl-sm text-[#2d333a] space-y-1.5 shadow-sm">
              <p className="font-bold text-[#111827]">
                Marhaba! Welcome to Tarah Advertising.
              </p>
              <p className="text-slate-600 leading-relaxed text-xs">
                Looking for corporate gifts, 3D signage, custom merchandise, or commercial printing in Dubai?
              </p>
              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                <span>Fast factory quotation & 3D mockups</span>
                <CheckCheck className="w-3.5 h-3.5 text-[#cf2037]" />
              </div>
            </div>

            {/* Quick Action Chips */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                Quick Inquiries:
              </span>
              <div className="flex flex-col gap-1.5">
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(prompt)}
                    className="text-left bg-white hover:bg-red-50 border border-slate-200 hover:border-[#cf2037] text-slate-700 hover:text-[#cf2037] p-2.5 rounded-xl transition-all text-[11px] flex items-center justify-between group shadow-2xs cursor-pointer font-medium"
                  >
                    <span>{prompt}</span>
                    <Send className="w-3 h-3 text-slate-400 group-hover:text-[#cf2037] shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Direct Input */}
            <div className="pt-2">
              <label className="text-[11px] font-bold text-slate-600 block mb-1">
                Type your specific requirement:
              </label>
              <div className="relative">
                <textarea
                  rows="2"
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  placeholder="e.g. Need 100 VIP gift sets with logo by next Thursday..."
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-[#2d333a] placeholder-slate-400 focus:outline-none focus:border-[#cf2037] resize-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend(customMsg);
                    }
                  }}
                />
              </div>

              <button
                onClick={() => handleSend(customMsg)}
                className="mt-2 w-full bg-[#cf2037] hover:bg-[#b0162a] text-white font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Open in WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 bg-[#cf2037] hover:bg-[#b0162a] text-white p-3.5 sm:px-4 sm:py-3.5 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Chat on WhatsApp with Tarah Advertising"
      >
        <div className="relative">
          <MessageSquare className="w-6 h-6 fill-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full animate-ping"></span>
        </div>
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-xs font-bold leading-tight">WhatsApp Us</span>
          <span className="text-[10px] text-white/90 leading-tight">Instant RFQ Reply</span>
        </div>
      </button>
    </div>
  );
}
