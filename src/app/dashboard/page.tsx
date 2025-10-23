'use client';

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Activity, 
  DollarSign, 
  Eye,
  BarChart3,
  PieChart,
  Calendar,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';

// Types
interface StatCard {
  id: string;
  title: string;
  value: string;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: React.ReactNode;
  trend: number[];
}

interface ChartData {
  name: string;
  value: number;
  change?: number;
}

// Mock data - replace with actual API calls
const mockStats: StatCard[] = [
  {
    id: '1',
    title: 'Total Revenue',
    value: '$0',
    change: 0,
    changeType: 'neutral',
    icon: <DollarSign className="w-5 h-5" />,
    trend: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  },
  {
    id: '2',
    title: 'Active Users',
    value: '0',
    change: 0,
    changeType: 'neutral',
    icon: <Users className="w-5 h-5" />,
    trend: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  },
  {
    id: '3',
    title: 'Page Views',
    value: '0',
    change: 0,
    changeType: 'neutral',
    icon: <Eye className="w-5 h-5" />,
    trend: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  },
  {
    id: '4',
    title: 'Conversion Rate',
    value: '3.24%',
    change: 0.8,
    changeType: 'increase',
    icon: <Activity className="w-5 h-5" />,
    trend: [2.1, 2.3, 2.5, 2.8, 3.0, 2.9, 3.1, 3.2, 3.0, 3.1, 3.3, 3.24]
  }
];

const mockChartData: ChartData[] = [
  { name: 'Jan', value: 0, change: 0 },
  { name: 'Feb', value: 0, change: 0 },
  { name: 'Mar', value: 0, change: 0 },
  { name: 'Apr', value: 0, change: 0 },
  { name: 'May', value: 0, change: 0 },
  { name: 'Jun', value: 0, change: 0 }
];

const mockPieData = [
  { name: 'Desktop', value: 0, color: 'bg-blue-500' },
  { name: 'Mobile', value: 0, color: 'bg-green-500' },
  { name: 'Tablet', value: 0, color: 'bg-purple-500' }
];

// Stat Card Component
const StatCard: React.FC<{ stat: StatCard }> = ({ stat }) => {
  const changeColor = stat.changeType === 'increase' ? 'text-green-400' : 
                     stat.changeType === 'decrease' ? 'text-red-400' : 'text-gray-400';
  
  const ChangeIcon = stat.changeType === 'increase' ? TrendingUp : 
                    stat.changeType === 'decrease' ? TrendingDown : Activity;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
            {stat.icon}
          </div>
          <h3 className="text-gray-300 font-medium">{stat.title}</h3>
        </div>
        <div className={`flex items-center space-x-1 ${changeColor}`}>
          <ChangeIcon className="w-4 h-4" />
          <span className="text-sm font-medium">{Math.abs(stat.change)}%</span>
        </div>
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
          <p className="text-sm text-gray-400">vs last month</p>
        </div>
        
        {/* Mini trend chart */}
        <div className="flex items-end space-x-1 h-8">
          {stat.trend.map((value, index) => (
            <div
              key={index}
              className="bg-blue-400/30 rounded-sm w-1.5 transition-all duration-200 hover:bg-blue-400/50"
              style={{ height: `${(value / Math.max(...stat.trend)) * 100}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Chart Component (Simple Bar Chart)
const BarChart: React.FC<{ data: ChartData[] }> = ({ data }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Revenue Overview</h3>
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <Filter className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="flex items-end justify-between h-64 space-x-4">
        {data.map((item, index) => (
          <div key={item.name} className="flex-1 flex flex-col items-center">
            <div className="w-full flex flex-col items-center">
              <div
                className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg mb-2 transition-all duration-300 hover:from-blue-500 hover:to-blue-300"
                style={{ height: `${(item.value / maxValue) * 200}px` }}
              />
              <span className="text-sm text-gray-300 mb-1">{item.name}</span>
              <span className="text-xs text-gray-400">${item.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Activity Feed Component
const ActivityFeed: React.FC = () => {
  const activities = [
    { id: 1, type: 'user', message: 'New user registration', time: '2 min ago' },
    { id: 2, type: 'sale', message: 'Sale completed - $299', time: '5 min ago' },
    { id: 3, type: 'system', message: 'System backup completed', time: '1 hour ago' },
    { id: 4, type: 'user', message: 'User profile updated', time: '2 hours ago' },
    { id: 5, type: 'sale', message: 'New order received', time: '3 hours ago' }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user': return <Users className="w-4 h-4 text-blue-400" />;
      case 'sale': return <DollarSign className="w-4 h-4 text-green-400" />;
      case 'system': return <Activity className="w-4 h-4 text-purple-400" />;
      default: return <Activity className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
        <button className="p-2 text-gray-400 hover:text-white transition-colors">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700/50 transition-colors">
            <div className="flex-shrink-0">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white truncate">{activity.message}</p>
              <p className="text-xs text-gray-400">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 text-sm text-blue-400 hover:text-blue-300 transition-colors">
        View all activity
      </button>
    </div>
  );
};

// Traffic Sources Component
const TrafficSources: React.FC = () => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-6">Traffic Sources</h3>
      
      <div className="space-y-4">
        {mockPieData.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${item.color}`} />
              <span className="text-gray-300">{item.name}</span>
            </div>
            <span className="text-white font-medium">{item.value}%</span>
          </div>
        ))}
      </div>
      
      <div className="mt-6 flex h-2 rounded-full overflow-hidden">
        {mockPieData.map((item, index) => (
          <div
            key={item.name}
            className={item.color}
            style={{ width: `${item.value}%` }}
          />
        ))}
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-700 rounded w-1/4" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-700 rounded-xl" />
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-80 bg-gray-700 rounded-xl" />
              <div className="h-80 bg-gray-700 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400 mt-1">Welcome back! Here's what's happening.</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockStats.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <BarChart data={mockChartData} />
          </div>
          <div>
            <TrafficSources />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActivityFeed />
          
          {/* Quick Actions */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Quick Actions</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-blue-600/20 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-600/30 transition-colors flex flex-col items-center space-y-2">
                <Users className="w-6 h-6" />
                <span className="text-sm">Add User</span>
              </button>
              
              <button className="p-4 bg-green-600/20 border border-green-500/30 rounded-lg text-green-400 hover:bg-green-600/30 transition-colors flex flex-col items-center space-y-2">
                <BarChart3 className="w-6 h-6" />
                <span className="text-sm">View Reports</span>
              </button>
              
              <button className="p-4 bg-purple-600/20 border border-purple-500/30 rounded-lg text-purple-400 hover:bg-purple-600/30 transition-colors flex flex-col items-center space-y-2">
                <PieChart className="w-6 h-6" />
                <span className="text-sm">Analytics</span>
              </button>
              
              <button className="p-4 bg-orange-600/20 border border-orange-500/30 rounded-lg text-orange-400 hover:bg-orange-600/30 transition-colors flex flex-col items-center space-y-2">
                <Calendar className="w-6 h-6" />
                <span className="text-sm">Schedule</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;