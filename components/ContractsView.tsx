
import React, { useState } from 'react';
import { Upload, FileSearch, ShieldAlert, CheckCircle, ArrowRight, Download, BrainCircuit, Search } from 'lucide-react';
import { analyzeContract } from '../services/geminiService';
import { ContractAnalysis } from '../types';

const ContractsView: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ContractAnalysis | null>(null);
  const [inputText, setInputText] = useState('');

  const handleAnalyze = async () => {
    if (!inputText) return;
    setIsAnalyzing(true);
    try {
      const result = await analyzeContract(inputText);
      setAnalysis(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white italic uppercase">AI Contract Engine</h2>
          <p className="text-gray-500 mt-1">Legal intelligence for the digital age. Zero exploitative terms.</p>
        </div>
        <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl transition-colors border border-white/10 text-sm font-bold">
          <Download className="w-4 h-4" /> Export Library
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass p-8 rounded-[2rem] border border-white/5">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5 text-[#00D632]" />
              Scan Agreement
            </h3>
            <textarea
              className="w-full h-64 bg-black/40 border border-white/10 rounded-2xl p-6 text-sm text-gray-300 focus:outline-none focus:border-[#00D632]/50 transition-colors resize-none mb-6 mono"
              placeholder="Paste contract text or legal clauses here for deep AI auditing..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <div className="flex items-center gap-4">
              <button 
                onClick={handleAnalyze}
                disabled={isAnalyzing || !inputText}
                className={`flex-1 py-4 rounded-2xl font-bold text-black flex items-center justify-center gap-2 transition-all ${isAnalyzing || !inputText ? 'bg-gray-600' : 'bg-[#00D632] hover:shadow-[0_0_20px_rgba(0,214,50,0.4)]'}`}
              >
                {isAnalyzing ? (
                  <>
                    <BrainCircuit className="w-5 h-5 animate-spin" />
                    Rocc$tar Intelligence Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Verify & Audit Clauses
                  </>
                )}
              </button>
            </div>
          </div>

          {analysis && (
            <div className="glass p-8 rounded-[2rem] border border-[#00D632]/20 animate-in zoom-in-95 duration-500">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-xl text-white">Audit Report</h3>
                <div className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${analysis.riskScore > 7 ? 'bg-red-500/10 text-red-500' : 'bg-[#00D632]/10 text-[#00D632]'}`}>
                  Risk Index: {analysis.riskScore}/10
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Equity Projection</p>
                  <p className="text-xl font-bold mono">{analysis.equityEstimated}</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Audit Summary</p>
                  <p className="text-xs text-gray-300 leading-relaxed">{analysis.summary}</p>
                </div>
              </div>

              <h4 className="font-bold text-sm uppercase text-gray-500 mb-4 tracking-widest">Detected Loopholes & Risks</h4>
              <div className="space-y-4">
                {analysis.flags.map((flag, idx) => (
                  <div key={idx} className="p-4 bg-black/40 rounded-2xl border border-white/5 group hover:border-red-500/20 transition-all">
                    <div className="flex items-start gap-4">
                      <div className={`mt-1 p-2 rounded-xl ${flag.severity === 'high' ? 'bg-red-500/10 text-red-500' : 'bg-orange-500/10 text-orange-500'}`}>
                        <ShieldAlert className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-bold text-sm text-white capitalize">{flag.severity} Priority Flag</p>
                          <span className="text-[10px] font-mono text-gray-500">ID: CLAUSE-{idx+104}</span>
                        </div>
                        <p className="text-xs text-red-400 font-medium mb-2">{flag.clause}</p>
                        <p className="text-xs text-gray-400 mb-3">{flag.description}</p>
                        <div className="bg-[#00D632]/5 p-3 rounded-xl border border-[#00D632]/10">
                          <p className="text-[10px] font-bold text-[#00D632] uppercase mb-1 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" /> Recommended Correction
                          </p>
                          <p className="text-xs text-gray-300 italic">"{flag.suggestion}"</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="glass p-6 rounded-[2rem]">
            <h4 className="font-bold mb-4">Contract Library</h4>
            <div className="space-y-4">
              {[
                { name: 'Warner Chappell Pub', date: 'Oct 12, 2024', status: 'Verified' },
                { name: 'Live Nation Booking', date: 'Sep 30, 2024', status: 'Audit Req' },
                { name: 'Universal Distribution', date: 'Aug 15, 2024', status: 'Signed' }
              ].map((doc, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 cursor-pointer border border-white/5 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                    <FileSearch className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-bold truncate">{doc.name}</p>
                    <p className="text-[10px] text-gray-500 uppercase">{doc.date}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-[#00D632] transition-colors" />
                </div>
              ))}
            </div>
          </div>

          <div className="glass p-6 rounded-[2rem] border border-blue-500/20">
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 text-blue-500" />
              Scenario Simulator
            </h4>
            <p className="text-xs text-gray-400 mb-4">Run revenue models based on these contract terms.</p>
            <div className="space-y-4">
              <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                <div className="flex justify-between text-[10px] font-bold text-gray-500 mb-1">
                  <span>DSP PLAYS</span>
                  <span>10M</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-1/3"></div>
                </div>
              </div>
              <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                <div className="flex justify-between text-[10px] font-bold text-gray-500 mb-1">
                  <span>ARTIST PAYOUT</span>
                  <span>$34,500</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-[#00D632] w-2/3"></div>
                </div>
              </div>
            </div>
            <button className="w-full mt-4 py-2 text-[10px] font-bold uppercase tracking-widest text-blue-500 hover:text-blue-400 transition-colors">
              Compare Deal Scenarios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractsView;
