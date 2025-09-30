import React, { forwardRef } from "react";
import { Line } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";

interface MyLineChartProps {
  data: ChartData<"line">;
  options: ChartOptions<"line">;
}

const MyLineChart = forwardRef<ChartJS<"line">, MyLineChartProps>(
  ({ data, options }, ref) => {
    return <Line ref={ref} data={data} options={options} />;
  }
);

export default MyLineChart;
