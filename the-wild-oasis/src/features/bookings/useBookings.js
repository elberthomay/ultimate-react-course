import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import usePaginationParams from "../../hooks/usePaginationParams";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const status = searchParams.get("status") || "all";
  const sortby = searchParams.get("sortby") || "default";
  const filter = filterParams[status] ?? null;
  const sortBy = sortParams[sortby] ?? null;

  const { calculateCurrentPage, resultPerPage } = usePaginationParams();
  const currentPage = calculateCurrentPage();

  const { isLoading, error, data } = useQuery({
    queryKey: ["bookings", filter, sortBy, resultPerPage, currentPage],
    queryFn: () => getBookings({ filter, sortBy, resultPerPage, currentPage }),
  });

  queryClient.prefetchQuery({
    queryKey: ["bookings", filter, sortBy, resultPerPage, currentPage + 1],
    queryFn: () =>
      getBookings({
        filter,
        sortBy,
        resultPerPage,
        currentPage: currentPage + 1,
      }),
  });

  return { isLoading, error, bookings: data ?? {} };
}

const filterParams = {
  all: null,
  unconfirmed: { field: "status", value: "unconfirmed" },
  "checked-out": { field: "status", value: "checked-out" },
  "checked-in": { field: "status", value: "checked-in" },
};

const sortParams = {
  created: null,
  "startdate-asc": { field: "startDate", ascending: true },
  "startdate-desc": { field: "startDate", ascending: false },
  "totalprice-asc": { field: "total_price", ascending: true },
  "totalprice-desc": { field: "total_price", ascending: false },
};
