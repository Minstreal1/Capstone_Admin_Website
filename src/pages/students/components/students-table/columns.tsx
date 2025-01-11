import { Checkbox } from '@/components/ui/checkbox';
import { Student } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import helper from '@/helpers/index';

export const columns: ColumnDef<Student>[] = [
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
    accessorKey: 'lastName',
    header: 'Tên người dùng',
    cell: (info) => info.getValue(),
    enableSorting: true
  },
  {
    accessorKey: 'address',
    header: 'Địa chỉ'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Số điện thoại'
  },
  {
    accessorKey: 'gender',
    header: 'Giới tính',
    cell: (info) => {
      return info.getValue() ? 'Nữ' : 'Nam';
    }
  },
  {
    accessorKey: 'isActive',
    header: 'Trạng thái',
    cell: (info) => {
      return info.getValue() ? 'Đang hoạt động' : 'Đã khóa';
    }
  },
  {
    accessorKey: 'createdAt',
    header: 'Ngày tham gia',
    cell: (info) => helper.convertToDate(info.getValue())
  }
];
