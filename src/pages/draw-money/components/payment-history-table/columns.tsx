import { ColumnDef } from '@tanstack/react-table';
import __helpers from '@/helpers';
import { Badge } from '@/components/ui/badge';

const STATUS = {
  1: 'Chờ xử lý',
  2: 'Thành công',
  3: 'Đã hủy'
};

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'orderCode',
    header: 'Mã đơn',
    enableSorting: true
  },

  {
    accessorKey: 'numberPoint',
    header: 'Số điểm'
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
    accessorKey: 'user',
    header: 'Tên người tạo',
    cell: ({ row }) =>
      row.original.user?.firstName + ' ' + row.original.user?.lastName
  },

  {
    accessorKey: 'paymentStatus',
    header: 'Trạng thái',
    cell: ({ row }) => {
      console.log(row.original.paymentStatus);
      return (
        <Badge
          variant={
            {
              1: 'pendding',
              2: 'success',
              3: 'canceled'
            }[row.original.paymentStatus] || 'destructive'
          }
        >
          {STATUS[row.original.paymentStatus]}
        </Badge>
      );
    }
  }
];
