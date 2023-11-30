"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { animate } from "framer-motion";
import { DataTableColumnHeader } from "./data-table-column-header";
import type { PrimaryDto } from "~/hooks/use-primary";
import { useEffect, useRef } from "react";

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
        <span className="truncate font-medium">
          <Counter from={0} to={row.getValue("highestBid")} />
        </span>
      );
    },
  },
  {
    accessorKey: "bidSize",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bid size" />
    ),
    cell: ({ row }) => {
      return (
        <span className="truncate font-medium">
          <Counter from={0} to={row.getValue("bidSize")} />
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
        <span className="truncate font-medium">
          <Counter from={0} to={row.getValue("highestOffer")} />
        </span>
      );
    },
  },
  {
    accessorKey: "offerSize",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Offer size" />
    ),
    cell: ({ row }) => {
      return (
        <span className="truncate font-medium">
          <Counter from={0} to={row.getValue("offerSize")} />
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

const Counter = (input: { from: number; to: number }) => {
  const { from, to } = input;
  const nodeRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const node = nodeRef.current;

    const controls = animate(from, to, {
      duration: 1,
      onUpdate(value: number) {
        if (node) {
          node.textContent = value.toFixed(2);
        }
      },
    });

    return () => controls.stop();
  }, [from, to]);

  return <p ref={nodeRef} />;
};
