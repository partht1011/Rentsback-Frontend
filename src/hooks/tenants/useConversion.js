import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/lib/api/client';

export const useConversion = () => {
    return useMutation({
        mutationFn: async ({ rentAmount, currency }) => {
            const { data } = await axiosInstance.post('/api/tenants/conversion', {
                rentAmount,
                currency
            });
            return data;
        },
        onError: (error) => {
            console.error('Conversion error:', error.response?.data?.message || error.message);
        }
    });
};