import StudentsTable from './components/students-table';
import BasePages from '@/components/shared/base-pages';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CollectorTable from './components/collector-table/index';
import { useGetAllCollector, useGetAllUser } from '@/queries/admin.query';

export default function StudentPage() {
  const { data: dataUser, isPending } = useGetAllUser();
  const { data: dataCollector, isPending: penddingCollector } =
    useGetAllCollector();

  if (isPending || penddingCollector) {
    return <p>Loading...</p>;
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
      <Tabs defaultValue="user" className="space-y-4">
        <TabsList>
          <TabsTrigger value="user">Người dùng</TabsTrigger>
          <TabsTrigger value="collector">Đối tác</TabsTrigger>
        </TabsList>
        <TabsContent value="user" className="space-y-4">
          {dataUser.length > 0 && (
            <StudentsTable
              users={dataUser}
              page={10}
              totalUsers={dataUser.length}
              pageCount={10}
            />
          )}
        </TabsContent>
        <TabsContent value="collector" className="space-y-4">
          {dataCollector.length > 0 ? (
            <CollectorTable
              users={dataCollector}
              page={10}
              totalUsers={dataCollector.length}
              pageCount={10}
            />
          ) : (
            <p>Không có dữ liệu</p>
          )}
        </TabsContent>
      </Tabs>
    </BasePages>
  );
}
