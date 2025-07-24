import React, { useState } from 'react';
import { 
  Monitor, 
  Shield, 
  Server,
  Wifi,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  FileText,
  Settings
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

const ITMSP: React.FC = () => {
  const [selectedSystem, setSelectedSystem] = useState<string>('all');

  const systemData = [
    {
      id: 'SYS-001',
      name: 'Practice Management System',
      status: 'operational',
      uptime: 99.8,
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-02-10',
      users: 45,
      priority: 'critical'
    },
    {
      id: 'SYS-002',
      name: 'Electronic Health Records',
      status: 'operational',
      uptime: 99.9,
      lastMaintenance: '2024-01-08',
      nextMaintenance: '2024-02-08',
      users: 28,
      priority: 'critical'
    },
    {
      id: 'SYS-003',
      name: 'Billing System',
      status: 'maintenance',
      uptime: 98.5,
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-01-16',
      users: 12,
      priority: 'high'
    },
    {
      id: 'SYS-004',
      name: 'Patient Portal',
      status: 'operational',
      uptime: 99.5,
      lastMaintenance: '2024-01-12',
      nextMaintenance: '2024-02-12',
      users: 156,
      priority: 'medium'
    }
  ];

  const securityMetrics = [
    { month: 'Jan', threats: 12, blocked: 12, incidents: 0 },
    { month: 'Feb', threats: 15, blocked: 15, incidents: 0 },
    { month: 'Mar', threats: 8, blocked: 8, incidents: 0 },
    { month: 'Apr', threats: 22, blocked: 21, incidents: 1 },
    { month: 'May', threats: 18, blocked: 18, incidents: 0 },
    { month: 'Jun', threats: 25, blocked: 25, incidents: 0 },
  ];

  const performanceData = [
    { system: 'PMS', responseTime: 0.8, target: 1.0 },
    { system: 'EHR', responseTime: 1.2, target: 1.0 },
    { system: 'Billing', responseTime: 0.6, target: 1.0 },
    { system: 'Portal', responseTime: 1.5, target: 1.0 },
  ];

  const complianceData = [
    { requirement: 'HIPAA Compliance', status: 'compliant', lastAudit: '2024-01-15', nextAudit: '2024-07-15' },
    { requirement: 'Data Encryption', status: 'compliant', lastAudit: '2024-01-10', nextAudit: '2024-04-10' },
    { requirement: 'Access Controls', status: 'compliant', lastAudit: '2024-01-12', nextAudit: '2024-04-12' },
    { requirement: 'Backup Systems', status: 'compliant', lastAudit: '2024-01-08', nextAudit: '2024-02-08' },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      operational: { class: 'status-approved', icon: CheckCircle, text: 'Operational' },
      maintenance: { class: 'status-pending', icon: Clock, text: 'Maintenance' },
      degraded: { class: 'status-pending', icon: AlertTriangle, text: 'Degraded' },
      down: { class: 'status-denied', icon: AlertTriangle, text: 'Down' }
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
      critical: { class: 'bg-danger-100 text-danger-800', text: 'Critical' },
      high: { class: 'bg-warning-100 text-warning-800', text: 'High' },
      medium: { class: 'bg-primary-100 text-primary-800', text: 'Medium' },
      low: { class: 'bg-success-100 text-success-800', text: 'Low' }
    };
    
    const config = priorityConfig[priority as keyof typeof priorityConfig];
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.class}`}>
        {config.text}
      </span>
    );
  };

  const getComplianceBadge = (status: string) => {
    const complianceConfig = {
      compliant: { class: 'bg-success-100 text-success-800', text: 'Compliant' },
      non_compliant: { class: 'bg-danger-100 text-danger-800', text: 'Non-Compliant' },
      pending: { class: 'bg-warning-100 text-warning-800', text: 'Pending' }
    };
    
    const config = complianceConfig[status as keyof typeof complianceConfig];
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.class}`}>
        {config.text}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">IT Managed Service Provider</h1>
          <p className="mt-1 text-sm text-gray-500">
            Tailored IT infrastructure with HIPAA compliance and cybersecurity
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-primary flex items-center">
            <Monitor className="w-4 h-4 mr-2" />
            System Status
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
        <div className="metric-card">
          <div className="flex items-center">
            <Server className="h-8 w-8 text-primary-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">System Uptime</p>
              <p className="text-2xl font-semibold text-gray-900">99.7%</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-success-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Security Score</p>
              <p className="text-2xl font-semibold text-gray-900">98%</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Users</p>
              <p className="text-2xl font-semibold text-gray-900">241</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-warning-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Open Tickets</p>
              <p className="text-2xl font-semibold text-gray-900">3</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setSelectedSystem('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedSystem === 'all'
                ? 'bg-primary-100 text-primary-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Systems
          </button>
          <button
            onClick={() => setSelectedSystem('operational')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedSystem === 'operational'
                ? 'bg-success-100 text-success-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Operational
          </button>
          <button
            onClick={() => setSelectedSystem('maintenance')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedSystem === 'maintenance'
                ? 'bg-warning-100 text-warning-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Maintenance
          </button>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Security Threats */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Security Threats & Blocked Attacks</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={securityMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="threats" stackId="1" stroke="#EF4444" fill="#FEE2E2" name="Threats" />
              <Area type="monotone" dataKey="blocked" stackId="1" stroke="#10B981" fill="#D1FAE5" name="Blocked" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* System Performance */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">System Response Times</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="system" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="responseTime" fill="#3B82F6" name="Response Time (s)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Compliance Status */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Compliance Status</h3>
          <div className="space-y-4">
            {complianceData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.requirement}</p>
                  <p className="text-sm text-gray-500">Next audit: {item.nextAudit}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {getComplianceBadge(item.status)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-success-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">Security Scan</span>
              </div>
              <span className="text-sm text-gray-500">Run now</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-primary-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">Generate Report</span>
              </div>
              <span className="text-sm text-gray-500">Monthly summary</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center">
                <Settings className="w-5 h-5 text-warning-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">System Maintenance</span>
              </div>
              <span className="text-sm text-gray-500">Schedule</span>
            </button>
          </div>
        </div>
      </div>

      {/* Systems Table */}
      <div className="card">
        <h3 className="text-lg font-medium text-gray-900 mb-4">System Status Overview</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  System ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  System Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Uptime
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Active Users
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Maintenance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Next Maintenance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {systemData.map((system) => (
                <tr key={system.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {system.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {system.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(system.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {system.uptime}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getPriorityBadge(system.priority)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {system.users}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {system.lastMaintenance}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {system.nextMaintenance}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-primary-600 hover:text-primary-900">
                        <Monitor className="w-4 h-4" />
                      </button>
                      <button className="text-primary-600 hover:text-primary-900">
                        <Settings className="w-4 h-4" />
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

export default ITMSP; 