"use client";

import { usePrimary } from "~/hooks/use-primary";
import { columns } from "~/app/components/columns";
import { useRef } from "react";
import { ColorType } from "lightweight-charts";
import { DataTable } from "./components/data-table";
import ChartView from "~/components/chart-view";
import { Input } from "~/components/ui/input";

const data = [
  { value: 0, time: "2018-12-12" },
  { value: 8, time: "2018-12-13" },
  { value: 7, time: "2018-12-14" },
  { value: 20, time: "2018-12-15" },
  { value: 3, time: "2018-12-16" },
  { value: 43, time: "2018-12-17" },
  { value: 41, time: "2018-12-18" },
  { value: 43, time: "2018-12-19" },
  { value: 56, time: "2018-12-20" },
  { value: 46, time: "2018-12-21" },
];

const chartOptions = {
  width: 300,
  height: 100,
  layout: {
    textColor: "black",
    background: { type: ColorType.Solid, color: "white" },
  },
};

const areaOptions = {
  lineColor: "#2962FF",
  topColor: "#2962FF",
  bottomColor: "rgba(41, 98, 255, 0.28)",
};

export default function Home() {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartRef2 = useRef<HTMLDivElement>(null);
  const chartRef3 = useRef<HTMLDivElement>(null);
  const chartRef4 = useRef<HTMLDivElement>(null);
  const { speciesArray } = usePrimary();
  const futures = speciesArray.filter(({ symbol }) => symbol.includes("/"));
  const spot = speciesArray.filter(({ symbol }) => !symbol.includes("/"));
  const spotCols = columns;
  const futuresCols = [...columns.slice(0, -2), ...columns.slice(-1)];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-start gap-4 px-4 py-8">
        <div className="flex w-full justify-start">
          <Input
            placeholder="Filtrar especie..."
            className="h-8 w-[150px] text-black lg:w-[250px]"
          />
        </div>
        <div className="flex w-full justify-between gap-4">
          <ChartView
            variation="3.41%"
            title={"AL30"}
            data={data}
            innerRef={chartRef}
            areaOptions={areaOptions}
            chartOptions={chartOptions}
          />
          <ChartView
            variation="3.41%"
            title={"MERVAL"}
            data={data}
            innerRef={chartRef2}
            areaOptions={areaOptions}
            chartOptions={chartOptions}
          />
          <ChartView
            variation="3.41%"
            title={"MEP"}
            data={data}
            innerRef={chartRef3}
            areaOptions={areaOptions}
            chartOptions={chartOptions}
          />
          <ChartView
            variation="3.41%"
            title={"CCL SPY"}
            data={data}
            innerRef={chartRef4}
            areaOptions={areaOptions}
            chartOptions={chartOptions}
          />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h2 className="mb-2 text-3xl font-bold">Panel lider</h2>
            <DataTable data={futures} columns={futuresCols} />
          </div>
          <div>
            <h2 className="mb-2 text-3xl font-bold">Cedears</h2>
            <DataTable data={spot} columns={spotCols} />
          </div>
          <div>
            <h2 className="mb-2 text-3xl font-bold">Futuros</h2>
            <DataTable data={spot} columns={spotCols} />
          </div>
        </div>
      </div>
    </div>
  );
}
