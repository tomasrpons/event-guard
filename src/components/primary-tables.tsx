"use client";
import React, { useState } from "react";
import { PrimaryDto, usePrimary } from "~/hooks/use-primary";
import { DataTable } from "~/app/components/data-table";
import { columns } from "~/app/components/columns";
import { cn } from "~/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

const tabs = [
  {
    name: "Futures",
  },
  { name: "Spot" },
] as const;
type PrimaryTablesProps = {
  // type: "futures" | "spot";
};

const HARDCODED_PRIMARY = [
  {
    symbol: "MERV - XMEV - GAL - 48hs",
    expiration: "48hs",
    bidSize: 12,
    offerSize: 11,
    highestBid: 200,
    highestOffer: 300,
  },
  {
    symbol: "MERV - XMEV - YPF - 48hs",
    expiration: "48hs",
    bidSize: 12,
    offerSize: 11,
    highestBid: 200,
    highestOffer: 300,
  },
  {
    symbol: "MERV - XMEV - YPF - 48hs",
    expiration: "48hs",
    bidSize: 122,
    offerSize: 121,
    highestBid: 100,
    highestOffer: 400,
  },
  {
    symbol: "MERV - XMEV - YPF - 24hs",
    expiration: "24hs",
    bidSize: 122,
    offerSize: 121,
    highestBid: 400,
    highestOffer: 3100,
  },
];

const PrimaryTables: React.FC<PrimaryTablesProps> = (props) => {
  const { speciesArray } = usePrimary();
  const [selectedTab, setSelectedTab] = useState<"Futures" | "Spot">("Futures");

  const futures = speciesArray.filter(({ symbol }) => symbol.includes("/"));
  const spot = speciesArray.filter(({ symbol }) => !symbol.includes("/"));
  // const futures = HARDCODED_PRIMARY;
  // const spot = HARDCODED_PRIMARY;

  const spotCols = columns;
  const futuresCols = [...columns.slice(0, -2), ...columns.slice(-1)];

  return (
    <div className="flex w-full flex-col items-center">
      <div className={"mb-4 flex items-center"}>
        {tabs.map((tab) => (
          <div
            key={tab.name}
            onClick={() => {
              setSelectedTab(tab.name);
            }}
            className={cn(
              "flex cursor-pointer items-center px-4",
              selectedTab?.startsWith(tab.name)
                ? "font-bold text-primary"
                : "font-medium text-muted-foreground",
            )}
          >
            {tab.name}
          </div>
        ))}
      </div>
      <DataTable
        data={selectedTab === "Futures" ? futures : spot}
        columns={selectedTab === "Futures" ? futuresCols : spotCols}
      />
    </div>
  );
};

export default PrimaryTables;
