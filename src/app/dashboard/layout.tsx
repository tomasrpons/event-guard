"use client";

import { cn } from "~/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import DollarCarousel from "~/components/dollar-carousel";
import { Separator } from "~/components/ui/separator";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="container flex flex-col items-center justify-start gap-4 2xl:mx-0 2xl:max-w-none 2xl:px-0">
      <DollarCarousel />
      <nav className="flex items-center gap-6 text-lg">
        <Link
          href="/dashboard/futuros/acciones"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname.includes("/dashboard/futuros") ? "text-foreground" : "text-foreground/60"
          )}>
          Futuros
        </Link>
        <Link
          href="/dashboard/opciones"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/docs/opciones") ? "text-foreground" : "text-foreground/60"
          )}>
          Opciones
        </Link>
      </nav>
      <div className="w-1/2">
        <Separator className="my-4" />
      </div>
      {children}
    </div>
  );
}
