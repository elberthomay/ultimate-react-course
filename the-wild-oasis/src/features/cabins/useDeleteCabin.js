import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin(cabinId) {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationKey: ["deleteCabin", cabinId],
    mutationFn: () => {
      const deletePromise = deleteCabin(cabinId);
      toast.promise(deletePromise, {
        loading: "deleting cabin...",
        success: "Cabin has been deleted",
        error: "failed deleting cabin",
      });
      return deletePromise;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cabins"]);
    },
  });

  return { deleteLoading: isPending, deleteCabin: mutate };
}
