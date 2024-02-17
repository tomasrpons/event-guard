"use client";

import { columns as FuturesColumns } from "~/app/dashboard/futuros/dolar/components/columns";
import { DataTable as FuturesDataTable } from "~/app/dashboard/futuros/dolar/components/data-table";
import { useStratexContext } from "~/hooks/stratex-hooks";
import LineChart from "./components/line-chart";
import { type FutureDto } from "~/hooks/use-primary";

const spanishMonthOrder: Record<string, number> = {
  ENE: 1,
  FEB: 2,
  MAR: 3,
  ABR: 4,
  MAY: 5,
  JUN: 6,
  JUL: 7,
  AGO: 8,
  SEP: 9,
  OCT: 10,
  NOV: 11,
  DIC: 12,
};
function compareTickers(a: FutureDto, b: FutureDto): number {
  if (a.ticker && b.ticker) {
    const monthA = a.ticker.split("/");
    const monthB = b.ticker.split("/");
    if (monthA[1] && monthB[1]) {
      const monthAName = monthA[1].slice(0, 3);
      const monthBName = monthB[1].slice(0, 3);
      const orderA = spanishMonthOrder[monthAName];
      const orderB = spanishMonthOrder[monthBName];
      if (orderA! < orderB!) {
        return -1;
      }
      if (orderA! > orderB!) {
        return 1;
      }
    }
  }
  return 0;
}

function orderByMonth(tickers: FutureDto[]): FutureDto[] {
  return tickers.slice().sort(compareTickers);
}

export default function Dolar() {
  const { futures } = useStratexContext();
  const dollars = futures.filter((future) => future.forwardContractSegment === "DOLAR");
  const orderedTickers = orderByMonth(dollars);

  return (
    <div className="container">
      <div className="grid grid-cols-2 gap-4">
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
          ]}
          title="Curva normal"
        />
        <LineChart
          title="Curva forward"
          labels={orderedTickers.map((tick) => tick.ticker!)}
          datasets={[
            {
              label: "TEM",
              data: orderedTickers.map((dlr) =>
                typeof dlr.forwardTem === "number" ? dlr.forwardTem : 0
              ),
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
    </div>
  );
}
