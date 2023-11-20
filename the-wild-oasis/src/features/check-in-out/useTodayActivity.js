import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export default function useTodayActivity() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["todayActivity"],
    queryFn: (data) => getStaysTodayActivity(),
  });

  return { isLoading, error, todayActivity: data };
}
