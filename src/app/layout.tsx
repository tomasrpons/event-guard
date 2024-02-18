import "~/styles/globals.css";

import { type Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { GoogleTagManager } from "@next/third-parties/google";
import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "~/components/providers";
import SiteHeader from "~/components/site-header";
import { TailwindIndicator } from "~/components/tailwind-indicator";
import StratexProvider from "~/context/stratex/stratex-provider.component";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Docta Capital",
  applicationName: "Docta Capital",
  authors: { url: "docta.capital", name: "Docta Capital" },
  generator: "Next.js",
  keywords: ["Mercado financiero", "tiempo real", "market data", "acciones", "futuros"],
  description: "Información del mercado en tiempo real",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    type: "website",
    url: "https://docta.capital",
    title: "Docta Capital",
    description: "Información del mercado en tiempo real",
    siteName: "Docta Capital",
  },
  twitter: {
    card: "summary",
    site: "@site",
    creator: "@creator",
    title: "Docta Capital",
    description: "Información del mercado en tiempo real",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className={`min-h-screen bg-background font-sans antialiased ${inter.variable}`}>
        <GoogleTagManager gtmId="GTM-T8264BZP" />
        <TRPCReactProvider cookies={cookies().toString()}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <StratexProvider>{children}</StratexProvider>
            </div>
            <TailwindIndicator />
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
