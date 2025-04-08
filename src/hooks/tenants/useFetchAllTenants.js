import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/api/client';

export const useFetchAllTenants = () => {
    return useQuery({
        queryKey: ['tenants'], // Unique key for this query
        queryFn: async () => {
            const response = await axiosInstance.get('/api/tenants');
            return response.data; // Return the data from the API
        },
        staleTime: 1000 * 60 * 5, // 5 minutes cache
        retry: 2, // Retry failed requests 2 times
    });
};