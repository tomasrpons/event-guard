"use client";

import { columns as FuturesColumns } from "~/app/dashboard/futuros/components/columns";
import { DataTable as FuturesDataTable } from "~/app/dashboard/futuros/components/data-table";
import { useStratexContext } from "~/hooks/stratex-hooks";
import { DataTable as CurvesDataTable } from "./components/data-table";
import { columns as CurvesColumns } from "./components/columns";

export default function Dolar() {
  const { futures } = useStratexContext();
  const dollars = futures.filter((future) => future.ticker?.includes('DLR'))
  return (
    <div className="container">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="mb-2 text-3xl font-bold">Resumen</h2>
          <FuturesDataTable data={dollars} columns={FuturesColumns} />
        </div>
        <div>
          <h2 className="mb-2 text-3xl font-bold">Curvas</h2>
          <CurvesDataTable data={dollars} columns={CurvesColumns} />
        </div>
      </div>
    </div>
  );
}
