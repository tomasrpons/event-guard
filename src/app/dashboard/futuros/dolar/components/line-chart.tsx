/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
} from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options: ChartOptions<"line"> = {
  responsive: true,
  scales: {
    y: {
      ticks: {
        callback: function (value) {
          return value + "%";
        },
      },
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        footer,
      },
    },
    legend: {
      position: "top" as const,
    },
  },
};

type LineChartProps = {
  datasets?: { data: number[]; label: string; backgroundColor: string; borderColor: string }[];
  title: string;
  labels: string[];
};

const LineChart: React.FC<LineChartProps> = (props) => {
  const data: ChartData<"line"> = {
    labels: props.labels,
    datasets:
      props.datasets?.map(({ label, data, borderColor, backgroundColor }) => {
        return {
          label,
          data,
          borderColor,
          backgroundColor,
        };
      }) ?? [],
  };
  return (
    <div>
      <h3>{props.title}</h3>
      <Line options={options} data={data} />
    </div>
  );
};

export default LineChart;

function footer(tooltipItems: any[]) {
  const sum = 0;
  console.log("tooltipItems", tooltipItems);
  // tooltipItems.forEach(function (tooltipItem: any) {
  //   sum += tooltipItem.parsed.y;
  // });
  return "Sum: " + sum;
}
