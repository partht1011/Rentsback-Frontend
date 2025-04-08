import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadImage, deleteImage } from '@/utills/Cloudinary';
import axiosInstance from '@/lib/api/client';

export const useEditProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ file, name, currentPublicId, password }) => {
            if (currentPublicId) {
                await deleteImage(currentPublicId);
            }

            /* Todo: image upload doesn't work */
            /*const uploadResult = await uploadImage(file, 'rentsback');
            if (!uploadResult.secure_url) throw new Error('Upload failed');*/

            console.log('profile image api', name, file)
            const res = await axiosInstance.put('/api/user/profile', {
                name,
                password,
                profileImage: {
                    url: '',
                    id: '',
                }
            });

            return res.data.user;
        },
        onSuccess: (user) => {
            queryClient.setQueryData(['user'], user);
        },
        onSettled: () => {
            // Always refetch after error or success
            queryClient.invalidateQueries(['user']);
        }
    });
};