import React from 'react';
import { Cpu, ShieldCheck, FileCheck, Terminal, Keyboard } from 'lucide-react';

interface WindowsStatusbarProps {
  documentCount: number;
  atsScore: number;
  isAiBusy: boolean;
}

export const WindowsStatusbar: React.FC<WindowsStatusbarProps> = ({
  documentCount,
  atsScore,
  isAiBusy
}) => {
  return (
    <footer className="windows-statusbar no-print fixed bottom-0 left-0 right-0 z-40 bg-[#060A13] border-t border-[#172338] px-3 py-1 text-[11px] font-mono text-slate-400 select-none flex items-center justify-between">
      {/* Left items */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-slate-300">
          <Terminal className="w-3 h-3 text-[#E23636]" />
          <span className="font-bold text-slate-200">SPODER RESUME</span>
          <span className="text-slate-600">|</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {isAiBusy ? 'PROCESSING' : 'SYSTEM READY'}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-slate-400">
          <Cpu className="w-3 h-3 text-[#38BDF8]" />
          <span>GEMINI 3.8 FLASH CORE</span>
        </div>

        <div className="hidden md:flex items-center gap-1.5 text-slate-400">
          <FileCheck className="w-3 h-3 text-[#E23636]" />
          <span>VAULT: {documentCount} ATTACHED</span>
        </div>
      </div>

      {/* Right items */}
      <div className="flex items-center gap-4">
        <div className="hidden lg:flex items-center gap-2 text-slate-500">
          <Keyboard className="w-3 h-3 text-slate-400" />
          <span>Ctrl+P: Print PDF</span>
          <span>•</span>
          <span>Ctrl+Enter: Generate</span>
        </div>

        <div className="flex items-center gap-1.5 text-slate-300 bg-[#0F1728] px-2 py-0.5 rounded border border-[#1E2E4E]">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span className="text-white font-bold">{atsScore}%</span>
          <span className="text-slate-400 text-[10px]">ATS</span>
        </div>
      </div>
    </footer>
  );
};
