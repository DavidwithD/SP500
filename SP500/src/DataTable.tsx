import { useEffect, useState } from "react";
import * as Papa from "papaparse";
import { v4 } from "uuid";

interface Price {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  adj_close: number;
  volume: number;
}

export default function DataTable() {
  const [data, setData] = useState<Price[]>([]);

  useEffect(() => {
    fetch("/data/sp500.csv")
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          complete: (results) => {
            setData(results.data as Price[]);
          },
          error: (error: any) => {
            console.error("Error parsing CSV file:", error);
          },
        });
      });
  }, []);

  return (
    <div>
      <p>{data.length} records</p>
      <button
        onClick={() => data.slice(0, 5).forEach((row) => console.log(row))}
      >
        log
      </button>
      {data.slice(0, 5).map((row) => (
        <table key={v4()}>
          <thead></thead>
          <tbody style={{ padding: 10 }}>
            <tr>
              <td key={v4()}>{row.date}</td>
              <td key={v4()}>{row.open}</td>
              <td key={v4()}>{row.low}</td>
              <td key={v4()}>{row.high}</td>
              <td key={v4()}>{row.close}</td>
              <td key={v4()}>{row.adj_close}</td>
              <td key={v4()}>{row.volume}</td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
}
