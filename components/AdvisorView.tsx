
import React, { useState, useRef, useEffect } from 'react';
import { Send, Cpu, BrainCircuit, ShieldCheck, TrendingUp, HelpCircle, Sparkles, User, UserPlus, Activity, ShieldAlert, Terminal } from 'lucide-react';
import { getAdvisorAdvice } from '../services/geminiService';
import { AppView, UserProfile, SplitSheet, PayoutTransaction, ContractAnalysis } from '../types';

interface Message {
  role: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

interface Props {
  userContext: {
    profile: UserProfile;
    stats: {
      splits: SplitSheet[];
      payouts: PayoutTransaction[];
      contractAudits: ContractAnalysis[];
    }
  };
  onNavigate: (view: AppView) => void;
}

const AdvisorView: React.FC<Props> = ({ userContext, onNavigate }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: `Hello ${userContext.profile.name.split(' ')[0]}. I am your RAP Strategic Advisor. I have context on your ${userContext.stats.splits.length} split protocols and ${userContext.stats.contractAudits.length} previous audits. How can I protect your career today?`, timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (customInput?: string) => {
    const textToSend = customInput || input;
    if (!textToSend.trim()) return;
    
    const userMsg: Message = { role: 'user', text: textToSend, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // Enhanced context for Gemini
      const contextualPrompt = `
        User Profile: ${JSON.stringify(userContext.profile)}
        Asset Stats: ${userContext.stats.splits.length} splits, ${userContext.stats.payouts.length} transactions.
        Current Request: ${textToSend}
      `;
      
      const history = messages.map(m => ({ role: m.role === 'ai' ? 'model' : 'user', text: m.text }));
      const response = await getAdvisorAdvice(history, contextualPrompt);
      setMessages(prev => [...prev, { role: 'ai', text: response, timestamp: new Date() }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'ai', text: "Audit system temporarily offline. Re-initializing sovereign defense...", timestamp: new Date() }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleChipAction = (action: string) => {
    switch(action) {
      case 'Audit Deal': onNavigate(AppView.CONTRACTS); break;
      case 'New Split': onNavigate(AppView.SPLITS); break;
      case 'Simulate Sync': handleSend("Can you simulate a potential sync deal revenue for my catalog?"); break;
      case 'Market Value': handleSend("What is the current fair market value of my artist identity based on current trends?"); break;
      default: handleSend(action);
    }
  };

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <header className="shrink-0">
        <h2 className="text-3xl font-bold tracking-tight text-white italic uppercase leading-none">AI Advisor</h2>
        <p className="text-slate-500 mt-2 text-sm">Strategic deal & rights advocacy.</p>
      </header>

      <div className="flex-1 min-h-0 flex flex-col glass rounded-[2.5rem] overflow-hidden border border-sky-500/10 relative shadow-2xl shadow-sky-950/20">
        <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-6 scrollbar-hide bg-slate-950/20">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex items-start gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''} animate-in fade-in slide-in-from-bottom-2`}>
              <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center border ${m.role === 'ai' ? 'bg-sky-500 border-white/20 shadow-[0_0_10px_rgba(56,189,248,0.4)]' : 'bg-slate-800 border-white/10'}`}>
                {m.role === 'ai' ? <BrainCircuit className="text-white w-4 h-4" /> : <User className="text-slate-200 w-4 h-4" />}
              </div>
              <div className={`max-w-[85%] p-4 rounded-2xl ${m.role === 'ai' ? 'glass text-slate-200 border-l-2 border-sky-400' : 'bg-sky-500 text-white font-bold shadow-lg shadow-sky-500/10'}`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.text}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-sky-500 flex items-center justify-center shadow-[0_0_10px_#38BDF8]">
                <Terminal className="text-white w-4 h-4 animate-pulse" />
              </div>
              <div className="glass px-4 py-3 rounded-2xl flex gap-1.5 border border-sky-500/10">
                 <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce"></div>
                 <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce delay-100"></div>
                 <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce delay-200"></div>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-3 flex gap-2 overflow-x-auto scrollbar-hide shrink-0 bg-slate-950/40">
          {['Audit Deal', 'New Split', 'Simulate Sync', 'Market Value'].map(chip => (
            <button key={chip} onClick={() => handleChipAction(chip)} className="whitespace-nowrap px-4 py-1.5 rounded-full bg-slate-900 border border-sky-500/10 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-sky-400 hover:border-sky-500/40 transition-all">
              {chip}
            </button>
          ))}
        </div>

        <div className="p-4 bg-slate-950/80 border-t border-white/5">
          <div className="relative">
            <input
              type="text"
              placeholder="Message RAP Advisor..."
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 pl-6 pr-14 text-sm text-slate-200 focus:outline-none focus:border-sky-500/50 transition-all shadow-inner"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-sky-500 text-white rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50 shadow-lg shadow-sky-500/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvisorView;
