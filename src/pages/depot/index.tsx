import StudentsTable from './components/depot-table';
import { useSearchParams } from 'react-router-dom';
import BasePages from '@/components/shared/base-pages';
import { useGetAllDepot } from '@/queries/admin.query';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';

export default function DepotPage() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const pageLimit = Number(searchParams.get('limit') || 10);
  const { data, isPending } = useGetAllDepot();
  const totalUsers = data?.total_users; //1000
  const pageCount = Math.ceil(totalUsers / pageLimit);

  if (isPending) {
    return (
      <p>
        <DataTableSkeleton
          columnCount={10}
          filterableColumnCount={2}
          searchableColumnCount={1}
        />
      </p>
    );
  }

  return (
    <BasePages
      breadcrumbs={[
        { title: 'Trang chủ', link: '/' },
        { title: 'Điểm thu gom', link: '/student' }
      ]}
      pageHead="Quản lý điểm thu gom RCA"
      className="p-4 md:px-8"
    >
      {data.length >= 0 && (
        <StudentsTable
          users={data}
          page={page}
          totalUsers={totalUsers}
          pageCount={pageCount}
        />
      )}
    </BasePages>
  );
}
