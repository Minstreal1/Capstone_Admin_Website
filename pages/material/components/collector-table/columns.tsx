import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<any>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'name',
    header: 'Tên loại rác',
    enableSorting: true
  },
  {
    accessorKey: 'description',
    header: 'Mô tả'
  },
  {
    accessorKey: 'price',
    header: 'Point / 1kg'
  },
  {
    id: 'actions',
    header: 'Thao tác',
    cell: ({ row }) => <CellAction data={row.original} /> // Hiển thị các hành động như sửa, xóa
  }
];
