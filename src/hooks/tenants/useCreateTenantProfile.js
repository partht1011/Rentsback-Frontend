import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/lib/api/client';

export const useCreateTenantProfile = () => {
    return useMutation({
        mutationFn: async (profileData) => {
            const response = await axiosInstance.post('/api/tenant/form1', profileData);
            return response.data;
        },
        onSuccess: (data) => {
            // Handle successful submission
            console.log('Profile submitted successfully:', data);
        },
        onError: (error) => {
            // Handle error
            console.error('Error submitting profile:', error);
        }
    });
};

export const useCalculatePayableAmount = () => {
    return useMutation({
        mutationFn: async (calculationData) => {
            const response = await axiosInstance.post('/api/tenant/payable-amount', calculationData);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('Amount Calculated successfully:', data);
        },
        onError: (error) => {
            // Handle error
            console.error('Error in calculation:', error);
        }
    });
};