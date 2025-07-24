import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Clock, 
  AlertTriangle,
  Calendar,
  Filter,
  Download
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const PayerAnalytics: React.FC = () => {
  const [selectedPayer, setSelectedPayer] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('6months');

  // Mock data for charts
  const paymentTrendData = [
    { month: 'Jan', blueCross: 450000, aetna: 320000, cigna: 280000, unitedHealth: 180000 },
    { month: 'Feb', blueCross: 520000, aetna: 380000, cigna: 310000, unitedHealth: 220000 },
    { month: 'Mar', blueCross: 480000, aetna: 350000, cigna: 290000, unitedHealth: 200000 },
    { month: 'Apr', blueCross: 610000, aetna: 420000, cigna: 340000, unitedHealth: 250000 },
    { month: 'May', blueCross: 580000, aetna: 400000, cigna: 320000, unitedHealth: 230000 },
    { month: 'Jun', blueCross: 650000, aetna: 450000, cigna: 380000, unitedHealth: 280000 },
  ];

  const denialRateData = [
    { payer: 'Blue Cross', rate: 3.2, trend: -0.5 },
    { payer: 'Aetna', rate: 4.8, trend: -1.2 },
    { payer: 'Cigna', rate: 5.5, trend: 0.3 },
    { payer: 'UnitedHealth', rate: 6.2, trend: -0.8 },
  ];

  const processingTimeData = [
    { payer: 'Blue Cross', avgDays: 2.8, target: 3.0 },
    { payer: 'Aetna', avgDays: 3.2, target: 3.0 },
    { payer: 'Cigna', avgDays: 4.1, target: 3.0 },
    { payer: 'UnitedHealth', avgDays: 3.8, target: 3.0 },
  ];

  const payerDistribution = [
    { name: 'Blue Cross', value: 35, color: '#3B82F6' },
    { name: 'Aetna', value: 25, color: '#10B981' },
    { name: 'Cigna', value: 20, color: '#F59E0B' },
    { name: 'UnitedHealth', value: 15, color: '#EF4444' },
    { name: 'Other', value: 5, color: '#8B5CF6' },
  ];

  const payerMetrics = [
    {
      payer: 'Blue Cross',
      totalClaims: 2850,
      totalRevenue: '$1.8M',
      denialRate: '3.2%',
      avgProcessingTime: '2.8 days',
      trend: '+12.5%'
    },
    {
      payer: 'Aetna',
      totalClaims: 2100,
      totalRevenue: '$1.3M',
      denialRate: '4.8%',
      avgProcessingTime: '3.2 days',
      trend: '+8.7%'
    },
    {
      payer: 'Cigna',
      totalClaims: 1680,
      totalRevenue: '$980K',
      denialRate: '5.5%',
      avgProcessingTime: '4.1 days',
      trend: '+5.2%'
    },
    {
      payer: 'UnitedHealth',
      totalClaims: 1200,
      totalRevenue: '$720K',
      denialRate: '6.2%',
      avgProcessingTime: '3.8 days',
      trend: '+15.3%'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payer Analytics</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track and analyze payment trends by payer with detailed insights
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button className="btn-secondary flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payer</label>
            <select
              value={selectedPayer}
              onChange={(e) => setSelectedPayer(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="all">All Payers</option>
              <option value="blueCross">Blue Cross</option>
              <option value="aetna">Aetna</option>
              <option value="cigna">Cigna</option>
              <option value="unitedHealth">UnitedHealth</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time Period</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="6months">Last 6 Months</option>
              <option value="3months">Last 3 Months</option>
              <option value="1month">Last Month</option>
              <option value="1year">Last Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payer Metrics Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {payerMetrics.map((metric) => (
          <div key={metric.payer} className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{metric.payer}</p>
                <p className="text-2xl font-semibold text-gray-900">{metric.totalRevenue}</p>
                <p className="text-sm text-success-600">{metric.trend}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">{metric.totalClaims} claims</p>
                <p className="text-sm text-gray-500">{metric.denialRate} denial rate</p>
                <p className="text-sm text-gray-500">{metric.avgProcessingTime}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Payment Trends */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Trends by Payer</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={paymentTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="blueCross" stroke="#3B82F6" name="Blue Cross" />
              <Line type="monotone" dataKey="aetna" stroke="#10B981" name="Aetna" />
              <Line type="monotone" dataKey="cigna" stroke="#F59E0B" name="Cigna" />
              <Line type="monotone" dataKey="unitedHealth" stroke="#EF4444" name="UnitedHealth" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Payer Distribution */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Payer Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={payerDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {payerDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Denial Rates */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Denial Rates by Payer</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={denialRateData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="payer" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="rate" fill="#EF4444" name="Denial Rate (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Processing Times */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Average Processing Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={processingTimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="payer" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="avgDays" fill="#3B82F6" name="Avg Days" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Payer Table */}
      <div className="card">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Payer Performance Details</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Claims
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Denial Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg Processing Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payerMetrics.map((payer) => (
                <tr key={payer.payer} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {payer.payer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payer.totalClaims.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payer.totalRevenue}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payer.denialRate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payer.avgProcessingTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-success-600">
                    {payer.trend}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PayerAnalytics; 