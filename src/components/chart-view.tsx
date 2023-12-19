"use client";

import type {
  AreaStyleOptions,
  DeepPartial,
  SeriesOptionsCommon,
  TimeChartOptions,
} from "lightweight-charts";
import type { RefObject } from "react";
import { useEffect } from "react";
import { createChart } from "lightweight-charts";

export interface ChartData {
  value: number;
  time: string;
}

export interface ChartViewProps {
  title: string;
  variation: string;
  chartOptions?: DeepPartial<TimeChartOptions> | undefined;
  areaOptions?: DeepPartial<AreaStyleOptions & SeriesOptionsCommon> | undefined;
  innerRef: RefObject<HTMLDivElement> | null;
  data?: ChartData[]; // Use your custom data type here
}

const ChartView: React.FC<ChartViewProps> = ({
  chartOptions,
  innerRef,
  areaOptions,
  data,
  variation,
  title,
}) => {
  useEffect(() => {
    // We check if tables isnt loaded yet
    if (innerRef?.current && !innerRef?.current.children.length) {
      const chart = createChart(innerRef.current, chartOptions);
      const areaSeries = chart.addAreaSeries(areaOptions);
      if (data) {
        areaSeries.setData(data);
      }
      chart.timeScale().fitContent();
    }
  }, []);

  return (
    <div className="flex-shrink-0 border-solid border-2 border-gray-200 p-4">
      <div className="flex w-full flex-col">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold">{title}</h2>
          <h3 className="font-bold text-green-600">{variation}</h3>
        </div>
        <div ref={innerRef} />
      </div>
    </div>
  );
};
export default ChartView;
