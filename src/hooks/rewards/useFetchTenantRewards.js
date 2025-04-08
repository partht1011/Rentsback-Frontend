import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/api/client';

export const useFetchTenantRewards = (tenantId) => {
    return useQuery({
        queryKey: ['tenantRewards', tenantId],
        queryFn: async () => {
            // First, trigger the reward calculation
            await axiosInstance.get(`/api/reward/calculate/${tenantId}`);

            // Then fetch the updated tokens
            const tokensResponse = await axiosInstance.get(`/api/reward/tokens/${tenantId}`);
            return tokensResponse.data.data[0];
        },
        enabled: !!tenantId,
        staleTime: 1000 * 60 * 5, // 5 minutes stale time
        retry: false, // Disable automatic retries to prevent multiple calculations
    });
};