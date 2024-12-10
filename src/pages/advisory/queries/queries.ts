import { getStudents } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export const useGetStudents = (offset, pageLimit, country) => {
  return useQuery({
    queryKey: ['student-checkin', offset, pageLimit, country],
    queryFn: async () => getStudents(offset, pageLimit, country)
  });
};
