import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

const updateToastMessages = {
  loading: "Updating settings...",
  success: "settings has been updated",
  error: "Failed updating setting",
};

export default function useUpdateSettings() {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationKey: ["updateSetting"],
    mutationFn: (formData) => {
      const mutationPromise = updateSetting(formData);
      toast.promise(mutationPromise, updateToastMessages);
      return mutationPromise;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["settings"]);
    },
  });

  return { updateSettingsLoading: isPending, updateSettings: mutate };
}
