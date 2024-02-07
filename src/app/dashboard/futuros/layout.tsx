"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";

const markets = [
  { name: "Acciones", href: "/dashboard/futuros/acciones" },
  { name: "Dólar", href: "/dashboard/futuros/dolar" },
] as const;

export default function FuturosLayout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  return (
    <>
      <div className={"mb-4 flex items-center cursor-pointer"}>
        {markets.map((market, index) => (
          <Link
            key={index}
            href={market.href}
            className={cn(
              "flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary",
              pathName === market.href ? "bg-muted font-medium text-primary" : "text-muted-foreground"
            )}>
            {market.name}
          </Link>
        ))}
      </div>
      {children}
    </>
  );
}
