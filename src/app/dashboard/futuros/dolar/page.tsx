"use client";

import { columns as FuturesColumns } from "~/app/dashboard/futuros/dolar/components/columns";
import { DataTable as FuturesDataTable } from "~/app/dashboard/futuros/dolar/components/data-table";
import { useStratexContext } from "~/hooks/stratex-hooks";
import LineChart from "./components/line-chart";
import { type FutureDto } from "~/hooks/use-primary";
import { convertToDate } from "~/lib/utils";

function orderByForwardMaturity(dollars: FutureDto[]) {
  return dollars.slice().sort((a, b) => {
    if (a.forwardMaturity && b.forwardMaturity) {
      return convertToDate(a.forwardMaturity) > convertToDate(b.forwardMaturity) ? 1 : -1;
    } else return 0;
  });
}

export default function Dolar() {
  const { futures } = useStratexContext();
  const dollars = futures.filter((future) => future.forwardContractSegment === "DOLAR");
  const orderedTickers = orderByForwardMaturity(dollars);

  return (
    <>
      <div className="hidden sm:grid grid-cols-1 lg:grid-cols-2 gap-4 ">
        <LineChart
          labels={orderedTickers.map((tick) => tick.ticker!)}
          datasets={[
            {
              label: "TEA",
              data: orderedTickers.map((dlr) =>
                typeof dlr.effectiveInterestRate === "number" ? dlr.effectiveInterestRate : 0
              ),
              borderColor: "rgb(163 230 53)",
              backgroundColor: "rgb(163 230 53)",
            },
            {
              label: "TNA",
              data: orderedTickers.map((dlr) =>
                typeof dlr.nominalInterestRate === "number" ? dlr.nominalInterestRate : 0
              ),
              borderColor: "rgb(22 163 74)",
              backgroundColor: "rgb(22 163 74)",
            },
            {
              label: "Tasa Implícita",
              data: orderedTickers.map((dlr) =>
                typeof dlr.impliedInterestRate === "number" ? dlr.impliedInterestRate : 0
              ),
              borderColor: "rgb(77 124 15)",
              backgroundColor: "rgb(77 124 15)",
            },
          ]}
          title="Curva normal"
        />
        <LineChart
          title="Curva forward"
          labels={orderedTickers.map((tick) => tick.ticker!)}
          datasets={[
            {
              label: "TEM",
              data: orderedTickers.map((dlr) => (typeof dlr.forwardTem === "number" ? dlr.forwardTem : 0)),
              borderColor: "rgb(163 230 53)",
              backgroundColor: "rgb(163 230 53)",
            },
          ]}
        />
      </div>
      <div className="mt-4">
        <h2 className="mb-2 text-3xl font-bold">Resumen</h2>
        <FuturesDataTable data={dollars} columns={FuturesColumns} />
      </div>
    </>
  );
}
