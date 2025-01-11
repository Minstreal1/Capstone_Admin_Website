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
      return numberPoint || 0; // Hiển thị số điểm hoặc 0 nếu không có giá trị
    }
  },
  // {
  //   accessorKey: 'rewardPoint',
  //   header: 'Số giao dịch hoàn thành',
  //   cell: ({ row }) => {
  //     const rewardPoint = row.original.rewardPoint || 0; // Thay rewardPoint bằng dữ liệu thực tế nếu có
  //     return rewardPoint; // Hiển thị số giao dịch hoàn thành
  //   }
  // },
  {
    accessorKey: 'rate',
    header: 'Xếp hạng',
    cell: ({ row }) => {
      const rank = row.original.rate;
      return rank + ` sao` || 'Không xác định'; // Hiển thị xếp hạng hoặc giá trị mặc định
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
