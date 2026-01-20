import type { Metadata } from "next";
import { Schibsted_Grotesk, Martian_Mono } from "next/font/google";
import "@/public/globals.css";
import LightRays from "@/components/LightRays";
import { Import } from "lucide-react";
import NavBar from "@/components/NavBar";

const SchibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const MartianMono = Martian_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DEV EVENT ",
  description: "UpComing events in tech development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${SchibstedGrotesk.variable} ${MartianMono.variable} min-h-screen antialiased `}
      >
        <NavBar />
        <div className="absolute top-0 inset-0 z-[-1] min-h-screen">
          <LightRays
            raysOrigin="top-center"
            raysColor="#19b4db"
            raysSpeed={1.0}
            lightSpread={1}
            rayLength={3}
            followMouse={true}
            mouseInfluence={0.2}
            noiseAmount={0}
            distortion={0}
            className="custom-rays"
            pulsating={false}
            fadeDistance={1}
            saturation={0.1}
          />
        </div>
        <main>{children}</main>
      </body>
    </html>
  );
}
