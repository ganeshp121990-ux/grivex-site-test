'use client';

import React from 'react';
import Footer from '@/components/Catalog/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-[#080808] selection:bg-[#C2A676] selection:text-black">
            {/* Minimal Header check */}
            <div className="fixed top-0 left-0 w-full z-50 p-6 md:p-12 mix-blend-difference pb-8">
                <Link href="/" className="flex items-center gap-2 text-[#E0E0E0] hover:text-[#C2A676] transition-colors group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-mono text-xs uppercase tracking-widest">Return to Base</span>
                </Link>
            </div>

            {/* Spacer to push footer down if needed, but MonolithicFooter has pt-24 so it should be fine. 
                However, since it's the ONLY content, we might want it to be somewhat centered or just appear.
                MonolithicFooter is HUGE (min-h-[600px] + lots of padding).
                Let's just render it.
            */}
            <div className="pt-32">
                <Footer />
            </div>
        </main>
    );
}
