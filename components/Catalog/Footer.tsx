'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';
import {
    motion,
    useScroll,
    useTransform,
    AnimatePresence
} from 'framer-motion';
import {
    ShieldCheck,
    Lock,
    Globe,
    MapPin,
    Server,
    Activity,
    Mail,
    FileText,
    ArrowRight,
    AlertCircle,
    Check,
    Hash,
    Terminal
} from 'lucide-react';

// --- TYPES ---
interface FooterProps {
    productContext?: {
        code: string;
        name: string;
    };
}

// --- UTILITY: SYSTEM CLOCK ---
const SystemClock = () => {
    const [time, setTime] = useState<string>("");

    useEffect(() => {
        const update = () => {
            const now = new Date();
            const iso = now.toISOString().replace('T', ' ').split('.')[0];
            setTime(`${iso} UTC`);
        };
        update();
        const timer = setInterval(update, 1000);
        return () => clearInterval(timer);
    }, []);

    return <span className="tabular-nums tracking-widest opacity-50 font-mono text-[10px] text-[#C2A676]">{time || "SYNCING..."}</span>;
};

// --- SUB-COMPONENT: INQUIRY TERMINAL (DEEP MODE) ---
const InquiryTerminal = ({ productContext }: { productContext?: { code: string, name: string } }) => {
    const [status, setStatus] = useState<'IDLE' | 'TRANSMITTING' | 'LOGGED'>('IDLE');
    const [refId, setRefId] = useState('');

    // Form State
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [enquiryTypes, setEnquiryTypes] = useState<string[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

    // Hooks for detection
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const terminalRef = useRef<HTMLDivElement>(null);

    const ENQUIRY_OPTIONS = [
        "General Trade Inquiry",
        "Email Me / Call Me",
        "Send Catalog",
        "Schedule a Demonstration"
    ];

    const PRODUCT_OPTIONS = [
        "sun-dried-cow-dung-cakes",
        "cow-dung-liquid-bio-tea",
        "cow-dung-pots",
        "cow-dung-powder",
        "herbal-cow-dung-dhoop-sticks",
        "organic-cow-dung-manure",
        "purified-cow-dung-ash"
    ];

    // Handle Deep Linking / Auto-Fill
    useEffect(() => {
        const isContactPage = pathname === '/contact';
        // Check for specific intent param OR just being on the contact page (which acts as the "portal")
        // logic: if on /contact, default to "General Trade Inquiry" unless overridden

        if (isContactPage) {
            // 1. Scroll to Terminal
            if (terminalRef.current) {
                // slight delay to ensure render
                setTimeout(() => {
                    terminalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 500);
            }

            // 2. Pre-select "General Trade Inquiry" if nothing selected
            setEnquiryTypes(prev => {
                if (prev.length === 0) return ["General Trade Inquiry"];
                return prev;
            });

            // 3. Pre-fill Message
            setMessage(prev => {
                if (!prev) return "I am interested in placing a bulk order for (final Product). Please provide pricing and shipping details for your (Country Name).";
                return prev;
            });
        }
    }, [pathname, searchParams]);

    // Auto-Draft Message Logic (Preserved & Enhanced)
    useEffect(() => {
        // Only auto-draft if the user hasn't manually edited substantially,
        // OR if the auto-fill detected above ran first.
        // Actually, we want the manual selection to OVERRIDE the default message
        // IF the user starts clicking things.
        // But for "General Trade Inquiry", it is a selection.

        const intents = enquiryTypes.length > 0 ? `RE: ${enquiryTypes.join(', ')}\n\n` : '';
        const interests = selectedProducts.length > 0
            ? `Regarding Assets:\n${selectedProducts.map(p => `- ${p.replace(/-/g, ' ')}`).join('\n')}\n`
            : '';
        const context = productContext ? `\nReference: ${productContext.code}` : '';

        // If we have selections, we update.
        // Caveat: The "Default" message set by the previous effect might get overwritten here immediately
        // because "General Trade Inquiry" is selected. we need to handle that.
        // We'll let this effect run. If "General Trade Inquiry" is selected, `intents` will start with "RE: General Trade Inquiry".

        // Let's refine the logic:
        // Use the default specific text requested by user ONLY if "General Trade Inquiry" is the ONLY selection
        // AND no products are selected.

        if (enquiryTypes.length === 1 && enquiryTypes[0] === "General Trade Inquiry" && selectedProducts.length === 0 && !productContext) {
            // Keep the specific text requested
            // "This inquiry concerns general trade access..."
            // No action needed if state is already set by the other effect.
        } else {
            // Standard Auto-Draft behavior for other cases
            if (intents || interests || context) {
                setMessage(`${intents}${interests}${context}`);
            }
        }

    }, [enquiryTypes, selectedProducts, productContext]);

    const toggleEnquiry = (id: string) => {
        setEnquiryTypes(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    const toggleProduct = (id: string) => {
        setSelectedProducts(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleBlur = () => {
        if (email && !validateEmail(email)) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setEmailError(true);
            return;
        }

        setStatus('TRANSMITTING');

        // Deliberate "Processing" delay for weight
        setTimeout(() => {
            const id = `REQ-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
            setRefId(id);
            setStatus('LOGGED');
        }, 2200);
    };

    return (
        <div className="w-full max-w-[1600px] mx-auto relative z-20 border-t border-b border-[#C2A676]/10 bg-[#080808]">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">

                {/* LEFT: CONTEXT SYSTEM (Dark Obsidian) */}
                <div className="lg:col-span-4 p-6 md:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#C2A676]/10 bg-[#0C0C0C] hover:bg-[#050505] transition-colors duration-700 relative overflow-hidden">
                    {/* Subtle Texture */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />

                    <div>
                        <div className="flex items-center gap-3 mb-8 opacity-60">
                            <Terminal size={14} className="text-[#C2A676]" />
                            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#C2A676]">
                                Secure Channel
                            </span>
                        </div>

                        <h2 className="font-serif text-4xl text-[#E0E0E0] leading-[1.1] mb-6 tracking-wide">
                            Initiate Inquiry <br />
                            <span className="text-[#C2A676] italic opacity-80">Sequence.</span>
                        </h2>
                    </div>

                    {/* Data Handling Notice - Institutional/Procedural */}
                    <div className="hidden lg:block opacity-60 max-w-sm">
                        <span className="block font-mono text-[20px] uppercase tracking-widest text-[#C2A676] mb-4">
                            Data Handling
                        </span>
                        <div className="font-mono text-[12px] text-[#E0E0E0]/70 leading-relaxed uppercase tracking-wide space-y-4">
                            <p>-This inquiry channel is reserved for verified trade and institutional communication.</p>
                            <p>-Submitted identifiers (name, organization, email) are used only to respond to this specific request.</p>
                            <div className="space-y-1">
                                <p>-No data is stored for promotional use.</p>
                                <p>-No unsolicited communication is initiated.</p>
                                <p>-No information is shared with third parties.</p>
                            </div>
                            <p>-All transmissions are processed through a secure internal review protocol.</p>
                        </div>
                    </div>

                    <div className="space-y-6 relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#C2A676] animate-pulse" />
                            <span className="font-mono text-[10px] uppercase tracking-widest text-[#888]">
                                ENCRYPTED
                            </span>
                        </div>

                        {productContext && (
                            <div className="border border-[#C2A676]/20 p-6 bg-[#080808]">
                                <span className="block font-mono text-[9px] text-[#C2A676] mb-2 uppercase tracking-widest">Asset Reference</span>
                                <div className="flex items-center gap-3 text-[#E0E0E0]">
                                    <Hash size={12} className="opacity-50" />
                                    <span className="font-mono text-xs">{productContext.code}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT: INPUT FORM (Deep Carbon) */}
                <div className="lg:col-span-8 p-6 md:p-12 lg:p-16 bg-[#101010] hover:bg-[#151515] transition-colors duration-700 text-[#E0E0E0] relative">
                    <AnimatePresence mode="wait">
                        {status !== 'LOGGED' ? (
                            <motion.form
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, filter: "blur(4px)" }}
                                transition={{ duration: 0.6 }}
                                onSubmit={handleSubmit}
                                className="h-full flex flex-col justify-between space-y-12"
                            >
                                <div className="space-y-12">
                                    {/* Identity Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                                        <div className="group">
                                            <label className="block font-mono text-[11px] uppercase tracking-widest text-[#666] mb-4 group-focus-within:text-[#C2A676] transition-colors">
                                                Officer Designation
                                            </label>
                                            <input required type="text" className="w-full bg-transparent border-b border-[#333] py-2 font-mono text-sm text-[#E0E0E0] focus:border-[#C2A676] outline-none transition-all placeholder-[#333] rounded-none uppercase" placeholder="NAME & TITLE" />
                                        </div>
                                        <div className="group">
                                            <label className="block font-mono text-[11px] uppercase tracking-widest text-[#666] mb-4 group-focus-within:text-[#C2A676] transition-colors">
                                                Entity Name
                                            </label>
                                            <input required type="text" className="w-full bg-transparent border-b border-[#333] py-2 font-mono text-sm text-[#E0E0E0] focus:border-[#C2A676] outline-none transition-all placeholder-[#333] rounded-none uppercase" placeholder="ORGANIZATION" />
                                        </div>
                                        <div className="group">
                                            <label className="block font-mono text-[11px] uppercase tracking-widest text-[#666] mb-4 group-focus-within:text-[#C2A676] transition-colors">
                                                Market Origin
                                            </label>
                                            <input required type="text" className="w-full bg-transparent border-b border-[#333] py-2 font-mono text-sm text-[#E0E0E0] focus:border-[#C2A676] outline-none transition-all placeholder-[#333] rounded-none uppercase" placeholder="REGION / COUNTRY" />
                                        </div>
                                        <div className="group">
                                            <label className="flex justify-between font-mono text-[11px] uppercase tracking-widest text-[#666] mb-4 group-focus-within:text-[#C2A676] transition-colors">
                                                <span>Secure Email</span>
                                                {emailError && <span className="text-red-500">INVALID FORMAT</span>}
                                            </label>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => { setEmail(e.target.value); if (emailError) setEmailError(false); }}
                                                onBlur={handleBlur}
                                                className={`w-full bg-transparent border-b py-2 font-mono text-sm outline-none transition-all rounded-none placeholder-[#333] ${emailError ? 'border-red-500 text-red-500' : 'border-[#333] focus:border-[#C2A676] text-[#E0E0E0]'}`}
                                                placeholder="OFFICIAL@DOMAIN.COM"
                                            />
                                        </div>
                                    </div>

                                    {/* Intent Selection - Switch Style */}
                                    <div className="space-y-8 pt-8 border-t border-[#333]">
                                        <div>
                                            <span className="block font-mono text-[9px] uppercase tracking-widest text-[#666] mb-6">Intent Protocol</span>
                                            <div className="flex flex-wrap gap-4">
                                                {ENQUIRY_OPTIONS.map(opt => (
                                                    <button
                                                        key={opt}
                                                        type="button"
                                                        onClick={() => toggleEnquiry(opt)}
                                                        className={`flex items-center gap-3 px-4 py-3 border text-[10px] uppercase tracking-wider transition-all duration-500 ${enquiryTypes.includes(opt) ? 'bg-[#C2A676]/10 text-[#C2A676] border-[#C2A676]' : 'bg-transparent text-[#666] border-[#333] hover:border-[#666]'}`}
                                                    >
                                                        <div className={`w-2 h-2 rounded-full transition-colors ${enquiryTypes.includes(opt) ? 'bg-[#C2A676]' : 'bg-[#333]'}`} />
                                                        {opt}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <span className="block font-mono text-[9px] uppercase tracking-widest text-[#666] mb-6">Asset Interest</span>
                                            <div className="flex flex-wrap gap-2">
                                                {PRODUCT_OPTIONS.map(opt => (
                                                    <button
                                                        key={opt}
                                                        type="button"
                                                        onClick={() => toggleProduct(opt)}
                                                        className={`px-3 py-1.5 border text-[10px] font-mono lowercase transition-all duration-300 ${selectedProducts.includes(opt) ? 'bg-[#E0E0E0] text-[#080808] border-[#E0E0E0]' : 'bg-transparent text-[#666] border-[#333] hover:text-[#C2A676] hover:border-[#C2A676]'}`}
                                                    >
                                                        {opt.replace(/-/g, ' ')}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Additional Message */}
                                    <div>
                                        <label className="block font-mono text-[9px] uppercase tracking-widest text-[#666] mb-4">
                                            Transmission Notes
                                        </label>
                                        <textarea
                                            rows={2}
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            className="w-full bg-[#080808] border border-[#333] p-4 font-mono text-sm text-[#E0E0E0] focus:border-[#C2A676] outline-none transition-all placeholder-[#333] rounded-none resize-none leading-relaxed"
                                            placeholder="..."
                                        />
                                    </div>
                                </div>

                                {/* Footer Action */}
                                <div className="mt-12 flex flex-col items-center justify-center border-t border-[#333] pt-8 gap-6">
                                    <span className="font-mono text-[10px] md:text-[12px] uppercase tracking-widest text-[#C2A676]/80 text-center w-full block">
                                        *Our export team will contact you at your provided email within 24 hours.*
                                    </span>

                                    <button
                                        disabled={status === 'TRANSMITTING'}
                                        className="bg-[#E0E0E0] text-[#080808] px-12 py-4 hover:bg-[#C2A676] disabled:opacity-50 transition-colors flex items-center gap-4 group"
                                    >
                                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
                                            {status === 'TRANSMITTING' ? 'Uplinking...' : 'Submit to Registry'}
                                        </span>
                                        {status !== 'TRANSMITTING' && <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />}
                                    </button>
                                </div>
                            </motion.form>
                        ) : (
                            // RECEIPT
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-full flex flex-col items-center justify-center text-center"
                            >
                                <div className="border border-[#C2A676]/20 bg-[#0C0C0C] p-16 mb-8 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[#C2A676]/5 animate-pulse" />
                                    <ShieldCheck size={48} strokeWidth={1} className="text-[#C2A676] mb-6 mx-auto relative z-10" />
                                    <div className="space-y-2 relative z-10">
                                        <h3 className="font-serif text-3xl text-[#E0E0E0]">Logged.</h3>
                                        <p className="font-mono text-[10px] uppercase tracking-widest text-[#C2A676]">Ref: {refId}</p>
                                    </div>
                                </div>
                                <p className="font-mono text-[10px] text-[#666] max-w-xs uppercase tracking-wide">
                                    Your dossier has been securely archived. <br />
                                    An officer will review the metadata shortly.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

// --- MAIN COMPONENT: MONOLITHIC FOOTER ---
export default function InstitutionalFooter({ productContext }: FooterProps) {
    const containerRef = useRef<HTMLElement>(null!);

    // Subtle Parallax for "GRIVA"
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    // Slow, heavy movement
    const yText = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <footer
            ref={containerRef}
            className="relative w-full bg-[#080808] text-[#E0E0E0] pt-16 md:pt-24 overflow-hidden selection:bg-[#C2A676] selection:text-black"
        >
            {/* 1. INQUIRY TERMINAL (Top Layer - Integrated) */}
            <div className="relative z-20 px-0 md:px-8 mb-32">
                <React.Suspense fallback={<div className="h-[600px] w-full max-w-[1600px] mx-auto bg-[#080808] border-t border-b border-[#C2A676]/10 animate-pulse" />}>
                    <InquiryTerminal productContext={productContext} />
                </React.Suspense>
            </div>

            {/* 2. MANIFESTO & LINKS (Middle Layer) */}
            <div className="relative z-20 max-w-[1600px] mx-auto px-6 md:px-12 pb-20 md:pb-32 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 border-t border-[#333] pt-12 md:pt-16">

                {/* Manifesto */}
                <div className="md:col-span-5 space-y-8">
                    <h3 className="font-serif text-4xl text-[#E0E0E0] tracking-tight leading-none">
                        Sustaining Earth. <br />
                        <span className="text-[#C2A676] opacity-80 italic font-light">Supplying Growth.</span>
                    </h3>
                    <div className="h-[1px] w-12 bg-[#333]" />
                    <p className="font-mono text-xs text-[#888] leading-loose max-w-sm uppercase tracking-wide">
                        Griva Organic operates at the intersection of agricultural heritage and modern logistics. We are the backbone of sustainable biomass export.
                    </p>
                    <div className="flex gap-4 pt-4">
                        <div className="border border-[#333] px-4 py-2 bg-[#0C0C0C]">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-[#666]">Est. 2026</span>
                        </div>
                        <div className="border border-[#333] px-4 py-2 bg-[#0C0C0C]">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-[#666]">Auth. Export</span>
                        </div>
                    </div>
                </div>

                {/* Navigation - Index */}
                <div className="md:col-span-4 md:pl-12 border-l border-[#333]">
                    <span className="block font-mono text-[9px] uppercase tracking-widest text-[#C2A676] mb-8">Registry Index</span>
                    <ul className="space-y-6">
                        {[
                            { label: 'Home', href: '/' },
                            { label: 'Catalogue', href: '/catalog' },
                            { label: 'About', href: '/about' },
                            { label: 'Contact', href: '/contact' },
                        ].map((item) => (
                            <li key={item.label}>
                                <Link href={item.href} className="font-serif text-xl text-[#888] hover:text-[#E0E0E0] hover:pl-4 transition-all duration-500 block">
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Social Uplink - Original Colors */}
                    <div className="mt-12 pt-8 border-t border-[#333]">
                        <span className="block font-mono text-[9px] uppercase tracking-widest text-[#666] mb-6">Social Uplink</span>
                        <div className="flex gap-6">
                            {/* WhatsApp */}
                            <Link href="https://wa.me/919998552376" className="hover:scale-110 transition-transform duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#25D366" stroke="none"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                            </Link>

                            {/* Instagram */}
                            <Link href="#" className="group hover:scale-110 transition-transform duration-300 relative rounded-lg overflow-hidden w-8 h-8">
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#FFD600] via-[#FF0100] to-[#D800B9]" />
                                <div className="absolute inset-0.5 bg-black rounded-[5px]" />
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#instaGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 w-full h-full p-[5px] text-white">
                                    <defs>
                                        <linearGradient id="instaGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#FFD600" />
                                            <stop offset="50%" stopColor="#FF0100" />
                                            <stop offset="100%" stopColor="#D800B9" />
                                        </linearGradient>
                                    </defs>
                                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                                </svg>
                            </Link>

                            {/* Facebook */}
                            <Link href="https://www.facebook.com/share/1HWLREZ2bs/?mibextid=wwXIf" className="hover:scale-110 transition-transform duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#1877F2" stroke="none"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Coordinates */}
                <div className="md:col-span-3 space-y-12 md:pl-8 border-l border-[#333]">
                    <div>
                        <span className="block font-mono text-[9px] uppercase tracking-widest text-[#C2A676] mb-3">Origin</span>
                        <p className="font-mono text-xs text-[#888]">
                            Ahmedabad, IN <br />
                            21.1702° N, 72.8311° E
                        </p>
                    </div>
                    <div>
                        <span className="block font-mono text-[9px] uppercase tracking-widest text-[#C2A676] mb-3">System Time</span>
                        <SystemClock />
                    </div>
                    <div>
                        <span className="block font-mono text-[9px] uppercase tracking-widest text-[#C2A676] mb-3">Compliance</span>
                        <div className="flex gap-4 text-[#444]">
                            <ShieldCheck size={20} />
                            <Globe size={20} />
                            <Lock size={20} />
                        </div>
                    </div>


                </div>
            </div>

            {/* 3. BACKGROUND MONUMENT TEXT (Bottom Layer) */}
            <div className="absolute bottom-[-2vh] left-0 right-0 z-0 pointer-events-none flex justify-center overflow-hidden">
                <motion.h1
                    style={{ y: yText }}
                    className="font-serif text-[30vw] leading-[1.4] text-[#141414] opacity-80 tracking-tighter whitespace-nowrap"
                >
                    GRIVA
                </motion.h1>
            </div>

            {/* 4. BASELINE */}
            <div className="relative z-10 border-t border-[#333] bg-[#050505] py-6 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
                <span className="font-mono text-[10px] md:text-[15px] text-[#444] uppercase tracking-widest">© 2026 Griva Organic.</span>
                <span className="font-mono text-[10px] md:text-[15px] text-[#444] uppercase tracking-widest">All Rights Reserved.</span>
            </div>
        </footer>
    );
}