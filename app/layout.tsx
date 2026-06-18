import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import AuroraBg from "@/components/Aurorabg";
import "./globals.css";

const StarField = dynamic(() => import("@/components/Starfield"), { ssr: false });

export const metadata: Metadata = {
  title: "Nexora — Academic Resource Hub",
  description: "Next Generation Knowledge Portal for Students",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="noise">
        <AuroraBg />
        <StarField />
        <div className="relative z-10">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}