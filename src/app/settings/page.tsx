'use client';

import React, { useState, useEffect } from 'react';
import {
  User,
  Shield,
  Bell,
  Palette,
  Globe,
  Database,
  Key,
  Mail,
  Smartphone,
  Monitor,
  Moon,
  Sun,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  Trash2,
  Download,
  Upload,
  AlertTriangle,
  Check,
  X,
  Plus,
  Settings as SettingsIcon
} from 'lucide-react';

// Types
interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  role: string;
  joinDate: string;
}

interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  marketing: boolean;
  security: boolean;
  updates: boolean;
}

interface AppearanceSettings {
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  dateFormat: string;
}

interface SecuritySettings {
  twoFactorEnabled: boolean;
  sessionTimeout: number;
  loginNotifications: boolean;
  passwordExpiry: number;
}

interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'friends';
  dataCollection: boolean;
  analytics: boolean;
  cookies: boolean;
}

// Mock Data
const mockUserProfile: UserProfile = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: '/api/placeholder/80/80',
  role: 'Administrator',
  joinDate: '2023-01-15'
};

const mockNotifications: NotificationSettings = {
  email: true,
  push: true,
  sms: false,
  marketing: false,
  security: true,
  updates: true
};

const mockAppearance: AppearanceSettings = {
  theme: 'dark',
  language: 'en',
  timezone: 'UTC-5',
  dateFormat: 'MM/DD/YYYY'
};

const mockSecurity: SecuritySettings = {
  twoFactorEnabled: true,
  sessionTimeout: 30,
  loginNotifications: true,
  passwordExpiry: 90
};

const mockPrivacy: PrivacySettings = {
  profileVisibility: 'private',
  dataCollection: true,
  analytics: true,
  cookies: true
};

// Toggle Switch Component
const ToggleSwitch: React.FC<{
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  disabled?: boolean;
}> = ({ enabled, onChange, disabled = false }) => {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      } ${enabled ? 'bg-blue-600' : 'bg-gray-600'}`}
      disabled={disabled}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
};

// Profile Settings Card
const ProfileCard: React.FC<{
  profile: UserProfile;
  onUpdate: (profile: UserProfile) => void;
}> = ({ profile, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);
  const [showPassword, setShowPassword] = useState(false);

  const handleSave = () => {
    onUpdate(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <User className="w-5 h-5 mr-2" />
          Profile Settings
        </h3>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Edit
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Avatar Section */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={editedProfile.avatar}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-600"
            />
            {isEditing && (
              <button className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-2 hover:bg-blue-700 transition-colors">
                <Upload className="w-4 h-4 text-white" />
              </button>
            )}
          </div>
          <div>
            <p className="text-white font-medium">{profile.name}</p>
            <p className="text-gray-400 text-sm">{profile.role}</p>
            <p className="text-gray-500 text-xs">Joined {profile.joinDate}</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
            <input
              type="text"
              value={editedProfile.name}
              onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
              disabled={!isEditing}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
            <input
              type="email"
              value={editedProfile.email}
              onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
              disabled={!isEditing}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {isEditing && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter new password (optional)"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 pr-12 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex space-x-3 pt-4 border-t border-gray-700">
            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Notifications Card
const NotificationsCard: React.FC<{
  settings: NotificationSettings;
  onChange: (settings: NotificationSettings) => void;
}> = ({ settings, onChange }) => {
  const notificationOptions = [
    { key: 'email', label: 'Email Notifications', icon: Mail, description: 'Receive notifications via email' },
    { key: 'push', label: 'Push Notifications', icon: Bell, description: 'Browser and mobile push notifications' },
    { key: 'sms', label: 'SMS Notifications', icon: Smartphone, description: 'Text message notifications' },
    { key: 'marketing', label: 'Marketing Updates', icon: Globe, description: 'Product updates and marketing content' },
    { key: 'security', label: 'Security Alerts', icon: Shield, description: 'Important security notifications' },
    { key: 'updates', label: 'Product Updates', icon: RefreshCw, description: 'New features and improvements' },
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white flex items-center mb-6">
        <Bell className="w-5 h-5 mr-2" />
        Notification Settings
      </h3>

      <div className="space-y-4">
        {notificationOptions.map((option) => {
          const IconComponent = option.icon;
          return (
            <div key={option.key} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center space-x-3">
                <IconComponent className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-white font-medium">{option.label}</p>
                  <p className="text-sm text-gray-400">{option.description}</p>
                </div>
              </div>
              <ToggleSwitch
                enabled={settings[option.key as keyof NotificationSettings] as boolean}
                onChange={(enabled) => onChange({ ...settings, [option.key]: enabled })}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Appearance Card
const AppearanceCard: React.FC<{
  settings: AppearanceSettings;
  onChange: (settings: AppearanceSettings) => void;
}> = ({ settings, onChange }) => {
  const themes = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor }
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white flex items-center mb-6">
        <Palette className="w-5 h-5 mr-2" />
        Appearance
      </h3>

      <div className="space-y-6">
        {/* Theme Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">Theme</label>
          <div className="grid grid-cols-3 gap-3">
            {themes.map((theme) => {
              const IconComponent = theme.icon;
              return (
                <button
                  key={theme.value}
                  onClick={() => onChange({ ...settings, theme: theme.value as any })}
                  className={`p-4 rounded-lg border-2 transition-colors flex flex-col items-center space-y-2 ${
                    settings.theme === theme.value
                      ? 'border-blue-500 bg-blue-600/20'
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <IconComponent className="w-6 h-6" />
                  <span className="text-sm">{theme.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Language Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
          <select
            value={settings.language}
            onChange={(e) => onChange({ ...settings, language: e.target.value })}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="zh">中文</option>
          </select>
        </div>

        {/* Timezone */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Timezone</label>
          <select
            value={settings.timezone}
            onChange={(e) => onChange({ ...settings, timezone: e.target.value })}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="UTC-8">Pacific Time (UTC-8)</option>
            <option value="UTC-5">Eastern Time (UTC-5)</option>
            <option value="UTC+0">Greenwich Mean Time (UTC+0)</option>
            <option value="UTC+1">Central European Time (UTC+1)</option>
            <option value="UTC+8">China Standard Time (UTC+8)</option>
          </select>
        </div>

        {/* Date Format */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Date Format</label>
          <select
            value={settings.dateFormat}
            onChange={(e) => onChange({ ...settings, dateFormat: e.target.value })}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>
      </div>
    </div>
  );
};

// Security Card
const SecurityCard: React.FC<{
  settings: SecuritySettings;
  onChange: (settings: SecuritySettings) => void;
}> = ({ settings, onChange }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white flex items-center mb-6">
        <Shield className="w-5 h-5 mr-2" />
        Security Settings
      </h3>

      <div className="space-y-6">
        {/* Two Factor Authentication */}
        <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
          <div className="flex items-center space-x-3">
            <Key className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-white font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-gray-400">Add an extra layer of security</p>
            </div>
          </div>
          <ToggleSwitch
            enabled={settings.twoFactorEnabled}
            onChange={(enabled) => onChange({ ...settings, twoFactorEnabled: enabled })}
          />
        </div>

        {/* Login Notifications */}
        <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
          <div className="flex items-center space-x-3">
            <Bell className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-white font-medium">Login Notifications</p>
              <p className="text-sm text-gray-400">Get notified of new logins</p>
            </div>
          </div>
          <ToggleSwitch
            enabled={settings.loginNotifications}
            onChange={(enabled) => onChange({ ...settings, loginNotifications: enabled })}
          />
        </div>

        {/* Session Timeout */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Session Timeout (minutes)</label>
          <select
            value={settings.sessionTimeout}
            onChange={(e) => onChange({ ...settings, sessionTimeout: parseInt(e.target.value) })}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={15}>15 minutes</option>
            <option value={30}>30 minutes</option>
            <option value={60}>1 hour</option>
            <option value={120}>2 hours</option>
            <option value={480}>8 hours</option>
          </select>
        </div>

        {/* Password Expiry */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Password Expiry (days)</label>
          <select
            value={settings.passwordExpiry}
            onChange={(e) => onChange({ ...settings, passwordExpiry: parseInt(e.target.value) })}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={30}>30 days</option>
            <option value={60}>60 days</option>
            <option value={90}>90 days</option>
            <option value={180}>6 months</option>
            <option value={365}>1 year</option>
            <option value={0}>Never</option>
          </select>
        </div>
      </div>
    </div>
  );
};

// Privacy Card
const PrivacyCard: React.FC<{
  settings: PrivacySettings;
  onChange: (settings: PrivacySettings) => void;
}> = ({ settings, onChange }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white flex items-center mb-6">
        <Eye className="w-5 h-5 mr-2" />
        Privacy Settings
      </h3>

      <div className="space-y-6">
        {/* Profile Visibility */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Profile Visibility</label>
          <select
            value={settings.profileVisibility}
            onChange={(e) => onChange({ ...settings, profileVisibility: e.target.value as any })}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="public">Public</option>
            <option value="friends">Friends Only</option>
            <option value="private">Private</option>
          </select>
        </div>

        {/* Privacy Toggles */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
            <div>
              <p className="text-white font-medium">Data Collection</p>
              <p className="text-sm text-gray-400">Allow us to collect usage data</p>
            </div>
            <ToggleSwitch
              enabled={settings.dataCollection}
              onChange={(enabled) => onChange({ ...settings, dataCollection: enabled })}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
            <div>
              <p className="text-white font-medium">Analytics</p>
              <p className="text-sm text-gray-400">Help us improve with analytics</p>
            </div>
            <ToggleSwitch
              enabled={settings.analytics}
              onChange={(enabled) => onChange({ ...settings, analytics: enabled })}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
            <div>
              <p className="text-white font-medium">Cookies</p>
              <p className="text-sm text-gray-400">Accept non-essential cookies</p>
            </div>
            <ToggleSwitch
              enabled={settings.cookies}
              onChange={(enabled) => onChange({ ...settings, cookies: enabled })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Danger Zone Card
const DangerZoneCard: React.FC = () => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-red-800 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-red-400 flex items-center mb-6">
        <AlertTriangle className="w-5 h-5 mr-2" />
        Danger Zone
      </h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-red-950/20 border border-red-800/50 rounded-lg">
          <div>
            <p className="text-white font-medium">Export Account Data</p>
            <p className="text-sm text-gray-400">Download all your account data</p>
          </div>
          <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-red-950/20 border border-red-800/50 rounded-lg">
          <div>
            <p className="text-white font-medium">Delete Account</p>
            <p className="text-sm text-gray-400">Permanently delete your account and all data</p>
          </div>
          {!showDeleteConfirm ? (
            <button 
              onClick={() => setShowDeleteConfirm(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition-colors">
                <Check className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Settings Component
const Settings: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // State for all settings
  const [userProfile, setUserProfile] = useState(mockUserProfile);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [appearance, setAppearance] = useState(mockAppearance);
  const [security, setSecurity] = useState(mockSecurity);
  const [privacy, setPrivacy] = useState(mockPrivacy);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Track changes
    setHasChanges(true);
  }, [notifications, appearance, security, privacy]);

  const handleSaveAll = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSaving(false);
    setHasChanges(false);
    
    // Show success message (you can implement a toast notification here)
    console.log('Settings saved successfully!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-700 rounded w-1/4" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 bg-gray-700 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Settings</h1>
            <p className="text-gray-400 mt-1">Manage your account settings and preferences.</p>
          </div>
          
          {hasChanges && (
            <button
              onClick={handleSaveAll}
              disabled={isSaving}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save All Changes</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <ProfileCard profile={userProfile} onUpdate={setUserProfile} />
            <AppearanceCard settings={appearance} onChange={setAppearance} />
            <PrivacyCard settings={privacy} onChange={setPrivacy} />
          </div>
          
          <div className="space-y-6">
            <NotificationsCard settings={notifications} onChange={setNotifications} />
            <SecurityCard settings={security} onChange={setSecurity} />
            <DangerZoneCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;