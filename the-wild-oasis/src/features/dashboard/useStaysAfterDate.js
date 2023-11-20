import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";
import { getStaysAfterDate } from "../../services/apiBookings";

export default function useStaysAfterDate(daysNum) {
  const dateNDaysAgo = subDays(new Date(), daysNum);
  dateNDaysAgo.setUTCHours(0, 0, 0, 0);
  const dateString = dateNDaysAgo.toISOString();

  const { isLoading, error, data } = useQuery({
    queryKey: ["staysLastNDays", dateString],
    queryFn: () => getStaysAfterDate(dateString),
  });

  const confirmedStays = data
    ? data.filter((stays) => stays.status !== "unconfirmed")
    : undefined;

  return { isLoading, error, stays: data, confirmedStays };
}
