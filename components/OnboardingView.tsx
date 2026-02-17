
import React, { useState, useEffect, useRef } from 'react';
import { Shield, Fingerprint, Cpu, CheckCircle2, Lock, ArrowRight, UserCheck, Smartphone, User, AtSign, Binary } from 'lucide-react';
import { UserProfile } from '../types';
import { generateDID } from '../services/securityService';

interface Props {
  onComplete: (profile: UserProfile) => void;
}

const OnboardingView: React.FC<Props> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [name, setName] = useState('');
  const [legalName, setLegalName] = useState('');

  useEffect(() => {
    if (step === 3 && !isScanning) {
      startScanning();
    }
  }, [step]);

  const startScanning = async () => {
    setIsScanning(true);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setStep(4), 800);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (e) {
      console.log("Camera simulation mode active");
    }
  };

  const steps = [
    { title: 'Identity Anchor', desc: 'Secure your stage identity with Decentralized Proofs.' },
    { title: 'Enclave Initialization', desc: 'Activate hardware-level isolation for your sovereign data.' },
    { title: 'Neural Biometrics', desc: 'Mapping your unique vocal and facial fingerprint to a DID.' },
    { title: 'Core Synchronized', desc: 'Zero-trust infrastructure is fully operational.' }
  ];

  const handleFinish = () => {
    const wallet = `0x${Math.random().toString(16).slice(2, 42)}`;
    onComplete({
      name: name || 'Anonymous Artist',
      legalName: legalName || name || 'Anonymous',
      walletAddress: wallet,
      did: generateDID(wallet),
      verifiedAt: new Date().toISOString()
    });
  };

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6 text-slate-50 overflow-hidden relative">
      {/* Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-sky-500/10 blur-[150px] rounded-full animate-pulse-blue"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 blur-[150px] rounded-full animate-pulse-blue delay-700"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="flex flex-col items-center text-center mb-10 animate-in fade-in zoom-in duration-1000">
           <div className="w-20 h-20 bg-sky-500 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(56,189,248,0.4)] border border-white/20">
             <Shield className="w-10 h-10 text-white" />
           </div>
           <h1 className="text-5xl font-bold tracking-tighter italic uppercase leading-none text-slate-50 drop-shadow-md">RAP</h1>
           <p className="text-sky-400 font-bold text-[10px] tracking-[0.3em] uppercase mt-1">Real Artist Protection</p>
        </div>

        <div className="glass p-8 rounded-[2.5rem] border border-sky-500/10 min-h-[460px] flex flex-col shadow-2xl shadow-sky-900/20">
          <div className="flex-1">
             <div className="flex gap-1 mb-10">
               {[1, 2, 3, 4].map(s => (
                 <div key={s} className={`h-1 flex-1 rounded-full transition-all duration-500 ${step >= s ? 'bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.5)]' : 'bg-slate-800'}`}></div>
               ))}
             </div>

             <div className="animate-in fade-in slide-in-from-right-4 duration-500">
               <h3 className="text-2xl font-bold mb-2 tracking-tight text-slate-100">{steps[step-1].title}</h3>
               <p className="text-slate-400 text-sm leading-relaxed mb-8">{steps[step-1].desc}</p>

               {step === 1 && (
                 <div className="space-y-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Artist Identifier</label>
                       <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                          <input 
                            type="text" 
                            className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-sky-500/50 transition-all text-slate-200"
                            placeholder="e.g. Neon Ghost"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Legal Entity (Encrypted)</label>
                       <div className="relative">
                          <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                          <input 
                            type="text" 
                            className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-sky-500/50 transition-all text-slate-200"
                            placeholder="Full Name or LLC"
                            value={legalName}
                            onChange={(e) => setLegalName(e.target.value)}
                          />
                       </div>
                    </div>
                    <button 
                      onClick={() => setStep(2)}
                      disabled={!name}
                      className="w-full mt-6 py-5 bg-sky-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 disabled:opacity-50 transition-all shadow-lg shadow-sky-500/20 hover:bg-sky-400 active:scale-95"
                    >
                      Generate Sovereign Key <ArrowRight className="w-5 h-5" />
                    </button>
                 </div>
               )}

               {step === 2 && (
                 <div className="space-y-4">
                    <div className="p-5 bg-slate-900/50 rounded-2xl border border-sky-500/10 flex items-start gap-4">
                       <Binary className="w-6 h-6 text-sky-400 shrink-0" />
                       <div>
                          <p className="text-sm font-bold text-slate-100">Zero-Trust Architecture</p>
                          <p className="text-xs text-slate-500 mt-0.5">Initializing partitioned data vaults for rights and revenue.</p>
                       </div>
                    </div>
                    <div className="p-5 bg-slate-900/50 rounded-2xl border border-sky-500/10 flex items-start gap-4">
                       <Lock className="w-6 h-6 text-indigo-400 shrink-0" />
                       <div>
                          <p className="text-sm font-bold text-slate-100">Enclave Isolation</p>
                          <p className="text-xs text-slate-500 mt-0.5">Encrypting private keys within local hardware enclaves.</p>
                       </div>
                    </div>
                    <button 
                      onClick={() => setStep(3)}
                      className="w-full mt-6 py-5 bg-sky-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-sky-500/20 hover:bg-sky-400 active:scale-95"
                    >
                      Verify Bio-Identity <ArrowRight className="w-5 h-5" />
                    </button>
                 </div>
               )}

               {step === 3 && (
                 <div className="flex flex-col items-center">
                    <div className="w-48 h-48 rounded-[3rem] bg-slate-950 border-2 border-sky-500/20 relative overflow-hidden group shadow-inner shadow-sky-500/5">
                       <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover grayscale opacity-40 contrast-125" />
                       <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div className="w-40 h-[2px] bg-sky-400 shadow-[0_0_15px_#38BDF8] absolute animate-[scan_2.5s_ease-in-out_infinite]"></div>
                          <Fingerprint className="w-16 h-16 text-sky-400 opacity-20" />
                       </div>
                    </div>
                    <div className="mt-8 w-full">
                       <div className="flex justify-between text-[10px] font-bold text-sky-400 mb-2 uppercase tracking-widest">
                         <span>Mapping DID Nodes</span>
                         <span>{progress}%</span>
                       </div>
                       <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-sky-400 shadow-[0_0_8px_#38BDF8] transition-all duration-300" style={{ width: `${progress}%` }}></div>
                       </div>
                    </div>
                 </div>
               )}

               {step === 4 && (
                 <div className="flex flex-col items-center text-center py-4">
                    <div className="w-20 h-20 bg-sky-500/10 rounded-full flex items-center justify-center mb-8 border border-sky-500/20 shadow-[0_0_30px_rgba(56,189,248,0.1)]">
                       <UserCheck className="w-10 h-10 text-sky-400" />
                    </div>
                    <h4 className="text-xl font-bold mb-2 text-slate-100">Enclave Synchronized</h4>
                    <p className="text-xs text-slate-500 mb-10 leading-relaxed">
                      Your identity and assets are now anchored to the RAP Secure Infrastructure. Sovereign protection is active.
                    </p>
                    <button 
                      onClick={handleFinish}
                      className="w-full py-5 bg-white text-slate-900 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-sky-400 hover:text-white transition-all shadow-xl shadow-sky-500/10 active:scale-95"
                    >
                      Enter Secure Domain <ArrowRight className="w-5 h-5" />
                    </button>
                 </div>
               )}
             </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes scan { 0%, 100% { top: 10%; } 50% { top: 90%; } }
      `}</style>
    </div>
  );
};

export default OnboardingView;
