"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import type { Table } from "@tanstack/react-table"


  export const expirations = [
    {
      value: "CI",
      label: "CI",
    //   icon: QuestionMarkCircledIcon,
    },
    {
      value: "24hs",
      label: "24hs",
    //   icon: CircleIcon,
    },
    {
      value: "48hs",
      label: "48hs",
    //   icon: StopwatchIcon,
    },
  ]

import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filtrar especie..."
          value={(table.getColumn("symbol")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("symbol")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px] text-black"
        />
        {table.getColumn("expiration") && (
          <DataTableFacetedFilter
            column={table.getColumn("expiration")}
            title="Vencimiento"
            options={expirations}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Resetear
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
