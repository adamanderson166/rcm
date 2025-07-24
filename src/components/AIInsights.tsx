import React, { useState } from 'react';
import { 
  Brain, 
  Lightbulb, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Target,
  BarChart3,
  Users,
  DollarSign
} from 'lucide-react';

const AIInsights: React.FC = () => {
  const [selectedInsight, setSelectedInsight] = useState<string>('all');

  const aiInsights = [
    {
      id: 1,
      type: 'optimization',
      title: 'Denial Rate Optimization',
      description: 'AI analysis shows 23% reduction in denials possible by updating authorization workflow',
      impact: 'High',
      confidence: 94,
      status: 'recommended',
      action: 'Review authorization process for Blue Cross claims',
      savings: '$45,000/month'
    },
    {
      id: 2,
      type: 'trend',
      title: 'Payer Performance Trend',
      description: 'UnitedHealth processing times increased 15% over last quarter',
      impact: 'Medium',
      confidence: 87,
      status: 'monitoring',
      action: 'Investigate UnitedHealth claim processing delays',
      savings: '$12,000/month'
    },
    {
      id: 3,
      type: 'automation',
      title: 'Automated Appeals Process',
      description: 'Implement AI-powered appeal generation for common denial reasons',
      impact: 'High',
      confidence: 91,
      status: 'implemented',
      action: 'Automated appeals system active for 3 denial types',
      savings: '$28,000/month'
    },
    {
      id: 4,
      type: 'prediction',
      title: 'Revenue Forecast',
      description: 'Predicted 8.5% revenue increase next quarter based on current trends',
      impact: 'Medium',
      confidence: 82,
      status: 'monitoring',
      action: 'Monitor claim submission volume and approval rates',
      savings: '$180,000/quarter'
    }
  ];

  const automationWorkflows = [
    {
      name: 'Denial Auto-Appeal',
      status: 'active',
      successRate: 78,
      claimsProcessed: 1250,
      timeSaved: '45 hours/week'
    },
    {
      name: 'Authorization Check',
      status: 'active',
      successRate: 92,
      claimsProcessed: 3200,
      timeSaved: '32 hours/week'
    },
    {
      name: 'Code Validation',
      status: 'testing',
      successRate: 85,
      claimsProcessed: 450,
      timeSaved: '18 hours/week'
    },
    {
      name: 'Payment Reconciliation',
      status: 'active',
      successRate: 96,
      claimsProcessed: 2800,
      timeSaved: '28 hours/week'
    }
  ];

  const getInsightBadge = (type: string) => {
    const typeConfig = {
      optimization: { class: 'bg-primary-100 text-primary-800', icon: Target },
      trend: { class: 'bg-warning-100 text-warning-800', icon: TrendingUp },
      automation: { class: 'bg-success-100 text-success-800', icon: Zap },
      prediction: { class: 'bg-purple-100 text-purple-800', icon: Brain }
    };
    
    const config = typeConfig[type as keyof typeof typeConfig];
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.class}`}>
        <Icon className="w-3 h-3 mr-1" />
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      recommended: { class: 'status-pending', text: 'Recommended' },
      monitoring: { class: 'status-pending', text: 'Monitoring' },
      implemented: { class: 'status-approved', text: 'Implemented' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    
    return (
      <span className={`status-badge ${config.class}`}>
        {config.text}
      </span>
    );
  };

  const getWorkflowStatusBadge = (status: string) => {
    const statusConfig = {
      active: { class: 'bg-success-100 text-success-800', text: 'Active' },
      testing: { class: 'bg-warning-100 text-warning-800', text: 'Testing' },
      inactive: { class: 'bg-gray-100 text-gray-800', text: 'Inactive' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.class}`}>
        {config.text}
      </span>
    );
  };

  const filteredInsights = selectedInsight === 'all' 
    ? aiInsights 
    : aiInsights.filter(insight => insight.type === selectedInsight);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Insights & Automation</h1>
          <p className="mt-1 text-sm text-gray-500">
            AI-powered recommendations and automated workflows for RCM optimization
          </p>
        </div>
      </div>

      {/* AI Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
        <div className="metric-card">
          <div className="flex items-center">
            <Brain className="h-8 w-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">AI Insights</p>
              <p className="text-2xl font-semibold text-gray-900">24</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <Zap className="h-8 w-8 text-success-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Automations</p>
              <p className="text-2xl font-semibold text-gray-900">4</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-primary-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Time Saved</p>
              <p className="text-2xl font-semibold text-gray-900">123 hrs</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-success-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Cost Savings</p>
              <p className="text-2xl font-semibold text-gray-900">$85K</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setSelectedInsight('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedInsight === 'all'
                ? 'bg-primary-100 text-primary-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Insights
          </button>
          <button
            onClick={() => setSelectedInsight('optimization')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedInsight === 'optimization'
                ? 'bg-primary-100 text-primary-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Optimization
          </button>
          <button
            onClick={() => setSelectedInsight('trend')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedInsight === 'trend'
                ? 'bg-warning-100 text-warning-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Trends
          </button>
          <button
            onClick={() => setSelectedInsight('automation')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedInsight === 'automation'
                ? 'bg-success-100 text-success-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Automation
          </button>
          <button
            onClick={() => setSelectedInsight('prediction')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedInsight === 'prediction'
                ? 'bg-purple-100 text-purple-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Predictions
          </button>
        </div>
      </div>

      {/* AI Insights Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {filteredInsights.map((insight) => (
          <div key={insight.id} className="card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                {getInsightBadge(insight.type)}
                {getStatusBadge(insight.status)}
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Confidence</p>
                <p className="text-lg font-semibold text-gray-900">{insight.confidence}%</p>
              </div>
            </div>
            
            <h3 className="text-lg font-medium text-gray-900 mb-2">{insight.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{insight.description}</p>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Impact:</span>
                <span className={`font-medium ${
                  insight.impact === 'High' ? 'text-danger-600' : 
                  insight.impact === 'Medium' ? 'text-warning-600' : 'text-success-600'
                }`}>
                  {insight.impact}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Potential Savings:</span>
                <span className="font-medium text-success-600">{insight.savings}</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm font-medium text-gray-900 mb-1">Recommended Action:</p>
                <p className="text-sm text-gray-600">{insight.action}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Automation Workflows */}
      <div className="card">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Automation Workflows</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Workflow
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Success Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Claims Processed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time Saved
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {automationWorkflows.map((workflow) => (
                <tr key={workflow.name} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {workflow.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getWorkflowStatusBadge(workflow.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {workflow.successRate}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {workflow.claimsProcessed.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {workflow.timeSaved}
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

export default AIInsights; 