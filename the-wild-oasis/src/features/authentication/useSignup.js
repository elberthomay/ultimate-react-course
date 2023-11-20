import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signup } from "../../services/apiAuth";

export default function useSignup() {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationKey: ["signup"],
    mutationFn: (userData) => {
      const signupPromise = signup(userData);
      toast.promise(signupPromise, {
        loading: "Creating new user",
        success: "Signup successful! Check your email to verify your account.",
        error: "Failed creating new user",
      });
      return signupPromise;
    },
    onSuccess: (data) => queryClient.invalidateQueries(["currentUser"]),
  });
  return { signupLoading: isPending, signup: mutate };
}
