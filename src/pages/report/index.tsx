import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowUpIcon, ArrowDownIcon, Users, Package, Star } from 'lucide-react';
import BasePages from '@/components/shared/base-pages';
import { useGetAdminActivity } from '@/queries/admin.query';

export default function Report() {
  const { data: dataActivity, isPending } = useGetAdminActivity();
  const {
    numberTransaction,
    numberAccountResident,
    avgTransactionPoint,
    residentList
  } = dataActivity || {};

  const collectionSummary = {
    totalCollections: numberTransaction,
    activeUsers: numberAccountResident,
    averagePointsPerUser: avgTransactionPoint
  };

  if (isPending) {
    return <p>Loading...</p>;
  }

  return (
    <BasePages
      breadcrumbs={[
        { title: 'Trang chủ', link: '/' },
        { title: 'Báo cáo', link: '/student' }
      ]}
      pageHead="Báo cáo RCA"
      className="p-4 md:px-8"
    >
      <div className="flex min-h-screen flex-col">
        <main className="flex-grow bg-background p-6">
          <section className="mb-8">
            <div className="grid gap-4 md:grid-cols-3">
              {/* Tổng số lượng giao dịch */}
              <Card className="bg-blue-100 shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Tổng số lượng giao dịch
                  </CardTitle>
                  <Package className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-800">
                    {collectionSummary.totalCollections}
                  </div>
                  <p className="text-xs text-blue-700">
                    +20.1% so với tháng trước
                  </p>
                </CardContent>
              </Card>

              {/* Người dùng hoạt động */}
              <Card className="bg-green-100 shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Người Dùng Hoạt Động
                  </CardTitle>
                  <Users className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-800">
                    {collectionSummary.activeUsers}
                  </div>
                  <p className="text-xs text-green-700">
                    +10.5% so với tháng trước
                  </p>
                </CardContent>
              </Card>

              {/* Điểm trung bình mỗi người dùng */}
              <Card className="bg-yellow-100 shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Điểm Trung Bình Mỗi Người Dùng
                  </CardTitle>
                  <Star className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-800">
                    {collectionSummary.averagePointsPerUser}
                  </div>
                  <p className="text-xs text-yellow-700">
                    +5.2% so với tháng trước
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
          <section>
            <h2 className="mb-4 text-xl font-semibold">
              Điểm Thưởng Người Dùng
            </h2>
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Điểm</TableHead>
                    <TableHead>Trạng Thái</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {residentList.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        {user.user.lastName}
                      </TableCell>
                      <TableCell>{user.user.email}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {user.rewardPoints}
                          {user.rewardPoints > 3000 ? (
                            <ArrowUpIcon className="ml-2 h-4 w-4 text-green-500" />
                          ) : (
                            <ArrowDownIcon className="ml-2 h-4 w-4 text-red-500" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            user.user.isActive !== true
                              ? 'default'
                              : 'secondary'
                          }
                        >
                          {user.user.isActive ? 'Đang hoạt động' : 'Đã khóa'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </section>
        </main>
      </div>
    </BasePages>
  );
}
