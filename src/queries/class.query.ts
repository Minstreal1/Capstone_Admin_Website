import { useMutation } from '@tanstack/react-query';
import BaseRequest from '@/config/axios.config';
import SUB_URL from './contants';

export const PagingModel = {
  pageNumber: 1,
  pageSize: 10,
  keyword: '',
  orderBy: '',
  orderDirection: '',
  totalRecord: 0,
  day: 0,
  week: 0,
  month: 0,
  year: 0,
  createdBy: ''
};

export function useGetClassBySchool() {
  return useMutation({
    mutationKey: ['get_class'],
    mutationFn: async (id: number) => {
      return BaseRequest.Post(
        `/${SUB_URL.CLASS}/get-list-class-by-school-id/${id}`,
        PagingModel
      );
    }
  });
}
