import { Checkbox } from '@/components/ui/checkbox';
import { StudentCheckIn } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellActionStatus } from './cell-action-status';
import { useCheckInStudent } from '@/queries/student.query';

export const columns: ColumnDef<StudentCheckIn>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => {
      const { mutateAsync } = useCheckInStudent();
      const isChecked = row.original.status === 1;
      return (
        <Checkbox
          checked={isChecked}
          onCheckedChange={async (value) => {
            row.toggleSelected(!!value);
            const student = row.original;
            const model = {
              id: student.id,
              userId: student.userId,
              status: isChecked ? 2 : 1,
              classId: student.classId
            };
            row.original.status = isChecked ? 2 : 1;
            await mutateAsync(model);
          }}
          aria-label={`Select row ${row.original.name}`}
        />
      );
    },

    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'name',
    header: 'Tên học sinh',
    enableSorting: true
  },
  {
    accessorKey: 'Status',
    header: 'Trạng thái',
    cell: ({ row }) => (
      <CellActionStatus data={row.original} status={row.original.status} />
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB) => {
      const statusA = rowA.getIsSelected();
      const statusB = rowB.getIsSelected();
      if (statusA === statusB) {
        return 0;
      }
      return statusA > statusB ? 1 : -1;
    }
  }
];
