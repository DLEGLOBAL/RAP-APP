
import React from 'react';
import { 
  Shield, Lock, Zap, Cpu, ArrowRight, Fingerprint, Globe, CheckCircle2, 
  Binary, Users, ShieldAlert, BarChart3, Search, 
  Terminal, Database, Radio, Eye, Sparkles, Scale, RefreshCw, AlertCircle,
  Clock, ShieldCheck, BookOpen
} from 'lucide-react';

interface Props {
  onGetStarted: () => void;
  onViewKnowledge: () => void;
}

const LandingView: React.FC<Props> = ({ onGetStarted, onViewKnowledge }) => {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 overflow-x-hidden relative scroll-smooth">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-sky-500/10 blur-[150px] rounded-full animate-pulse-blue"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-500/10 blur-[150px] rounded-full animate-pulse-blue delay-1000"></div>
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #38BDF8 1px, transparent 0)', backgroundSize: '60px 60px' }}></div>
      </div>

      {/* Header / Nav Ticker */}
      <div className="sticky top-0 z-50 glass border-b border-sky-500/10 py-3 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 px-8">
              <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></div>
                Node Alpha-7 Online: Integrity 99.99%
              </span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <ShieldAlert className="w-3 h-3 text-orange-500" />
                4,291 Deepfake Ingestions Blocked Today
              </span>
              <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest flex items-center gap-2">
                <Binary className="w-3 h-3" />
                ZK-Proof Generation: Nominal
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* --- HERO SECTION --- */}
        <section className="pt-24 pb-32 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500/5 border border-sky-500/20 rounded-full mb-10 animate-in fade-in slide-in-from-top-4 duration-1000">
             <Cpu className="w-3 h-3 text-sky-400" />
             <span className="text-[10px] font-bold text-sky-400 uppercase tracking-[0.3em]">Built on ROCC$TAR AI Infrastructure</span>
          </div>

          <h1 className="text-7xl md:text-[10rem] font-bold tracking-tighter italic uppercase leading-[0.8] mb-8">
            REAL <span className="text-transparent bg-clip-text bg-gradient-to-b from-sky-300 to-sky-600">ARTIST</span> <br /> 
            PROTECTION
          </h1>
          
          <p className="max-w-3xl mx-auto text-xl md:text-2xl text-slate-400 font-medium leading-relaxed mb-12">
            RAP is the world's first hardware-isolated security layer for creative rights. We replace predatory intermediaries with <span className="text-sky-300">mathematical certainty</span>.
          </p>

          <div className="flex flex-col md:flex-row items-center gap-6">
            <button 
              onClick={onGetStarted}
              className="group relative px-12 py-6 bg-white text-slate-900 font-black text-lg uppercase tracking-widest rounded-3xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(56,189,248,0.2)]"
            >
              <span className="relative z-10 flex items-center gap-3">
                Initialize Defense <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-sky-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </button>
            <button 
              onClick={onViewKnowledge}
              className="px-10 py-6 border border-white/10 rounded-3xl text-sm font-bold uppercase tracking-[0.2em] hover:bg-white/5 transition-all flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-sky-400" /> Knowledge Protocol
            </button>
          </div>
        </section>

        {/* --- CORE PILLARS GRID --- */}
        <section className="py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-3 mb-10 text-center md:text-left">
             <h2 className="text-4xl font-black italic uppercase tracking-tighter">The Five Pillars of <span className="text-sky-400">RAP</span></h2>
             <div className="h-1 w-24 bg-sky-500 mt-4 rounded-full"></div>
          </div>

          {[
            {
              title: 'Forensic Audit',
              desc: 'Our Gemini 3 Pro engine dissects contracts clause-by-clause, flagging predatory language before you sign.',
              icon: Search,
              action: 'Analyze Agreements',
              color: 'text-sky-400',
              view: 'Contracts'
            },
            {
              title: 'ZK-Registry',
              desc: 'Turn split sheets into immutable cryptographic anchors. No disputes, no delays, no "lost" metadata.',
              icon: Binary,
              action: 'Anchor Metadata',
              color: 'text-indigo-400',
              view: 'Splits'
            },
            {
              title: 'Sovereign ID',
              desc: 'Hardware-level biometric isolation ensures your Decentralized Identity (DID) remains unhackable.',
              icon: Fingerprint,
              action: 'Initialize DID',
              color: 'text-emerald-400',
              view: 'Security'
            },
            {
              title: 'Neural Defense',
              desc: 'Active monitoring for deepfake ingestion and unauthorized metadata manipulation across global DSPs.',
              icon: Radio,
              action: 'Activate Perimeter',
              color: 'text-orange-400',
              view: 'Security'
            },
            {
              title: 'Node Wallet',
              desc: 'Direct revenue reconciliation from DSP nodes. Zero-trust payouts that clear instantly to your vault.',
              icon: Database,
              action: 'Sync Revenue',
              color: 'text-purple-400',
              view: 'Payouts'
            },
            {
              title: 'Strategic Advisor',
              desc: 'A 24/7 legal and career strategist with full context of your catalog, rights, and industry trends.',
              icon: Sparkles,
              action: 'Consult RAP AI',
              color: 'text-white',
              view: 'Advisor'
            }
          ].map((item, i) => (
            <div key={i} className="glass p-10 rounded-[3rem] border border-white/5 hover:border-sky-500/20 transition-all group flex flex-col justify-between min-h-[400px]">
              <div>
                <div className={`w-16 h-16 rounded-[1.5rem] bg-slate-900 border border-white/10 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform ${item.color}`}>
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold mb-4 tracking-tighter uppercase italic text-slate-100">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8">{item.desc}</p>
              </div>
              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-sky-400 transition-colors">Module: {item.view}</span>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-sky-500 transition-all">
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* --- DEEP DIVE: CONTRACTS --- */}
        <section className="py-32 border-t border-white/5">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                 <div className="w-12 h-12 bg-sky-500 rounded-2xl flex items-center justify-center shadow-lg shadow-sky-500/20">
                    <Scale className="text-white w-6 h-6" />
                 </div>
                 <h2 className="text-5xl font-bold tracking-tighter italic uppercase leading-none">
                    Forensic <br /> <span className="text-sky-400">Legal Intelligence.</span>
                 </h2>
                 <p className="text-slate-400 leading-relaxed text-lg">
                    Traditional lawyers take weeks to find the hidden traps in legal agreements. RAP does it in milliseconds using <strong>Gemini 3 Pro</strong>. We identify predatory clauses in royalty caps, termination rights, and metadata control.
                 </p>
                 <div className="space-y-4">
                    {[
                      'Real-time Risk Scoring (1-10)',
                      'Instant Correction Suggestions',
                      'Equity vs. Debt Estimation',
                      'Multi-language Legal Translation'
                    ].map((feat, i) => (
                      <div key={i} className="flex items-center gap-3">
                         <CheckCircle2 className="w-5 h-5 text-sky-400" />
                         <span className="text-slate-200 font-medium">{feat}</span>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="relative group">
                 <div className="absolute inset-0 bg-sky-500/10 blur-3xl rounded-full scale-75 group-hover:scale-100 transition-transform duration-1000"></div>
                 <div className="glass p-8 rounded-[3rem] border border-white/10 relative z-10 space-y-4">
                    <div className="flex items-center justify-between mb-4">
                       <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">High Risk Flag Detected</span>
                       </div>
                       <span className="text-[10px] font-bold text-slate-500 mono">Clause 14.b</span>
                    </div>
                    <div className="p-4 bg-red-500/5 rounded-2xl border border-red-500/10 mb-6">
                       <p className="text-xs text-red-400 italic">"...granting the Company perpetual, worldwide, irrevocable rights to Artist's biometric likeness for any AI-generated audio..."</p>
                    </div>
                    <div className="p-4 bg-sky-500/10 rounded-2xl border border-sky-500/20">
                       <p className="text-[10px] font-bold text-sky-400 uppercase tracking-widest mb-1">Recommended Correction</p>
                       <p className="text-xs text-slate-300 font-medium">Strike 'irrevocable' and 'biometric likeness'. Restrict AI use to specific, approved project instances only.</p>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* --- THE SOVEREIGNTY MATRIX (COMPARISON) --- */}
        <section className="py-32">
           <div className="text-center mb-20">
              <h2 className="text-5xl font-bold italic uppercase tracking-tighter mb-4">The Sovereignty <span className="text-sky-400">Matrix</span></h2>
              <p className="text-slate-500 text-sm uppercase tracking-[0.4em]">The Industry is broken. RAP is the Fix.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 rounded-[3rem] overflow-hidden border border-white/5">
              <div className="p-16 bg-slate-950/40">
                 <h4 className="text-2xl font-bold mb-10 text-slate-500 uppercase tracking-widest italic">The Predatory Past</h4>
                 <div className="space-y-8">
                    {[
                      { label: 'Royalties', val: 'Delayed 6-12 Months', icon: Clock },
                      { label: 'Splits', val: 'PDF / Email (Disputable)', icon: AlertCircle },
                      { label: 'Identity', val: 'Label Owned Likeness', icon: Eye },
                      { label: 'Audits', val: '$20k+ Legal Fees', icon: BarChart3 }
                    ].map((row, i) => (
                      <div key={i} className="flex items-center justify-between group">
                         <div className="flex items-center gap-4">
                            <row.icon className="w-5 h-5 text-slate-700" />
                            <span className="text-slate-500 font-medium">{row.label}</span>
                         </div>
                         <span className="text-slate-600 font-bold uppercase text-xs">{row.val}</span>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="p-16 bg-sky-500/5 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
                    <Zap className="w-64 h-64 text-sky-400" />
                 </div>
                 <h4 className="text-2xl font-bold mb-10 text-sky-400 uppercase tracking-widest italic">The Sovereign Future</h4>
                 <div className="space-y-8 relative z-10">
                    {[
                      { label: 'Royalties', val: 'Real-Time Node Clearing', icon: Zap },
                      { label: 'Splits', val: 'Immutable ZK-Proofs', icon: Binary },
                      { label: 'Identity', val: 'Biometric DID Control', icon: ShieldCheck },
                      { label: 'Audits', val: 'Instant AI Forensics', icon: Sparkles }
                    ].map((row, i) => (
                      <div key={i} className="flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            <row.icon className="w-5 h-5 text-sky-400" />
                            <span className="text-slate-200 font-medium">{row.label}</span>
                         </div>
                         <span className="text-sky-400 font-bold uppercase text-xs shadow-sky-400/20">{row.val}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </section>

        {/* --- SECURITY INFRASTRUCTURE VISUALIZER --- */}
        <section className="py-32 border-t border-white/5">
           <div className="glass p-16 rounded-[4rem] border border-sky-500/20 bg-gradient-to-br from-slate-900 to-transparent relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                 <div className="relative">
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                       <Globe className="w-[500px] h-[500px] animate-spin-slow" />
                    </div>
                    <div className="relative z-10 space-y-6">
                       <div className="flex items-center gap-6">
                          <div className="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center border border-sky-500/30">
                             <Fingerprint className="w-8 h-8 text-sky-400" />
                          </div>
                          <div>
                             <p className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">DID Sovereignty</p>
                             <h4 className="text-2xl font-bold text-white">Your Biometric Anchor</h4>
                          </div>
                       </div>
                       <div className="flex items-center gap-6">
                          <div className="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center border border-indigo-500/30">
                             <Lock className="w-8 h-8 text-indigo-400" />
                          </div>
                          <div>
                             <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Neural Perimeter</p>
                             <h4 className="text-2xl font-bold text-white">Enclave-Level Isolation</h4>
                          </div>
                       </div>
                       <div className="flex items-center gap-6">
                          <div className="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center border border-emerald-500/30">
                             <RefreshCw className="w-8 h-8 text-emerald-400" />
                          </div>
                          <div>
                             <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Self-Healing Assets</p>
                             <h4 className="text-2xl font-bold text-white">Global Metadata Taint Defense</h4>
                          </div>
                       </div>
                    </div>
                 </div>
                 <div className="space-y-8">
                    <h2 className="text-5xl font-bold tracking-tighter italic uppercase leading-none">
                       The <span className="text-sky-400">Security</span> Enclave.
                    </h2>
                    <p className="text-slate-400 leading-relaxed text-lg">
                       RAP isn't just software; it's a hardware-conscious architecture. We use Trusted Execution Environments (TEEs) to ensure your private keys and vocal biometrics never touch the open internet. Even if our servers were seized, your sovereignty remains untouched.
                    </p>
                    <div className="p-6 bg-slate-950 rounded-[2rem] border border-white/5">
                       <div className="flex justify-between items-center mb-4">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Neural Defense Status</span>
                          <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest">ACTIVE</span>
                       </div>
                       <div className="flex items-end gap-1 h-12">
                         {[60, 45, 80, 50, 90, 40, 60, 20, 35, 55, 75, 45, 30, 90, 20, 60, 40].map((h, i) => (
                           <div key={i} className="flex-1 bg-sky-400/30 rounded-t-sm animate-pulse" style={{ height: `${h}%`, animationDelay: `${i*50}ms` }}></div>
                         ))}
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* --- FINAL CTA SECTION --- */}
        <section className="py-40 text-center flex flex-col items-center">
           <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter mb-12 leading-[0.9]">
              Ready to <br /> <span className="text-sky-400">Claim Your Rights?</span>
           </h2>
           <p className="max-w-xl text-slate-400 mb-12 text-lg">
              Join 12,000+ artists who have anchored their creative future to the RAP protocol. Initialization takes 4 minutes.
           </p>
           <button 
             onClick={onGetStarted}
             className="group relative px-16 py-8 bg-sky-500 text-white font-black text-xl uppercase tracking-widest rounded-[2rem] overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_60px_rgba(56,189,248,0.3)]"
           >
             <span className="relative z-10 flex items-center gap-4">
               Begin Onboarding <ArrowRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
             </span>
             <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
           </button>
           <p className="mt-10 text-[10px] font-bold uppercase tracking-[0.4em] text-slate-600">
              No label access. No intermediary control. Just you and the code.
           </p>
        </section>

        {/* Footer */}
        <footer className="py-20 border-t border-white/5 flex flex-col items-center gap-12">
           <div className="flex items-center gap-3">
             <Shield className="w-8 h-8 text-sky-400" />
             <h3 className="text-2xl font-bold italic uppercase tracking-tighter">RAP | ROCC$TAR AI</h3>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-12 w-full max-w-4xl text-center md:text-left">
              <div className="space-y-4">
                 <h5 className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Ecosystem</h5>
                 <ul className="text-xs text-slate-400 space-y-2">
                    <li onClick={onViewKnowledge} className="hover:text-sky-400 cursor-pointer transition-colors">Forensic Lab</li>
                    <li onClick={onViewKnowledge} className="hover:text-sky-400 cursor-pointer transition-colors">Split Registry</li>
                    <li onClick={onViewKnowledge} className="hover:text-sky-400 cursor-pointer transition-colors">Identity Vault</li>
                 </ul>
              </div>
              <div className="space-y-4">
                 <h5 className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Developers</h5>
                 <ul className="text-xs text-slate-400 space-y-2">
                    <li className="hover:text-sky-400 cursor-pointer transition-colors">Node API</li>
                    <li className="hover:text-sky-400 cursor-pointer transition-colors">Documentation</li>
                    <li className="hover:text-sky-400 cursor-pointer transition-colors">ZK-Plonk Spec</li>
                 </ul>
              </div>
              <div className="space-y-4">
                 <h5 className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Security</h5>
                 <ul className="text-xs text-slate-400 space-y-2">
                    <li className="hover:text-sky-400 cursor-pointer transition-colors">Hardware Enclave</li>
                    <li className="hover:text-sky-400 cursor-pointer transition-colors">Bug Bounty</li>
                    <li className="hover:text-sky-400 cursor-pointer transition-colors">Audit Logs</li>
                 </ul>
              </div>
              <div className="space-y-4">
                 <h5 className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Social</h5>
                 <ul className="text-xs text-slate-400 space-y-2">
                    <li className="hover:text-sky-400 cursor-pointer transition-colors">Terminal/X</li>
                    <li className="hover:text-sky-400 cursor-pointer transition-colors">Discord Enclave</li>
                    <li className="hover:text-sky-400 cursor-pointer transition-colors">GitHub</li>
                 </ul>
              </div>
           </div>

           <div className="text-center space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600">
                © 2025 ROCC$TAR AI INFRASTRUCTURE. ALL RIGHTS SOVEREIGN.
              </p>
              <p className="text-[8px] font-bold uppercase tracking-[0.5em] text-slate-800">
                AES-256-GCM / SHA-512 / Plonk-ZK-Snark
              </p>
           </div>
        </footer>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: 200%;
          animation: marquee 30s linear infinite;
        }
        .animate-spin-slow {
          animation: spin 120s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LandingView;
