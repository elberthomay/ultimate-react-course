import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useUpdateBooking(bookingId, toastMessages) {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationKey: ["updateBookings", bookingId],
    mutationFn: (updates) => {
      const updatePromise = updateBooking(bookingId, updates);
      toast.promise(updatePromise, toastMessages);
      return updatePromise;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ active: true });
    },
  });
  return { updateLoading: isPending, updateBooking: mutate };
}

export function useCheckIn(bookingId) {
  const { updateLoading: checkInLoading, updateBooking: checkIn } =
    useUpdateBooking(bookingId, {
      loading: "Checking in...",
      success: "Check in successful",
      error: "Failed checking in",
    });

  return {
    checkInLoading,
    checkIn: (onSuccess = (data) => {}, hasBreakfast, extraPrice) => {
      const updateData = {
        isPaid: true,
        status: "checked-in",
      };
      if (hasBreakfast !== undefined) {
        updateData.hasBreakfast = hasBreakfast;
        updateData.extraPrice = extraPrice;
      }
      checkIn(updateData, { onSuccess });
    },
  };
}

export function useCheckOut(bookingId) {
  const { updateLoading: checkOutLoading, updateBooking: checkOut } =
    useUpdateBooking(bookingId, {
      loading: "Checking out...",
      success: "Check out successful",
      error: "Failed checking out",
    });

  return {
    checkOutLoading,
    checkOut: (onSuccess = (data) => {}) =>
      checkOut(
        {
          status: "checked-out",
        },
        { onSuccess }
      ),
  };
}

export function useSetBreakfast(bookingId) {
  const { updateLoading: setBreakfastLoading, updateBooking: setBreakfast } =
    useUpdateBooking(bookingId, {
      loading: "Changing breakfast setting",
      success: "Breakfast setting has been changed",
      error: "Failed changing breakfast setting",
    });

  return {
    setBreakfastLoading,
    setBreakfast: (
      hasBreakfast,
      numNights,
      breakfastPrice,
      onSuccess = (data) => {}
    ) =>
      setBreakfast(
        {
          hasBreakfast,
          extraPrice: hasBreakfast ? numNights * breakfastPrice : 0,
        },
        { onSuccess }
      ),
  };
}

// export function useSetisPaid(bookingId) {
//   const { updateLoading: setIsPaidLoading, updateBooking: setIsPaid } =
//     useUpdateBooking(bookingId, {
//       loading: "Changing payment status",
//       success: "Payment status has been changed",
//       error: "Failed changing payment status",
//     });

//   return {
//     setIsPaidLoading,
//     setIsPaid: (isPaid, onSuccess = (data) => {}) =>
//       setIsPaid(
//         {
//           isPaid,
//         },
//         { onSuccess }
//       ),
//   };
// }
