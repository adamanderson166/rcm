import React from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Dashboard: React.FC = () => {
  // Mock data for charts
  const revenueData = [
    { month: 'Jan', revenue: 450000, claims: 1200 },
    { month: 'Feb', revenue: 520000, claims: 1350 },
    { month: 'Mar', revenue: 480000, claims: 1100 },
    { month: 'Apr', revenue: 610000, claims: 1500 },
    { month: 'May', revenue: 580000, claims: 1400 },
    { month: 'Jun', revenue: 650000, claims: 1600 },
  ];

  const denialData = [
    { reason: 'Missing Info', count: 45, percentage: 25 },
    { reason: 'Invalid Codes', count: 32, percentage: 18 },
    { reason: 'Timely Filing', count: 28, percentage: 16 },
    { reason: 'Authorization', count: 25, percentage: 14 },
    { reason: 'Other', count: 50, percentage: 27 },
  ];

  const payerData = [
    { name: 'Blue Cross', value: 35, color: '#3B82F6' },
    { name: 'Aetna', value: 25, color: '#10B981' },
    { name: 'Cigna', value: 20, color: '#F59E0B' },
    { name: 'UnitedHealth', value: 15, color: '#EF4444' },
    { name: 'Other', value: 5, color: '#8B5CF6' },
  ];

  const metrics = [
    {
      title: 'Total Revenue',
      value: '$2.8M',
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign,
    },
    {
      title: 'Claims Processed',
      value: '8,150',
      change: '+8.2%',
      changeType: 'positive',
      icon: TrendingUp,
    },
    {
      title: 'Denial Rate',
      value: '4.2%',
      change: '-2.1%',
      changeType: 'positive',
      icon: AlertTriangle,
    },
    {
      title: 'Avg. Processing Time',
      value: '3.2 days',
      change: '-0.8 days',
      changeType: 'positive',
      icon: Clock,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">RCM Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Revenue Cycle Management overview and analytics
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.title} className="metric-card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <metric.icon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {metric.title}
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {metric.value}
                    </div>
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      metric.changeType === 'positive' ? 'text-success-600' : 'text-danger-600'
                    }`}>
                      {metric.changeType === 'positive' ? (
                        <ArrowUpRight className="h-4 w-4 flex-shrink-0 self-center" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 flex-shrink-0 self-center" />
                      )}
                      <span className="sr-only">
                        {metric.changeType === 'positive' ? 'Increased' : 'Decreased'} by
                      </span>
                      {metric.change}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Revenue Trend */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue & Claims Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="revenue" fill="#3B82F6" name="Revenue ($)" />
              <Bar yAxisId="right" dataKey="claims" fill="#10B981" name="Claims" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Denial Reasons */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Denial Reasons</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={denialData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ reason, percentage }) => `${reason}: ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {denialData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Payer Distribution */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Payer Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={payerData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {payerData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'Claim approved', amount: '$2,450', time: '2 min ago', status: 'success' },
              { action: 'Denial received', amount: '$1,200', time: '15 min ago', status: 'warning' },
              { action: 'Payment posted', amount: '$3,800', time: '1 hour ago', status: 'success' },
              { action: 'Claim submitted', amount: '$1,650', time: '2 hours ago', status: 'info' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'success' ? 'bg-success-500' :
                  activity.status === 'warning' ? 'bg-warning-500' : 'bg-primary-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
                <div className="text-sm font-medium text-gray-900">{activity.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 