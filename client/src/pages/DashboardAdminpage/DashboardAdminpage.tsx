import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Select } from 'antd';
import { formatCurrency } from '../../utils';
import { useDashboardAdminPage } from './useDashboardAdminPage';
import { YEAR } from '../../constants';
const { Option } = Select;

const DashboardAdminPage = () => {
  const { handleYearChange, revenueData, selectedYear } =
    useDashboardAdminPage();

  return (
    <div className="w-full mx-auto">
      <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
        Monthly Revenue
      </h2>
      <div className="flex items-center justify-center mb-6 ml-auto w-max">
        <label className="mr-4 text-gray-700 text-md">Select Year:</label>
        <Select
          defaultValue={selectedYear}
          onChange={handleYearChange}
          className="w-[120px]"
        >
          {YEAR.map((year) => (
            <Option key={year} value={year}>
              {year}
            </Option>
          ))}
        </Select>
      </div>
      <div className="p-6 bg-white rounded-lg shadow-lg ">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={revenueData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              className="stroke-gray-300"
            />
            <XAxis dataKey="month" className="text-sm text-gray-500" />
            <YAxis
              tickFormatter={(value) => {
                if (value >= 1000000) return `${value / 1000000}M`;
                if (value >= 1000) return `${value / 1000}K`;
                return value;
              }}
              className="text-sm text-gray-500"
            />

            <Tooltip
              contentStyle={{
                backgroundColor: '#f9fafb',
                borderRadius: '0.5rem',
                border: '1px solid #e5e7eb',
              }}
              labelStyle={{ color: '#4b5563' }}
              itemStyle={{ color: '#1f2937' }}
              formatter={(value: number) => formatCurrency(value)}
            />
            <Bar
              dataKey="revenue"
              fill="#4f46e5"
              barSize={20}
              radius={[5, 5, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardAdminPage;
