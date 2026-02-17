
import React from 'react';
import { TrendingUp, ShieldCheck, FileWarning, Wallet, ArrowUpRight, Cpu, Lock, Globe, Zap, Mic, Eye, AlertCircle, PlusCircle, Users, Fingerprint, Activity } from 'lucide-react';
import { Reputation, AppView, UserProfile, SecurityMetrics } from '../types';

interface Props {
  profile: UserProfile;
  rep: Reputation;
  onNavigate: (view: AppView) => void;
  metrics: SecurityMetrics;
  stats: {
    splitsCount: number;
    auditCount: number;
    balance: number;
  };
}

const DashboardView: React.FC<Props> = ({ profile, rep, onNavigate, stats, metrics }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <section className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white italic uppercase leading-none">
            Hi, {profile.name.split(' ')[0]}
          </h2>
          <p className="text-slate-500 mt-2 text-sm">Sovereign DID: <span className="text-sky-500/70 mono text-[10px]">{profile.did}</span></p>
        </div>
        <div className="px-3 py-1 bg-sky-500/5 border border-sky-500/20 rounded-full flex items-center gap-2">
           <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></div>
           <span className="text-[9px] font-bold text-sky-400 uppercase tracking-widest">Enclave Secure</span>
        </div>
      </section>

      {/* Main Stats Card */}
      <div className="glass p-8 rounded-[2.5rem] bg-gradient-to-br from-sky-500/10 to-transparent border border-sky-500/20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
          <ShieldCheck className="w-32 h-32 text-sky-400" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold text-sky-400 uppercase tracking-[0.3em]">Reputation Score</span>
            <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></div>
          </div>
          <h3 className="text-6xl font-bold mono tracking-tighter text-slate-100">{rep.score}</h3>
          <p className="text-slate-400 text-sm mt-2 font-medium">{rep.rank}</p>
          
          <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Catalog Balance</p>
              <p className="text-xl font-bold mono text-sky-300">${stats.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">ZK-Protocols</p>
              <p className="text-xl font-bold mono text-sky-300">{stats.splitsCount} Secure Assets</p>
            </div>
          </div>
        </div>
      </div>

      {/* Security Telemetry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass p-5 rounded-3xl border border-sky-500/10 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sky-500/10 rounded-xl flex items-center justify-center">
                 <Activity className="w-5 h-5 text-sky-400" />
              </div>
              <div>
                 <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Intrusion Attempts</p>
                 <p className={`text-xl font-bold mono ${metrics.intrusionAttempts > 0 ? 'text-orange-500' : 'text-slate-100'}`}>
                    {metrics.intrusionAttempts} <span className="text-[10px] text-slate-500">BLOCKED</span>
                 </p>
              </div>
           </div>
        </div>
        <div className="glass p-5 rounded-3xl border border-sky-500/10 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center">
                 <Fingerprint className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                 <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Enclave Integrity</p>
                 <p className="text-xl font-bold mono text-slate-100">{metrics.enclaveIntegrity}%</p>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => onNavigate(AppView.CONTRACTS)}
          className="glass p-6 rounded-3xl flex flex-col items-center text-center gap-3 hover:border-sky-500/50 transition-all group"
        >
          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-sky-500/10 transition-colors">
            <PlusCircle className="w-6 h-6 text-slate-400 group-hover:text-sky-400" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-100">Audit Deal</span>
        </button>
        <button 
          onClick={() => onNavigate(AppView.SPLITS)}
          className="glass p-6 rounded-3xl flex flex-col items-center text-center gap-3 hover:border-sky-500/50 transition-all group"
        >
          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-sky-500/10 transition-colors">
            <Users className="w-6 h-6 text-slate-400 group-hover:text-sky-400" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-100">New Split</span>
        </button>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-lg">Active Neural Defense</h4>
          <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${metrics.neuralDefenseStatus === 'OPTIMAL' ? 'bg-sky-500/10 text-sky-400' : 'bg-orange-500/10 text-orange-400'}`}>
             {metrics.neuralDefenseStatus === 'OPTIMAL' ? 'Scanning...' : 'MITIGATING THREAT'}
          </span>
        </div>
        
        <div className="glass p-12 rounded-[2.5rem] border-dashed border-slate-800 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 relative overflow-hidden">
            <Zap className="w-8 h-8 text-slate-600 z-10" />
            <div className="absolute inset-0 bg-sky-500/5 animate-pulse"></div>
          </div>
          <h5 className="font-bold text-slate-300">No compromised assets found</h5>
          <p className="text-xs text-slate-500 mt-1">AI-driven security is monitoring {stats.splitsCount} assets across global nodes.</p>
        </div>
      </section>

      <div className="glass p-6 rounded-[2rem] border border-sky-500/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.3)]">
            <Cpu className="text-white w-6 h-6" />
          </div>
          <h4 className="font-bold">Advisor Core</h4>
        </div>
        <p className="text-sm text-slate-400 italic">"Detected unusual metadata shifts in Baltic territories. Neural Defense is anchoring your rights to local IP nodes."</p>
        <button 
          onClick={() => onNavigate(AppView.ADVISOR)}
          className="w-full mt-4 py-3 bg-sky-500 text-white font-bold rounded-2xl text-xs uppercase tracking-widest hover:bg-sky-600 transition-colors shadow-lg shadow-sky-500/20"
        >
          Secure Consultation
        </button>
      </div>
    </div>
  );
};

export default DashboardView;
