import { useEffect, useState } from 'react';
import StudentsTable from './checkin-table/index';
import { useSearchParams } from 'react-router-dom';
import BasePages from '@/components/shared/base-pages';
import {
  useInitCheckInStudent,
  useGetListCheckInStudent
} from '@/queries/student.query';
import ComboBoxFilter from '@/components/shared/combo-box-filter';

export default function CheckInPage() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const pageLimit = Number(searchParams.get('limit') || 10);
  const { mutateAsync: getListCheckIn, data } = useGetListCheckInStudent();
  const {} = useInitCheckInStudent();
  const users = data;
  const totalUsers = 12;
  const pageCount = Math.ceil(totalUsers / pageLimit);
  const [isFilter, setIsFilter] = useState(false);

  useEffect(() => {
    if (isFilter) {
      getListCheckIn();
      setIsFilter(false);
    }
  }, [isFilter]);

  return (
    <BasePages
      breadcrumbs={[
        { title: 'Trang chủ', link: '/' },
        { title: 'Điểm danh', link: '/checkin-student' }
      ]}
      pageHead="Quản lý điểm danh | Happy Kids"
      className="p-4 md:px-8"
    >
      <ComboBoxFilter
        onFilter={(value) => {
          setIsFilter(true);
          console.log(value);
        }}
      />
      <StudentsTable
        users={users}
        page={page}
        totalUsers={totalUsers}
        pageCount={pageCount}
      />
    </BasePages>
  );
}
