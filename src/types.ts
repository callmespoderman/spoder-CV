export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
  photoUrl?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  highlights: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  gpaOrHonors?: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  highlights: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface ResumeData {
  personal: PersonalInfo;
  experiences: WorkExperience[];
  education: EducationItem[];
  projects: ProjectItem[];
  skills: SkillCategory[];
  certifications: CertificationItem[];
  customSections?: {
    id: string;
    title: string;
    items: string[];
  }[];
}

export interface UploadedDoc {
  id: string;
  name: string;
  size: number;
  type: string;
  category: 'resume' | 'transcript' | 'certificate' | 'project' | 'recommendation' | 'other';
  contentPreview?: string;
  base64Data?: string;
  mimeType?: string;
  extractedInsights?: string[];
  status: 'idle' | 'analyzing' | 'parsed' | 'error';
}

export interface QuestionnaireAnswers {
  personal: Partial<PersonalInfo>;
  targetRole: string;
  seniority: 'Entry' | 'Mid' | 'Senior' | 'Lead' | 'Executive';
  industry: string;
  topSkillsInput: string;
  careerHighlightsInput: string;
  keyMetricsInput: string;
  educationInput: string;
  certificationsInput: string;
  targetTone: 'Impactful & Action-Driven' | 'Technical & Analytical' | 'Executive & Strategic' | 'Clean & Concise';
}

export interface ATSAnalysis {
  overallScore: number;
  impactScore: number;
  keywordScore: number;
  brevityScore: number;
  strengths: string[];
  improvements: string[];
  missingKeywords: string[];
}

export type TemplateStyle = 'tech-cyber' | 'executive' | 'ats-minimal' | 'compact-grid';

export type ResumeFont = 'sans' | 'serif' | 'mono' | 'garamond' | 'grotesk';

export interface PhotoAuditCriterion {
  score: number;
  status: 'optimal' | 'acceptable' | 'needs-attention';
  title: string;
  feedback: string;
  tips: string[];
}

export interface PhotoAuditResult {
  overallScore: number;
  grade: 'Executive Grade' | 'Professional' | 'Acceptable' | 'Needs Retake';
  posture: PhotoAuditCriterion;
  dress: PhotoAuditCriterion;
  hair: PhotoAuditCriterion;
  background: PhotoAuditCriterion;
  summary: string;
  analyzedAt: string;
}

export interface PdfTextAnnotation {
  id: string;
  x: number; // percentage from left 0 - 100
  y: number; // percentage from top 0 - 100
  text: string;
  font: ResumeFont;
  fontSize: number; // in pixels, e.g. 11, 12, 14, 18
  color: string; // hex code
  fontWeight: 'normal' | 'medium' | 'bold';
  fontStyle?: 'normal' | 'italic';
  isWhiteout?: boolean; // whether to draw an opaque white backing box
  linkedIssueId?: string;
}

export interface PdfCheckIssue {
  id: string;
  pass: 1 | 2 | 3;
  type: 'spelling' | 'grammar' | 'ats';
  severity: 'high' | 'medium' | 'low';
  originalText: string;
  suggestedText: string;
  explanation: string;
  location: string; // e.g., "Summary", "Lead Architect @ Horizon Tech", "Skills"
  section: string;
  resolved?: boolean;
}

export interface PdfCheckResult {
  pass1Count: number; // spelling
  pass2Count: number; // grammar
  pass3Count: number; // ats & structure
  totalIssues: number;
  score: number;
  issues: PdfCheckIssue[];
  completedAt: string;
}
