import BaseRequest from '@/config/axios.config';
import { useMutation, useQuery } from '@tanstack/react-query';

const SUB_URL = `admin`;

export const useDashBoard = () => {
  return useQuery({
    queryKey: ['get-dashboard'],
    queryFn: async () => {
      return await BaseRequest.Get(`/${SUB_URL}/dashboard`);
    }
  });
};

export const useGetAllUser = () => {
  return useQuery({
    queryKey: ['get-all-user'],
    queryFn: async () => {
      return await BaseRequest.Get(`/${SUB_URL}/all-user`);
    }
  });
};

export const useGetAllDepot = () => {
  return useQuery({
    queryKey: ['get-depot'],
    queryFn: async () => {
      return await BaseRequest.Get(`/${SUB_URL}/all-depot`);
    }
  });
};

export const useGetAllCollector = () => {
  return useQuery({
    queryKey: ['get-collector'],
    queryFn: async () => {
      return await BaseRequest.Get(`/${SUB_URL}/all-collector`);
    }
  });
};

export const useGetAdminTransaction = () => {
  return useQuery({
    queryKey: ['get-admin-transaction'],
    queryFn: async () => {
      return await BaseRequest.Get(`/${SUB_URL}/get-admin-transactions`);
    }
  });
};

export const useGetAdminActivity = () => {
  return useQuery({
    queryKey: ['get-admin-activiry'],
    queryFn: async () => {
      return await BaseRequest.Get(`/${SUB_URL}/get-admin-activity`);
    }
  });
};

export const useGetMaterial = () => {
  return useQuery({
    queryKey: ['get-material'],
    queryFn: async () => {
      return await BaseRequest.Get(`/material/get-all-material`);
    }
  });
};

export const useAddMaterial = () => {
  return useMutation({
    mutationKey: ['add-material'],
    mutationFn: async (data: any) => {
      return await BaseRequest.Post(`/material/create-material`, data);
    }
  });
};

export const useUpdateMaterial = () => {
  return useMutation({
    mutationKey: ['update-material'],
    mutationFn: async (data: any) => {
      return await BaseRequest.Put(`/material/update-material`, data);
    }
  });
};

export const useDeleteMaterial = () => {
  return useMutation({
    mutationKey: ['delete-material'],
    mutationFn: async (id: any) => {
      return await BaseRequest.Delete(`/material/delete-material/${id}`);
    }
  });
};
