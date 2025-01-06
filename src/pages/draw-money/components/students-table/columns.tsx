import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import __helpers from '@/helpers';
import { Badge } from '@/components/ui/badge';

const STATUS = {
  PENDING: 'Chờ xử lý',
  SUCCESS: 'Thành công',
  CANCELED: 'Đã hủy'
};

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'drawMoneyId',
    header: 'ID'
  },
  {
    accessorKey: 'bankAccountNumber',
    header: 'Số tài khoản',
    enableSorting: true
  },
  {
    accessorKey: 'bankName',
    header: 'Tên ngân hàng'
  },
  {
    accessorKey: 'numberPoint',
    header: 'Số điểm'
  },

  {
    accessorKey: 'amount',
    header: 'Số tiền',
    cell: ({ row }) => {
      return (
        <span>
          {row.original.amount.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND'
          })}
        </span>
      );
    }
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
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ row }) => {
      return (
        <Badge
          className={`${row.original.status === 'PENDING' ? 'bg-yellow-500' : row.original.status === 'SUCCESS' ? 'bg-green-500' : 'bg-red-500'}`}
        >
          {STATUS[row.original.status]}
        </Badge>
      );
    }
  },
  {
    id: 'actions',
    header: 'Thao tác',
    cell: ({ row }) => <CellAction data={row.original} /> // Hiển thị các hành động như sửa, xóa
  }
];
