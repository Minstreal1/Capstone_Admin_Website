import StudentsTable from './components/students-table';
import BasePages from '@/components/shared/base-pages';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  useGetAllDrawMoney,
  useGetAllListPaymentHistory
} from '@/queries/admin.query';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import PaymentHistoryTable from './components/payment-history-table';
import { useSearchParams } from 'react-router-dom';

export default function DrawMoneyPage() {
  const { data: dataPost, isPending: penddingMaterial } = useGetAllDrawMoney();
  const { data: dataPayment, isPending: penddingPayment } =
    useGetAllListPaymentHistory();
  const [searchParam, setSearchParam] = useSearchParams();
  const defaultTab = searchParam.get('tab') || 'list';
  setSearchParam({ page: '1', limit: '10' });

  if (penddingMaterial || penddingPayment) {
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
        { title: 'Quản lý dòng tiền', link: '/material' }
      ]}
      pageHead="Quản lý dòng tiền "
      className="p-4 md:px-8"
    >
      <Tabs
        defaultValue={defaultTab}
        className="w-full"
        onValueChange={(value) => {
          setSearchParam((prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set('page', '1');
            return newParams;
          });
        }}
      >
        <TabsList>
          <TabsTrigger value="list">Danh sách đơn rút tiền</TabsTrigger>
          <TabsTrigger value="add">Danh sách đơn nạp tiền</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          {dataPost.length > 0 && (
            <StudentsTable
              users={dataPost}
              page={1}
              totalUsers={dataPost.length}
              pageCount={
                dataPost.length > 10 ? Math.ceil(dataPost.length / 10) : 1
              }
            />
          )}
        </TabsContent>
        <TabsContent value="add">
          {dataPayment.length > 0 && (
            <PaymentHistoryTable
              users={dataPayment}
              page={10}
              totalUsers={dataPayment.length}
              pageCount={
                Math.ceil(dataPayment.length / 10) > 0
                  ? Math.ceil(dataPayment.length / 10)
                  : 1
              }
            />
          )}
        </TabsContent>
      </Tabs>
    </BasePages>
  );
}
