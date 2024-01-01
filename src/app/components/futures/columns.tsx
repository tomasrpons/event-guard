"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { animate } from "framer-motion";
import { DataTableColumnHeader } from "./data-table-column-header";
import type { TickerDto } from "~/hooks/use-primary";
import { useEffect, useRef } from "react";

export const columns: ColumnDef<TickerDto>[] = [
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
      <DataTableColumnHeader column={column} title="Last" />
    ),
    cell: ({ row }) => {
      return (
        <span className="truncate font-medium">
          <Counter from={0} to={row.getValue("lastPrice") || 0} />
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
      return (
        <span className="truncate font-medium">
          <Counter from={0} to={row.getValue("variation") || 0} />
        </span>
      );
    },
  },
  {
    accessorKey: "bidVolume",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Volumen" />
    ),
    cell: ({ row }) => {
      return (
        <span className="truncate font-medium">
          <Counter from={0} to={row.getValue("bidVolume") || 0} />
        </span>
      );
    },
  },
  // {
  //   accessorKey: "offerSize",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Tasa Implícita" />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <span className="truncate font-medium">
  //         <Counter from={0} to={row.getValue("offerSize") || 0} />
  //       </span>
  //     );
  //   },
  // },
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
