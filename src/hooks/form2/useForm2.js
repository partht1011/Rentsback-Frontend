import { useMutation } from "@tanstack/react-query";
import axiosInstance from '@/lib/api/client';

export const useSubmitForm2 = () => {
    return useMutation({
        mutationFn: async ({ tenantId, formData }) => {
            const response = await axiosInstance.post(
                `/api/tenant/form2/${tenantId}`,
                formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Important for file uploads
                    },
                }
            );
            return response.data;
        },
        onSuccess: (data) => {
            console.log('Form 2 submitted successfully:', data);
        },
        onError: (error) => {
            console.error('Error submitting form 2:', error);
        }
    });
};