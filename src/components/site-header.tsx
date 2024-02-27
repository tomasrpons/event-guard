"use client";
import dynamic from "next/dynamic";
import { InfoCircledIcon } from "@radix-ui/react-icons";

const NoSSRClock = dynamic(() => import("~/components/clock"), { ssr: false });
import Image from "next/image";
import XLogo from "public/x-logo-black.png";
import { useStratexContext } from "~/hooks/stratex-hooks";
import { cn } from "~/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const SiteHeader: React.FC = () => {
  const { isMarketClosed } = useStratexContext();

  return (
    <div className="w-full bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex w-full flex-col items-center justify-center xl:flex-row">
        <section
          id="right-side"
          className="flex w-full items-center justify-between gap-4 md:justify-end lg:absolute lg:right-14 lg:order-2 lg:justify-end">
          <div className="flex items-center lg:mb-0">
            <p>Mercado {isMarketClosed ? "cerrado" : "abierto"} </p>
            <div className={cn("mx-2 h-2 w-2 rounded", isMarketClosed ? "bg-red-400" : "bg-green-400")} />
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoCircledIcon className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent className="max-w-lg">
                <p className="break-words">
                  El horario de Matba-Rofex para la operatoria de dólar es de 10:00 a 15:00 mientras que para RFX20 y acciones
                  individuales es de 10:30 a 17:00
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
          <NoSSRClock className="hidden xl:block" />
          <div className="h-7 w-7 lg:ml-4">
            {/* <Link to> */}
            <Image src={XLogo} alt="X Logo" />
            {/* </Link> */}
          </div>
        </section>
        <div className="my-4 flex-grow text-center lg:order-1 lg:mb-0">
          <h1 className="text-5xl font-extrabold tracking-tight text-primary">Docta Capital</h1>
          <h2 className="text-xl font-semibold">Market data en tiempo real</h2>
        </div>
      </div>
    </div>
  );
};

export default SiteHeader;
