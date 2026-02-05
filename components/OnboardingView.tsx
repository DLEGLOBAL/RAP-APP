
import React, { useState, useEffect, useRef } from 'react';
import { Shield, Fingerprint, Cpu, CheckCircle2, Lock, ArrowRight, UserCheck, Smartphone } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

const OnboardingView: React.FC<Props> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (step === 2 && !isScanning) {
      startScanning();
    }
  }, [step]);

  const startScanning = async () => {
    setIsScanning(true);
    // Simulate biometric scan progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setStep(3), 800);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    // Try to get camera access for effect
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (e) {
      console.log("Camera access not available or denied - proceeding with simulation");
    }
  };

  const steps = [
    { title: 'Identity Initialization', desc: 'Secure your creative sovereignty with RAP — Real Artist Protection.' },
    { title: 'Cryptographic Biometrics', desc: 'Mapping your unique artist fingerprint for zero-trust verification powered by ROCC$TAR AI.' },
    { title: 'Zero-Trust Protocol', desc: 'Synchronizing with the global RAP rights ledger and security nodes.' },
    { title: 'Welcome to the Future', desc: 'Your protection layer is fully operational. You are now RAP-verified.' }
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-white overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00D632]/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full animate-pulse delay-700"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="flex flex-col items-center text-center mb-12 animate-in fade-in zoom-in duration-1000">
           <div className="w-20 h-20 bg-[#00D632] rounded-[2rem] flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(0,214,50,0.4)]">
             <Shield className="w-10 h-10 text-black" />
           </div>
           <h1 className="text-5xl font-bold tracking-tighter italic uppercase mb-2">RAP</h1>
           <p className="text-[#00D632] font-bold text-[10px] tracking-[0.3em] uppercase">Real Artist Protection</p>
           <p className="text-gray-600 text-[9px] mt-1 font-bold uppercase tracking-widest italic">Powered by ROCC$TAR AI</p>
        </div>

        <div className="glass p-8 rounded-[2.5rem] border border-white/10 relative overflow-hidden min-h-[400px] flex flex-col">
          <div className="flex-1">
             <div className="flex gap-1 mb-8">
               {[1, 2, 3, 4].map(s => (
                 <div key={s} className={`h-1 flex-1 rounded-full transition-all duration-500 ${step >= s ? 'bg-[#00D632]' : 'bg-white/10'}`}></div>
               ))}
             </div>

             <div className="animate-in fade-in slide-in-from-right-4 duration-500 key={step}">
               <h3 className="text-2xl font-bold mb-4">{steps[step-1].title}</h3>
               <p className="text-gray-400 text-sm leading-relaxed mb-8">{steps[step-1].desc}</p>

               {step === 1 && (
                 <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4">
                       <Lock className="w-6 h-6 text-gray-500" />
                       <span className="text-xs font-medium text-gray-300">End-to-end encrypted storage</span>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4">
                       <Smartphone className="w-6 h-6 text-gray-500" />
                       <span className="text-xs font-medium text-gray-300">Hardware isolation vault</span>
                    </div>
                    <button 
                      onClick={() => setStep(2)}
                      className="w-full mt-8 py-5 bg-[#00D632] text-black font-bold rounded-2xl flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(0,214,50,0.3)] transition-all active:scale-95"
                    >
                      Begin Verification <ArrowRight className="w-5 h-5" />
                    </button>
                 </div>
               )}

               {step === 2 && (
                 <div className="flex flex-col items-center">
                    <div className="w-48 h-48 rounded-[3rem] bg-black border-2 border-[#00D632]/20 relative overflow-hidden group">
                       <video 
                        ref={videoRef} 
                        autoPlay 
                        playsInline 
                        muted 
                        className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-60 transition-opacity"
                       />
                       <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div className="w-40 h-[2px] bg-[#00D632] shadow-[0_0_15px_#00D632] absolute animate-[scan_2s_ease-in-out_infinite]"></div>
                          <Fingerprint className="w-20 h-20 text-[#00D632] opacity-30" />
                       </div>
                    </div>
                    <div className="mt-8 w-full">
                       <div className="flex justify-between text-[10px] font-bold text-[#00D632] mb-2 uppercase">
                         <span>Analyzing Biometrics</span>
                         <span>{progress}%</span>
                       </div>
                       <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-[#00D632] transition-all duration-300 ease-linear" style={{ width: `${progress}%` }}></div>
                       </div>
                    </div>
                 </div>
               )}

               {step === 3 && (
                 <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 animate-in slide-in-from-left duration-500">
                       <CheckCircle2 className="w-5 h-5 text-[#00D632]" />
                       <span className="text-xs font-bold text-gray-300">Biometric Signature Generated</span>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 animate-in slide-in-from-left delay-200 duration-500">
                       <CheckCircle2 className="w-5 h-5 text-[#00D632]" />
                       <span className="text-xs font-bold text-gray-300">DID Synced with Global Nodes</span>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 animate-in slide-in-from-left delay-400 duration-500">
                       <CheckCircle2 className="w-5 h-5 text-[#00D632]" />
                       <span className="text-xs font-bold text-gray-300">RAP Intelligence Core Initialized</span>
                    </div>
                    <button 
                      onClick={() => setStep(4)}
                      className="w-full mt-8 py-5 bg-[#00D632] text-black font-bold rounded-2xl flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(0,214,50,0.3)] transition-all active:scale-95"
                    >
                      Synchronize Data <ArrowRight className="w-5 h-5" />
                    </button>
                 </div>
               )}

               {step === 4 && (
                 <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 bg-[#00D632]/10 rounded-full flex items-center justify-center mb-8 border border-[#00D632]/20 shadow-[0_0_30px_rgba(0,214,50,0.1)]">
                       <UserCheck className="w-10 h-10 text-[#00D632]" />
                    </div>
                    <h4 className="text-xl font-bold mb-2">RAP Verified</h4>
                    <p className="text-xs text-gray-500 mb-10 leading-relaxed px-4">
                      Your identity is now anchored to the RAP Security Core. Every split, contract, and payout is under your cryptographic control.
                    </p>
                    <button 
                      onClick={onComplete}
                      className="w-full py-5 bg-white text-black font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-[#00D632] hover:text-black transition-all active:scale-95"
                    >
                      Enter Intelligence Core <ArrowRight className="w-5 h-5" />
                    </button>
                 </div>
               )}
             </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
           <Cpu className="w-6 h-6" />
           <Lock className="w-6 h-6" />
           <Shield className="w-6 h-6" />
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0%, 100% { top: 0; }
          50% { top: 100%; }
        }
      `}</style>
    </div>
  );
};

export default OnboardingView;
