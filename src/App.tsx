import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  FileText,
  Settings,
  Search,
  Bell,
  User,
  Menu,
  X,
  Home,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Calendar,
  Filter,
  Download,
  Upload,
  Plus,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  ChevronDown,
  ChevronRight,
  Star,
  Heart,
  Share2,
  Bookmark,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Globe,
  Database,
  HardDrive,
  Zap,
  Shield,
  Target,
  Lightbulb,
  RefreshCw,
  Play,
  Pause,
  Settings as SettingsIcon,
  FileCheck
} from 'lucide-react';

import SplashPage from './components/SplashPage';
import Dashboard from './components/Dashboard';
import DenialManagement from './components/DenialManagement';
import PayerAnalytics from './components/PayerAnalytics';
import AIInsights from './components/AIInsights';
import CCM from './components/CCM';
import CashPay from './components/CashPay';
import Factoring from './components/Factoring';
import Credentialing from './components/Credentialing';
import ITMSP from './components/ITMSP';
import EnterpriseReporting from './components/EnterpriseReporting';
import CustomerReporting from './components/CustomerReporting';
import CartCodeManagement from './components/CartCodeManagement';
import CommunicationTools from './components/CommunicationTools';
import ARDashboard from './components/ARDashboard';
import CredentialingCRM from './components/CredentialingCRM';
import AccessControls from './components/AccessControls';
import AICompliance from './components/AICompliance';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import DataIntegration from './components/DataIntegration';

type TabType =
  | 'dashboard'
  | 'denial-management'
  | 'payer-analytics'
  | 'ai-insights'
  | 'ccm'
  | 'cash-pay'
  | 'factoring'
  | 'credentialing'
  | 'it-msp'
  | 'enterprise-reporting'
  | 'customer-reporting'
  | 'cart-code-management'
  | 'communication-tools'
  | 'ar-dashboard'
  | 'credentialing-crm'
  | 'access-controls'
  | 'ai-compliance'
  | 'analytics-dashboard'
  | 'data-integration';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: 'dashboard', icon: Home, current: activeTab === 'dashboard' },
    { name: 'AR & Denial Management', href: 'ar-dashboard', icon: DollarSign, current: activeTab === 'ar-dashboard' },
    { name: 'Enterprise Reporting', href: 'enterprise-reporting', icon: BarChart3, current: activeTab === 'enterprise-reporting' },
    { name: 'Customer Reporting', href: 'customer-reporting', icon: Users, current: activeTab === 'customer-reporting' },
    { name: '835s/CART Code Management', href: 'cart-code-management', icon: FileText, current: activeTab === 'cart-code-management' },
    { name: 'Credentialing CRM', href: 'credentialing-crm', icon: Users, current: activeTab === 'credentialing-crm' },
    { name: 'AI Compliance & LMN', href: 'ai-compliance', icon: Shield, current: activeTab === 'ai-compliance' },
    { name: 'Communication Tools', href: 'communication-tools', icon: MessageSquare, current: activeTab === 'communication-tools' },
    { name: 'Data Integration', href: 'data-integration', icon: Database, current: activeTab === 'data-integration' },
    { name: 'Access Controls', href: 'access-controls', icon: Settings, current: activeTab === 'access-controls' },
    { name: 'Analytics Dashboard', href: 'analytics-dashboard', icon: TrendingUp, current: activeTab === 'analytics-dashboard' },
    { name: 'Denial Management', href: 'denial-management', icon: AlertTriangle, current: activeTab === 'denial-management' },
    { name: 'Payer Analytics', href: 'payer-analytics', icon: BarChart3, current: activeTab === 'payer-analytics' },
    { name: 'AI Insights', href: 'ai-insights', icon: Lightbulb, current: activeTab === 'ai-insights' },
    { name: 'Chronic Care Management', href: 'ccm', icon: Heart, current: activeTab === 'ccm' },
    { name: 'Cash Pay Solutions', href: 'cash-pay', icon: DollarSign, current: activeTab === 'cash-pay' },
    { name: 'Factoring Services', href: 'factoring', icon: TrendingUp, current: activeTab === 'factoring' },
    { name: 'Credentialing Services', href: 'credentialing', icon: FileCheck, current: activeTab === 'credentialing' },
    { name: 'IT MSP Support', href: 'it-msp', icon: Settings, current: activeTab === 'it-msp' },
  ];

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'ar-dashboard':
        return <ARDashboard />;
      case 'enterprise-reporting':
        return <EnterpriseReporting />;
      case 'customer-reporting':
        return <CustomerReporting />;
      case 'cart-code-management':
        return <CartCodeManagement />;
      case 'credentialing-crm':
        return <CredentialingCRM />;
      case 'ai-compliance':
        return <AICompliance />;
      case 'communication-tools':
        return <CommunicationTools />;
      case 'data-integration':
        return <DataIntegration />;
      case 'access-controls':
        return <AccessControls />;
      case 'analytics-dashboard':
        return <AnalyticsDashboard />;
      case 'denial-management':
        return <DenialManagement />;
      case 'payer-analytics':
        return <PayerAnalytics />;
      case 'ai-insights':
        return <AIInsights />;
      case 'ccm':
        return <CCM />;
      case 'cash-pay':
        return <CashPay />;
      case 'factoring':
        return <Factoring />;
      case 'credentialing':
        return <Credentialing />;
      case 'it-msp':
        return <ITMSP />;
      default:
        return <Dashboard />;
    }
  };

  // If not authenticated, show splash page
  if (!isAuthenticated) {
    return <SplashPage onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
            <h1 className="text-lg font-semibold text-gray-900">Fusion RCM Dashboard</h1>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="p-1 rounded-md hover:bg-gray-100"
            >
              <X className="h-6 w-6 text-gray-400" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto space-y-1 px-2 py-4">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleTabChange(item.href as TabType)}
                className={`${
                  item.current
                    ? 'bg-blue-100 text-blue-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } group flex w-full items-center rounded-md px-3 py-3 text-sm font-medium transition-colors`}
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                <span className="truncate">{item.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex h-16 items-center px-4 border-b border-gray-200">
            <h1 className="text-lg font-semibold text-gray-900">Fusion RCM Dashboard</h1>
          </div>
          <nav className="flex-1 overflow-y-auto space-y-1 px-2 py-4">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleTabChange(item.href as TabType)}
                className={`${
                  item.current
                    ? 'bg-blue-100 text-blue-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } group flex w-full items-center rounded-md px-3 py-3 text-sm font-medium transition-colors`}
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                <span className="truncate">{item.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden -m-2.5 p-2.5 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="ml-4 lg:ml-0">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-md">
                <Bell className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <span className="hidden sm:block text-sm font-medium text-gray-700">Admin</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App; 