import React, { useState } from 'react';
import { 
  Shield, 
  Clock,
  CheckCircle,
  AlertTriangle,
  FileText,
  Eye,
  Edit,
  Download,
  Search,
  X,
  Plus,
  Bell,
  RefreshCw,
  BarChart as BarChartIcon
} from 'lucide-react';
import {
  BarChart,
  PieChart,
  LineChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Pie,
  Cell
} from 'recharts';

interface CredentialingRecord {
  id: string;
  provider: string;
  specialty: string;
  agency: string;
  contractType: string;
  status: string;
  submittedDate: string;
  approvedDate?: string;
  expirationDate: string;
  renewalDate: string;
  processingTime?: number;
  priority: string;
  assignedTo?: string;
  notes?: string;
  documents: string[];
  payers: string[];
  lastActivity: string;
}

const CredentialingCRM: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedAgency, setSelectedAgency] = useState<string>('all');
  const [selectedContractType, setSelectedContractType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showRecordModal, setShowRecordModal] = useState<boolean>(false);
  const [showAddProviderModal, setShowAddProviderModal] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<CredentialingRecord | null>(null);
  const [showRenewalModal, setShowRenewalModal] = useState<boolean>(false);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [exportFormat, setExportFormat] = useState<string>('pdf');

  // Mock data for Credentialing CRM
  const credentialingData: CredentialingRecord[] = [
    {
      id: 'CRED-001',
      provider: 'Dr. Sarah Johnson',
      specialty: 'Physical Therapy',
      agency: 'Alpha Medical Billing',
      contractType: 'Individual Provider',
      status: 'approved',
      submittedDate: '2024-01-10',
      approvedDate: '2024-01-15',
      expirationDate: '2025-01-15',
      renewalDate: '2024-12-15',
      processingTime: 5,
      priority: 'high',
      assignedTo: 'Mike Wilson',
      notes: 'Excellent provider with clean record',
      documents: ['license.pdf', 'malpractice.pdf', 'cme_certificates.pdf'],
      payers: ['Blue Cross Blue Shield', 'Aetna', 'Cigna'],
      lastActivity: '2024-01-15 14:30'
    },
    {
      id: 'CRED-002',
      provider: 'Dr. Michael Chen',
      specialty: 'Occupational Therapy',
      agency: 'Beta Healthcare Solutions',
      contractType: 'Group Practice',
      status: 'pending',
      submittedDate: '2024-01-12',
      expirationDate: '2025-01-12',
      renewalDate: '2024-12-12',
      priority: 'medium',
      assignedTo: 'Lisa Brown',
      notes: 'Waiting for additional documentation',
      documents: ['license.pdf', 'malpractice.pdf'],
      payers: ['Blue Cross Blue Shield', 'UnitedHealth'],
      lastActivity: '2024-01-15 10:15'
    },
    {
      id: 'CRED-003',
      provider: 'Dr. Lisa Rodriguez',
      specialty: 'Speech Therapy',
      agency: 'Gamma Medical Group',
      contractType: 'Individual Provider',
      status: 'in_review',
      submittedDate: '2024-01-08',
      expirationDate: '2025-01-08',
      renewalDate: '2024-12-08',
      priority: 'high',
      assignedTo: 'Robert Chen',
      notes: 'Under review for additional requirements',
      documents: ['license.pdf', 'malpractice.pdf', 'specialty_cert.pdf'],
      payers: ['Aetna', 'Cigna', 'UnitedHealth'],
      lastActivity: '2024-01-14 16:45'
    },
    {
      id: 'CRED-004',
      provider: 'Dr. Robert Wilson',
      specialty: 'Physical Therapy',
      agency: 'Delta Billing Partners',
      contractType: 'Group Practice',
      status: 'expired',
      submittedDate: '2023-01-05',
      approvedDate: '2023-01-12',
      expirationDate: '2024-01-12',
      renewalDate: '2023-12-12',
      processingTime: 7,
      priority: 'high',
      assignedTo: 'Sarah Johnson',
      notes: 'Expired - needs immediate renewal',
      documents: ['license.pdf', 'malpractice.pdf'],
      payers: ['Blue Cross Blue Shield', 'Aetna'],
      lastActivity: '2024-01-15 09:20'
    }
  ];

  const credentialingTrends = [
    { month: 'Jan', submitted: 45, approved: 38, pending: 7, avgProcessingTime: 5.2 },
    { month: 'Feb', submitted: 52, approved: 45, pending: 7, avgProcessingTime: 4.8 },
    { month: 'Mar', submitted: 48, approved: 42, pending: 6, avgProcessingTime: 5.1 },
    { month: 'Apr', submitted: 55, approved: 48, pending: 7, avgProcessingTime: 4.9 },
    { month: 'May', submitted: 41, approved: 35, pending: 6, avgProcessingTime: 5.3 },
    { month: 'Jun', submitted: 58, approved: 50, pending: 8, avgProcessingTime: 4.7 },
  ];

  const statusDistribution = [
    { status: 'Approved', count: 165, percentage: 65 },
    { status: 'Pending', count: 45, percentage: 18 },
    { status: 'In Review', count: 25, percentage: 10 },
    { status: 'Expired', count: 15, percentage: 6 },
    { status: 'Denied', count: 5, percentage: 2 },
  ];

  const contractTypeData = [
    { type: 'Individual Provider', count: 120, avgProcessingTime: 4.8 },
    { type: 'Group Practice', count: 85, avgProcessingTime: 6.2 },
    { type: 'Hospital Affiliation', count: 35, avgProcessingTime: 8.5 },
    { type: 'Telemedicine', count: 15, avgProcessingTime: 3.2 },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      approved: { class: 'status-approved', icon: CheckCircle, text: 'Approved' },
      pending: { class: 'status-pending', icon: Clock, text: 'Pending' },
      in_review: { class: 'status-pending', icon: Clock, text: 'In Review' },
      expired: { class: 'status-denied', icon: AlertTriangle, text: 'Expired' },
      denied: { class: 'status-denied', icon: AlertTriangle, text: 'Denied' }
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

  const filteredData = credentialingData.filter(record => {
    const matchesStatus = selectedStatus === 'all' || record.status === selectedStatus;
    const matchesAgency = selectedAgency === 'all' || record.agency.toLowerCase().includes(selectedAgency.toLowerCase());
    const matchesContractType = selectedContractType === 'all' || record.contractType.toLowerCase().includes(selectedContractType.toLowerCase());
    const matchesSearch = record.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.agency.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesAgency && matchesContractType && matchesSearch;
  });

  const handleExport = () => {
    console.log(`Exporting credentialing report in ${exportFormat} format`);
    alert(`Exporting credentialing report in ${exportFormat.toUpperCase()} format...`);
    setShowExportModal(false);
  };

  const handleRecordClick = (record: CredentialingRecord) => {
    setSelectedRecord(record);
    setShowRecordModal(true);
  };

  const handleRenewalReminders = () => {
    alert('Sending renewal reminders to 15 providers...');
  };

  const handleContractTracking = () => {
    alert('Opening contract tracking dashboard...');
  };

  const handleCredentialingAnalytics = () => {
    alert('Launching credentialing analytics...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Credentialing CRM</h1>
          <p className="mt-1 text-sm text-gray-500">
            Light CRM to manage provider/agency credentialing with role-based visibility
          </p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleRenewalReminders}
            className="btn-secondary flex items-center"
          >
            <Bell className="w-4 h-4 mr-2" />
            Renewal Reminders
          </button>
          <button 
            onClick={() => setShowExportModal(true)}
            className="btn-primary flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Credentialing Metrics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
        <div className="metric-card">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-primary-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Providers</p>
              <p className="text-2xl font-semibold text-gray-900">255</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-success-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Approved</p>
              <p className="text-2xl font-semibold text-gray-900">165</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-warning-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <p className="text-2xl font-semibold text-gray-900">45</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-danger-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Expiring Soon</p>
              <p className="text-2xl font-semibold text-gray-900">15</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search providers, specialties, or agencies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Status</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="in_review">In Review</option>
                <option value="expired">Expired</option>
                <option value="denied">Denied</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Agency</label>
              <select
                value={selectedAgency}
                onChange={(e) => setSelectedAgency(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Agencies</option>
                <option value="alpha">Alpha Medical Billing</option>
                <option value="beta">Beta Healthcare Solutions</option>
                <option value="gamma">Gamma Medical Group</option>
                <option value="delta">Delta Billing Partners</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contract Type</label>
              <select
                value={selectedContractType}
                onChange={(e) => setSelectedContractType(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Types</option>
                <option value="individual">Individual Provider</option>
                <option value="group">Group Practice</option>
                <option value="hospital">Hospital Affiliation</option>
                <option value="telemedicine">Telemedicine</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Credentialing Trends */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Credentialing Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={credentialingTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Line yAxisId="left" type="monotone" dataKey="submitted" stroke="#3B82F6" name="Submitted" />
              <Line yAxisId="left" type="monotone" dataKey="approved" stroke="#10B981" name="Approved" />
              <Line yAxisId="right" type="monotone" dataKey="avgProcessingTime" stroke="#EF4444" name="Avg Days" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Status Distribution */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ status, percentage }) => `${status}: ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {statusDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#10B981', '#F59E0B', '#3B82F6', '#EF4444', '#6B7280'][index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Contract Type Performance */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Contract Type Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={contractTypeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="count" fill="#3B82F6" name="Count" />
              <Line yAxisId="right" type="monotone" dataKey="avgProcessingTime" stroke="#EF4444" name="Avg Days" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-4">
            <button 
              onClick={handleRenewalReminders}
              className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center">
                <Bell className="w-5 h-5 text-warning-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">Send Renewal Reminders</span>
              </div>
              <span className="text-sm text-gray-500">15 expiring</span>
            </button>
            <button 
              onClick={handleContractTracking}
              className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-primary-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">Contract Tracking</span>
              </div>
              <span className="text-sm text-gray-500">255 contracts</span>
            </button>
            <button 
              onClick={handleCredentialingAnalytics}
              className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center">
                <BarChartIcon className="w-5 h-5 text-success-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">Credentialing Analytics</span>
              </div>
              <span className="text-sm text-gray-500">Performance metrics</span>
            </button>
          </div>
        </div>
      </div>

      {/* Credentialing Records Table */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Credentialing Records</h3>
          <div className="flex space-x-2">
            <button 
              onClick={handleExport}
              className="btn-secondary flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <button 
              onClick={() => setShowAddProviderModal(true)}
              className="btn-primary flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Provider
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Provider
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Specialty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Agency
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contract Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expiration Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Renewal Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Processing Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {record.provider}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.specialty}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.agency}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.contractType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(record.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.expirationDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.renewalDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.processingTime ? `${record.processingTime} days` : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getPriorityBadge(record.priority)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleRecordClick(record)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-primary-600 hover:text-primary-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-primary-600 hover:text-primary-900">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Detail Modal */}
      {showRecordModal && selectedRecord && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Credentialing Record Details</h3>
              <button 
                onClick={() => setShowRecordModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Provider</label>
                  <p className="text-sm text-gray-900">{selectedRecord.provider}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Specialty</label>
                  <p className="text-sm text-gray-900">{selectedRecord.specialty}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Agency</label>
                  <p className="text-sm text-gray-900">{selectedRecord.agency}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Contract Type</label>
                  <p className="text-sm text-gray-900">{selectedRecord.contractType}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <div className="mt-1">{getStatusBadge(selectedRecord.status)}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Priority</label>
                  <div className="mt-1">{getPriorityBadge(selectedRecord.priority)}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Submitted Date</label>
                  <p className="text-sm text-gray-900">{selectedRecord.submittedDate}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Approved Date</label>
                  <p className="text-sm text-gray-900">{selectedRecord.approvedDate || '-'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Expiration Date</label>
                  <p className="text-sm text-gray-900">{selectedRecord.expirationDate}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Renewal Date</label>
                  <p className="text-sm text-gray-900">{selectedRecord.renewalDate}</p>
                </div>
              </div>
              {selectedRecord.notes && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Notes</label>
                  <p className="text-sm text-gray-900">{selectedRecord.notes}</p>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700">Documents</label>
                <div className="mt-1 space-y-1">
                  {selectedRecord.documents.map((doc, index) => (
                    <div key={index} className="flex items-center text-sm text-primary-600">
                      <FileText className="w-4 h-4 mr-2" />
                      {doc}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Payers</label>
                <div className="mt-1 flex flex-wrap gap-1">
                  {selectedRecord.payers.map((payer, index) => (
                    <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                      {payer}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => setShowRecordModal(false)}
                  className="btn-secondary"
                >
                  Close
                </button>
                <button className="btn-primary">
                  Edit Record
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Export Credentialing Report</h3>
              <button 
                onClick={() => setShowExportModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
                <select
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel</option>
                  <option value="csv">CSV</option>
                  <option value="json">JSON</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => setShowExportModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleExport}
                  className="btn-primary"
                >
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Provider Modal */}
      {showAddProviderModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Add New Provider</h3>
              <button 
                onClick={() => setShowAddProviderModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Provider Name</label>
                <input
                  type="text"
                  placeholder="Enter provider name"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option value="">Select specialty</option>
                  <option value="cardiology">Cardiology</option>
                  <option value="orthopedics">Orthopedics</option>
                  <option value="neurology">Neurology</option>
                  <option value="dermatology">Dermatology</option>
                  <option value="psychiatry">Psychiatry</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Agency</label>
                <input
                  type="text"
                  placeholder="Enter agency name"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contract Type</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option value="">Select contract type</option>
                  <option value="in-network">In-Network</option>
                  <option value="out-network">Out-of-Network</option>
                  <option value="preferred">Preferred Provider</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option value="">Select priority</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  placeholder="Enter any additional notes"
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => setShowAddProviderModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    alert('Provider added successfully!');
                    setShowAddProviderModal(false);
                  }}
                  className="btn-primary"
                >
                  Add Provider
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CredentialingCRM; 