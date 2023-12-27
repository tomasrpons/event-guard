"use client";

import { usePrimary } from "~/hooks/use-primary";
import { columns as futureColumns } from "~/app/components/futures/columns";
import { columns as spotColumns } from "~/app/components/spot/columns";
import { columns as cedearColumns } from "~/app/components/cedears/columns";
import { DataTable } from "./components/futures/data-table";
import { Input } from "~/components/ui/input";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import DolarCard from "~/components/dolar-card";

export default function Home() {
  const { futures, spot } = usePrimary();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-start gap-4 px-4 py-8">
        <div className="w-full rounded-md border p-4">
          <Input
            placeholder="Filtrar especie..."
            className="h-8 w-[150px] text-black lg:w-[250px]"
          />
          <ScrollArea className="w-full whitespace-nowrap ">
            <div className="flex w-full justify-center space-x-12 p-4">
              <DolarCard
                title="Dólar Blue"
                variation={4.95}
                buyPrice={950.0}
                sellPrice={900.0}
              />
              <DolarCard
                title="Dólar Blue"
                variation={4.95}
                buyPrice={950.0}
                sellPrice={900.0}
              />
              <DolarCard
                title="Dólar Blue"
                variation={4.95}
                buyPrice={950.0}
                sellPrice={900.0}
              />
              <DolarCard
                title="Dólar Blue"
                variation={4.95}
                buyPrice={950.0}
                sellPrice={900.0}
              />
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h2 className="mb-2 text-3xl font-bold">Panel lider</h2>
            <DataTable data={futures} columns={spotColumns} />
          </div>
          <div>
            <h2 className="mb-2 text-3xl font-bold">Cedears</h2>
            <DataTable data={spot} columns={cedearColumns} />
          </div>
          <div>
            <h2 className="mb-2 text-3xl font-bold">Futuros</h2>
            <DataTable data={spot} columns={futureColumns} />
          </div>
        </div>
      </div>
    </div>
  );
}
