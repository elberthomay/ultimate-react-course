import { differenceInDays } from "date-fns";
import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  const numBookings = bookings.length;
  const sales = confirmedStays.reduce(
    (sum, { cabinPrice, extraPrice }) => sum + cabinPrice + extraPrice,
    0
  );
  const checkins = confirmedStays.length;

  const daysOfStay = confirmedStays.reduce((sum, { startDate, endDate }) => {
    const difference = differenceInDays(new Date(endDate), new Date(startDate));
    return sum + difference;
  }, 0);
  const occupancy = Math.floor((daysOfStay / (numDays * cabinCount)) * 100);
  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={`${occupancy}%`}
      />
    </>
  );
}

export default Stats;
