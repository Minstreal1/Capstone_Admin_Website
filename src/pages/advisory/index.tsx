import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs.js';
import AdvisoryTable from './advisory-table/index';
import { useSearchParams } from 'react-router-dom';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import BasePages from '@/components/shared/base-pages';
import { useGetAdvisorPaging } from '@/queries/advisor.query';
export const ListOverViewDashBoard = [
  {
    id: 1,
    title: 'Tổng doanh thu',
    value: '23.543.000',
    percent: '+20.1 %'
  }
];
import AdvisoryDone from './components/advisory-done';
import AdvisoryPending from './components/advisory-pending';
export default function Advisory() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const pageLimit = Number(searchParams.get('limit') || 10);
  const { data, isLoading } = useGetAdvisorPaging();
  const users = data?.listObjects;
  const totalUsers = data?.total_users; //1000
  const pageCount = Math.ceil(totalUsers / pageLimit);

  if (isLoading) {
    return (
      <div className="p-5">
        <DataTableSkeleton
          columnCount={10}
          filterableColumnCount={2}
          searchableColumnCount={1}
        />
      </div>
    );
  }
  return (
    <>
      <BasePages
        className="relative max-h-screen flex-1 space-y-4 overflow-y-auto p-4"
        pageHead="Tư vấn | Happy Kids"
        breadcrumbs={[
          { title: 'Trang chủ', link: '/' },
          { title: 'Tư vấn', link: '/advisory' }
        ]}
      >
        <Tabs defaultValue="advisorypending" className="space-y-4">
          <TabsList>
            <TabsTrigger value="advisorypending">
              Tư vấn chưa hoàn thành
            </TabsTrigger>
            <TabsTrigger value="advisorydone">Đã hoàn thành</TabsTrigger>
          </TabsList>
          <AdvisoryPending />
          <AdvisoryDone />
        </Tabs>

        <AdvisoryTable
          users={users}
          page={page}
          totalUsers={totalUsers}
          pageCount={pageCount}
        />
      </BasePages>
    </>
  );
}
