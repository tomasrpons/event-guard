"use client";

import { columns as futureColumns } from "~/app/components/futures/columns";
import { columns as stockColumns } from "~/app/components/stock/columns";
import { columns as bondColumns } from "~/app/components/bonos/columns";
import { DataTable as FuturesDataTable } from "./components/futures/data-table";
import { DataTable as StockDataTable } from "./components/stock/data-table";
import { DataTable as BondDataTable } from "./components/bonos/data-table";
import { redirect } from "next/navigation";
import { useStratexContext } from "../hooks/stratex-hooks";
import { cn } from "~/lib/utils";
import { useState } from "react";
type Markets = "Panel líder" | "Futuros" | "Bonos";
const markets = ["Panel líder", "Bonos", "Futuros"] as const;

export default function Home() {
  const waitlist = false;
  const { futures, stocks, bonds } = useStratexContext();
  const [selected, setSelected] = useState<Markets>("Panel líder");

  if (waitlist) {
    redirect("waitlist");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-start gap-4 2xl:mx-0 2xl:max-w-none 2xl:px-0">
        <div className={"mb-4 flex items-center cursor-pointer"}>
          {markets.map((market, index) => (
            <div
              key={index}
              onClick={() => {
                setSelected(market);
              }}
              className={cn(
                "flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary",
                selected === market ? "bg-muted font-medium text-primary" : "text-muted-foreground"
              )}>
              {market}
            </div>
          ))}
        </div>
        {/* <div className="w-full rounded-md border p-4">
          <Input
            placeholder="Filtrar ticker..."
            className="h-8 w-[150px] text-black lg:w-[250px]"
          />
          <ScrollArea className="w-full whitespace-nowrap ">
            <div className="flex w-full justify-center space-x-12 p-4">
              <DolarCard
                title="Dólar Oficial"
                variation={4.95}
                buyPrice={827.75}
                sellPrice={787.75}
              />
              <DolarCard
                title="Dólar Blue"
                variation={1.32}
                buyPrice={995.0}
                sellPrice={945.0}
              />
              <DolarCard
                title="Dólar CCL"
                variation={2.26}
                sellPrice={903.16}
              />
              <DolarCard
                title="Dólar MEP"
                variation={0.42}
                sellPrice={927.75}
              />
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div> */}
        <div className="grid grid-cols-1 gap-3">
          <h2 className="mb-2 text-3xl font-bold">{selected}</h2>
          {selected === "Bonos" ? (
            <BondDataTable data={bonds} columns={bondColumns} />
          ) : selected === "Futuros" ? (
            <FuturesDataTable data={futures} columns={futureColumns} />
          ) : (
            <StockDataTable data={stocks} columns={stockColumns} />
          )}
        </div>
      </div>
    </div>
  );
}
