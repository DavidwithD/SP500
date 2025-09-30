import { useEffect, useRef } from "react";
import { Chart, ChartData } from "chart.js";
import LineChart from "./LineChart";

export default function NetworthChart({
  chartData,
}: {
  chartData: ChartData<"line", number[], string>;
}) {
  const chartRef = useRef<Chart<"line">>(null);

  // handle scroll event
  useEffect(() => {
    if (chartRef?.current == null) {
      console.log("chartRef is null", chartRef);
      return;
    }

    const chart = chartRef.current;
    const canvas = chartRef.current.canvas;

    const handleScroll = (event: any) => {
      const deltaX = event.deltaX;
      if (chart.data.labels && chart?.options?.scales?.x) {
        // Update chart based on scroll
        const { left, right, min, max } = chart.scales["x"];
        const m = min + (deltaX / (right - left)) * (max - min);
        if (m >= 0 && m < max - 7) chart.options.scales.x.min = m;
        chart.update();
      }
    };

    canvas.addEventListener("wheel", handleScroll, {
      capture: false,
      passive: true,
    });

    return () => {
      canvas.removeEventListener("wheel", handleScroll);
    };
  }, [chartRef.current]);

  if (!chartData) return <p>Loading...</p>;

  return (
    <div style={{ width: 1280, height: 500 }}>
      <LineChart ref={chartRef} data={chartData} />
    </div>
  );
}
