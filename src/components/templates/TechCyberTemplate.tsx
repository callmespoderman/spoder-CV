import React from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Linkedin, 
  Github, 
  ExternalLink, 
  Sparkles, 
  Award, 
  GraduationCap 
} from 'lucide-react';
import { ResumeData } from '../../types';

interface TemplateProps {
  resume: ResumeData;
  onPolishBullet?: (bullet: string, role: string, expId: string, bulletIdx: number) => void;
}

export const TechCyberTemplate: React.FC<TemplateProps> = ({
  resume,
  onPolishBullet
}) => {
  const { personal, experiences, education, projects, skills, certifications } = resume;

  return (
    <div className="bg-white text-slate-900 font-sans p-8 sm:p-10 max-w-[850px] mx-auto shadow-xl rounded-sm border border-slate-200">
      {/* Header Bar */}
      <div className="border-b-2 border-slate-900 pb-5 mb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {personal.photoUrl && (
              <img
                src={personal.photoUrl}
                alt={personal.fullName}
                className="w-20 h-20 rounded-xl object-cover border-2 border-slate-900 shadow-md shrink-0"
              />
            )}
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 uppercase font-mono">
                {personal.fullName || 'Candidate Name'}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-block w-2 h-2 rounded-full bg-[#E23636]" />
                <p className="text-sm font-bold text-[#1E3A8A] uppercase tracking-wide">
                  {personal.jobTitle || 'Senior Software Engineer'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 text-xs text-slate-600 mt-3.5 pt-3 border-t border-slate-200">
          {personal.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-[#E23636]" />
              <span>{personal.email}</span>
            </div>
          )}
          {personal.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-[#1E3A8A]" />
              <span>{personal.phone}</span>
            </div>
          )}
          {personal.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              <span>{personal.location}</span>
            </div>
          )}
          {personal.website && (
            <div className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-[#E23636]" />
              <span>{personal.website.replace(/^https?:\/\//, '')}</span>
            </div>
          )}
          {personal.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="w-3.5 h-3.5 text-[#1E3A8A]" />
              <span>{personal.linkedin.replace(/^https?:\/\//, '')}</span>
            </div>
          )}
          {personal.github && (
            <div className="flex items-center gap-1">
              <Github className="w-3.5 h-3.5 text-slate-700" />
              <span>{personal.github.replace(/^https?:\/\//, '')}</span>
            </div>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {personal.summary && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase font-mono tracking-wider text-slate-900 mb-1.5 flex items-center gap-2">
            <span className="w-2.5 h-1 bg-[#E23636] inline-block" />
            Executive Summary
          </h2>
          <p className="text-xs leading-relaxed text-slate-700 pl-3 border-l-2 border-[#1E3A8A]/30">
            {personal.summary}
          </p>
        </div>
      )}

      {/* Technical Skills Category Grid */}
      {skills && skills.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase font-mono tracking-wider text-slate-900 mb-2 flex items-center gap-2">
            <span className="w-2.5 h-1 bg-[#E23636] inline-block" />
            Technical Architecture & Core Competencies
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-3">
            {skills.map((cat, idx) => (
              <div key={idx} className="text-xs">
                <span className="font-bold text-[#1E3A8A] mr-1.5">{cat.category}:</span>
                <span className="text-slate-700 leading-normal">{cat.skills.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience Section */}
      {experiences && experiences.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase font-mono tracking-wider text-slate-900 mb-3 flex items-center gap-2">
            <span className="w-2.5 h-1 bg-[#E23636] inline-block" />
            Professional Experience
          </h2>
          <div className="space-y-4 pl-3">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                  <div>
                    <span className="text-xs font-bold text-slate-900">{exp.role}</span>
                    <span className="text-xs text-slate-500 font-medium"> @ </span>
                    <span className="text-xs font-bold text-[#1E3A8A]">{exp.company}</span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-600">
                    {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                    {exp.location && ` | ${exp.location}`}
                  </div>
                </div>

                <ul className="space-y-1.5 mt-1.5">
                  {exp.highlights.map((bullet, bIdx) => (
                    <li 
                      key={bIdx}
                      className="group text-xs leading-relaxed text-slate-700 flex items-start gap-2 relative pl-1"
                    >
                      <span className="text-[#E23636] font-bold text-[10px] mt-0.5">•</span>
                      <span className="flex-1">{bullet}</span>
                      {onPolishBullet && (
                        <button
                          type="button"
                          onClick={() => onPolishBullet(bullet, exp.role, exp.id, bIdx)}
                          className="no-print opacity-0 group-hover:opacity-100 transition-opacity px-1.5 py-0.5 rounded bg-red-50 hover:bg-red-100 border border-red-200 text-[#E23636] text-[10px] font-mono shrink-0 flex items-center gap-1 shadow-sm"
                          title="Improve this bullet point with AI XYZ formula"
                        >
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>AI Polish</span>
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

      {/* Projects Section */}
      {projects && projects.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase font-mono tracking-wider text-slate-900 mb-3 flex items-center gap-2">
            <span className="w-2.5 h-1 bg-[#E23636] inline-block" />
            Featured Technical Projects
          </h2>
          <div className="space-y-3 pl-3">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{proj.name}</span>
                    {proj.link && (
                      <a 
                        href={proj.link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-[10px] text-[#1E3A8A] hover:underline flex items-center gap-0.5 font-mono"
                      >
                        <span>Link</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500">
                    {proj.technologies.join(' • ')}
                  </div>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">{proj.description}</p>
                {proj.highlights && proj.highlights.length > 0 && (
                  <ul className="space-y-1 mt-1 pl-1">
                    {proj.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="text-xs text-slate-700 flex items-start gap-2">
                        <span className="text-[#1E3A8A] font-bold text-[10px] mt-0.5">›</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education & Certifications Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200">
        {/* Education */}
        {education && education.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase font-mono tracking-wider text-slate-900 mb-2 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-[#1E3A8A]" />
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="text-xs">
                  <div className="font-bold text-slate-900">{edu.degree}</div>
                  <div className="text-slate-700">{edu.institution}</div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    Graduated {edu.endDate} {edu.gpaOrHonors && `• ${edu.gpaOrHonors}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase font-mono tracking-wider text-slate-900 mb-2 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#E23636]" />
              Verified Certifications
            </h2>
            <div className="space-y-1.5">
              {certifications.map((cert) => (
                <div key={cert.id} className="text-xs">
                  <div className="font-bold text-slate-900">{cert.name}</div>
                  <div className="text-[11px] text-slate-600 font-mono">
                    {cert.issuer} ({cert.date}) {cert.credentialId && `• ID: ${cert.credentialId}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
