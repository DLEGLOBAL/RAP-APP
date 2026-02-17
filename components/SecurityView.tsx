
import React, { useState } from 'react';
// Fixed: Removed non-existent FileShield import
import { Shield, ShieldAlert, Zap, Lock, Eye, AlertTriangle, Fingerprint, Activity, CheckCircle, Smartphone, ShieldCheck, Mic, Search, Globe, Power, Key, Database, Binary } from 'lucide-react';
import { SecurityMetrics } from '../types';

interface Props {
  settings: {
    deepfakeAudio: boolean;
    vocalFingerprint: boolean;
    predatoryBlocking: boolean;
    identityVault: boolean;
    emotionalAlert: boolean;
    coreActive: boolean;
    zkpVerification: boolean;
  };
  metrics: SecurityMetrics;
  onToggle: (key: any) => void;
}

const SecurityView: React.FC<Props> = ({ settings, metrics, onToggle }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white italic uppercase leading-none">Security Infrastructure</h2>
          <p className="text-slate-500 mt-2 text-sm">Hardware-level Enclave Protection & Sovereign ZK-Identity.</p>
        </div>
        <div className="flex items-center gap-4 bg-slate-900/50 p-2 rounded-2xl border border-white/10">
          <div className="flex items-center gap-2 px-4 py-2">
            <div className={`w-3 h-3 rounded-full ${settings.coreActive ? 'bg-sky-400 shadow-[0_0_10px_#38BDF8]' : 'bg-red-500'}`}></div>
            <span className="text-xs font-bold text-slate-100 uppercase tracking-widest">
              {settings.coreActive ? 'Enclave Active' : 'Infrastructure Halted'}
            </span>
          </div>
          <button 
            onClick={() => onToggle('coreActive')}
            className={`p-3 rounded-xl transition-all ${settings.coreActive ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20' : 'bg-sky-500 text-white shadow-lg shadow-sky-500/20'}`}
          >
            <Power className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Crypto-Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <div className="glass p-5 rounded-[2rem] border border-sky-500/10">
            <div className="flex items-center gap-3 mb-2">
               <Key className="w-4 h-4 text-sky-400" />
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Proofs</span>
            </div>
            <p className="text-2xl font-bold mono text-slate-100">{metrics.zkProofCount}</p>
            <p className="text-[9px] text-sky-400 font-bold uppercase mt-1">ZK-Snark Protocols</p>
         </div>
         <div className="glass p-5 rounded-[2rem] border border-sky-500/10">
            <div className="flex items-center gap-3 mb-2">
               <Binary className="w-4 h-4 text-indigo-400" />
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Storage Cipher</span>
            </div>
            <p className="text-xl font-bold mono text-slate-100">AES-256-GCM</p>
            <p className="text-[9px] text-indigo-400 font-bold uppercase mt-1">Zero-Trust Layer</p>
         </div>
         <div className="glass p-5 rounded-[2rem] border border-sky-500/10">
            <div className="flex items-center gap-3 mb-2">
               <ShieldCheck className="w-4 h-4 text-emerald-400" />
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Node Integrity</span>
            </div>
            <p className="text-2xl font-bold mono text-slate-100">{metrics.enclaveIntegrity}%</p>
            <p className="text-[9px] text-emerald-400 font-bold uppercase mt-1">Distributed Consensus</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass p-8 rounded-[2.5rem] border border-sky-500/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform">
              <Database className="w-48 h-48 text-sky-400" />
            </div>
            
            <div className="flex items-center gap-4 mb-8">
               <div className="w-14 h-14 bg-sky-500 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.3)]">
                  <Lock className="text-white w-8 h-8" />
               </div>
               <div>
                  <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Sovereign Asset Vault</h3>
                  <p className="text-slate-500 text-sm">Hardware-compartmentalized metadata anchoring.</p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
               <div className="p-5 bg-slate-950/60 rounded-2xl border border-slate-800">
                  <p className="text-[10px] font-bold text-slate-500 uppercase mb-4 tracking-widest">Neural Traffic Monitoring</p>
                  <div className="flex items-end gap-1 h-12">
                     {[20, 45, 30, 80, 50, 90, 40, 60, 20, 35, 55, 75, 45, 30].map((h, i) => (
                       <div key={i} className={`flex-1 rounded-t-sm animate-pulse ${metrics.neuralDefenseStatus === 'OPTIMAL' ? 'bg-sky-400/50 shadow-[0_0_8px_rgba(56,189,248,0.3)]' : 'bg-orange-500/50 shadow-[0_0_8px_rgba(249,115,22,0.3)]'}`} style={{ height: `${h}%`, animationDelay: `${i*100}ms` }}></div>
                     ))}
                  </div>
                  <p className={`mt-4 text-[10px] font-bold ${metrics.neuralDefenseStatus === 'OPTIMAL' ? 'text-sky-400' : 'text-orange-400'}`}>
                    TRAFFIC: {metrics.neuralDefenseStatus === 'OPTIMAL' ? 'NOMINAL' : 'ACTIVE MITIGATION'}
                  </p>
               </div>
               <div className="p-5 bg-slate-950/60 rounded-2xl border border-slate-800 flex flex-col justify-center">
                  <p className="text-[10px] font-bold text-slate-500 uppercase mb-2 tracking-widest">Cyber-Defense Layer</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">DID Authentication</span>
                      <span className="text-emerald-400 font-bold uppercase text-[9px]">Anchored</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">ZK Proof-of-Person</span>
                      <span className="text-emerald-400 font-bold uppercase text-[9px]">Verified</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Regional Blocklisting</span>
                      <span className="text-sky-400 font-bold uppercase text-[9px]">Active (142 Nodes)</span>
                    </div>
                  </div>
               </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase text-slate-500 tracking-widest">Security Event Log</h4>
              {[
                { type: 'Blocked', label: 'Cross-Domain SQL Injection Attempt', origin: 'IP 182.xx.xx (Bot)', date: '10m ago' },
                { type: 'Verified', label: 'ZK-Proof Anchored to SplitSheet #42', origin: 'RAP Node Alpha', date: '1h ago' },
                { type: 'Protected', label: 'Neural Defense suppressed metadata scrape', origin: 'Global DSP Crawler', date: '3h ago' }
              ].map((ev, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-2xl border border-white/5 group hover:border-sky-500/20 transition-all">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-xl ${ev.type === 'Blocked' ? 'bg-red-500/10 text-red-500' : ev.type === 'Protected' ? 'bg-orange-500/10 text-orange-400' : 'bg-sky-500/10 text-sky-400'}`}>
                      {ev.type === 'Blocked' ? <ShieldAlert className="w-4 h-4" /> : ev.type === 'Protected' ? <Zap className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-100">{ev.label}</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-tighter">{ev.origin} • {ev.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass p-8 rounded-[2rem] border border-sky-500/20 shadow-lg shadow-sky-950/20">
            <h4 className="font-bold mb-6 text-lg flex items-center gap-2">
              <Binary className="w-5 h-5 text-sky-400" />
              Infrastructure Matrix
            </h4>
            <div className="space-y-6">
              {[
                { label: 'Neural Intrusion Detection', key: 'deepfakeAudio' },
                { label: 'Secure Enclave Storage', key: 'identityVault' },
                { label: 'Zero-Knowledge Audits', key: 'zkpVerification' },
                { label: 'Vocal Biometric Anchor', key: 'vocalFingerprint' },
                { label: 'Smart Contract Shield', key: 'predatoryBlocking' },
                { label: 'Emotion-Tone Forensics', key: 'emotionalAlert' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-300">{item.label}</span>
                  <div 
                    onClick={() => onToggle(item.key)} 
                    className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors shadow-inner ${(settings as any)[item.key] ? 'bg-sky-500' : 'bg-slate-800'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white shadow-md transition-transform ${(settings as any)[item.key] ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass p-8 rounded-[2rem] border border-indigo-500/20 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5">
                <ShieldCheck className="w-20 h-20" />
             </div>
             <h4 className="font-bold mb-4 flex items-center gap-2">
               <Fingerprint className="w-5 h-5 text-indigo-400" />
               DID Sovereignty
             </h4>
             <p className="text-[10px] text-slate-500 leading-relaxed mb-4">
                Your Decentralized Identity (DID) is the root of your ownership. It allows you to prove identity without revealing private keys or personal metadata to DSPs.
             </p>
             <div className="p-3 bg-slate-950 rounded-xl border border-white/5 mono text-[8px] text-sky-400/80 break-all mb-4">
                did:rap:eth:0x4d2a...8c2f
             </div>
             <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-all">
                Rotate Identity Key
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityView;
