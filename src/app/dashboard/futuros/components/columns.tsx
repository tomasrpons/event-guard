"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import type { FutureDto } from "~/hooks/use-primary";
import { cn } from "~/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";

export const columns: ColumnDef<FutureDto>[] = [
  {
    accessorKey: "ticker",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Ticker" />,
    cell: ({ row }) => <div>{row.getValue("ticker")}</div>,
    enableSorting: true,
  },
  {
    accessorKey: "lastPrice",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Último precio" />,
    cell: ({ row }) => {
      const lastPrice: number = row.getValue("lastPrice");
      return (
        <>
          <span className="mr-1">$</span>
          <span className="truncate font-medium">{lastPrice.toLocaleString('es-ES')}</span>
        </>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "variation",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Variación" />,
    cell: ({ row }) => {
      const variation: number = row.getValue("variation");
      const parsedValue = +Number((variation * 100).toFixed(2)).toLocaleString('es-ES');
      return (
        <span className="truncate font-medium">
          <div className={cn("flex", variation > 0 ? "text-green-600" : variation < 0 ? "text-red-600" : undefined)}>
            {parsedValue > 0 ? "+" : undefined}
            {!isNaN(parsedValue) ? (parsedValue * 100).toFixed(2) : 0}
            <span className="ml-1">%</span>
          </div>
        </span>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "tradeVolume",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Volumen" />,
    cell: ({ row }) => {
      const tradeVolume: number = row.getValue("tradeVolume");
      return <span className="truncate font-medium">{tradeVolume}</span>;
    },
    enableSorting: true,
  },
  {
    accessorKey: "effectiveInterestRate",
    header: ({ column }) => (
      <>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <DataTableColumnHeader column={column} title="TEA" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Calculo de TEA</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </>
    ),
    cell: ({ row }) => {
      const tea: number = row.getValue("effectiveInterestRate");
      return (
        <span className="truncate font-medium flex">
          {!isNaN(tea) ? tea : 0}
          <span className="ml-1">%</span>
        </span>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "nominalInterestRate",
    header: ({ column }) => (
      <>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <DataTableColumnHeader column={column} title="TNA" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Calculo de TNA</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </>
    ),
    cell: ({ row }) => {
      const tna: number = row.getValue("nominalInterestRate");
      return (
        <span className="truncate font-medium flex">
          {!isNaN(tna) ? tna : 0}
          <span className="ml-1">%</span>
        </span>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "impliedInterestRate",
    header: ({ column }) => (
      <>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <DataTableColumnHeader column={column} title="Tasa Implícita" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Calculo de la Tasa Implícita</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </>
    ),
    cell: ({ row }) => {
      const impliedInterestRate: number = row.getValue("impliedInterestRate");
      return (
        <span className="truncate font-medium flex">
          {!isNaN(impliedInterestRate) ? impliedInterestRate : 0}
          <span className="ml-1">%</span>
        </span>
      );
    },
    enableSorting: true,
  },
];
