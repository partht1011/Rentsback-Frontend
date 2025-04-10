import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/api/client";

export const useAdminAddress = () => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await axiosInstance.get("/api/tenant/admin-address");
      return data;
    },
    onError: (error) => {
      console.error(
        "Conversion error:",
        error.response?.data?.message || error.message
      );
    },
  });
};
