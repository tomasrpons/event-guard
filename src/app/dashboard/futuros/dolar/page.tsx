"use client";

import { columns as FuturesColumns } from "~/app/dashboard/futuros/components/columns";
import { DataTable as FuturesDataTable } from "~/app/dashboard/futuros/components/data-table";
import { useStratexContext } from "~/hooks/stratex-hooks";
import LineChart from "./components/line-chart";

export default function Dolar() {
  const { futures } = useStratexContext();
  const dollars = futures.filter((future) => future.ticker?.includes("DLR"));
  const data = dollars.map((dlr) => (typeof dlr.forwardTem === "number" ? dlr.forwardTem : 0));
  return (
    <div className="container">
      <div className="grid grid-cols-2 gap-4">
        <LineChart
          labels={dollars.map((dllr) => dllr.ticker ?? "")}
          datasets={[
            {
              label: "TEA",
              data: dollars.map((dlr) =>
                typeof dlr.effectiveInterestRate === "number" ? dlr.effectiveInterestRate : 0
              ),
              borderColor: "rgb(163 230 53)",
              backgroundColor: "rgb(163 230 53)",
            },
            {
              label: "TNA",
              data: dollars.map((dlr) => (typeof dlr.nominalInterestRate === "number" ? dlr.nominalInterestRate : 0)),
              borderColor: "rgb(163 230 53)",
              backgroundColor: "rgb(163 230 53)",
            },
          ]}
          title="Curva normal"
        />
        <LineChart
          title="Curva forward"
          labels={dollars.map((dllr) => dllr.ticker ?? "")}
          datasets={[
            {
              label: "TEM",
              data: dollars.map((dlr) => (typeof dlr.forwardTem === "number" ? dlr.forwardTem : 0)),
              borderColor: "rgb(163 230 53)",
              backgroundColor: "rgb(163 230 53)",
            },
          ]}
        />
      </div>
      <div>
        <h2 className="mb-2 text-3xl font-bold">Resumen</h2>
        <FuturesDataTable data={dollars} columns={FuturesColumns} />
      </div>
    </div>
  );
}
