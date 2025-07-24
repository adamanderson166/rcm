import React, { useState } from 'react';
import { 
  Upload,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Edit,
  X,
  Plus,
  Play,
  Download,
  Search,
  Database,
  TrendingUp,
  RefreshCw
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

interface CartCode {
  id: string;
  claimId: string;
  patient: string;
  service: string;
  payer: string;
  cartCode: string;
  denialReason: string;
  status: string;
  submittedDate: string;
  priority: string;
  amount: number;
  assignedTo?: string;
  notes?: string;
  lastUpdated: string;
}

const CartCodeManagement: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPayer, setSelectedPayer] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showCodeModal, setShowCodeModal] = useState<boolean>(false);
  const [selectedCode, setSelectedCode] = useState<CartCode | null>(null);
  const [showImportModal, setShowImportModal] = useState<boolean>(false);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [showAddCodeModal, setShowAddCodeModal] = useState<boolean>(false);
  const [exportFormat, setExportFormat] = useState<string>('csv');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingProgress, setProcessingProgress] = useState<number>(0);

  // Mock data for 835s and CART code management
  const cartCodeData: CartCode[] = [
    {
      id: 'CART-001',
      claimId: 'CLM-2024-001234',
      patient: 'John Smith',
      service: 'Physical Therapy',
      payer: 'Blue Cross Blue Shield',
      cartCode: 'CART-001',
      denialReason: 'Missing authorization',
      status: 'pending',
      submittedDate: '2024-01-15',
      priority: 'high',
      amount: 1250,
      assignedTo: 'Sarah Johnson',
      notes: 'Need to contact provider for authorization details',
      lastUpdated: '2024-01-15 14:30'
    },
    {
      id: 'CART-002',
      claimId: 'CLM-2024-001235',
      patient: 'Sarah Johnson',
      service: 'Occupational Therapy',
      payer: 'Aetna',
      cartCode: 'CART-002',
      denialReason: 'Invalid diagnosis code',
      status: 'in_progress',
      submittedDate: '2024-01-14',
      priority: 'medium',
      amount: 850,
      assignedTo: 'Mike Wilson',
      notes: 'Diagnosis code needs to be updated',
      lastUpdated: '2024-01-15 10:15'
    },
    {
      id: 'CART-003',
      claimId: 'CLM-2024-001236',
      patient: 'Mike Wilson',
      service: 'Speech Therapy',
      payer: 'Cigna',
      cartCode: 'CART-003',
      denialReason: 'Timely filing exceeded',
      status: 'resolved',
      submittedDate: '2024-01-13',
      priority: 'low',
      amount: 1100,
      assignedTo: 'Lisa Brown',
      notes: 'Resolved with appeal',
      lastUpdated: '2024-01-14 16:45'
    },
    {
      id: 'CART-004',
      claimId: 'CLM-2024-001237',
      patient: 'Lisa Brown',
      service: 'Physical Therapy',
      payer: 'UnitedHealth',
      cartCode: 'CART-004',
      denialReason: 'Missing documentation',
      status: 'pending',
      submittedDate: '2024-01-12',
      priority: 'high',
      amount: 950,
      assignedTo: 'Robert Chen',
      notes: 'Waiting for medical records',
      lastUpdated: '2024-01-15 09:20'
    }
  ];

  const cartCodeTrends = [
    { month: 'Jan', totalCodes: 1250, resolvedCodes: 1180, pendingCodes: 70 },
    { month: 'Feb', totalCodes: 1320, resolvedCodes: 1250, pendingCodes: 70 },
    { month: 'Mar', totalCodes: 1280, resolvedCodes: 1210, pendingCodes: 70 },
    { month: 'Apr', totalCodes: 1400, resolvedCodes: 1330, pendingCodes: 70 },
    { month: 'May', totalCodes: 1350, resolvedCodes: 1280, pendingCodes: 70 },
    { month: 'Jun', totalCodes: 1450, resolvedCodes: 1380, pendingCodes: 70 },
  ];

  const denialReasonDistribution = [
    { reason: 'Missing Authorization', count: 45, percentage: 25 },
    { reason: 'Invalid Diagnosis Code', count: 32, percentage: 18 },
    { reason: 'Timely Filing Exceeded', count: 28, percentage: 16 },
    { reason: 'Missing Documentation', count: 25, percentage: 14 },
    { reason: 'Service Not Covered', count: 20, percentage: 11 },
    { reason: 'Other', count: 30, percentage: 16 },
  ];

  const payerPerformance = [
    { payer: 'Blue Cross', codesSubmitted: 450, codesResolved: 420, resolutionRate: 93.3 },
    { payer: 'Aetna', codesSubmitted: 380, codesResolved: 350, resolutionRate: 92.1 },
    { payer: 'Cigna', codesSubmitted: 320, codesResolved: 290, resolutionRate: 90.6 },
    { payer: 'UnitedHealth', codesSubmitted: 280, codesResolved: 250, resolutionRate: 89.3 },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { class: 'status-pending', icon: Clock, text: 'Pending' },
      in_progress: { class: 'status-pending', icon: Clock, text: 'In Progress' },
      resolved: { class: 'status-approved', icon: CheckCircle, text: 'Resolved' },
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

  const filteredData = cartCodeData.filter(code => {
    const matchesStatus = selectedStatus === 'all' || code.status === selectedStatus;
    const matchesPayer = selectedPayer === 'all' || code.payer.toLowerCase().includes(selectedPayer.toLowerCase());
    const matchesPriority = selectedPriority === 'all' || code.priority === selectedPriority;
    const matchesSearch = code.claimId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         code.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         code.cartCode.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesPayer && matchesPriority && matchesSearch;
  });

  const handleImport835 = () => {
    setIsProcessing(true);
    setProcessingProgress(0);
    
    // Simulate processing
    const interval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          alert('835 file imported successfully! 1,250 CART codes processed.');
          setShowImportModal(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleExport = () => {
    console.log(`Exporting CART codes in ${exportFormat} format`);
    alert(`Exporting CART code report in ${exportFormat.toUpperCase()} format...`);
    setShowExportModal(false);
  };

  const handleCodeClick = (code: CartCode) => {
    setSelectedCode(code);
    setShowCodeModal(true);
  };

  const handleProcessBatch = () => {
    alert('Processing batch of CART codes...');
  };

  const handleAddCode = () => {
    setShowAddCodeModal(true);
  };

  const handleGenerateReport = () => {
    alert('Generating CART code denial analysis report...');
  };

  const handleReviewPending = () => {
    alert('Opening pending codes review interface...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">835s/CART Code Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage 835 files and CART code population for denial reporting
          </p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowImportModal(true)}
            className="btn-secondary flex items-center"
          >
            <Upload className="w-4 h-4 mr-2" />
            Import 835
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

      {/* CART Code Metrics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
        <div className="metric-card">
          <div className="flex items-center">
            <Database className="h-8 w-8 text-primary-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total CART Codes</p>
              <p className="text-2xl font-semibold text-gray-900">1,450</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-success-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Resolved Codes</p>
              <p className="text-2xl font-semibold text-gray-900">1,380</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-warning-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending Codes</p>
              <p className="text-2xl font-semibold text-gray-900">70</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Resolution Rate</p>
              <p className="text-2xl font-semibold text-gray-900">95.2%</p>
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
                placeholder="Search claim ID, patient, or CART code..."
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
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="denied">Denied</option>
              </select>
            </div>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* CART Code Trends */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">CART Code Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={cartCodeTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="totalCodes" stroke="#3B82F6" name="Total Codes" />
              <Line type="monotone" dataKey="resolvedCodes" stroke="#10B981" name="Resolved Codes" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Denial Reason Distribution */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Denial Reason Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={denialReasonDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ reason, percentage }) => `${reason}: ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {denialReasonDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#6B7280'][index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Payer Performance */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Payer Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={payerPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="payer" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="resolutionRate" fill="#10B981" name="Resolution Rate (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-4">
            <button 
              onClick={() => setShowImportModal(true)}
              className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center">
                <Upload className="w-5 h-5 text-primary-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">Import 835 Files</span>
              </div>
              <span className="text-sm text-gray-500">Batch upload</span>
            </button>
            <button 
              onClick={handleGenerateReport}
              className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-success-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">Generate CART Report</span>
              </div>
              <span className="text-sm text-gray-500">Denial analysis</span>
            </button>
            <button 
              onClick={handleReviewPending}
              className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-warning-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">Review Pending Codes</span>
              </div>
              <span className="text-sm text-gray-500">70 pending</span>
            </button>
          </div>
        </div>
      </div>

      {/* CART Codes Table */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">CART Code Management</h3>
          <div className="flex space-x-2">
            <button 
              onClick={handleProcessBatch}
              className="btn-secondary flex items-center"
            >
              <Play className="w-4 h-4 mr-2" />
              Process Batch
            </button>
            <button 
              onClick={handleAddCode}
              className="btn-primary flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Code
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CART ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Claim ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CART Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Denial Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
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
              {filteredData.map((code) => (
                <tr key={code.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {code.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {code.claimId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {code.patient}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {code.service}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {code.payer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {code.cartCode}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {code.denialReason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${code.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(code.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getPriorityBadge(code.priority)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleCodeClick(code)}
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

      {/* CART Code Detail Modal */}
      {showCodeModal && selectedCode && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">CART Code Details</h3>
              <button 
                onClick={() => setShowCodeModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">CART ID</label>
                  <p className="text-sm text-gray-900">{selectedCode.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Claim ID</label>
                  <p className="text-sm text-gray-900">{selectedCode.claimId}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Patient</label>
                  <p className="text-sm text-gray-900">{selectedCode.patient}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Service</label>
                  <p className="text-sm text-gray-900">{selectedCode.service}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Payer</label>
                  <p className="text-sm text-gray-900">{selectedCode.payer}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">CART Code</label>
                  <p className="text-sm font-medium text-gray-900">{selectedCode.cartCode}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <div className="mt-1">{getStatusBadge(selectedCode.status)}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Priority</label>
                  <div className="mt-1">{getPriorityBadge(selectedCode.priority)}</div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Denial Reason</label>
                <p className="text-sm text-gray-900">{selectedCode.denialReason}</p>
              </div>
              {selectedCode.assignedTo && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Assigned To</label>
                  <p className="text-sm text-gray-900">{selectedCode.assignedTo}</p>
                </div>
              )}
              {selectedCode.notes && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Notes</label>
                  <p className="text-sm text-gray-900">{selectedCode.notes}</p>
                </div>
              )}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary-600">${selectedCode.amount.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">Amount</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-success-600">{selectedCode.submittedDate}</p>
                  <p className="text-sm text-gray-500">Submitted</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-warning-600">{selectedCode.lastUpdated}</p>
                  <p className="text-sm text-gray-500">Last Updated</p>
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => setShowCodeModal(false)}
                  className="btn-secondary"
                >
                  Close
                </button>
                <button className="btn-primary">
                  Edit Code
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Import 835 Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Import 835 File</h3>
              <button 
                onClick={() => setShowImportModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select 835 File</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">835 files only</p>
                </div>
              </div>
              {isProcessing && (
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
                  onClick={() => setShowImportModal(false)}
                  className="btn-secondary"
                  disabled={isProcessing}
                >
                  Cancel
                </button>
                <button 
                  onClick={handleImport835}
                  className="btn-primary"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Import'}
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
              <h3 className="text-lg font-medium text-gray-900">Export CART Report</h3>
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

      {/* Add Code Modal */}
      {showAddCodeModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Add New CART Code</h3>
              <button 
                onClick={() => setShowAddCodeModal(false)}
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
                <input
                  type="text"
                  placeholder="Enter service type"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payer</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option value="">Select payer</option>
                  <option value="blue-cross">Blue Cross Blue Shield</option>
                  <option value="aetna">Aetna</option>
                  <option value="cigna">Cigna</option>
                  <option value="united">UnitedHealth</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CART Code</label>
                <input
                  type="text"
                  placeholder="Enter CART code"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Denial Reason</label>
                <textarea
                  placeholder="Enter denial reason"
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => setShowAddCodeModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    alert('CART code added successfully!');
                    setShowAddCodeModal(false);
                  }}
                  className="btn-primary"
                >
                  Add Code
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartCodeManagement; 