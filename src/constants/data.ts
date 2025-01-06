import { NavItem } from '@/types';

export const navItems: NavItem[] = [
  {
    title: 'Trang chủ',
    href: '/',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'Người dùng',
    href: '/user',
    icon: 'user',
    label: 'Student'
  },
  {
    title: 'Đại lý thu gom',
    href: '/depot',
    icon: 'clipboardCheck',
    label: 'Checkin'
  },
  {
    title: 'Báo cáo hoạt động',
    href: '/report',
    icon: 'notepadText',
    label: 'Advisory'
  },
  {
    title: 'Quản lý giao dịch',
    href: '/revenue',
    icon: 'wallet',
    label: 'Revenue'
  },
  {
    title: 'Quản lý loại rác',
    href: '/material',
    icon: 'trash',
    label: 'Revenue'
  },

  {
    title: 'Thoát',
    href: '/login',
    icon: 'login',
    label: 'Login'
  }
];

export const users = [
  {
    id: 1,
    name: 'Candice Schiner',
    company: 'Dell',
    role: 'Frontend Developer',
    verified: false,
    status: 'Active'
  },
  {
    id: 2,
    name: 'John Doe',
    company: 'TechCorp',
    role: 'Backend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Alice Johnson',
    company: 'WebTech',
    role: 'UI Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 4,
    name: 'David Smith',
    company: 'Innovate Inc.',
    role: 'Fullstack Developer',
    verified: false,
    status: 'Inactive'
  },
  {
    id: 5,
    name: 'Emma Wilson',
    company: 'TechGuru',
    role: 'Product Manager',
    verified: true,
    status: 'Active'
  },
  {
    id: 6,
    name: 'James Brown',
    company: 'CodeGenius',
    role: 'QA Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 7,
    name: 'Laura White',
    company: 'SoftWorks',
    role: 'UX Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 8,
    name: 'Michael Lee',
    company: 'DevCraft',
    role: 'DevOps Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 9,
    name: 'Olivia Green',
    company: 'WebSolutions',
    role: 'Frontend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 10,
    name: 'Robert Taylor',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active'
  }
];

export const dashboardCard = [
  {
    date: 'Today',
    total: 2000,
    role: 'Students',
    color: 'bg-[#EC4D61] bg-opacity-40'
  },
  {
    date: 'Today',
    total: 2000,
    role: 'Teachers',
    color: 'bg-[#FFEB95] bg-opacity-100'
  },
  {
    date: 'Today',
    total: 2000,
    role: 'Parents',
    color: 'bg-[#84BD47] bg-opacity-30'
  },
  {
    date: 'Today',
    total: 2000,
    role: 'Schools',
    color: 'bg-[#D289FF] bg-opacity-30'
  }
];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export type Student = {
  id: number;
  name: string;
  address: string;
  gender: boolean;
  classId: number;
  schoolId: number;
  dayOfBirth: string;
  joinAt: string;
  parentName: string;
  parentPhone: string;
  phone: string;
  fee: number;
  endAt: string;
  isActive: boolean;
};

export type StudentCheckIn = {
  id: number;
  name: string;
  classId: number;
  className: string;
  createdDate: string;
  status: number;
  userId: number;
};

export type Advisory = {
  id: number;
  name: string;
  phone: string;
  message: string;
  isDone: boolean;
  timeAdvisory: string;
  modifyDate: string;
  createdDate: string;
};
