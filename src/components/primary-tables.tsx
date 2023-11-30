"use client";
import React from "react";
import { usePrimary } from "~/hooks/use-primary";
import { DataTable } from "~/app/dashboard/components/data-table";
import { columns } from "~/app/dashboard/components/columns";

type PrimaryTablesProps = {
  type: 'futures' | 'spot'
};

const PrimaryTables: React.FC<PrimaryTablesProps> = (props) => {
  const { speciesArray } = usePrimary();

  const futures = speciesArray.filter(({symbol}) => symbol.includes("/"));
  const spot = speciesArray.filter(({symbol}) => !symbol.includes("/"));

  return (
    <div className="flex w-full flex-col">
      <DataTable data={props.type === 'futures' ? futures : spot} columns={columns} />
    </div>
  );
};

export default PrimaryTables;
