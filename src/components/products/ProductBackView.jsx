import React from 'react';
import { QrCode, Wifi, ShieldCheck, Cpu, Sparkles } from 'lucide-react';

export default function ProductBackView({ product }) {
  const id = product.id;

  // Render authentic realistic back views matching each product type
  if (id === 'nfc-card' || id === 'nfc-chip') {
    return (
      <div className="w-full h-full rounded-2xl bg-gradient-to-br from-slate-900 via-black to-slate-950 p-4 flex flex-col justify-between items-center text-white border border-slate-700/60 shadow-2xl relative overflow-hidden select-none">
        {/* Hologram Accent */}
        <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-amber-400/20 via-cyan-400/20 to-transparent rounded-bl-full pointer-events-none" />
        
        {/* Top Header */}
        <div className="w-full flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5">
            <Wifi className="w-4 h-4 text-cyan-400 rotate-90 animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-slate-300 font-bold uppercase">NFC 13.56 MHz</span>
          </div>
          <span className="text-[9px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 font-mono">NTAG 216</span>
        </div>

        {/* Center Chip & QR */}
        <div className="flex flex-col items-center gap-2 z-10">
          <div className="w-14 h-14 rounded-xl bg-white p-1 shadow-lg flex items-center justify-center">
            <QrCode className="w-12 h-12 text-slate-900" />
          </div>
          <div className="flex items-center gap-1 text-[10px] text-slate-300 font-semibold">
            <Sparkles className="w-3 h-3 text-[#cf2037]" />
            <span>Tap with iPhone & Android</span>
          </div>
        </div>

        {/* Bottom Details */}
        <div className="w-full flex items-center justify-between text-[8px] text-slate-400 font-mono border-t border-slate-800 pt-1.5 z-10">
          <span className="font-bold text-[#cf2037]">TARAH DUBAI</span>
          <span>SN: 971-884021-NFC</span>
        </div>
      </div>
    );
  }

  if (id === 'business-card') {
    return (
      <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#1a1e24] to-[#0f1216] p-4 flex flex-col justify-between items-center text-white border border-amber-600/30 shadow-2xl relative overflow-hidden select-none">
        {/* Gold Foil Accent Line */}
        <div className="absolute inset-x-4 top-3 h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-80" />

        <div className="w-full flex justify-end z-10">
          <span className="text-[8px] uppercase tracking-widest text-amber-400 font-bold">Matte Finish 450 GSM</span>
        </div>

        {/* Center Monogram */}
        <div className="flex flex-col items-center gap-1 z-10 text-center">
          <div className="w-12 h-12 rounded-full border border-amber-500/50 bg-amber-500/10 flex items-center justify-center shadow-inner">
            <span className="text-amber-400 font-black text-lg tracking-wider">T</span>
          </div>
          <h4 className="text-xs font-bold tracking-wider text-slate-100 uppercase mt-1">Tarah Advertising</h4>
          <p className="text-[9px] text-slate-400">Dubai Luxury Printing Series</p>
        </div>

        <div className="w-full flex items-center justify-between text-[8px] text-slate-400 border-t border-slate-800 pt-1 z-10">
          <span>+971 58 151 0921</span>
          <span>info@tarahadvertising.ae</span>
        </div>
      </div>
    );
  }

  if (id === 'snap-frame') {
    return (
      <div className="w-full h-full rounded-lg bg-gradient-to-b from-slate-300 via-slate-200 to-slate-400 p-3 flex flex-col justify-between items-center text-slate-800 border-2 border-slate-500/60 shadow-xl relative select-none">
        {/* Corner Brackets */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-slate-700" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-slate-700" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-slate-700" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-slate-700" />

        <div className="w-full flex justify-between items-center text-[8px] font-mono text-slate-600 font-bold px-3">
          <span>REAR ALUMINUM CHASSIS</span>
          <span>A4 / A3 / A2 / A1</span>
        </div>

        {/* Center Wall Mount Plate */}
        <div className="flex flex-col items-center justify-center p-3 rounded bg-slate-300/80 border border-slate-400 text-center shadow-inner">
          <div className="w-5 h-5 rounded-full border-2 border-slate-600 mb-1 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-slate-700" />
          </div>
          <span className="text-[9px] font-bold text-slate-800 uppercase">Dual Wall Mount Bracket</span>
          <span className="text-[8px] text-slate-600">Quick Spring-Clip Release</span>
        </div>

        <div className="w-full text-center text-[8px] font-mono text-slate-600 font-bold border-t border-slate-400 pt-1">
          TARAH ADVERTISING DUBAI • HEAVY DUTY 25MM PROFILE
        </div>
      </div>
    );
  }

  if (id === 'roll-up') {
    return (
      <div className="w-full h-full rounded-lg bg-gradient-to-b from-slate-200 via-slate-100 to-slate-300 p-3 flex flex-col justify-between items-center text-slate-800 border border-slate-400 shadow-xl relative select-none">
        {/* Support Mast Pole */}
        <div className="absolute inset-y-2 left-1/2 -translate-x-1/2 w-3 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 rounded-sm shadow" />

        <div className="w-full flex justify-between z-10 text-[8px] font-mono text-slate-600 font-bold">
          <span>BACK SUPPORT MAST</span>
          <span>85 x 200 CM</span>
        </div>

        <div className="z-10 bg-white/90 px-3 py-1.5 rounded border border-slate-300 shadow text-center">
          <span className="text-[9px] font-bold text-slate-900 block">Aluminum Spring Retractor</span>
          <span className="text-[8px] text-slate-500">Dual Stabilizing Feet Base</span>
        </div>

        <div className="w-full z-10 text-center text-[8px] font-mono text-slate-600 font-bold border-t border-slate-300 pt-1">
          TARAH DUBAI • TELESCOPIC MECHANISM
        </div>
      </div>
    );
  }

  if (id === 'nfc-watch' || id === 'nfc-ring') {
    return (
      <div className="w-full h-full rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-black p-4 flex flex-col justify-between items-center text-white border border-slate-700/80 shadow-2xl relative select-none">
        <div className="w-full flex justify-between items-center text-[9px] font-mono text-slate-400">
          <span className="text-cyan-400 font-bold">SMART SENSOR</span>
          <span>IP68 50M</span>
        </div>

        {/* Center Optical Sensor Dome */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-16 h-16 rounded-full bg-slate-900 border-2 border-emerald-500/50 flex items-center justify-center relative shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping absolute" />
            <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
              <Cpu className="w-3.5 h-3.5 text-black" />
            </div>
          </div>
          <span className="text-[9px] text-slate-300 font-mono tracking-wider">CERAMIC BACK • 4-PIN PINOUT</span>
        </div>

        <div className="w-full flex justify-between text-[8px] text-slate-400 font-mono border-t border-slate-800 pt-1">
          <span className="text-[#cf2037] font-bold">TARAH TECH</span>
          <span>NFC TOUCHLESS PAY</span>
        </div>
      </div>
    );
  }

  // Default Luxury Metallic Architectural Back View for Signage, LEDs, Gifts, etc.
  return (
    <div className="w-full h-full rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-4 flex flex-col justify-between items-center text-white border border-slate-700/60 shadow-2xl relative select-none">
      {/* Corner Fasteners */}
      <div className="absolute top-2.5 left-2.5 w-2 h-2 rounded-full bg-slate-500 border border-slate-300 shadow-sm" />
      <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-slate-500 border border-slate-300 shadow-sm" />
      <div className="absolute bottom-2.5 left-2.5 w-2 h-2 rounded-full bg-slate-500 border border-slate-300 shadow-sm" />
      <div className="absolute bottom-2.5 right-2.5 w-2 h-2 rounded-full bg-slate-500 border border-slate-300 shadow-sm" />

      {/* Header */}
      <div className="w-full flex justify-between items-center text-[9px] font-mono text-slate-400 z-10 px-2">
        <span className="font-bold text-[#cf2037]">TARAH ADVERTISING</span>
        <span>QC PASSED</span>
      </div>

      {/* Center Technical Specifications */}
      <div className="flex flex-col items-center text-center gap-1.5 z-10 bg-black/40 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-slate-700/50">
        <ShieldCheck className="w-6 h-6 text-[#cf2037] animate-pulse" />
        <h5 className="text-[11px] font-bold text-white tracking-wide uppercase">{product.name}</h5>
        <span className="text-[9px] text-slate-300 font-mono">Direct In-House Dubai Production</span>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[8px] px-1.5 py-0.5 rounded bg-slate-800 text-cyan-400 font-mono">100% Authentic</span>
          <span className="text-[8px] px-1.5 py-0.5 rounded bg-slate-800 text-amber-400 font-mono">UAE Delivery</span>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full flex justify-between items-center text-[8px] font-mono text-slate-400 border-t border-slate-800/80 pt-1.5 z-10 px-1">
        <span>ISO 9001:2015</span>
        <span className="text-white font-semibold">Tarah Dubai Studio</span>
      </div>
    </div>
  );
}
