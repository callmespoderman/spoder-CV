import React from 'react';
import { Sparkles, Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';
import { ResumeData } from '../../types';

interface TemplateProps {
  resume: ResumeData;
  onPolishBullet?: (bullet: string, role: string, expId: string, bulletIdx: number) => void;
}

export const CompactGridTemplate: React.FC<TemplateProps> = ({
  resume,
  onPolishBullet
}) => {
  const { personal, experiences, education, projects, skills, certifications } = resume;

  return (
    <div className="bg-white text-slate-900 font-sans p-7 sm:p-8 max-w-[850px] mx-auto shadow-xl rounded-sm border border-slate-300">
      {/* Top Banner Header */}
      <div className="bg-[#0D1424] text-white p-4 rounded-md mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-l-4 border-[#E23636]">
        <div className="flex items-center gap-3.5">
          {personal.photoUrl && (
            <img
              src={personal.photoUrl}
              alt={personal.fullName}
              className="w-16 h-16 rounded-md object-cover border border-white/40 shrink-0"
            />
          )}
          <div>
            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white font-mono">
              {personal.fullName || 'Candidate Name'}
            </h1>
            <p className="text-xs font-bold text-[#38BDF8] uppercase tracking-wider">
              {personal.jobTitle}
            </p>
          </div>
        </div>
        <div className="text-[11px] text-slate-300 space-y-0.5 font-mono">
          {personal.email && <div>{personal.email}</div>}
          {personal.phone && <div>{personal.phone}</div>}
          {personal.location && <div>{personal.location}</div>}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Left Narrow Column: Skills, Education, Certs */}
        <div className="space-y-4">
          {/* Summary */}
          {personal.summary && (
            <div>
              <h3 className="text-xs font-bold uppercase font-mono tracking-wider text-[#1E3A8A] border-b-2 border-[#1E3A8A] pb-0.5 mb-1.5">
                Profile
              </h3>
              <p className="text-[11px] leading-relaxed text-slate-700">
                {personal.summary}
              </p>
            </div>
          )}

          {/* Skills Grid */}
          {skills && skills.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase font-mono tracking-wider text-[#1E3A8A] border-b-2 border-[#1E3A8A] pb-0.5 mb-1.5">
                Core Stack
              </h3>
              <div className="space-y-2">
                {skills.map((cat, idx) => (
                  <div key={idx} className="text-[11px]">
                    <div className="font-bold text-slate-900">{cat.category}</div>
                    <div className="text-slate-600 leading-tight">{cat.skills.join(', ')}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase font-mono tracking-wider text-[#1E3A8A] border-b-2 border-[#1E3A8A] pb-0.5 mb-1.5">
                Education
              </h3>
              <div className="space-y-1.5">
                {education.map((edu) => (
                  <div key={edu.id} className="text-[11px]">
                    <div className="font-bold text-slate-900">{edu.degree}</div>
                    <div className="text-slate-600">{edu.institution}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{edu.endDate} {edu.gpaOrHonors && `• ${edu.gpaOrHonors}`}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase font-mono tracking-wider text-[#E23636] border-b-2 border-[#E23636] pb-0.5 mb-1.5">
                Certifications
              </h3>
              <div className="space-y-1">
                {certifications.map((cert) => (
                  <div key={cert.id} className="text-[11px]">
                    <div className="font-bold text-slate-900">{cert.name}</div>
                    <div className="text-[10px] text-slate-500">{cert.issuer} • {cert.date}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Wide Column: Experience & Projects */}
        <div className="md:col-span-2 space-y-4">
          {/* Experience */}
          {experiences && experiences.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase font-mono tracking-wider text-[#1E3A8A] border-b-2 border-[#1E3A8A] pb-0.5 mb-2.5">
                Experience Record
              </h3>
              <div className="space-y-3.5">
                {experiences.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                      <span className="text-xs font-bold text-slate-900">{exp.role}</span>
                      <span className="text-[10px] font-mono text-slate-500">
                        {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-[11px] font-semibold text-[#E23636] mb-1">
                      {exp.company} {exp.location && `• ${exp.location}`}
                    </div>
                    <ul className="space-y-1">
                      {exp.highlights.map((bullet, bIdx) => (
                        <li key={bIdx} className="group text-[11px] leading-relaxed text-slate-700 flex items-start gap-1.5">
                          <span className="text-[#E23636] font-bold mt-0.5">•</span>
                          <span className="flex-1">{bullet}</span>
                          {onPolishBullet && (
                            <button
                              type="button"
                              onClick={() => onPolishBullet(bullet, exp.role, exp.id, bIdx)}
                              className="no-print opacity-0 group-hover:opacity-100 px-1 py-0.5 rounded bg-red-50 text-[#E23636] text-[9px] font-mono shrink-0"
                            >
                              <Sparkles className="w-2.5 h-2.5 inline mr-0.5" />
                              AI
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <div className="pt-2 border-t border-slate-200">
              <h3 className="text-xs font-bold uppercase font-mono tracking-wider text-[#1E3A8A] border-b-2 border-[#1E3A8A] pb-0.5 mb-2">
                Key Technical Projects
              </h3>
              <div className="space-y-2.5">
                {projects.map((proj) => (
                  <div key={proj.id} className="text-[11px]">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>{proj.name}</span>
                      <span className="text-[10px] font-mono text-slate-500">{proj.technologies.join(', ')}</span>
                    </div>
                    <p className="text-slate-600">{proj.description}</p>
                    {proj.highlights && proj.highlights.length > 0 && (
                      <div className="text-slate-700 mt-0.5">
                        {proj.highlights[0]}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
