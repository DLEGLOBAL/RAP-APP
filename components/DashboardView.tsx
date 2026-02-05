
import React from 'react';
import { TrendingUp, ShieldCheck, FileWarning, Wallet, ArrowUpRight, Cpu, Lock, Globe, Zap, Mic, Eye, AlertCircle } from 'lucide-react';
import { Reputation, AppView } from '../types';

interface Props {
  rep: Reputation;
  onNavigate: (view: AppView) => void;
}

const DashboardView: React.FC<Props> = ({ rep, onNavigate }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white italic uppercase">RAP Intelligence</h2>
          <p className="text-gray-500 mt-1">Real-time protection by ROCC$TAR AI.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="glass px-4 py-2 rounded-full flex items-center gap-2 border-[#00D632]/30">
            <div className="w-2 h-2 rounded-full bg-[#00D632] animate-pulse"></div>
            <span className="text-xs font-medium text-gray-300">SHIELD: ACTIVE</span>
          </div>
          <div className="glass px-4 py-2 rounded-full flex items-center gap-2">
            <Lock className="w-3 h-3 text-[#00D632]" />
            <span className="text-xs font-medium text-gray-300">ZERO-TRUST</span>
          </div>
        </div>
      </div>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass p-5 rounded-3xl border-l-4 border-[#00D632]">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-[#00D632]/10 rounded-xl">
              <ShieldCheck className="w-5 h-5 text-[#00D632]" />
            </div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">RAP Score</span>
          </div>
          <h3 className="text-4xl font-bold mono">{rep.score}</h3>
          <p className="text-xs text-gray-400 mt-1">{rep.rank}</p>
        </div>

        <div className="glass p-5 rounded-3xl border-l-4 border-blue-500">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-500/10 rounded-xl">
              <TrendingUp className="w-5 h-5 text-blue-500" />
            </div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Equity Value</span>
          </div>
          <h3 className="text-4xl font-bold mono">$4.2M</h3>
          <p className="text-xs text-green-400 mt-1">+24% projected sync</p>
        </div>

        <div className="glass p-5 rounded-3xl border-l-4 border-purple-500">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-purple-500/10 rounded-xl">
              <Cpu className="w-5 h-5 text-purple-500" />
            </div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Voice ID</span>
          </div>
          <h3 className="text-4xl font-bold mono">LOCK</h3>
          <p className="text-xs text-gray-400 mt-1">Biometric Hash Verified</p>
        </div>

        <div className="glass p-5 rounded-3xl border-l-4 border-orange-500">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-orange-500/10 rounded-xl">
              <FileWarning className="w-5 h-5 text-orange-500" />
            </div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Forensics</span>
          </div>
          <h3 className="text-4xl font-bold mono">SEC</h3>
          <p className="text-xs text-[#00D632] mt-1">Scanning for Clones</p>
        </div>
      </div>

      {/* Main Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass p-6 rounded-[2rem] relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
               <Wallet className="w-32 h-32" />
             </div>
             <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
               <TrendingUp className="w-5 h-5 text-[#00D632]" />
               Recoupment & Flow Analysis
             </h4>
             <div className="h-48 w-full flex items-end gap-2 px-2 mt-8">
               {[40, 65, 30, 85, 45, 90, 60, 75, 55, 100, 80, 95].map((val, i) => (
                 <div key={i} className="flex-1 group/bar relative">
                   <div 
                    className="w-full bg-gradient-to-t from-[#00D632]/10 to-[#00D632]/60 rounded-t-sm transition-all duration-500 group-hover/bar:to-[#00D632]"
                    style={{ height: `${val}%` }}
                   ></div>
                 </div>
               ))}
             </div>
             <div className="flex justify-between mt-4 px-2">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                  <span key={m} className="text-[10px] text-gray-500 font-bold uppercase">{m}</span>
                ))}
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="glass p-6 rounded-[2rem]">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="font-bold">Predatory Clause Alerts</h4>
                  <button onClick={() => onNavigate(AppView.CONTRACTS)} className="text-[#00D632] text-xs font-bold hover:underline flex items-center gap-1">
                    Auto-Redact <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer border border-red-500/20 bg-red-500/5">
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-sm font-bold truncate">Hidden Recoupment Fee</p>
                      <p className="text-[10px] text-red-400">Section 14.2: Audit Block</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer border border-white/5">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                      <FileWarning className="w-5 h-5 text-orange-500" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-sm font-bold truncate">Reversion Risk Alert</p>
                      <p className="text-[10px] text-gray-500">7-Year Term detected</p>
                    </div>
                  </div>
                </div>
             </div>

             <div className="glass p-6 rounded-[2rem]">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="font-bold">Deepfake Scanner</h4>
                  <button onClick={() => onNavigate(AppView.SECURITY)} className="text-[#00D632] text-xs font-bold hover:underline flex items-center gap-1">
                    View Logs <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 rounded-2xl bg-[#00D632]/5 border border-[#00D632]/20">
                    <div className="w-10 h-10 rounded-xl bg-[#00D632]/10 flex items-center justify-center">
                      <Mic className="w-5 h-5 text-[#00D632]" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-sm font-bold truncate">Voice Clone Blocked</p>
                      <p className="text-[10px] text-gray-500">Source: Twitter AI Bot</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer border border-white/5">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                      <Eye className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-sm font-bold truncate">Asset Monitoring</p>
                      <p className="text-[10px] text-gray-500">42 Platforms Clean</p>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass p-6 rounded-[2rem] border border-[#00D632]/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#00D632] rounded-2xl flex items-center justify-center shadow-lg shadow-[#00D632]/20">
                <Cpu className="text-black w-7 h-7" />
              </div>
              <div>
                <h4 className="font-bold text-lg">RAP Advisor</h4>
                <p className="text-[10px] text-[#00D632] font-bold uppercase tracking-wider">Strategic Mode active</p>
              </div>
            </div>
            <div className="bg-black/50 p-4 rounded-2xl border border-white/5 mb-4">
              <p className="text-sm text-gray-300 italic">"Detected a 12% royalty leakage in German mechanical collections. Initiate RAP Retrieval?"</p>
            </div>
            <button 
              onClick={() => onNavigate(AppView.ADVISOR)}
              className="w-full py-3 bg-[#00D632] text-black font-bold rounded-2xl hover:bg-[#00D632]/90 transition-colors"
            >
              Recover Royalties
            </button>
          </div>

          <div className="glass p-6 rounded-[2rem]">
            <h4 className="font-bold mb-4">Defense Matrix</h4>
            <div className="space-y-4">
              {[
                { label: 'Deepfake Defense', status: 'Optimal', icon: Mic },
                { label: 'Rights Lineage', status: 'Synced', icon: Globe },
                { label: 'Fraud Engine', status: 'Active', icon: Zap },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-300">{item.label}</span>
                  </div>
                  <span className="text-[10px] font-bold text-[#00D632] bg-[#00D632]/10 px-2 py-0.5 rounded-full">{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
