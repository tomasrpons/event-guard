"use client";

import { columns as FuturesColumns } from "~/app/dashboard/futuros/components/columns";
import { DataTable as FuturesDataTable } from "~/app/dashboard/futuros/components/data-table";
import { useStratexContext } from "~/hooks/stratex-hooks";
import LineChart from "./components/line-chart";

export default function Dolar() {
  const { futures } = useStratexContext();
  const dollars = futures.filter((future) => future.ticker?.includes("DLR"));
  return (
    <div className="container">
      <div className="grid grid-cols-2 gap-4">
        <LineChart title="Curva normal" />
        <LineChart title="Curva forward" />
      </div>
      <div>
        <h2 className="mb-2 text-3xl font-bold">Resumen</h2>
        <FuturesDataTable data={dollars} columns={FuturesColumns} />
      </div>
    </div>
  );
}
