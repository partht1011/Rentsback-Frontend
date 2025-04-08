import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/lib/api/client';

export const useIsClaimableToken = () => {
    return useMutation({
        mutationFn: async ({ tenantId, tokens }) => {
            const { data } = await axiosInstance.post(
                `/api/isclaimable/${tenantId}`,
                { tokens }
            );
            return data;
        },
        onError: (error) => {
            console.error('Claimable token check failed:', error.response?.data?.message || error.message);
        }
    });
};