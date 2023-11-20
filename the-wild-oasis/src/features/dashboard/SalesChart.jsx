import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkMode } from "../../styles/DarkModeContext";
import {
  addDays,
  differenceInCalendarDays,
  differenceInDays,
  eachDayOfInterval,
  format,
  isSameDay,
  subDays,
} from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

const fakeData = [
  { label: "Jan 09", totalSales: 480, extrasSales: 20 },
  { label: "Jan 10", totalSales: 580, extrasSales: 100 },
  { label: "Jan 11", totalSales: 550, extrasSales: 150 },
  { label: "Jan 12", totalSales: 600, extrasSales: 50 },
  { label: "Jan 13", totalSales: 700, extrasSales: 150 },
  { label: "Jan 14", totalSales: 800, extrasSales: 150 },
  { label: "Jan 15", totalSales: 700, extrasSales: 200 },
  { label: "Jan 16", totalSales: 650, extrasSales: 200 },
  { label: "Jan 17", totalSales: 600, extrasSales: 300 },
  { label: "Jan 18", totalSales: 550, extrasSales: 100 },
  { label: "Jan 19", totalSales: 700, extrasSales: 100 },
  { label: "Jan 20", totalSales: 800, extrasSales: 200 },
  { label: "Jan 21", totalSales: 700, extrasSales: 100 },
  { label: "Jan 22", totalSales: 810, extrasSales: 50 },
  { label: "Jan 23", totalSales: 950, extrasSales: 250 },
  { label: "Jan 24", totalSales: 970, extrasSales: 100 },
  { label: "Jan 25", totalSales: 900, extrasSales: 200 },
  { label: "Jan 26", totalSales: 950, extrasSales: 300 },
  { label: "Jan 27", totalSales: 850, extrasSales: 200 },
  { label: "Jan 28", totalSales: 900, extrasSales: 100 },
  { label: "Jan 29", totalSales: 800, extrasSales: 300 },
  { label: "Jan 30", totalSales: 950, extrasSales: 200 },
  { label: "Jan 31", totalSales: 1100, extrasSales: 300 },
  { label: "Feb 01", totalSales: 1200, extrasSales: 400 },
  { label: "Feb 02", totalSales: 1250, extrasSales: 300 },
  { label: "Feb 03", totalSales: 1400, extrasSales: 450 },
  { label: "Feb 04", totalSales: 1500, extrasSales: 500 },
  { label: "Feb 05", totalSales: 1400, extrasSales: 600 },
  { label: "Feb 06", totalSales: 1450, extrasSales: 400 },
];

const getChartColor = (isDarkMode) =>
  isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

function SalesChart({ bookings, numDays }) {
  const { darkMode } = useDarkMode();
  const color = getChartColor(darkMode);

  // O(N)
  // const chartData = eachDayOfInterval({
  //   start: subDays(new Date(), numDays),
  //   end: new Date(),
  // }).map((date) => ({
  //   label: format(date, "MMM dd"),
  //   totalSales: 0,
  //   extraSales: 0,
  // }));

  // const NDaysAgo = subDays(new Date(), numDays);
  // bookings.forEach(({ created_at, cabinPrice, extraPrice }) => {
  //   const difference = differenceInCalendarDays(new Date(created_at), NDaysAgo);
  //   const totalPrice = cabinPrice + extraPrice;
  //   chartData[difference].totalSales += totalPrice;
  //   chartData[difference].extraSales += extraPrice;
  // });

  const chartData = eachDayOfInterval({
    start: subDays(new Date(), numDays),
    end: new Date(),
  }).map((date) => {
    const sales = bookings.reduce(
      (sale, { created_at, cabinPrice, extraPrice }) =>
        isSameDay(new Date(created_at), date)
          ? {
              totalSales: sale.totalSales + cabinPrice + extraPrice,
              extraSales: sale.extraSales + extraPrice,
            }
          : sale,
      { totalSales: 0, extraSales: 0 }
    );

    return {
      label: format(date, "MMM dd"),
      ...sales,
    };
  });
  return (
    <StyledSalesChart>
      <Heading as="h2">
        Sales from {format(subDays(new Date(), numDays), "MMM dd yyyy")} &mdash;{" "}
        {format(new Date(), "MMM dd yyyy")}
      </Heading>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="4" />
          <XAxis
            dataKey="label"
            tick={{ fill: color.text }}
            tickLine={{ stroke: color.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: color.text }}
            tickLine={{ stroke: color.text }}
          />
          <Tooltip contentStyle={{ backgroundColor: color.background }} />
          <Area
            dataKey="totalSales"
            type="monotone"
            name="Total sales"
            unit="$"
            strokeWidth={2}
            {...color.totalSales}
          />
          <Area
            dataKey="extraSales"
            type="monotone"
            name="Extra Sales"
            unit="$"
            strokeWidth={2}
            {...color.extrasSales}
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
