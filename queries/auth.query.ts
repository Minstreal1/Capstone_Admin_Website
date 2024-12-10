import BaseRequest from '@/config/axios.config';
import { useMutation, useQuery } from '@tanstack/react-query';

const SUB_URL = `auth`;

export const useLogin = () => {
  return useMutation({
    mutationKey: ['login-admin'],
    mutationFn: async (model: any) => {
      return BaseRequest.Post(`/${SUB_URL}/login-admin`, model);
    }
  });
};

interface RegisterModel {
  name: string;
  username: string;
  password: string;
  email: string;
}

export const useRegister = () => {
  return useMutation({
    mutationKey: ['register'],
    mutationFn: async (model: RegisterModel) => {
      return BaseRequest.Post(`/${SUB_URL}/register`, model);
    }
  });
};

export const useGetInfoUser = () => {
  return useQuery({
    queryKey: ['get_info_user'],
    queryFn: async () => {
      return await BaseRequest.Get(`/${SUB_URL}/get-info-user`);
    }
  });
};

export const useUpdateInfoUser = () => {
  return useMutation({
    mutationKey: ['update_info_user'],
    mutationFn: async (model: any) => {
      return BaseRequest.Put(`/${SUB_URL}/update-info-user`, model);
    }
  });
};
