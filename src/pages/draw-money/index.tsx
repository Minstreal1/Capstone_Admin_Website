import StudentsTable from './components/students-table';
import BasePages from '@/components/shared/base-pages';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetAllDrawMoney } from '@/queries/admin.query';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import { AddPostPage } from './AddPostPage';

export default function DrawMoneyPage() {
  const { data: dataPost, isPending: penddingMaterial } = useGetAllDrawMoney();

  console.log(dataPost);

  if (penddingMaterial) {
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
        { title: 'Đơn rút tiền', link: '/material' }
      ]}
      pageHead="Quản lý đơn rút tiền"
      className="p-4 md:px-8"
    >
      <Tabs defaultValue="list" className="w-full">
        <TabsList>
          <TabsTrigger value="list">Danh sách đơn rút tiền</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          {dataPost.length > 0 && (
            <StudentsTable
              users={dataPost}
              page={10}
              totalUsers={dataPost.length}
              pageCount={10}
            />
          )}
        </TabsContent>
        <TabsContent value="add">
          <AddPostPage />
        </TabsContent>
      </Tabs>
    </BasePages>
  );
}
