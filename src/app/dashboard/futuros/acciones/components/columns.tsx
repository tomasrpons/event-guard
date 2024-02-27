"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { cn } from "~/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";
import { DividerVerticalIcon, InfoCircledIcon, MinusCircledIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { type FutureDto } from "~/hooks/use-stratex";
import LastPriceTableTooltip from "~/components/last-price-table-tooltip";

export type FutureStocksTableData = {
  ticker?: string;
  subRows?: FutureStocksTableData[];
} & FutureDto;

export const columns: ColumnDef<FutureStocksTableData>[] = [
  {
    id: "expander",
    header: () => null,
    cell: ({ row }) => {
      return (
        <div
          style={{
            paddingLeft: `${row.depth * 2}rem`,
          }}>
          {row.getCanExpand() && row.depth < 1 ? (
            <button
              {...{
                onClick: row.getToggleExpandedHandler(),
                style: { cursor: "pointer" },
              }}>
              {row.getIsExpanded() ? <MinusCircledIcon /> : <PlusCircledIcon />}
            </button>
          ) : null}
        </div>
      );
    },
  },
  {
    accessorKey: "ticker",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Ticker" />,
    cell: (info) => {
      const subRows = info.row.subRows;
      return (
        <div className="flex gap-1 items-center">
          <span>{info.getValue() as string}</span>
          {info.row.depth === 0 ? (
            <div className="flex items-center">
              <DividerVerticalIcon /> Contratos:{" "}
              {subRows.reduce((acc, current) => acc + (current.original?.tradeVolume ?? 0), 0)}
            </div>
          ) : null}
        </div>
      );
    },
    enableSorting: true,
    sortingFn: (a, b) => {
      if (a.original?.ticker && b.original?.ticker) {
        const [speciesA, monthA] = a.original.ticker?.split("/") as [string, string];
        const [speciesB, monthB] = b.original.ticker?.split("/") as [string, string];

        if (speciesA < speciesB) return 1;
        if (speciesA > speciesB) return -1;

        // If species names are same, compare months
        const monthOrder = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
        const indexA = monthOrder.indexOf(monthA.slice(0, 3));
        const indexB = monthOrder.indexOf(monthB.slice(0, 3));

        return indexB - indexA;
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
    cell: (info) => {
      const bidPrice = info.row.original.bidPrice;
      const bidSize = info.row.original.bidSize;
      const offerPrice = info.row.original.offerPrice;
      const offerSize = info.row.original.offerSize;
      const lastPrice = info.getValue() as number;
      if (info.row.depth > 0) {
        return (
          <LastPriceTableTooltip
            bidPrice={bidPrice ?? 0}
            bidSize={bidSize ?? 0}
            offerPrice={offerPrice ?? 0}
            offerSize={offerSize ?? 0}
            lastPrice={lastPrice ?? 0}
          />
        );
      } else {
        return <span className="font-medium">-</span>;
      }
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
    cell: (info) => {
      const closingPrice = info.getValue() as number;
      if (info.row.depth > 0) {
        return <span className="font-medium">$ {closingPrice?.toLocaleString("es-ES") || 0}</span>;
      } else {
        return <span className="font-medium">-</span>;
      }
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
    cell: (info) => {
      const variation = info.getValue() as number;
      if (info.row.depth > 0) {
        return (
          <div
            className={cn(
              "flex font-medium",
              variation > 0 ? "text-green-600" : variation < 0 ? "text-red-600" : undefined
            )}>
            {variation > 0 ? "+" : undefined}
            {!isNaN(variation) ? (variation * 100).toFixed(2) : 0}
            <span className="ml-1">%</span>
          </div>
        );
      } else {
        return <span className="font-medium">-</span>;
      }
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
    cell: (info) => {
      const tradeVolume = info.getValue() as number;
      if (info.row.depth > 0) {
        return <span className="font-medium">{tradeVolume?.toLocaleString("es-ES") || 0}</span>;
      } else {
        return <span className="font-medium">-</span>;
      }
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
            <p>
              Variación esperada entre el último precio spot del papel y el último precio operado del contrato
              correspondiente.
            </p>
          </TooltipContent>
        </Tooltip>
      </DataTableColumnHeader>
    ),
    cell: (info) => {
      const impliedInterestRate = info.getValue() as number;
      if (info.row.depth > 0) {
        return (
          <div className="truncate font-medium flex">
            {!isNaN(impliedInterestRate) ? impliedInterestRate.toLocaleString("es-ES") : 0}
            <span className="ml-1">%</span>
          </div>
        );
      } else {
        return <span className="font-medium">-</span>;
      }
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
              Tasa efectiva anual que surge de la variación implícita entre el último precio spot del papel y el último
              precio operado del respectivo contrato de futuro
            </p>
          </TooltipContent>
        </Tooltip>
      </DataTableColumnHeader>
    ),
    cell: (info) => {
      const effectiveInterestRate = info.getValue() as number;
      if (info.row.depth > 0) {
        return (
          <div className="truncate font-medium flex">
            {!isNaN(effectiveInterestRate) ? effectiveInterestRate.toLocaleString("es-ES") : 0}
            <span className="ml-1">%</span>
          </div>
        );
      } else {
        return <span className="font-medium">-</span>;
      }
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
              Tasa nominal anual que surge de la variación implícita entre el último precio spot del papel el último
              precio operado del respectivo contrato de futuro
            </p>
          </TooltipContent>
        </Tooltip>
      </DataTableColumnHeader>
    ),
    cell: (info) => {
      const nominalInterestRate = info.getValue() as number;
      if (info.row.depth > 0) {
        return (
          <div className="truncate font-medium flex">
            {!isNaN(nominalInterestRate) ? nominalInterestRate.toLocaleString("es-ES") : 0}
            <span className="ml-1">%</span>
          </div>
        );
      } else {
        return <span className="font-medium">-</span>;
      }
    },
    enableSorting: true,
  },
];
