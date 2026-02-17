
import React, { useState } from 'react';
import { DollarSign, ArrowUpRight, CheckCircle, Clock, ShieldCheck, Activity, Filter, RefreshCw, BarChart3, Lock, Wallet2, History, Zap, TrendingUp } from 'lucide-react';
import { PayoutTransaction } from '../types';

interface Props {
  transactions: PayoutTransaction[];
  onSync: (payouts: PayoutTransaction[]) => void;
}

const PayoutsView: React.FC<Props> = ({ transactions, onSync }) => {
  const [isSyncing, setIsSyncing] = useState(false);

  const totalBalance = transactions.reduce((acc, curr) => acc + curr.amount, 0);

  const simulateSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      const mockPayouts: PayoutTransaction[] = [
        {
          id: Math.random().toString(36).substr(2, 9),
          source: 'Spotify for Artists',
          amount: Math.floor(Math.random() * 5000) + 500,
          timestamp: new Date().toISOString(),
          verified: true,
          status: 'cleared'
        },
        {
          id: Math.random().toString(36).substr(2, 9),
          source: 'Apple Music',
          amount: Math.floor(Math.random() * 3000) + 200,
          timestamp: new Date().toISOString(),
          verified: true,
          status: 'cleared'
        }
      ];
      onSync(mockPayouts);
      setIsSyncing(false);
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <header>
        <h2 className="text-3xl font-bold tracking-tight text-white italic uppercase leading-none">Wallet Core</h2>
        <p className="text-slate-500 mt-2 text-sm">Verifiable revenue reconciliation.</p>
      </header>

      <div className="glass p-8 rounded-[2.5rem] bg-sky-500/5 border border-sky-500/20 relative overflow-hidden group shadow-lg shadow-sky-900/5">
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
           <TrendingUp className="w-32 h-32 text-sky-400" />
        </div>
        <div className="flex justify-between items-start mb-10 relative z-10">
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-1">Available Funds</p>
            <h3 className="text-5xl font-bold mono tracking-tighter text-slate-100">${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h3>
          </div>
          <div className="w-12 h-12 bg-sky-500 rounded-2xl flex items-center justify-center shadow-lg shadow-sky-500/20">
            <Wallet2 className="text-white w-6 h-6" />
          </div>
        </div>
        <div className="flex gap-3 relative z-10">
          <button 
            onClick={simulateSync}
            disabled={isSyncing}
            className="flex-1 py-4 bg-sky-500 text-white font-bold rounded-2xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-sky-400 active:scale-95 transition-all shadow-lg shadow-sky-500/20"
          >
            {isSyncing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
            {isSyncing ? 'Reconciling...' : 'Sync Nodes'}
          </button>
          <button className="flex-1 py-4 bg-slate-800/50 border border-slate-700 rounded-2xl text-xs uppercase tracking-widest text-slate-400 hover:text-white transition-all">
            Vault Details
          </button>
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-lg">Reconciliation Ledger</h4>
          <button className="p-2 hover:bg-slate-800 rounded-xl transition-colors">
            <Filter className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {transactions.length > 0 ? (
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div key={tx.id} className="glass p-4 rounded-2xl border border-white/5 flex items-center justify-between hover:border-sky-500/20 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center border border-slate-800">
                    <CheckCircle className={`w-5 h-5 ${tx.verified ? 'text-sky-400' : 'text-slate-500'}`} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-200">{tx.source}</p>
                    <p className="text-[10px] text-slate-500 mono uppercase">{new Date(tx.timestamp).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold mono text-sky-400">+${tx.amount.toLocaleString()}</p>
                  <p className="text-[8px] text-slate-500 uppercase font-bold tracking-widest">{tx.status}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass p-12 rounded-[2.5rem] border-dashed border-slate-800 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
              <History className="w-8 h-8 text-slate-600" />
            </div>
            <h5 className="font-bold text-slate-400">Ledger is empty</h5>
            <p className="text-xs text-slate-500 mt-1">Once you sync with DSPs, your verified revenue flow will appear here.</p>
          </div>
        )}
      </section>

      <div className="p-6 bg-indigo-500/5 rounded-[2rem] border border-indigo-500/20 flex items-start gap-4">
        <ShieldCheck className="w-6 h-6 text-indigo-400 shrink-0" />
        <div>
          <p className="text-sm font-bold text-white">Zero-Trust Reconciliation</p>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Every cent is reconciled against DSP raw data nodes. No third-party audits needed — RAP lives in the ledger.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PayoutsView;
