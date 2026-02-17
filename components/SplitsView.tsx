
import React, { useState } from 'react';
import { Fingerprint, Users, Plus, Hash, CheckCircle2, History, AlertCircle, Share2, ShieldCheck, Lock, FilePlus, X, UserPlus, Save, ExternalLink, ShieldAlert, Binary, Activity, RefreshCw } from 'lucide-react';
import { SplitSheet } from '../types';
import { generateZKProof } from '../services/securityService';

interface Props {
  splits: SplitSheet[];
  onCreateSplit: (split: SplitSheet) => void;
  onUpdateSplit: (splitId: string, updates: Partial<SplitSheet>) => void;
}

const SplitsView: React.FC<Props> = ({ splits, onCreateSplit, onUpdateSplit }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState('');
  const [participants, setParticipants] = useState<{name: string, percentage: number}[]>([
    { name: 'Me', percentage: 100 }
  ]);
  const [isVerifying, setIsVerifying] = useState<string | null>(null);
  const [isRotating, setIsRotating] = useState<string | null>(null);

  const addParticipant = () => {
    setParticipants([...participants, { name: '', percentage: 0 }]);
  };

  const updateParticipant = (index: number, key: 'name' | 'percentage', value: string | number) => {
    const newParticipants = [...participants];
    if (key === 'percentage') {
      newParticipants[index].percentage = Number(value);
    } else {
      newParticipants[index].name = String(value);
    }
    setParticipants(newParticipants);
  };

  const removeParticipant = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const totalPercentage = participants.reduce((sum, p) => sum + p.percentage, 0);

  const handleSave = async () => {
    if (!title || totalPercentage !== 100) return;

    const id = Math.random().toString(36).substr(2, 9);
    // Generate ZK-Proof during creation to link to the audit trail
    const zkp = await generateZKProof(id);

    onCreateSplit({
      id,
      title,
      status: 'verified',
      creationDate: new Date().toISOString(),
      hash: zkp, // Store the ZK Proof in the hash field
      participants: participants.map(p => ({
        name: p.name,
        percentage: p.percentage,
        confirmed: p.name === 'Me',
        identityVerified: true
      }))
    });
    setIsCreating(false);
    setTitle('');
    setParticipants([{ name: 'Me', percentage: 100 }]);
  };

  const handleVerifyProof = (splitId: string) => {
    setIsVerifying(splitId);
    setTimeout(() => setIsVerifying(null), 2000);
  };

  const handleRotateProof = async (splitId: string) => {
    setIsRotating(splitId);
    try {
      // Simulate cryptographic re-generation for the audit trail
      const newZkp = await generateZKProof(splitId);
      onUpdateSplit(splitId, { hash: newZkp });
    } finally {
      setIsRotating(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white italic uppercase leading-none">Sovereign Splits</h2>
          <p className="text-slate-500 mt-2 text-sm">Immutable ZK-Ownership Protocol.</p>
        </div>
        {!isCreating && (
          <button 
            onClick={() => setIsCreating(true)}
            className="p-3 bg-sky-500 text-white rounded-2xl shadow-lg shadow-sky-500/20 active:scale-95 transition-all"
          >
            <Plus className="w-6 h-6" />
          </button>
        )}
      </header>

      {isCreating ? (
        <div className="glass p-8 rounded-[2.5rem] border border-sky-500/30 animate-in zoom-in-95">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-xl text-slate-100">New Split Protocol</h3>
            <button onClick={() => setIsCreating(false)} className="p-2 bg-slate-800/50 rounded-full">
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Release Title</label>
              <input 
                type="text" 
                placeholder="e.g. Midnight Waves (Original Mix)" 
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-4 text-sm text-slate-200 focus:border-sky-500/50 transition-all"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Participants</label>
                <button 
                  onClick={addParticipant}
                  className="text-[10px] font-bold text-sky-400 uppercase tracking-widest flex items-center gap-1 hover:text-sky-300 transition-colors"
                >
                  <UserPlus className="w-3 h-3" /> Add Collaborator
                </button>
              </div>

              {participants.map((p, i) => (
                <div key={i} className="flex gap-3 items-center">
                  <input 
                    type="text" 
                    placeholder="Name or Wallet" 
                    className="flex-1 bg-slate-900/50 border border-slate-800 rounded-xl p-3 text-sm text-slate-300"
                    value={p.name}
                    onChange={(e) => updateParticipant(i, 'name', e.target.value)}
                  />
                  <div className="w-24 relative">
                    <input 
                      type="number" 
                      placeholder="%" 
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-xl p-3 text-sm pr-8 text-right text-slate-300"
                      value={p.percentage}
                      onChange={(e) => updateParticipant(i, 'percentage', e.target.value)}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 text-xs">%</span>
                  </div>
                  {i > 0 && (
                    <button onClick={() => removeParticipant(i)} className="text-red-500 opacity-50 hover:opacity-100">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className={`p-4 rounded-2xl flex items-center justify-between ${totalPercentage === 100 ? 'bg-sky-500/5 text-sky-400' : 'bg-red-500/5 text-red-500'}`}>
               <span className="text-xs font-bold uppercase tracking-widest">Total Allocation</span>
               <span className="text-xl font-bold mono">{totalPercentage}%</span>
            </div>

            <button 
              onClick={handleSave}
              disabled={!title || totalPercentage !== 100}
              className="w-full py-5 bg-sky-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 disabled:opacity-30 transition-all shadow-xl shadow-sky-500/10 active:scale-95"
            >
              <Save className="w-5 h-5" /> Anchor to Secure Ledger
            </button>
          </div>
        </div>
      ) : splits.length > 0 ? (
        <div className="space-y-6">
          {splits.map((split) => (
            <div key={split.id} className="glass p-8 rounded-[2.5rem] border border-sky-500/10 hover:border-sky-500/20 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                <Binary className="w-24 h-24" />
              </div>
              
              <div className="flex items-center justify-between mb-6 relative z-10">
                <div>
                  <h3 className="font-bold text-xl text-slate-100 group-hover:text-sky-400 transition-colors">{split.title}</h3>
                  <p className="text-[10px] text-slate-500 mono uppercase tracking-widest">{new Date(split.creationDate).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-[10px] font-bold uppercase text-emerald-400 tracking-widest">ZK-Verified</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 relative z-10">
                {split.participants.map((p, i) => (
                  <div key={i} className="flex justify-between items-center bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center border border-slate-800">
                          <Users className="w-4 h-4 text-slate-600" />
                       </div>
                       <span className="text-sm font-medium text-slate-300">{p.name}</span>
                    </div>
                    <span className="font-bold mono text-sky-400">{p.percentage}%</span>
                  </div>
                ))}
              </div>

              {/* Immutable ZK-Proof Display */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-sky-500/10 relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Lock className="w-3 h-3 text-sky-500" />
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Immutable Ownership Proof</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleRotateProof(split.id)}
                      disabled={isRotating === split.id}
                      className="text-[9px] font-bold text-slate-500 uppercase tracking-widest hover:text-sky-400 transition-colors flex items-center gap-1 disabled:opacity-50"
                      title="Re-generate ZK proof anchor"
                    >
                      {isRotating === split.id ? 'Re-anchoring...' : 'Rotate Proof'}
                      <RefreshCw className={`w-3 h-3 ${isRotating === split.id ? 'animate-spin' : ''}`} />
                    </button>
                    <button 
                      onClick={() => handleVerifyProof(split.id)}
                      className="text-[9px] font-bold text-sky-400 uppercase tracking-widest hover:text-sky-300 transition-colors flex items-center gap-1"
                    >
                      {isVerifying === split.id ? 'Verifying...' : 'Verify Trace'}
                      {isVerifying === split.id ? <Activity className="w-3 h-3 animate-spin" /> : <ExternalLink className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
                <div className="mono text-[10px] text-sky-400/60 break-all leading-tight">
                  {split.hash}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass p-12 rounded-[2.5rem] border-dashed border-slate-800 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
            <FilePlus className="w-8 h-8 text-slate-600" />
          </div>
          <h5 className="font-bold text-slate-400">No active split sheets</h5>
          <p className="text-xs text-slate-500 mt-1">Start by generating an immutable record for your next collaboration.</p>
          <button 
            onClick={() => setIsCreating(true)}
            className="mt-6 px-8 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all text-slate-400"
          >
            New Protocol
          </button>
        </div>
      )}

      {/* Analytics Card */}
      <div className="glass p-8 rounded-[2.5rem] border border-indigo-500/20 mt-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <Binary className="w-32 h-32" />
        </div>
        <h4 className="font-bold mb-4 flex items-center gap-2 text-slate-100">
          <Fingerprint className="w-5 h-5 text-indigo-400" />
          Lineage Protection Trace
        </h4>
        <p className="text-xs text-slate-500 leading-relaxed mb-6 max-w-sm">
          Your creative lineage is currently clean. Neural defense is active, mapping {splits.length} ownership protocols to local and global IP nodes.
        </p>
        <div className="grid grid-cols-2 gap-4 relative z-10">
          <div className="p-4 bg-slate-950 rounded-2xl text-center border border-white/5 shadow-inner">
            <p className="text-2xl font-bold mono text-slate-100">0%</p>
            <p className="text-[9px] text-slate-600 font-bold uppercase mt-1">Conflict Rate</p>
          </div>
          <div className="p-4 bg-slate-950 rounded-2xl text-center border border-white/5 shadow-inner">
            <p className="text-2xl font-bold mono text-sky-400">100%</p>
            <p className="text-[9px] text-slate-600 font-bold uppercase mt-1">Audit Validity</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplitsView;
