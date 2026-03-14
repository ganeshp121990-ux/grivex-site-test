'use client';

import { Suspense } from 'react';

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

    return <span className="tabular-nums tracking-widest opacity-70 font-mono text-[10px] text-[#4A5D4E]">{time || "SYNCING..."}</span>;
};

// --- SUB-COMPONENT: INQUIRY TERMINAL (REFINED ORGANIC MODE) ---
const InquiryTerminal = ({ productContext }: { productContext?: { code: string, name: string } }) => {
    const [status, setStatus] = useState<'IDLE' | 'TRANSMITTING' | 'LOGGED'>('IDLE');
    const [refId, setRefId] = useState('');

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [enquiryTypes, setEnquiryTypes] = useState<string[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

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

    useEffect(() => {
        const isContactPage = pathname === '/contact';
        if (isContactPage) {
            if (terminalRef.current) {
                setTimeout(() => {
                    terminalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 500);
            }
            setEnquiryTypes(prev => {
                if (prev.length === 0) return ["General Trade Inquiry"];
                return prev;
            });
            setMessage(prev => {
                if (!prev) return "I am interested in placing a bulk order for (final Product). Please provide pricing and shipping details for your (Country Name).";
                return prev;
            });
        }
    }, [pathname, searchParams]);

    useEffect(() => {
        const intents = enquiryTypes.length > 0 ? `RE: ${enquiryTypes.join(', ')}\n\n` : '';
        const interests = selectedProducts.length > 0
            ? `Regarding Assets:\n${selectedProducts.map(p => `- ${p.replace(/-/g, ' ')}`).join('\n')}\n`
            : '';
        const context = productContext ? `\nReference: ${productContext.code}` : '';

        if (!(enquiryTypes.length === 1 && enquiryTypes[0] === "General Trade Inquiry" && selectedProducts.length === 0 && !productContext)) {
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
        setEmailError(email ? !validateEmail(email) : false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setEmailError(true);
            return;
        }
        setStatus('TRANSMITTING');
        setTimeout(() => {
            const id = `REQ-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
            setRefId(id);
            setStatus('LOGGED');
        }, 2200);
    };

    return (
        <div className="w-full max-w-[1600px] mx-auto relative z-20 border border-[#E5E0D5] bg-[#B6905D] shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">

                {/* LEFT: CONTEXT SYSTEM (Warm Alabaster) */}
                <div className="lg:col-span-4 p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#E5E0D5] bg-[#71856B] transition-colors duration-700 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-multiply" />

                    <div>
                        <div className="flex items-center gap-3 mb-8 opacity-80">
                            <Terminal size={14} className="text-[#000000]" />
                            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#FFFFFF]">
                                Secure Channel
                            </span>
                        </div>

                        <h2 className="font-serif text-4xl text-[#2D362E] leading-[1.1] mb-6 tracking-wide">
                            Initiate Inquiry <br />
                            <span className="text-[#A3B18A] italic">Sequence.</span>
                        </h2>
                    </div>

                    <div className="hidden lg:block opacity-80 max-w-sm">
                        <span className="block font-mono text-[14px] font-bold uppercase tracking-widest text-[#2D362E] mb-4">
                            Data Handling
                        </span>
                        <div className="font-mono text-[12px] text-[#2D362E] leading-relaxed uppercase tracking-wide space-y-4">
                            <p>-This inquiry channel is reserved for verified trade and institutional communication.</p>
                            <p>-Submitted identifiers are used only to respond to this specific request.</p>
                            <div className="space-y-1">
                                <p>-No data is stored for promotional use.</p>
                                <p>-No information is shared with third parties.</p>
                            </div>
                            <p>-Transmissions processed through secure internal review.</p>
                        </div>
                    </div>

                    <div className="space-y-6 relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#A3B18A] animate-pulse" />
                            <span className="font-mono text-[12px] uppercase tracking-widest text-[#B6905D]">
                                ENCRYPTED
                            </span>
                        </div>

                        {productContext && (
                            <div className="border border-[#E5E0D5] p-6 bg-[#F9F7F2]/80">
                                <span className="block font-mono text-[9px] text-[#4A5D4E] mb-2 uppercase tracking-widest">Asset Reference</span>
                                <div className="flex items-center gap-3 text-[#2D362E]">
                                    <Hash size={12} className="opacity-50" />
                                    <span className="font-mono text-xs">{productContext.code}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT: INPUT FORM (Parchment) */}
                <div className="lg:col-span-8 p-12 lg:p-16 bg-[#F9F7F2] text-[#2D362E] relative">
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
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                                        <div className="group">
                                            <label className="block font-mono text-[11px] uppercase tracking-widest text-[#8C867E] mb-4 group-focus-within:text-[#4A5D4E] transition-colors">
                                                Name/Title
                                            </label>
                                            <input required type="text" className="w-full bg-transparent border-b border-[#E5E0D5] py-2 font-mono text-sm text-[#2D362E] focus:border-[#4A5D4E] outline-none transition-all placeholder-[#E5E0D5] rounded-none uppercase" placeholder="NAME & TITLE" />
                                        </div>
                                        <div className="group">
                                            <label className="block font-mono text-[11px] uppercase tracking-widest text-[#8C867E] mb-4 group-focus-within:text-[#4A5D4E] transition-colors">
                                                Entity Name
                                            </label>
                                            <input required type="text" className="w-full bg-transparent border-b border-[#E5E0D5] py-2 font-mono text-sm text-[#2D362E] focus:border-[#4A5D4E] outline-none transition-all placeholder-[#E5E0D5] rounded-none uppercase" placeholder="ORGANIZATION" />
                                        </div>
                                        <div className="group">
                                            <label className="block font-mono text-[11px] uppercase tracking-widest text-[#8C867E] mb-4 group-focus-within:text-[#4A5D4E] transition-colors">
                                                Country
                                            </label>
                                            <input required type="text" className="w-full bg-transparent border-b border-[#E5E0D5] py-2 font-mono text-sm text-[#2D362E] focus:border-[#4A5D4E] outline-none transition-all placeholder-[#E5E0D5] rounded-none uppercase" placeholder="REGION / COUNTRY" />
                                        </div>
                                        <div className="group">
                                            <label className="flex justify-between font-mono text-[11px] uppercase tracking-widest text-[#8C867E] mb-4 group-focus-within:text-[#4A5D4E] transition-colors">
                                                <span>Secure Email</span>
                                                {emailError && <span className="text-red-700">INVALID FORMAT</span>}
                                            </label>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => { setEmail(e.target.value); if (emailError) setEmailError(false); }}
                                                onBlur={handleBlur}
                                                className={`w-full bg-transparent border-b py-2 font-mono text-sm outline-none transition-all rounded-none placeholder-[#E5E0D5] ${emailError ? 'border-red-700 text-red-700' : 'border-[#E5E0D5] focus:border-[#4A5D4E] text-[#2D362E]'}`}
                                                placeholder="OFFICIAL@DOMAIN.COM"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-8 pt-8 border-t border-[#E5E0D5]">
                                        <div>
                                            <span className="block font-mono text-[9px] uppercase tracking-widest text-[#8C867E] mb-6">Intent Protocol</span>
                                            <div className="flex flex-wrap gap-4">
                                                {ENQUIRY_OPTIONS.map(opt => (
                                                    <button
                                                        key={opt}
                                                        type="button"
                                                        onClick={() => toggleEnquiry(opt)}
                                                        className={`flex items-center gap-3 px-4 py-3 border text-[10px] uppercase tracking-wider transition-all duration-500 ${enquiryTypes.includes(opt) ? 'bg-[#4A5D4E]/10 text-[#4A5D4E] border-[#4A5D4E]' : 'bg-transparent text-[#8C867E] border-[#E5E0D5] hover:border-[#8C867E]'}`}
                                                    >
                                                        <div className={`w-2 h-2 rounded-full transition-colors ${enquiryTypes.includes(opt) ? 'bg-[#4A5D4E]' : 'bg-[#E5E0D5]'}`} />
                                                        {opt}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <span className="block font-mono text-[9px] uppercase tracking-widest text-[#8C867E] mb-6">Asset Interest</span>
                                            <div className="flex flex-wrap gap-2">
                                                {PRODUCT_OPTIONS.map(opt => (
                                                    <button
                                                        key={opt}
                                                        type="button"
                                                        onClick={() => toggleProduct(opt)}
                                                        className={`px-3 py-1.5 border text-[10px] font-mono lowercase transition-all duration-300 ${selectedProducts.includes(opt) ? 'bg-[#4A5D4E] text-[#F9F7F2] border-[#4A5D4E]' : 'bg-transparent text-[#8C867E] border-[#E5E0D5] hover:text-[#4A5D4E] hover:border-[#4A5D4E]'}`}
                                                    >
                                                        {opt.replace(/-/g, ' ')}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block font-mono text-[9px] uppercase tracking-widest text-[#8C867E] mb-4">
                                            Transmission Notes
                                        </label>
                                        <textarea
                                            rows={2}
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            className="w-full bg-[#F1EDE4] border border-[#E5E0D5] p-4 font-mono text-sm text-[#2D362E] focus:border-[#4A5D4E] outline-none transition-all placeholder-[#8C867E]/30 rounded-none resize-none leading-relaxed"
                                            placeholder="..."
                                        />
                                    </div>
                                </div>

                                <div className="mt-12 flex flex-col md:flex-row items-center justify-between border-t border-[#E5E0D5] pt-8 gap-6">
                                    <span className="font-mono text-[11px] uppercase tracking-widest text-[#4A5D4E]/60 text-center md:text-left leading-relaxed">
                                        *Our export team will contact you at your provided email within 24 hours.*
                                    </span>

                                    <button
                                        disabled={status === 'TRANSMITTING'}
                                        className="bg-[#4A5D4E] text-[#F9F7F2] px-12 py-4 hover:bg-[#2D362E] disabled:opacity-50 transition-colors flex items-center gap-4 group shadow-md"
                                    >
                                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
                                            {status === 'TRANSMITTING' ? 'Uplinking...' : 'Submit to Registry'}
                                        </span>
                                        {status !== 'TRANSMITTING' && <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />}
                                    </button>
                                </div>
                            </motion.form>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-full flex flex-col items-center justify-center text-center"
                            >
                                <div className="border border-[#E5E0D5] bg-[#F1EDE4] p-16 mb-8 relative overflow-hidden shadow-inner">
                                    <div className="absolute inset-0 bg-[#A3B18A]/5 animate-pulse" />
                                    <ShieldCheck size={48} strokeWidth={1} className="text-[#4A5D4E] mb-6 mx-auto relative z-10" />
                                    <div className="space-y-2 relative z-10">
                                        <h3 className="font-serif text-3xl text-[#2D362E]">Logged.</h3>
                                        <p className="font-mono text-[10px] uppercase tracking-widest text-[#4A5D4E]">Ref: {refId}</p>
                                    </div>
                                </div>
                                <p className="font-mono text-[10px] text-[#8C867E] max-w-xs uppercase tracking-wide">
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

// --- MAIN COMPONENT: MONOLITHIC PREMIUM FOOTER ---
export default function InstitutionalFooter({ productContext }: FooterProps) {
    const containerRef = useRef<HTMLElement>(null!);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    const yText = useTransform(scrollYProgress, [0, 1], ["-15%", "5%"]);

    return (
        <footer
            ref={containerRef}
            className="relative w-full bg-[#F5F1E8] text-[#2D362E] pt-24 overflow-hidden selection:bg-[#A3B18A] selection:text-white"
        >
            {/* 1. INQUIRY TERMINAL (Top Layer) */}
            <div className="relative z-20 px-0 md:px-8 mb-32">
                <Suspense fallback={null}>
                    <InquiryTerminal productContext={productContext} />
                </Suspense>
            </div>

            {/* 2. MANIFESTO & LINKS (Middle Layer) */}
            <div className="relative z-20 max-w-[1600px] mx-auto px-6 md:px-12 pb-32 grid grid-cols-1 md:grid-cols-12 gap-16 border-t border-[#E5E0D5] pt-16">

                {/* Manifesto */}
                <div className="md:col-span-5 space-y-8">
                    <h3 className="font-serif text-5xl text-[#2D362E] tracking-tight leading-none">
                        Sustaining Earth. <br />
                        <span className="text-[#4A5D4E] opacity-70 italic font-light">Supplying Growth.</span>
                    </h3>
                    <div className="h-[1px] w-12 bg-[#A3B18A]" />
                    <p className="font-mono text-xs text-[#8C867E] leading-loose max-w-sm uppercase tracking-wide">
                        Griva Organic operates at the intersection of agricultural heritage and modern logistics. We are the backbone of sustainable biomass export.
                    </p>
                    <div className="flex gap-4 pt-4">
                        <div className="border border-[#E5E0D5] px-4 py-2 bg-[#F1EDE4]">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-[#4A5D4E]">Est. 2026</span>
                        </div>
                        <div className="border border-[#E5E0D5] px-4 py-2 bg-[#F1EDE4]">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-[#4A5D4E]">Auth. Export</span>
                        </div>
                    </div>
                </div>

                {/* Navigation - Index */}
                <div className="md:col-span-4 md:pl-12 border-l border-[#E5E0D5]">
                    <span className="block font-mono text-[9px] uppercase tracking-widest text-[#4A5D4E] mb-8 font-bold">Registry Index</span>
                    <ul className="space-y-6">
                        {[
                            { label: 'Home', href: '/' },
                            { label: 'Catalogue', href: '/catalog' },
                            { label: 'About', href: '/about' },
                            { label: 'Contact', href: '/contact' },
                        ].map((item) => (
                            <li key={item.label}>
                                <Link href={item.href} className="font-serif text-2xl text-[#8C867E] hover:text-[#4A5D4E] hover:pl-4 transition-all duration-500 block">
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Social Uplink */}
                    <div className="mt-12 pt-8 border-t border-[#E5E0D5]">
                        <span className="block font-mono text-[10px] uppercase tracking-widest text-[#4A5D4E] mb-6">Social Uplink</span>
                        <div className="flex gap-6 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                            {/* WhatsApp */}
                            <Link href="https://wa.me/919998552376" className="hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                            </Link>
                            {/* Instagram */}
                            <Link href="#" className="hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2D362E" strokeWidth="2"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Coordinates — Elegant / Luxury */}
                <div className="md:col-span-3 space-y-10 md:pl-10 border-l border-[#E5E0D5]">

                    {/* Origin */}
                    <div>
                        <span className="block font-mono text-[9px] uppercase tracking-[0.22em] text-[#4A5D4E] mb-3">
                            Origin
                        </span>
                        <p className="font-serif text-lg text-[#2D362E] leading-snug tracking-wide">
                            Ahmedabad
                        </p>
                        <p className="font-serif text-sm italic text-[#8C867E] mt-1 tracking-wider">
                            India
                        </p>
                        <p className="font-mono text-[9px] text-[#C2BDB5] mt-2 tracking-widest">
                            21.1702° N · 72.8311° E
                        </p>
                    </div>

                    <div className="w-8 h-[0.5px] bg-[#E5E0D5]" />

                    {/* System Time */}
                    <div>
                        <span className="block font-mono text-[9px] uppercase tracking-[0.22em] text-[#4A5D4E] mb-3">
                            System Time
                        </span>
                        <SystemClock />
                    </div>

                    <div className="w-8 h-[0.5px] bg-[#E5E0D5]" />

                    {/* Compliance */}
                    <div>
                        <span className="block font-mono text-[9px] uppercase tracking-[0.22em] text-[#4A5D4E] mb-4">
                            Compliance
                        </span>
                        <div className="flex gap-5 text-[#A3B18A]">
                            <ShieldCheck size={18} strokeWidth={1.25} />
                            <Globe size={18} strokeWidth={1.25} />
                            <Lock size={18} strokeWidth={1.25} />
                        </div>
                    </div>

                </div>
            </div>

            {/* 3. BACKGROUND MONUMENT TEXT */}
            <div className="absolute bottom-[3.5vh] left-0 right-0 z-0 pointer-events-none flex justify-center overflow-hidden">
                <motion.h1
                    style={{ y: yText }}
                    className="font-serif text-[30vw] leading-[1] text-[#355E3B] opacity-20 tracking-tighter whitespace-nowrap select-none"
                >
                    GRIVA
                </motion.h1>
            </div>

            {/* 4. BASELINE */}
            <div className="relative z-10 border-t border-[#E5E0D5] bg-[#F1EDE4] py-8 px-6 md:px-12 flex justify-between items-center">
                <span className="font-mono text-[12px] text-[#8C867E] uppercase tracking-widest">© 2026 Griva Organic.</span>
                <span className="font-mono text-[12px] text-[#8C867E] uppercase tracking-widest">All Rights Reserved.</span>
            </div>
        </footer>
    );
}