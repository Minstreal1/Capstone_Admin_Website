import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { StudentAdd } from '@/constants/SVGIcon.js';
import StudentGraph from '../student-graph.js';

export default function Student() {
  return (
    <>
      <Card className="w-full md:w-1/3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tổng học sinh</CardTitle>
          <StudentAdd />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">54</div>
          <p className="text-xs text-muted-foreground text-red-500">
            +20.1 % so với tháng trước
          </p>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-7">
        <Card className="col-span-7">
          <CardHeader>
            <CardTitle>Số học sinh</CardTitle>
          </CardHeader>
          <CardContent>
            <StudentGraph />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
