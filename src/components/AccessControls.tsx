import React, { useState } from 'react';
import { 
  Search,
  X,
  Plus,
  Download,
  MessageSquare
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  agency: string;
  status: string;
  lastLogin: string;
  permissions: string[];
  features: string[];
  createdAt: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  features: string[];
  userCount: number;
}

interface Feature {
  id: string;
  name: string;
  description: string;
  category: string;
  enabled: boolean;
  visibleTo: string[];
}

interface EducationalContent {
  id: string;
  title: string;
  type: string;
  category: string;
  publishDate: string;
  author: string;
  status: string;
  views: number;
}

const AccessControls: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedAgency, setSelectedAgency] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showUserModal, setShowUserModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showRoleModal, setShowRoleModal] = useState<boolean>(false);
  const [selectedRoleData, setSelectedRoleData] = useState<Role | null>(null);
  const [showFeatureModal, setShowFeatureModal] = useState<boolean>(false);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [activeTab, setActiveTab] = useState<'users' | 'roles' | 'features' | 'education' | 'community'>('users');

  // Mock data for Access Controls
  const users: User[] = [
    {
      id: 'USR-001',
      name: 'John Smith',
      email: 'john.smith@fusion.com',
      role: 'Admin',
      agency: 'Alpha Medical Billing',
      status: 'active',
      lastLogin: '2024-01-15 14:30',
      permissions: ['view_all', 'edit_users', 'manage_roles', 'export_data'],
      features: ['dashboard', 'reporting', 'denial_management', 'credentialing'],
      createdAt: '2023-06-15'
    },
    {
      id: 'USR-002',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@fusion.com',
      role: 'Clinic Manager',
      agency: 'Beta Healthcare Solutions',
      status: 'active',
      lastLogin: '2024-01-15 12:15',
      permissions: ['view_agency', 'edit_claims', 'view_reports'],
      features: ['dashboard', 'reporting', 'denial_management'],
      createdAt: '2023-08-20'
    },
    {
      id: 'USR-003',
      name: 'Mike Wilson',
      email: 'mike.wilson@fusion.com',
      role: 'Internal Staff',
      agency: 'Gamma Medical Group',
      status: 'active',
      lastLogin: '2024-01-15 09:45',
      permissions: ['view_claims', 'edit_denials', 'view_analytics'],
      features: ['dashboard', 'denial_management', 'analytics'],
      createdAt: '2023-09-10'
    }
  ];

  const roles: Role[] = [
    {
      id: 'ROLE-001',
      name: 'Admin',
      description: 'Full system access with user management capabilities',
      permissions: ['view_all', 'edit_users', 'manage_roles', 'export_data', 'system_settings'],
      features: ['dashboard', 'reporting', 'denial_management', 'credentialing', 'analytics', 'data_integration'],
      userCount: 5
    },
    {
      id: 'ROLE-002',
      name: 'Clinic Manager',
      description: 'Agency-level access with reporting and claim management',
      permissions: ['view_agency', 'edit_claims', 'view_reports', 'manage_agency_users'],
      features: ['dashboard', 'reporting', 'denial_management', 'communication'],
      userCount: 12
    },
    {
      id: 'ROLE-003',
      name: 'Internal Staff',
      description: 'Limited access for internal operations',
      permissions: ['view_claims', 'edit_denials', 'view_analytics'],
      features: ['dashboard', 'denial_management', 'analytics'],
      userCount: 8
    }
  ];

  const features: Feature[] = [
    {
      id: 'FEAT-001',
      name: 'Dashboard',
      description: 'Main dashboard with key metrics and overview',
      category: 'Core',
      enabled: true,
      visibleTo: ['Admin', 'Clinic Manager', 'Internal Staff']
    },
    {
      id: 'FEAT-002',
      name: 'Reporting',
      description: 'Enterprise and customer reporting capabilities',
      category: 'Analytics',
      enabled: true,
      visibleTo: ['Admin', 'Clinic Manager']
    },
    {
      id: 'FEAT-003',
      name: 'Denial Management',
      description: 'Comprehensive denial tracking and management',
      category: 'Operations',
      enabled: true,
      visibleTo: ['Admin', 'Clinic Manager', 'Internal Staff']
    },
    {
      id: 'FEAT-004',
      name: 'Credentialing CRM',
      description: 'Provider credentialing and contract management',
      category: 'Operations',
      enabled: true,
      visibleTo: ['Admin', 'Clinic Manager']
    },
    {
      id: 'FEAT-005',
      name: 'AI Compliance',
      description: 'AI-driven compliance checking and LMN automation',
      category: 'Advanced',
      enabled: true,
      visibleTo: ['Admin']
    }
  ];

  const educationalContent: EducationalContent[] = [
    {
      id: 'EDU-001',
      title: 'Getting Started with Fusion RCM',
      type: 'Video',
      category: 'Training',
      publishDate: '2024-01-10',
      author: 'Training Team',
      status: 'published',
      views: 156
    },
    {
      id: 'EDU-002',
      title: 'Denial Management Best Practices',
      type: 'Guide',
      category: 'Operations',
      publishDate: '2024-01-08',
      author: 'Operations Team',
      status: 'published',
      views: 89
    },
    {
      id: 'EDU-003',
      title: 'New AI Compliance Features',
      type: 'Release Notes',
      category: 'Updates',
      publishDate: '2024-01-05',
      author: 'Product Team',
      status: 'published',
      views: 234
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span>;
      case 'inactive':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Inactive</span>;
      case 'suspended':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Suspended</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Unknown</span>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'Admin':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">Admin</span>;
      case 'Clinic Manager':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Clinic Manager</span>;
      case 'Internal Staff':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Internal Staff</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{role}</span>;
    }
  };

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleRoleClick = (role: Role) => {
    setSelectedRoleData(role);
    setShowRoleModal(true);
  };

  const handleFeatureClick = (feature: Feature) => {
    setSelectedFeature(feature);
    setShowFeatureModal(true);
  };

  const handleAddUser = () => {
    alert('Opening add user interface...');
  };

  const handleExport = () => {
    alert('Exporting user access data...');
  };

  const handleEditUser = (user: User) => {
    alert(`Opening edit interface for ${user.name}`);
  };

  const handleDeleteUser = (user: User) => {
    alert(`Deleting user ${user.name}`);
  };

  const handleEditRole = (role: Role) => {
    alert(`Opening edit interface for role ${role.name}`);
  };

  const handleDeleteRole = (role: Role) => {
    alert(`Deleting role ${role.name}`);
  };

  const handleEditFeature = (feature: Feature) => {
    alert(`Opening edit interface for feature ${feature.name}`);
  };

  const handleToggleFeature = (feature: Feature) => {
    alert(`Toggling feature ${feature.name}`);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesAgency = selectedAgency === 'all' || user.agency === selectedAgency;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesAgency && matchesStatus;
  });

  const filteredRoles = roles.filter(role => {
    return role.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredFeatures = features.filter(feature => {
    return feature.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           feature.description.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredContent = educationalContent.filter(content => {
    return content.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
           content.category.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User & Role-Based Access Controls</h1>
          <p className="text-gray-600">Manage users, roles, permissions, and feature visibility</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-primary" onClick={handleAddUser}>
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </button>
          <button className="btn-secondary" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'users', name: 'Users', count: users.length },
            { id: 'roles', name: 'Roles', count: roles.length },
            { id: 'features', name: 'Features', count: features.length },
            { id: 'education', name: 'Education Portal', count: educationalContent.length },
            { id: 'community', name: 'Community', count: 0 }
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

      {/* Search and Filters */}
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
        {activeTab === 'users' && (
          <>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Clinic Manager">Clinic Manager</option>
              <option value="Internal Staff">Internal Staff</option>
            </select>
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
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </>
        )}
      </div>

      {/* Content based on active tab */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Users ({filteredUsers.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agency</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleUserClick(user)}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.agency}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(user.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastLogin}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-primary-600 hover:text-primary-900 mr-3" onClick={(e) => { e.stopPropagation(); handleEditUser(user); }}>Edit</button>
                      <button className="text-red-600 hover:text-red-900" onClick={(e) => { e.stopPropagation(); handleDeleteUser(user); }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'roles' && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Roles ({filteredRoles.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Users</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRoles.map((role) => (
                  <tr key={role.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleRoleClick(role)}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{role.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{role.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{role.userCount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{role.permissions.length} permissions</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-primary-600 hover:text-primary-900 mr-3" onClick={(e) => { e.stopPropagation(); handleEditRole(role); }}>Edit</button>
                      <button className="text-red-600 hover:text-red-900" onClick={(e) => { e.stopPropagation(); handleDeleteRole(role); }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'features' && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Features ({filteredFeatures.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visible To</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredFeatures.map((feature) => (
                  <tr key={feature.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleFeatureClick(feature)}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{feature.name}</div>
                        <div className="text-sm text-gray-500">{feature.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{feature.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {feature.enabled ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Enabled
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Disabled
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{feature.visibleTo.join(', ')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-primary-600 hover:text-primary-900 mr-3" onClick={(e) => { e.stopPropagation(); handleEditFeature(feature); }}>Edit</button>
                      <button className="text-red-600 hover:text-red-900" onClick={(e) => { e.stopPropagation(); handleToggleFeature(feature); }}>Toggle</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'education' && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Educational Portal ({filteredContent.length})</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {filteredContent.map((content) => (
              <div key={content.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {content.type}
                  </span>
                  <span className="text-xs text-gray-500">{content.views} views</span>
                </div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">{content.title}</h4>
                <p className="text-xs text-gray-500 mb-2">{content.category}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{content.author}</span>
                  <span>{content.publishDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'community' && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Internal Community</h3>
          </div>
          <div className="p-6">
            <div className="text-center py-12">
              <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Community Features</h3>
              <p className="mt-1 text-sm text-gray-500">
                Internal communication, updates, and community features coming soon.
              </p>
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
                <h3 className="text-lg font-medium text-gray-900">User Details</h3>
                <button onClick={() => setShowUserModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedUser.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedUser.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <p className="mt-1">{getRoleBadge(selectedUser.role)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Agency</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedUser.agency}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Permissions</label>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {selectedUser.permissions.map((permission) => (
                      <span key={permission} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Features</label>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {selectedUser.features.map((feature) => (
                      <span key={feature} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Role Detail Modal */}
      {showRoleModal && selectedRoleData && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Role Details</h3>
                <button onClick={() => setShowRoleModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Role Name</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedRoleData.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedRoleData.description}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Users</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedRoleData.userCount} users</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Permissions</label>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {selectedRoleData.permissions.map((permission) => (
                      <span key={permission} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Features</label>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {selectedRoleData.features.map((feature) => (
                      <span key={feature} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feature Detail Modal */}
      {showFeatureModal && selectedFeature && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Feature Details</h3>
                <button onClick={() => setShowFeatureModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Feature Name</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedFeature.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedFeature.description}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedFeature.category}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <p className="mt-1">
                    {selectedFeature.enabled ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Enabled
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Disabled
                      </span>
                    )}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Visible To</label>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {selectedFeature.visibleTo.map((role) => (
                      <span key={role} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessControls; 