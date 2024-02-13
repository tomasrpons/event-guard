"use client";

import { columns as FuturesColumns } from "~/app/dashboard/futuros/components/columns";
import { DataTable as FuturesDataTable } from "~/app/dashboard/futuros/components/data-table";
import { useStratexContext } from "~/hooks/stratex-hooks";
import { DataTable as CurvesDataTable } from "./components/data-table";
import { columns as CurvesColumns } from "./components/columns";
import LineChart from "./components/line-chart";

export default function Dolar() {
  const { futures } = useStratexContext();
  const dollars = futures.filter((future) => future.ticker?.includes("DLR"));
  return (
    <div className="container">
      <div className="grid grid-cols-2 gap-4 items-center">
        <div>
          <h2 className="mb-2 text-3xl font-bold">Resumen</h2>
          <FuturesDataTable data={dollars} columns={FuturesColumns} />
        </div>
        <div>
          {/* <div className=""><div>Una breve explicación???</div></div> */}
          <LineChart />
          <div className="flex justify-between">
            {/* <h2>Tasas implícitas (TNA Y TEA)</h2> */}
            <span className="text-sm mr-4">
              {new Date().toLocaleDateString("es-AR", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          {/* <h2 className="mb-2 text-3xl font-bold">Curvas</h2>
          <CurvesDataTable data={dollars} columns={CurvesColumns} /> */}
        </div>
      </div>
    </div>
  );
}
