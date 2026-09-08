import React from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, Plus, Sparkles, Target, Zap } from 'lucide-react';
import { ATSAnalysis, ResumeData } from '../types';

interface AtsPanelProps {
  analysis: ATSAnalysis;
  resume: ResumeData;
  onAddSkill: (skill: string) => void;
}

export const AtsPanel: React.FC<AtsPanelProps> = ({
  analysis,
  resume,
  onAddSkill
}) => {
  return (
    <div className="space-y-6">
      {/* Top ATS Score Summary Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0F172C] via-[#0A1020] to-[#1A1224] border border-[#22355A] shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* Circular Gauge */}
            <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#E23636]"
                  strokeDasharray={`${analysis.overallScore}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-white font-mono">{analysis.overallScore}%</span>
                <span className="text-[9px] uppercase font-mono text-[#38BDF8]">ATS Score</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white uppercase font-mono tracking-wide">
                  ATS Parser Compatibility Audit
                </h3>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
                Evaluated against Fortune 500 applicant tracking systems (Workday, Taleo, Greenhouse, Lever). Your resume incorporates strong action verbs, quantifiable metrics, and verified document credentials.
              </p>
            </div>
          </div>

          {/* Sub-Score Bars */}
          <div className="w-full md:w-64 space-y-2.5 bg-[#060A14] p-3.5 rounded-xl border border-[#17253E] shrink-0">
            <div>
              <div className="flex justify-between text-[11px] font-mono text-slate-300 mb-1">
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-[#E23636]" />
                  <span>Impact & Metrics:</span>
                </span>
                <span className="font-bold text-white">{analysis.impactScore}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#E23636] to-[#DC2626]" 
                  style={{ width: `${analysis.impactScore}%` }} 
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-mono text-slate-300 mb-1">
                <span className="flex items-center gap-1">
                  <Target className="w-3 h-3 text-[#38BDF8]" />
                  <span>Keyword Density:</span>
                </span>
                <span className="font-bold text-white">{analysis.keywordScore}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#1E3A8A] to-[#2563EB]" 
                  style={{ width: `${analysis.keywordScore}%` }} 
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-mono text-slate-300 mb-1">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  <span>Parsing Fidelity:</span>
                </span>
                <span className="font-bold text-white">{analysis.brevityScore}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400" 
                  style={{ width: `${analysis.brevityScore}%` }} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Strengths & Improvements Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strengths */}
        <div className="p-4 rounded-xl bg-[#090E1A] border border-[#182640] space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>Validated Resume Strengths</span>
          </div>
          <ul className="space-y-2">
            {analysis.strengths.map((str, idx) => (
              <li key={idx} className="text-xs text-slate-300 flex items-start gap-2 leading-relaxed">
                <span className="text-emerald-400 font-bold mt-0.5">•</span>
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Improvements */}
        <div className="p-4 rounded-xl bg-[#090E1A] border border-[#182640] space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#E23636]">
            <AlertTriangle className="w-4 h-4" />
            <span>Optimization Recommendations</span>
          </div>
          <ul className="space-y-2">
            {analysis.improvements.map((imp, idx) => (
              <li key={idx} className="text-xs text-slate-300 flex items-start gap-2 leading-relaxed">
                <span className="text-[#E23636] font-bold mt-0.5">•</span>
                <span>{imp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommended Keywords to add with 1-click */}
      {analysis.missingKeywords && analysis.missingKeywords.length > 0 && (
        <div className="p-4 rounded-xl bg-[#090E1A] border border-[#182640] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-sky-400">
              <Sparkles className="w-4 h-4 text-[#38BDF8]" />
              <span>Recommended Industry Keywords (Target: {resume.personal.jobTitle})</span>
            </div>
            <span className="text-[11px] text-slate-400">Click to add to skills</span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {analysis.missingKeywords.map((kw, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onAddSkill(kw)}
                className="px-3 py-1.5 rounded-lg bg-[#10192E] hover:bg-[#1A284A] border border-[#22355C] text-xs text-slate-200 hover:text-white flex items-center gap-1.5 transition-all shadow-sm group"
              >
                <Plus className="w-3 h-3 text-[#E23636] group-hover:rotate-90 transition-transform" />
                <span>{kw}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
