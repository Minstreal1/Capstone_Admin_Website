import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import SalaryGraph from '../salary-graph.js';

export default function Salary() {
  return (
    <>
      <Card className="w-full md:w-1/3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tổng doanh thu</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">23.543.000 VNĐ</div>
          <p className="text-xs text-green-500 text-muted-foreground">
            +20.1 % so với tháng trước
          </p>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-7">
        <Card className="col-span-7">
          <CardHeader>
            <CardTitle>Doanh thu</CardTitle>
          </CardHeader>
          <CardContent>
            <SalaryGraph />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
