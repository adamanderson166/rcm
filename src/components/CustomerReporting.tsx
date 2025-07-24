import React, { useState } from 'react';
import { 
  Eye,
  MessageSquare,
  BarChart3,
  Download,
  Plus,
  Search,
  X,
  CheckCircle,
  Clock,
  AlertTriangle,
  Filter,
  Users,
  DollarSign,
  TrendingUp,
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
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface Customer {
  id: string;
  name: string;
  practice: string;
  specialty: string;
  claimsSubmitted: number;
  claimsPaid: number;
  totalRevenue: number;
  denialRate: number;
  avgPaymentTime: number;
  status: string;
  lastActivity: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  notes?: string;
}

const CustomerReporting: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('month');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showCustomerModal, setShowCustomerModal] = useState<boolean>(false);
  const [showAddCustomerModal, setShowAddCustomerModal] = useState<boolean>(false);
  const [selectedCustomerData, setSelectedCustomerData] = useState<Customer | null>(null);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [exportFormat, setExportFormat] = useState<string>('pdf');
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);

  // Mock data for individual customer reporting
  const customerData: Customer[] = [
    {
      id: 'CUST-001',
      name: 'Dr. Sarah Johnson',
      practice: 'Johnson Medical Group',
      specialty: 'Cardiology',
      claimsSubmitted: 1250,
      claimsPaid: 1180,
      totalRevenue: 450000,
      denialRate: 5.6,
      avgPaymentTime: 28,
      status: 'active',
      lastActivity: '2024-01-15',
      contactEmail: 'sarah.johnson@johnsonmedical.com',
      contactPhone: '(555) 123-4567',
      address: '123 Medical Center Dr, Suite 100, Austin, TX 78701',
      notes: 'High-volume cardiology practice with excellent payment history.'
    },
    {
      id: 'CUST-002',
      name: 'Dr. Michael Chen',
      practice: 'Chen Family Practice',
      specialty: 'Primary Care',
      claimsSubmitted: 890,
      claimsPaid: 845,
      totalRevenue: 320000,
      denialRate: 5.1,
      avgPaymentTime: 32,
      status: 'active',
      lastActivity: '2024-01-14',
      contactEmail: 'michael.chen@chenfamily.com',
      contactPhone: '(555) 234-5678',
      address: '456 Health Plaza, Suite 200, Dallas, TX 75201',
      notes: 'Family practice with growing patient base.'
    },
    {
      id: 'CUST-003',
      name: 'Dr. Lisa Rodriguez',
      practice: 'Rodriguez Pediatrics',
      specialty: 'Pediatrics',
      claimsSubmitted: 1560,
      claimsPaid: 1480,
      totalRevenue: 520000,
      denialRate: 5.1,
      avgPaymentTime: 25,
      status: 'active',
      lastActivity: '2024-01-13',
      contactEmail: 'lisa.rodriguez@rodriguezpeds.com',
      contactPhone: '(555) 345-6789',
      address: '789 Children\'s Way, Suite 150, Houston, TX 77001',
      notes: 'Pediatric practice with excellent denial management.'
    },
    {
      id: 'CUST-004',
      name: 'Dr. Robert Wilson',
      practice: 'Wilson Orthopedics',
      specialty: 'Orthopedics',
      claimsSubmitted: 2100,
      claimsPaid: 1995,
      totalRevenue: 780000,
      denialRate: 5.0,
      avgPaymentTime: 30,
      status: 'active',
      lastActivity: '2024-01-12',
      contactEmail: 'robert.wilson@wilsonortho.com',
      contactPhone: '(555) 456-7890',
      address: '321 Bone & Joint Blvd, Suite 300, San Antonio, TX 78201',
      notes: 'Orthopedic practice with high-value procedures.'
    }
  ];

  const customerPerformanceData = [
    { month: 'Jan', avgClaims: 1200, avgRevenue: 450000, avgDenialRate: 5.2 },
    { month: 'Feb', avgClaims: 1250, avgRevenue: 470000, avgDenialRate: 5.0 },
    { month: 'Mar', avgClaims: 1300, avgRevenue: 490000, avgDenialRate: 4.8 },
    { month: 'Apr', avgClaims: 1350, avgRevenue: 510000, avgDenialRate: 4.6 },
    { month: 'May', avgClaims: 1400, avgRevenue: 530000, avgDenialRate: 4.4 },
    { month: 'Jun', avgClaims: 1450, avgRevenue: 550000, avgDenialRate: 4.2 },
  ];

  const specialtyDistribution = [
    { specialty: 'Primary Care', customers: 45, revenue: 1800000 },
    { specialty: 'Cardiology', customers: 32, revenue: 2400000 },
    { specialty: 'Orthopedics', customers: 28, revenue: 2200000 },
    { specialty: 'Pediatrics', customers: 38, revenue: 1600000 },
    { specialty: 'Other', customers: 67, revenue: 2000000 },
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

  const filteredData = customerData.filter(customer => {
    const matchesCustomer = selectedCustomer === 'all' || customer.status === selectedCustomer;
    const matchesSpecialty = selectedSpecialty === 'all' || customer.specialty.toLowerCase() === selectedSpecialty.toLowerCase();
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.practice.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCustomer && matchesSpecialty && matchesSearch;
  });

  const handleExport = () => {
    console.log(`Exporting customer report in ${exportFormat} format`);
    alert(`Exporting customer report in ${exportFormat.toUpperCase()} format...`);
    setShowExportModal(false);
  };

  const handleCustomerClick = (customer: Customer) => {
    setSelectedCustomerData(customer);
    setShowCustomerModal(true);
  };

  const handleCustomerMessage = (customer: Customer) => {
    alert(`Opening message interface for ${customer.name}`);
  };

  const handleCustomerEdit = (customer: Customer) => {
    alert(`Opening edit interface for ${customer.name}`);
  };

  const handleCustomerDetail = () => {
    alert('Opening detailed customer analysis...');
  };

  const handleCustomerCommunication = () => {
    alert('Opening customer communication interface...');
  };

  const handlePerformanceComparison = () => {
    alert('Launching performance comparison dashboard...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Reporting</h1>
          <p className="mt-1 text-sm text-gray-500">
            Individual customer performance and revenue tracking
          </p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowFilterModal(true)}
            className="btn-secondary flex items-center"
          >
            <Filter className="w-4 h-4 mr-2" />
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

      {/* Customer Metrics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
        <div className="metric-card">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-primary-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Customers</p>
              <p className="text-2xl font-semibold text-gray-900">210</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-success-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-2xl font-semibold text-gray-900">$2.07M</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-warning-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Avg Denial Rate</p>
              <p className="text-2xl font-semibold text-gray-900">5.2%</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Avg Payment Time</p>
              <p className="text-2xl font-semibold text-gray-900">28.8 days</p>
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
                placeholder="Search customers, practices, or specialties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
              <select
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Customers</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Specialties</option>
                <option value="primary care">Primary Care</option>
                <option value="cardiology">Cardiology</option>
                <option value="orthopedics">Orthopedics</option>
                <option value="pediatrics">Pediatrics</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Customer Performance Trends */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Performance Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={customerPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Line yAxisId="left" type="monotone" dataKey="avgClaims" stroke="#3B82F6" name="Avg Claims" />
              <Line yAxisId="right" type="monotone" dataKey="avgRevenue" stroke="#10B981" name="Avg Revenue ($)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Specialty Distribution */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue by Specialty</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={specialtyDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ specialty, revenue }) => `${specialty}: $${(revenue/1000000).toFixed(1)}M`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="revenue"
              >
                {specialtyDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Performers */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Performing Customers</h3>
          <div className="space-y-4">
            {filteredData.slice(0, 3).map((customer) => (
              <div 
                key={customer.id} 
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => handleCustomerClick(customer)}
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">{customer.name}</p>
                  <p className="text-sm text-gray-500">{customer.practice} • {customer.specialty}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">${(customer.totalRevenue / 1000).toFixed(0)}K</p>
                  <p className="text-sm text-gray-500">{customer.claimsPaid} claims paid</p>
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
              onClick={handleCustomerDetail}
              className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center">
                <Eye className="w-5 h-5 text-primary-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">Customer Detail Report</span>
              </div>
              <span className="text-sm text-gray-500">Individual analysis</span>
            </button>
            <button 
              onClick={handleCustomerCommunication}
              className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center">
                <MessageSquare className="w-5 h-5 text-success-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">Customer Communication</span>
              </div>
              <span className="text-sm text-gray-500">Send updates</span>
            </button>
            <button 
              onClick={handlePerformanceComparison}
              className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center">
                <BarChart3 className="w-5 h-5 text-warning-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">Performance Comparison</span>
              </div>
              <span className="text-sm text-gray-500">Benchmark analysis</span>
            </button>
          </div>
        </div>
      </div>

      {/* Customer Table */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Customer Performance Details</h3>
          <div className="flex space-x-2">
            <button 
              onClick={handleExport}
              className="btn-secondary flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <button 
              onClick={() => setShowAddCustomerModal(true)}
              className="btn-primary flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Customer
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Practice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Specialty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Claims Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Claims Paid
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Denial Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Time
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
              {filteredData.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {customer.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.practice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.specialty}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.claimsSubmitted.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.claimsPaid.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${(customer.totalRevenue / 1000).toFixed(0)}K
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.denialRate}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.avgPaymentTime} days
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(customer.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleCustomerClick(customer)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleCustomerMessage(customer)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleCustomerEdit(customer)}
                        className="text-primary-600 hover:text-primary-900"
                      >
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

      {/* Customer Detail Modal */}
      {showCustomerModal && selectedCustomerData && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Customer Details</h3>
              <button 
                onClick={() => setShowCustomerModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Customer Name</label>
                  <p className="text-sm text-gray-900">{selectedCustomerData.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Practice</label>
                  <p className="text-sm text-gray-900">{selectedCustomerData.practice}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Specialty</label>
                  <p className="text-sm text-gray-900">{selectedCustomerData.specialty}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <div className="mt-1">{getStatusBadge(selectedCustomerData.status)}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Contact Email</label>
                  <p className="text-sm text-gray-900">{selectedCustomerData.contactEmail}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Contact Phone</label>
                  <p className="text-sm text-gray-900">{selectedCustomerData.contactPhone}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <p className="text-sm text-gray-900">{selectedCustomerData.address}</p>
              </div>
              {selectedCustomerData.notes && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Notes</label>
                  <p className="text-sm text-gray-900">{selectedCustomerData.notes}</p>
                </div>
              )}
              <div className="grid grid-cols-4 gap-4 pt-4 border-t">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary-600">{selectedCustomerData.claimsSubmitted.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">Claims Submitted</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-success-600">{selectedCustomerData.claimsPaid.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">Claims Paid</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-warning-600">${(selectedCustomerData.totalRevenue / 1000).toFixed(0)}K</p>
                  <p className="text-sm text-gray-500">Total Revenue</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{selectedCustomerData.denialRate}%</p>
                  <p className="text-sm text-gray-500">Denial Rate</p>
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => setShowCustomerModal(false)}
                  className="btn-secondary"
                >
                  Close
                </button>
                <button className="btn-primary">
                  Edit Customer
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
              <h3 className="text-lg font-medium text-gray-900">Export Customer Report</h3>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Time</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option>All Times</option>
                  <option>Under 20 days</option>
                  <option>20-30 days</option>
                  <option>Over 30 days</option>
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

      {/* Add Customer Modal */}
      {showAddCustomerModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Add New Customer</h3>
              <button 
                onClick={() => setShowAddCustomerModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
                <input
                  type="text"
                  placeholder="Enter customer name"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Practice Name</label>
                <input
                  type="text"
                  placeholder="Enter practice name"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                <input
                  type="email"
                  placeholder="Enter contact email"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                <input
                  type="tel"
                  placeholder="Enter contact phone"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea
                  placeholder="Enter address"
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => setShowAddCustomerModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    alert('Customer added successfully!');
                    setShowAddCustomerModal(false);
                  }}
                  className="btn-primary"
                >
                  Add Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerReporting; 