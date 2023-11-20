import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";
import { getBookingsAfterDate } from "../../services/apiBookings";

export default function useBookingsAfterDate(daysNum) {
  const dateNDaysAgo = subDays(new Date(), daysNum);
  dateNDaysAgo.setUTCHours(0, 0, 0, 0);
  const dateString = dateNDaysAgo.toISOString();

  const { isLoading, error, data } = useQuery({
    queryKey: ["bookingsLastNDays", dateString],
    queryFn: () => getBookingsAfterDate(dateString),
  });

  return { isLoading, error, bookings: data };
}
