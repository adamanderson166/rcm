import React, { useState } from 'react';
import { 
  BarChart3, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  Settings,
  Menu,
  X,
  Bell,
  Search,
  Heart,
  CreditCard,
  FileText,
  Shield,
  Monitor,
  Building,
  UserCheck,
  MessageSquare,
  Database,
  Network,
  DollarSign,
  Lock,
  Brain,
  BarChart,
  Upload,
  UserCog
} from 'lucide-react';
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

type TabType = 'dashboard' | 'denials' | 'payers' | 'ai' | 'ccm' | 'cashpay' | 'factoring' | 'credentialing' | 'itmsp' | 'enterprise' | 'customer' | 'cart' | 'communication' | 'ar' | 'credentialing-crm' | 'access-controls' | 'ai-compliance' | 'analytics' | 'data-integration';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', tab: 'dashboard' as TabType, icon: BarChart3 },
    { name: 'AR & Denial Management', tab: 'ar' as TabType, icon: DollarSign },
    { name: 'Denial Management', tab: 'denials' as TabType, icon: AlertTriangle },
    { name: 'Payer Analytics', tab: 'payers' as TabType, icon: TrendingUp },
    { name: 'AI Insights', tab: 'ai' as TabType, icon: Users },
    { name: 'Enterprise Reporting', tab: 'enterprise' as TabType, icon: Building },
    { name: 'Customer Reporting', tab: 'customer' as TabType, icon: UserCheck },
    { name: '835s/CART Codes', tab: 'cart' as TabType, icon: Database },
    { name: 'Communication Tools', tab: 'communication' as TabType, icon: MessageSquare },
    { name: 'Credentialing CRM', tab: 'credentialing-crm' as TabType, icon: Shield },
    { name: 'User Access Controls', tab: 'access-controls' as TabType, icon: Lock },
    { name: 'AI Compliance & LMN', tab: 'ai-compliance' as TabType, icon: Brain },
    { name: 'Analytics Dashboard', tab: 'analytics' as TabType, icon: BarChart },
    { name: 'Data Integration', tab: 'data-integration' as TabType, icon: Upload },
    { name: 'Chronic Care Management', tab: 'ccm' as TabType, icon: Heart },
    { name: 'Cash Pay Solutions', tab: 'cashpay' as TabType, icon: CreditCard },
    { name: 'Factoring', tab: 'factoring' as TabType, icon: FileText },
    { name: 'Credentialing', tab: 'credentialing' as TabType, icon: Shield },
    { name: 'IT MSP Support', tab: 'itmsp' as TabType, icon: Monitor },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'ar':
        return <ARDashboard />;
      case 'denials':
        return <DenialManagement />;
      case 'payers':
        return <PayerAnalytics />;
      case 'ai':
        return <AIInsights />;
      case 'enterprise':
        return <EnterpriseReporting />;
      case 'customer':
        return <CustomerReporting />;
      case 'cart':
        return <CartCodeManagement />;
      case 'communication':
        return <CommunicationTools />;
      case 'credentialing-crm':
        return <CredentialingCRM />;
      case 'access-controls':
        return <AccessControls />;
      case 'ai-compliance':
        return <AICompliance />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'data-integration':
        return <DataIntegration />;
      case 'ccm':
        return <CCM />;
      case 'cashpay':
        return <CashPay />;
      case 'factoring':
        return <Factoring />;
      case 'credentialing':
        return <Credentialing />;
      case 'itmsp':
        return <ITMSP />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Fusion RCM Dashboard</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.tab)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === item.tab
                      ? 'bg-primary-100 text-primary-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-400 hover:text-gray-600"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h2 className="ml-4 text-lg font-medium text-gray-900">Fusion RCM Dashboard</h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search claims, customers, or agencies..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <Bell className="w-6 h-6" />
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <Settings className="w-6 h-6" />
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App; 