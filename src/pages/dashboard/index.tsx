import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs.js';
import BasePages from '@/components/shared/base-pages.js';
import { OverViewTab } from './components/overview/index.js';

export default function DashboardPage() {
  return (
    <>
      <BasePages
        className="relative max-h-screen flex-1 space-y-4 overflow-y-auto p-4"
        pageHead="Thống kê | RCA"
      >
        <div className="top-4 flex items-center justify-between space-y-2 md:absolute">
          <h2 className=" text-2xl font-bold tracking-tight">
            Hi, RCA xin chào 👋
          </h2>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <OverViewTab />
          </TabsContent>
        </Tabs>
      </BasePages>
    </>
  );
}
