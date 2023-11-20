import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export default function useDeleteBooking(bookingId) {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationKey: ["deleteBooking", bookingId],
    mutationFn: () => {
      const deletePromise = deleteBooking(bookingId);
      toast.promise(deletePromise, {
        loading: "Deleting booking...",
        success: "Delete successful",
        error: "Failed deleting booking",
      });
      return deletePromise;
    },
    onSuccess: (data) => queryClient.invalidateQueries({ active: true }),
  });
  return { deleteBookingIsLoading: isPending, deleteBooking: mutate };
}
