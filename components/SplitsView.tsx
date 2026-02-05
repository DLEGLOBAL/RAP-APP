
import React, { useState } from 'react';
import { Fingerprint, Users, Plus, Hash, CheckCircle2, History, AlertCircle, Share2, ShieldCheck, Lock } from 'lucide-react';
import { SplitSheet } from '../types';

const SplitsView: React.FC = () => {
  const [splits] = useState<SplitSheet[]>([
    {
      id: '0x3a...1f22',
      title: 'Diamond Nights (ft. Neon)',
      status: 'verified',
      creationDate: '2024-11-20',
      participants: [
        { name: 'Storm Hunter', percentage: 50, confirmed: true, identityVerified: true },
        { name: 'Neon Ghost', percentage: 25, confirmed: true, identityVerified: true },
        { name: 'Apex Beats', percentage: 25, confirmed: true, identityVerified: true }
      ]
    },
    {
      id: '0x9b...4e99',
      title: 'Cyber City Sessions',
      status: 'pending',
      creationDate: '2024-11-25',
      participants: [
        { name: 'Storm Hunter', percentage: 60, confirmed: true, identityVerified: true },
        { name: 'Echo One', percentage: 40, confirmed: false, identityVerified: false }
      ]
    }
  ]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white italic uppercase">Ownership Protocol</h2>
          <p className="text-gray-500 mt-1">Immutable split sheets powered by cryptographic identity.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#00D632] text-black px-6 py-3 rounded-2xl transition-all font-bold shadow-lg shadow-[#00D632]/20 hover:scale-105 active:scale-95">
          <Plus className="w-5 h-5" /> Generate Split Sheet
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {splits.map((split) => (
            <div key={split.id} className="glass p-8 rounded-[2rem] relative overflow-hidden group border border-white/5 hover:border-[#00D632]/20 transition-all">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                {split.status === 'verified' ? <ShieldCheck className="w-24 h-24 text-[#00D632]" /> : <History className="w-24 h-24 text-orange-500" />}
              </div>

              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{split.title}</h3>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-[10px] font-mono text-gray-500 bg-white/5 px-2 py-0.5 rounded">
                      <Hash className="w-3 h-3" /> {split.id}
                    </span>
                    <span className="text-[10px] text-gray-500 font-bold uppercase">{split.creationDate}</span>
                  </div>
                </div>
                <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border ${split.status === 'verified' ? 'bg-[#00D632]/10 border-[#00D632]/20 text-[#00D632]' : 'bg-orange-500/10 border-orange-500/20 text-orange-500'}`}>
                  {split.status === 'verified' ? <CheckCircle2 className="w-4 h-4" /> : <History className="w-4 h-4 animate-spin" />}
                  <span className="text-[10px] font-bold uppercase tracking-widest">{split.status}</span>
                </div>
              </div>

              <div className="space-y-4 relative z-10">
                {split.participants.map((p, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-700 to-gray-800 p-[1px]">
                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                           <img src={`https://picsum.photos/seed/${p.name}/40/40`} alt={p.name} />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{p.name}</p>
                        <div className="flex items-center gap-2">
                           <span className={`text-[9px] font-bold uppercase ${p.identityVerified ? 'text-[#00D632]' : 'text-red-500'}`}>
                             {p.identityVerified ? 'Verified' : 'Unverified Identity'}
                           </span>
                           <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                           <span className={`text-[9px] font-bold uppercase ${p.confirmed ? 'text-[#00D632]' : 'text-orange-500'}`}>
                             {p.confirmed ? 'Confirmed' : 'Pending Signature'}
                           </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold mono text-white">{p.percentage}%</p>
                      <p className="text-[9px] text-gray-500 uppercase tracking-tighter">Ownership Stake</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4 text-gray-500 text-[10px] font-bold uppercase">
                  <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Multi-Sig Active</span>
                  <span className="flex items-center gap-1"><Fingerprint className="w-3 h-3" /> ZK-Proof Hash</span>
                </div>
                <div className="flex gap-3">
                  <button className="p-2 bg-white/5 rounded-xl hover:bg-white/10 transition-all"><Share2 className="w-4 h-4" /></button>
                  <button className="px-4 py-2 bg-white/5 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all">Audit Lineage</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="glass p-6 rounded-[2rem] border border-orange-500/20">
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-500" />
              Rights Conflict Detected
            </h4>
            <div className="p-4 bg-orange-500/5 rounded-2xl border border-orange-500/10 mb-4">
              <p className="text-xs text-gray-300 mb-2 font-medium">Potential claim overlap on "Midnight City (Remix)" from third-party entity.</p>
              <p className="text-[10px] text-orange-500 font-bold uppercase">Rocc$tar Intelligence is auto-blocking registration.</p>
            </div>
            <button className="w-full py-3 bg-orange-500/10 text-orange-500 rounded-xl text-xs font-bold hover:bg-orange-500/20 transition-colors">
              Initiate Dispute Resolution
            </button>
          </div>

          <div className="glass p-6 rounded-[2rem]">
            <h4 className="font-bold mb-4">Ownership Analytics</h4>
            <div className="space-y-6">
               <div className="relative h-40 w-full flex items-center justify-center">
                 <div className="w-32 h-32 rounded-full border-[10px] border-[#00D632]/20 relative">
                   <div className="absolute inset-0 border-[10px] border-[#00D632] rounded-full" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }}></div>
                   <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p className="text-xl font-bold mono">84%</p>
                      <p className="text-[8px] text-gray-500 uppercase font-bold">In-Network</p>
                   </div>
                 </div>
               </div>
               <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="text-gray-500">INDIVIDUAL REPERTOIRE</span>
                    <span className="text-white">42 ASSETS</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="text-gray-500">TOTAL CATALOG VALUE</span>
                    <span className="text-white">$892,400</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplitsView;
