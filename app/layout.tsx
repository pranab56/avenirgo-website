import { ReduxProvider } from "@/components/providers/ReduxProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AvenirGo - Your Trusted Platform for Psychic Readings and Spiritual Guidance",
  description: "AvenirGo - Your Trusted Platform for Psychic Readings and Spiritual Guidance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-black selection:bg-zinc-100">
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDwBdLOatYV5UMXO-zGDQMj2R1ErlK8Pqs&libraries=places`}
          strategy="beforeInteractive"
        />
        <ReduxProvider>
          {/* <SplashScreen /> */}
          {/* <LenisProvider> */}
          {children}
          <Toaster />
          {/* </LenisProvider> */}
        </ReduxProvider>
      </body>
    </html>
  );
}
