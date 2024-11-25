import { Checkbox } from '@/components/ui/checkbox';
import { Advisory } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import helper from '@/helpers/index';
export const columns: ColumnDef<Advisory>[] = [
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
        onCheckedChange={(value) => {
          row.toggleSelected(!!value);
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'name',
    header: 'Tên phụ huynh',
    enableSorting: true
  },
  {
    accessorKey: 'phone',
    header: 'Số điện thoại'
  },
  {
    accessorKey: 'createdDate',
    header: 'Ngày đặt tư vấn',
    enableSorting: true,
    cell: (date) => helper.convertToDate(date.getValue())
  },
  {
    accessorKey: 'timeAdvisory',
    header: 'Thời gian muốn nhận tư vấn',
    id: 'actions12'
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <CellAction data={row.original} isActive={row.getIsSelected()} />
    )
  }
];

// interface User {
//     id: string;
//     first_name: string;
//     address: string;
//     checkedIn: boolean; // Add this property
//   }

//   async function handleCheckIn(userId: string, isChecked: boolean) {
//     try {
//       await useCheckIn(userId, isChecked); // Call your check-in API
//     } catch (error) {
//       console.error('Error checking in user:', error);
//     }
//   }

//   async function handleCheckInAll(isChecked: boolean) {
//     try {
//       // Call your check-in API for all users
//       // You might need to iterate over all users and call the API for each user
//     } catch (error) {
//       console.error('Error checking in all users:', error);
//     }
//   }

//   async function refreshUserList() {
//     try {
//       await useGetUsers(); // Refresh the user list
//     } catch (error) {
//       console.error('Error refreshing user list:', error);
//     }
//   }
