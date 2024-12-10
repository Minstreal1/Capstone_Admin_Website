import { useQuery } from '@tanstack/react-query';
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

export function useGetListSchool() {
  return useQuery({
    queryKey: ['get_student2'],
    queryFn: async () => {
      return BaseRequest.Post(
        `/${SUB_URL.SCHOOL}/get-list-school-by-paging`,
        PagingModel
      );
    }
    // 10 minutes
  });
}
