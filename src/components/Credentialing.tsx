import React, { useState } from 'react';
import { 
  Shield, 
  Users, 
  Clock,
  CheckCircle,
  AlertTriangle,
  FileText,
  Calendar,
  TrendingUp,
  Eye,
  Edit
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

const Credentialing: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const credentialingData = [
    {
      id: 'CRED-001',
      provider: 'Dr. Sarah Johnson',
      specialty: 'Physical Therapy',
      payer: 'Blue Cross Blue Shield',
      status: 'approved',
      submittedDate: '2024-01-10',
      approvedDate: '2024-01-15',
      processingTime: 5,
      priority: 'high'
    },
    {
      id: 'CRED-002',
      provider: 'Dr. Michael Chen',
      specialty: 'Occupational Therapy',
      payer: 'Aetna',
      status: 'pending',
      submittedDate: '2024-01-12',
      approvedDate: null,
      processingTime: null,
      priority: 'medium'
    },
    {
      id: 'CRED-003',
      provider: 'Dr. Lisa Rodriguez',
      specialty: 'Speech Therapy',
      payer: 'Cigna',
      status: 'in_review',
      submittedDate: '2024-01-08',
      approvedDate: null,
      processingTime: null,
      priority: 'high'
    },
    {
      id: 'CRED-004',
      provider: 'Dr. Robert Wilson',
      specialty: 'Physical Therapy',
      payer: 'UnitedHealth',
      status: 'approved',
      submittedDate: '2024-01-05',
      approvedDate: '2024-01-12',
      processingTime: 7,
      priority: 'low'
    }
  ];

  const processingTimeData = [
    { payer: 'Blue Cross', avgDays: 5.2, target: 7.0 },
    { payer: 'Aetna', avgDays: 8.5, target: 7.0 },
    { payer: 'Cigna', avgDays: 6.8, target: 7.0 },
    { payer: 'UnitedHealth', avgDays: 7.3, target: 7.0 },
  ];

  const approvalRateData = [
    { month: 'Jan', rate: 92, applications: 45 },
    { month: 'Feb', rate: 94, applications: 52 },
    { month: 'Mar', rate: 89, applications: 48 },
    { month: 'Apr', rate: 96, applications: 58 },
    { month: 'May', rate: 91, applications: 55 },
    { month: 'Jun', rate: 95, applications: 62 },
  ];

  const statusDistribution = [
    { status: 'Approved', count: 45, color: '#10B981' },
    { status: 'Pending', count: 28, color: '#F59E0B' },
    { status: 'In Review', count: 15, color: '#3B82F6' },
    { status: 'Rejected', count: 5, color: '#EF4444' },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      approved: { class: 'status-approved', icon: CheckCircle, text: 'Approved' },
      pending: { class: 'status-pending', icon: Clock, text: 'Pending' },
      in_review: { class: 'status-pending', icon: Clock, text: 'In Review' },
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

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      high: { class: 'bg-danger-100 text-danger-800', text: 'High' },
      medium: { class: 'bg-warning-100 text-warning-800', text: 'Medium' },
      low: { class: 'bg-success-100 text-success-800', text: 'Low' }
    };
    
    const config = priorityConfig[priority as keyof typeof priorityConfig];
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.class}`}>
        {config.text}
      </span>
    );
  };

  const filteredData = selectedStatus === 'all' 
    ? credentialingData 
    : credentialingData.filter(item => item.status === selectedStatus);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Credentialing Services</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage healthcare provider credentialing and insurance network compliance
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-primary flex items-center">
            <Shield className="w-4 h-4 mr-2" />
            New Application
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
        <div className="metric-card">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-primary-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Applications</p>
              <p className="text-2xl font-semibold text-gray-900">93</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-success-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Approval Rate</p>
              <p className="text-2xl font-semibold text-gray-900">95%</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-warning-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Avg. Processing Time</p>
              <p className="text-2xl font-semibold text-gray-900">6.8 days</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">This Month</p>
              <p className="text-2xl font-semibold text-gray-900">62</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setSelectedStatus('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedStatus === 'all'
                ? 'bg-primary-100 text-primary-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Applications
          </button>
          <button
            onClick={() => setSelectedStatus('approved')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedStatus === 'approved'
                ? 'bg-success-100 text-success-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setSelectedStatus('pending')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedStatus === 'pending'
                ? 'bg-warning-100 text-warning-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setSelectedStatus('in_review')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedStatus === 'in_review'
                ? 'bg-primary-100 text-primary-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            In Review
          </button>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Approval Rate Trend */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Approval Rate Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={approvalRateData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="rate" stroke="#10B981" name="Approval Rate (%)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Status Distribution */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Application Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ status, count }) => `${status}: ${count}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {statusDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Processing Times */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Processing Time by Payer</h3>
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

        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-primary-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">Submit New Application</span>
              </div>
              <span className="text-sm text-gray-500">Quick start</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-warning-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">Follow-up Reminders</span>
              </div>
              <span className="text-sm text-gray-500">8 pending</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 text-success-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">Performance Report</span>
              </div>
              <span className="text-sm text-gray-500">Monthly summary</span>
            </button>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="card">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Credentialing Applications</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Application ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Provider
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Specialty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Processing Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((application) => (
                <tr key={application.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {application.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {application.provider}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {application.specialty}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {application.payer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(application.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getPriorityBadge(application.priority)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {application.submittedDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {application.processingTime ? `${application.processingTime} days` : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-primary-600 hover:text-primary-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-primary-600 hover:text-primary-900">
                        <Edit className="w-4 h-4" />
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

export default Credentialing; 