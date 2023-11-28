"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./data-table-column-header";
import type { PrimaryDto } from "~/hooks/use-primary";

export const columns: ColumnDef<PrimaryDto>[] = [
  {
    accessorKey: "symbol",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Especie" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("symbol")}</div>,
    enableSorting: true,
  },
  {
    accessorKey: "highestBid",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bid price" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue("highestBid")}
        </span>
      );
    },
  },
  {
    accessorKey: "highestOffer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Offer price" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue("highestOffer")}
        </span>
      );
    },
  },
  {
    accessorKey: "expiration",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vencimiento" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue("expiration")}
        </span>
      );
    },
    filterFn: (row, id, value: string[]) => {
      return value.includes(row.getValue(id));
    },
  },
];
