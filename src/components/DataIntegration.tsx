import React, { useState } from 'react';
import { 
  Upload,
  Download,
  Search,
  X,
  Server,
  FileText,
  Database,
  HardDrive,
  CheckCircle,
  Zap
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface DataSource {
  id: string;
  name: string;
  type: string;
  status: string;
  lastSync: string;
  recordCount: number;
  size: string;
  connectionString: string;
  description: string;
  schedule: string;
  assignedTo?: string;
}

interface IntegrationJob {
  id: string;
  sourceName: string;
  type: string;
  status: string;
  startTime: string;
  endTime?: string;
  recordsProcessed: number;
  recordsFailed: number;
  duration: number;
  assignedTo?: string;
}

interface LegacySystem {
  id: string;
  name: string;
  type: string;
  status: string;
  lastConnection: string;
  recordCount: number;
  description: string;
  migrationStatus: string;
}

const DataIntegration: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showDataSourceModal, setShowDataSourceModal] = useState<boolean>(false);
  const [selectedDataSource, setSelectedDataSource] = useState<DataSource | null>(null);
  const [showJobModal, setShowJobModal] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<IntegrationJob | null>(null);
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'sources' | 'jobs' | 'legacy' | 'analytics'>('sources');

  // Mock data for Data Integration
  const dataSources: DataSource[] = [
    {
      id: 'DS-001',
      name: 'Hospital Billing System',
      type: 'API',
      status: 'active',
      lastSync: '2024-01-15 14:30',
      recordCount: 125000,
      size: '2.5 GB',
      connectionString: 'https://api.hospital.com/v1/billing',
      description: 'Real-time API connection to hospital billing system',
      schedule: 'Every 15 minutes',
      assignedTo: 'Integration Team'
    },
    {
      id: 'DS-002',
      name: 'Clinic EMR Data',
      type: 'Flat File',
      status: 'active',
      lastSync: '2024-01-15 12:00',
      recordCount: 89000,
      size: '1.8 GB',
      connectionString: '/data/clinic_emr/',
      description: 'Daily batch processing of clinic EMR data',
      schedule: 'Daily at 2:00 AM',
      assignedTo: 'Integration Team'
    },
    {
      id: 'DS-003',
      name: 'Access Database',
      type: 'ODBC',
      status: 'active',
      lastSync: '2024-01-15 10:15',
      recordCount: 45000,
      size: '950 MB',
      connectionString: 'odbc://legacy_access_db',
      description: 'Legacy Access database connection',
      schedule: 'Every 30 minutes',
      assignedTo: 'Integration Team'
    },
    {
      id: 'DS-004',
      name: 'Scanned Documents',
      type: 'OCR',
      status: 'processing',
      lastSync: '2024-01-15 13:45',
      recordCount: 15000,
      size: '500 MB',
      connectionString: '/scanned_docs/',
      description: 'OCR processing of scanned medical documents',
      schedule: 'Real-time',
      assignedTo: 'AI Processing Team'
    }
  ];

  const integrationJobs: IntegrationJob[] = [
    {
      id: 'JOB-001',
      sourceName: 'Hospital Billing System',
      type: 'API Sync',
      status: 'completed',
      startTime: '2024-01-15 14:30',
      endTime: '2024-01-15 14:32',
      recordsProcessed: 1250,
      recordsFailed: 5,
      duration: 2
    },
    {
      id: 'JOB-002',
      sourceName: 'Clinic EMR Data',
      type: 'Batch Import',
      status: 'running',
      startTime: '2024-01-15 14:00',
      recordsProcessed: 890,
      recordsFailed: 12,
      duration: 15
    },
    {
      id: 'JOB-003',
      sourceName: 'Access Database',
      type: 'ODBC Sync',
      status: 'failed',
      startTime: '2024-01-15 13:30',
      endTime: '2024-01-15 13:31',
      recordsProcessed: 450,
      recordsFailed: 45,
      duration: 1
    }
  ];

  const legacySystems: LegacySystem[] = [
    {
      id: 'LS-001',
      name: 'TrueBridge System',
      type: 'Legacy RCM',
      status: 'connected',
      lastConnection: '2024-01-15 14:30',
      recordCount: 250000,
      description: 'Legacy RCM system from acquired company',
      migrationStatus: 'in_progress'
    },
    {
      id: 'LS-002',
      name: 'Access Database',
      type: 'Legacy Database',
      status: 'connected',
      lastConnection: '2024-01-15 10:15',
      recordCount: 45000,
      description: 'Old Access database with patient records',
      migrationStatus: 'completed'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
      case 'connected':
      case 'completed':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">{status}</span>;
      case 'processing':
      case 'running':
      case 'in_progress':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">{status}</span>;
      case 'failed':
      case 'error':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">{status}</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'API':
        return <Server className="w-5 h-5 text-blue-600" />;
      case 'Flat File':
        return <FileText className="w-5 h-5 text-green-600" />;
      case 'ODBC':
        return <Database className="w-5 h-5 text-purple-600" />;
      case 'OCR':
        return <Server className="w-5 h-5 text-orange-600" />;
      default:
        return <Database className="w-5 h-5 text-gray-600" />;
    }
  };

  const handleDataSourceClick = (source: DataSource) => {
    setSelectedDataSource(source);
    setShowDataSourceModal(true);
  };

  const handleJobClick = (job: IntegrationJob) => {
    setSelectedJob(job);
    setShowJobModal(true);
  };

  const handleUpload = () => {
    setShowUploadModal(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setShowUploadModal(false);
          alert('Data source uploaded successfully!');
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleExportData = () => {
    alert('Exporting data integration reports...');
  };

  const handleViewJob = (job: IntegrationJob) => {
    alert(`Viewing job details for ${job.sourceName}`);
  };

  const handleRerunJob = (job: IntegrationJob) => {
    alert(`Rerunning job for ${job.sourceName}`);
  };

  const handleTestConnection = () => {
    alert('Testing data source connection...');
  };

  const handleSyncNow = () => {
    alert('Syncing data source now...');
  };

  const handleEditDataSource = (source: DataSource) => {
    alert(`Opening edit interface for ${source.name}`);
  };

  const handleMigrateLegacySystem = (system: LegacySystem) => {
    alert(`Starting migration for ${system.name}`);
  };

  const handleViewLegacySystem = (system: LegacySystem) => {
    alert(`Viewing details for ${system.name}`);
  };

  const filteredDataSources = dataSources.filter(source => {
    const matchesSearch = source.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         source.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || source.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || source.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const filteredJobs = integrationJobs.filter(job => {
    const matchesSearch = job.sourceName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || job.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredLegacySystems = legacySystems.filter(system => {
    return system.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           system.description.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Analytics data
  const syncData = [
    { month: 'Jan', successful: 95, failed: 5, total: 100 },
    { month: 'Feb', successful: 98, failed: 2, total: 100 },
    { month: 'Mar', successful: 92, failed: 8, total: 100 },
    { month: 'Apr', successful: 96, failed: 4, total: 100 },
    { month: 'May', successful: 99, failed: 1, total: 100 },
    { month: 'Jun', successful: 97, failed: 3, total: 100 }
  ];

  const dataTypeDistribution = [
    { name: 'API', value: 45, color: '#3B82F6' },
    { name: 'Flat File', value: 30, color: '#10B981' },
    { name: 'ODBC', value: 15, color: '#F59E0B' },
    { name: 'OCR', value: 10, color: '#EF4444' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Data Integration & Ingestion</h1>
          <p className="text-gray-600">Connect disparate databases, flat files, APIs, and legacy systems</p>
        </div>
        <div className="flex space-x-3">
          <button onClick={handleUpload} className="btn-primary">
            <Upload className="w-4 h-4 mr-2" />
            Add Data Source
          </button>
          <button onClick={handleExportData} className="btn-secondary">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="metric-card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Database className="h-8 w-8 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Data Sources</p>
              <p className="text-2xl font-semibold text-gray-900">24</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Zap className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Syncs</p>
              <p className="text-2xl font-semibold text-gray-900">18</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <HardDrive className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Data Volume</p>
              <p className="text-2xl font-semibold text-gray-900">15.2 TB</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Success Rate</p>
              <p className="text-2xl font-semibold text-gray-900">96.2%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'sources', name: 'Data Sources', count: dataSources.length },
            { id: 'jobs', name: 'Integration Jobs', count: integrationJobs.length },
            { id: 'legacy', name: 'Legacy Systems', count: legacySystems.length },
            { id: 'analytics', name: 'Analytics', count: 0 }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.name}
              <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 w-full"
            />
          </div>
        </div>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="all">All Types</option>
          <option value="API">API</option>
          <option value="Flat File">Flat File</option>
          <option value="ODBC">ODBC</option>
          <option value="OCR">OCR</option>
        </select>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="processing">Processing</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'sources' && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Data Sources ({filteredDataSources.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Sync</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Records</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDataSources.map((source) => (
                  <tr key={source.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleDataSourceClick(source)}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{source.name}</div>
                        <div className="text-sm text-gray-500">{source.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getTypeIcon(source.type)}
                        <span className="ml-2 text-sm text-gray-900">{source.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(source.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{source.lastSync}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{source.recordCount.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{source.size}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button onClick={() => handleDataSourceClick(source)} className="text-primary-600 hover:text-primary-900 mr-3">View</button>
                      <button onClick={() => handleEditDataSource(source)} className="text-blue-600 hover:text-blue-900">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'jobs' && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Integration Jobs ({filteredJobs.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Records</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleJobClick(job)}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.sourceName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(job.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.startTime}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.duration} min</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {job.recordsProcessed.toLocaleString()}
                      {job.recordsFailed > 0 && (
                        <span className="text-red-600 ml-1">({job.recordsFailed} failed)</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button onClick={() => handleViewJob(job)} className="text-primary-600 hover:text-primary-900 mr-3">View</button>
                      <button onClick={() => handleRerunJob(job)} className="text-blue-600 hover:text-blue-900">Rerun</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'legacy' && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Legacy Systems ({filteredLegacySystems.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">System</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Connection</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Records</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Migration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLegacySystems.map((system) => (
                  <tr key={system.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{system.name}</div>
                        <div className="text-sm text-gray-500">{system.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{system.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(system.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{system.lastConnection}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{system.recordCount.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(system.migrationStatus)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button onClick={() => handleViewLegacySystem(system)} className="text-primary-600 hover:text-primary-900 mr-3">View</button>
                      <button onClick={() => handleMigrateLegacySystem(system)} className="text-blue-600 hover:text-blue-900">Migrate</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Sync Success Rate</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={syncData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="successful" stroke="#10B981" strokeWidth={2} />
                  <Line type="monotone" dataKey="failed" stroke="#EF4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Data Source Types</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dataTypeDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {dataTypeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Data Source Detail Modal */}
      {showDataSourceModal && selectedDataSource && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-4/5 max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Data Source Details</h3>
                <button onClick={() => setShowDataSourceModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Source Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedDataSource.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Type</label>
                      <div className="mt-1 flex items-center">
                        {getTypeIcon(selectedDataSource.type)}
                        <span className="ml-2 text-sm text-gray-900">{selectedDataSource.type}</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <p className="mt-1">{getStatusBadge(selectedDataSource.status)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Schedule</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedDataSource.schedule}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Connection Details</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Connection String</label>
                      <p className="mt-1 text-sm text-gray-900 font-mono">{selectedDataSource.connectionString}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Last Sync</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedDataSource.lastSync}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Record Count</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedDataSource.recordCount.toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Size</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedDataSource.size}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button onClick={handleTestConnection} className="btn-secondary">Test Connection</button>
                <button onClick={handleSyncNow} className="btn-primary">Sync Now</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Job Detail Modal */}
      {showJobModal && selectedJob && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Job Details</h3>
                <button onClick={() => setShowJobModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Source</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedJob.sourceName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedJob.type}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <p className="mt-1">{getStatusBadge(selectedJob.status)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Time</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedJob.startTime}</p>
                </div>
                {selectedJob.endTime && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">End Time</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedJob.endTime}</p>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Duration</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedJob.duration} minutes</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Records Processed</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedJob.recordsProcessed.toLocaleString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Records Failed</label>
                  <p className="mt-1 text-sm text-red-600">{selectedJob.recordsFailed.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Add Data Source</h3>
                <button onClick={() => setShowUploadModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">Drop files here or click to browse</p>
                  <p className="text-xs text-gray-500">Supports CSV, JSON, XML, and database files</p>
                </div>
                {uploadProgress > 0 && (
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Processing...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataIntegration; 