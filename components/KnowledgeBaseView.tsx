
import React, { useState } from 'react';
import { 
  BookOpen, Search, Shield, Binary, Cpu, Scale, Fingerprint, 
  Database, Zap, Lock, Globe, Terminal, ArrowLeft, ChevronRight,
  ShieldAlert, Radio, Sparkles
} from 'lucide-react';

interface Article {
  id: string;
  category: string;
  title: string;
  icon: any;
  content: string;
  tags: string[];
}

const articles: Article[] = [
  {
    id: 'did-sovereignty',
    category: 'Identity',
    title: 'Decentralized Identity (DID) Core',
    icon: Fingerprint,
    content: "Your RAP DID (Decentralized Identity) is a sovereign identifier that exists independently of any central authority. Unlike a Spotify profile or a Label account, your DID is anchored directly to the ROCC$TAR blockchain infrastructure. It uses W3C standards to ensure that you—and only you—own your creative personhood. If a platform attempts to use your likeness without your DID-signed consent, our Neural Defense layer automatically flags the ingest as 'Hostile'.",
    tags: ['Identity', 'DID', 'Sovereignty']
  },
  {
    id: 'forensic-lab',
    category: 'Legal',
    title: 'Gemini 3 Pro Forensic Engine',
    icon: Scale,
    content: "The Forensic Lab is powered by a fine-tuned Gemini 3 Pro model trained on 50 years of entertainment litigation data. It doesn't just read words; it simulates the financial outcome of clauses. It identifies 'Cross-Collateralization' traps, 'Hidden Recoupables', and 'Biometric Rights Surrender'—phrases often buried in standard label templates. The engine assigns a 1-10 Risk Score based on the potential loss of artist equity over a 10-year period.",
    tags: ['Legal', 'AI', 'Audit']
  },
  {
    id: 'zk-payouts',
    category: 'Finance',
    title: 'Zero-Knowledge Payout Protocols',
    icon: Binary,
    content: "RAP uses ZK-Snarks (Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge) to reconcile revenue. This means we can prove a payout is accurate to the penny based on streaming data without ever exposing your private transaction history to the DSP. The 'Wallet Core' synchronizes with node-level data from Apple, Spotify, and Tidal, ensuring your split sheet is executed as math, not as a request.",
    tags: ['Finance', 'ZK-Proofs', 'Revenue']
  },
  {
    id: 'neural-defense',
    category: 'Security',
    title: 'Neural Perimeter Defense (NPD)',
    icon: ShieldAlert,
    content: "NPD is an active monitoring system that 'listens' to the global distribution network. It uses vocal fingerprinting to detect unauthorized AI-clones of your voice. When a match is found that lacks a cryptographic 'RAP-Signature', the NPD initiates an automated takedown request via the global rights node network, effectively 'muting' deepfakes before they go viral.",
    tags: ['Security', 'AI', 'Deepfake']
  },
  {
    id: 'hardware-enclave',
    category: 'Security',
    title: 'The Secure Enclave Protocol',
    icon: Cpu,
    content: "RAP is designed with 'Hardware Consciousness'. Your private identity keys and vocal fingerprints are stored in a Trusted Execution Environment (TEE) on your device. This data never touches the primary operating system or the internet. Even if the RAP app is compromised, your biometric anchor remains isolated at the silicon level.",
    tags: ['Security', 'Hardware', 'Encryption']
  }
];

const KnowledgeBaseView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const filteredArticles = articles.filter(a => 
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col animate-in fade-in duration-500">
      <header className="p-8 border-b border-white/5 flex items-center justify-between sticky top-0 bg-[#020617]/80 backdrop-blur-xl z-50">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
            <ArrowLeft className="w-6 h-6 text-slate-400" />
          </button>
          <h2 className="text-2xl font-bold italic uppercase tracking-tighter">Knowledge <span className="text-sky-400">Protocol</span></h2>
        </div>
        <div className="relative hidden md:block w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text"
            placeholder="Search Intelligence..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-xs focus:border-sky-500/50 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <main className="flex-1 p-8 max-w-5xl mx-auto w-full">
        {selectedArticle ? (
          <div className="animate-in slide-in-from-right-4 duration-500">
            <button 
              onClick={() => setSelectedArticle(null)}
              className="mb-8 text-sky-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2"
            >
              <ArrowLeft className="w-3 h-3" /> Back to Indices
            </button>
            <div className="flex items-center gap-6 mb-10">
              <div className="w-20 h-20 bg-sky-500/10 rounded-3xl border border-sky-500/20 flex items-center justify-center">
                <selectedArticle.icon className="w-10 h-10 text-sky-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{selectedArticle.category}</p>
                <h3 className="text-4xl font-bold tracking-tight text-white italic uppercase">{selectedArticle.title}</h3>
              </div>
            </div>
            <div className="glass p-10 rounded-[3rem] border border-sky-500/10 mb-12">
              <p className="text-lg text-slate-300 leading-relaxed font-medium">
                {selectedArticle.content}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedArticle.tags.map(tag => (
                <span key={tag} className="px-4 py-1.5 bg-slate-900 border border-white/5 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            <div className="md:hidden relative mb-8">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text"
                placeholder="Search Intelligence..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArticles.map(article => (
                <button 
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="glass p-8 rounded-[2.5rem] border border-white/5 hover:border-sky-500/30 text-left transition-all group flex gap-6 items-start"
                >
                  <div className="w-14 h-14 bg-slate-900 rounded-2xl border border-white/5 flex items-center justify-center shrink-0 group-hover:bg-sky-500 group-hover:text-white transition-all">
                    <article.icon className="w-6 h-6 text-slate-400 group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 group-hover:text-sky-400 transition-colors uppercase italic tracking-tight">{article.title}</h4>
                    <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">{article.content}</p>
                  </div>
                </button>
              ))}
            </section>

            <section className="py-20 border-t border-white/5">
              <div className="flex items-center gap-4 mb-10">
                <Terminal className="w-8 h-8 text-sky-400" />
                <h3 className="text-2xl font-black italic uppercase tracking-tighter">Technical Specifications</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: 'Encryption Standard', value: 'AES-256-GCM', icon: Lock },
                  { label: 'Network Latency', value: '< 12ms (Global Nodes)', icon: Zap },
                  { label: 'Sovereignty Engine', value: 'Gemini-3-Pro-Flash', icon: Sparkles },
                  { label: 'Integrity Verification', value: 'Plonk ZK-Snarks', icon: Shield },
                  { label: 'Node Distribution', value: '14,282 Active', icon: Globe },
                  { label: 'Biometric Isolation', value: 'Hardware-level TEE', icon: Database }
                ].map((spec, i) => (
                  <div key={i} className="p-6 bg-slate-950/50 border border-white/5 rounded-3xl">
                    <div className="flex items-center gap-2 mb-2 text-slate-500">
                      <spec.icon className="w-3 h-3" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{spec.label}</span>
                    </div>
                    <p className="text-lg font-bold text-slate-200 mono">{spec.value}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      <footer className="p-12 border-t border-white/5 text-center">
        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.4em]">
          ROCC$TAR AI KNOWLEDGE PROTOCOL • VER 4.0.1 • SECURE ACCESS ONLY
        </p>
      </footer>
    </div>
  );
};

export default KnowledgeBaseView;
