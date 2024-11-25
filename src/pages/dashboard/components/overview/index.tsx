import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import RecentSales from './recent-sales.js';
import Overview from './overview.js';
import {
  Advisory,
  DoanhThu,
  Student,
  StudentAdd
} from '@/constants/SVGIcon.js';
import { useDashBoard } from '@/queries/admin.query.ts';

export function OverViewTab() {
  const { data: dataDashBoard, isPending } = useDashBoard();
  const {
    numberAccountDepot,
    numberAccountResident,
    numberAccountCollector,
    numberTransaction,
    topListResident
  } = dataDashBoard || {};

  // Update the ListOverViewDashBoard dynamically with API data
  const ListOverViewDashBoard = [
    {
      id: 1,
      title: 'Số đại lý thu gom hoạt động',
      value: `${numberAccountDepot || 0} đại lý thu gom`,
      icon: <DoanhThu />
    },
    {
      id: 2,
      title: 'Số tài khoản đăng ký',
      value: `${numberAccountResident || 0} tài khoản`,
      icon: <Student />
    },
    {
      id: 3,
      title: 'Số đối tác tái chế',
      value: `${numberAccountCollector || 0} đối tác`,
      icon: <StudentAdd />
    },
    {
      id: 4,
      title: 'Tổng số giao dịch thanh toán',
      value: `${numberTransaction || 0} giao dịch`,
      icon: <Advisory />
    }
  ];

  if (isPending) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {ListOverViewDashBoard.map((item, index) => (
          <Card
            key={item.id}
            className={` ${index === 0 ? 'bg-blue-100' : index === 1 ? 'bg-green-100' : index === 2 ? 'bg-yellow-100' : 'bg-purple-100'}`}
          >
            <CardHeader
              className={`flex flex-row items-center justify-between space-y-0 pb-2
           
              `}
            >
              <CardTitle className="text-sm font-medium">
                {item.title}
              </CardTitle>
              {item.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Số giao dịch hàng tháng</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-4 md:col-span-3">
          <CardHeader>
            <CardTitle>Top người dùng có điểm thưởng cao nhất</CardTitle>
            <CardDescription>
              Top 5 người dùng có điểm thưởng cao nhất
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSales data={topListResident} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
