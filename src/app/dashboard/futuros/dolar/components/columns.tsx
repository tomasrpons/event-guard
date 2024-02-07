"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import type { FutureDto } from "~/hooks/use-primary";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import ToggleChartButton from "./toggle-chart-button";

export const columns: ColumnDef<FutureDto>[] = [
  {
    accessorKey: "ticker",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Ticker" />,
    cell: ({ row }) => <div>{row.getValue("ticker")}</div>,
    enableSorting: true,
  },
  {
    accessorKey: "forward",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Curva forward" />,
    enableSorting: false,
    cell: ({ row }) => {
      return <ToggleChartButton />;
    },
  },
  {
    accessorKey: "normal",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Curva normal" />,
    enableSorting: false,
    cell: ({ row }) => {
      return <ToggleChartButton />;
    },
  },
];
