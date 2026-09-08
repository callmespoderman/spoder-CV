import React from 'react';
import { Sparkles } from 'lucide-react';
import { ResumeData } from '../../types';

interface TemplateProps {
  resume: ResumeData;
  onPolishBullet?: (bullet: string, role: string, expId: string, bulletIdx: number) => void;
}

export const AtsMinimalTemplate: React.FC<TemplateProps> = ({
  resume,
  onPolishBullet
}) => {
  const { personal, experiences, education, projects, skills, certifications } = resume;

  return (
    <div className="bg-white text-black font-sans p-8 sm:p-10 max-w-[850px] mx-auto shadow-xl rounded-sm border border-slate-300">
      {/* ATS Ultra Pure Header */}
      <div className="border-b border-black pb-3 mb-4 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-black uppercase">
            {personal.fullName || 'Candidate Name'}
          </h1>
          <div className="text-xs font-semibold text-black mt-0.5">
            {personal.jobTitle}
          </div>
          <div className="text-xs text-black mt-1.5 space-x-2">
            {personal.location && <span>{personal.location}</span>}
            {personal.phone && <span>| {personal.phone}</span>}
            {personal.email && <span>| {personal.email}</span>}
            {personal.linkedin && <span>| {personal.linkedin}</span>}
            {personal.github && <span>| {personal.github}</span>}
          </div>
        </div>
        {personal.photoUrl && (
          <img
            src={personal.photoUrl}
            alt={personal.fullName}
            className="w-16 h-16 rounded-sm object-cover border border-slate-300 ml-4 shrink-0"
          />
        )}
      </div>

      {/* Summary */}
      {personal.summary && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase text-black border-b border-black pb-0.5 mb-1.5">
            Professional Summary
          </h2>
          <p className="text-xs leading-relaxed text-black">
            {personal.summary}
          </p>
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase text-black border-b border-black pb-0.5 mb-1.5">
            Technical Skills
          </h2>
          <div className="text-xs space-y-1 text-black">
            {skills.map((cat, idx) => (
              <div key={idx}>
                <strong>{cat.category}: </strong>
                <span>{cat.skills.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {experiences && experiences.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase text-black border-b border-black pb-0.5 mb-2">
            Work Experience
          </h2>
          <div className="space-y-3">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between text-xs font-bold text-black">
                  <span>{exp.company} — {exp.role}</span>
                  <span>{exp.startDate} to {exp.isCurrent ? 'Present' : exp.endDate}</span>
                </div>
                {exp.location && <div className="text-[11px] text-black italic">{exp.location}</div>}
                <ul className="list-disc pl-5 mt-1 space-y-1 text-xs text-black">
                  {exp.highlights.map((bullet, bIdx) => (
                    <li key={bIdx} className="group leading-relaxed">
                      <div className="flex items-start justify-between gap-2">
                        <span>{bullet}</span>
                        {onPolishBullet && (
                          <button
                            type="button"
                            onClick={() => onPolishBullet(bullet, exp.role, exp.id, bIdx)}
                            className="no-print opacity-0 group-hover:opacity-100 px-1 py-0.5 bg-slate-100 hover:bg-slate-200 text-[10px] rounded text-black font-mono"
                          >
                            AI Polish
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

      {/* Education */}
      {education && education.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase text-black border-b border-black pb-0.5 mb-1.5">
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="text-xs text-black">
              <div className="flex justify-between font-bold">
                <span>{edu.institution}</span>
                <span>Graduated: {edu.endDate}</span>
              </div>
              <div>{edu.degree} in {edu.fieldOfStudy} {edu.gpaOrHonors && `— ${edu.gpaOrHonors}`}</div>
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <div>
          <h2 className="text-xs font-bold uppercase text-black border-b border-black pb-0.5 mb-1.5">
            Certifications
          </h2>
          <ul className="list-disc pl-5 text-xs text-black space-y-0.5">
            {certifications.map((cert) => (
              <li key={cert.id}>
                {cert.name} ({cert.issuer}, {cert.date}) {cert.credentialId && `• ${cert.credentialId}`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
