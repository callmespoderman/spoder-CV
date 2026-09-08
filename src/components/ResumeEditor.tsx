import React, { useState, useRef } from 'react';
import { 
  User, 
  Briefcase, 
  Code, 
  GraduationCap, 
  Award, 
  FolderGit2, 
  Plus, 
  Trash2, 
  Sparkles, 
  Check,
  Camera,
  Upload
} from 'lucide-react';
import { ResumeData, WorkExperience, ProjectItem, EducationItem, CertificationItem } from '../types';

interface ResumeEditorProps {
  resume: ResumeData;
  onUpdateResume: (updated: ResumeData) => void;
  onPolishBullet?: (bullet: string, role: string, expId: string, bulletIdx: number) => void;
}

export const ResumeEditor: React.FC<ResumeEditorProps> = ({
  resume,
  onUpdateResume,
  onPolishBullet
}) => {
  const [activeTab, setActiveTab] = useState<'personal' | 'experience' | 'skills' | 'projects' | 'education' | 'certs'>('personal');
  const photoInputRef = useRef<HTMLInputElement>(null);

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

  const updatePersonal = (field: string, val: string) => {
    onUpdateResume({
      ...resume,
      personal: {
        ...resume.personal,
        [field]: val
      }
    });
  };

  const handleUpdateExperience = (idx: number, updated: WorkExperience) => {
    const exps = [...resume.experiences];
    exps[idx] = updated;
    onUpdateResume({ ...resume, experiences: exps });
  };

  const handleAddExperience = () => {
    const newExp: WorkExperience = {
      id: `exp-${Date.now()}`,
      company: 'New Company Inc.',
      role: 'Senior Software Engineer',
      location: 'Remote / New York',
      startDate: '2023-01',
      endDate: 'Present',
      isCurrent: true,
      highlights: [
        'Spearheaded development of high-availability microservices, delivering 99.99% service uptime.',
        'Optimized core database query latency by 35% through Redis caching and index restructuring.'
      ]
    };
    onUpdateResume({ ...resume, experiences: [newExp, ...resume.experiences] });
  };

  const handleDeleteExperience = (idx: number) => {
    const exps = resume.experiences.filter((_, i) => i !== idx);
    onUpdateResume({ ...resume, experiences: exps });
  };

  const handleAddHighlight = (expIdx: number) => {
    const exp = resume.experiences[expIdx];
    const updatedHighlights = [...exp.highlights, 'Architected scalable feature delivering quantified operational efficiency.'];
    handleUpdateExperience(expIdx, { ...exp, highlights: updatedHighlights });
  };

  const handleUpdateHighlight = (expIdx: number, hIdx: number, val: string) => {
    const exp = resume.experiences[expIdx];
    const updatedHighlights = [...exp.highlights];
    updatedHighlights[hIdx] = val;
    handleUpdateExperience(expIdx, { ...exp, highlights: updatedHighlights });
  };

  const handleDeleteHighlight = (expIdx: number, hIdx: number) => {
    const exp = resume.experiences[expIdx];
    const updatedHighlights = exp.highlights.filter((_, i) => i !== hIdx);
    handleUpdateExperience(expIdx, { ...exp, highlights: updatedHighlights });
  };

  return (
    <div className="space-y-4">
      {/* Tab bar for sections */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-[#1E2E4E]">
        <button
          type="button"
          onClick={() => setActiveTab('personal')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
            activeTab === 'personal'
              ? 'bg-[#E23636] text-white shadow-[0_0_10px_rgba(226,54,54,0.3)]'
              : 'bg-[#0E1526] text-slate-300 hover:bg-[#16213A]'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Personal Info</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('experience')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
            activeTab === 'experience'
              ? 'bg-[#E23636] text-white shadow-[0_0_10px_rgba(226,54,54,0.3)]'
              : 'bg-[#0E1526] text-slate-300 hover:bg-[#16213A]'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Experience ({resume.experiences.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('skills')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
            activeTab === 'skills'
              ? 'bg-[#E23636] text-white shadow-[0_0_10px_rgba(226,54,54,0.3)]'
              : 'bg-[#0E1526] text-slate-300 hover:bg-[#16213A]'
          }`}
        >
          <Code className="w-3.5 h-3.5" />
          <span>Skills Categories</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('projects')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
            activeTab === 'projects'
              ? 'bg-[#E23636] text-white shadow-[0_0_10px_rgba(226,54,54,0.3)]'
              : 'bg-[#0E1526] text-slate-300 hover:bg-[#16213A]'
          }`}
        >
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>Projects ({resume.projects.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('education')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
            activeTab === 'education'
              ? 'bg-[#E23636] text-white shadow-[0_0_10px_rgba(226,54,54,0.3)]'
              : 'bg-[#0E1526] text-slate-300 hover:bg-[#16213A]'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Education</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('certs')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
            activeTab === 'certs'
              ? 'bg-[#E23636] text-white shadow-[0_0_10px_rgba(226,54,54,0.3)]'
              : 'bg-[#0E1526] text-slate-300 hover:bg-[#16213A]'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Certifications</span>
        </button>
      </div>

      {/* Tab 1: Personal */}
      {activeTab === 'personal' && (
        <div className="p-4 rounded-xl bg-[#090E1A] border border-[#1A2844] space-y-3">
          {/* Profile Photo Quick Upload */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-[#060A14] border border-[#1E2D4A]">
            <input
              type="file"
              ref={photoInputRef}
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
            {resume.personal.photoUrl ? (
              <img
                src={resume.personal.photoUrl}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover border-2 border-[#E23636]"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-[#121B2F] border border-dashed border-[#24375A] flex items-center justify-center text-slate-400">
                <Camera className="w-5 h-5" />
              </div>
            )}
            <div className="flex-1">
              <div className="text-xs font-bold text-white font-mono uppercase">Profile Photo</div>
              <div className="text-[10px] text-slate-400">Displays on candidate header across CV designs</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => photoInputRef.current?.click()}
                className="px-2.5 py-1.5 rounded-lg bg-[#142038] hover:bg-[#1C2C4E] text-white border border-[#24375A] text-xs transition-colors flex items-center gap-1"
              >
                <Upload className="w-3 h-3 text-[#38BDF8]" />
                <span>{resume.personal.photoUrl ? 'Change' : 'Upload'}</span>
              </button>
              {resume.personal.photoUrl && (
                <button
                  type="button"
                  onClick={() => updatePersonal('photoUrl', '')}
                  className="px-2 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/40 text-xs transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Full Name</label>
              <input
                type="text"
                value={resume.personal.fullName}
                onChange={(e) => updatePersonal('fullName', e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-[#060A14] border border-[#1E2D4A] text-xs text-white focus:outline-none focus:border-[#E23636]"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Headline Job Title</label>
              <input
                type="text"
                value={resume.personal.jobTitle}
                onChange={(e) => updatePersonal('jobTitle', e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-[#060A14] border border-[#1E2D4A] text-xs text-white focus:outline-none focus:border-[#E23636]"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Email</label>
              <input
                type="email"
                value={resume.personal.email}
                onChange={(e) => updatePersonal('email', e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-[#060A14] border border-[#1E2D4A] text-xs text-white focus:outline-none focus:border-[#E23636]"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Phone</label>
              <input
                type="text"
                value={resume.personal.phone}
                onChange={(e) => updatePersonal('phone', e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-[#060A14] border border-[#1E2D4A] text-xs text-white focus:outline-none focus:border-[#E23636]"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Location</label>
              <input
                type="text"
                value={resume.personal.location}
                onChange={(e) => updatePersonal('location', e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-[#060A14] border border-[#1E2D4A] text-xs text-white focus:outline-none focus:border-[#E23636]"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Website / Portfolio</label>
              <input
                type="text"
                value={resume.personal.website}
                onChange={(e) => updatePersonal('website', e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-[#060A14] border border-[#1E2D4A] text-xs text-white focus:outline-none focus:border-[#E23636]"
              />
            </div>
          </div>
          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Executive Summary</label>
            <textarea
              rows={4}
              value={resume.personal.summary}
              onChange={(e) => updatePersonal('summary', e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#060A14] border border-[#1E2D4A] text-xs text-white focus:outline-none focus:border-[#E23636] leading-relaxed"
            />
          </div>
        </div>
      )}

      {/* Tab 2: Experience */}
      {activeTab === 'experience' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono text-slate-400">Work Experience Items</span>
            <button
              type="button"
              onClick={handleAddExperience}
              className="px-3 py-1.5 rounded-lg bg-[#142038] hover:bg-[#1E2F52] border border-[#233860] text-xs text-sky-200 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Position</span>
            </button>
          </div>

          {resume.experiences.map((exp, expIdx) => (
            <div key={exp.id} className="p-4 rounded-xl bg-[#090E1A] border border-[#1A2844] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#E23636]">Position #{expIdx + 1}</span>
                <button
                  type="button"
                  onClick={() => handleDeleteExperience(expIdx)}
                  className="p-1 rounded text-slate-400 hover:text-red-400 hover:bg-red-950/30"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Company</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => handleUpdateExperience(expIdx, { ...exp, company: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded bg-[#060A14] border border-[#1E2D4A] text-xs text-white focus:outline-none focus:border-[#E23636]"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Role Title</label>
                  <input
                    type="text"
                    value={exp.role}
                    onChange={(e) => handleUpdateExperience(expIdx, { ...exp, role: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded bg-[#060A14] border border-[#1E2D4A] text-xs text-white focus:outline-none focus:border-[#E23636]"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Start Date</label>
                  <input
                    type="text"
                    value={exp.startDate}
                    onChange={(e) => handleUpdateExperience(expIdx, { ...exp, startDate: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded bg-[#060A14] border border-[#1E2D4A] text-xs text-white focus:outline-none focus:border-[#E23636]"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">End Date</label>
                  <input
                    type="text"
                    value={exp.endDate}
                    onChange={(e) => handleUpdateExperience(expIdx, { ...exp, endDate: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded bg-[#060A14] border border-[#1E2D4A] text-xs text-white focus:outline-none focus:border-[#E23636]"
                  />
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-2 pt-2 border-t border-[#141F33]">
                <div className="flex justify-between items-center">
                  <label className="text-[11px] font-mono text-slate-300">Accomplishment Bullets</label>
                  <button
                    type="button"
                    onClick={() => handleAddHighlight(expIdx)}
                    className="text-[10px] text-[#38BDF8] hover:text-sky-300 font-mono"
                  >
                    + Add Bullet
                  </button>
                </div>
                {exp.highlights.map((bullet, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-2">
                    <textarea
                      rows={2}
                      value={bullet}
                      onChange={(e) => handleUpdateHighlight(expIdx, hIdx, e.target.value)}
                      className="flex-1 px-2.5 py-1.5 rounded bg-[#060A14] border border-[#1E2D4A] text-xs text-slate-200 focus:outline-none focus:border-[#E23636] leading-relaxed"
                    />
                    <div className="flex flex-col gap-1 shrink-0">
                      {onPolishBullet && (
                        <button
                          type="button"
                          onClick={() => onPolishBullet(bullet, exp.role, exp.id, hIdx)}
                          className="p-1 rounded bg-[#131F36] hover:bg-[#1C2C4E] border border-[#23375C] text-[#E23636]"
                          title="Improve with AI"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleDeleteHighlight(expIdx, hIdx)}
                        className="p-1 rounded hover:bg-red-950/30 text-slate-400 hover:text-red-400"
                        title="Delete Bullet"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Skills */}
      {activeTab === 'skills' && (
        <div className="p-4 rounded-xl bg-[#090E1A] border border-[#1A2844] space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono text-slate-400">Skill Categories</span>
            <button
              type="button"
              onClick={() => {
                onUpdateResume({
                  ...resume,
                  skills: [...resume.skills, { category: 'Tools & Cloud', skills: ['Docker', 'AWS', 'Linux'] }]
                });
              }}
              className="text-xs text-[#38BDF8] hover:text-sky-200 font-mono"
            >
              + Add Category
            </button>
          </div>
          <div className="space-y-3">
            {resume.skills.map((cat, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-[#060A14] border border-[#1B2944] space-y-2">
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={cat.category}
                    onChange={(e) => {
                      const updated = [...resume.skills];
                      updated[idx].category = e.target.value;
                      onUpdateResume({ ...resume, skills: updated });
                    }}
                    className="font-bold text-xs text-[#E23636] bg-transparent border-b border-transparent hover:border-[#1E2D4A] focus:border-[#E23636] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updated = resume.skills.filter((_, i) => i !== idx);
                      onUpdateResume({ ...resume, skills: updated });
                    }}
                    className="text-slate-400 hover:text-red-400"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
                <input
                  type="text"
                  value={cat.skills.join(', ')}
                  onChange={(e) => {
                    const updated = [...resume.skills];
                    updated[idx].skills = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                    onUpdateResume({ ...resume, skills: updated });
                  }}
                  className="w-full px-2.5 py-1.5 rounded bg-[#090E1A] border border-[#1E2D4A] text-xs text-slate-200 font-mono focus:outline-none focus:border-[#E23636]"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Projects */}
      {activeTab === 'projects' && (
        <div className="p-4 rounded-xl bg-[#090E1A] border border-[#1A2844] space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono text-slate-400">Technical Projects</span>
            <button
              type="button"
              onClick={() => {
                const newProj: ProjectItem = {
                  id: `proj-${Date.now()}`,
                  name: 'Distributed Telemetry Engine',
                  description: 'High-throughput stream processing pipeline in Rust and WebSockets.',
                  technologies: ['Rust', 'Docker', 'Vite'],
                  highlights: ['Processed 10,000 req/sec with sub-millisecond latency.']
                };
                onUpdateResume({ ...resume, projects: [...resume.projects, newProj] });
              }}
              className="text-xs text-[#38BDF8] hover:text-sky-200 font-mono"
            >
              + Add Project
            </button>
          </div>
          {resume.projects.map((proj, pIdx) => (
            <div key={proj.id} className="p-3 rounded-lg bg-[#060A14] border border-[#1B2944] space-y-2">
              <div className="flex justify-between items-center">
                <input
                  type="text"
                  value={proj.name}
                  onChange={(e) => {
                    const projs = [...resume.projects];
                    projs[pIdx].name = e.target.value;
                    onUpdateResume({ ...resume, projects: projs });
                  }}
                  className="font-bold text-xs text-white bg-transparent border-b border-transparent focus:border-[#E23636] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    const projs = resume.projects.filter((_, i) => i !== pIdx);
                    onUpdateResume({ ...resume, projects: projs });
                  }}
                  className="text-slate-400 hover:text-red-400"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
              <input
                type="text"
                value={proj.description}
                onChange={(e) => {
                  const projs = [...resume.projects];
                  projs[pIdx].description = e.target.value;
                  onUpdateResume({ ...resume, projects: projs });
                }}
                placeholder="Project summary"
                className="w-full px-2 py-1 rounded bg-[#090E1A] border border-[#1E2D4A] text-xs text-slate-300"
              />
              <input
                type="text"
                value={proj.technologies.join(', ')}
                onChange={(e) => {
                  const projs = [...resume.projects];
                  projs[pIdx].technologies = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                  onUpdateResume({ ...resume, projects: projs });
                }}
                placeholder="Technologies used (comma-separated)"
                className="w-full px-2 py-1 rounded bg-[#090E1A] border border-[#1E2D4A] text-xs text-slate-300 font-mono"
              />
            </div>
          ))}
        </div>
      )}

      {/* Tab 5: Education */}
      {activeTab === 'education' && (
        <div className="p-4 rounded-xl bg-[#090E1A] border border-[#1A2844] space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono text-slate-400">Education Credentials</span>
            <button
              type="button"
              onClick={() => {
                const newEdu: EducationItem = {
                  id: `edu-${Date.now()}`,
                  institution: 'University of Technology',
                  degree: 'Bachelor of Science',
                  fieldOfStudy: 'Computer Science',
                  startDate: '2016',
                  endDate: '2020',
                  gpaOrHonors: 'Honors'
                };
                onUpdateResume({ ...resume, education: [...resume.education, newEdu] });
              }}
              className="text-xs text-[#38BDF8] hover:text-sky-200 font-mono"
            >
              + Add Degree
            </button>
          </div>
          {resume.education.map((edu, eIdx) => (
            <div key={edu.id} className="p-3 rounded-lg bg-[#060A14] border border-[#1B2944] space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => {
                    const edus = [...resume.education];
                    edus[eIdx].institution = e.target.value;
                    onUpdateResume({ ...resume, education: edus });
                  }}
                  placeholder="Institution"
                  className="px-2 py-1 rounded bg-[#090E1A] border border-[#1E2D4A] text-xs text-white"
                />
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => {
                    const edus = [...resume.education];
                    edus[eIdx].degree = e.target.value;
                    onUpdateResume({ ...resume, education: edus });
                  }}
                  placeholder="Degree"
                  className="px-2 py-1 rounded bg-[#090E1A] border border-[#1E2D4A] text-xs text-white"
                />
                <input
                  type="text"
                  value={edu.endDate}
                  onChange={(e) => {
                    const edus = [...resume.education];
                    edus[eIdx].endDate = e.target.value;
                    onUpdateResume({ ...resume, education: edus });
                  }}
                  placeholder="Year Graduated"
                  className="px-2 py-1 rounded bg-[#090E1A] border border-[#1E2D4A] text-xs text-white"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 6: Certifications */}
      {activeTab === 'certs' && (
        <div className="p-4 rounded-xl bg-[#090E1A] border border-[#1A2844] space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono text-slate-400">Verified Certifications</span>
            <button
              type="button"
              onClick={() => {
                const newCert: CertificationItem = {
                  id: `cert-${Date.now()}`,
                  name: 'AWS Certified Solutions Architect',
                  issuer: 'Amazon Web Services',
                  date: '2023',
                  credentialId: 'AWS-10293'
                };
                onUpdateResume({ ...resume, certifications: [...resume.certifications, newCert] });
              }}
              className="text-xs text-[#38BDF8] hover:text-sky-200 font-mono"
            >
              + Add Certification
            </button>
          </div>
          {resume.certifications.map((cert, cIdx) => (
            <div key={cert.id} className="p-3 rounded-lg bg-[#060A14] border border-[#1B2944] space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  value={cert.name}
                  onChange={(e) => {
                    const certs = [...resume.certifications];
                    certs[cIdx].name = e.target.value;
                    onUpdateResume({ ...resume, certifications: certs });
                  }}
                  placeholder="Certification Name"
                  className="px-2 py-1 rounded bg-[#090E1A] border border-[#1E2D4A] text-xs text-white"
                />
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={(e) => {
                    const certs = [...resume.certifications];
                    certs[cIdx].issuer = e.target.value;
                    onUpdateResume({ ...resume, certifications: certs });
                  }}
                  placeholder="Issuer"
                  className="px-2 py-1 rounded bg-[#090E1A] border border-[#1E2D4A] text-xs text-white"
                />
                <input
                  type="text"
                  value={cert.date}
                  onChange={(e) => {
                    const certs = [...resume.certifications];
                    certs[cIdx].date = e.target.value;
                    onUpdateResume({ ...resume, certifications: certs });
                  }}
                  placeholder="Year"
                  className="px-2 py-1 rounded bg-[#090E1A] border border-[#1E2D4A] text-xs text-white"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
