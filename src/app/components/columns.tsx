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
      <DataTableColumnHeader column={column} title="Ticker" />
    ),
    cell: ({ row }) => <div>{row.getValue("symbol")}</div>,
    enableSorting: true,
  },
  {
    accessorKey: "highestBid",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last" />
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
      <DataTableColumnHeader column={column} title="Variación" />
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
      <DataTableColumnHeader column={column} title="Volume" />
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
      <DataTableColumnHeader column={column} title="TC" />
    ),
    cell: ({ row }) => {
      return (
        <span className="truncate font-medium">
          <Counter from={0} to={row.getValue("offerSize")} />
        </span>
      );
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
