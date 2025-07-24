import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  XCircle,
  Filter,
  Download,
  Eye,
  Edit
} from 'lucide-react';

const DenialManagement: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const denials = [
    {
      id: 'DNL-001',
      patient: 'John Smith',
      service: 'Physical Therapy',
      amount: '$1,250',
      payer: 'Blue Cross',
      reason: 'Missing authorization',
      status: 'pending',
      date: '2024-01-15',
      priority: 'high'
    },
    {
      id: 'DNL-002',
      patient: 'Sarah Johnson',
      service: 'Occupational Therapy',
      amount: '$850',
      payer: 'Aetna',
      reason: 'Invalid diagnosis code',
      status: 'in_progress',
      date: '2024-01-14',
      priority: 'medium'
    },
    {
      id: 'DNL-003',
      patient: 'Mike Wilson',
      service: 'Speech Therapy',
      amount: '$1,100',
      payer: 'Cigna',
      reason: 'Timely filing exceeded',
      status: 'resolved',
      date: '2024-01-13',
      priority: 'low'
    },
    {
      id: 'DNL-004',
      patient: 'Lisa Brown',
      service: 'Physical Therapy',
      amount: '$950',
      payer: 'UnitedHealth',
      reason: 'Missing documentation',
      status: 'pending',
      date: '2024-01-12',
      priority: 'high'
    },
    {
      id: 'DNL-005',
      patient: 'David Lee',
      service: 'Occupational Therapy',
      amount: '$1,350',
      payer: 'Blue Cross',
      reason: 'Service not covered',
      status: 'denied',
      date: '2024-01-11',
      priority: 'medium'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { class: 'status-pending', icon: Clock, text: 'Pending' },
      in_progress: { class: 'status-pending', icon: Clock, text: 'In Progress' },
      resolved: { class: 'status-approved', icon: CheckCircle, text: 'Resolved' },
      denied: { class: 'status-denied', icon: XCircle, text: 'Denied' }
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

  const filteredDenials = selectedStatus === 'all' 
    ? denials 
    : denials.filter(denial => denial.status === selectedStatus);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Denial Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track and manage claim denials with AI-powered workflow automation
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

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
        <div className="metric-card">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-warning-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Denials</p>
              <p className="text-2xl font-semibold text-gray-900">156</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-primary-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending Review</p>
              <p className="text-2xl font-semibold text-gray-900">42</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-success-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Resolved</p>
              <p className="text-2xl font-semibold text-gray-900">89</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <XCircle className="h-8 w-8 text-danger-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Final Denials</p>
              <p className="text-2xl font-semibold text-gray-900">25</p>
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
            All Denials
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
            onClick={() => setSelectedStatus('in_progress')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedStatus === 'in_progress'
                ? 'bg-primary-100 text-primary-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => setSelectedStatus('resolved')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedStatus === 'resolved'
                ? 'bg-success-100 text-success-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Resolved
          </button>
          <button
            onClick={() => setSelectedStatus('denied')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedStatus === 'denied'
                ? 'bg-danger-100 text-danger-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Final Denials
          </button>
        </div>
      </div>

      {/* Denials Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Denial ID
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
                  Payer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
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
              {filteredDenials.map((denial) => (
                <tr key={denial.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {denial.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {denial.patient}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {denial.service}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {denial.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {denial.payer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {denial.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(denial.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getPriorityBadge(denial.priority)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {denial.date}
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

export default DenialManagement; 