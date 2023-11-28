"use client";
import React from "react";
import BidTable from "./bid-table";
import { usePrimary } from "~/hooks/use-primary";
import { DataTable } from "~/app/dashboard/components/data-table";
import { columns } from "~/app/dashboard/components/columns";

type PrimaryTablesProps = {
  // Whatever props
};

const PrimaryTables: React.FC<PrimaryTablesProps> = (props) => {
  const { speciesArray } = usePrimary();

  const futures = speciesArray.filter(({symbol}) => symbol.includes("/"));
  const spot = speciesArray.filter(({symbol}) => !symbol.includes("/"));

  return (
    <div className="flex w-full flex-row justify-around">
      <DataTable data={futures} columns={columns} />
      <DataTable data={spot} columns={columns} />
    </div>
  );
};

export default PrimaryTables;
