"use client";

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import type { FutureDto } from "~/hooks/use-stratex";
import { cn } from "~/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";
import { InfoCircledIcon } from "@radix-ui/react-icons";

export const columns: ColumnDef<FutureDto>[] = [
  {
    accessorKey: "ticker",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Ticker" />,
    cell: ({ row }) => <div>{row.getValue("ticker")}</div>,
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
    cell: ({ row }) => {
      const lastPrice: number = row.getValue("lastPrice");
      const bidPrice = row.original.bidPrice;
      const bidSize = row.original.bidSize;
      const offerPrice = row.original.offerPrice;
      const offerSize = row.original.offerSize;
      return (
        <Tooltip>
          <TooltipTrigger>
            <span className="mr-1">$</span>
            <span className="truncate font-medium">{lastPrice.toLocaleString("es-ES")}</span>
          </TooltipTrigger>
          <TooltipContent>
            <LastPriceTable
              bidPrice={bidPrice?.toLocaleString("es-ES") ?? "0"}
              bidSize={bidSize?.toLocaleString("es-ES") ?? "0"}
              offerPrice={offerPrice?.toLocaleString("es-ES") ?? "0"}
              offerSize={offerSize?.toLocaleString("es-ES") ?? "0"}
            />
          </TooltipContent>
        </Tooltip>
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
            <p>
              Variación esperada entre el último precio spot del papel y el último precio operado del contrato
              correspondiente.
            </p>
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
              Tasa efectiva anual que surge de la variación implícita entre el último precio spot del papel y el último
              precio operado del respectivo contrato de futuro
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
              Tasa nominal anual que surge de la variación implícita entre el último precio spot del papel el último
              precio operado del respectivo contrato de futuro
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
];

const LastPriceTable = (input: { bidPrice: string; bidSize: string; offerPrice: string; offerSize: string }) => {
  const { bidPrice, bidSize, offerPrice, offerSize } = input;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Compra</TableHead>
          <TableHead>Tamaño de la compra</TableHead>
          <TableHead>Venta</TableHead>
          <TableHead className="text-right">Tamaño de la venta</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">$ {bidPrice}</TableCell>
          <TableCell>{bidSize}</TableCell>
          <TableCell>$ {offerPrice}</TableCell>
          <TableCell className="text-right">{offerSize}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
