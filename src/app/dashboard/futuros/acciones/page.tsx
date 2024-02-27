"use client";

import { useStratexContext } from "~/hooks/stratex-hooks";
import { type FutureStocksTableData, columns } from "./components/columns";
import { DataTable } from "./components/data-table";

export default function Acciones() {
  const { futures } = useStratexContext();
  const stocks = futures.filter((future) => future.forwardContractSegment === "STOCK");

  const groupedData: FutureStocksTableData[] = stocks.reduce((acc: FutureStocksTableData[], current) => {
    const [ticker] = current.ticker?.split("/") ?? [];
    if (!ticker) return acc;

    const existingTickerIndex = acc.findIndex((item) => item.ticker === ticker);

    if (existingTickerIndex !== -1) {
      acc[existingTickerIndex]!.subRows?.push(current);
    } else {
      acc.push({ ticker, subRows: [current] });
    }

    return acc;
  }, []);

  return (
    <div className="flex flex-col">
      <h2 className="mb-2 text-3xl font-bold text-left">Resumen</h2>
      <DataTable data={groupedData} columns={columns} />
    </div>
  );
}
