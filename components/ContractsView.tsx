
import React, { useState } from 'react';
import { Upload, FileSearch, ShieldAlert, CheckCircle, ArrowRight, Download, BrainCircuit, Search, FileX } from 'lucide-react';
import { analyzeContract } from '../services/geminiService';
import { ContractAnalysis } from '../types';

interface Props {
  history: ContractAnalysis[];
  onNewAudit: (audit: ContractAnalysis) => void;
}

const ContractsView: React.FC<Props> = ({ history, onNewAudit }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<ContractAnalysis | null>(null);
  const [inputText, setInputText] = useState('');

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    setIsAnalyzing(true);
    setCurrentAnalysis(null);
    try {
      const result = await analyzeContract(inputText);
      setCurrentAnalysis(result);
      onNewAudit(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <header>
        <h2 className="text-3xl font-bold tracking-tight text-white italic uppercase leading-none">AI Contracts</h2>
        <p className="text-slate-500 mt-2 text-sm">Deep forensic audit for legal documents.</p>
      </header>

      <div className="glass p-6 rounded-[2rem] border border-sky-500/10">
        <div className="flex items-center gap-2 mb-4">
          <Upload className="w-5 h-5 text-sky-400" />
          <h3 className="font-bold text-slate-100">New Document Audit</h3>
        </div>
        <textarea
          className="w-full h-48 bg-slate-950/40 border border-slate-800 rounded-2xl p-4 text-sm text-slate-300 focus:outline-none focus:border-sky-500/50 transition-colors resize-none mb-4 mono"
          placeholder="Paste contract clauses or full legal text here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button 
          onClick={handleAnalyze}
          disabled={isAnalyzing || !inputText.trim()}
          className="w-full py-4 bg-sky-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-sky-500/20 active:scale-95 transition-all"
        >
          {isAnalyzing ? (
            <BrainCircuit className="w-5 h-5 animate-spin" />
          ) : (
            <Search className="w-5 h-5" />
          )}
          {isAnalyzing ? 'Auditing Clauses...' : 'Start RAP Audit'}
        </button>
      </div>

      {(currentAnalysis || history.length > 0) && (
        <div className="space-y-6">
          <h4 className="font-bold text-lg text-slate-100">Recent Audits</h4>
          {(currentAnalysis ? [currentAnalysis, ...history] : history).map((analysis, aIdx) => (
            <div key={aIdx} className="glass p-8 rounded-[2rem] border border-sky-500/30 animate-in zoom-in-95 duration-500">
              <div className="flex items-center justify-between mb-8">
                <h4 className="font-bold text-xl text-slate-100">Audit Result #{history.length - aIdx + (currentAnalysis ? 1 : 0)}</h4>
                <div className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                  analysis.riskScore > 7 ? 'bg-red-500/10 text-red-500' : 'bg-sky-500/10 text-sky-400'
                }`}>
                  Risk Level: {analysis.riskScore}/10
                </div>
              </div>

              <div className="p-4 bg-slate-900/50 rounded-2xl border border-white/5 mb-8">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Executive Summary</p>
                <p className="text-sm text-slate-300 leading-relaxed">{analysis.summary}</p>
              </div>

              <div className="space-y-4">
                {analysis.flags.map((flag, idx) => (
                  <div key={idx} className="p-5 bg-slate-950/60 rounded-2xl border border-white/5">
                    <div className="flex items-start gap-4">
                      <div className={`mt-1 p-2 rounded-xl ${
                        flag.severity === 'high' ? 'bg-red-500/10 text-red-500' : 'bg-orange-500/10 text-orange-500'
                      }`}>
                        <ShieldAlert className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-sm text-slate-100 capitalize">{flag.severity} Risk Flag</p>
                        <p className="text-xs text-red-400 font-medium my-1">{flag.clause}</p>
                        <p className="text-xs text-slate-500 mb-3">{flag.description}</p>
                        <div className="bg-sky-500/5 p-3 rounded-xl border border-sky-500/10">
                          <p className="text-[10px] font-bold text-sky-400 uppercase mb-1 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" /> Recommended Correction
                          </p>
                          <p className="text-xs text-slate-300 italic">"{flag.suggestion}"</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {history.length === 0 && !currentAnalysis && !isAnalyzing && (
        <div className="glass p-12 rounded-[2rem] border-dashed border-slate-800 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
            <FileX className="w-8 h-8 text-slate-600" />
          </div>
          <h5 className="font-bold text-slate-400">Audit History Empty</h5>
          <p className="text-xs text-slate-500 mt-1">Upload your first agreement to begin metadata & legal forensics.</p>
        </div>
      )}
    </div>
  );
};

export default ContractsView;
