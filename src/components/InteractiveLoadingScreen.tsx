import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Search, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  FileCheck,
  Activity
} from 'lucide-react';

interface InteractiveLoadingScreenProps {
  title?: string;
  subtitle?: string;
  stageName?: string;
  progress?: number; // 0 - 100
  passNumber?: 1 | 2 | 3;
  onBoost?: () => void;
  canCancel?: boolean;
  onCancel?: () => void;
}

export const InteractiveLoadingScreen: React.FC<InteractiveLoadingScreenProps> = ({
  title = "3-Pass Deep PDF Analysis",
  subtitle = "Scanning document lexicon, grammar rules, and ATS compliance",
  stageName = "Pass 1: Checking spelling and tech lexicon...",
  progress = 45,
  passNumber = 1,
  onBoost,
  canCancel = false,
  onCancel
}) => {
  const [interactiveFocalPoint, setInteractiveFocalPoint] = useState({ x: 50, y: 50 });
  const [boostCount, setBoostCount] = useState(0);
  const [telemetryWords, setTelemetryWords] = useState(312);
  const [telemetryRules, setTelemetryRules] = useState(24);
  const [tipIndex, setTipIndex] = useState(0);

  const tips = [
    "Tech recruiters scan candidate resumes in an average of 6.2 seconds.",
    "Correct technology capitalization (e.g. 'JavaScript', 'PostgreSQL') improves ATS parsing score by 18%.",
    "Active past-tense verbs (Engineered, Architected, Spearheaded) yield 35% higher response rates.",
    "Quantifying accomplishments with percentages and dollar savings significantly elevates interview calls.",
    "Ensuring high-contrast text and standard ATS heading structures guarantees parsing success."
  ];

  useEffect(() => {
    const tipInterval = setInterval(() => {
      setTipIndex(prev => (prev + 1) % tips.length);
    }, 4000);

    const telemetryInterval = setInterval(() => {
      setTelemetryWords(w => Math.min(1850, w + Math.floor(Math.random() * 45) + 15));
      setTelemetryRules(r => Math.min(96, r + Math.floor(Math.random() * 3) + 1));
    }, 300);

    return () => {
      clearInterval(tipInterval);
      clearInterval(telemetryInterval);
    };
  }, [tips.length]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setInteractiveFocalPoint({ x, y });
  };

  const handleBoostClick = () => {
    setBoostCount(c => c + 1);
    setTelemetryWords(w => w + 120);
    setTelemetryRules(r => Math.min(96, r + 8));
    if (onBoost) onBoost();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#060912]/95 backdrop-blur-md flex items-center justify-center p-4 select-none">
      {/* Background ambient glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${interactiveFocalPoint.x}% ${interactiveFocalPoint.y}%, rgba(226, 54, 54, 0.15), rgba(30, 58, 138, 0.12), transparent 70%)`
        }}
      />

      <div 
        onMouseMove={handleMouseMove}
        className="relative w-full max-w-2xl bg-[#090E1B] border border-[#1E2D4A] rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[#141F36] pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E23636]/20 border border-[#E23636]/40 flex items-center justify-center text-[#E23636]">
              <Cpu className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white uppercase font-mono tracking-wider">
                {title}
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                {subtitle}
              </p>
            </div>
          </div>

          {/* Interactive Boost Button */}
          <button
            type="button"
            onClick={handleBoostClick}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#E23636]/20 to-[#1E3A8A]/30 hover:from-[#E23636]/40 hover:to-[#1E3A8A]/50 border border-[#E23636]/40 text-[11px] font-mono font-bold text-white transition-all transform active:scale-95 shadow-sm"
            title="Click to boost scanner frequency!"
          >
            <Zap className={`w-3.5 h-3.5 text-[#E23636] ${boostCount > 0 ? 'animate-bounce' : ''}`} />
            <span>Turbo Scan {boostCount > 0 && `(x${boostCount + 1})`}</span>
          </button>
        </div>

        {/* Central Holographic Laser Stage */}
        <div className="relative h-56 bg-[#050811] rounded-xl border border-[#16233E] p-4 flex flex-col justify-between overflow-hidden">
          {/* Laser Scanner Bar */}
          <div 
            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E23636] to-transparent shadow-[0_0_15px_#E23636] animate-laser-sweep pointer-events-none z-20"
          />

          {/* Grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          {/* Holographic Wireframe Document */}
          <div className="relative z-10 w-full max-w-sm mx-auto h-full flex flex-col justify-around opacity-80 pointer-events-none">
            {/* Header skeleton */}
            <div className="flex items-center gap-3 border-b border-slate-800/80 pb-2">
              <div className="w-10 h-10 rounded-lg bg-[#E23636]/20 border border-[#E23636]/40 animate-pulse" />
              <div className="space-y-1.5 flex-1">
                <div className="h-2.5 bg-slate-700/80 rounded w-2/3" />
                <div className="h-2 bg-blue-900/60 rounded w-1/3" />
              </div>
            </div>

            {/* Paragraph skeleton with scanning highlights */}
            <div className="space-y-2 py-1">
              <div className="h-2 bg-slate-800/80 rounded w-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent animate-pulse" />
              </div>
              <div className="h-2 bg-slate-800/80 rounded w-5/6" />
              <div className="h-2 bg-slate-800/80 rounded w-4/6" />
            </div>

            {/* Bullets skeleton */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#E23636]" />
                <div className="h-2 bg-slate-800 rounded flex-1" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                <div className="h-2 bg-slate-800 rounded w-4/5" />
              </div>
            </div>
          </div>

          {/* Interactive cursor tracking spot */}
          <div 
            className="absolute pointer-events-none w-16 h-16 rounded-full border border-cyan-400/30 bg-cyan-400/5 transition-all duration-75 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center text-[8px] font-mono text-cyan-300"
            style={{ left: `${interactiveFocalPoint.x}%`, top: `${interactiveFocalPoint.y}%` }}
          >
            <div className="w-1 h-1 rounded-full bg-cyan-400 animate-ping" />
          </div>

          {/* Telemetry Footer inside stage */}
          <div className="relative z-20 flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-[#131D33] pt-2">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
              Words: <strong className="text-white">{telemetryWords}</strong>
            </span>
            <span>
              Rules: <strong className="text-emerald-400">{telemetryRules}/96</strong>
            </span>
            <span className="text-[#38BDF8]">
              Target: <strong className="text-white">100% ATS Ready</strong>
            </span>
          </div>
        </div>

        {/* 3-Pass Check Progress Indicator */}
        <div className="mt-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-white font-bold">{stageName}</span>
            <span className="text-[#E23636] font-bold">{Math.round(progress)}%</span>
          </div>

          {/* Overall progress bar */}
          <div className="w-full h-2 rounded-full bg-[#0E172A] border border-[#1A2640] overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#E23636] via-[#EF4444] to-[#38BDF8]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* 3 Sequential Pass Badges */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            {/* Pass 1 */}
            <div className={`p-2 rounded-lg border text-[11px] font-mono transition-all ${
              passNumber >= 1 
                ? passNumber === 1 
                  ? 'bg-[#E23636]/10 border-[#E23636] text-white' 
                  : 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
                : 'bg-[#0A101D] border-[#162238] text-slate-500'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-bold">PASS 01</span>
                {passNumber > 1 ? (
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                ) : passNumber === 1 ? (
                  <span className="w-2 h-2 rounded-full bg-[#E23636] animate-pulse" />
                ) : null}
              </div>
              <div className="text-[10px] mt-0.5 truncate">Lexicon &amp; Spelling</div>
            </div>

            {/* Pass 2 */}
            <div className={`p-2 rounded-lg border text-[11px] font-mono transition-all ${
              passNumber >= 2 
                ? passNumber === 2 
                  ? 'bg-[#2563EB]/10 border-[#38BDF8] text-white' 
                  : 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
                : 'bg-[#0A101D] border-[#162238] text-slate-500'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-bold">PASS 02</span>
                {passNumber > 2 ? (
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                ) : passNumber === 2 ? (
                  <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
                ) : null}
              </div>
              <div className="text-[10px] mt-0.5 truncate">Grammar &amp; Tenses</div>
            </div>

            {/* Pass 3 */}
            <div className={`p-2 rounded-lg border text-[11px] font-mono transition-all ${
              passNumber >= 3 
                ? 'bg-emerald-500/10 border-emerald-400 text-white' 
                : 'bg-[#0A101D] border-[#162238] text-slate-500'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-bold">PASS 03</span>
                {passNumber >= 3 ? (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                ) : null}
              </div>
              <div className="text-[10px] mt-0.5 truncate">ATS &amp; Compliance</div>
            </div>
          </div>
        </div>

        {/* Dynamic Tip Banner */}
        <div className="mt-4 p-3 rounded-xl bg-[#0C1322] border border-[#17233D] flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
          <div className="text-[11px] text-slate-300 font-mono leading-relaxed">
            <strong className="text-white">Pro Tip: </strong>
            {tips[tipIndex]}
          </div>
        </div>

        {/* Optional cancel button */}
        {canCancel && onCancel && (
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={onCancel}
              className="text-xs text-slate-400 hover:text-white font-mono underline"
            >
              Skip / Cancel Scan
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
