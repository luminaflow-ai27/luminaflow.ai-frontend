'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Users, DollarSign, Activity, TrendingUp, Search, RefreshCw, Shield, Ban,
} from 'lucide-react';

// --- TYPE DEFINITIONS ---
interface User {
  id: string; email: string; full_name?: string; role: string; status: string; created_at: string; subscription?: any;
}
interface Subscription {
  id: string; user_id: string; plan: any; status: string; start_date: string; end_date?: string;
}
interface Stats {
  total_users: number; active_subscriptions: number; mrr: number; total_usage: number;
}

// --- API Configuration ---
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// --- TAB SUB-COMPONENTS (No changes needed) ---
const OverviewTab: React.FC<{ stats: Stats | null }> = ({ stats }) => {
  if (!stats) return <div className="text-center p-8 text-gray-500">No overview data available.</div>;
  const statItems = [
    { icon: Users, label: 'Total Users', value: stats.total_users, color: 'text-blue-400' },
    { icon: DollarSign, label: 'Active Subscriptions', value: stats.active_subscriptions, color: 'text-green-400' },
    { icon: TrendingUp, label: 'MRR', value: `$${(stats.mrr || 0).toLocaleString()}`, color: 'text-yellow-400' },
    { icon: Activity, label: 'Total Usage', value: (stats.total_usage || 0).toLocaleString(), color: 'text-purple-400' },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems.map(item => (
        <div key={item.label} className="bg-gray-800/70 p-6 rounded-xl border border-gray-700 flex items-center space-x-4">
          <item.icon className={`w-8 h-8 ${item.color}`} />
          <div>
            <p className="text-gray-400 text-sm">{item.label}</p>
            <p className="text-white text-2xl font-bold">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
const UsersTab: React.FC<{ users: User[], searchTerm: string, setSearchTerm: (t: string) => void, onResetQuota: (id: string) => void, onSuspendUser: (id: string, s: boolean) => void }> = 
({ users, searchTerm, setSearchTerm, onResetQuota, onSuspendUser }) => (
  <div className="bg-gray-800/70 rounded-xl border border-gray-700">
    <div className="p-4 border-b border-gray-700"><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" /><input type="text" placeholder="Search by name or email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-gray-900 border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white focus:ring-blue-500 focus:border-blue-500"/></div></div>
    <table className="w-full text-left"><thead className="bg-gray-800"><tr>{['User', 'Status', 'Role', 'Joined', 'Actions'].map(h => <th key={h} className="p-4 text-sm font-medium text-gray-400">{h}</th>)}</tr></thead>
      <tbody className="divide-y divide-gray-700">{users.map(user => (<tr key={user.id} className="hover:bg-gray-700/50"><td className="p-4"><div className="font-medium text-white">{user.full_name || 'N/A'}</div><div className="text-sm text-gray-400">{user.email}</div></td><td className="p-4"><span className={`px-2 py-1 text-xs rounded-full ${user.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{user.status}</span></td><td className="p-4 text-gray-300">{user.role}</td><td className="p-4 text-gray-300">{new Date(user.created_at).toLocaleDateString()}</td><td className="p-4 space-x-2"><button onClick={() => onSuspendUser(user.id, user.status !== 'suspended')} className="text-gray-400 hover:text-white"><Ban className="w-4 h-4" /></button><button onClick={() => onResetQuota(user.id)} className="text-gray-400 hover:text-white"><RefreshCw className="w-4 h-4" /></button></td></tr>))}</tbody>
    </table>
  </div>
);
const SubscriptionsTab: React.FC<{ subscriptions: Subscription[] }> = ({ subscriptions }) => (
  <div className="text-center text-gray-500 p-8 bg-gray-800/70 rounded-xl border border-gray-700">Subscriptions management UI to be implemented here. Found {subscriptions.length} subscriptions.</div>
);
const UsageTab: React.FC = () => (
  <div className="text-center text-gray-500 p-8 bg-gray-800/70 rounded-xl border border-gray-700">API usage charts and statistics to be implemented here.</div>
);


// --- MAIN ADMIN PANEL COMPONENT ---
const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'subscriptions' | 'usage'>('overview');
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  // ✅ New helper function to handle authenticated API calls
  const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      router.push('/login');
      throw new Error('No auth token found. Redirecting to login.');
    }

    const headers = new Headers(options.headers || {});
    headers.append('Authorization', `Bearer ${token}`);

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('authToken');
        router.push('/login');
      }
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'overview') await fetchStats();
      else if (activeTab === 'users') await fetchUsers();
      else if (activeTab === 'subscriptions') await fetchSubscriptions();
    } catch (error) { 
      console.error(`Error fetching ${activeTab} data:`, error);
    } finally { 
      setLoading(false); 
    }
  };

  // ✅ Updated fetch functions to use the new helper
  const fetchStats = async () => {
    const data = await fetchWithAuth(`${API_BASE_URL}/api/admin/stats`);
    setStats(data);
  };

  const fetchUsers = async () => {
    const data = await fetchWithAuth(`${API_BASE_URL}/api/admin/users`);
    setUsers(data || []);
  };

  const fetchSubscriptions = async () => {
    const data = await fetchWithAuth(`${API_BASE_URL}/api/admin/subscriptions`);
    setSubscriptions(data || []);
  };

  const handleResetQuota = async (userId: string) => {
    console.log(`Resetting quota for user: ${userId}`);
    await fetchWithAuth(`${API_BASE_URL}/api/admin/users/${userId}/quota-reset`, { method: 'POST' });
    await fetchUsers();
  };

  const handleSuspendUser = async (userId: string, suspend: boolean) => {
    const action = suspend ? 'suspend' : 'activate';
    console.log(`Attempting to ${action} user: ${userId}`);
    await fetchWithAuth(`${API_BASE_URL}/api/admin/users/${userId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: suspend ? 'suspended' : 'active' })
    });
    await fetchUsers();
  };

  const filteredUsers = users.filter(user =>
    (user.full_name && user.full_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center">
              <Shield className="w-8 h-8 mr-3 text-red-400" /> Admin Panel
            </h1>
            <p className="text-gray-400 mt-1">Manage users, subscriptions, and system health</p>
          </div>
          <button onClick={fetchData} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 disabled:bg-gray-500">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> <span>Refresh</span>
          </button>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-1 flex space-x-1">
          {['overview', 'users', 'subscriptions', 'usage'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab as any)} className={`flex-1 px-4 py-2 rounded-lg transition-all duration-200 capitalize ${activeTab === tab ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700/50'}`}>
              {tab}
            </button>
          ))}
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {activeTab === 'overview' && <OverviewTab stats={stats} />}
            {activeTab === 'users' && <UsersTab users={filteredUsers} searchTerm={searchTerm} setSearchTerm={setSearchTerm} onResetQuota={handleResetQuota} onSuspendUser={handleSuspendUser} />}
            {activeTab === 'subscriptions' && <SubscriptionsTab subscriptions={subscriptions} />}
            {activeTab === 'usage' && <UsageTab />}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;