import React, { useState } from 'react';
import { 
  FileText, 
  DollarSign, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  Calendar,
  Download,
  Eye
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
  AreaChart,
  Area
} from 'recharts';

const Factoring: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('month');

  const factoringData = [
    {
      id: 'FAC-001',
      patient: 'John Smith',
      service: 'Physical Therapy',
      originalAmount: 2500,
      factoredAmount: 2250,
      fee: 250,
      status: 'funded',
      date: '2024-01-15',
      paymentDate: '2024-02-15'
    },
    {
      id: 'FAC-002',
      patient: 'Sarah Johnson',
      service: 'Occupational Therapy',
      originalAmount: 1800,
      factoredAmount: 1620,
      fee: 180,
      status: 'pending',
      date: '2024-01-14',
      paymentDate: '2024-02-14'
    },
    {
      id: 'FAC-003',
      patient: 'Mike Wilson',
      service: 'Speech Therapy',
      originalAmount: 3200,
      factoredAmount: 2880,
      fee: 320,
      status: 'funded',
      date: '2024-01-13',
      paymentDate: '2024-02-13'
    },
    {
      id: 'FAC-004',
      patient: 'Lisa Brown',
      service: 'Physical Therapy',
      originalAmount: 1500,
      factoredAmount: 1350,
      fee: 150,
      status: 'processing',
      date: '2024-01-12',
      paymentDate: '2024-02-12'
    }
  ];

  const cashFlowData = [
    { month: 'Jan', original: 45000, factored: 40500, improvement: 4500 },
    { month: 'Feb', original: 52000, factored: 46800, improvement: 5200 },
    { month: 'Mar', original: 48000, factored: 43200, improvement: 4800 },
    { month: 'Apr', original: 61000, factored: 54900, improvement: 6100 },
    { month: 'May', original: 58000, factored: 52200, improvement: 5800 },
    { month: 'Jun', original: 65000, factored: 58500, improvement: 6500 },
  ];

  const factoringVolumeData = [
    { month: 'Jan', volume: 45000, transactions: 18 },
    { month: 'Feb', volume: 52000, transactions: 22 },
    { month: 'Mar', volume: 48000, transactions: 20 },
    { month: 'Apr', volume: 61000, transactions: 25 },
    { month: 'May', volume: 58000, transactions: 24 },
    { month: 'Jun', volume: 65000, transactions: 28 },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      funded: { class: 'status-approved', icon: CheckCircle, text: 'Funded' },
      pending: { class: 'status-pending', icon: Clock, text: 'Pending' },
      processing: { class: 'status-pending', icon: Clock, text: 'Processing' },
      rejected: { class: 'status-denied', icon: AlertTriangle, text: 'Rejected' }
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Factoring Services</h1>
          <p className="mt-1 text-sm text-gray-500">
            Immediate access to funds with improved cash flow management
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-primary flex items-center">
            <FileText className="w-4 h-4 mr-2" />
            New Factoring Request
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
        <div className="metric-card">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-success-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Factored</p>
              <p className="text-2xl font-semibold text-gray-900">$329K</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-primary-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Cash Flow Improvement</p>
              <p className="text-2xl font-semibold text-gray-900">$32.9K</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-warning-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Avg. Funding Time</p>
              <p className="text-2xl font-semibold text-gray-900">1.2 days</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Contracts</p>
              <p className="text-2xl font-semibold text-gray-900">137</p>
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
        {/* Cash Flow Improvement */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Cash Flow Improvement</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="original" stackId="1" stroke="#EF4444" fill="#FEE2E2" name="Original" />
              <Area type="monotone" dataKey="factored" stackId="1" stroke="#10B981" fill="#D1FAE5" name="Factored" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Factoring Volume */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Factoring Volume & Transactions</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={factoringVolumeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="volume" fill="#3B82F6" name="Volume ($)" />
              <Bar yAxisId="right" dataKey="transactions" fill="#10B981" name="Transactions" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Key Metrics */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Key Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-500">Factoring Rate</p>
                <p className="text-lg font-semibold text-gray-900">10%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-500">Approval Rate</p>
                <p className="text-lg font-semibold text-gray-900">94%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-500">Avg. Contract Value</p>
                <p className="text-lg font-semibold text-gray-900">$2,400</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-primary-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">Submit New Request</span>
              </div>
              <span className="text-sm text-gray-500">Quick application</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center">
                <Download className="w-5 h-5 text-success-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">Download Reports</span>
              </div>
              <span className="text-sm text-gray-500">Monthly summary</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-warning-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">Payment Schedule</span>
              </div>
              <span className="text-sm text-gray-500">12 upcoming</span>
            </button>
          </div>
        </div>
      </div>

      {/* Factoring Table */}
      <div className="card">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Factoring Requests</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Request ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Original Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Factored Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Request Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {factoringData.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {request.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.patient}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.service}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${request.originalAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${request.factoredAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${request.fee.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(request.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.paymentDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-primary-600 hover:text-primary-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-primary-600 hover:text-primary-900">
                        <Download className="w-4 h-4" />
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

export default Factoring; 