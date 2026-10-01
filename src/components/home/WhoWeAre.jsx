import React from 'react';
import { MessageSquare } from 'lucide-react';
import { getGeneralInquiryWhatsAppUrl } from '../../utils/whatsapp';

export default function WhoWeAre() {
  return (
    <section id="whoweare" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left: Title, Description & Button */}
          <div className="lg:col-span-7 space-y-6">
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight">
              Who We Are
            </h2>

            <p className="text-base sm:text-lg text-[#2d333a] leading-relaxed">
              We’re <strong className="text-[#cf2037]">Tarah Advertising</strong>, based in Dubai. Specializing in crafting captivating brand identities through dynamic design solutions for both digital and print media, we're committed to ensuring your brand shines brightly in the competitive marketplace.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              From bespoke executive corporate gifts and 3D illuminated channel letters to complete office stationery and packaging, we bring together creative strategy and factory-direct precision manufacturing to deliver exceptional marketing products across the United Arab Emirates.
            </p>

            {/* Single Button */}
            <div className="pt-2">
              <a
                href={getGeneralInquiryWhatsAppUrl("Who We Are - Consultation")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#cf2037] hover:bg-[#b0162a] text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-xl shadow-lg shadow-red-700/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Chat with Tarah on WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Right: Image */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80"
                alt="Tarah Advertising Dubai Team"
                className="w-full h-[360px] sm:h-[420px] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
