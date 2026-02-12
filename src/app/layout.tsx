import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono, Permanent_Marker } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import GrainOverlay from "@/components/GrainOverlay";
import PaperTexture from "@/components/PaperTexture";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const permanentMarker = Permanent_Marker({
  variable: "--font-permanent-marker",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ryan Jun | Code is Craft",
  description: "A digital artisan's workbench.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${jetbrainsMono.variable} ${permanentMarker.variable} antialiased`}>
        {/* Global Texture Layers */}
        <PaperTexture />
        <GrainOverlay />

        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>

        {/* SVG Filters (Hidden) */}
        <svg className="hidden">
          <filter id="ink-bleed">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
          </filter>
        </svg>
      </body>
    </html>
  );
}
