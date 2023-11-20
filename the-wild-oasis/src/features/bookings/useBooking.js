import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";

export default function useBooking(id) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBooking(id),
    retry: (failureCount, error) => error?.code !== "PGRST116",
  });

  return { isLoading, error, booking: data };
}
