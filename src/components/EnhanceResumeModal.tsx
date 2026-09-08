import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  FileText, 
  Upload, 
  RefreshCw,
  Eye
} from 'lucide-react';
import { ResumeData, QuestionnaireAnswers } from '../types';

interface EnhanceResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  resume: ResumeData;
  answers: QuestionnaireAnswers;
  onApplyEnhancement: (enhancedResume: ResumeData, updatedAnswers: QuestionnaireAnswers) => void;
}

interface AuditIssue {
  id: string;
  type: 'critical' | 'improvement';
  title: string;
  description: string;
  field: string;
  question: string;
  placeholder: string;
  suggestion: string;
  isResolved: boolean;
}

export const EnhanceResumeModal: React.FC<EnhanceResumeModalProps> = ({
  isOpen,
  onClose,
  resume,
  answers,
  onApplyEnhancement
}) => {
  const [activeTab, setActiveTab] = useState<'audit' | 'import'>('audit');
  const [importText, setImportText] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [issues, setIssues] = useState<AuditIssue[]>([]);
  const [userInputs, setUserInputs] = useState<Record<string, string>>({});
  const [auditScore, setAuditScore] = useState(72);

  // Analyze pre-built resume for issues whenever modal opens or resume updates
  useEffect(() => {
    if (!isOpen) return;

    setIsScanning(true);
    const timer = setTimeout(() => {
      const detectedIssues: AuditIssue[] = [];

      // 1. Phone check
      const phone = resume.personal.phone || answers.personal.phone || '';
      if (!phone.trim()) {
        detectedIssues.push({
          id: 'phone',
          type: 'critical',
          title: 'Missing Direct Contact Phone',
          description: 'Recruiters and automated systems require a valid direct telephone number.',
          field: 'phone',
          question: 'What is your direct contact phone number?',
          placeholder: '+1 (555) 234-5678',
          suggestion: '+1 (555) 019-2834',
          isResolved: false
        });
      }

      // 2. Location / Remote status
      const location = resume.personal.location || answers.personal.location || '';
      if (!location.trim()) {
        detectedIssues.push({
          id: 'location',
          type: 'critical',
          title: 'Missing Location or Work Authorization Area',
          description: 'ATS filters reject applications without geographic or remote availability.',
          field: 'location',
          question: 'What is your current location or remote preference?',
          placeholder: 'City, State / Remote',
          suggestion: 'New York, NY (Open to Remote)',
          isResolved: false
        });
      }

      // 3. Target job title
      const jobTitle = resume.personal.jobTitle || answers.targetRole || '';
      if (!jobTitle.trim() || jobTitle.length < 4) {
        detectedIssues.push({
          id: 'jobTitle',
          type: 'critical',
          title: 'Unspecified Professional Title',
          description: 'A clear executive job title is required at the top of the resume.',
          field: 'jobTitle',
          question: 'What exact target job title should appear on your resume?',
          placeholder: 'e.g. Senior Systems Architect',
          suggestion: 'Senior Full-Stack Engineer',
          isResolved: false
        });
      }

      // 4. Quantifiable metrics in experience bullets
      const missingMetricsExp = resume.experiences.find(exp => 
        !exp.highlights.some(h => /\d+%|\$\d+|\d+x|\d+k|\d+M|\d+\s*(users|clients|requests)/i.test(h))
      );

      if (missingMetricsExp) {
        detectedIssues.push({
          id: `metric_${missingMetricsExp.id}`,
          type: 'improvement',
          title: `No Measurable Metrics for ${missingMetricsExp.company}`,
          description: 'Achievements lacking quantifiable numbers (%, $, scale) rank in the lower 30th percentile.',
          field: `metric_${missingMetricsExp.id}`,
          question: `What is one measurable result or metric achieved at ${missingMetricsExp.company}?`,
          placeholder: 'e.g. Reduced query latency by 35% across 2M daily active users',
          suggestion: 'Improved system throughput by 42% and reduced cloud cost by $35,000/year',
          isResolved: false
        });
      }

      // 5. Weak or passive verbs check
      const passiveExp = resume.experiences.find(exp =>
        exp.highlights.some(h => /^(worked on|responsible for|helped with|assisted in|participated in)/i.test(h))
      );

      if (passiveExp) {
        detectedIssues.push({
          id: `verbs_${passiveExp.id}`,
          type: 'improvement',
          title: `Passive Wording Detected in ${passiveExp.company}`,
          description: 'Bullet points begin with passive verbs ("Worked on", "Responsible for") instead of executive action verbs.',
          field: `verbs_${passiveExp.id}`,
          question: 'Upgrade to executive action verbs (Spearheaded, Architected, Engineered)?',
          placeholder: 'Spearheaded deployment architecture and cross-team delivery',
          suggestion: 'Architected and deployed resilient multi-region infrastructure',
          isResolved: false
        });
      }

      // 6. Professional Summary check
      const summary = resume.personal.summary || answers.personal.summary || '';
      if (!summary.trim() || summary.length < 70) {
        detectedIssues.push({
          id: 'summary',
          type: 'improvement',
          title: 'Executive Summary Incomplete or Brief',
          description: 'Resumes with strong 2-3 sentence executive summaries achieve 65% higher recruiter response rates.',
          field: 'summary',
          question: 'What is your core professional domain and primary specialty?',
          placeholder: '7+ years engineering high-throughput backend services and cloud infrastructure...',
          suggestion: 'Accomplished engineer with 6+ years driving resilient cloud architectures and cross-functional technical delivery.',
          isResolved: false
        });
      }

      // 7. Education check
      if (!resume.education || resume.education.length === 0 || !resume.education[0]?.degree) {
        detectedIssues.push({
          id: 'education',
          type: 'improvement',
          title: 'Missing Academic or Certification Record',
          description: 'ATS parsers check for recognized educational degrees or accreditations.',
          field: 'education',
          question: 'What is your highest degree, university, or relevant certification?',
          placeholder: 'B.S. in Computer Science - University of California',
          suggestion: 'B.S. in Computer Science - Accredited University',
          isResolved: false
        });
      }

      setIssues(detectedIssues);

      // Calculate initial audit score
      const baseScore = 98 - (detectedIssues.length * 7);
      setAuditScore(Math.max(58, baseScore));

      // Preset empty inputs
      const initialInputs: Record<string, string> = {};
      detectedIssues.forEach(iss => {
        initialInputs[iss.id] = '';
      });
      setUserInputs(initialInputs);
      setIsScanning(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [isOpen, resume, answers]);

  if (!isOpen) return null;

  const handleInputChange = (id: string, value: string) => {
    setUserInputs(prev => ({ ...prev, [id]: value }));
  };

  const handleApplySuggestion = (id: string, suggestion: string) => {
    setUserInputs(prev => ({ ...prev, [id]: suggestion }));
  };

  const handleImportPrebuiltText = () => {
    if (!importText.trim()) return;

    // Simple robust parsing of pasted resume
    const lines = importText.split('\n').map(l => l.trim()).filter(Boolean);
    const updatedResume: ResumeData = JSON.parse(JSON.stringify(resume));

    if (lines.length > 0) {
      // Line 1 is candidate name if reasonable length
      if (lines[0].length < 40 && !lines[0].includes(':')) {
        updatedResume.personal.fullName = lines[0];
      }

      // Find email & phone
      const emailLine = lines.find(l => /[\w.-]+@[\w.-]+\.\w+/.test(l));
      if (emailLine) {
        const match = emailLine.match(/[\w.-]+@[\w.-]+\.\w+/);
        if (match) updatedResume.personal.email = match[0];
      }

      const phoneLine = lines.find(l => /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(l));
      if (phoneLine) {
        const match = phoneLine.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
        if (match) updatedResume.personal.phone = match[0];
      }

      // Collect bullets
      const bulletLines = lines.filter(l => l.startsWith('•') || l.startsWith('-') || l.startsWith('*'));
      if (bulletLines.length > 0 && updatedResume.experiences.length > 0) {
        updatedResume.experiences[0].highlights = bulletLines.slice(0, 4).map(b => b.replace(/^[-•*]\s*/, ''));
      }
    }

    setActiveTab('audit');
    // Trigger update and re-scan
    onApplyEnhancement(updatedResume, answers);
  };

  const handleApplyResolution = () => {
    setIsApplying(true);

    const updatedResume: ResumeData = JSON.parse(JSON.stringify(resume));
    const updatedAnswers: QuestionnaireAnswers = JSON.parse(JSON.stringify(answers));

    // 1. Resolve contact & role fields
    if (userInputs['phone']) {
      updatedResume.personal.phone = userInputs['phone'];
      if (!updatedAnswers.personal) updatedAnswers.personal = {};
      updatedAnswers.personal.phone = userInputs['phone'];
    }

    if (userInputs['location']) {
      updatedResume.personal.location = userInputs['location'];
      if (!updatedAnswers.personal) updatedAnswers.personal = {};
      updatedAnswers.personal.location = userInputs['location'];
    }

    if (userInputs['jobTitle']) {
      updatedResume.personal.jobTitle = userInputs['jobTitle'];
      updatedAnswers.targetRole = userInputs['jobTitle'];
    }

    if (userInputs['summary']) {
      updatedResume.personal.summary = userInputs['summary'];
      if (!updatedAnswers.personal) updatedAnswers.personal = {};
      updatedAnswers.personal.summary = userInputs['summary'];
    }

    if (userInputs['education'] && (!updatedResume.education || updatedResume.education.length === 0)) {
      updatedResume.education = [
        {
          id: 'edu-audit-1',
          degree: userInputs['education'],
          institution: 'Accredited University',
          fieldOfStudy: 'Computer Science & Engineering',
          startDate: '2017',
          endDate: '2021'
        }
      ];
    }

    // 2. Elevate bullet points: Replace passive verbs & insert metrics
    const executiveVerbs = ['Spearheaded', 'Architected', 'Engineered', 'Optimized', 'Automated', 'Delivered'];

    updatedResume.experiences = updatedResume.experiences.map((exp, expIdx) => {
      const customMetric = userInputs[`metric_${exp.id}`];
      let newHighlights = [...exp.highlights];

      // Add user metric if supplied
      if (customMetric && customMetric.trim()) {
        newHighlights.unshift(`Spearheaded core systems initiative: ${customMetric.trim()}.`);
      }

      // Upgrade passive bullet verbs
      newHighlights = newHighlights.map((hl, hlIdx) => {
        let text = hl.trim();
        if (!text.endsWith('.')) text += '.';

        if (/^(worked on|responsible for|helped with|assisted in|participated in)/i.test(text)) {
          const verb = executiveVerbs[(expIdx + hlIdx) % executiveVerbs.length];
          text = text.replace(/^(worked on|responsible for|helped with|assisted in|participated in)\s*/i, `${verb} `);
        }

        return text;
      });

      return {
        ...exp,
        highlights: newHighlights
      };
    });

    // 3. Polish Executive Summary
    if (updatedResume.personal.summary) {
      if (!updatedResume.personal.summary.includes('Proven track record') && !updatedResume.personal.summary.includes('demonstrated expertise')) {
        updatedResume.personal.summary = `${updatedResume.personal.summary.trim()} Proven track record delivering scalable technical solutions and cross-functional team alignment.`;
      }
    }

    setTimeout(() => {
      setIsApplying(false);
      onApplyEnhancement(updatedResume, updatedAnswers);
      onClose();
    }, 500);
  };

  const resolvedCount = Object.values(userInputs).filter((v): v is string => typeof v === 'string' && v.trim().length > 0).length;
  const criticalIssues = issues.filter(i => i.type === 'critical');
  const improvementIssues = issues.filter(i => i.type === 'improvement');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md no-print">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.2 }}
        className="bg-[#0B101E] border border-[#203050] rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#1A2640] flex items-center justify-between bg-[#080D1A]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E23636] to-[#1E3A8A] flex items-center justify-center text-white shadow-[0_0_15px_rgba(226,54,54,0.4)]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wide">
                  Pre-Built Resume Auditor &amp; Enhancer
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#162238] text-[#38BDF8] border border-[#23385C]">
                  ATS Engine
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Audits existing resumes for missing data, passive phrasing, and ATS gaps.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#162035] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="px-6 py-2.5 bg-[#090E1B] border-b border-[#1A2640] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('audit')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                activeTab === 'audit'
                  ? 'bg-[#18253E] text-white border border-[#29406A] shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Resume Audit ({issues.length} Issues)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('import')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                activeTab === 'import'
                  ? 'bg-[#18253E] text-white border border-[#29406A] shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Paste / Import Resume
            </button>
          </div>

          {/* Real-time Health Metric */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Health Score:</span>
            <div className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
              auditScore >= 85 ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/40' :
              auditScore >= 70 ? 'bg-amber-950/60 text-amber-300 border border-amber-500/40' :
              'bg-red-950/60 text-red-300 border border-red-500/40'
            }`}>
              {auditScore}%
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 text-slate-200">
          {activeTab === 'import' ? (
            /* Import / Paste View */
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#090E1A] border border-[#1E2E4E] space-y-2">
                <label className="text-xs font-bold text-white font-mono uppercase block">
                  Paste Pre-Built Resume Text
                </label>
                <p className="text-[11px] text-slate-400">
                  Paste your existing CV or LinkedIn export. The engine will extract contact details, roles, and bullets to audit.
                </p>
                <textarea
                  rows={9}
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  placeholder="Paste your resume here (e.g. Name, Contact Info, Work History, Bullet Points)..."
                  className="w-full p-3 rounded-lg bg-[#050811] border border-[#22355A] text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-[#E23636] transition-colors"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('audit')}
                  className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleImportPrebuiltText}
                  disabled={!importText.trim()}
                  className="px-4 py-2 rounded-xl bg-[#18253E] hover:bg-[#203152] border border-[#2B426D] text-white font-bold text-xs uppercase font-mono flex items-center gap-1.5 disabled:opacity-40"
                >
                  <Upload className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>Parse &amp; Run Audit</span>
                </button>
              </div>
            </div>
          ) : (
            /* Issues Audit View */
            <div className="space-y-5">
              {/* Scan Status Summary */}
              <div className="p-4 rounded-xl bg-[#090E1A] border border-[#1A2640] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white font-mono uppercase">
                    Audit Status: {issues.length === 0 ? 'All Requirements Met' : `${issues.length} Issues Detected`}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {criticalIssues.length} critical gaps, {improvementIssues.length} language &amp; metric optimizations.
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] font-mono text-slate-400">Resolved Inputs</div>
                  <div className="text-xs font-bold text-emerald-400 font-mono">
                    {resolvedCount} / {issues.length}
                  </div>
                </div>
              </div>

              {/* Incomplete Questions to Fix Issues */}
              {issues.length > 0 ? (
                <div className="space-y-4">
                  {issues.map((iss, index) => {
                    const isFilled = Boolean(userInputs[iss.id]?.trim());

                    return (
                      <div 
                        key={iss.id}
                        className={`p-4 rounded-xl border transition-all ${
                          isFilled 
                            ? 'bg-[#081120] border-emerald-500/40' 
                            : iss.type === 'critical'
                            ? 'bg-[#0A0F1D] border-[#E23636]/40'
                            : 'bg-[#0A0F1D] border-[#1E2E4E]'
                        }`}
                      >
                        {/* Issue Header */}
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-center gap-2">
                            {iss.type === 'critical' ? (
                              <AlertTriangle className="w-4 h-4 text-[#E23636] shrink-0" />
                            ) : (
                              <RefreshCw className="w-4 h-4 text-[#38BDF8] shrink-0" />
                            )}
                            <span className="text-xs font-bold text-white font-mono">
                              {index + 1}. {iss.title}
                            </span>
                          </div>

                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase ${
                            iss.type === 'critical' 
                              ? 'bg-red-950/60 text-red-300 border border-red-800/40' 
                              : 'bg-blue-950/60 text-blue-300 border border-blue-800/40'
                          }`}>
                            {iss.type}
                          </span>
                        </div>

                        {/* Issue Context */}
                        <p className="text-[11px] text-slate-400 mb-2.5">
                          {iss.description}
                        </p>

                        {/* Incomplete Question Prompt */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-slate-200 block">
                            {iss.question}
                          </label>

                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={userInputs[iss.id] || ''}
                              onChange={(e) => handleInputChange(iss.id, e.target.value)}
                              placeholder={iss.placeholder}
                              className="flex-1 px-3 py-2 rounded-lg bg-[#050811] border border-[#1E2E4E] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#E23636] transition-colors"
                            />

                            {/* One-click fill suggestion */}
                            <button
                              type="button"
                              onClick={() => handleApplySuggestion(iss.id, iss.suggestion)}
                              className="px-2.5 py-2 rounded-lg bg-[#142038] hover:bg-[#1C2D50] border border-[#243860] text-[11px] text-[#38BDF8] font-mono whitespace-nowrap transition-colors"
                              title="Use recommended value"
                            >
                              Fill Suggestion
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-6 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <h4 className="text-sm font-bold text-white font-mono uppercase">
                    Zero Pre-Built Defects Detected
                  </h4>
                  <p className="text-xs text-emerald-200/80 max-w-md mx-auto">
                    Your resume has complete contact details, high-impact bullet points, and clean ATS formatting.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-[#1A2640] bg-[#080D1A] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            Close
          </button>

          <button
            type="button"
            onClick={handleApplyResolution}
            disabled={isApplying}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E23636] to-[#DC2626] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_15px_rgba(226,54,54,0.4)] transition-all disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isApplying ? 'Applying Enhancements...' : 'Resolve Issues & Enhance'}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
