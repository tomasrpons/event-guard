"use client";
import React, { useState } from "react";
import { usePrimary } from "~/hooks/use-primary";
import { DataTable } from "~/app/dashboard/components/data-table";
import { columns } from "~/app/dashboard/components/columns";
import { cn } from "~/lib/utils";

const tabs = [
  {
    name: "Futures",
  },
  { name: "Spot" },
] as const;
type PrimaryTablesProps = {
  // type: "futures" | "spot";
};

const PrimaryTables: React.FC<PrimaryTablesProps> = (props) => {
  const { speciesArray } = usePrimary();
  const [selectedTab, setSelectedTab] = useState<"Futures" | "Spot">("Futures");

  const futures = speciesArray.filter(({ symbol }) => symbol.includes("/"));
  const spot = speciesArray.filter(({ symbol }) => !symbol.includes("/"));

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
                ? "font-bold text-white"
                : "font-medium text-black",
            )}
          >
            {tab.name}
          </div>
        ))}
      </div>
      <DataTable
        data={selectedTab === "Futures" ? futures : spot}
        columns={columns}
      />
    </div>
  );
};

export default PrimaryTables;
