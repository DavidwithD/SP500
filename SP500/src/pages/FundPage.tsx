import { useEffect, useReducer, useState } from "react";
import NetworthChart from "../components/NetworthChart";
import { Price, TotalType } from "../types";
import Papa from "papaparse";
import { v4 } from "uuid";
import { decimalFormat, formatDate } from "../utils";
import { ChartData } from "chart.js";
import "./FundPage.css";

export default function FundPage() {
  /// idx
  const [idx, increaseIdx] = useReducer(
    (curr: number, n: number) => curr + n,
    JSON.parse(localStorage["idx"] ?? "10") ?? 10
  );
  useEffect(() => {
    localStorage["idx"] = JSON.stringify(idx);
  }, [idx]);
  /// data
  const [data, setData] = useState<Price[]>(
    JSON.parse(localStorage["worthData"] ?? "[]") ?? []
  );
  const [chartData, setChartdata] =
    useState<ChartData<"line", number[], string>>();

  const [total, setTotal] = useState<TotalType>(
    JSON.parse(localStorage["total"] ?? null) ?? {
      buyShare: 0,
      buyAmount: 0,
      sellShare: 0,
      sellAmount: 0,
      holdingShare: 0,
      holdingValue: 0,
      profit: 0,
    }
  );

  const tradePercent =
    (sign: number = 1) =>
    (percentage: number) =>
      makeTrade(sign)(
        ((total.buyAmount + total.sellAmount) * percentage) / 100
      );

  const makeTrade =
    (sign: number = 1) =>
    (amount: number) => {
      if (amount == 0) return;
      amount *= sign;
      var price = data[idx].close;
      var share = Math.round((amount / price) * 100) / 100;
      if (total.buyShare + total.sellShare + share < 0) {
        alert("you don't have enough shares to sell.");
        return;
      }
      if (share > 0) {
        total.buyShare += share;
        total.buyAmount += amount;
      } else if (share < 0) {
        total.sellShare += share;
        total.sellAmount += amount;
      }
      total.holdingShare = total.buyShare + total.sellShare;
      total.holdingValue = total.holdingShare * price;
      total.profit = -total.buyAmount - total.sellAmount + total.holdingValue;
      total.profitRate =
        total.buyAmount == 0 ? 0 : total.profit / total.buyAmount;
      var buyPrice = (total.buyPrice =
        total.buyShare == 0 ? 0 : total.buyAmount / total.buyShare);
      setData(
        data.map((d, i) => {
          if (i == idx) return { ...d, share, amount, buyPrice };
          if (i > idx) return { ...d, buyPrice };
          else return d;
        })
      );
      setTotal({ ...total });
      console.log(total);
      localStorage["total"] = JSON.stringify(total);
      increaseIdx(1);
    };

  // read data from csv file
  useEffect(() => {
    if (!data || data.length == 0)
      fetch("/data/sp500.csv")
        .then((response) => response.text())
        .then((csvText) => {
          Papa.parse(csvText, {
            header: true,
            dynamicTyping: true,
            complete: (results) => {
              var temp = results.data
                .map(
                  (row: any) =>
                    ({
                      ...row,
                      date: new Date(row.date),
                      buyPrice: 0,
                      share: 0,
                      amount: 0,
                    } as Price)
                )
                .reverse();
              setData(temp);
            },
            error: (error: any) => {
              console.error("Error parsing CSV file:", error);
            },
          });
        });
  }, []);

  // chart data
  useEffect(() => {
    if (!data || data.length == 0) return;
    localStorage["worthData"] = JSON.stringify(data);
    const rangeData: Price[] = data.slice(0, idx);
    setChartdata({
      labels: rangeData.map((row) => formatDate(row.date)),
      datasets: [
        {
          label: "Net Worth",
          data: rangeData.map((row) => row.close),
          rangeData,
        },
        {
          label: "Holding Price",
          data: rangeData.map((row) => row.buyPrice),
        },
      ],
      borderwidth: 1,
    });
  }, [data, idx]);

  if (!idx || !data || !chartData) return <p>Loading...</p>;

  if (idx >= data.length) return <StatisticBox />;
  return (
    <div>
      <Greeting today={data[idx].date} />
      <NetworthChart {...{ chartData }} />
      <div className="flex_container">
        <OperationArea {...{ increaseIdx, tradeFn: tradePercent }} />
        <StatisticBox />
      </div>
      {/* <TradeHistory {...{ trade, data, idx }} /> */}
    </div>
  );

  ///////////////
  ///////////////
  ///// functions //////////////////////////////////////////////////////

  function Greeting({ today }: { today: Date | string }) {
    if (!today) return <p>Loading...</p>;
    return (
      <div>
        <p>
          Today is <strong>{new Date(today).toUTCString()}</strong>
        </p>
      </div>
    );
  }

  function StatisticBox() {
    return (
      <div className="grid-container">
        <p className="grid-item">buy</p>
        <p className="grid-item">{decimalFormat(total.buyShare)}</p>
        <p className="grid-item">shares</p>
        <p className="grid-item">cost</p>
        <p className="grid-item">{decimalFormat(total.buyAmount)}$</p>
        <p className="grid-item">sell</p>
        <p className="grid-item">{decimalFormat(total.sellShare)}</p>
        <p className="grid-item">shares</p>
        <p className="grid-item">get</p>
        <p className="grid-item">{decimalFormat(total.sellAmount)}$</p>
        <p className="grid-item">holding</p>
        <p className="grid-item">{decimalFormat(total.holdingShare)}</p>
        <p className="grid-item">shares</p>
        <p className="grid-item">value</p>
        <p className="grid-item">{decimalFormat(total.holdingValue)}$</p>
        <p className="grid-item">profit Rate</p>
        <p className="grid-item">{decimalFormat(total.profitRate * 100)}%</p>
        <p className="grid-item"></p>
        <p className="grid-item">profit</p>
        <p className="grid-item">{decimalFormat(total.profit)}$</p>
      </div>
    );
  }
}

function OperationArea({
  increaseIdx,
  tradeFn,
}: {
  increaseIdx: React.Dispatch<number>;
  tradeFn: (sign?: number) => (amount: number) => void;
}) {
  const [days, setDays] = useState(500);
  return (
    <div className="operation_area">
      <button onClick={() => increaseIdx(1)}>Tomorrow</button>
      <button onClick={() => increaseIdx(5)}>5 Days Later</button>
      <input type="number" onChange={(e) => setDays(e.target.valueAsNumber)} />
      <button onClick={() => increaseIdx(days)}> Days Later</button>
      <br />
      <InputsGroup />
    </div>
  );

  function InputsGroup() {
    const [value, setValue] = useState(2000000);
    const values = [0.05, 0.1, 1, 2, 5, 10, 20, 30, 50];
    const arrs = [
      {
        type: "Buy",
        sign: 1,
        values,
      },
      {
        type: "Sell",
        sign: -1,
        values,
      },
    ];

    return (
      <div style={{ display: "flex" }}>
        {arrs.map((arr, i) => (
          <div key={i} className="input_box">
            <p className="trade_type">{arr.type}</p>
            {arr.values.map((n) => (
              <button
                className="input_button"
                key={v4()}
                onClick={() => tradeFn(arr.sign)(n)}
              >
                {n}%
              </button>
            ))}
            {/* <input
              className="trade_value_input"
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.valueAsNumber)}
              onKeyDown={(e) => {
                if (e.key == "Enter") makeTrade(arr.sign)(value);
              }}
            /> */}
          </div>
        ))}
      </div>
    );
  }
}

// function TradeHistory({
//   trade,
//   data,
//   idx,
// }: {
//   trade: Map<number, number>;
//   data: Price[];
//   idx: number;
// }) {
//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>date</th>
//           <th>type</th>
//           <th>price</th>
//           <th>share</th>
//           <th>amount</th>
//         </tr>
//       </thead>
//       <tbody>
//         {Array.from(trade)
//           .reverse()
//           .map(([index, share]) => (
//             <tr key={v4()}>
//               <td>{formatDate(data[index].date)}</td>
//               <td>{data[index].share > 0 ? "buy" : "sell"}</td>
//               <td>{index < idx ? Math.abs(data[index].close) : "???"}</td>
//               <td>{index < idx ? Math.abs(share) : "???"}</td>
//               <td>{Math.abs(data[index].amount)}</td>
//             </tr>
//           ))}
//       </tbody>
//     </table>
//   );
// }
