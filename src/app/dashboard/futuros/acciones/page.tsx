"use client"

import { columns } from "~/app/components/stock/columns";
import { DataTable } from "~/app/components/stock/data-table";
import { useStratexContext } from "~/hooks/stratex-hooks";

export default function Acciones() {
  const { stocks } = useStratexContext();
  return (
    <div className="flex flex-col">
      <h2 className="mb-2 text-3xl font-bold text-left">Resumen</h2>
      <DataTable data={stocks} columns={columns} />
    </div>
  );
}
