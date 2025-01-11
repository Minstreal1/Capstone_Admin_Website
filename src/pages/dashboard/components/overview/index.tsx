import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import RecentSales from './recent-sales.js';

import { useDashBoard } from '@/queries/admin.query.ts';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton.js';

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
      value: `${numberAccountDepot || 0} `
    },
    {
      id: 2,
      title: 'Số cư dân',
      value: `${numberAccountResident || 0} `
    },
    {
      id: 3,
      title: 'Số người thu gom',
      value: `${numberAccountCollector || 0} `
    },
    {
      id: 4,
      title: 'Tổng số giao dịch thanh toán',
      value: `${numberTransaction || 0} `
    }
  ];

  const top5Resident = topListResident?.slice(0, 5);

  if (isPending) {
    return (
      <DataTableSkeleton
        columnCount={10}
        filterableColumnCount={2}
        searchableColumnCount={1}
      />
    );
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {ListOverViewDashBoard.map((item, index) => (
          <Card
            key={item.id}
            className={` ${index === 0 ? 'bg-green-100' : index === 1 ? 'bg-green-100' : index === 2 ? 'bg-green-100' : 'bg-green-100'}`}
          >
            <CardHeader
              className={`flex flex-row items-center justify-between space-y-0 pb-2
           
              `}
            >
              <CardTitle className="text-sm font-medium">
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 md:col-span-7">
          <CardHeader>
            <CardTitle>Top người dùng có điểm thưởng cao nhất</CardTitle>
            <CardDescription>
              Top 5 người dùng có điểm thưởng cao nhất
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSales data={top5Resident} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
