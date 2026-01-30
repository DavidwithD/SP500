type Price = {
  date: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  adj_close: number;
  volume: number;
  share: number;
  amount: number;
  buyPrice: number;
};

type TotalType = {
  buyShare: number;
  buyAmount: number;
  sellShare: number;
  sellAmount: number;
  buyPrice: number;
  holdingShare: number;
  holdingValue: number;
  profit: number;
  profitRate: number;
};
export type { Price, TotalType };
