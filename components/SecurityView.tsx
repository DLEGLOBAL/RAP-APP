
import React, { useState } from 'react';
import { Shield, ShieldAlert, Zap, Lock, Eye, AlertTriangle, Fingerprint, Activity, CheckCircle, Smartphone, ShieldCheck, Mic, Search, Globe, FileShield } from 'lucide-react';

const SecurityView: React.FC = () => {
  const [activeProtection, setActiveProtection] = useState(true);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white italic uppercase">Security Core</h2>
          <p className="text-gray-500 mt-1">Deep-fake asset protection and voice fingerprinting.</p>
        </div>
        <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/10">
          <div className="flex items-center gap-2 px-4 py-2">
            <div className={`w-3 h-3 rounded-full ${activeProtection ? 'bg-[#00D632] shadow-[0_0_10px_#00D632]' : 'bg-red-500'}`}></div>
            <span className="text-xs font-bold text-white uppercase tracking-widest">
              {activeProtection ? 'Defense Active' : 'Offline'}
            </span>
          </div>
          <button 
            onClick={() => setActiveProtection(!activeProtection)}
            className={`px-6 py-2 rounded-xl text-xs font-bold uppercase transition-all ${activeProtection ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20' : 'bg-[#00D632] text-black'}`}
          >
            {activeProtection ? 'Emergency Shutdown' : 'Activate Core'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Voice Fingerprint Section */}
          <div className="glass p-8 rounded-[2.5rem] border border-[#00D632]/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform">
              <Mic className="w-48 h-48 text-[#00D632]" />
            </div>
            
            <div className="flex items-center gap-4 mb-8">
               <div className="w-14 h-14 bg-[#00D632] rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(0,214,50,0.3)]">
                  <Fingerprint className="text-black w-8 h-8" />
               </div>
               <div>
                  <h3 className="text-2xl font-bold text-white">Voice Fingerprint Registry</h3>
                  <p className="text-gray-500 text-sm">Immutable vocal biometric ID active.</p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
               <div className="p-5 bg-black/40 rounded-2xl border border-white/5">
                  <p className="text-[10px] font-bold text-gray-500 uppercase mb-4 tracking-widest">Spectral Analysis</p>
                  <div className="flex items-end gap-1 h-12">
                     {[20, 45, 30, 80, 50, 90, 40, 60, 20, 35].map((h, i) => (
                       <div key={i} className="flex-1 bg-[#00D632]/40 rounded-t-sm animate-pulse" style={{ height: `${h}%`, animationDelay: `${i*100}ms` }}></div>
                     ))}
                  </div>
                  <p className="mt-4 text-[10px] font-bold text-[#00D632]">MATCH: 100% AUTHENTIC</p>
               </div>
               <div className="p-5 bg-black/40 rounded-2xl border border-white/5">
                  <p className="text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-widest">Protection Status</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Deepfake Detection</span>
                      <span className="text-[#00D632] font-bold">LOCKED</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Clone Auto-Takedown</span>
                      <span className="text-[#00D632] font-bold">ON</span>
                    </div>
                  </div>
               </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase text-gray-500 tracking-widest">Media Forensics Log</h4>
              {[
                { type: 'Blocked', label: 'Unauthorized AI Vocal Clone', origin: 'TikTok / Global', date: '2h ago' },
                { type: 'Verified', label: 'Studio Master Watermarking', origin: 'Local Export', date: '5h ago' },
                { type: 'Takedown', label: 'Fraudulent ContentID Claim', origin: 'YouTube ContentID', date: 'Yesterday' }
              ].map((ev, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-[#00D632]/20 transition-all">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-xl ${ev.type === 'Blocked' || ev.type === 'Takedown' ? 'bg-red-500/10 text-red-500' : 'bg-[#00D632]/10 text-[#00D632]'}`}>
                      {ev.type === 'Blocked' ? <ShieldAlert className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{ev.label}</p>
                      <p className="text-[10px] text-gray-500 uppercase">{ev.origin} • {ev.date}</p>
                    </div>
                  </div>
                  <button className="text-[10px] font-bold uppercase text-gray-500 hover:text-[#00D632] transition-colors">Details</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass p-8 rounded-[2rem] border border-[#00D632]/20">
            <h4 className="font-bold mb-6 text-lg flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#00D632]" />
              AI Defense Matrix
            </h4>
            <div className="space-y-6">
              {[
                { label: 'Deepfake Audio Takedown', enabled: true },
                { label: 'Vocal Fingerprint Auth', enabled: true },
                { label: 'Predatory Term Blocking', enabled: true },
                { label: 'Social Identity Vault', enabled: true },
                { label: 'Emotional Manipulation Alert', enabled: true }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-300">{item.label}</span>
                  <div 
                    onClick={() => {}} 
                    className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${item.enabled ? 'bg-[#00D632]' : 'bg-white/10'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-black transition-transform ${item.enabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 bg-white/5 rounded-xl text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/10 transition-all">
               Configure Matrix Logic
            </button>
          </div>

          <div className="glass p-8 rounded-[2rem] border border-blue-500/20">
             <h4 className="font-bold mb-4 flex items-center gap-2">
               <Globe className="w-5 h-5 text-blue-500" />
               Rights Mapping
             </h4>
             <div className="flex flex-col items-center text-center">
                <div className="w-full h-32 bg-black/40 rounded-2xl border border-white/5 flex items-center justify-center relative overflow-hidden">
                   <div className="absolute inset-0 opacity-20">
                      <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/30 to-transparent"></div>
                   </div>
                   <Search className="w-8 h-8 text-blue-500 animate-pulse" />
                </div>
                <p className="mt-4 text-xs text-gray-400">
                  Global rights graph mapping 42 assets across 180 territories.
                </p>
                <div className="mt-6 flex gap-2 w-full">
                  <div className="flex-1 p-3 bg-white/5 rounded-xl text-center">
                    <p className="text-xl font-bold mono">12k</p>
                    <p className="text-[8px] text-gray-500 uppercase font-bold">Nodes Verified</p>
                  </div>
                  <div className="flex-1 p-3 bg-white/5 rounded-xl text-center">
                    <p className="text-xl font-bold mono">0</p>
                    <p className="text-[8px] text-red-500 uppercase font-bold">Conflicts</p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityView;
