"use client";

import { usePrimary } from "~/hooks/use-primary";
import { columns as futureColumns } from "~/app/components/futures/columns";
import { columns as spotColumns } from "~/app/components/spot/columns";
import { DataTable as FuturesDataTable } from "./components/futures/data-table";
import { DataTable as SpotDataTable } from "./components/spot/data-table";
import { Input } from "~/components/ui/input";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import DolarCard from "~/components/dolar-card";
import { redirect } from "next/navigation";

export default function Home() {
  const { futures, spot } = usePrimary();
  const waitlist = false;

  if (waitlist) {
    redirect("waitlist");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-start gap-4 px-4">
        <div className="w-full rounded-md border p-4">
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
        </div>
        <div className="mt-2 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h2 className="mb-2 text-3xl font-bold">Panel lider</h2>
            <SpotDataTable data={spot} columns={spotColumns} />
          </div>
          {/* <div>
            <h2 className="mb-2 text-3xl font-bold">Cedears</h2>
            <DataTable data={spot} columns={cedearColumns} />
          </div> */}
          <div>
            <h2 className="mb-2 text-3xl font-bold">Futuros</h2>
            {/* <DataTable data={futures} columns={futureColumns} /> */}
            <FuturesDataTable
              data={[
                { ticker: "gal", bidVolume: 32, lastPrice: 32, variation: 4 },
                { ticker: "gal", bidVolume: 32, lastPrice: 32, variation: 4 },
                { ticker: "gal", bidVolume: 32, lastPrice: 32, variation: 4 },
                { ticker: "gal", bidVolume: 32, lastPrice: 32, variation: 4 },
                { ticker: "gal", bidVolume: 32, lastPrice: 32, variation: 4 },
                { ticker: "gal", bidVolume: 32, lastPrice: 32, variation: 4 },
                { ticker: "gal", bidVolume: 32, lastPrice: 32, variation: 4 },
                { ticker: "gal", bidVolume: 32, lastPrice: 32, variation: 4 },
                { ticker: "gal", bidVolume: 32, lastPrice: 32, variation: 4 },
                { ticker: "gal", bidVolume: 32, lastPrice: 32, variation: 4 },
                { ticker: "gal", bidVolume: 32, lastPrice: 32, variation: 4 },
                { ticker: "gal", bidVolume: 32, lastPrice: 32, variation: 4 },
                { ticker: "gal", bidVolume: 32, lastPrice: 32, variation: 4 },
                { ticker: "gal", bidVolume: 32, lastPrice: 32, variation: 4 },
              ]}
              columns={futureColumns}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
// ticker: string;
// bidVolume: number;
// lastPrice: number;
// variation?: number;
