import StudentsTable from './components/students-table';
import BasePages from '@/components/shared/base-pages';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CollectorTable from './components/collector-table/index';
import DepotTable from './components/depot-table/index';
import {
  useGetAllCollector,
  useGetAllUser,
  useGetAllDepot
} from '@/queries/admin.query';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import { useSearchParams } from 'react-router-dom';

export default function StudentPage() {
  const { data: dataUser, isPending } = useGetAllUser();
  const { data: dataCollector, isPending: penddingCollector } =
    useGetAllCollector();
  const { data: dataDepot, isPending: pendingDepot } = useGetAllDepot();
  const [searchParams, setSearchParams] = useSearchParams();
  setSearchParams({ page: '1', limit: '10' });

  const filterData =
    dataUser && dataUser?.filter((student) => student.role !== 'ROLE_ADMIN');

  if (isPending || penddingCollector || pendingDepot) {
    return (
      <DataTableSkeleton
        columnCount={10}
        filterableColumnCount={2}
        searchableColumnCount={1}
      />
    );
  }

  return (
    <BasePages
      breadcrumbs={[
        { title: 'Trang chủ', link: '/' },
        { title: 'Người dùng', link: '/student' }
      ]}
      pageHead="Quản lý người dùng RCA"
      className="p-4 md:px-8"
    >
      <Tabs
        defaultValue={searchParams.get('tab') || 'user'}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="user">Cư dân</TabsTrigger>
          <TabsTrigger value="collector">Người thu gom</TabsTrigger>
          <TabsTrigger value="depot">Đại lý thu gom</TabsTrigger>
        </TabsList>
        <TabsContent value="user" className="space-y-4">
          {filterData.length > 0 && (
            <StudentsTable
              users={filterData}
              page={10}
              totalUsers={dataUser.length}
              pageCount={
                dataUser.length > 10 ? Math.ceil(dataUser.length / 10) : 1
              }
            />
          )}
        </TabsContent>
        <TabsContent value="collector" className="space-y-4">
          {dataCollector.length > 0 ? (
            <CollectorTable
              users={dataCollector}
              page={10}
              totalUsers={dataCollector.length}
              pageCount={
                dataCollector.length > 10
                  ? Math.ceil(dataCollector.length / 10)
                  : 1
              }
            />
          ) : (
            <p>Không có dữ liệu</p>
          )}
        </TabsContent>
        <TabsContent value="depot" className="space-y-4">
          {dataDepot.length > 0 ? (
            <DepotTable
              users={dataDepot}
              page={10}
              totalUsers={dataDepot.length}
              pageCount={
                dataDepot.length > 10 ? Math.ceil(dataDepot.length / 10) : 1
              }
            />
          ) : (
            <p>Không có dữ liệu</p>
          )}
        </TabsContent>
      </Tabs>
    </BasePages>
  );
}
