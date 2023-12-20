"use client";

import { usePrimary } from "~/hooks/use-primary";
import { columns as futureColumns } from "~/app/components/futures/columns";
import { columns as spotColumns } from "~/app/components/spot/columns";
import { columns as cedearColumns } from "~/app/components/cedears/columns";
import { useRef } from "react";
import { ColorType } from "lightweight-charts";
import { DataTable } from "./components/futures/data-table";
import ChartView from "~/components/chart-view";
import { Input } from "~/components/ui/input";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";

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
  const chartRef5 = useRef<HTMLDivElement>(null);
  const { speciesArray } = usePrimary();
  const futures = speciesArray.filter(({ symbol }) => symbol.includes("/"));
  const spot = speciesArray.filter(({ symbol }) => !symbol.includes("/"));

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-start gap-4 px-4 py-8">
        <div className="w-full rounded-md border p-4">
          <Input
            placeholder="Filtrar especie..."
            className="h-8 w-[150px] text-black lg:w-[250px]"
          />
          <ScrollArea className="w-full whitespace-nowrap ">
            <div className="flex w-max space-x-4 p-4">
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
              <ChartView
                variation="3.41%"
                title={"CCL"}
                data={data}
                innerRef={chartRef5}
                areaOptions={areaOptions}
                chartOptions={chartOptions}
              />
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h2 className="mb-2 text-3xl font-bold">Panel lider</h2>
            <DataTable data={futures} columns={spotColumns} />
          </div>
          <div>
            <h2 className="mb-2 text-3xl font-bold">Cedears</h2>
            <DataTable data={spot} columns={cedearColumns} />
          </div>
          <div>
            <h2 className="mb-2 text-3xl font-bold">Futuros</h2>
            <DataTable data={spot} columns={futureColumns} />
          </div>
        </div>
      </div>
    </div>
  );
}
