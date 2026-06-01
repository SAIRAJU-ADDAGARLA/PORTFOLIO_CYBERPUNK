import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A. Sairaju | AI Engineer & Creative Developer Portfolio",
  description: "Awwwards-tier interactive portfolio of A. Sairaju, showcasing next-generation AI builds, full-stack software engineering, and immersive WebGL experiences.",
  keywords: ["A. Sairaju", "AI Engineer", "Software Developer", "Creative Developer", "Next.js Portfolio", "React Three Fiber", "GSAP Portfolio"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth select-none">
      <body className="min-h-full bg-pure-black text-warm-white font-space antialiased relative overflow-x-hidden">
        {/* Persistent grain noise filter overlay */}
        <div className="grain-overlay" aria-hidden="true" />
        
        {/* Core page content */}
        <div id="app-root" className="w-full relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
