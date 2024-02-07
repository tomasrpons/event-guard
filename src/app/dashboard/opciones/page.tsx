"use client";
import { useState } from "react";
import { cn } from "~/lib/utils";
type Markets = "Futuros" | "Opciones";
const markets = ["Futuros", "Opciones"] as const;
export default function Home() {
  const [selected, setSelected] = useState<Markets>("Futuros");
  return (
    "Opciones"
    // <div className={"mb-4 flex items-center cursor-pointer"}>
    //   {markets.map((market, index) => (
    //     <div
    //       key={index}
    //       onClick={() => {
    //         setSelected(market);
    //       }}
    //       className={cn(
    //         "flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary",
    //         selected === market ? "bg-muted font-medium text-primary" : "text-muted-foreground"
    //       )}>
    //       {market}
    //     </div>
    //   ))}
    // </div>
  );
}
