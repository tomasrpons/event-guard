"use client";

import Clock from "./clock";
import Image from "next/image";
import XLogo from "public/x-logo-black.png";

const SiteHeader: React.FC = () => {
  const date = new Date();

  return (
    <div className="w-full bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex w-full flex-col items-center justify-center xl:flex-row">
        <section
          id="right-side"
          className="flex w-full items-center justify-between gap-4 md:justify-end lg:absolute lg:right-14 lg:order-2 lg:justify-end"
        >
          <div className="flex items-center lg:mb-0">
            <p>Mercado cerrado </p>
            <div className="mx-2 h-2 w-2 rounded bg-red-400" />
          </div>
          <Clock initial={date} className="hidden xl:block" />
          <div className="h-7 w-7 lg:ml-4">
            {/* <Link to> */}
            <Image src={XLogo} alt="X Logo" />
            {/* </Link> */}
          </div>
        </section>
        <div className="my-4 flex-grow text-center lg:order-1 lg:mb-0">
          <h1 className="text-5xl font-extrabold tracking-tight text-primary">
            Docta Capital
          </h1>
          <h2 className="text-xl font-semibold">Market data en tiempo real</h2>
        </div>
      </div>
    </div>
  );
};

export default SiteHeader;
