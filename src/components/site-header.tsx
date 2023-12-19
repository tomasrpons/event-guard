"use client";

import Clock from "./clock";
import Image from "next/image";
import XLogo from "public/x-logo-black.png";

const SiteHeader: React.FC = () => {
  const date = new Date();

  return (
    <div className="w-full bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex w-full items-center justify-center">
        <div className="flex-grow text-center">
          <h1 className="mb-2 text-5xl font-extrabold tracking-tight text-primary">
            Docta Capital
          </h1>
          <h2 className="text-xl font-semibold">Market data en tiempo real</h2>
        </div>
        <div className="absolute right-14 flex items-center justify-end gap-4">
          <div className="flex items-center">
            <p>Mercado abierto </p>
            <div className="mx-2 h-2 w-2 rounded bg-green-400" />
          </div>
          <Clock initial={date} />
          <div className="ml-4 h-7 w-7">
            <Image src={XLogo} alt="X Logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteHeader;
