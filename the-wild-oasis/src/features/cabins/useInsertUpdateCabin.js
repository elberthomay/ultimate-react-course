import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertUpdateCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

const insertToastMessages = {
  loading: "Creating new cabin...",
  success: "New cabin has been created",
  error: "Failed creating cabin",
};

const updateToastMessages = {
  loading: "Updating cabin...",
  success: "Cabin has been updated",
  error: "Failed updating cabin",
};

export function useInsertUpdateCabin(cabinId = undefined) {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationKey: ["mutateCabins", cabinId ?? "create"],
    mutationFn: (formData) => {
      const mutationPromise = insertUpdateCabin(formData, cabinId);
      toast.promise(
        mutationPromise,
        cabinId ? updateToastMessages : insertToastMessages
      );
      return mutationPromise;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cabins"]);
    },
  });

  return { insertUpdateLoading: isPending, insertUpdateCabin: mutate };
}
