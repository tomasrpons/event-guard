"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import type { StockDto } from "~/hooks/use-primary";
import Counter from "~/components/counter";
import { cn } from "~/lib/utils";
import { usePrevious } from "~/hooks/use-previous";

export const columns: ColumnDef<StockDto>[] = [
  {
    accessorKey: "ticker",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ticker" />
    ),
    cell: ({ row }) => <div>{row.getValue("ticker")}</div>,
    enableSorting: true,
  },
  {
    accessorKey: "lastPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Último precio" />
    ),
    cell: ({ row }) => {
      const lastPrice: number = row.getValue("lastPrice");
      const previousLastPrice = !isNaN(usePrevious(lastPrice))
        ? usePrevious(lastPrice)
        : 0;
      return (
        <span className="truncate font-medium">
          <Counter from={previousLastPrice} to={lastPrice} />
        </span>
      );
    },
  },
  {
    accessorKey: "variation",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Variación" />
    ),
    cell: ({ row }) => {
      const variation: number = row.getValue("variation");
      const previousVariation = !isNaN(usePrevious(variation))
        ? usePrevious(variation)
        : 0;
      return (
        <span className="truncate font-medium">
          <div
            className={cn(
              "flex",
              variation > 0
                ? "text-green-600"
                : variation < 0
                  ? "text-red-600"
                  : undefined,
            )}
          >
            {variation > 0 ? "+" : undefined}
            <Counter from={previousVariation} to={variation} />
            <span className="ml-1">%</span>
          </div>
        </span>
      );
    },
  },
  {
    accessorKey: "tradeVolume",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Volumen" />
    ),
    cell: ({ row }) => {
      const tradeVolume: number = row.getValue("tradeVolume");
      const previousTradeVolume = !isNaN(usePrevious(tradeVolume))
        ? usePrevious(tradeVolume)
        : 0;
      return (
        <span className="truncate font-medium">
          <Counter from={previousTradeVolume} to={tradeVolume} />
        </span>
      );
    },
  },
  // {
  //   accessorKey: "dollarMEP",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="MEP" />
  //   ),
  //   cell: ({ row }) => {
  //     const dollarMEP: number = row.getValue("dollarMEP");
  //     const previousDollarMEP = !isNaN(usePrevious(dollarMEP))
  //       ? usePrevious(dollarMEP)
  //       : 0;
  //     return (
  //       <span className="truncate font-medium">
  //         <Counter from={previousDollarMEP} to={dollarMEP} />
  //       </span>
  //     );
  //   },
  // },
];
