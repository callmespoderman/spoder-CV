import React, { useState, useRef } from 'react';
import { 
  Printer, 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  LayoutTemplate, 
  Edit3, 
  ShieldCheck, 
  Eye, 
  RotateCcw,
  Camera,
  Trash2,
  Type,
  UserCheck
} from 'lucide-react';
import { ResumeData, TemplateStyle, ATSAnalysis, ResumeFont } from '../types';
import { TechCyberTemplate } from './templates/TechCyberTemplate';
import { ExecutiveTemplate } from './templates/ExecutiveTemplate';
import { AtsMinimalTemplate } from './templates/AtsMinimalTemplate';
import { CompactGridTemplate } from './templates/CompactGridTemplate';
import { BulletPolisherModal } from './BulletPolisherModal';
import { ResumeEditor } from './ResumeEditor';

interface ResumePreviewProps {
  resume: ResumeData;
  onUpdateResume: (updated: ResumeData) => void;
  activeTemplate: TemplateStyle;
  onChangeTemplate: (tmpl: TemplateStyle) => void;
  currentFont: ResumeFont;
  onChangeFont: (font: ResumeFont) => void;
  atsAnalysis: ATSAnalysis;
  onStartOver: () => void;
  onOpenEnhance?: () => void;
  onOpenPdfEditor?: () => void;
  onOpenPdfChecker?: () => void;
  onOpenPhotoAudit?: () => void;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({
  resume,
  onUpdateResume,
  activeTemplate,
  onChangeTemplate,
  currentFont,
  onChangeFont,
  atsAnalysis,
  onStartOver,
  onOpenEnhance,
  onOpenPdfEditor,
  onOpenPdfChecker,
  onOpenPhotoAudit
}) => {
  const [copied, setCopied] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showAtsModal, setShowAtsModal] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [polisherTarget, setPolisherTarget] = useState<{
    bullet: string;
    role: string;
    expId: string;
    bulletIdx: number;
  } | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onUpdateResume({
          ...resume,
          personal: {
            ...resume.personal,
            photoUrl: reader.result
          }
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyClipboard = () => {
    let txt = `${resume.personal.fullName} - ${resume.personal.jobTitle}\n${resume.personal.email} | ${resume.personal.location}\n\n${resume.personal.summary}\n\nEXPERIENCE:\n`;
    resume.experiences.forEach(e => {
      txt += `${e.role} @ ${e.company} (${e.startDate} - ${e.endDate})\n`;
      e.highlights.forEach(h => txt += `• ${h}\n`);
      txt += `\n`;
    });
    navigator.clipboard.writeText(txt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleApplyPolishedBullet = (newBullet: string) => {
    if (!polisherTarget) return;
    const { expId, bulletIdx } = polisherTarget;
    const updatedExperiences = resume.experiences.map(exp => {
      if (exp.id === expId) {
        const newHighlights = [...exp.highlights];
        newHighlights[bulletIdx] = newBullet;
        return { ...exp, highlights: newHighlights };
      }
      return exp;
    });
    onUpdateResume({
      ...resume,
      experiences: updatedExperiences
    });
    setPolisherTarget(null);
  };

  const fontClass = 
    currentFont === 'serif' ? 'resume-font-serif' :
    currentFont === 'mono' ? 'resume-font-mono' :
    currentFont === 'garamond' ? 'resume-font-garamond' :
    currentFont === 'grotesk' ? 'resume-font-grotesk' :
    'resume-font-sans';

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      {/* Friendly Action Bar */}
      <div className="no-print bg-[#0B101E] border border-[#1A2640] rounded-2xl p-4 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Template Style Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <span className="text-xs font-mono text-slate-400 mr-1 flex items-center gap-1">
            <LayoutTemplate className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Style:</span>
          </span>

          <button
            type="button"
            onClick={() => onChangeTemplate('tech-cyber')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeTemplate === 'tech-cyber'
                ? 'bg-[#E23636] text-white shadow-[0_0_10px_rgba(226,54,54,0.4)] font-bold'
                : 'bg-[#121B30] text-slate-300 hover:bg-[#1A2642]'
            }`}
          >
            Tech Cyber
          </button>

          <button
            type="button"
            onClick={() => onChangeTemplate('executive')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeTemplate === 'executive'
                ? 'bg-[#1E3A8A] text-white shadow-[0_0_10px_rgba(30,58,138,0.4)] font-bold'
                : 'bg-[#121B30] text-slate-300 hover:bg-[#1A2642]'
            }`}
          >
            Executive
          </button>

          <button
            type="button"
            onClick={() => onChangeTemplate('ats-minimal')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeTemplate === 'ats-minimal'
                ? 'bg-slate-700 text-white font-bold'
                : 'bg-[#121B30] text-slate-300 hover:bg-[#1A2642]'
            }`}
          >
            ATS Minimal
          </button>

          <button
            type="button"
            onClick={() => onChangeTemplate('compact-grid')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeTemplate === 'compact-grid'
                ? 'bg-[#E23636] text-white font-bold'
                : 'bg-[#121B30] text-slate-300 hover:bg-[#1A2642]'
            }`}
          >
            Compact Grid
          </button>

          {/* Font Family Selector */}
          <div className="flex items-center gap-1 bg-[#060A14] border border-[#1C2C4A] px-2 py-1 rounded-xl ml-0 md:ml-1">
            <Type className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span className="text-[11px] font-mono text-slate-400">Font:</span>
            <select
              value={currentFont}
              onChange={(e) => onChangeFont(e.target.value as ResumeFont)}
              className="bg-transparent text-xs font-mono text-white pl-1 pr-1 py-0.5 focus:outline-none cursor-pointer"
            >
              <option value="sans" className="bg-[#0B101E] text-white">Modern Sans</option>
              <option value="serif" className="bg-[#0B101E] text-white">Executive Serif</option>
              <option value="mono" className="bg-[#0B101E] text-white">Tech Mono</option>
              <option value="garamond" className="bg-[#0B101E] text-white">Classic Garamond</option>
              <option value="grotesk" className="bg-[#0B101E] text-white">Sharp Grotesk</option>
            </select>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
          {/* Photo Button & Quality Audit */}
          <input
            type="file"
            ref={photoInputRef}
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
          <div className="flex items-center gap-1 bg-[#121B30] border border-[#203050] rounded-xl p-0.5">
            <button
              type="button"
              onClick={() => {
                if (resume.personal.photoUrl) {
                  onUpdateResume({
                    ...resume,
                    personal: {
                      ...resume.personal,
                      photoUrl: undefined
                    }
                  });
                } else {
                  photoInputRef.current?.click();
                }
              }}
              className="px-2.5 py-1.5 text-slate-200 text-xs font-medium hover:text-white transition-colors flex items-center gap-1.5"
              title={resume.personal.photoUrl ? 'Remove Photo from CV' : 'Add Photo to CV'}
            >
              <Camera className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>{resume.personal.photoUrl ? 'Remove' : 'Add Photo'}</span>
            </button>

            {resume.personal.photoUrl && onOpenPhotoAudit && (
              <button
                type="button"
                onClick={onOpenPhotoAudit}
                className="px-2.5 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold hover:bg-emerald-900/60 transition-colors flex items-center gap-1"
                title="Inspect Posture, Dress, Hair & Background"
              >
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Audit Photo</span>
              </button>
            )}
          </div>

          {/* 3-Pass PDF Checker */}
          {onOpenPdfChecker && (
            <button
              type="button"
              onClick={onOpenPdfChecker}
              className="px-3.5 py-2 rounded-xl bg-[#121B30] hover:bg-[#1A2642] border border-[#203050] text-[#38BDF8] text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
              title="Run 3-Pass spelling, grammar, and ATS verification"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Check PDF (3x)</span>
            </button>
          )}

          {/* PDF Editor */}
          {onOpenPdfEditor && (
            <button
              type="button"
              onClick={onOpenPdfEditor}
              className="px-3.5 py-2 rounded-xl bg-[#121B30] hover:bg-[#1A2642] border border-[#203050] text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
              title="Launch precision PDF editor to add & match text"
            >
              <Edit3 className="w-3.5 h-3.5 text-[#E23636]" />
              <span>PDF Editor</span>
            </button>
          )}

          {/* Enhance Resume (Prominent) */}
          {onOpenEnhance && (
            <button
              type="button"
              onClick={onOpenEnhance}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#E23636] to-[#DC2626] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_12px_rgba(226,54,54,0.4)] transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Enhance</span>
            </button>
          )}

          {/* Edit / View Toggle */}
          <button
            type="button"
            onClick={() => setIsEditMode(!isEditMode)}
            className={`px-3 py-2 rounded-xl text-xs font-medium border transition-colors flex items-center gap-1.5 ${
              isEditMode
                ? 'bg-[#1E3A8A] border-[#3B82F6] text-white'
                : 'bg-[#121B30] border-[#203050] text-slate-200 hover:bg-[#1A2642]'
            }`}
          >
            {isEditMode ? <Eye className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
            <span>{isEditMode ? 'View CV' : 'Edit Text'}</span>
          </button>

          {/* ATS Score Badge */}
          <button
            type="button"
            onClick={() => setShowAtsModal(true)}
            className="px-3 py-2 rounded-xl bg-[#0F1D16] border border-emerald-500/40 text-emerald-300 hover:bg-emerald-950/40 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
            title="View ATS analysis"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{atsAnalysis.overallScore}% ATS</span>
          </button>

          {/* Windows Print / Download PDF (Hero Button) */}
          <button
            type="button"
            onClick={handlePrint}
            id="btn-print-pdf"
            className="px-4 py-2 rounded-xl bg-[#121B30] hover:bg-[#1A2642] border border-[#203050] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all"
          >
            <Printer className="w-4 h-4 text-[#38BDF8]" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Edit Mode View OR Resume Paper View */}
      {isEditMode ? (
        <div className="bg-[#0B101E] border border-[#1A2640] rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#162035]">
            <h3 className="text-sm font-bold text-white uppercase font-mono">
              Quick Content Editor
            </h3>
            <button
              type="button"
              onClick={() => setIsEditMode(false)}
              className="text-xs text-[#38BDF8] hover:underline font-mono"
            >
              Done Editing → View Formatted Resume
            </button>
          </div>
          <ResumeEditor
            resume={resume}
            onUpdateResume={onUpdateResume}
            onPolishBullet={(bullet, role, expId, bulletIdx) => setPolisherTarget({ bullet, role, expId, bulletIdx })}
          />
        </div>
      ) : (
        <div className="overflow-x-auto pb-12 flex justify-center">
          <div id="resume-document-sheet" className={`transition-all ${fontClass}`}>
            {activeTemplate === 'tech-cyber' && (
              <TechCyberTemplate 
                resume={resume} 
                onPolishBullet={(bullet, role, expId, bulletIdx) => setPolisherTarget({ bullet, role, expId, bulletIdx })}
              />
            )}
            {activeTemplate === 'executive' && (
              <ExecutiveTemplate 
                resume={resume} 
                onPolishBullet={(bullet, role, expId, bulletIdx) => setPolisherTarget({ bullet, role, expId, bulletIdx })}
              />
            )}
            {activeTemplate === 'ats-minimal' && (
              <AtsMinimalTemplate 
                resume={resume} 
                onPolishBullet={(bullet, role, expId, bulletIdx) => setPolisherTarget({ bullet, role, expId, bulletIdx })}
              />
            )}
            {activeTemplate === 'compact-grid' && (
              <CompactGridTemplate 
                resume={resume} 
                onPolishBullet={(bullet, role, expId, bulletIdx) => setPolisherTarget({ bullet, role, expId, bulletIdx })}
              />
            )}
          </div>
        </div>
      )}

      {/* ATS Friendly Modal */}
      {showAtsModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#0C1222] border border-[#22355A] rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#1A2846]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-bold text-white uppercase font-mono">
                  ATS Compatibility Score: {atsAnalysis.overallScore}%
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAtsModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="text-xs font-bold text-emerald-400 uppercase font-mono mb-1">
                  Validated Strengths:
                </h4>
                <ul className="text-xs text-slate-300 space-y-1 pl-3 list-disc">
                  {atsAnalysis.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#E23636] uppercase font-mono mb-1">
                  Recommended Additions:
                </h4>
                <ul className="text-xs text-slate-300 space-y-1 pl-3 list-disc">
                  {atsAnalysis.improvements.map((imp, i) => (
                    <li key={i}>{imp}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-[#1A2846]">
              <button
                type="button"
                onClick={() => setShowAtsModal(false)}
                className="px-4 py-2 rounded-xl bg-[#E23636] text-xs text-white font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bullet Polisher Modal */}
      {polisherTarget && (
        <BulletPolisherModal
          bullet={polisherTarget.bullet}
          role={polisherTarget.role}
          onApply={handleApplyPolishedBullet}
          onClose={() => setPolisherTarget(null)}
        />
      )}
    </div>
  );
};
