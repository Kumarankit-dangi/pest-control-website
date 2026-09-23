import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QuoteProvider } from "@/components/QuoteModal";
import { CartProvider } from "@/components/CartDrawer";
import { OfferWelcomeModal } from "@/components/OfferWelcomeModal";
import { FloatingContactButtons } from "@/components/FloatingContactButtons";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `${SITE.fullName} — Owner: ${SITE.owner} | Call ${SITE.phone}`,
  description:
    "NIPC SERVICES (Natural Insects Pest Control), owned by Veerpal. Govt. registered GST (09FNWPP6204H1ZC). Safe, 100% odorless pest control for Cockroaches, Termites, Lizards, Flies & Mosquitoes in Rudrapur, Pilibhit, Delhi NCR. Call/WhatsApp 9639232701.",
  keywords: [
    "NIPC SERVICES",
    "Natural Insects Pest Control",
    "Veerpal pest control",
    "9639232701",
    "pest control Rudrapur",
    "pest control Pilibhit",
    "deemak termite control",
    "cockroach herbal gel",
    "09FNWPP6204H1ZC",
  ],
  icons: {
    icon: "/images/nipc-brand-logo.svg",
    apple: "/images/nipc-brand-logo.svg",
  },
  openGraph: {
    title: `${SITE.fullName} • Owner: ${SITE.owner} • ${SITE.phone}`,
    description: `Safe Environment, Healthy Life. WhatsApp / Call: ${SITE.phoneDisplay}. 100% Odorless Herbal Gel & 7 Yrs Termite Warranty.`,
    type: "website",
    images: ["/images/nipc-official-poster-banner.jpg"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700;9..144,800&family=Manrope:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-[#0c141d] antialiased">
        <CartProvider>
          <QuoteProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
            {/* High-converting Welcome Offer Popup */}
            <OfferWelcomeModal />
            {/* Always accessible WhatsApp + Quick Call Floating Triggers */}
            <FloatingContactButtons />
          </QuoteProvider>
        </CartProvider>
      </body>
    </html>
  );
}
