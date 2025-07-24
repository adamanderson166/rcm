import React, { useState } from 'react';
import { 
  DollarSign, 
  AlertTriangle, 
  Clock,
  CheckCircle,
  Users,
  FileText,
  Download,
  Search,
  Eye,
  Edit,
  X,
  Plus,
  RefreshCw,
  Play,
  Target,
  BarChart as BarChartIcon
} from 'lucide-react';
import {
  BarChart,
  LineChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface ARClaim {
  id: string;
  claimId: string;
  patient: string;
  provider: string;
  agency: string;
  service: string;
  amount: number;
  status: string;
  denialReason?: string;
  carcCode?: string;
  assignedTo?: string;
  touches: number;
  timeToResolution?: number;
  submittedDate: string;
  lastActivity: string;
  priority: string;
  aging: number;
  notes?: string;
}

const ARDashboard: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedAgency, setSelectedAgency] = useState<string>('all');
  const [selectedDenialReason, setSelectedDenialReason] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showClaimModal, setShowClaimModal] = useState<boolean>(false);
  const [selectedClaim, setSelectedClaim] = useState<ARClaim | null>(null);
  const [show835Modal, setShow835Modal] = useState<boolean>(false);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [exportFormat, setExportFormat] = useState<string>('csv');
  const [isProcessing835, setIsProcessing835] = useState<boolean>(false);
  const [processingProgress, setProcessingProgress] = useState<number>(0);
  const [showAddClaimModal, setShowAddClaimModal] = useState<boolean>(false);

  // Mock data for AR & Denial Management
  const arClaimsData: ARClaim[] = [
    {
      id: 'AR-001',
      claimId: 'CLM-2024-001234',
      patient: 'John Smith',
      provider: 'Dr. Sarah Johnson',
      agency: 'Alpha Medical Billing',
      service: 'Physical Therapy',
      amount: 1250,
      status: 'denied',
      denialReason: 'Missing authorization',
      carcCode: 'CARC-001',
      assignedTo: 'Mike Wilson',
      touches: 3,
      timeToResolution: 5,
      submittedDate: '2024-01-10',
      lastActivity: '2024-01-15 14:30',
      priority: 'high',
      aging: 5,
      notes: 'Need to contact provider for authorization details'
    },
    {
      id: 'AR-002',
      claimId: 'CLM-2024-001235',
      patient: 'Sarah Johnson',
      provider: 'Dr. Michael Chen',
      agency: 'Beta Healthcare Solutions',
      service: 'Occupational Therapy',
      amount: 850,
      status: 'pending',
      denialReason: 'Invalid diagnosis code',
      carcCode: 'CARC-002',
      assignedTo: 'Lisa Brown',
      touches: 1,
      submittedDate: '2024-01-12',
      lastActivity: '2024-01-15 10:15',
      priority: 'medium',
      aging: 3,
      notes: 'Diagnosis code needs to be updated'
    },
    {
      id: 'AR-003',
      claimId: 'CLM-2024-001236',
      patient: 'Mike Wilson',
      provider: 'Dr. Lisa Rodriguez',
      agency: 'Gamma Medical Group',
      service: 'Speech Therapy',
      amount: 1100,
      status: 'resolved',
      denialReason: 'Timely filing exceeded',
      carcCode: 'CARC-003',
      assignedTo: 'Robert Chen',
      touches: 5,
      timeToResolution: 8,
      submittedDate: '2024-01-05',
      lastActivity: '2024-01-13 16:45',
      priority: 'low',
      aging: 8,
      notes: 'Resolved with appeal'
    },
    {
      id: 'AR-004',
      claimId: 'CLM-2024-001237',
      patient: 'Lisa Brown',
      provider: 'Dr. Robert Wilson',
      agency: 'Delta Billing Partners',
      service: 'Physical Therapy',
      amount: 950,
      status: 'denied',
      denialReason: 'Missing documentation',
      carcCode: 'CARC-004',
      assignedTo: 'Sarah Johnson',
      touches: 2,
      submittedDate: '2024-01-08',
      lastActivity: '2024-01-15 09:20',
      priority: 'high',
      aging: 7,
      notes: 'Waiting for medical records'
    }
  ];

  const arAgingData = [
    { bucket: '0-30 days', amount: 2500000, claims: 1250, percentage: 45 },
    { bucket: '31-60 days', amount: 1800000, claims: 850, percentage: 32 },
    { bucket: '61-90 days', amount: 800000, claims: 400, percentage: 15 },
    { bucket: '90+ days', amount: 300000, claims: 150, percentage: 8 },
  ];

  const denialReasonData = [
    { reason: 'Missing Authorization', count: 450, percentage: 25, avgResolutionTime: 4.2 },
    { reason: 'Invalid Diagnosis Code', count: 320, percentage: 18, avgResolutionTime: 3.8 },
    { reason: 'Timely Filing Exceeded', count: 280, percentage: 16, avgResolutionTime: 6.5 },
    { reason: 'Missing Documentation', count: 250, percentage: 14, avgResolutionTime: 5.1 },
    { reason: 'Service Not Covered', count: 200, percentage: 11, avgResolutionTime: 7.2 },
    { reason: 'Other', count: 300, percentage: 16, avgResolutionTime: 4.8 },
  ];

  const agentPerformanceData = [
    { agent: 'Mike Wilson', claimsAssigned: 125, resolved: 98, avgResolutionTime: 3.2, touches: 4.5 },
    { agent: 'Lisa Brown', claimsAssigned: 110, resolved: 85, avgResolutionTime: 3.8, touches: 3.8 },
    { agent: 'Robert Chen', claimsAssigned: 95, resolved: 78, avgResolutionTime: 4.1, touches: 4.2 },
    { agent: 'Sarah Johnson', claimsAssigned: 140, resolved: 112, avgResolutionTime: 2.9, touches: 3.9 },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { class: 'status-pending', icon: Clock, text: 'Pending' },
      denied: { class: 'status-denied', icon: AlertTriangle, text: 'Denied' },
      resolved: { class: 'status-approved', icon: CheckCircle, text: 'Resolved' },
      in_progress: { class: 'status-pending', icon: Clock, text: 'In Progress' }
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

  const filteredData = arClaimsData.filter(claim => {
    const matchesStatus = selectedStatus === 'all' || claim.status === selectedStatus;
    const matchesAgency = selectedAgency === 'all' || claim.agency.toLowerCase().includes(selectedAgency.toLowerCase());
    const matchesDenialReason = selectedDenialReason === 'all' || claim.denialReason?.toLowerCase().includes(selectedDenialReason.toLowerCase());
    const matchesSearch = claim.claimId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.provider.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesAgency && matchesDenialReason && matchesSearch;
  });

  const handleImport835 = () => {
    setIsProcessing835(true);
    setProcessingProgress(0);
    
    // Simulate processing
    const interval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing835(false);
          alert('835 file imported successfully! 2,450 claims processed with CARC codes.');
          setShow835Modal(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleExport = () => {
    console.log(`Exporting AR report in ${exportFormat} format`);
    alert(`Exporting AR & Denial report in ${exportFormat.toUpperCase()} format...`);
    setShowExportModal(false);
  };

  const handleClaimClick = (claim: ARClaim) => {
    setSelectedClaim(claim);
    setShowClaimModal(true);
  };

  const handleReassignClaim = () => {
    alert('Opening claim reassignment interface...');
  };

  const handleDenialWorkflow = () => {
    alert('Launching denial workflow automation...');
  };

  const handleAgentPerformance = () => {
    alert('Opening agent performance analytics...');
  };

  const handleAddClaim = () => {
    setShowAddClaimModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Advanced AR & Denial Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Enterprise-level accounts receivable dashboard for 650+ agencies with 835 integration
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            onClick={() => setShow835Modal(true)}
            className="btn-secondary flex items-center justify-center"
          >
            <FileText className="w-4 h-4 mr-2" />
            Import 835
          </button>
          <button 
            onClick={() => setShowExportModal(true)}
            className="btn-primary flex items-center justify-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* AR Metrics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="metric-card">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-primary-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total AR</p>
              <p className="text-2xl font-semibold text-gray-900">$5.4M</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-warning-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Denied Claims</p>
              <p className="text-2xl font-semibold text-gray-900">1,800</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-success-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Agents</p>
              <p className="text-2xl font-semibold text-gray-900">45</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Avg Resolution</p>
              <p className="text-2xl font-semibold text-gray-900">4.2 days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="flex flex-col gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search claims, patients, or providers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="denied">Denied</option>
                <option value="resolved">Resolved</option>
                <option value="in_progress">In Progress</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Agency</label>
              <select
                value={selectedAgency}
                onChange={(e) => setSelectedAgency(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Agencies</option>
                <option value="alpha">Alpha Medical Billing</option>
                <option value="beta">Beta Healthcare Solutions</option>
                <option value="gamma">Gamma Medical Group</option>
                <option value="delta">Delta Billing Partners</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Denial Reason</label>
              <select
                value={selectedDenialReason}
                onChange={(e) => setSelectedDenialReason(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Reasons</option>
                <option value="authorization">Missing Authorization</option>
                <option value="diagnosis">Invalid Diagnosis Code</option>
                <option value="timely">Timely Filing Exceeded</option>
                <option value="documentation">Missing Documentation</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* AR Aging */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">AR Aging Buckets</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={arAgingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="bucket" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#3B82F6" name="Amount ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Denial Reasons */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Denial Reasons & Resolution Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={denialReasonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="reason" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="count" fill="#10B981" name="Count" />
              <Line yAxisId="right" type="monotone" dataKey="avgResolutionTime" stroke="#EF4444" name="Avg Days" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Agent Performance */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Agent Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={agentPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="agent" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="resolved" fill="#10B981" name="Resolved" />
              <Bar dataKey="claimsAssigned" fill="#3B82F6" name="Assigned" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-4">
            <button 
              onClick={() => setShow835Modal(true)}
              className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-primary-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">Import 835 Files</span>
              </div>
              <span className="text-sm text-gray-500">CARC codes</span>
            </button>
            <button 
              onClick={handleReassignClaim}
              className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center">
                <Users className="w-5 h-5 text-success-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">Reassign Claims</span>
              </div>
              <span className="text-sm text-gray-500">45 agents</span>
            </button>
            <button 
              onClick={handleDenialWorkflow}
              className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center">
                <Target className="w-5 h-5 text-warning-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">Denial Workflow</span>
              </div>
              <span className="text-sm text-gray-500">Automated</span>
            </button>
          </div>
        </div>
      </div>

      {/* AR Claims Table */}
      <div className="card">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
          <h3 className="text-lg font-medium text-gray-900">AR Claims & Denials</h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <button 
              onClick={handleAgentPerformance}
              className="btn-secondary flex items-center justify-center"
            >
              <BarChartIcon className="w-4 h-4 mr-2" />
              Agent Performance
            </button>
            <button 
              onClick={handleAddClaim}
              className="btn-primary flex items-center justify-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Claim
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Claim ID
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Provider
                </th>
                <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Agency
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Denial Reason
                </th>
                <th className="hidden xl:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CARC Code
                </th>
                <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="hidden xl:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Touches
                </th>
                <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aging
                </th>
                <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((claim) => (
                <tr key={claim.id} className="hover:bg-gray-50">
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {claim.claimId}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {claim.patient}
                  </td>
                  <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {claim.provider}
                  </td>
                  <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {claim.agency}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${claim.amount.toLocaleString()}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(claim.status)}
                  </td>
                  <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {claim.denialReason || '-'}
                  </td>
                  <td className="hidden xl:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {claim.carcCode || '-'}
                  </td>
                  <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {claim.assignedTo || '-'}
                  </td>
                  <td className="hidden xl:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {claim.touches}
                  </td>
                  <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {claim.aging} days
                  </td>
                  <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap">
                    {getPriorityBadge(claim.priority)}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-1 sm:space-x-2">
                      <button 
                        onClick={() => handleClaimClick(claim)}
                        className="text-primary-600 hover:text-primary-900 p-1"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-primary-600 hover:text-primary-900 p-1">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-primary-600 hover:text-primary-900 p-1">
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

      {/* Claim Detail Modal */}
      {showClaimModal && selectedClaim && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Claim Details</h3>
              <button 
                onClick={() => setShowClaimModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Claim ID</label>
                  <p className="text-sm text-gray-900">{selectedClaim.claimId}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Patient</label>
                  <p className="text-sm text-gray-900">{selectedClaim.patient}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Provider</label>
                  <p className="text-sm text-gray-900">{selectedClaim.provider}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Agency</label>
                  <p className="text-sm text-gray-900">{selectedClaim.agency}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Service</label>
                  <p className="text-sm text-gray-900">{selectedClaim.service}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Amount</label>
                  <p className="text-sm text-gray-900">${selectedClaim.amount.toLocaleString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <div className="mt-1">{getStatusBadge(selectedClaim.status)}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Priority</label>
                  <div className="mt-1">{getPriorityBadge(selectedClaim.priority)}</div>
                </div>
              </div>
              {selectedClaim.denialReason && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Denial Reason</label>
                  <p className="text-sm text-gray-900">{selectedClaim.denialReason}</p>
                </div>
              )}
              {selectedClaim.carcCode && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">CARC Code</label>
                  <p className="text-sm text-gray-900">{selectedClaim.carcCode}</p>
                </div>
              )}
              {selectedClaim.notes && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Notes</label>
                  <p className="text-sm text-gray-900">{selectedClaim.notes}</p>
                </div>
              )}
              <div className="grid grid-cols-4 gap-4 pt-4 border-t">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary-600">{selectedClaim.touches}</p>
                  <p className="text-sm text-gray-500">Touches</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-success-600">{selectedClaim.aging}</p>
                  <p className="text-sm text-gray-500">Days Aging</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-warning-600">{selectedClaim.assignedTo || 'Unassigned'}</p>
                  <p className="text-sm text-gray-500">Assigned To</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{selectedClaim.timeToResolution || '-'}</p>
                  <p className="text-sm text-gray-500">Resolution Time</p>
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => setShowClaimModal(false)}
                  className="btn-secondary"
                >
                  Close
                </button>
                <button className="btn-primary">
                  Edit Claim
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Import 835 Modal */}
      {show835Modal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Import 835 File</h3>
              <button 
                onClick={() => setShow835Modal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select 835 File</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">835 files with CARC codes</p>
                </div>
              </div>
              {isProcessing835 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Processing...</label>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${processingProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{processingProgress}% complete</p>
                </div>
              )}
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => setShow835Modal(false)}
                  className="btn-secondary"
                  disabled={isProcessing835}
                >
                  Cancel
                </button>
                <button 
                  onClick={handleImport835}
                  className="btn-primary"
                  disabled={isProcessing835}
                >
                  {isProcessing835 ? 'Processing...' : 'Import'}
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
              <h3 className="text-lg font-medium text-gray-900">Export AR Report</h3>
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
                  <option value="csv">CSV</option>
                  <option value="excel">Excel</option>
                  <option value="pdf">PDF</option>
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

      {/* Add Claim Modal */}
      {showAddClaimModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Add New Claim</h3>
              <button 
                onClick={() => setShowAddClaimModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Claim ID</label>
                <input
                  type="text"
                  placeholder="Enter claim ID"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name</label>
                <input
                  type="text"
                  placeholder="Enter patient name"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Provider</label>
                <input
                  type="text"
                  placeholder="Enter provider name"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
                <input
                  type="text"
                  placeholder="Enter service description"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                <input
                  type="number"
                  placeholder="Enter claim amount"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="pending">Pending</option>
                  <option value="denied">Denied</option>
                  <option value="resolved">Resolved</option>
                  <option value="in_progress">In Progress</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Denial Reason</label>
                <input
                  type="text"
                  placeholder="Enter denial reason"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CARC Code</label>
                <input
                  type="text"
                  placeholder="Enter CARC code"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assigned To</label>
                <input
                  type="text"
                  placeholder="Enter assigned agent"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  placeholder="Enter any notes"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                ></textarea>
              </div>
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => setShowAddClaimModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    alert('Claim added successfully!');
                    setShowAddClaimModal(false);
                  }}
                  className="btn-primary"
                >
                  Add Claim
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ARDashboard; 