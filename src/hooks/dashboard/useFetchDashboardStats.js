import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/api/client';

export const useFetchDashboardStats = () => {
    return useQuery({
        queryKey: ['dashboardStats'],
        queryFn: async () => {
            const response = await axiosInstance.get('/api/dashboard');
            return response.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes cache
    });
};