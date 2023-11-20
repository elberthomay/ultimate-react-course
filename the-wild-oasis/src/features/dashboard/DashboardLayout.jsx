import styled from "styled-components";
import useBookingsAfterDate from "./useBookingsAfterDate";
import useStaysAfterDate from "./useStaysAfterDate";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { useSearchParams } from "react-router-dom";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import Today from "../check-in-out/TodayActivity";
import useTodayActivity from "../check-in-out/useTodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const [searchParams] = useSearchParams();

  const numDays = Math.min(Number(searchParams.get("last") || "7"), 365);

  const {
    isLoading: bookingIsLoading,
    error: bookingError,
    bookings,
  } = useBookingsAfterDate(numDays);

  const {
    isLoading: staysIsLoading,
    error: staysError,
    stays,
    confirmedStays,
  } = useStaysAfterDate(numDays);

  const {
    isLoading: todayActivityIsLoading,
    error: todayActivityError,
    todayActivity,
  } = useTodayActivity();

  const { isLoading: cabinIsLoading, error: cabinError, cabins } = useCabins();

  const isLoading =
    bookingIsLoading ||
    staysIsLoading ||
    cabinIsLoading ||
    todayActivityIsLoading;

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <StyledDashboardLayout>
          <Stats
            bookings={bookings}
            confirmedStays={confirmedStays}
            numDays={numDays}
            cabinCount={cabins.length}
          />
          <Today todayActivity={todayActivity} />
          <DurationChart confirmedStays={confirmedStays} />
          <SalesChart bookings={bookings} numDays={numDays} />
        </StyledDashboardLayout>
      )}
    </>
  );
}

export default DashboardLayout;
