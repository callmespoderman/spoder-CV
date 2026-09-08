import { QuestionnaireAnswers, ResumeData, UploadedDoc } from '../types';

export const DEFAULT_QUESTIONNAIRE: QuestionnaireAnswers = {
  personal: {
    fullName: 'Peter C. Parker',
    jobTitle: 'Senior Systems Architect & Full-Stack Engineer',
    email: 'peter.parker@networklabs.io',
    phone: '+1 (555) 019-2834',
    location: 'New York, NY (Open to Remote)',
    website: 'https://peterparker.dev',
    linkedin: 'linkedin.com/in/peterparker-tech',
    github: 'github.com/pparker-systems',
    summary: 'High-velocity Systems Architect and Full-Stack Engineer with 7+ years of experience designing distributed resilient microservices, high-throughput network mesh topologies, and responsive web platforms. Proven track record scaling workloads to 10M+ daily events while reducing server latencies by 42%.'
  },
  targetRole: 'Staff Software Engineer / Lead Systems Architect',
  seniority: 'Lead',
  industry: 'Cloud Infrastructure & High-Performance Computing',
  topSkillsInput: 'TypeScript, Go, Rust, React, Node.js, Kubernetes, Distributed Systems, Redis, GraphQL, Docker, AWS, WebSockets, High-Concurrency APIs',
  careerHighlightsInput: `1. Architected real-time event streaming cluster processing 15,000 req/sec with sub-5ms p99 latency using Go and Kafka.
2. Spearheaded migration of monolithic core to event-driven microservices, slashing AWS infrastructure overhead by $240K annually.
3. Mentored 12 mid-level engineers, instituted automated CI/CD canary testing, achieving 99.99% system uptime over 24 consecutive months.
4. Built responsive command-center telemetry dashboard serving 2,500 active concurrent operators.`,
  keyMetricsInput: '42% latency reduction, 10M+ daily active events handled, $240K infrastructure cost reduction, 99.99% uptime achieved, 12 engineers mentored',
  educationInput: 'B.S. in Computer Science & Applied Biophysics - Empire State University (Magna Cum Laude, GPA: 3.92)',
  certificationsInput: 'AWS Certified Solutions Architect - Professional, Certified Kubernetes Administrator (CKA), HashiCorp Certified Terraform Associate',
  targetTone: 'Impactful & Action-Driven'
};

export const DEFAULT_RESUME: ResumeData = {
  personal: {
    fullName: 'Peter C. Parker',
    jobTitle: 'Senior Systems Architect & Full-Stack Engineer',
    email: 'peter.parker@networklabs.io',
    phone: '+1 (555) 019-2834',
    location: 'New York, NY (Open to Remote)',
    website: 'https://peterparker.dev',
    linkedin: 'linkedin.com/in/peterparker-tech',
    github: 'github.com/pparker-systems',
    summary: 'High-velocity Systems Architect and Full-Stack Engineer with 7+ years of experience designing distributed resilient microservices, high-throughput network mesh topologies, and responsive web platforms. Proven track record scaling workloads to 10M+ daily events while reducing server latencies by 42%.'
  },
  experiences: [
    {
      id: 'exp-1',
      company: 'Horizon Dynamics & Computing',
      role: 'Lead Systems Architect',
      location: 'New York, NY',
      startDate: '2022-03',
      endDate: 'Present',
      isCurrent: true,
      highlights: [
        'Architected real-time event distribution fabric ingesting 15,000 requests/sec with sub-5ms p99 latency using Go, gRPC, and Redis cluster.',
        'Spearheaded enterprise migration of monolithic core to Kubernetes microservices, cutting annual AWS infrastructure expenditure by $240,000.',
        'Engineered an intelligent adaptive load-balancer that dynamically re-routes spikes during network congestion, sustaining 99.995% uptime.',
        'Mentored 12 software engineers across backend and infrastructure guilds, standardizing CI/CD pipelines and trunk-based deployment.'
      ]
    },
    {
      id: 'exp-2',
      company: 'Oscorp Bio-Tech & Research Lab',
      role: 'Senior Full-Stack Software Engineer',
      location: 'New York, NY',
      startDate: '2019-06',
      endDate: '2022-02',
      isCurrent: false,
      highlights: [
        'Designed high-throughput telemetry capture suite handling 8M daily sensor events with zero data loss over WebSocket streams.',
        'Accelerated computational simulation rendering by 68% by offloading heavy data pipelines to Web Workers and WebAssembly modules.',
        'Led development of React & TypeScript analytical workbench adopted across 14 research facilities nationwide.'
      ]
    },
    {
      id: 'exp-3',
      company: 'Daily Bugle Media Group',
      role: 'Software Engineer',
      location: 'New York, NY',
      startDate: '2017-08',
      endDate: '2019-05',
      isCurrent: false,
      highlights: [
        'Developed digital asset management and content indexing service that indexed 500K+ high-resolution photographs.',
        'Optimized database query bottlenecks in PostgreSQL, reducing average search latency from 1.4s to 120ms.'
      ]
    }
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'Empire State University',
      degree: 'Bachelor of Science in Computer Science & Applied Physics',
      fieldOfStudy: 'Computer Science',
      startDate: '2013-09',
      endDate: '2017-05',
      gpaOrHonors: 'Magna Cum Laude (GPA 3.92 / 4.0)'
    }
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'WebMesh - Distributed Peer-to-Peer Sensor Network',
      description: 'Ultra-low latency decentralized mesh networking protocol supporting autonomous node discovery and encrypted telemetry relays.',
      technologies: ['Rust', 'WebRTC', 'TypeScript', 'Docker'],
      link: 'https://github.com/pparker-systems/webmesh',
      highlights: [
        'Built decentralized routing protocol handling 500 concurrent mesh nodes with self-healing failovers in under 200ms.',
        'Adopted by 8 open-source IoT research teams with 1.4k GitHub stars.'
      ]
    },
    {
      id: 'proj-2',
      name: 'Acrobat Engine - High-Performance Canvas Renderer',
      description: 'Hardware-accelerated 2D/3D physics simulation engine in WebGL and TypeScript for computational mechanics.',
      technologies: ['TypeScript', 'WebGL', 'GLSL', 'Vite'],
      link: 'https://github.com/pparker-systems/acrobat-engine',
      highlights: [
        'Delivered sustained 60 FPS across 10,000 simultaneous interactive rigid-body entities on standard consumer hardware.'
      ]
    }
  ],
  skills: [
    {
      category: 'Languages & Core',
      skills: ['TypeScript', 'Go', 'Rust', 'JavaScript (ESNext)', 'Python', 'SQL', 'HTML5/CSS3']
    },
    {
      category: 'Architecture & Backend',
      skills: ['Microservices', 'Distributed Systems', 'gRPC', 'GraphQL', 'REST APIs', 'WebSockets', 'Kafka', 'Redis']
    },
    {
      category: 'Cloud & DevOps',
      skills: ['Kubernetes', 'Docker', 'AWS (ECS, SQS, Lambda)', 'Terraform', 'CI/CD Pipelines', 'Prometheus', 'Grafana']
    },
    {
      category: 'Frontend & UI',
      skills: ['React', 'Next.js', 'Tailwind CSS', 'Vite', 'State Management', 'WebGL']
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect - Professional',
      issuer: 'Amazon Web Services',
      date: '2023-04',
      credentialId: 'AWS-PSA-90218'
    },
    {
      id: 'cert-2',
      name: 'Certified Kubernetes Administrator (CKA)',
      issuer: 'Cloud Native Computing Foundation (CNCF)',
      date: '2022-11',
      credentialId: 'CKA-882194'
    }
  ]
};

export const SAMPLE_DOCUMENTS: UploadedDoc[] = [
  {
    id: 'doc-sample-1',
    name: 'Previous_Staff_Resume_2023.txt',
    size: 24500,
    type: 'text/plain',
    category: 'resume',
    contentPreview: 'PETER PARKER - Previous Resume highlights: Lead architect at Horizon Dynamics, Senior engineer at Oscorp Bio-Tech, 7 years distributed systems experience. Led 12 engineers, optimized AWS by $240k.',
    extractedInsights: [
      'Verified 7+ years of senior backend and cloud infrastructure experience',
      'Extracted quantified impact: $240K cost savings and 15k req/sec throughput',
      'Identified core Go, Kubernetes, and gRPC competencies'
    ],
    status: 'parsed'
  },
  {
    id: 'doc-sample-2',
    name: 'Academic_Transcript_EmpireState.txt',
    size: 14800,
    type: 'text/plain',
    category: 'transcript',
    contentPreview: 'EMPIRE STATE UNIVERSITY - Department of Computer Science. Cumulative GPA: 3.92. Degree Awarded: BS Computer Science & Applied Physics, Magna Cum Laude. Courses: Distributed Systems, Advanced Algorithms, Network Protocols.',
    extractedInsights: [
      'Confirmed Magna Cum Laude honors & 3.92 GPA in CS & Applied Physics',
      'Validated coursework in Distributed Systems, Graph Theory, and Network Protocols'
    ],
    status: 'parsed'
  },
  {
    id: 'doc-sample-3',
    name: 'AWS_Solutions_Architect_Certificate.txt',
    size: 8900,
    type: 'text/plain',
    category: 'certificate',
    contentPreview: 'CERTIFICATE OF ACHIEVEMENT: Amazon Web Services certifies Peter Parker as AWS Certified Solutions Architect - Professional. Validation ID: AWS-PSA-90218. Valid through 2026.',
    extractedInsights: [
      'Verified AWS Solutions Architect Professional credential ID AWS-PSA-90218'
    ],
    status: 'parsed'
  }
];
