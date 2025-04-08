import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/api/client';
import { useAuth } from '@/context/AuthContext';
import {useRouter} from "next/navigation";
import Cookies from "js-cookie";

export const useLogin = () => {
    const { setUser } = useAuth();
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: ({ email, password }) =>
            axiosInstance.post('/api/auth/login', { email, password }),
        onSuccess: (data) => {
            Cookies.set('token', data.data.token, {
                sameSite: 'lax' // Changed to 'lax' for HTTP
            });
            Cookies.set('user', JSON.stringify(data.data.user), {
                sameSite: 'lax'
            });
            setUser(data.data.user);
            queryClient.invalidateQueries(['user']);
            console.log('data login', data);
            router.push('/dashboard');
        }
    });
};

export const useSignup = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: ({ email, password }) =>
            axiosInstance.post('/api/auth/signup', { name: 'User', email, password }),
        onSuccess: () => {
            router.push('/login'); // Redirect to login after successful signup
        }
    });
};

export const useFetchUserData = () => {
    const { user, setUser } = useAuth();

    return useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            try {
                const res = await axiosInstance.get('/api/user/profile');
                setUser(res.data);
                return res.data;
            } catch (error) {
                setUser(null);
                throw error;
            }
        },
        initialData: user,
        enabled: !!Cookies.get('token'),
        retry: false
    });
};