import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/api/client';

export const useFetchTenantById = (tenantId) => {
    return useQuery({
        queryKey: ['tenant', tenantId], // Unique key for caching
        queryFn: async () => {
            const { data } = await axiosInstance.get(`/api/tenants/${tenantId}`);
            return data.tenant; // Returns the tenant object directly
        },
        enabled: !!tenantId, // Only runs when tenantId exists
        staleTime: 1000 * 60 * 5, // 5 minutes cache
        retry: (failureCount, error) => {
            // Don't retry on 404
            if (error.response?.status === 404) return false;
            return failureCount < 3; // Retry max 3 times
        }
    });
};