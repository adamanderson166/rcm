import React, { useState } from 'react';
import { 
  Heart, 
  Users, 
  Calendar,
  Phone,
  MessageSquare,
  FileText,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Clock
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

const CCM: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const ccmData = [
    {
      patient: 'Sarah Johnson',
      conditions: ['Diabetes', 'Hypertension'],
      lastContact: '2024-01-15',
      nextContact: '2024-01-22',
      status: 'active',
      carePlan: 'Comprehensive Diabetes Management',
      interactions: 12,
      adherence: 85
    },
    {
      patient: 'Michael Chen',
      conditions: ['Heart Disease', 'COPD'],
      lastContact: '2024-01-14',
      nextContact: '2024-01-21',
      status: 'active',
      carePlan: 'Cardiac Rehabilitation',
      interactions: 8,
      adherence: 92
    },
    {
      patient: 'Lisa Rodriguez',
      conditions: ['Diabetes', 'Obesity'],
      lastContact: '2024-01-13',
      nextContact: '2024-01-20',
      status: 'pending',
      carePlan: 'Weight Management Program',
      interactions: 6,
      adherence: 78
    },
    {
      patient: 'Robert Wilson',
      conditions: ['Hypertension', 'Kidney Disease'],
      lastContact: '2024-01-12',
      nextContact: '2024-01-19',
      status: 'active',
      carePlan: 'Renal Care Management',
      interactions: 15,
      adherence: 88
    }
  ];

  const adherenceData = [
    { month: 'Jan', diabetes: 85, hypertension: 88, heartDisease: 92, copd: 79 },
    { month: 'Feb', diabetes: 87, hypertension: 90, heartDisease: 94, copd: 82 },
    { month: 'Mar', diabetes: 89, hypertension: 92, heartDisease: 95, copd: 85 },
    { month: 'Apr', diabetes: 91, hypertension: 93, heartDisease: 96, copd: 87 },
    { month: 'May', diabetes: 93, hypertension: 94, heartDisease: 97, copd: 89 },
    { month: 'Jun', diabetes: 95, hypertension: 95, heartDisease: 98, copd: 91 },
  ];

  const conditionDistribution = [
    { name: 'Diabetes', value: 35, color: '#3B82F6' },
    { name: 'Hypertension', value: 28, color: '#10B981' },
    { name: 'Heart Disease', value: 20, color: '#F59E0B' },
    { name: 'COPD', value: 12, color: '#EF4444' },
    { name: 'Other', value: 5, color: '#8B5CF6' },
  ];

  const interactionTypes = [
    { type: 'Phone Calls', count: 45, percentage: 40 },
    { type: 'Text Messages', count: 35, percentage: 31 },
    { type: 'Video Visits', count: 20, percentage: 18 },
    { type: 'In-Person', count: 12, percentage: 11 },
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

  const filteredData = selectedFilter === 'all' 
    ? ccmData 
    : ccmData.filter(patient => patient.status === selectedFilter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Chronic Care Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Coordinated care for patients with chronic conditions
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-primary flex items-center">
            <Users className="w-4 h-4 mr-2" />
            Add Patient
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
        <div className="metric-card">
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-red-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Patients</p>
              <p className="text-2xl font-semibold text-gray-900">156</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-primary-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">This Week's Contacts</p>
              <p className="text-2xl font-semibold text-gray-900">42</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-success-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Avg. Adherence</p>
              <p className="text-2xl font-semibold text-gray-900">87%</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <MessageSquare className="h-8 w-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Monthly Interactions</p>
              <p className="text-2xl font-semibold text-gray-900">1,240</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedFilter === 'all'
                ? 'bg-primary-100 text-primary-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Patients
          </button>
          <button
            onClick={() => setSelectedFilter('active')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedFilter === 'active'
                ? 'bg-success-100 text-success-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setSelectedFilter('pending')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedFilter === 'pending'
                ? 'bg-warning-100 text-warning-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Pending
          </button>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Adherence Trends */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Adherence Trends by Condition</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={adherenceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="diabetes" stroke="#3B82F6" name="Diabetes" />
              <Line type="monotone" dataKey="hypertension" stroke="#10B981" name="Hypertension" />
              <Line type="monotone" dataKey="heartDisease" stroke="#F59E0B" name="Heart Disease" />
              <Line type="monotone" dataKey="copd" stroke="#EF4444" name="COPD" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Condition Distribution */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Condition Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={conditionDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {conditionDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Interaction Types */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Interaction Types</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={interactionTypes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8B5CF6" name="Count" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-primary-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">Schedule Follow-up Calls</span>
              </div>
              <span className="text-sm text-gray-500">12 pending</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center">
                <MessageSquare className="w-5 h-5 text-success-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">Send Medication Reminders</span>
              </div>
              <span className="text-sm text-gray-500">28 patients</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-warning-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">Update Care Plans</span>
              </div>
              <span className="text-sm text-gray-500">5 due today</span>
            </button>
          </div>
        </div>
      </div>

      {/* Patients Table */}
      <div className="card">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Patient Care Management</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conditions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Care Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Next Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Adherence
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
              {filteredData.map((patient, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {patient.patient}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex flex-wrap gap-1">
                      {patient.conditions.map((condition, i) => (
                        <span key={i} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {condition}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {patient.carePlan}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {patient.lastContact}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {patient.nextContact}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-success-600 h-2 rounded-full" 
                          style={{ width: `${patient.adherence}%` }}
                        ></div>
                      </div>
                      <span>{patient.adherence}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(patient.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-primary-600 hover:text-primary-900">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="text-primary-600 hover:text-primary-900">
                        <MessageSquare className="w-4 h-4" />
                      </button>
                      <button className="text-primary-600 hover:text-primary-900">
                        <FileText className="w-4 h-4" />
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

export default CCM; 