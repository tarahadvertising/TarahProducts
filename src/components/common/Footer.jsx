import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Clock,
  ShieldCheck,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import Logo from './Logo';
import { companyInfo } from '../../data/company';
import { categories } from '../../data/categories';
import { getGeneralInquiryWhatsAppUrl } from '../../utils/whatsapp';

export default function Footer({ setCurrentPage, setSelectedCategory }) {
  const handleCategoryClick = (categoryId) => {
    if (setSelectedCategory) setSelectedCategory(categoryId);
    if (setCurrentPage) setCurrentPage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (page) => {
    if (setCurrentPage) setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#cf2037] text-white pt-12 pb-10 border-t border-[#8b1913]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 4-Column Footer matching tarah.ae structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#8b1913]/60">

          {/* Col 1: Brand Info & Social Media */}
          <div className="space-y-4">
            <Logo className="h-9" variant="white" />

            <div className="pt-2 space-y-2 text-xs text-white/80">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-white shrink-0" />
                <span>Mon – Sat: 9:00 AM – 7:00 PM</span>
              </div>
            </div>

            {/* Social Media links matching tarah.ae */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/tarah-advertising"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#cf2037] flex items-center justify-center transition-all text-xs font-bold"
                aria-label="LinkedIn"
              >
                in
              </a>
              <a
                href="https://www.instagram.com/tarah_advertising"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#cf2037] flex items-center justify-center transition-all text-xs font-bold"
                aria-label="Instagram"
              >
                ig
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61557939847806"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#cf2037] flex items-center justify-center transition-all text-xs font-bold"
                aria-label="Facebook"
              >
                fb
              </a>
            </div>
          </div>

          {/* Col 2: Contact & Dubai Office */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Get in Touch
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-white/90">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span>
                  #13 A5 Block, Xavier Business Center, Burj Nahar Complex, Deira, Dubai
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-white shrink-0" />
                <a href={`tel:${companyInfo.phoneRaw}`} className="hover:underline">
                  {companyInfo.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-white shrink-0" />
                <a
                  href={getGeneralInquiryWhatsAppUrl("Footer Line 1")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline decoration-white/50"
                >
                  {companyInfo.whatsapp}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-white shrink-0" />
                <a href={`mailto:${companyInfo.email}`} className="hover:underline">
                  {companyInfo.email}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright line matching tarah.ae */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/80 gap-3">
          <p>© {new Date().getFullYear()} Tarah Advertising LLC. All rights reserved!</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNav('products')}
              className="text-white/80 hover:text-white hover:underline cursor-pointer"
            >
              Products
            </button>
            <span className="text-white/40">|</span>
            <a
              href={companyInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline flex items-center gap-1 font-semibold"
            >
              <span>tarah.ae</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
