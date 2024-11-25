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
    'Cơ sở 1': 12000000,
    'Cơ sở 2': 8400000
  },
  {
    name: 'Tháng 2',
    'Cơ sở 1': 11000000,
    'Cơ sở 2': 9000000
  },
  {
    name: 'Tháng 3',
    'Cơ sở 1': 11500000,
    'Cơ sở 2': 8500000
  },
  {
    name: 'Tháng 4',
    'Cơ sở 1': 13000000,
    'Cơ sở 2': 8700000
  },
  {
    name: 'Tháng 5',
    'Cơ sở 1': 14000000,
    'Cơ sở 2': 9200000
  },
  {
    name: 'Tháng 6',
    'Cơ sở 1': 13500000,
    'Cơ sở 2': 8800000
  },
  {
    name: 'Tháng 7',
    'Cơ sở 1': 15000000,
    'Cơ sở 2': 9100000
  },
  {
    name: 'Tháng 8',
    'Cơ sở 1': 16000000,
    'Cơ sở 2': 9500000
  },
  {
    name: 'Tháng 9',
    'Cơ sở 1': 15500000,
    'Cơ sở 2': 9400000
  },
  {
    name: 'Tháng 10',
    'Cơ sở 1': 17000000,
    'Cơ sở 2': 10000000
  },
  {
    name: 'Tháng 11',
    'Cơ sở 1': 16500000,
    'Cơ sở 2': 9800000
  },
  {
    name: 'Tháng 12',
    'Cơ sở 1': 17500000,
    'Cơ sở 2': 10200000
  }
];

export default function SalaryGraph() {
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
