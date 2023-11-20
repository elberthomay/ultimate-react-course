import { useQuery } from "@tanstack/react-query";
import supabase from "../../services/supabase";

export default function useCurrentUser() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => supabase.auth.getUser(),
    retry: false,
  });
  const user = data?.data?.user;
  return {
    isLoading,
    error,
    currentUser: user,
    isAuthenticated: user?.role === "authenticated",
  };
}
