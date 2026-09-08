import React, { useState } from 'react';
import { 
  Terminal, 
  Minus, 
  Square, 
  X, 
  Sparkles, 
  Cpu, 
  ShieldCheck, 
  Maximize2 
} from 'lucide-react';

interface WindowsTitlebarProps {
  onReset: () => void;
  onPreloadDemo: () => void;
  isAiBusy: boolean;
}

export const WindowsTitlebar: React.FC<WindowsTitlebarProps> = ({
  onReset,
  onPreloadDemo,
  isAiBusy
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className="windows-titlebar no-print select-none bg-[#070B14] border-b border-[#1B253B] px-3 py-1.5 flex items-center justify-between text-xs text-slate-300">
      {/* Left: App Identity & System Badge */}
      <div className="flex items-center gap-2.5">
        <div className="flex items-center justify-center w-5 h-5 rounded bg-gradient-to-br from-[#E23636] to-[#1E3A8A] text-white shadow-[0_0_8px_rgba(226,54,54,0.4)]">
          <Terminal className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="font-semibold tracking-wide text-slate-100 uppercase">
          SPODER RESUME <span className="text-[#E23636] font-mono">//</span> <span className="text-slate-400 font-normal">Windows Edition</span>
        </span>
        <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#10192C] border border-[#213254] text-[10px] text-[#38BDF8] font-mono">
          <Cpu className="w-3 h-3 text-[#E23636]" />
          <span>GEMINI-3.8-CORE</span>
        </div>
        {isAiBusy && (
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#E23636]/10 border border-[#E23636]/40 text-[#EF4444] text-[10px] font-mono animate-pulse">
            <Sparkles className="w-3 h-3 animate-spin" />
            <span>AI SYNTHESIZING...</span>
          </div>
        )}
      </div>

      {/* Middle: System Actions */}
      <div className="hidden md:flex items-center gap-2">
        <button
          onClick={onPreloadDemo}
          id="btn-preload-demo"
          className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#0F172A] hover:bg-[#1E293B] border border-[#263756] text-slate-200 transition-colors text-[11px]"
          title="Load sample Lead Systems Engineer profile with documents"
        >
          <Sparkles className="w-3 h-3 text-[#E23636]" />
          <span>Load Tech Lead Sample</span>
        </button>
        <button
          onClick={onReset}
          id="btn-reset-form"
          className="px-2 py-1 rounded bg-[#0F172A] hover:bg-[#1E293B] border border-[#263756] text-slate-300 transition-colors text-[11px]"
          title="Reset to blank form"
        >
          Clear Workspace
        </button>
      </div>

      {/* Right: Windows Window Controls */}
      <div className="flex items-center gap-1">
        <div className="hidden lg:flex items-center gap-1.5 mr-2 text-[10px] font-mono text-slate-400">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span>ATS VETTING: ACTIVE</span>
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-7 h-6 flex items-center justify-center rounded hover:bg-[#1E293B] text-slate-400 hover:text-slate-100 transition-colors"
          title="Minimize to top"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={toggleFullscreen}
          className="w-7 h-6 flex items-center justify-center rounded hover:bg-[#1E293B] text-slate-400 hover:text-slate-100 transition-colors"
          title={isFullscreen ? "Exit Fullscreen" : "Maximize / Fullscreen"}
        >
          {isFullscreen ? <Maximize2 className="w-3 h-3" /> : <Square className="w-3 h-3" />}
        </button>
        <button
          onClick={() => {
            if (confirm('Close current resume session? This will reload the workspace.')) {
              window.location.reload();
            }
          }}
          className="w-7 h-6 flex items-center justify-center rounded hover:bg-[#E23636] text-slate-400 hover:text-white transition-colors"
          title="Close Session"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
