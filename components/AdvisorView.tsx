
import React, { useState, useRef, useEffect } from 'react';
import { Send, Cpu, BrainCircuit, ShieldCheck, TrendingUp, HelpCircle, Sparkles, User, UserPlus, Activity, ShieldAlert } from 'lucide-react';
import { getAdvisorAdvice } from '../services/geminiService';

interface Message {
  role: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

const AdvisorView: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: "Welcome to the RAP War Room, Storm Hunter. I've completed a forensic audit of your metadata lineage. We found 3 uncleared samples in your recent demo folder—I've prepared the clearance scenarios. How would you like to proceed?", timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg: Message = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const history = messages.map(m => ({ role: m.role === 'ai' ? 'model' : 'user', text: m.text }));
      const response = await getAdvisorAdvice(history, input);
      setMessages(prev => [...prev, { role: 'ai', text: response, timestamp: new Date() }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'ai', text: "Neural connection interrupted. Re-securing communication line...", timestamp: new Date() }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 shrink-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white italic uppercase flex items-center gap-3">
            <BrainCircuit className="w-8 h-8 text-[#00D632]" />
            Advisor Intelligence
          </h2>
          <p className="text-gray-500 mt-1">Sovereign rights advocacy & deal forensics.</p>
        </div>
        <div className="flex gap-2">
          {['Simulate Deal', 'Predatory Check', 'Tax Logic', 'Emotional Scan'].map(chip => (
             <button key={chip} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#00D632] hover:bg-[#00D632]/5 hover:border-[#00D632]/30 transition-all">
               {chip}
             </button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 flex flex-col glass rounded-[2.5rem] overflow-hidden border border-white/5 relative shadow-2xl">
          {/* Chat area */}
          <div ref={scrollRef} className="flex-1 p-8 overflow-y-auto space-y-8 scrollbar-hide bg-black/20">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex items-start gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''} animate-in fade-in slide-in-from-bottom-2`}>
                <div className={`w-10 h-10 rounded-2xl shrink-0 flex items-center justify-center border ${m.role === 'ai' ? 'bg-[#00D632] border-[#00D632]/20 shadow-[0_0_15px_rgba(0,214,50,0.3)]' : 'bg-white/5 border-white/10'}`}>
                  {m.role === 'ai' ? <Cpu className="text-black w-6 h-6" /> : <User className="text-white w-5 h-5" />}
                </div>
                <div className={`max-w-[80%] p-5 rounded-3xl ${m.role === 'ai' ? 'glass text-gray-200 border-l-2 border-[#00D632]' : 'bg-[#00D632] text-black font-bold'}`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.text}</p>
                  <p className={`text-[8px] mt-2 font-bold uppercase tracking-widest ${m.role === 'ai' ? 'text-gray-500' : 'text-black/60'}`}>
                    {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#00D632] flex items-center justify-center">
                  <Cpu className="text-black w-6 h-6 animate-spin" />
                </div>
                <div className="glass px-6 py-4 rounded-3xl flex gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#00D632] animate-bounce"></div>
                   <div className="w-1.5 h-1.5 rounded-full bg-[#00D632] animate-bounce delay-100"></div>
                   <div className="w-1.5 h-1.5 rounded-full bg-[#00D632] animate-bounce delay-200"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input area */}
          <div className="p-6 bg-black/40 border-t border-white/10">
            <div className="relative">
              <input
                type="text"
                placeholder="Paste a contract clause or ask for deal analysis..."
                className="w-full bg-black/60 border border-white/10 rounded-2xl py-5 pl-6 pr-20 text-sm text-gray-200 focus:outline-none focus:border-[#00D632]/50 transition-all shadow-inner"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#00D632] text-black rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass p-6 rounded-[2rem] border border-red-500/20">
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-500" />
              Manipulation Scan
            </h4>
            <div className="p-4 bg-red-500/5 rounded-2xl border border-red-500/10">
               <p className="text-[10px] text-gray-300 font-medium">No predatory emotional tactics detected in recent incoming communications.</p>
            </div>
          </div>

          <div className="glass p-6 rounded-[2rem] border border-blue-500/20">
             <h4 className="font-bold mb-4 flex items-center gap-2">
               <TrendingUp className="w-4 h-4 text-blue-500" />
               FMV Real-time
             </h4>
             <div className="space-y-4">
                <div>
                   <p className="text-[10px] text-gray-500 uppercase font-bold">Catalog Market Value</p>
                   <p className="text-2xl font-bold mono">$1.84M</p>
                </div>
                <div className="p-3 bg-white/5 rounded-xl">
                   <p className="text-[9px] text-blue-400 font-bold uppercase mb-1">Leverage Score</p>
                   <p className="text-xs text-gray-300 italic">"You are in a high-leverage position for sync negotiation."</p>
                </div>
             </div>
          </div>

          <div className="glass p-6 rounded-[2rem]">
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#00D632]" />
              Active Forensics
            </h4>
            <div className="space-y-3">
              {[
                { label: 'Metadata Audit', active: true },
                { label: 'Neighboring Rights', active: false },
                { label: 'Blackbox Leakage', active: true }
              ].map((task, i) => (
                <div key={i} className="flex items-center justify-between p-2">
                  <span className="text-xs text-gray-400">{task.label}</span>
                  <div className={`w-2 h-2 rounded-full ${task.active ? 'bg-[#00D632] animate-pulse' : 'bg-white/10'}`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvisorView;
