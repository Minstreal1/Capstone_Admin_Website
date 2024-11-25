import DataTable from '@/components/shared/data-table';
import { columns } from './columns';
type TTableProps = {
  users: any;
  page: number;
  totalUsers: number;
  pageCount: number;
};

export default function AdvisoryTable({ users, pageCount }: TTableProps) {
  return (
    <>
      {users && (
        <DataTable
          columns={columns}
          data={users}
          pageCount={pageCount}
          showAdd={false}
          heightTable="50dvh"
        />
      )}
    </>
  );
}
