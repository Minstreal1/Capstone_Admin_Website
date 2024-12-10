import { Student } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Student>[] = [
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
