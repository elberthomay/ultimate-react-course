import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/apiAuth";
import toast from "react-hot-toast";

export default function useLogin() {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: ({ email, password }) => {
      const loginPromise = login({ email, password });
      toast.promise(loginPromise, {
        loading: "Logging in",
        success: "You have been logged in",
        error: (error) => {
          console.log(error);
          return error.message;
        },
      });
      return loginPromise;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["currentUser"]);
    },
  });

  return { loginIsLoading: isPending, login: mutate };
}
