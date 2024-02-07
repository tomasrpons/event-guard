import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  scales: {
    y: {
      ticks: {
        callback: function (value: string | number) {
          return value + "%";
        },
      },
    },
  },
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

const labels = ["50", "100", "150", "200", "250", "300", "350"];

const data = {
  labels,
  datasets: [
    {
      label: "Implícita (TEA) Matba Rofex",
      data: [0, 30, 50, 61, 42, 32],
      borderColor: "rgb(163 230 53)",
      backgroundColor: "rgb(163 230 53)",
    },
    {
      label: "Implícita (TNA) Matba Rofex",
      data: [0, 60, 70, 91, 75, 46],
      borderColor: "rgb(77 124 15)",
      backgroundColor: "rgb(77 124 15)",
    },
  ],
};

export default function LineChart() {
  return <Line options={options} data={data} />;
}
