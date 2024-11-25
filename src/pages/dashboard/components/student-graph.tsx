import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';

const data = [
  {
    name: 'Tháng 1',
    'Cơ sở 1': 30,
    'Cơ sở 2': 20
  },
  {
    name: 'Tháng 2',
    'Cơ sở 1': 32,
    'Cơ sở 2': 22
  },
  {
    name: 'Tháng 3',
    'Cơ sở 1': 33,
    'Cơ sở 2': 23
  },
  {
    name: 'Tháng 4',
    'Cơ sở 1': 35,
    'Cơ sở 2': 22
  },
  {
    name: 'Tháng 5',
    'Cơ sở 1': 28,
    'Cơ sở 2': 15
  },
  {
    name: 'Tháng 6',
    'Cơ sở 1': 37,
    'Cơ sở 2': 22
  },
  {
    name: 'Tháng 7',
    'Cơ sở 1': 32,
    'Cơ sở 2': 12
  },
  {
    name: 'Tháng 8',
    'Cơ sở 1': 23,
    'Cơ sở 2': 12
  },
  {
    name: 'Tháng 9',
    'Cơ sở 1': 23,
    'Cơ sở 2': 21
  },
  {
    name: 'Tháng 10',
    'Cơ sở 1': 18,
    'Cơ sở 2': 22
  },
  {
    name: 'Tháng 11',
    'Cơ sở 1': 24,
    'Cơ sở 2': 17
  },
  {
    name: 'Tháng 12',
    'Cơ sở 1': 22,
    'Cơ sở 2': 20
  }
];

export default function StudentGraph() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="name" />
        <YAxis fontSize={12} />
        <Tooltip />
        <Legend />
        <Bar dataKey="Cơ sở 1" fill="#03346E" radius={[4, 4, 0, 0]} />
        <Bar dataKey="Cơ sở 2" fill="#6EACDA" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
