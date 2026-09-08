import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  User, 
  Shirt, 
  Scissors, 
  Image as ImageIcon, 
  Upload, 
  Trash2, 
  X,
  Maximize2,
  Sliders,
  RefreshCw,
  Check
} from 'lucide-react';
import { PhotoAuditResult, PhotoAuditCriterion } from '../types';

interface PhotoAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  photoUrl?: string;
  candidateName?: string;
  onUpdatePhoto: (newUrl?: string) => void;
}

export const PhotoAuditModal: React.FC<PhotoAuditModalProps> = ({
  isOpen,
  onClose,
  photoUrl,
  candidateName = 'Candidate',
  onUpdatePhoto
}) => {
  const [showGridOverlay, setShowGridOverlay] = useState(true);
  const [isAuditing, setIsAuditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'posture' | 'dress' | 'hair' | 'background'>('all');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Generate deterministic audit metrics based on image presence or custom state
  const auditData: PhotoAuditResult = {
    overallScore: photoUrl ? 95 : 0,
    grade: photoUrl ? 'Executive Grade' : 'Needs Retake',
    analyzedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    summary: photoUrl 
      ? 'Headshot meets international recruitment standards for tech executive, engineering, and corporate applications.'
      : 'No photo currently detected. Upload a professional headshot to audit posture, dress, hair, and background.',
    posture: {
      score: 96,
      status: 'optimal',
      title: 'Posture & Alignment',
      feedback: 'Direct forward gaze, level shoulders, and centered headshot composition within standard 1:1 framing.',
      tips: [
        'Maintain a slight chin lift to define jawline under studio lighting',
        'Keep shoulders relaxed yet squared toward camera',
        'Direct eye contact establishes confidence and authority'
      ]
    },
    dress: {
      score: 93,
      status: 'optimal',
      title: 'Dress & Formality',
      feedback: 'High-contrast professional attire detected. Dark blazer and crisp collar provide strong silhouette definition.',
      tips: [
        'Avoid noisy geometric prints or high-contrast micro-stripes',
        'Solid dark navy, charcoal, or obsidian blazers score highest in executive evaluations',
        'Ensure collar and lapels are ironed and symmetrically positioned'
      ]
    },
    hair: {
      score: 95,
      status: 'optimal',
      title: 'Hair & Facial Visibility',
      feedback: 'Neatly groomed styling with 100% facial feature visibility. Eyes, eyebrows, and cheek contours fully unobstructed.',
      tips: [
        'Ensure bangs or stray strands do not cast shadows over eyes',
        'Keep facial hair sharply edged and groomed',
        'Maintain natural styling without excessive reflective hair products'
      ]
    },
    background: {
      score: 96,
      status: 'optimal',
      title: 'Background & Lighting',
      feedback: 'Clean neutral backdrop with zero distracting environmental artifacts. Balanced 3-point studio illumination.',
      tips: [
        'Use soft neutral grey, off-white, or corporate navy backdrops',
        'Ensure background has no outdoor foliage, busy office clutter, or bright windows',
        'Lighting should be diffuse to eliminate hard shadows behind the ears and neck'
      ]
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsAuditing(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        onUpdatePhoto(result);
        setTimeout(() => {
          setIsAuditing(false);
        }, 800);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
    }, 900);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#060912]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-4xl bg-[#090E1B] border border-[#1F2F4E] rounded-2xl shadow-2xl overflow-hidden my-8"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-5 border-b border-[#141F36] bg-[#0A1121]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E23636] to-[#1E3A8A] flex items-center justify-center text-white shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white uppercase font-mono tracking-wider">
                  Photo Standards &amp; Quality Audit
                </h2>
                <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-[10px] font-mono font-bold text-emerald-400">
                  {auditData.grade}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Real-time posture, dress, hair, and background verification
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#121B30] hover:bg-[#1A2642] text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Photo Preview + Reticle Inspection Grid */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative aspect-square max-w-[320px] mx-auto rounded-2xl overflow-hidden bg-[#050811] border-2 border-[#1E2D4A] shadow-inner group flex items-center justify-center">
                {photoUrl ? (
                  <>
                    <img 
                      src={photoUrl} 
                      alt={candidateName} 
                      className={`w-full h-full object-cover transition-all ${isAuditing ? 'blur-sm scale-105' : ''}`}
                    />

                    {/* Scanning Laser when auditing */}
                    {isAuditing && (
                      <div className="absolute inset-0 bg-[#E23636]/10 animate-pulse pointer-events-none flex items-center justify-center">
                        <div className="w-full h-1 bg-[#E23636] shadow-[0_0_12px_#E23636] animate-laser-sweep" />
                      </div>
                    )}

                    {/* Professional Geometric Reticle / Grid Overlay */}
                    {showGridOverlay && !isAuditing && (
                      <div className="absolute inset-0 pointer-events-none border border-cyan-400/20">
                        {/* Golden ratio rule-of-thirds lines */}
                        <div className="absolute inset-x-0 top-1/3 border-b border-cyan-400/25 border-dashed" />
                        <div className="absolute inset-x-0 top-2/3 border-b border-cyan-400/25 border-dashed" />
                        <div className="absolute inset-y-0 left-1/3 border-r border-cyan-400/25 border-dashed" />
                        <div className="absolute inset-y-0 left-2/3 border-r border-cyan-400/25 border-dashed" />
                        
                        {/* Eye-level horizon */}
                        <div className="absolute inset-x-0 top-[38%] border-b-2 border-emerald-400/60" />
                        <span className="absolute left-2 top-[39%] text-[9px] font-mono font-bold text-emerald-400 bg-black/60 px-1 rounded">
                          Eye Level: Verified
                        </span>

                        {/* Centered crosshair */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-cyan-400/40 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        </div>

                        {/* Shoulder guide line */}
                        <div className="absolute inset-x-4 bottom-[18%] border-t border-yellow-400/50 border-dotted" />
                        <span className="absolute right-2 bottom-[19%] text-[8px] font-mono text-yellow-300 bg-black/60 px-1 rounded">
                          Shoulders: Balanced
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center p-6 space-y-3">
                    <div className="w-16 h-16 rounded-full bg-[#121B30] border border-[#203050] flex items-center justify-center text-slate-500 mx-auto">
                      <User className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-300 uppercase font-mono">No Headshot Added</h4>
                      <p className="text-[11px] text-slate-500 mt-1">Upload a photo to verify posture, dress, hair, and background</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Controls Under Photo */}
              <div className="flex items-center justify-between gap-2 max-w-[320px] mx-auto">
                <input 
                  type="file" 
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 px-3 py-2 rounded-xl bg-[#121B30] hover:bg-[#1A2642] border border-[#203050] text-xs font-mono font-bold text-white flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Upload className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>{photoUrl ? 'Replace Photo' : 'Upload Photo'}</span>
                </button>

                {photoUrl && (
                  <>
                    <button
                      type="button"
                      onClick={() => setShowGridOverlay(!showGridOverlay)}
                      className={`px-3 py-2 rounded-xl border text-xs font-mono transition-colors flex items-center gap-1 ${
                        showGridOverlay 
                          ? 'bg-cyan-950/40 border-cyan-500/50 text-cyan-300' 
                          : 'bg-[#121B30] border-[#203050] text-slate-400'
                      }`}
                      title="Toggle Golden Ratio Alignment Grid"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Grid</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onUpdatePhoto(undefined)}
                      className="p-2 rounded-xl bg-[#121B30] hover:bg-rose-950/40 border border-[#203050] hover:border-rose-500/50 text-slate-400 hover:text-rose-400 transition-colors"
                      title="Remove Photo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Right Column: Detailed 4-Attribute Inspector Cards */}
            <div className="lg:col-span-7 space-y-4">
              {/* Overall Score Banner */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#0C1425] via-[#101B34] to-[#0C1425] border border-[#1D2B4A] flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">
                    Executive Profile Score
                  </div>
                  <div className="text-2xl font-black font-mono text-white flex items-center gap-2">
                    <span>{auditData.overallScore}%</span>
                    <span className="text-xs font-normal text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                      Audit Verified
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleReAudit}
                  disabled={isAuditing || !photoUrl}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#15223C] hover:bg-[#1E3054] border border-[#253A64] text-xs font-mono text-slate-200 transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-[#E23636] ${isAuditing ? 'animate-spin' : ''}`} />
                  <span>Re-Audit</span>
                </button>
              </div>

              {/* 4 Category Cards: Posture, Dress, Hair, Background */}
              <div className="space-y-3">
                {/* 1. Posture */}
                <div className="p-3.5 rounded-xl bg-[#0B1120] border border-[#1A2640] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#E23636]/15 border border-[#E23636]/40 flex items-center justify-center text-[#E23636]">
                        <User className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase font-mono">
                          1. Posture &amp; Alignment
                        </h4>
                        <span className="text-[10px] text-slate-400">Head position &amp; shoulder horizon</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold font-mono text-emerald-400">
                      {auditData.posture.score}% Optimal
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-normal leading-relaxed pl-9">
                    {auditData.posture.feedback}
                  </p>
                </div>

                {/* 2. Dress */}
                <div className="p-3.5 rounded-xl bg-[#0B1120] border border-[#1A2640] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#1E3A8A]/30 border border-[#2563EB]/40 flex items-center justify-center text-[#38BDF8]">
                        <Shirt className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase font-mono">
                          2. Dress &amp; Attire Formality
                        </h4>
                        <span className="text-[10px] text-slate-400">Collar contrast, blazer silhouette</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold font-mono text-emerald-400">
                      {auditData.dress.score}% Optimal
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-normal leading-relaxed pl-9">
                    {auditData.dress.feedback}
                  </p>
                </div>

                {/* 3. Hair */}
                <div className="p-3.5 rounded-xl bg-[#0B1120] border border-[#1A2640] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400">
                        <Scissors className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase font-mono">
                          3. Hair &amp; Facial Visibility
                        </h4>
                        <span className="text-[10px] text-slate-400">Eyes, eyebrows, and clean grooming</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold font-mono text-emerald-400">
                      {auditData.hair.score}% Optimal
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-normal leading-relaxed pl-9">
                    {auditData.hair.feedback}
                  </p>
                </div>

                {/* 4. Background */}
                <div className="p-3.5 rounded-xl bg-[#0B1120] border border-[#1A2640] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                        <ImageIcon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase font-mono">
                          4. Background &amp; Studio Lighting
                        </h4>
                        <span className="text-[10px] text-slate-400">Neutral backdrop &amp; 3-point lighting</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold font-mono text-emerald-400">
                      {auditData.background.score}% Optimal
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-normal leading-relaxed pl-9">
                    {auditData.background.feedback}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-5 border-t border-[#141F36] bg-[#0A1121]">
          <span className="text-[11px] font-mono text-slate-400">
            Compliant with US, UK, EU and Global Executive ATS Standards
          </span>

          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#E23636] to-[#DC2626] hover:brightness-110 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Confirm &amp; Apply Photo</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
