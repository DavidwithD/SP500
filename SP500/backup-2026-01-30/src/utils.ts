import * as df from "date-fns";
const formatDate = (date: Date | string) => df.formatDate(date, "yyyy-MM-dd");

const decimalFormat = (n: number) => {
  let formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(n);
};

export { formatDate, decimalFormat };
