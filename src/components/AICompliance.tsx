import React, { useState } from 'react';
import { 
  Brain, 
  FileText, 
  Upload, 
  Download, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Calendar, 
  User, 
  MessageSquare, 
  BarChart3, 
  PieChart, 
  LineChart, 
  X,
  Plus,
  RefreshCw,
  Play,
  Pause,
  Settings,
  FileCheck,
  FileX,
  Lightbulb,
  Shield,
  Target,
  TrendingUp
} from 'lucide-react';
import {
  BarChart,
  LineChart as RechartsLineChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Pie,
  Cell
} from 'recharts';

interface ChartNote {
  id: string;
  patientName: string;
  provider: string;
  dateOfService: string;
  specialty: string;
  noteLength: number;
  status: string;
  complianceScore: number;
  lcdMatches: string[];
  nonCompliantSections: string[];
  lmnGenerated: boolean;
  lmnContent?: string;
  uploadedDate: string;
  processedDate?: string;
  assignedTo?: string;
  priority: string;
}

interface LCDRule {
  id: string;
  code: string;
  description: string;
  category: string;
  effectiveDate: string;
  status: string;
  matchCount: number;
  complianceRate: number;
}

interface LMNDocument {
  id: string;
  patientName: string;
  provider: string;
  generatedDate: string;
  status: string;
  content: string;
  attachments: string[];
  sentToPayer: boolean;
  responseReceived?: boolean;
  responseDate?: string;
}

const AICompliance: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showChartNoteModal, setShowChartNoteModal] = useState<boolean>(false);
  const [selectedChartNote, setSelectedChartNote] = useState<ChartNote | null>(null);
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [showLMNModal, setShowLMNModal] = useState<boolean>(false);
  const [selectedLMN, setSelectedLMN] = useState<LMNDocument | null>(null);
  const [activeTab, setActiveTab] = useState<'chart-notes' | 'lcd-rules' | 'lmn-documents' | 'analytics'>('chart-notes');

  // Mock data for AI Compliance
  const chartNotes: ChartNote[] = [
    {
      id: 'CN-001',
      patientName: 'John Smith',
      provider: 'Dr. Sarah Johnson',
      dateOfService: '2024-01-15',
      specialty: 'Physical Therapy',
      noteLength: 250,
      status: 'processed',
      complianceScore: 85,
      lcdMatches: ['L38962', 'L38963'],
      nonCompliantSections: ['Missing functional assessment', 'Incomplete progress notes'],
      lmnGenerated: true,
      lmnContent: 'Letter of Medical Necessity generated for continued physical therapy services...',
      uploadedDate: '2024-01-15 09:30',
      processedDate: '2024-01-15 10:15',
      assignedTo: 'AI System',
      priority: 'high'
    },
    {
      id: 'CN-002',
      patientName: 'Mary Wilson',
      provider: 'Dr. Michael Chen',
      dateOfService: '2024-01-14',
      specialty: 'Occupational Therapy',
      noteLength: 180,
      status: 'processing',
      complianceScore: 72,
      lcdMatches: ['L38964'],
      nonCompliantSections: ['Missing treatment goals', 'Insufficient documentation'],
      lmnGenerated: false,
      uploadedDate: '2024-01-14 14:20',
      assignedTo: 'AI System',
      priority: 'medium'
    },
    {
      id: 'CN-003',
      patientName: 'Robert Davis',
      provider: 'Dr. Lisa Brown',
      dateOfService: '2024-01-13',
      specialty: 'Speech Therapy',
      noteLength: 320,
      status: 'pending',
      complianceScore: 0,
      lcdMatches: [],
      nonCompliantSections: [],
      lmnGenerated: false,
      uploadedDate: '2024-01-13 11:45',
      assignedTo: 'AI System',
      priority: 'low'
    }
  ];

  const lcdRules: LCDRule[] = [
    {
      id: 'LCD-001',
      code: 'L38962',
      description: 'Physical Therapy Services - Medical Necessity',
      category: 'Physical Therapy',
      effectiveDate: '2024-01-01',
      status: 'active',
      matchCount: 45,
      complianceRate: 92
    },
    {
      id: 'LCD-002',
      code: 'L38963',
      description: 'Occupational Therapy - Functional Assessment',
      category: 'Occupational Therapy',
      effectiveDate: '2024-01-01',
      status: 'active',
      matchCount: 32,
      complianceRate: 88
    },
    {
      id: 'LCD-003',
      code: 'L38964',
      description: 'Speech Therapy - Communication Disorders',
      category: 'Speech Therapy',
      effectiveDate: '2024-01-01',
      status: 'active',
      matchCount: 28,
      complianceRate: 85
    }
  ];

  const lmnDocuments: LMNDocument[] = [
    {
      id: 'LMN-001',
      patientName: 'John Smith',
      provider: 'Dr. Sarah Johnson',
      generatedDate: '2024-01-15',
      status: 'sent',
      content: 'This letter confirms the medical necessity for continued physical therapy services...',
      attachments: ['functional_assessment.pdf', 'progress_notes.pdf'],
      sentToPayer: true,
      responseReceived: true,
      responseDate: '2024-01-18'
    },
    {
      id: 'LMN-002',
      patientName: 'Mary Wilson',
      provider: 'Dr. Michael Chen',
      generatedDate: '2024-01-14',
      status: 'draft',
      content: 'Letter of Medical Necessity for occupational therapy services...',
      attachments: ['treatment_plan.pdf'],
      sentToPayer: false
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processed':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Processed</span>;
      case 'processing':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Processing</span>;
      case 'pending':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Pending</span>;
      case 'error':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Error</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Unknown</span>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">High</span>;
      case 'medium':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Medium</span>;
      case 'low':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Low</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{priority}</span>;
    }
  };

  const getComplianceScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleChartNoteClick = (chartNote: ChartNote) => {
    setSelectedChartNote(chartNote);
    setShowChartNoteModal(true);
  };

  const handleUpload = () => {
    setShowUploadModal(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setShowUploadModal(false), 1000);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleLMNClick = (lmn: LMNDocument) => {
    setSelectedLMN(lmn);
    setShowLMNModal(true);
  };

  const handleExportReports = () => {
    alert('Exporting AI compliance reports...');
  };

  const handleViewChartNote = (note: ChartNote) => {
    setSelectedChartNote(note);
    setShowChartNoteModal(true);
  };

  const handleGenerateLMN = (note: ChartNote) => {
    alert(`Generating LMN for ${note.patientName}...`);
  };

  const handleDownloadReport = () => {
    alert('Downloading chart note analysis report...');
  };

  const handleGenerateLMNFromModal = () => {
    alert('Generating LMN document...');
  };

  const handleDownloadLMN = () => {
    alert('Downloading LMN document...');
  };

  const handleSendToPayer = () => {
    alert('Sending LMN to payer...');
  };

  const handleViewLCDRule = (rule: LCDRule) => {
    alert(`Viewing LCD rule details for ${rule.code}`);
  };

  const handleEditLCDRule = (rule: LCDRule) => {
    alert(`Opening edit interface for LCD rule ${rule.code}`);
  };

  const handleViewLMNDocument = (lmn: LMNDocument) => {
    alert(`Viewing LMN document for ${lmn.patientName}`);
  };

  const handleEditLMNDocument = (lmn: LMNDocument) => {
    alert(`Opening edit interface for LMN document ${lmn.id}`);
  };

  const filteredChartNotes = chartNotes.filter(note => {
    const matchesSearch = note.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         note.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || note.status === selectedStatus;
    const matchesSpecialty = selectedSpecialty === 'all' || note.specialty === selectedSpecialty;
    const matchesPriority = selectedPriority === 'all' || note.priority === selectedPriority;
    return matchesSearch && matchesStatus && matchesSpecialty && matchesPriority;
  });

  const filteredLCDRules = lcdRules.filter(rule => {
    return rule.code.toLowerCase().includes(searchTerm.toLowerCase()) || 
           rule.description.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredLMNDocuments = lmnDocuments.filter(lmn => {
    return lmn.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
           lmn.provider.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Analytics data
  const complianceData = [
    { month: 'Jan', compliance: 85, processed: 120, errors: 8 },
    { month: 'Feb', compliance: 88, processed: 135, errors: 6 },
    { month: 'Mar', compliance: 92, processed: 142, errors: 4 },
    { month: 'Apr', compliance: 89, processed: 128, errors: 7 },
    { month: 'May', compliance: 91, processed: 156, errors: 3 },
    { month: 'Jun', compliance: 94, processed: 168, errors: 2 }
  ];

  const specialtyData = [
    { name: 'Physical Therapy', value: 45, color: '#3B82F6' },
    { name: 'Occupational Therapy', value: 32, color: '#10B981' },
    { name: 'Speech Therapy', value: 28, color: '#F59E0B' },
    { name: 'Other', value: 15, color: '#EF4444' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI-Driven Compliance & LMN Automation</h1>
          <p className="text-gray-600">Upload chart notes, analyze compliance, and generate LMN documents</p>
        </div>
        <div className="flex space-x-3">
          <button onClick={handleUpload} className="btn-primary">
            <Upload className="w-4 h-4 mr-2" />
            Upload Chart Notes
          </button>
          <button onClick={handleExportReports} className="btn-secondary">
            <Download className="w-4 h-4 mr-2" />
            Export Reports
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="metric-card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Brain className="h-8 w-8 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Processed</p>
              <p className="text-2xl font-semibold text-gray-900">1,247</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Compliance Rate</p>
              <p className="text-2xl font-semibold text-gray-900">89.2%</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">LMN Generated</p>
              <p className="text-2xl font-semibold text-gray-900">342</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending Review</p>
              <p className="text-2xl font-semibold text-gray-900">23</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'chart-notes', name: 'Chart Notes', count: chartNotes.length },
            { id: 'lcd-rules', name: 'LCD Rules', count: lcdRules.length },
            { id: 'lmn-documents', name: 'LMN Documents', count: lmnDocuments.length },
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
        {activeTab === 'chart-notes' && (
          <>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Status</option>
              <option value="processed">Processed</option>
              <option value="processing">Processing</option>
              <option value="pending">Pending</option>
              <option value="error">Error</option>
            </select>
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
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </>
        )}
      </div>

      {/* Content based on active tab */}
      {activeTab === 'chart-notes' && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Chart Notes ({filteredChartNotes.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient/Provider</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialty</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compliance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LMN</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredChartNotes.map((note) => (
                  <tr key={note.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleChartNoteClick(note)}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{note.patientName}</div>
                        <div className="text-sm text-gray-500">{note.provider}</div>
                        <div className="text-xs text-gray-400">{note.dateOfService}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{note.specialty}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(note.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`text-sm font-medium ${getComplianceScoreColor(note.complianceScore)}`}>
                          {note.complianceScore}%
                        </span>
                        <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary-600 h-2 rounded-full" 
                            style={{ width: `${note.complianceScore}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {note.lmnGenerated ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <FileX className="w-5 h-5 text-gray-400" />
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getPriorityBadge(note.priority)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button onClick={() => handleViewChartNote(note)} className="text-primary-600 hover:text-primary-900 mr-3">View</button>
                      <button onClick={() => handleGenerateLMN(note)} className="text-blue-600 hover:text-blue-900">Generate LMN</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'lcd-rules' && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">LCD Rules ({filteredLCDRules.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Matches</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compliance Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLCDRules.map((rule) => (
                  <tr key={rule.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{rule.code}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rule.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rule.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rule.matchCount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900">{rule.complianceRate}%</span>
                        <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${rule.complianceRate}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button onClick={() => handleViewLCDRule(rule)} className="text-primary-600 hover:text-primary-900 mr-3">View</button>
                      <button onClick={() => handleEditLCDRule(rule)} className="text-blue-600 hover:text-blue-900">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'lmn-documents' && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">LMN Documents ({filteredLMNDocuments.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient/Provider</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generated Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sent to Payer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Response</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLMNDocuments.map((lmn) => (
                  <tr key={lmn.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleLMNClick(lmn)}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{lmn.patientName}</div>
                        <div className="text-sm text-gray-500">{lmn.provider}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lmn.generatedDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(lmn.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {lmn.sentToPayer ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <Clock className="w-5 h-5 text-gray-400" />
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {lmn.responseReceived ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Received
                        </span>
                      ) : lmn.sentToPayer ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Not Sent
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button onClick={() => handleViewLMNDocument(lmn)} className="text-primary-600 hover:text-primary-900 mr-3">View</button>
                      <button onClick={() => handleEditLMNDocument(lmn)} className="text-blue-600 hover:text-blue-900">Edit</button>
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
              <h3 className="text-lg font-medium text-gray-900 mb-4">Compliance Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsLineChart data={complianceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="compliance" stroke="#3B82F6" strokeWidth={2} />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Specialty Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={specialtyData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {specialtyData.map((entry, index) => (
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

      {/* Chart Note Detail Modal */}
      {showChartNoteModal && selectedChartNote && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-4/5 max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Chart Note Analysis</h3>
                <button onClick={() => setShowChartNoteModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Note Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Patient</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedChartNote.patientName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Provider</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedChartNote.provider}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Specialty</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedChartNote.specialty}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Note Length</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedChartNote.noteLength} words</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Compliance Score</label>
                      <div className="mt-1 flex items-center">
                        <span className={`text-lg font-bold ${getComplianceScoreColor(selectedChartNote.complianceScore)}`}>
                          {selectedChartNote.complianceScore}%
                        </span>
                        <div className="ml-3 w-32 bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-primary-600 h-3 rounded-full" 
                            style={{ width: `${selectedChartNote.complianceScore}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Analysis Results</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">LCD Matches</label>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {selectedChartNote.lcdMatches.map((match) => (
                          <span key={match} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {match}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Non-Compliant Sections</label>
                      <div className="mt-1 space-y-1">
                        {selectedChartNote.nonCompliantSections.map((section, index) => (
                          <div key={index} className="flex items-center text-sm text-red-600">
                            <AlertTriangle className="w-4 h-4 mr-2" />
                            {section}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">LMN Status</label>
                      <p className="mt-1 text-sm text-gray-900">
                        {selectedChartNote.lmnGenerated ? 'Generated' : 'Not Generated'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button onClick={handleDownloadReport} className="btn-secondary">Download Report</button>
                <button onClick={handleGenerateLMNFromModal} className="btn-primary">Generate LMN</button>
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
                <h3 className="text-lg font-medium text-gray-900">Upload Chart Notes</h3>
                <button onClick={() => setShowUploadModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">Drop chart notes here or click to browse</p>
                  <p className="text-xs text-gray-500">Supports PDF, DOC, DOCX up to 400 pages</p>
                </div>
                {uploadProgress > 0 && (
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Uploading...</span>
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

      {/* LMN Detail Modal */}
      {showLMNModal && selectedLMN && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-4/5 max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">LMN Document</h3>
                <button onClick={() => setShowLMNModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Patient</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedLMN.patientName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Provider</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedLMN.provider}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Generated Date</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedLMN.generatedDate}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <p className="mt-1">{getStatusBadge(selectedLMN.status)}</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Content</label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-md text-sm text-gray-900 max-h-40 overflow-y-auto">
                    {selectedLMN.content}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Attachments</label>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {selectedLMN.attachments.map((attachment) => (
                      <span key={attachment} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {attachment}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button onClick={handleDownloadLMN} className="btn-secondary">Download</button>
                <button onClick={handleSendToPayer} className="btn-primary">Send to Payer</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AICompliance; 