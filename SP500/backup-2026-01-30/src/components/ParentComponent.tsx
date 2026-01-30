import React, { useRef, useState } from "react";
import MyLineChart from "./MyLineChart";
import { ChartData, ChartOptions } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";

const initialData: ChartData<"line"> = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Initial dataset",
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

const updatedData: ChartData<"line"> = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Updated dataset",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      data: [28, 48, 40, 19, 86, 27, 90],
    },
  ],
};

const options: ChartOptions<"line"> = {
  responsive: true,
  scales: {
    x: {
      title: {
        display: true,
        text: "Month",
      },
    },
    y: {
      title: {
        display: true,
        text: "Value",
      },
    },
  },
};

const ParentComponent: React.FC = () => {
  const chartRef = useRef<ChartJS<"line"> | null>(null);
  const [chartData, setChartData] = useState<ChartData<"line">>(initialData);

  const handleUpdateData = () => {
    setChartData(updatedData);
  };

  const handleGetChartData = () => {
    if (chartRef.current) {
      console.log(chartRef.current.data);
    }
  };

  return (
    <div>
      <h1>Line Chart Example with forwardRef</h1>
      <MyLineChart ref={chartRef} data={chartData} options={options} />
      <button onClick={handleUpdateData}>Update Data</button>
      <button onClick={handleGetChartData}>Get Chart Data</button>
    </div>
  );
};

export default ParentComponent;
