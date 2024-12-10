import { Checkbox } from '@/components/ui/checkbox';
import { Student } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import helper from '@/helpers/index';

const listRole = {
  ROLE_ADMIN: 'Quản trị viên',
  ROLE_RESIDENT: 'Người dùng',
  ROLE_COLLECTOR: 'Đối tác',
  ROLE_RECYCLING_DEPOT: 'Đại lý thu gom'
};

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
  },
  {
    accessorKey: 'role',
    header: 'Vai trò',
    cell: (info) => {
      const role = info.getValue() as keyof typeof listRole;
      return listRole[role] || 'Không xác định';
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
