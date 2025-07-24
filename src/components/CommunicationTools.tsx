import React, { useState } from 'react';
import { 
  Send,
  Archive,
  Users,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Edit,
  X,
  Plus,
  Download,
  Search
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

interface Message {
  id: string;
  subject: string;
  sender: string;
  recipient: string;
  priority: string;
  status: string;
  category: string;
  createdAt: string;
  lastActivity: string;
  responseTime: string;
  content?: string;
  attachments?: string[];
  replies?: Message[];
}

const CommunicationTools: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showMessageModal, setShowMessageModal] = useState<boolean>(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showComposeModal, setShowComposeModal] = useState<boolean>(false);
  const [showReplyModal, setShowReplyModal] = useState<boolean>(false);
  const [composeData, setComposeData] = useState({
    subject: '',
    recipient: '',
    category: '',
    priority: 'medium',
    content: ''
  });

  // Mock data for communication tools
  const communicationData: Message[] = [
    {
      id: 'MSG-001',
      subject: 'Denial Appeal Request',
      sender: 'Dr. Sarah Johnson',
      recipient: 'RCM Team',
      priority: 'high',
      status: 'open',
      category: 'Denial Management',
      createdAt: '2024-01-15 09:30',
      lastActivity: '2024-01-15 14:20',
      responseTime: '4h 50m',
      content: 'Need assistance with denial appeal for claim CLM-2024-001234. Patient has been waiting for 30 days.',
      attachments: ['appeal_document.pdf', 'medical_records.pdf']
    },
    {
      id: 'MSG-002',
      subject: 'Authorization Update Needed',
      sender: 'Dr. Michael Chen',
      recipient: 'Credentialing Team',
      priority: 'medium',
      status: 'in_progress',
      category: 'Credentialing',
      createdAt: '2024-01-14 11:15',
      lastActivity: '2024-01-15 10:30',
      responseTime: '23h 15m',
      content: 'Please update authorization for Blue Cross Blue Shield. New contract terms need to be reviewed.',
      attachments: ['contract_terms.pdf']
    },
    {
      id: 'MSG-003',
      subject: 'Payment Processing Issue',
      sender: 'Dr. Lisa Rodriguez',
      recipient: 'Billing Team',
      priority: 'high',
      status: 'resolved',
      category: 'Billing',
      createdAt: '2024-01-13 16:45',
      lastActivity: '2024-01-14 09:15',
      responseTime: '16h 30m',
      content: 'Payment processing error for claim CLM-2024-001236. System shows duplicate payment.',
      replies: [
        {
          id: 'REPLY-001',
          subject: 'Re: Payment Processing Issue',
          sender: 'Billing Team',
          recipient: 'Dr. Lisa Rodriguez',
          priority: 'high',
          status: 'resolved',
          category: 'Billing',
          createdAt: '2024-01-14 09:15',
          lastActivity: '2024-01-14 09:15',
          responseTime: '16h 30m',
          content: 'Issue resolved. Duplicate payment has been reversed and correct payment processed.'
        }
      ]
    },
    {
      id: 'MSG-004',
      subject: 'New Provider Onboarding',
      sender: 'Dr. Robert Wilson',
      recipient: 'Onboarding Team',
      priority: 'medium',
      status: 'open',
      category: 'Onboarding',
      createdAt: '2024-01-15 08:00',
      lastActivity: '2024-01-15 08:00',
      responseTime: '8h 30m',
      content: 'New provider Dr. Emily Davis needs to be onboarded. Specializes in cardiology.',
      attachments: ['provider_application.pdf', 'credentials.pdf']
    }
  ];

  const communicationTrends = [
    { day: 'Mon', messages: 45, resolved: 38, avgResponseTime: 2.5 },
    { day: 'Tue', messages: 52, resolved: 45, avgResponseTime: 2.8 },
    { day: 'Wed', messages: 48, resolved: 42, avgResponseTime: 2.3 },
    { day: 'Thu', messages: 55, resolved: 48, avgResponseTime: 2.1 },
    { day: 'Fri', messages: 41, resolved: 35, avgResponseTime: 2.7 },
  ];

  const categoryDistribution = [
    { category: 'Denial Management', count: 35, percentage: 30 },
    { category: 'Credentialing', count: 25, percentage: 22 },
    { category: 'Billing', count: 20, percentage: 17 },
    { category: 'Onboarding', count: 15, percentage: 13 },
    { category: 'Technical Support', count: 12, percentage: 10 },
    { category: 'Other', count: 8, percentage: 8 },
  ];

  const teamPerformance = [
    { team: 'RCM Team', avgResponseTime: 2.1, satisfaction: 4.8, ticketsResolved: 125 },
    { team: 'Credentialing Team', avgResponseTime: 3.2, satisfaction: 4.6, ticketsResolved: 85 },
    { team: 'Billing Team', avgResponseTime: 1.8, satisfaction: 4.9, ticketsResolved: 95 },
    { team: 'Onboarding Team', avgResponseTime: 4.5, satisfaction: 4.7, ticketsResolved: 45 },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      open: { class: 'status-pending', icon: Clock, text: 'Open' },
      in_progress: { class: 'status-pending', icon: Clock, text: 'In Progress' },
      resolved: { class: 'status-approved', icon: CheckCircle, text: 'Resolved' },
      closed: { class: 'status-denied', icon: AlertTriangle, text: 'Closed' }
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

  const filteredData = communicationData.filter(message => {
    const matchesStatus = selectedStatus === 'all' || message.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || message.priority === selectedPriority;
    const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.recipient.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });

  const handleSendMessage = () => {
    console.log('Sending message:', composeData);
    alert('Message sent successfully!');
    setShowComposeModal(false);
    setComposeData({
      subject: '',
      recipient: '',
      category: '',
      priority: 'medium',
      content: ''
    });
  };

  const handleReply = (message: Message) => {
    alert(`Opening reply interface for message: ${message.subject}`);
  };

  const handleArchive = () => {
    alert('Archiving selected messages...');
  };

  const handleForward = (message: Message) => {
    alert(`Forwarding message: ${message.subject}`);
  };

  const handleMessageClick = (message: Message) => {
    setSelectedMessage(message);
    setShowMessageModal(true);
  };

  const handleTeamPerformance = () => {
    alert('Opening team performance analytics...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Communication Tools</h1>
          <p className="mt-1 text-sm text-gray-500">
            Internal communication and ticketing system for efficient team collaboration
          </p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowComposeModal(true)}
            className="btn-secondary flex items-center"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Inbox
          </button>
          <button 
            onClick={() => setShowComposeModal(true)}
            className="btn-primary flex items-center"
          >
            <Send className="w-4 h-4 mr-2" />
            New Message
          </button>
        </div>
      </div>

      {/* Communication Metrics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
        <div className="metric-card">
          <div className="flex items-center">
            <MessageSquare className="h-8 w-8 text-primary-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Messages</p>
              <p className="text-2xl font-semibold text-gray-900">241</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-success-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Resolved</p>
              <p className="text-2xl font-semibold text-gray-900">208</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-warning-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Avg Response Time</p>
              <p className="text-2xl font-semibold text-gray-900">2.4h</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Satisfaction</p>
              <p className="text-2xl font-semibold text-gray-900">4.8/5</p>
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
                placeholder="Search messages, senders, or recipients..."
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
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
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
        {/* Communication Trends */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Daily Communication Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={communicationTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Line yAxisId="left" type="monotone" dataKey="messages" stroke="#3B82F6" name="Messages" />
              <Line yAxisId="right" type="monotone" dataKey="avgResponseTime" stroke="#10B981" name="Avg Response Time (h)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Message Categories</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, percentage }) => `${category}: ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {categoryDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#6B7280'][index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Team Performance */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Team Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={teamPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="team" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="satisfaction" fill="#10B981" name="Satisfaction Score" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-4">
            <button 
              onClick={() => setShowComposeModal(true)}
              className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center">
                <Send className="w-5 h-5 text-primary-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">Send New Message</span>
              </div>
              <span className="text-sm text-gray-500">Quick compose</span>
            </button>
            <button 
              onClick={handleArchive}
              className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center">
                <Archive className="w-5 h-5 text-success-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">Archive Messages</span>
              </div>
              <span className="text-sm text-gray-500">Clean up inbox</span>
            </button>
            <button 
              onClick={handleTeamPerformance}
              className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center">
                <Users className="w-5 h-5 text-warning-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">Team Performance</span>
              </div>
              <span className="text-sm text-gray-500">View analytics</span>
            </button>
          </div>
        </div>
      </div>

      {/* Messages Table */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Recent Communications</h3>
          <div className="flex space-x-2">
            <button 
              onClick={handleArchive}
              className="btn-secondary flex items-center"
            >
              <Archive className="w-4 h-4 mr-2" />
              Archive
            </button>
            <button 
              onClick={() => setShowComposeModal(true)}
              className="btn-primary flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Message
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sender
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recipient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Response Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((message) => (
                <tr key={message.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {message.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <button 
                      onClick={() => handleMessageClick(message)}
                      className="text-left hover:text-primary-600"
                    >
                      {message.subject}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {message.sender}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {message.recipient}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {message.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getPriorityBadge(message.priority)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(message.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {message.responseTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {message.lastActivity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleMessageClick(message)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleReply(message)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleForward(message)}
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

      {/* Message Detail Modal */}
      {showMessageModal && selectedMessage && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Message Details</h3>
              <button 
                onClick={() => setShowMessageModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Subject</label>
                  <p className="text-sm text-gray-900">{selectedMessage.subject}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <p className="text-sm text-gray-900">{selectedMessage.category}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Sender</label>
                  <p className="text-sm text-gray-900">{selectedMessage.sender}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Recipient</label>
                  <p className="text-sm text-gray-900">{selectedMessage.recipient}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <div className="mt-1">{getStatusBadge(selectedMessage.status)}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Priority</label>
                  <div className="mt-1">{getPriorityBadge(selectedMessage.priority)}</div>
                </div>
              </div>
              {selectedMessage.content && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Message Content</label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-900">{selectedMessage.content}</p>
                  </div>
                </div>
              )}
              {selectedMessage.attachments && selectedMessage.attachments.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Attachments</label>
                  <div className="mt-1 space-y-1">
                    {selectedMessage.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center text-sm text-primary-600">
                        <Download className="w-4 h-4 mr-2" />
                        {attachment}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {selectedMessage.replies && selectedMessage.replies.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Replies</label>
                  <div className="mt-2 space-y-2">
                    {selectedMessage.replies.map((reply) => (
                      <div key={reply.id} className="p-3 bg-gray-50 rounded-md">
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-sm font-medium text-gray-900">{reply.sender}</p>
                          <p className="text-xs text-gray-500">{reply.createdAt}</p>
                        </div>
                        <p className="text-sm text-gray-700">{reply.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary-600">{selectedMessage.responseTime}</p>
                  <p className="text-sm text-gray-500">Response Time</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-success-600">{selectedMessage.createdAt}</p>
                  <p className="text-sm text-gray-500">Created</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-warning-600">{selectedMessage.lastActivity}</p>
                  <p className="text-sm text-gray-500">Last Activity</p>
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => setShowMessageModal(false)}
                  className="btn-secondary"
                >
                  Close
                </button>
                <button 
                  onClick={() => handleReply(selectedMessage)}
                  className="btn-primary"
                >
                  Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Compose Message Modal */}
      {showComposeModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Compose Message</h3>
              <button 
                onClick={() => setShowComposeModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    value={composeData.subject}
                    onChange={(e) => setComposeData({...composeData, subject: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="Enter subject..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recipient</label>
                  <select
                    value={composeData.recipient}
                    onChange={(e) => setComposeData({...composeData, recipient: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="">Select recipient...</option>
                    <option value="RCM Team">RCM Team</option>
                    <option value="Credentialing Team">Credentialing Team</option>
                    <option value="Billing Team">Billing Team</option>
                    <option value="Onboarding Team">Onboarding Team</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={composeData.category}
                    onChange={(e) => setComposeData({...composeData, category: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="">Select category...</option>
                    <option value="Denial Management">Denial Management</option>
                    <option value="Credentialing">Credentialing</option>
                    <option value="Billing">Billing</option>
                    <option value="Onboarding">Onboarding</option>
                    <option value="Technical Support">Technical Support</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={composeData.priority}
                    onChange={(e) => setComposeData({...composeData, priority: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message Content</label>
                <textarea
                  value={composeData.content}
                  onChange={(e) => setComposeData({...composeData, content: e.target.value})}
                  rows={6}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Enter your message..."
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => setShowComposeModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSendMessage}
                  className="btn-primary flex items-center"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reply Modal */}
      {showReplyModal && selectedMessage && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Reply to Message</h3>
              <button 
                onClick={() => setShowReplyModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-sm font-medium text-gray-900">Re: {selectedMessage.subject}</p>
                <p className="text-sm text-gray-600 mt-1">From: {selectedMessage.sender}</p>
                <p className="text-sm text-gray-600">To: {selectedMessage.recipient}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Reply</label>
                <textarea
                  rows={6}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Enter your reply..."
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => setShowReplyModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    alert('Reply sent successfully!');
                    setShowReplyModal(false);
                  }}
                  className="btn-primary flex items-center"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunicationTools; 