
import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  LayoutDashboard, 
  FileText, 
  Users, 
  DollarSign, 
  MessageSquare, 
  User,
  Settings,
  Bell,
  Lock,
  BookOpen
} from 'lucide-react';
import { AppView, Reputation, UserProfile, SplitSheet, PayoutTransaction, ContractAnalysis, SecurityMetrics } from './types';
import DashboardView from './components/DashboardView';
import ContractsView from './components/ContractsView';
import SplitsView from './components/SplitsView';
import PayoutsView from './components/PayoutsView';
import SecurityView from './components/SecurityView';
import AdvisorView from './components/AdvisorView';
import OnboardingView from './components/OnboardingView';
import LandingView from './components/LandingView';
import KnowledgeBaseView from './components/KnowledgeBaseView';
import { monitorThreats } from './services/securityService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LANDING);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  
  // Security Layer State
  const [metrics, setMetrics] = useState<SecurityMetrics>({
    intrusionAttempts: 0,
    encryptionStrength: 'AES-256-GCM',
    neuralDefenseStatus: 'OPTIMAL',
    zkProofCount: 0,
    enclaveIntegrity: 99.99
  });

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [reputation, setReputation] = useState<Reputation>({
    score: 0,
    rank: 'New Advocate',
    complianceRate: 100,
    totalDeals: 0
  });

  const [splits, setSplits] = useState<SplitSheet[]>([]);
  const [payouts, setPayouts] = useState<PayoutTransaction[]>([]);
  const [contractAudits, setContractAudits] = useState<ContractAnalysis[]>([]);
  const [securitySettings, setSecuritySettings] = useState({
    deepfakeAudio: true,
    vocalFingerprint: true,
    predatoryBlocking: true,
    identityVault: true,
    emotionalAlert: true,
    coreActive: true,
    zkpVerification: true
  });

  // Active Intrusion Detection Loop
  useEffect(() => {
    if (!hasCompletedOnboarding) return;
    const interval = setInterval(() => {
      const newThreats = monitorThreats();
      if (newThreats > 0) {
        setMetrics(prev => ({
          ...prev,
          intrusionAttempts: prev.intrusionAttempts + newThreats,
          neuralDefenseStatus: 'REACTIVE'
        }));
        // Reset status after a few seconds
        setTimeout(() => setMetrics(prev => ({ ...prev, neuralDefenseStatus: 'OPTIMAL' })), 5000);
      }
    }, 15000);
    return () => clearInterval(interval);
  }, [hasCompletedOnboarding]);

  const handleOnboardingComplete = (profileData: UserProfile) => {
    setUserProfile(profileData);
    setReputation({
      score: 820,
      rank: 'Elite Sovereign',
      complianceRate: 100,
      totalDeals: 0
    });
    setHasCompletedOnboarding(true);
    setCurrentView(AppView.DASHBOARD);
  };

  const addSplit = (newSplit: SplitSheet) => {
    setSplits(prev => [newSplit, ...prev]);
    setReputation(prev => ({ ...prev, totalDeals: prev.totalDeals + 1, score: prev.score + 5 }));
    setMetrics(prev => ({ ...prev, zkProofCount: prev.zkProofCount + 1 }));
  };

  const updateSplit = (splitId: string, updates: Partial<SplitSheet>) => {
    setSplits(prev => prev.map(s => s.id === splitId ? { ...s, ...updates } : s));
  };

  const addPayouts = (newPayouts: PayoutTransaction[]) => {
    setPayouts(prev => [...newPayouts, ...prev]);
  };

  const addContractAudit = (audit: ContractAnalysis) => {
    setContractAudits(prev => [audit, ...prev]);
    if (audit.riskScore < 4) setReputation(prev => ({ ...prev, score: prev.score + 10 }));
  };

  const toggleSecurity = (key: keyof typeof securitySettings) => {
    setSecuritySettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (currentView === AppView.LANDING) {
    return <LandingView 
      onGetStarted={() => setCurrentView(AppView.ONBOARDING)} 
      onViewKnowledge={() => setCurrentView(AppView.KNOWLEDGEBASE)}
    />;
  }

  if (currentView === AppView.KNOWLEDGEBASE) {
    return <KnowledgeBaseView onBack={() => setCurrentView(hasCompletedOnboarding ? AppView.DASHBOARD : AppView.LANDING)} />;
  }

  if (!hasCompletedOnboarding) {
    return <OnboardingView onComplete={handleOnboardingComplete} />;
  }

  const navItems = [
    { id: AppView.DASHBOARD, label: 'Home', icon: LayoutDashboard },
    { id: AppView.CONTRACTS, label: 'Legal', icon: FileText },
    { id: AppView.SPLITS, label: 'Splits', icon: Users },
    { id: AppView.PAYOUTS, label: 'Wallet', icon: DollarSign },
    { id: AppView.ADVISOR, label: 'Advisor', icon: MessageSquare },
  ];

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD: 
        return <DashboardView 
          profile={userProfile!} 
          rep={reputation} 
          onNavigate={setCurrentView} 
          metrics={metrics}
          stats={{ splitsCount: splits.length, auditCount: contractAudits.length, balance: payouts.reduce((acc, p) => acc + p.amount, 0) }} 
        />;
      case AppView.CONTRACTS: return <ContractsView history={contractAudits} onNewAudit={addContractAudit} />;
      case AppView.SPLITS: return <SplitsView splits={splits} onCreateSplit={addSplit} onUpdateSplit={updateSplit} />;
      case AppView.PAYOUTS: return <PayoutsView transactions={payouts} onSync={addPayouts} />;
      case AppView.SECURITY: return <SecurityView settings={securitySettings} metrics={metrics} onToggle={toggleSecurity} />;
      case AppView.ADVISOR: return <AdvisorView userContext={{ profile: userProfile!, stats: { splits, payouts, contractAudits } }} onNavigate={setCurrentView} />;
      default: return <DashboardView profile={userProfile!} rep={reputation} onNavigate={setCurrentView} metrics={metrics} stats={{ splitsCount: splits.length, auditCount: contractAudits.length, balance: 0 }} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 selection:bg-sky-500/30 flex justify-center">
      <div className="w-full max-w-md md:max-w-4xl flex flex-col h-screen relative bg-[#020617] shadow-2xl shadow-sky-900/10">
        
        <header className="px-6 pt-12 pb-4 flex items-center justify-between bg-[#020617]/80 backdrop-blur-xl sticky top-0 z-50 border-b border-white/5">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView(AppView.DASHBOARD)}>
            <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.3)]">
              <Shield className="text-white w-5 h-5" />
            </div>
            <div>
               <h1 className="text-xl font-bold tracking-tighter italic uppercase text-slate-100">RAP</h1>
               <div className="flex items-center gap-1">
                  <div className={`w-1 h-1 rounded-full ${metrics.neuralDefenseStatus === 'OPTIMAL' ? 'bg-sky-400' : 'bg-orange-500'} animate-pulse`}></div>
                  <span className="text-[7px] font-bold text-slate-500 uppercase tracking-widest">{metrics.neuralDefenseStatus} Defense</span>
               </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setCurrentView(AppView.KNOWLEDGEBASE)} className="p-2 rounded-full bg-slate-800/50 border border-white/5 hover:border-sky-500/30 transition-all">
              <BookOpen className="w-5 h-5 text-slate-400" />
            </button>
            <button onClick={() => setCurrentView(AppView.SECURITY)} className="p-2 rounded-full bg-slate-800/50 border border-sky-500/10 hover:border-sky-500/30 transition-all">
              <Lock className="w-5 h-5 text-sky-400" />
            </button>
            <button className="p-1 rounded-full border border-sky-500/30 bg-sky-500/5">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-800 flex items-center justify-center">
                {userProfile?.avatar ? (
                  <img src={userProfile.avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-4 h-4 text-slate-400" />
                )}
              </div>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto scrollbar-hide px-6 py-6 pb-32">
          {renderView()}
        </main>

        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md md:max-w-4xl glass border-t border-sky-500/10 px-6 pt-3 pb-8 flex items-center justify-between z-50">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                currentView === item.id ? 'text-sky-400' : 'text-slate-500'
              }`}
            >
              <div className={`p-2 rounded-xl transition-all ${
                currentView === item.id ? 'bg-sky-500/10 scale-110 shadow-inner shadow-sky-500/5' : 'bg-transparent'
              }`}>
                <item.icon className={`w-6 h-6 ${currentView === item.id ? 'drop-shadow-[0_0_5px_rgba(56,189,248,0.5)]' : ''}`} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default App;
