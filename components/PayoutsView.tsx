
import React from 'react';
import { DollarSign, ArrowUpRight, CheckCircle, Clock, ShieldCheck, Activity, Filter, RefreshCw, BarChart3, Lock } from 'lucide-react';
import { PayoutTransaction } from '../types';

const PayoutsView: React.FC = () => {
  const transactions: PayoutTransaction[] = [
    { id: 'TX-9201', source: 'Spotify (Global)', amount: 12450.20, timestamp: '2024-11-24 14:20', verified: true, status: 'cleared' },
    { id: 'TX-9198', source: 'Apple Music', amount: 8900.50, timestamp: '2024-11-23 09:12', verified: true, status: 'cleared' },
    { id: 'TX-9195', source: 'YouTube ContentID', amount: 4500.00, timestamp: '2024-11-22 18:45', verified: true, status: 'processing' },
    { id: 'TX-9182', source: 'Apex Publishing', amount: 32000.00, timestamp: '2024-11-20 11:30', verified: true, status: 'cleared' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white italic uppercase">Audit Ledger</h2>
          <p className="text-gray-500 mt-1">Verifiable revenue reconciliation. Zero hidden deductions.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl transition-colors border border-white/10 text-sm font-bold">
            <RefreshCw className="w-4 h-4" /> Reconcile
          </button>
          <button className="flex items-center gap-2 bg-[#00D632] text-black px-6 py-2 rounded-xl transition-all font-bold shadow-lg shadow-[#00D632]/20 hover:scale-105">
            Withdraw Funds
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-[2rem] border-t-2 border-[#00D632]">
          <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Available to Withdraw</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-4xl font-bold mono text-white">$48,201.70</h3>
            <span className="text-xs text-[#00D632] font-bold">+12%</span>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
            <Lock className="w-3 h-3" /> Secure Wallet: 0x8a...2b1c
          </div>
        </div>
        <div className="glass p-6 rounded-[2rem] border-t-2 border-blue-500">
          <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Escrow / Pending</p>
          <h3 className="text-4xl font-bold mono text-white">$12,450.00</h3>
          <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
            <Clock className="w-3 h-3" /> Avg. Clearance: 4.2 Days
          </div>
        </div>
        <div className="glass p-6 rounded-[2rem] border-t-2 border-purple-500">
          <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Total Career Revenue</p>
          <h3 className="text-4xl font-bold mono text-white">$1,420,900</h3>
          <div className="mt-4 flex items-center gap-2 text-xs text-purple-400 font-bold">
            <Activity className="w-3 h-3" /> Across 12 DSPs
          </div>
        </div>
      </div>

      <div className="glass p-8 rounded-[2rem] border border-white/5">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h4 className="font-bold text-lg">Inbound Stream Verification</h4>
            <div className="flex bg-black/40 p-1 rounded-xl border border-white/10">
              <button className="px-4 py-1.5 bg-white/10 rounded-lg text-xs font-bold text-white">All Flow</button>
              <button className="px-4 py-1.5 hover:bg-white/5 rounded-lg text-xs font-bold text-gray-500 transition-colors">Disputed</button>
            </div>
          </div>
          <button className="p-2 hover:bg-white/5 rounded-xl transition-colors">
            <Filter className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-white/5">
                <th className="pb-4 text-[10px] font-bold uppercase text-gray-500 tracking-widest">Transaction ID</th>
                <th className="pb-4 text-[10px] font-bold uppercase text-gray-500 tracking-widest">Source Entity</th>
                <th className="pb-4 text-[10px] font-bold uppercase text-gray-500 tracking-widest">Amount (USD)</th>
                <th className="pb-4 text-[10px] font-bold uppercase text-gray-500 tracking-widest">Audit Status</th>
                <th className="pb-4 text-[10px] font-bold uppercase text-gray-500 tracking-widest">Timestamp</th>
                <th className="pb-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {transactions.map((tx) => (
                <tr key={tx.id} className="group hover:bg-white/5 transition-colors">
                  <td className="py-5">
                    <span className="mono text-xs font-medium text-blue-400">{tx.id}</span>
                  </td>
                  <td className="py-5">
                    <p className="text-sm font-bold text-white">{tx.source}</p>
                    <p className="text-[9px] text-gray-500 uppercase">Direct Protocol Link</p>
                  </td>
                  <td className="py-5">
                    <p className="text-sm font-bold mono text-white">${tx.amount.toLocaleString()}</p>
                  </td>
                  <td className="py-5">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase ${tx.status === 'cleared' ? 'bg-[#00D632]/10 text-[#00D632]' : 'bg-blue-500/10 text-blue-500'}`}>
                      {tx.status === 'cleared' ? <ShieldCheck className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {tx.status}
                    </div>
                  </td>
                  <td className="py-5">
                    <p className="text-xs text-gray-400">{tx.timestamp}</p>
                  </td>
                  <td className="py-5 text-right">
                    <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="w-4 h-4 text-[#00D632]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass p-8 rounded-[2rem]">
          <h4 className="font-bold mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-500" />
            Revenue Distribution AI
          </h4>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#00D632]"></div>
                <span className="text-sm font-medium text-gray-300">Master Rights</span>
              </div>
              <span className="text-sm font-bold mono">72%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm font-medium text-gray-300">Publishing</span>
              </div>
              <span className="text-sm font-bold mono">18%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-sm font-medium text-gray-300">Sync / Other</span>
              </div>
              <span className="text-sm font-bold mono">10%</span>
            </div>
            <div className="h-4 w-full bg-white/5 rounded-full flex overflow-hidden mt-4">
              <div className="h-full bg-[#00D632]" style={{ width: '72%' }}></div>
              <div className="h-full bg-blue-500" style={{ width: '18%' }}></div>
              <div className="h-full bg-purple-500" style={{ width: '10%' }}></div>
            </div>
          </div>
        </div>

        <div className="glass p-8 rounded-[2rem] relative overflow-hidden flex flex-col justify-center border border-[#00D632]/20">
           <div className="absolute top-0 right-0 p-8 opacity-5">
             <ShieldCheck className="w-32 h-32" />
           </div>
           <h4 className="text-xl font-bold mb-2">Zero-Trust Verified</h4>
           <p className="text-gray-400 text-sm mb-6 leading-relaxed">
             Every cent has been reconciled against DSP raw data using cryptographic proofs. No audit needed — we live in the audit.
           </p>
           <div className="flex gap-4">
              <div className="flex-1 p-4 bg-black/40 rounded-2xl border border-white/5 text-center">
                 <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Deduction Accuracy</p>
                 <p className="text-xl font-bold mono text-[#00D632]">100%</p>
              </div>
              <div className="flex-1 p-4 bg-black/40 rounded-2xl border border-white/5 text-center">
                 <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Fraud Attempts</p>
                 <p className="text-xl font-bold mono text-red-500">0</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PayoutsView;
