'use client';

import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Filter,
  Download,
  RefreshCw,
  Search,
  Calendar,
  ArrowUpDown,
  MoreVertical,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Types
interface MetricData {
  period: string;
  value: number;
  change: number;
  visitors: number;
  pageviews: number;
  sessions: number;
}

interface TrafficSource {
  id: string;
  source: string;
  visitors: number;
  percentage: number;
  change: number;
  sessions: number;
}

interface PageAnalytics {
  id: string;
  page: string;
  views: number;
  uniqueViews: number;
  avgTime: string;
  bounceRate: number;
}

interface DeviceData {
  device: string;
  users: number;
  percentage: number;
  sessions: number;
  color: string;
}

// Mock Data
const mockMetricsData: MetricData[] = [
  { period: '2024-01', value: 0, change: 0, visitors: 0, pageviews: 0, sessions: 0 },
  { period: '2024-02', value: 0, change: 0, visitors: 0, pageviews: 0, sessions: 0 },
  { period: '2024-03', value: 0, change: 0, visitors: 0, pageviews: 0, sessions: 0 },
  { period: '2024-04', value: 0, change: 0, visitors: 0, pageviews: 0, sessions: 0 },
  { period: '2024-05', value: 0, change: 0, visitors: 0, pageviews: 0, sessions: 0 },
  { period: '2024-06', value: 0, change: 0, visitors: 0, pageviews: 0, sessions: 0 }
];

const mockTrafficSources: TrafficSource[] = [
  { id: '1', source: 'Google Organic', visitors: 0, percentage: 0, change: 0, sessions: 0 },
  { id: '2', source: 'Direct Traffic', visitors: 0, percentage: 0, change: 0, sessions: 0 },
  { id: '3', source: 'Social Media', visitors: 0, percentage: 0, change: 0, sessions: 0 },
  { id: '4', source: 'Referral Sites', visitors: 0, percentage: 0, change: 0, sessions: 0 },
  { id: '5', source: 'Email Campaign', visitors: 0, percentage: 0, change: 0, sessions: 0 }
];

const mockPageAnalytics: PageAnalytics[] = [
  { id: '1', page: '/dashboard', views: 0, uniqueViews: 0, avgTime: '0', bounceRate: 0 },
  { id: '2', page: '/analytics', views: 0, uniqueViews: 0, avgTime: '0', bounceRate: 0 },
  { id: '3', page: '/settings', views: 0, uniqueViews: 0, avgTime: '0', bounceRate: 0 },
  { id: '4', page: '/login', views: 0, uniqueViews: 0, avgTime: '0', bounceRate: 0 },
  { id: '5', page: '/register', views: 0, uniqueViews: 0, avgTime: '0', bounceRate: 0 }
];

const mockDeviceData: DeviceData[] = [
  { device: 'Desktop', users: 3200, percentage: 52.4, sessions: 2800, color: 'bg-blue-500' },
  { device: 'Mobile', users: 2100, percentage: 34.3, sessions: 1900, color: 'bg-green-500' },
  { device: 'Tablet', users: 810, percentage: 13.3, sessions: 720, color: 'bg-purple-500' }
];

// Metrics Chart Component
const MetricsChart: React.FC<{ data: MetricData[]; metric: string }> = ({ data, metric }) => {
  const maxValue = Math.max(...data.map(d => {
    switch(metric) {
      case 'pageviews': return d.pageviews;
      case 'visitors': return d.visitors;
      case 'sessions': return d.sessions;
      default: return d.value;
    }
  }));

  const getValue = (item: MetricData) => {
    switch(metric) {
      case 'pageviews': return item.pageviews;
      case 'visitors': return item.visitors;
      case 'sessions': return item.sessions;
      default: return item.value;
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white capitalize">{metric} Over Time</h3>
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <Filter className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="flex items-end justify-between h-64 space-x-4 mb-4">
        {data.map((item, index) => (
          <div key={item.period} className="flex-1 flex flex-col items-center">
            <div className="w-full flex flex-col items-center relative group">
              <div
                className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg mb-2 transition-all duration-300 hover:from-blue-500 hover:to-blue-300 cursor-pointer"
                style={{ height: `${(getValue(item) / maxValue) * 200}px`, minHeight: '10px' }}
              />
              
              {/* Tooltip */}
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                <div className="text-center">
                  <div className="font-semibold">{getValue(item).toLocaleString()}</div>
                  <div className="text-xs text-gray-300">{item.period}</div>
                </div>
              </div>
              
              <span className="text-sm text-gray-300 mb-1">{item.period.slice(-2)}</span>
              <span className="text-xs text-gray-400">{getValue(item).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-700">
        <div className="text-center">
          <p className="text-2xl font-bold text-white">{data[data.length - 1]?.value.toLocaleString()}</p>
          <p className="text-sm text-gray-400">Current Month</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-400">+{data[data.length - 1]?.change}%</p>
          <p className="text-sm text-gray-400">vs Last Month</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-400">{Math.round(data.reduce((acc, item) => acc + getValue(item), 0) / data.length).toLocaleString()}</p>
          <p className="text-sm text-gray-400">Average</p>
        </div>
      </div>
    </div>
  );
};

// Traffic Sources Table
const TrafficSourcesTable: React.FC<{ data: TrafficSource[] }> = ({ data }) => {
  const [sortBy, setSortBy] = useState('visitors');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortBy as keyof TrafficSource] as number;
    const bValue = b[sortBy as keyof TrafficSource] as number;
    return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
  });

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Traffic Sources</h3>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search sources..."
              className="bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-700">
        <table className="w-full">
          <thead className="bg-gray-700/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Source
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-white"
                onClick={() => handleSort('visitors')}
              >
                <div className="flex items-center space-x-1">
                  <span>Visitors</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-white"
                onClick={() => handleSort('percentage')}
              >
                <div className="flex items-center space-x-1">
                  <span>Percentage</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Change
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Sessions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {sortedData.map((source) => (
              <tr key={source.id} className="hover:bg-gray-700/30 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-white">{source.source}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-white">{source.visitors.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-700 rounded-full h-2 mr-3">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${source.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-white">{source.percentage}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm flex items-center ${source.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {source.change >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    {Math.abs(source.change)}%
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {source.sessions.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Device Analytics Component
const DeviceAnalytics: React.FC<{ data: DeviceData[] }> = ({ data }) => {
  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case 'desktop': return <Monitor className="w-5 h-5" />;
      case 'mobile': return <Smartphone className="w-5 h-5" />;
      case 'tablet': return <Tablet className="w-5 h-5" />;
      default: return <Globe className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Device Analytics</h3>
        <button className="p-2 text-gray-400 hover:text-white transition-colors">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Donut Chart Representation */}
        <div className="flex items-center justify-center">
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 42 42">
              {data.map((item, index) => {
                const strokeDasharray = `${item.percentage} ${100 - item.percentage}`;
                const strokeDashoffset = data.slice(0, index).reduce((acc, prev) => acc + prev.percentage, 0);
                
                return (
                  <circle
                    key={item.device}
                    cx="21"
                    cy="21"
                    r="15.915"
                    fill="transparent"
                    stroke={item.color.replace('bg-', '').replace('500', '')}
                    strokeWidth="3"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={-strokeDashoffset}
                    className="transition-all duration-300"
                  />
                );
              })}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-lg font-bold text-white">{data.reduce((acc, item) => acc + item.users, 0).toLocaleString()}</p>
                <p className="text-xs text-gray-400">Total Users</p>
              </div>
            </div>
          </div>
        </div>

        {/* Device List */}
        <div className="space-y-4">
          {data.map((item) => (
            <div key={item.device} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className={`p-2 ${item.color.replace('500', '600/20')} rounded-lg ${item.color.replace('bg-', 'text-').replace('500', '400')}`}>
                  {getDeviceIcon(item.device)}
                </div>
                <div>
                  <p className="text-white font-medium">{item.device}</p>
                  <p className="text-sm text-gray-400">{item.sessions.toLocaleString()} sessions</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-semibold">{item.users.toLocaleString()}</p>
                <p className="text-sm text-gray-400">{item.percentage}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Page Performance Table
const PagePerformanceTable: React.FC<{ data: PageAnalytics[] }> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Page Performance</h3>
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <Filter className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-700">
        <table className="w-full">
          <thead className="bg-gray-700/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Page</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Views</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Unique</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Avg Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Bounce Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {paginatedData.map((page) => (
              <tr key={page.id} className="hover:bg-gray-700/30 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-white">{page.page}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {page.views.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {page.uniqueViews.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-gray-400" />
                    {page.avgTime}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    page.bounceRate < 25 ? 'bg-green-100 text-green-800' :
                    page.bounceRate < 40 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {page.bounceRate}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-400">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, data.length)} of {data.length} results
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                  page === currentPage 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Main Analytics Component
const Analytics: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('pageviews');

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-700 rounded w-1/4" />
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3 h-80 bg-gray-700 rounded-xl" />
              <div className="h-80 bg-gray-700 rounded-xl" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-96 bg-gray-700 rounded-xl" />
              <div className="h-96 bg-gray-700 rounded-xl" />
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
            <h1 className="text-3xl font-bold text-white">Analytics</h1>
            <p className="text-gray-400 mt-1">Comprehensive insights into your data and performance.</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>

            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="pageviews">Page Views</option>
              <option value="visitors">Visitors</option>
              <option value="sessions">Sessions</option>
            </select>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Main Chart and Device Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <MetricsChart data={mockMetricsData} metric={selectedMetric} />
          </div>
          <div>
            <DeviceAnalytics data={mockDeviceData} />
          </div>
        </div>

        {/* Traffic Sources and Page Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TrafficSourcesTable data={mockTrafficSources} />
          <PagePerformanceTable data={mockPageAnalytics} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;