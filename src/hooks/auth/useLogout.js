// hooks/auth/useLogout.js
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/lib/api/client';
import Cookies from 'js-cookie';

export const useLogout = () => {
    return useMutation({
        mutationFn: () => axiosInstance.post('/api/auth/logout'),
        onSuccess: () => {
            Cookies.remove('token');
            Cookies.remove('user');
            window.location.href = '/login'; // Full reload to clear all state
        }
    });
};