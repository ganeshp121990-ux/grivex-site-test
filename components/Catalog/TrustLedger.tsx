"use client";
import React from "react";
import { ScanLine } from "lucide-react";

export default function TrustLedger() {
  return (
    <section className="bg-[#1A1C16] text-[#EAE4D8] py-20 md:py-32 px-6 md:px-24">
       <div className="border-t border-[#C2A676]/30 pt-8 flex flex-col gap-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-0">
             <div className="flex items-center gap-3 text-[#C2A676]">
                <ScanLine className="animate-pulse" />
                <span className="font-mono text-xs tracking-[0.3em]">TRUST PROTOCOL</span>
             </div>
             <div className="text-left md:text-right">
                <h3 className="text-4xl font-serif mb-2">Immutable Origin.</h3>
                <p className="text-[#EAE4D8]/50 text-sm max-w-xs md:ml-auto">
                   Every batch is cryptographically linked to its harvest date, soil sample, and lab report.
                </p>
             </div>
          </div>

          {/* SIMULATED DATA STREAM */}
          <div className="font-mono text-[10px] text-[#C2A676]/60 space-y-2 opacity-70">
             <p>{`> BLOCK 89210: VERIFIED [ORIGIN: GUJARAT_FARM_04]`}</p>
             <p>{`> LAB REPORT #992: NITROGEN CONTENT 2.1% [CONFIRMED]`}</p>
             <p>{`> EXPORT CLEARANCE: EU COMPLIANT [READY]`}</p>
             <p className="animate-pulse">{`> STATUS: AWAITING INSTITUTIONAL INQUIRY_`}</p>
          </div>

       </div>
    </section>
  );
}