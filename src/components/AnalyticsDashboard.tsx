import React, { useState } from 'react';
import { 
  Users,
  Database,
  AlertTriangle,
  Clock,
  Download,
  Search,
  X,
  RefreshCw
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
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface UserActivity {
  id: string;
  username: string;
  role: string;
  agency: string;
  lastLogin: string;
  loginCount: number;
  sessionDuration: number;
  actionsPerSession: number;
  status: string;
}

interface ClaimMetrics {
  id: string;
  agency: string;
  specialty: string;
  totalClaims: number;
  processedClaims: number;
  deniedClaims: number;
  approvedClaims: number;
  avgProcessingTime: number;
  revenue: number;
  date: string;
}

interface DenialMetrics {
  id: string;
  agency: string;
  denialReason: string;
  count: number;
  avgResolutionTime: number;
  resolutionRate: number;
  revenueImpact: number;
  date: string;
}

interface LifecycleData {
  stage: string;
  count: number;
  avgTime: number;
  successRate: number;
  color: string;
}

const AnalyticsDashboard: React.FC = () => {
  const [selectedAgency, setSelectedAgency] = useState<string>('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('30d');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showUserModal, setShowUserModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<UserActivity | null>(null);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [exportFormat, setExportFormat] = useState<string>('pdf');
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'claims' | 'denials' | 'lifecycle'>('overview');

  // Mock data for Analytics Dashboard
  const userActivities: UserActivity[] = [
    {
      id: 'USR-001',
      username: 'john.smith@fusion.com',
      role: 'Admin',
      agency: 'Alpha Medical Billing',
      lastLogin: '2024-01-15 14:30',
      loginCount: 45,
      sessionDuration: 120,
      actionsPerSession: 25,
      status: 'active'
    },
    {
      id: 'USR-002',
      username: 'sarah.johnson@fusion.com',
      role: 'Clinic Manager',
      agency: 'Beta Healthcare Solutions',
      lastLogin: '2024-01-15 12:15',
      loginCount: 32,
      sessionDuration: 95,
      actionsPerSession: 18,
      status: 'active'
    },
    {
      id: 'USR-003',
      username: 'mike.wilson@fusion.com',
      role: 'Internal Staff',
      agency: 'Gamma Medical Group',
      lastLogin: '2024-01-15 09:45',
      loginCount: 28,
      sessionDuration: 75,
      actionsPerSession: 12,
      status: 'active'
    }
  ];

  const claimMetrics: ClaimMetrics[] = [
    {
      id: 'CM-001',
      agency: 'Alpha Medical Billing',
      specialty: 'Physical Therapy',
      totalClaims: 1250,
      processedClaims: 1180,
      deniedClaims: 95,
      approvedClaims: 1085,
      avgProcessingTime: 3.2,
      revenue: 125000,
      date: '2024-01-15'
    },
    {
      id: 'CM-002',
      agency: 'Beta Healthcare Solutions',
      specialty: 'Occupational Therapy',
      totalClaims: 890,
      processedClaims: 845,
      deniedClaims: 65,
      approvedClaims: 780,
      avgProcessingTime: 2.8,
      revenue: 89000,
      date: '2024-01-15'
    },
    {
      id: 'CM-003',
      agency: 'Gamma Medical Group',
      specialty: 'Speech Therapy',
      totalClaims: 650,
      processedClaims: 620,
      deniedClaims: 45,
      approvedClaims: 575,
      avgProcessingTime: 3.5,
      revenue: 65000,
      date: '2024-01-15'
    }
  ];

  const denialMetrics: DenialMetrics[] = [
    {
      id: 'DM-001',
      agency: 'Alpha Medical Billing',
      denialReason: 'Timely Filing',
      count: 25,
      avgResolutionTime: 2.5,
      resolutionRate: 85,
      revenueImpact: 12500,
      date: '2024-01-15'
    },
    {
      id: 'DM-002',
      agency: 'Beta Healthcare Solutions',
      denialReason: 'Credentialing',
      count: 18,
      avgResolutionTime: 4.2,
      resolutionRate: 72,
      revenueImpact: 9000,
      date: '2024-01-15'
    },
    {
      id: 'DM-003',
      agency: 'Gamma Medical Group',
      denialReason: 'Medical Necessity',
      count: 12,
      avgResolutionTime: 3.8,
      resolutionRate: 78,
      revenueImpact: 6000,
      date: '2024-01-15'
    }
  ];

  const lifecycleData: LifecycleData[] = [
    { stage: 'Submission', count: 1250, avgTime: 0.5, successRate: 98, color: '#3B82F6' },
    { stage: 'Processing', count: 1225, avgTime: 2.1, successRate: 95, color: '#10B981' },
    { stage: 'Review', count: 1164, avgTime: 1.8, successRate: 92, color: '#F59E0B' },
    { stage: 'Approval', count: 1071, avgTime: 0.3, successRate: 96, color: '#EF4444' },
    { stage: 'Payment', count: 1028, avgTime: 5.2, successRate: 89, color: '#8B5CF6' }
  ];

  // Analytics data for charts
  const userLoginData = [
    { month: 'Jan', logins: 1250, activeUsers: 45, avgSession: 95 },
    { month: 'Feb', logins: 1380, activeUsers: 52, avgSession: 102 },
    { month: 'Mar', logins: 1420, activeUsers: 58, avgSession: 108 },
    { month: 'Apr', logins: 1350, activeUsers: 55, avgSession: 98 },
    { month: 'May', logins: 1480, activeUsers: 62, avgSession: 115 },
    { month: 'Jun', logins: 1520, activeUsers: 65, avgSession: 120 }
  ];

  const claimProcessingData = [
    { month: 'Jan', submitted: 1250, processed: 1180, denied: 95, approved: 1085 },
    { month: 'Feb', submitted: 1380, processed: 1310, denied: 105, approved: 1205 },
    { month: 'Mar', submitted: 1420, processed: 1350, denied: 110, approved: 1240 },
    { month: 'Apr', submitted: 1350, processed: 1280, denied: 100, approved: 1180 },
    { month: 'May', submitted: 1480, processed: 1410, denied: 115, approved: 1295 },
    { month: 'Jun', submitted: 1520, processed: 1450, denied: 120, approved: 1330 }
  ];

  const denialResolutionData = [
    { month: 'Jan', resolved: 85, pending: 15, avgTime: 2.5 },
    { month: 'Feb', resolved: 88, pending: 12, avgTime: 2.3 },
    { month: 'Mar', resolved: 92, pending: 8, avgTime: 2.1 },
    { month: 'Apr', resolved: 89, pending: 11, avgTime: 2.4 },
    { month: 'May', resolved: 94, pending: 6, avgTime: 2.0 },
    { month: 'Jun', resolved: 96, pending: 4, avgTime: 1.8 }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span>;
      case 'inactive':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Inactive</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  const handleUserClick = (user: UserActivity) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleExport = () => {
    setShowExportModal(true);
  };

  const handleRefresh = () => {
    alert('Refreshing analytics data...');
  };

  const handleExportFromModal = () => {
    alert(`Exporting analytics data as ${exportFormat}...`);
    setShowExportModal(false);
  };

  const handleViewUser = (user: UserActivity) => {
    alert(`Viewing details for ${user.username}`);
  };

  const handleUserDetails = (user: UserActivity) => {
    alert(`Opening detailed analytics for ${user.username}`);
  };

  const filteredUserActivities = userActivities.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.agency.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAgency = selectedAgency === 'all' || user.agency === selectedAgency;
    return matchesSearch && matchesAgency;
  });

  const filteredClaimMetrics = claimMetrics.filter(claim => {
    const matchesAgency = selectedAgency === 'all' || claim.agency === selectedAgency;
    const matchesSpecialty = selectedSpecialty === 'all' || claim.specialty === selectedSpecialty;
    return matchesAgency && matchesSpecialty;
  });

  const filteredDenialMetrics = denialMetrics.filter(denial => {
    const matchesAgency = selectedAgency === 'all' || denial.agency === selectedAgency;
    return matchesAgency;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics & Utilization Dashboard</h1>
          <p className="text-gray-600">Comprehensive analytics for 650+ agencies and 1M+ data points</p>
        </div>
        <div className="flex space-x-3">
          <button onClick={handleExport} className="btn-secondary">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button onClick={handleRefresh} className="btn-primary">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="metric-card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Users className="h-8 w-8 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Users</p>
              <p className="text-2xl font-semibold text-gray-900">1,247</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Database className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Claims Processed</p>
              <p className="text-2xl font-semibold text-gray-900">2.8M</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Denials Worked</p>
              <p className="text-2xl font-semibold text-gray-900">45,230</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Avg Resolution Time</p>
              <p className="text-2xl font-semibold text-gray-900">2.3 days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', name: 'Overview', count: 0 },
            { id: 'users', name: 'User Activity', count: userActivities.length },
            { id: 'claims', name: 'Claims Analytics', count: claimMetrics.length },
            { id: 'denials', name: 'Denial Analytics', count: denialMetrics.length },
            { id: 'lifecycle', name: 'Lifecycle Data', count: lifecycleData.length }
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
          value={selectedAgency}
          onChange={(e) => setSelectedAgency(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="all">All Agencies</option>
          <option value="Alpha Medical Billing">Alpha Medical Billing</option>
          <option value="Beta Healthcare Solutions">Beta Healthcare Solutions</option>
          <option value="Gamma Medical Group">Gamma Medical Group</option>
        </select>
        <select
          value={selectedTimeframe}
          onChange={(e) => setSelectedTimeframe(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
          <option value="1y">Last Year</option>
        </select>
        {activeTab === 'claims' && (
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Specialties</option>
            <option value="Physical Therapy">Physical Therapy</option>
            <option value="Occupational Therapy">Occupational Therapy</option>
            <option value="Speech Therapy">Speech Therapy</option>
          </select>
        )}
      </div>

      {/* Content based on active tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">User Activity Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={userLoginData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="logins" stroke="#3B82F6" strokeWidth={2} />
                  <Line type="monotone" dataKey="activeUsers" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Claim Processing Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={claimProcessingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="submitted" fill="#3B82F6" />
                  <Bar dataKey="processed" fill="#10B981" />
                  <Bar dataKey="approved" fill="#F59E0B" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Denial Resolution Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={denialResolutionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="resolved" stroke="#10B981" strokeWidth={2} />
                  <Line type="monotone" dataKey="avgTime" stroke="#F59E0B" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Claim Lifecycle</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={lifecycleData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ stage, count }) => `${stage}: ${count}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {lifecycleData.map((entry, index) => (
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

      {activeTab === 'users' && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">User Activity ({filteredUserActivities.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agency</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Login Count</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Session</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUserActivities.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleUserClick(user)}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.username}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.agency}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastLogin}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.loginCount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.sessionDuration} min</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(user.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button onClick={() => handleViewUser(user)} className="text-primary-600 hover:text-primary-900 mr-3">View</button>
                      <button onClick={() => handleUserDetails(user)} className="text-blue-600 hover:text-blue-900">Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'claims' && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Claims Analytics ({filteredClaimMetrics.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agency</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialty</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Claims</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Processed</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Denied</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approved</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredClaimMetrics.map((claim) => (
                  <tr key={claim.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{claim.agency}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{claim.specialty}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{claim.totalClaims.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{claim.processedClaims.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">{claim.deniedClaims.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">{claim.approvedClaims.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{claim.avgProcessingTime} days</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${claim.revenue.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'denials' && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Denial Analytics ({filteredDenialMetrics.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agency</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Denial Reason</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Count</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Resolution Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resolution Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue Impact</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDenialMetrics.map((denial) => (
                  <tr key={denial.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{denial.agency}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{denial.denialReason}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{denial.count}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{denial.avgResolutionTime} days</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900">{denial.resolutionRate}%</span>
                        <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${denial.resolutionRate}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">${denial.revenueImpact.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'lifecycle' && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Claim Lifecycle Data</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lifecycleData.map((stage, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-gray-900">{stage.stage}</h4>
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: stage.color }}></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Count:</span>
                      <span className="font-medium">{stage.count.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Avg Time:</span>
                      <span className="font-medium">{stage.avgTime} days</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Success Rate:</span>
                      <span className="font-medium">{stage.successRate}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* User Detail Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">User Activity Details</h3>
                <button onClick={() => setShowUserModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Username</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedUser.username}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedUser.role}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Agency</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedUser.agency}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Login</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedUser.lastLogin}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Login Count</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedUser.loginCount}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Avg Session Duration</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedUser.sessionDuration} minutes</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Actions Per Session</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedUser.actionsPerSession}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Export Analytics</h3>
                <button onClick={() => setShowExportModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Export Format</label>
                  <select
                    value={exportFormat}
                    onChange={(e) => setExportFormat(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="pdf">PDF</option>
                    <option value="excel">Excel</option>
                    <option value="csv">CSV</option>
                    <option value="json">JSON</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Time Range</label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500">
                    <option value="7d">Last 7 Days</option>
                    <option value="30d">Last 30 Days</option>
                    <option value="90d">Last 90 Days</option>
                    <option value="1y">Last Year</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Data Points</label>
                  <div className="mt-2 space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">User Activity</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Claims Analytics</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Denial Analytics</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Lifecycle Data</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button onClick={() => setShowExportModal(false)} className="btn-secondary">Cancel</button>
                <button onClick={handleExportFromModal} className="btn-primary">Export</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsDashboard; 