import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import __helpers from '@/helpers';

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'title',
    header: 'Tên bài viết',
    enableSorting: true
  },

  {
    accessorKey: 'createdAt',
    header: 'Ngày tạo',
    cell: ({ row }) => __helpers.convertToDate(row.original.createdAt)
  },
  {
    accessorKey: 'updatedAt',
    header: 'Ngày cập nhập',
    cell: ({ row }) => __helpers.convertToDate(row.original.updatedAt)
  },
  {
    accessorKey: 'user',
    header: 'Người tạo',
    cell: ({ row }) => row.original.user?.username
  },
  {
    id: 'actions',
    header: 'Thao tác',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
