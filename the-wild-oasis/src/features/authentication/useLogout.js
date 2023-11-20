import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { logout } from "../../services/apiAuth";
export default function useLogout() {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => {
      const logoutPromise = logout();
      toast.promise(logoutPromise, {
        loading: "Logging out",
        success: "You have been logged out",
        error: (error) => {
          console.log(error);
          return error.message;
        },
      });
      return logoutPromise;
    },
    onSuccess: (data) => queryClient.removeQueries(),
  });
  return { logoutIsLoading: isPending, logout: mutate };
}
