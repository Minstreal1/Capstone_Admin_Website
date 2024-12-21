import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import BasePages from '@/components/shared/base-pages';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DollarSign, TrendingUp, CreditCard } from 'lucide-react';
import { useGetAdminTransaction } from '@/queries/admin.query';
import __helpers from '@/helpers';

export default function CheckInPage() {
  const { data, isPending } = useGetAdminTransaction();

  const {
    top5ScheduleByCreatedAt,
    numberTransactionPending,
    numberTransaction,
    numberTransactionGoing,
    numberTransactionSuccess
  } = data || {};

  const transactionData = [
    { name: 'Tổng giao dịch', value: numberTransaction },
    { name: 'Đang chờ xử lý', value: numberTransactionPending },
    { name: 'Đang thực hiện', value: numberTransactionGoing },
    { name: 'Hoàn thành', value: numberTransactionSuccess }
  ];

  if (isPending) {
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
    <BasePages
      breadcrumbs={[
        { title: 'Trang chủ', link: '/' },
        { title: 'Giao dịch', link: '/revenue' }
      ]}
      pageHead="Quản lý giao dịch | RCA"
      className="h-[100vh] overflow-y-scroll p-4 md:px-8"
    >
      <div className="space-y-4 p-4">
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bg-blue-100 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Tổng số giao dịch
              </CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800">
                {numberTransaction}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-100 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Giao dịch đang chờ xử lý
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-800">
                {numberTransactionPending}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-100 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Giao dịch đang thực hiện
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">
                {numberTransactionGoing}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-100 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Giao dịch hoàn thành
              </CardTitle>
              <CreditCard className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-800">
                {numberTransactionSuccess}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Thống Kê Giao Dịch</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={transactionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#9ed3b1" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Giao Dịch Gần Đây</CardTitle>
            <CardDescription>Danh sách các giao dịch gần đây</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Người đặt</TableHead>
                  <TableHead>Người nhận</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead>Trạng Thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {top5ScheduleByCreatedAt.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        {transaction.residentId.user.lastName}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        {transaction?.collector?.user.lastName}
                      </div>
                    </TableCell>
                    <TableCell>
                      {__helpers.convertToDate(transaction.createdAt)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          transaction.status === 'ONGOING'
                            ? 'going'
                            : transaction.status === 'PENDING'
                              ? 'pendding'
                              : transaction.status === 'SUCCESS'
                                ? 'finished'
                                : 'destructive'
                        }
                      >
                        {{
                          ACCEPTED: 'Đã chấp nhận',
                          ONGOING: 'Đang thực hiện',
                          PENDING: 'Chờ xử lý',
                          SUCCESS: 'Hoàn thành'
                        }[transaction.status] || 'Không xác định'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </BasePages>
  );
}
