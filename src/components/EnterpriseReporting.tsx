import React, { useState } from 'react';
import { 
  TrendingUp,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Edit,
  Download,
  Search,
  X,
  Plus
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

interface Agency {
  id: string;
  agency: string;
  region: string;
  claimsProcessed: number;
  revenue: number;
  denialRate: number;
  avgProcessingTime: number;
  status: string;
  customers: number;
  contactPerson: string;
  email: string;
  phone: string;
  lastActivity: string;
}

const EnterpriseReporting: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('month');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showAgencyModal, setShowAgencyModal] = useState<boolean>(false);
  const [selectedAgency, setSelectedAgency] = useState<Agency | null>(null);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [exportFormat, setExportFormat] = useState<string>('pdf');
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [showAddAgencyModal, setShowAddAgencyModal] = useState<boolean>(false);

  // Mock data for Fusion's enterprise metrics
  const enterpriseData: Agency[] = [
    {
      id: 'ENT-001',
      agency: 'Alpha Medical Billing',
      region: 'Northeast',
      claimsProcessed: 45000,
      revenue: 1250000,
      denialRate: 4.2,
      avgProcessingTime: 2.8,
      status: 'active',
      customers: 85,
      contactPerson: 'Sarah Johnson',
      email: 'sarah.johnson@alphamedical.com',
      phone: '(555) 123-4567',
      lastActivity: '2024-01-15 14:30'
    },
    {
      id: 'ENT-002',
      agency: 'Beta Healthcare Solutions',
      region: 'Southeast',
      claimsProcessed: 38000,
      revenue: 980000,
      denialRate: 5.1,
      avgProcessingTime: 3.2,
      status: 'active',
      customers: 72,
      contactPerson: 'Michael Chen',
      email: 'michael.chen@betahealthcare.com',
      phone: '(555) 234-5678',
      lastActivity: '2024-01-15 13:45'
    },
    {
      id: 'ENT-003',
      agency: 'Gamma Medical Group',
      region: 'Midwest',
      claimsProcessed: 52000,
      revenue: 1450000,
      denialRate: 3.8,
      avgProcessingTime: 2.5,
      status: 'active',
      customers: 95,
      contactPerson: 'Lisa Rodriguez',
      email: 'lisa.rodriguez@gammamedical.com',
      phone: '(555) 345-6789',
      lastActivity: '2024-01-15 15:20'
    },
    {
      id: 'ENT-004',
      agency: 'Delta Billing Partners',
      region: 'West',
      claimsProcessed: 41000,
      revenue: 1120000,
      denialRate: 4.7,
      avgProcessingTime: 3.0,
      status: 'active',
      customers: 78,
      contactPerson: 'Robert Wilson',
      email: 'robert.wilson@deltabilling.com',
      phone: '(555) 456-7890',
      lastActivity: '2024-01-15 12:15'
    }
  ];

  const monthlyMetrics = [
    { month: 'Jan', totalClaims: 285000, totalRevenue: 85000000, avgDenialRate: 4.2, activeAgencies: 645 },
    { month: 'Feb', totalClaims: 292000, totalRevenue: 87000000, avgDenialRate: 4.1, activeAgencies: 648 },
    { month: 'Mar', totalClaims: 298000, totalRevenue: 89000000, avgDenialRate: 4.0, activeAgencies: 650 },
    { month: 'Apr', totalClaims: 305000, totalRevenue: 91000000, avgDenialRate: 3.9, activeAgencies: 650 },
    { month: 'May', totalClaims: 310000, totalRevenue: 93000000, avgDenialRate: 3.8, activeAgencies: 650 },
    { month: 'Jun', totalClaims: 300000, totalRevenue: 90000000, avgDenialRate: 4.1, activeAgencies: 650 },
  ];

  const regionData = [
    { region: 'Northeast', agencies: 180, claims: 85000, revenue: 25000000 },
    { region: 'Southeast', agencies: 165, claims: 78000, revenue: 22000000 },
    { region: 'Midwest', agencies: 145, claims: 72000, revenue: 20000000 },
    { region: 'West', agencies: 160, claims: 65000, revenue: 23000000 },
  ];

  const performanceMetrics = [
    { metric: 'Total Agencies', value: 650, change: '+5', trend: 'up' },
    { metric: 'Monthly Claims', value: '300K', change: '+2.5%', trend: 'up' },
    { metric: 'Total Revenue', value: '$90M', change: '+3.2%', trend: 'up' },
    { metric: 'Avg Denial Rate', value: '4.1%', change: '-0.3%', trend: 'down' },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { class: 'status-approved', icon: CheckCircle, text: 'Active' },
      pending: { class: 'status-pending', icon: Clock, text: 'Pending' },
      inactive: { class: 'status-denied', icon: AlertTriangle, text: 'Inactive' }
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

  const filteredData = enterpriseData.filter(agency => {
    const matchesRegion = selectedRegion === 'all' || agency.region.toLowerCase() === selectedRegion.toLowerCase();
    const matchesStatus = selectedStatus === 'all' || agency.status === selectedStatus;
    const matchesSearch = agency.agency.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agency.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRegion && matchesStatus && matchesSearch;
  });

  const handleExport = () => {
    // Simulate export functionality
    console.log(`Exporting data in ${exportFormat} format`);
    alert(`Exporting enterprise report in ${exportFormat.toUpperCase()} format...`);
    setShowExportModal(false);
  };

  const handleAgencyClick = (agency: Agency) => {
    setSelectedAgency(agency);
    setShowAgencyModal(true);
  };

  const handleGenerateReport = () => {
    alert('Generating comprehensive enterprise report...');
  };

  const handleAgencyPerformance = () => {
    alert('Opening agency performance review dashboard...');
  };

  const handleRevenueAnalysis = () => {
    alert('Opening revenue analysis dashboard...');
  };

  const handleAddAgency = () => {
    setShowAddAgencyModal(true);
  };

  const handleExportAgencyData = () => {
    alert('Exporting agency performance data...');
  };

  const handleEditAgency = (agency: Agency) => {
    alert(`Opening edit interface for ${agency.agency}`);
  };

  const handleDownloadAgencyReport = (agency: Agency) => {
    alert(`Downloading report for ${agency.agency}`);
  };

  const handleSubmitAddAgency = () => {
    alert('Agency added successfully!');
    setShowAddAgencyModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Enterprise Reporting</h1>
          <p className="mt-1 text-sm text-gray-500">
            Comprehensive reporting for 650 RCM agency customers processing 300,000 claims monthly
          </p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowFilterModal(true)}
            className="btn-secondary flex items-center"
          >
            <Search className="w-4 h-4 mr-2" />
            Filter
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

      {/* Enterprise Metrics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
        {performanceMetrics.map((metric) => (
          <div key={metric.metric} className="metric-card">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-primary-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{metric.metric}</p>
                <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
                <p className={`text-sm ${metric.trend === 'up' ? 'text-success-600' : 'text-danger-600'}`}>
                  {metric.change}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search agencies, contacts, or regions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time Period</label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Regions</option>
                <option value="northeast">Northeast</option>
                <option value="southeast">Southeast</option>
                <option value="midwest">Midwest</option>
                <option value="west">West</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Monthly Trends */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Enterprise Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Line yAxisId="left" type="monotone" dataKey="totalClaims" stroke="#3B82F6" name="Claims (K)" />
              <Line yAxisId="right" type="monotone" dataKey="totalRevenue" stroke="#10B981" name="Revenue ($M)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Regional Distribution */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Regional Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={regionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="agencies" fill="#3B82F6" name="Agencies" />
              <Bar dataKey="claims" fill="#10B981" name="Claims (K)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Agency Performance */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Performing Agencies</h3>
          <div className="space-y-4">
            {filteredData.slice(0, 3).map((agency) => (
              <div 
                key={agency.id} 
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => handleAgencyClick(agency)}
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">{agency.agency}</p>
                  <p className="text-sm text-gray-500">{agency.region} • {agency.customers} customers</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">${(agency.revenue / 1000000).toFixed(1)}M</p>
                  <p className="text-sm text-gray-500">{agency.claimsProcessed.toLocaleString()} claims</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-4">
            <button 
              onClick={handleGenerateReport}
              className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 text-primary-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">Generate Executive Report</span>
              </div>
              <span className="text-sm text-gray-500">Monthly summary</span>
            </button>
            <button 
              onClick={handleAgencyPerformance}
              className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center">
                <Users className="w-5 h-5 text-success-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">Agency Performance Review</span>
              </div>
              <span className="text-sm text-gray-500">650 agencies</span>
            </button>
            <button 
              onClick={handleRevenueAnalysis}
              className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 text-warning-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">Revenue Analysis</span>
              </div>
              <span className="text-sm text-gray-500">$90M monthly</span>
            </button>
          </div>
        </div>
      </div>

      {/* Agency Table */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Agency Performance Details</h3>
          <div className="flex space-x-2">
            <button className="btn-secondary flex items-center" onClick={() => handleExportAgencyData()}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <button className="btn-primary flex items-center" onClick={handleAddAgency}>
              <Plus className="w-4 h-4 mr-2" />
              Add Agency
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Agency
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Region
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Claims Processed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Denial Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Processing Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customers
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((agency) => (
                <tr key={agency.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {agency.agency}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {agency.region}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {agency.claimsProcessed.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${(agency.revenue / 1000000).toFixed(1)}M
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {agency.denialRate}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {agency.avgProcessingTime} days
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {agency.customers}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(agency.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleAgencyClick(agency)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-primary-600 hover:text-primary-900" onClick={() => handleEditAgency(agency)}>
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-primary-600 hover:text-primary-900" onClick={() => handleDownloadAgencyReport(agency)}>
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

      {/* Agency Detail Modal */}
      {showAgencyModal && selectedAgency && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Agency Details</h3>
              <button 
                onClick={() => setShowAgencyModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Agency Name</label>
                  <p className="text-sm text-gray-900">{selectedAgency.agency}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Region</label>
                  <p className="text-sm text-gray-900">{selectedAgency.region}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Contact Person</label>
                  <p className="text-sm text-gray-900">{selectedAgency.contactPerson}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="text-sm text-gray-900">{selectedAgency.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <p className="text-sm text-gray-900">{selectedAgency.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <div className="mt-1">{getStatusBadge(selectedAgency.status)}</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary-600">{selectedAgency.claimsProcessed.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">Claims Processed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-success-600">${(selectedAgency.revenue / 1000000).toFixed(1)}M</p>
                  <p className="text-sm text-gray-500">Revenue</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-warning-600">{selectedAgency.customers}</p>
                  <p className="text-sm text-gray-500">Customers</p>
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => setShowAgencyModal(false)}
                  className="btn-secondary"
                >
                  Close
                </button>
                <button className="btn-primary">
                  Edit Agency
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
              <h3 className="text-lg font-medium text-gray-900">Export Report</h3>
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

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Advanced Filters</h3>
              <button 
                onClick={() => setShowFilterModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Revenue Range</label>
                <div className="grid grid-cols-2 gap-2">
                  <input type="number" placeholder="Min" className="border border-gray-300 rounded-md px-3 py-2" />
                  <input type="number" placeholder="Max" className="border border-gray-300 rounded-md px-3 py-2" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Denial Rate</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option>All Rates</option>
                  <option>Below 3%</option>
                  <option>3-5%</option>
                  <option>Above 5%</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Processing Time</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option>All Times</option>
                  <option>Under 2 days</option>
                  <option>2-3 days</option>
                  <option>Over 3 days</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => setShowFilterModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowFilterModal(false)}
                  className="btn-primary"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Agency Modal */}
      {showAddAgencyModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Add New Agency</h3>
              <button 
                onClick={() => setShowAddAgencyModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Agency Name</label>
                  <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Region</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                    <option value="">Select Region</option>
                    <option value="northeast">Northeast</option>
                    <option value="southeast">Southeast</option>
                    <option value="midwest">Midwest</option>
                    <option value="west">West</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Contact Person</label>
                  <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" className="w-full border border-gray-300 rounded-md px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input type="tel" className="w-full border border-gray-300 rounded-md px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Claims Processed</label>
                  <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Revenue</label>
                  <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Denial Rate</label>
                  <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Processing Time</label>
                  <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Customers</label>
                  <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" />
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => setShowAddAgencyModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSubmitAddAgency}
                  className="btn-primary"
                >
                  Add Agency
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnterpriseReporting; 