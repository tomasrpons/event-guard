import { type Metadata } from "next";
import React from "react";
import { MotionDiv } from "~/lib/framer";

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

type TemplateProps = {
  children: React.ReactNode;
};

const Template: React.FC<TemplateProps> = ({ children }) => {
  return (
    <MotionDiv className="container" animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 40 }}>
      {children}
    </MotionDiv>
  );
};

export default Template;
