import { Line } from "react-chartjs-2";
import { forwardRef } from "react";
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Chart,
  Tooltip,
  Title,
  Legend,
  ChartData,
} from "chart.js";
import { ChartOptions } from "chart.js";
import { Price } from "../types";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Title,
  Legend
);

type Props = {
  data: ChartData<"line", number[], string>;
};

const options: ChartOptions<"line"> = {
  animation: false,
  scales: {
    x: {
      ticks: {
        maxTicksLimit: 5,
      },
    },
  },
  datasets: {
    line: {
      borderWidth: (ctx) => (ctx.datasetIndex == 0 ? 1.4 : 1),
      borderColor: (ctx) => (ctx.datasetIndex == 0 ? "#1976d2" : "green"),
      borderJoinStyle: "round",
      tension: 0,
      pointRadius: (ctx) => {
        if (ctx.datasetIndex != 0) return 0;
        var idx = ctx.dataIndex;
        var data = ctx.dataset.rangeData[idx] as Price;
        if (data.share)
          return Math.log10(Math.abs(data.share * data.close)) * 1.5;
        return 0;
      },
      pointBorderWidth: 0,
      pointBackgroundColor: (ctx) => {
        if (ctx.datasetIndex != 0) return "green";
        var idx = ctx.dataIndex;
        var data = ctx.dataset.rangeData[idx] as Price;
        if (data.share) return data.share > 0 ? "#008eff" : "#ff9600";
        return "#1976d2";
      },
      pointHoverRadius: (ctx) => {
        if (ctx.datasetIndex != 0) return 0;
        var idx = ctx.dataIndex;
        var data = ctx.dataset.rangeData[idx] as Price;
        if (data.share)
          return Math.log10(Math.abs(data.share * data.close)) * 1.5;
        return 2;
      },
      pointHoverBorderWidth: 0,
      // pointHoverBackgroundColor: "green",
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: (tooltipItem) => {
          if (tooltipItem.datasetIndex != 0) return "";
          const growthRate = (a: number, b: number) =>
            ((a / b - 1) * 100).toFixed(2);
          const leftIdx = tooltipItem.chart.scales["x"].min;
          const first = tooltipItem.dataset.data[leftIdx] as number;
          const last = tooltipItem.dataset.data.at(-1) as number;
          const value = tooltipItem.raw as number;
          const rate1 = growthRate(value, first);
          const rate2 = growthRate(last, value);
          const arrow1 = String.fromCodePoint(
            value > first ? 10548 : value < first ? 10549 : 8594
          );
          const arrow2 = String.fromCodePoint(
            value < last ? 10548 : value > last ? 10549 : 8594
          );
          return `${rate1}% ${arrow1} ${value} ${arrow2} ${rate2}%`;
        },
        afterLabel(tooltipItem) {
          if (tooltipItem.datasetIndex != 0) return;
          var idx = tooltipItem.dataIndex;
          var share = (tooltipItem.dataset.rangeData[idx] as Price).share;
          if (share)
            return `${share > 0 ? "buy" : "sell"} ${Math.abs(share).toFixed(
              2
            )} shares`;
        },
      },
    },
  },
  interaction: {
    mode: "nearest",
    axis: "x",
    intersect: false,
  },
};

const LineChart = forwardRef<any, Props>((props, ref) => {
  return <Line ref={ref} {...props} options={options} />;
});
export default LineChart;
