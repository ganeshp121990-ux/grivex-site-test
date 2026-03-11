import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
// 👇 FIXED: Use relative path (standard for Next.js), not a hard drive path like F:/
import Navbar from "@/components/Navbar"; 

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant" 
});

export const metadata: Metadata = {
  title: "Griva Organic | Premium Exports",
  description: "Global organic fertiliser exports.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cormorant.variable} antialiased`}>
        
        {/* 👇 OLD MANUAL NAV DELETED. ONLY THE NEW COMPONENT REMAINS 👇 */}
        <Navbar />
        

        {/* Page Content */}
        {children}
        
      </body>
    </html>
  );
}