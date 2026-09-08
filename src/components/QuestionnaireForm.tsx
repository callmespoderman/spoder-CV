import React, { useRef } from 'react';
import { 
  User, 
  Code, 
  Briefcase, 
  GraduationCap, 
  ArrowRight, 
  Sparkles, 
  Check,
  Camera,
  Upload,
  Trash2
} from 'lucide-react';
import { QuestionnaireAnswers } from '../types';

interface QuestionnaireFormProps {
  answers: QuestionnaireAnswers;
  onChange: (updated: QuestionnaireAnswers) => void;
  onNextStep: () => void;
  onGenerateCV: () => void;
  isAiBusy: boolean;
  onOpenEnhance?: () => void;
}

const POPULAR_SKILLS = [
  'TypeScript', 'React', 'Node.js', 'Python', 'Go', 
  'AWS', 'Docker', 'Kubernetes', 'SQL', 'Git', 'Agile'
];

export const QuestionnaireForm: React.FC<QuestionnaireFormProps> = ({
  answers,
  onChange,
  onNextStep,
  onGenerateCV,
  isAiBusy,
  onOpenEnhance
}) => {
  const photoInputRef = useRef<HTMLInputElement>(null);

  const updatePersonal = (field: string, val: string) => {
    onChange({
      ...answers,
      personal: {
        ...answers.personal,
        [field]: val
      }
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        updatePersonal('photoUrl', reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const toggleSkill = (skill: string) => {
    const list = (answers.topSkillsInput || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    if (list.includes(skill)) {
      const filtered = list.filter(s => s !== skill);
      onChange({ ...answers, topSkillsInput: filtered.join(', ') });
    } else {
      const added = [...list, skill];
      onChange({ ...answers, topSkillsInput: added.join(', ') });
    }
  };

  const currentSkills = (answers.topSkillsInput || '')
    .split(',')
    .map(s => s.trim().toLowerCase());

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Friendly Guide Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="text-center sm:text-left space-y-1">
          <h2 className="text-2xl font-black tracking-tight text-white uppercase font-mono">
            Candidate Intake
          </h2>
          <p className="text-xs text-slate-400 max-w-lg leading-relaxed">
            Candidate profile and professional experience records.
          </p>
        </div>

        {onOpenEnhance && (
          <button
            type="button"
            onClick={onOpenEnhance}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#E23636] to-[#DC2626] hover:brightness-110 text-white font-bold text-xs uppercase font-mono tracking-wider flex items-center gap-2 shadow-[0_0_12px_rgba(226,54,54,0.4)] transition-all shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Audit Pre-Built Resume</span>
          </button>
        )}
      </div>

      {/* Card 1: Basic Information */}
      <div className="bg-[#0B101E] border border-[#1A2640] rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-[#162035]">
          <div className="w-8 h-8 rounded-lg bg-[#E23636]/15 border border-[#E23636]/40 flex items-center justify-center text-[#E23636]">
            <User className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wide font-mono">
              1. Contact & Target Role
            </h3>
            <p className="text-xs text-slate-400">Your name, role, and where recruiters can reach you</p>
          </div>
        </div>

        {/* Profile Photo Option */}
        <div className="flex flex-col sm:flex-row items-center gap-4 p-3.5 rounded-xl bg-[#070B16] border border-[#1A2640]">
          <div className="relative group shrink-0">
            {answers.personal.photoUrl ? (
              <img
                src={answers.personal.photoUrl}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover border-2 border-[#E23636] shadow-lg shadow-[#E23636]/20"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-[#121B2F] border-2 border-dashed border-[#24375A] flex flex-col items-center justify-center text-slate-400">
                <Camera className="w-6 h-6 text-slate-400" />
              </div>
            )}
            <input
              type="file"
              ref={photoInputRef}
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </div>

          <div className="flex-1 text-center sm:text-left space-y-0.5">
            <h4 className="text-xs font-bold text-white font-mono uppercase">
              Profile Photo <span className="text-slate-400 font-normal lowercase">(optional)</span>
            </h4>
            <p className="text-[11px] text-slate-400">
              Add a headshot to display in modern resume templates.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => photoInputRef.current?.click()}
              className="px-3 py-1.5 rounded-lg bg-[#142038] hover:bg-[#1C2C4E] text-white border border-[#24375A] text-xs font-medium transition-colors flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>{answers.personal.photoUrl ? 'Change Photo' : 'Add Photo'}</span>
            </button>

            {answers.personal.photoUrl && (
              <button
                type="button"
                onClick={() => updatePersonal('photoUrl', '')}
                className="px-2.5 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/40 text-xs transition-colors"
                title="Remove photo"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Full Name <span className="text-[#E23636]">*</span>
            </label>
            <input
              type="text"
              value={answers.personal.fullName || ''}
              onChange={(e) => updatePersonal('fullName', e.target.value)}
              placeholder="e.g. Peter Parker"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#060A14] border border-[#1E2D4A] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#E23636] transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Target Job Title <span className="text-[#E23636]">*</span>
            </label>
            <input
              type="text"
              value={answers.targetRole || ''}
              onChange={(e) => onChange({ ...answers, targetRole: e.target.value })}
              placeholder="e.g. Lead Software Engineer"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#060A14] border border-[#1E2D4A] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#E23636] transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Email Address <span className="text-[#E23636]">*</span>
            </label>
            <input
              type="email"
              value={answers.personal.email || ''}
              onChange={(e) => updatePersonal('email', e.target.value)}
              placeholder="peter@example.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#060A14] border border-[#1E2D4A] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#E23636] transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Phone Number
            </label>
            <input
              type="text"
              value={answers.personal.phone || ''}
              onChange={(e) => updatePersonal('phone', e.target.value)}
              placeholder="+1 (555) 019-2834"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#060A14] border border-[#1E2D4A] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#E23636] transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Location / City
            </label>
            <input
              type="text"
              value={answers.personal.location || ''}
              onChange={(e) => updatePersonal('location', e.target.value)}
              placeholder="New York, NY (Open to Remote)"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#060A14] border border-[#1E2D4A] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#E23636] transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              LinkedIn or Portfolio URL
            </label>
            <input
              type="text"
              value={answers.personal.linkedin || answers.personal.website || ''}
              onChange={(e) => {
                updatePersonal('linkedin', e.target.value);
                updatePersonal('website', e.target.value);
              }}
              placeholder="linkedin.com/in/peterparker"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#060A14] border border-[#1E2D4A] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#E23636] transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Card 2: Skills */}
      <div className="bg-[#0B101E] border border-[#1A2640] rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-[#162035]">
          <div className="w-8 h-8 rounded-lg bg-[#1E3A8A]/20 border border-[#2563EB]/40 flex items-center justify-center text-[#38BDF8]">
            <Code className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wide font-mono">
              2. Skills & Technologies
            </h3>
            <p className="text-xs text-slate-400">Click to add popular skills or type your own</p>
          </div>
        </div>

        {/* Quick pill selector */}
        <div className="flex flex-wrap gap-2">
          {POPULAR_SKILLS.map((skill) => {
            const isSelected = currentSkills.includes(skill.toLowerCase());
            return (
              <button
                key={skill}
                type="button"
                onClick={() => toggleSkill(skill)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#E23636] text-white shadow-[0_0_8px_rgba(226,54,54,0.4)]'
                    : 'bg-[#101728] text-slate-300 hover:bg-[#19243C] border border-[#202E4A]'
                }`}
              >
                {isSelected ? <Check className="w-3.5 h-3.5" /> : <span>+</span>}
                <span>{skill}</span>
              </button>
            );
          })}
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1.5">
            Your Skills List (comma-separated)
          </label>
          <textarea
            rows={2}
            value={answers.topSkillsInput}
            onChange={(e) => onChange({ ...answers, topSkillsInput: e.target.value })}
            placeholder="TypeScript, Go, React, Distributed Systems, Cloud Architecture..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#060A14] border border-[#1E2D4A] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#E23636] transition-colors font-mono"
          />
        </div>
      </div>

      {/* Card 3: Experience & Key Achievements */}
      <div className="bg-[#0B101E] border border-[#1A2640] rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-[#162035]">
          <div className="w-8 h-8 rounded-lg bg-[#E23636]/15 border border-[#E23636]/40 flex items-center justify-center text-[#E23636]">
            <Briefcase className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wide font-mono">
              3. Work Experience & Achievements
            </h3>
            <p className="text-xs text-slate-400">Where you worked, what you built, or any results achieved</p>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1.5">
            Key Career Milestones & Responsibilities
          </label>
          <textarea
            rows={5}
            value={answers.careerHighlightsInput}
            onChange={(e) => onChange({ ...answers, careerHighlightsInput: e.target.value })}
            placeholder={`e.g.
- Lead Architect at Horizon Tech: Built real-time streaming cluster processing 15,000 req/sec with sub-5ms latency.
- Senior Engineer at Oscorp: Reduced AWS cloud costs by $240K annually through microservices optimization.
- Mentored team of 12 engineers and maintained 99.99% system uptime.`}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#060A14] border border-[#1E2D4A] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#E23636] transition-colors font-mono leading-relaxed"
          />
          <p className="text-[11px] text-slate-400 mt-1.5">
            Include quantifiable metrics (e.g. percentages, cost savings, system scale) for optimal ATS ranking.
          </p>
        </div>
      </div>

      {/* Card 4: Education */}
      <div className="bg-[#0B101E] border border-[#1A2640] rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-[#162035]">
          <div className="w-8 h-8 rounded-lg bg-[#1E3A8A]/20 border border-[#2563EB]/40 flex items-center justify-center text-[#38BDF8]">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wide font-mono">
              4. Education &amp; Certifications
            </h3>
            <p className="text-xs text-slate-400">Academic degrees and relevant credentials</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              College or Degree
            </label>
            <input
              type="text"
              value={answers.educationInput}
              onChange={(e) => onChange({ ...answers, educationInput: e.target.value })}
              placeholder="e.g. B.S. in Computer Science - State University"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#060A14] border border-[#1E2D4A] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#E23636] transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Certifications (optional)
            </label>
            <input
              type="text"
              value={answers.certificationsInput}
              onChange={(e) => onChange({ ...answers, certificationsInput: e.target.value })}
              placeholder="e.g. AWS Solutions Architect, CKA"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#060A14] border border-[#1E2D4A] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#E23636] transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        <button
          type="button"
          onClick={onGenerateCV}
          disabled={isAiBusy}
          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#121B30] hover:bg-[#1A2846] border border-[#233860] text-xs text-slate-200 font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-[#E23636]" />
          <span>Generate Resume Directly</span>
        </button>

        <button
          type="button"
          onClick={onNextStep}
          id="btn-next-step-docs"
          className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#E23636] to-[#DC2626] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_16px_rgba(226,54,54,0.4)] flex items-center justify-center gap-2"
        >
          <span>Next: Supporting Documents</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
