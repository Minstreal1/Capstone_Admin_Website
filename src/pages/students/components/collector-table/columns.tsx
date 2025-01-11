import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import helper from '@/helpers/index';

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
    header: 'Tên đối tác',
    cell: ({ row }) => {
      const user = row.original.user; // Lấy đối tượng `user` từ dữ liệu gốc
      return `${user.firstName} ${user.lastName}`; // Hiển thị họ và tên
    },
    enableSorting: true
  },
  {
    accessorKey: 'address',
    header: 'Địa chỉ',
    cell: ({ row }) => {
      const user = row.original.user;
      return user.address || 'Không xác định'; // Hiển thị địa chỉ hoặc giá trị mặc định
    }
  },
  {
    accessorKey: 'isWorking',
    header: 'Trạng thái hoạt động',
    cell: ({ row }) => {
      const isWorking = row.original.isWorking;
      return isWorking ? 'Đang hoạt động' : 'Không hoạt động'; // Hiển thị trạng thái hoạt động
    }
  },
  {
    accessorKey: 'numberPoint',
    header: 'Số điểm giao dịch',
    cell: ({ row }) => {
      const numberPoint = row.original.numberPoint;
      return numberPoint.toFixed(2) || 0;
    }
  },

  {
    accessorKey: 'createdAt',
    header: 'Ngày tham gia',
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      return helper.convertToDate(createdAt); // Sử dụng helper để định dạng ngày
    }
  }
];
