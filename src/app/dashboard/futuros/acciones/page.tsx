"use client";

import { useStratexContext } from "~/hooks/stratex-hooks";
import { columns } from "../components/columns";
import { DataTable } from "../components/data-table";

export default function Acciones() {
  const { futures } = useStratexContext();
  const stocks = futures.filter((future) => future.forwardContractSegment === 'STOCK');
  return (
    <div className="flex flex-col">
      <h2 className="mb-2 text-3xl font-bold text-left">Resumen</h2>
      <DataTable data={stocks} columns={columns} />
    </div>
  );
}
