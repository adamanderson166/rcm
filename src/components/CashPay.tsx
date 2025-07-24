import React, { useState } from 'react';
import { 
  CreditCard, 
  DollarSign, 
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle,
  Users,
  Calendar,
  FileText,
  Bell
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

const CashPay: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('month');

  const cashPayData = [
    {
      id: 'CP-001',
      patient: 'John Smith',
      service: 'Physical Therapy',
      amount: 150,
      status: 'paid',
      date: '2024-01-15',
      paymentMethod: 'Credit Card',
      plan: 'Standard'
    },
    {
      id: 'CP-002',
      patient: 'Sarah Johnson',
      service: 'Occupational Therapy',
      amount: 200,
      status: 'pending',
      date: '2024-01-14',
      paymentMethod: 'Payment Plan',
      plan: 'Extended'
    },
    {
      id: 'CP-003',
      patient: 'Mike Wilson',
      service: 'Speech Therapy',
      amount: 175,
      status: 'overdue',
      date: '2024-01-13',
      paymentMethod: 'Cash',
      plan: 'Standard'
    },
    {
      id: 'CP-004',
      patient: 'Lisa Brown',
      service: 'Physical Therapy',
      amount: 125,
      status: 'paid',
      date: '2024-01-12',
      paymentMethod: 'Debit Card',
      plan: 'Standard'
    }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 45000, transactions: 180 },
    { month: 'Feb', revenue: 52000, transactions: 210 },
    { month: 'Mar', revenue: 48000, transactions: 195 },
    { month: 'Apr', revenue: 61000, transactions: 245 },
    { month: 'May', revenue: 58000, transactions: 230 },
    { month: 'Jun', revenue: 65000, transactions: 260 },
  ];

  const paymentMethodData = [
    { method: 'Credit Card', percentage: 45, color: '#3B82F6' },
    { method: 'Debit Card', percentage: 25, color: '#10B981' },
    { method: 'Payment Plans', percentage: 20, color: '#F59E0B' },
    { method: 'Cash', percentage: 10, color: '#EF4444' },
  ];

  const serviceRevenueData = [
    { service: 'Physical Therapy', revenue: 25000, patients: 85 },
    { service: 'Occupational Therapy', revenue: 18000, patients: 62 },
    { service: 'Speech Therapy', revenue: 12000, patients: 45 },
    { service: 'Other Services', revenue: 10000, patients: 35 },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      paid: { class: 'status-approved', icon: CheckCircle, text: 'Paid' },
      pending: { class: 'status-pending', icon: Clock, text: 'Pending' },
      overdue: { class: 'status-denied', icon: AlertTriangle, text: 'Overdue' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;
    
    return (
      <span className={`status-badge ${config.class}`}>
        <Icon className="w-3 h-3 mr-1" />
        {config.text}
      </span>
    );
  };

  const getPlanBadge = (plan: string) => {
    const planConfig = {
      Standard: { class: 'bg-blue-100 text-blue-800', text: 'Standard' },
      Extended: { class: 'bg-green-100 text-green-800', text: 'Extended' },
      Premium: { class: 'bg-purple-100 text-purple-800', text: 'Premium' }
    };
    
    const config = planConfig[plan as keyof typeof planConfig];
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.class}`}>
        {config.text}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cash Pay Solutions</h1>
          <p className="mt-1 text-sm text-gray-500">
            Streamlined payments with transparent pricing and automated reminders
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-primary flex items-center">
            <CreditCard className="w-4 h-4 mr-2" />
            New Payment
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
        <div className="metric-card">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-success-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Monthly Revenue</p>
              <p className="text-2xl font-semibold text-gray-900">$65K</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-primary-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Patients</p>
              <p className="text-2xl font-semibold text-gray-900">260</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-success-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Collection Rate</p>
              <p className="text-2xl font-semibold text-gray-900">94%</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-warning-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Avg. Payment Time</p>
              <p className="text-2xl font-semibold text-gray-900">2.3 days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setSelectedPeriod('week')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedPeriod === 'week'
                ? 'bg-primary-100 text-primary-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setSelectedPeriod('month')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedPeriod === 'month'
                ? 'bg-primary-100 text-primary-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            This Month
          </button>
          <button
            onClick={() => setSelectedPeriod('quarter')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedPeriod === 'quarter'
                ? 'bg-primary-100 text-primary-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            This Quarter
          </button>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Revenue Trend */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue & Transactions Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#3B82F6" name="Revenue ($)" />
              <Line yAxisId="right" type="monotone" dataKey="transactions" stroke="#10B981" name="Transactions" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Payment Methods */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={paymentMethodData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ method, percentage }) => `${method}: ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="percentage"
              >
                {paymentMethodData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Service Revenue */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue by Service</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={serviceRevenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="service" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#8B5CF6" name="Revenue ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center">
                <Bell className="w-5 h-5 text-warning-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">Send Payment Reminders</span>
              </div>
              <span className="text-sm text-gray-500">15 overdue</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-primary-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">Generate Payment Reports</span>
              </div>
              <span className="text-sm text-gray-500">Monthly summary</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-success-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">Schedule Payment Plans</span>
              </div>
              <span className="text-sm text-gray-500">8 pending</span>
            </button>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="card">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Payments</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cashPayData.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {payment.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.patient}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.service}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${payment.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.paymentMethod}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getPlanBadge(payment.plan)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(payment.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-primary-600 hover:text-primary-900">
                        <FileText className="w-4 h-4" />
                      </button>
                      <button className="text-primary-600 hover:text-primary-900">
                        <Bell className="w-4 h-4" />
                      </button>
                    </div>
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

export default CashPay; 