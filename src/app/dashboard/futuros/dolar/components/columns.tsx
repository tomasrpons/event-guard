"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import type { FutureDto } from "~/hooks/use-stratex";
import { cn, convertToDate } from "~/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";
import { InfoCircledIcon } from "@radix-ui/react-icons";

export const columns: ColumnDef<FutureDto>[] = [
  {
    accessorKey: "ticker",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Ticker" />,
    cell: ({ row }) => <div>{row.getValue("ticker")}</div>,
    enableSorting: true,
    sortingFn: (a, b) => {
      if (a.original.forwardMaturity && b.original.forwardMaturity) {
        const dateA = convertToDate(a.original.forwardMaturity);
        const dateB = convertToDate(b.original.forwardMaturity);
        if (dateA < dateB) {
          return 1;
        } else if (dateA > dateB) {
          return -1;
        } else {
          return 0;
        }
      } else return 0;
    },
  },
  {
    accessorKey: "lastPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Último precio">
        <Tooltip>
          <TooltipTrigger>
            <InfoCircledIcon className="h-4 w-4" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Último precio operado en Rofex</p>
          </TooltipContent>
        </Tooltip>
      </DataTableColumnHeader>
    ),
    cell: ({ row }) => {
      const lastPrice: number = row.getValue("lastPrice");
      return (
        <>
          <span className="mr-1">$</span>
          <span className="truncate font-medium">{lastPrice.toLocaleString("es-ES")}</span>
        </>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "closingPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Precio de cierre">
        <Tooltip>
          <TooltipTrigger>
            <InfoCircledIcon className="h-4 w-4" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Último precio operado de la última rueda bursátil completa</p>
          </TooltipContent>
        </Tooltip>
      </DataTableColumnHeader>
    ),
    cell: ({ row }) => {
      const closingPrice: number = row.getValue("closingPrice");
      return (
        <>
          <span className="mr-1">$</span>
          <span className="truncate font-medium">{closingPrice.toLocaleString("es-ES")}</span>
        </>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "variation",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Variación">
        <Tooltip>
          <TooltipTrigger>
            <InfoCircledIcon className="h-4 w-4" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Variación que surge entre último precio y precio de cierre </p>
          </TooltipContent>
        </Tooltip>
      </DataTableColumnHeader>
    ),
    cell: ({ row }) => {
      const variation: number = row.getValue("variation");
      return (
        <span className="truncate font-medium">
          <div className={cn("flex", variation > 0 ? "text-green-600" : variation < 0 ? "text-red-600" : undefined)}>
            {variation > 0 ? "+" : undefined}
            {!isNaN(variation) ? (variation * 100).toFixed(2) : 0}
            <span className="ml-1">%</span>
          </div>
        </span>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "tradeVolume",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Volumen">
        <Tooltip>
          <TooltipTrigger>
            <InfoCircledIcon className="h-4 w-4" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Cantidad de contratos operados en la actual rueda bursátil </p>
          </TooltipContent>
        </Tooltip>
      </DataTableColumnHeader>
    ),
    cell: ({ row }) => {
      const tradeVolume: number = row.getValue("tradeVolume");
      return <span className="truncate font-medium">{+tradeVolume.toLocaleString("es-ES")}</span>;
    },
    enableSorting: true,
  },
  {
    accessorKey: "impliedInterestRate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tasa Implícita">
        <Tooltip>
          <TooltipTrigger>
            <InfoCircledIcon className="h-4 w-4" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Calculo de la Tasa Implícita</p>
          </TooltipContent>
        </Tooltip>
      </DataTableColumnHeader>
    ),
    cell: ({ row }) => {
      const impliedInterestRate: number = row.getValue("impliedInterestRate");
      return (
        <span className="truncate font-medium flex">
          {!isNaN(impliedInterestRate) ? impliedInterestRate.toLocaleString("es-ES") : 0}
          <span className="ml-1">%</span>
        </span>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "effectiveInterestRate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TEA">
        <Tooltip>
          <TooltipTrigger>
            <InfoCircledIcon className="h-4 w-4" />
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Tasa efectiva anual que surge de la variación implícita entre el dólar mayorista y el precio de cierre del
              respectivo contrato.
            </p>
          </TooltipContent>
        </Tooltip>
      </DataTableColumnHeader>
    ),
    cell: ({ row }) => {
      const tea: number = row.getValue("effectiveInterestRate");
      return (
        <span className="truncate font-medium flex">
          {!isNaN(tea) ? tea.toLocaleString("es-ES") : 0}
          <span className="ml-1">%</span>
        </span>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "nominalInterestRate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TNA">
        <Tooltip>
          <TooltipTrigger>
            <InfoCircledIcon className="h-4 w-4" />
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Tasa nominal anual que surge de la variación implícita entre el dólar mayorista y el precio de cierre del
              respectivo contrato.
            </p>
          </TooltipContent>
        </Tooltip>
      </DataTableColumnHeader>
    ),
    cell: ({ row }) => {
      const tna: number = row.getValue("nominalInterestRate");
      return (
        <span className="truncate font-medium flex">
          {!isNaN(tna) ? tna.toLocaleString("es-ES") : 0}
          <span className="ml-1">%</span>
        </span>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "forwardTem",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TEM">
        <Tooltip>
          <TooltipTrigger>
            <InfoCircledIcon className="h-4 w-4" />
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Tasa efectiva mensual que surge de la variación implícita entre el dólar mayorista y el precio de cierre
              del respectivo contrato.
            </p>
          </TooltipContent>
        </Tooltip>
      </DataTableColumnHeader>
    ),
    cell: ({ row }) => {
      const forwardTem: number = row.getValue("forwardTem");
      return (
        <span className="truncate font-medium flex">
          {!isNaN(forwardTem) ? forwardTem.toLocaleString("es-ES") : 0}
          <span className="ml-1">%</span>
        </span>
      );
    },
    enableSorting: true,
  },
];
