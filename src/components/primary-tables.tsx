"use client";
import React from "react";
import BidTable from "./bid-table";
import { usePrimary } from "~/hooks/use-primary";

type PrimaryTablesProps = {
  // Whatever props
};

const PrimaryTables: React.FC<PrimaryTablesProps> = (props) => {
  const { speciesArray } = usePrimary();

  return (
    <div className="flex w-full flex-row justify-around">
      <BidTable data={speciesArray} type="futures" />
      <BidTable data={speciesArray} type="spot" />
    </div>
  );
};

export default PrimaryTables;
