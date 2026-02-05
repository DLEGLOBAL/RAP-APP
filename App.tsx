
import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  LayoutDashboard, 
  FileText, 
  Users, 
  DollarSign, 
  MessageSquare, 
  AlertTriangle,
  Lock,
  Menu,
  X,
  Plus,
  ArrowUpRight,
  TrendingUp,
  CheckCircle2,
  Cpu,
  Fingerprint
} from 'lucide-react';
import { AppView, Reputation, SplitSheet, PayoutTransaction } from './types';
import DashboardView from './components/DashboardView';
import ContractsView from './components/ContractsView';
import SplitsView from './components/SplitsView';
import PayoutsView from './components/PayoutsView';
import SecurityView from './components/SecurityView';
import AdvisorView from './components/AdvisorView';
import OnboardingView from './components/OnboardingView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.ONBOARDING);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  
  // Mock Data
  const [userReputation] = useState<Reputation>({
    score: 982,
    rank: 'Elite Advocate',
    complianceRate: 100,
    totalDeals: 14
  });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  if (!hasCompletedOnboarding && currentView === AppView.ONBOARDING) {
    return <OnboardingView onComplete={() => {
      setHasCompletedOnboarding(true);
      setCurrentView(AppView.DASHBOARD);
    }} />;
  }

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD: return <DashboardView rep={userReputation} onNavigate={setCurrentView} />;
      case AppView.CONTRACTS: return <ContractsView />;
      case AppView.SPLITS: return <SplitsView />;
      case AppView.PAYOUTS: return <PayoutsView />;
      case AppView.SECURITY: return <SecurityView />;
      case AppView.ADVISOR: return <AdvisorView />;
      default: return <DashboardView rep={userReputation} onNavigate={setCurrentView} />;
    }
  };

  const navItems = [
    { id: AppView.DASHBOARD, label: 'Intelligence', icon: LayoutDashboard },
    { id: AppView.CONTRACTS, label: 'Contracts', icon: FileText },
    { id: AppView.SPLITS, label: 'Rights & Splits', icon: Users },
    { id: AppView.PAYOUTS, label: 'Audit Trail', icon: DollarSign },
    { id: AppView.SECURITY, label: 'Security', icon: Shield },
    { id: AppView.ADVISOR, label: 'AI Advisor', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col md:flex-row overflow-hidden">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 glass sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#00D632] rounded-lg flex items-center justify-center">
            <Shield className="text-black w-5 h-5" />
          </div>
          <span className="font-bold tracking-tighter text-lg uppercase italic">RAP</span>
        </div>
        <button onClick={toggleSidebar} className="p-2">
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar - Desktop & Tablet */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 glass border-r border-white/10 transition-transform duration-300 md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full p-6">
          <div className="hidden md:flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-[#00D632] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,214,50,0.3)]">
              <Shield className="text-black w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold tracking-tighter text-2xl uppercase italic leading-none">RAP</h1>
              <span className="text-[10px] text-[#00D632] font-bold uppercase tracking-widest block mt-1">REAL ARTIST PROTECTION</span>
            </div>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${currentView === item.id 
                    ? 'bg-[#00D632]/10 text-[#00D632] border border-[#00D632]/20' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'}
                `}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-white/10">
             <div className="mb-4">
               <p className="text-[8px] text-gray-600 font-bold uppercase tracking-[0.2em]">Engineered by</p>
               <p className="text-[10px] text-gray-400 font-bold italic">ROCC$TAR AI</p>
             </div>
            <div className="glass p-4 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#00D632] to-blue-500 p-[1px]">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                  <img src="https://picsum.photos/seed/artist1/40/40" alt="Artist Profile" />
                </div>
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-xs font-bold truncate">STORM HUNTER</p>
                <p className="text-[10px] text-gray-500 truncate">ID: 0x8a92...2b1c</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-[#00D632] animate-pulse"></div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto scrollbar-hide bg-[#050505] relative">
        <div className="max-w-6xl mx-auto p-4 md:p-8">
          {renderView()}
        </div>
        
        {/* Floating Action Button (Mobile Only) */}
        <button 
          onClick={() => setCurrentView(AppView.ADVISOR)}
          className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-[#00D632] text-black rounded-full shadow-2xl flex items-center justify-center z-50 hover:scale-105 transition-transform"
        >
          <MessageSquare fill="currentColor" className="w-6 h-6" />
        </button>
      </main>
    </div>
  );
};

export default App;
