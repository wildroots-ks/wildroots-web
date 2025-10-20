import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAdminStore } from '@/store/adminStore';
import {
  LogOut,
  Settings as SettingsIcon,
  Clock,
  Megaphone,
  BookOpen,
  Home,
} from 'lucide-react';
import SettingsTab from '@/pages/admin/tabs/SettingsTab';
import HoursTab from '@/pages/admin/tabs/HoursTab';
import BannersTab from '@/pages/admin/tabs/BannersTab';
import ClassesTab from '@/pages/admin/tabs/ClassesTab';

type TabType = 'settings' | 'hours' | 'banners' | 'classes';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('settings');
  const user = useAdminStore((state) => state.user);
  const logout = useAdminStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const tabs = [
    { id: 'settings' as TabType, label: 'Settings', icon: SettingsIcon },
    { id: 'hours' as TabType, label: 'Hours', icon: Clock },
    { id: 'banners' as TabType, label: 'Banners', icon: Megaphone },
    { id: 'classes' as TabType, label: 'Classes', icon: BookOpen },
  ];

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Wild Roots Garden & Gifts</title>
      </Helmet>

      <div className="min-h-screen bg-earth-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-serif font-bold text-sage-800">
                  Wild Roots Admin
                </h1>
                <span className="text-sm text-sage-600">
                  Welcome, {user?.name}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sage-700 hover:text-sage-900 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500 rounded"
                >
                  <Home className="w-4 h-4" />
                  <span className="hidden sm:inline">View Site</span>
                </a>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-sage-700 hover:bg-sage-800 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Tabs */}
        <div className="bg-white border-b border-earth-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex -mb-px space-x-8 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-1 py-4 border-b-2 font-medium text-sm transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-sage-500 ${
                      isActive
                        ? 'border-sage-700 text-sage-900'
                        : 'border-transparent text-sage-600 hover:text-sage-900 hover:border-sage-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'settings' && <SettingsTab />}
          {activeTab === 'hours' && <HoursTab />}
          {activeTab === 'banners' && <BannersTab />}
          {activeTab === 'classes' && <ClassesTab />}
        </main>
      </div>
    </>
  );
}