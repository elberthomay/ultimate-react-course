import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import updateUser from "../../services/apiUser";

export default function useUpdateUser() {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationKey: ["updateUser"],
    mutationFn: (userUpdate) => {
      const updatePromise = updateUser(userUpdate);
      toast.promise(updatePromise, {
        loading: "Updating user data",
        success: "User data successfully updated",
        error: "Failed updating user data",
      });
      return updatePromise;
    },
    onSuccess: (data) => queryClient.invalidateQueries(["currentUser"]),
  });
  return { isLoading: isPending, updateUser: mutate };
}
