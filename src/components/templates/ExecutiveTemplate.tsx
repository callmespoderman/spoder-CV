import React from 'react';
import { Sparkles, Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';
import { ResumeData } from '../../types';

interface TemplateProps {
  resume: ResumeData;
  onPolishBullet?: (bullet: string, role: string, expId: string, bulletIdx: number) => void;
}

export const ExecutiveTemplate: React.FC<TemplateProps> = ({
  resume,
  onPolishBullet
}) => {
  const { personal, experiences, education, projects, skills, certifications } = resume;

  return (
    <div className="bg-white text-slate-900 font-serif p-8 sm:p-10 max-w-[850px] mx-auto shadow-xl rounded-sm border border-slate-200">
      {/* Header Center */}
      <div className="text-center border-b border-slate-300 pb-5 mb-5">
        {personal.photoUrl && (
          <img
            src={personal.photoUrl}
            alt={personal.fullName}
            className="w-20 h-20 rounded-full object-cover border-2 border-slate-300 shadow-sm mx-auto mb-3"
          />
        )}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-normal text-slate-900 uppercase">
          {personal.fullName || 'Candidate Name'}
        </h1>
        <p className="text-xs font-sans font-bold tracking-widest text-[#1E3A8A] uppercase mt-1">
          {personal.jobTitle || 'Executive Professional'}
        </p>

        {/* Contact info inline */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs font-sans text-slate-600 mt-2.5">
          {personal.location && <span>{personal.location}</span>}
          {personal.phone && <span>• {personal.phone}</span>}
          {personal.email && <span>• {personal.email}</span>}
          {personal.linkedin && <span>• {personal.linkedin.replace(/^https?:\/\//, '')}</span>}
          {personal.website && <span>• {personal.website.replace(/^https?:\/\//, '')}</span>}
          {personal.github && <span>• {personal.github.replace(/^https?:\/\//, '')}</span>}
        </div>
      </div>

      {/* Executive Summary */}
      {personal.summary && (
        <div className="mb-5">
          <h2 className="text-xs font-sans font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
            Executive Summary
          </h2>
          <p className="text-xs leading-relaxed text-slate-700 font-sans text-justify">
            {personal.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {experiences && experiences.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-sans font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-3">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="font-sans">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                  <div>
                    <span className="text-xs font-bold text-slate-900 font-serif">{exp.company}</span>
                    <span className="text-xs text-slate-600 italic"> — {exp.role}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate} {exp.location && `| ${exp.location}`}
                  </div>
                </div>

                <ul className="space-y-1.5 mt-1.5 pl-4 list-disc text-slate-700">
                  {exp.highlights.map((bullet, bIdx) => (
                    <li key={bIdx} className="group text-xs leading-relaxed pl-0.5">
                      <div className="flex items-start justify-between gap-2">
                        <span>{bullet}</span>
                        {onPolishBullet && (
                          <button
                            type="button"
                            onClick={() => onPolishBullet(bullet, exp.role, exp.id, bIdx)}
                            className="no-print opacity-0 group-hover:opacity-100 transition-opacity px-1.5 py-0.5 rounded bg-blue-50 hover:bg-blue-100 border border-blue-200 text-[#1E3A8A] text-[10px] font-mono shrink-0 flex items-center gap-1 shadow-sm"
                            title="Improve bullet with AI"
                          >
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>AI Polish</span>
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-sans font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
            Core Competencies & Leadership Capabilities
          </h2>
          <div className="space-y-1 font-sans">
            {skills.map((cat, idx) => (
              <div key={idx} className="text-xs">
                <span className="font-bold text-slate-800">{cat.category}: </span>
                <span className="text-slate-600">{cat.skills.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education & Certs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-200 pt-3">
        {education && education.length > 0 && (
          <div>
            <h2 className="text-xs font-sans font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
              Education
            </h2>
            <div className="space-y-2 font-sans">
              {education.map((edu) => (
                <div key={edu.id} className="text-xs">
                  <div className="font-bold text-slate-900">{edu.degree}</div>
                  <div className="text-slate-600">{edu.institution} ({edu.endDate})</div>
                  {edu.gpaOrHonors && <div className="text-[11px] text-[#1E3A8A]">{edu.gpaOrHonors}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {certifications && certifications.length > 0 && (
          <div>
            <h2 className="text-xs font-sans font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
              Certifications & Credentials
            </h2>
            <div className="space-y-1.5 font-sans">
              {certifications.map((cert) => (
                <div key={cert.id} className="text-xs">
                  <span className="font-bold text-slate-900">{cert.name}</span>
                  <span className="text-slate-600 text-[11px]"> — {cert.issuer} ({cert.date})</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
