import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  UploadCloud, 
  FileText, 
  ShieldCheck, 
  Printer, 
  CheckCircle2, 
  FileCheck,
  Edit3,
  UserCheck,
  Search,
  Type
} from 'lucide-react';
import { InteractiveCanvas } from './InteractiveCanvas';
import { TiltCard } from './TiltCard';
import { TemplateStyle } from '../types';

interface HomePageProps {
  onStartBuilder: (step?: 1 | 2 | 3) => void;
  onLoadDemo: () => void;
  onSelectTemplate: (template: TemplateStyle) => void;
  onOpenEnhanceResume: () => void;
  onOpenPdfEditor?: () => void;
  onOpenPdfChecker?: () => void;
  onOpenPhotoAudit?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onStartBuilder,
  onLoadDemo,
  onSelectTemplate,
  onOpenEnhanceResume,
  onOpenPdfEditor,
  onOpenPdfChecker,
  onOpenPhotoAudit
}) => {
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });
  const [heroTilt, setHeroTilt] = useState({ rotateX: 0, rotateY: 0 });

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const tiltX = ((e.clientY - centerY) / centerY) * -7;
      const tiltY = ((e.clientX - centerX) / centerX) * 7;
      setHeroTilt({ rotateX: tiltX, rotateY: tiltY });
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

  return (
    <div className="relative overflow-hidden min-h-screen bg-[#060911] text-slate-100 selection:bg-[#E23636] selection:text-white">
      {/* Interactive Neural Canvas */}
      <InteractiveCanvas />

      {/* Mouse Radial Spotlight */}
      <div 
        className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-300"
        style={{
          background: `radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, rgba(226, 54, 54, 0.08), rgba(30, 58, 138, 0.06), transparent 75%)`
        }}
      />

      {/* Hero Section */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-5 text-center lg:text-left"
          >
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D1527] border border-[#22355A]">
              <span className="w-2 h-2 rounded-full bg-[#E23636] animate-pulse" />
              <span className="text-[11px] font-mono text-slate-300 uppercase tracking-wide">
                Professional Resume Builder &amp; Enhancer
              </span>
            </div>

            {/* Concise Executive Headline */}
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight uppercase font-mono text-white leading-tight">
              PRECISION RESUMES. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E23636] via-[#EF4444] to-[#38BDF8]">
                AUDITED &amp; ENHANCED.
              </span>
            </h1>

            {/* Sharp, Professional Subhead without fluff */}
            <p className="text-base text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Build from questionnaire and documents, or audit a pre-built resume to identify gaps, answer missing details, and optimize for ATS parsers.
            </p>

            {/* Direct Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              {/* Build From Scratch */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => onStartBuilder(1)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#E23636] to-[#DC2626] text-white font-bold text-xs uppercase font-mono tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all"
              >
                <span>Build New Resume</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              {/* Enhance Pre-Built Resume */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={onOpenEnhanceResume}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#0D1527] hover:bg-[#15223C] border border-[#233860] text-[#38BDF8] font-bold text-xs uppercase font-mono tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4 text-[#38BDF8]" />
                <span>Enhance Pre-Built Resume</span>
              </motion.button>

              {/* Load Sample Demo */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={onLoadDemo}
                className="w-full sm:w-auto px-4 py-3.5 rounded-xl bg-transparent hover:bg-[#0E172A] border border-[#1A2640] text-slate-300 text-xs font-mono uppercase tracking-wider transition-all"
              >
                Load Sample
              </motion.button>
            </div>

            {/* Direct Tool Jump Bar */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              {onOpenPdfEditor && (
                <button
                  type="button"
                  onClick={onOpenPdfEditor}
                  className="px-3 py-1.5 rounded-xl bg-[#0D1527] hover:bg-[#15223C] border border-[#233860] text-slate-200 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5 text-[#E23636]" />
                  <span>Precision PDF Editor</span>
                </button>
              )}
              {onOpenPdfChecker && (
                <button
                  type="button"
                  onClick={onOpenPdfChecker}
                  className="px-3 py-1.5 rounded-xl bg-[#0D1527] hover:bg-[#15223C] border border-[#233860] text-slate-200 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
                >
                  <Search className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>3-Pass PDF Checker</span>
                </button>
              )}
              {onOpenPhotoAudit && (
                <button
                  type="button"
                  onClick={onOpenPhotoAudit}
                  className="px-3 py-1.5 rounded-xl bg-[#0D1527] hover:bg-[#15223C] border border-[#233860] text-slate-200 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
                >
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Photo Quality Audit</span>
                </button>
              )}
            </div>

            {/* Quick Metrics Strip */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                100% ATS-Compliant Layouts
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#38BDF8]" />
                Automated Issue Audit
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E23636]" />
                Single-Click Windows Print/PDF
              </span>
            </div>
          </motion.div>

          {/* Right Column: 3D Interactive Resume Showcase */}
          <div className="lg:col-span-5 flex justify-center perspective-[1200px]">
            <motion.div
              style={{
                transform: `perspective(1000px) rotateX(${heroTilt.rotateX}deg) rotateY(${heroTilt.rotateY}deg)`,
                transition: 'transform 0.12s ease-out'
              }}
              className="relative w-full max-w-[400px]"
            >
              {/* Floating Audit Badge */}
              <div 
                style={{
                  transform: `translate3d(${-heroTilt.rotateY * 2}px, ${-heroTilt.rotateX * 2}px, 30px)`
                }}
                className="absolute -top-3 -right-3 z-30 px-3 py-1.5 rounded-xl bg-[#0A1222]/95 border border-emerald-500/50 shadow-xl flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <div className="text-left">
                  <div className="text-[9px] font-mono text-slate-400 uppercase">ATS Audit</div>
                  <div className="text-xs font-bold text-emerald-300 font-mono">98% Verified</div>
                </div>
              </div>

              {/* Sample Resume Preview */}
              <div className="bg-white text-slate-900 rounded-xl p-5 shadow-2xl border border-slate-300 relative overflow-hidden select-none">
                <div className="border-b-2 border-slate-900 pb-2 mb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-sm font-black uppercase font-mono text-slate-950">
                        Peter C. Parker
                      </h2>
                      <p className="text-[10px] font-bold text-[#1E3A8A] uppercase font-mono">
                        Lead Systems Architect
                      </p>
                    </div>
                    <span className="px-1.5 py-0.5 rounded bg-blue-50 text-[9px] font-mono font-bold text-[#1E3A8A] border border-blue-200">
                      Tech Cyber
                    </span>
                  </div>
                  <div className="text-[9px] text-slate-500 font-mono mt-1 flex gap-2">
                    <span>New York, NY</span>
                    <span>•</span>
                    <span>peter@spodertech.dev</span>
                  </div>
                </div>

                <div className="mb-2">
                  <div className="text-[9px] font-bold uppercase font-mono text-slate-800 mb-0.5">
                    Summary
                  </div>
                  <p className="text-[8.5px] text-slate-600 leading-snug">
                    Systems architect with 8+ years designing high-throughput distributed microservices. Cut cloud infrastructure expenses by $240K/yr.
                  </p>
                </div>

                <div className="mb-2 space-y-1">
                  <div className="text-[9px] font-bold uppercase font-mono text-slate-800">
                    Experience
                  </div>
                  <div className="text-[8.5px]">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>Lead Architect @ Horizon Tech</span>
                      <span className="text-[8px] font-mono text-slate-500">2021 – Present</span>
                    </div>
                    <ul className="text-[8px] text-slate-700 mt-0.5 space-y-0.5 pl-2 list-disc marker:text-[#E23636]">
                      <li>Spearheaded cluster processing 15,000 req/sec with sub-5ms latency.</li>
                      <li>Engineered zero-downtime multi-region failover across AWS &amp; GCP.</li>
                    </ul>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <div className="flex flex-wrap gap-1">
                    {['Go', 'Rust', 'Kubernetes', 'TypeScript', 'Distributed Systems'].map((s) => (
                      <span key={s} className="px-1.5 py-0.5 rounded bg-slate-100 text-[8px] font-mono text-slate-800 font-semibold border border-slate-200">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Process Workflow */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 py-12 border-t border-[#141E34]">
        <div className="text-center space-y-1.5 mb-8">
          <span className="text-xs font-mono font-bold text-[#E23636] uppercase tracking-wider">
            Workflow
          </span>
          <h2 className="text-xl sm:text-2xl font-black uppercase font-mono text-white tracking-tight">
            How It Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Step 1 */}
          <TiltCard
            onClick={() => onStartBuilder(1)}
            className="cursor-pointer bg-[#0B101E] border border-[#1E2D4A] hover:border-[#E23636]/60 rounded-xl p-5 shadow-lg group transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-[#E23636]/15 border border-[#E23636]/40 flex items-center justify-center text-[#E23636] mb-3 group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-bold text-white uppercase font-mono tracking-wide mb-1 flex items-center justify-between">
              <span>1. Guided Intake</span>
              <span className="text-[10px] text-slate-500 font-mono">STEP 01</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Enter candidate details, experience timeline, and technical skill profile.
            </p>
            <div className="text-[11px] font-mono font-bold text-[#E23636] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Open Intake</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </TiltCard>

          {/* Step 2 */}
          <TiltCard
            onClick={() => onStartBuilder(2)}
            glareColor="rgba(37, 99, 235, 0.3)"
            className="cursor-pointer bg-[#0B101E] border border-[#1E2D4A] hover:border-[#2563EB]/60 rounded-xl p-5 shadow-lg group transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-[#1E3A8A]/20 border border-[#2563EB]/40 flex items-center justify-center text-[#38BDF8] mb-3 group-hover:scale-105 transition-transform">
              <UploadCloud className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-bold text-white uppercase font-mono tracking-wide mb-1 flex items-center justify-between">
              <span>2. Document Vault</span>
              <span className="text-[10px] text-slate-500 font-mono">STEP 02</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Attach transcripts, certifications, or past resumes for credential extraction.
            </p>
            <div className="text-[11px] font-mono font-bold text-[#38BDF8] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Open Vault</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </TiltCard>

          {/* Step 3 */}
          <TiltCard
            onClick={() => onStartBuilder(3)}
            glareColor="rgba(16, 185, 129, 0.25)"
            className="cursor-pointer bg-[#0B101E] border border-[#1E2D4A] hover:border-emerald-500/60 rounded-xl p-5 shadow-lg group transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-105 transition-transform">
              <Printer className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-bold text-white uppercase font-mono tracking-wide mb-1 flex items-center justify-between">
              <span>3. Live Studio &amp; Export</span>
              <span className="text-[10px] text-slate-500 font-mono">STEP 03</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Review live resume, inspect ATS audit scores, and print or export to PDF.
            </p>
            <div className="text-[11px] font-mono font-bold text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>View Studio</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </TiltCard>
        </div>
      </section>

      {/* Specialized Suite Tools (PDF Editor, 3-Pass Checker, Photo Quality Audit) */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 py-12 border-t border-[#141E34]">
        <div className="text-center space-y-1.5 mb-8">
          <span className="text-xs font-mono font-bold text-[#38BDF8] uppercase tracking-wider">
            Precision Suite
          </span>
          <h2 className="text-xl sm:text-2xl font-black uppercase font-mono text-white tracking-tight">
            Integrated Document Diagnostics
          </h2>
          <p className="text-xs text-slate-400 max-w-lg mx-auto">
            Scan and patch PDFs, run triple-pass grammatical verification, and audit candidate profile photographs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Tool 1: PDF Editor */}
          <TiltCard
            onClick={onOpenPdfEditor}
            className="cursor-pointer bg-[#0A101E] border border-[#1E2D4A] hover:border-[#E23636] rounded-xl p-5 shadow-lg group transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-[#E23636]/15 border border-[#E23636]/40 flex items-center justify-center text-[#E23636] mb-3 group-hover:scale-105 transition-transform">
              <Edit3 className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-bold text-white uppercase font-mono tracking-wide mb-1 flex items-center justify-between">
              <span>Precision PDF Editor</span>
              <span className="text-[10px] text-[#E23636] font-mono">SCAN &amp; EDIT</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Scan whole PDF, click anywhere to add text, and automatically match font family, size, and color.
            </p>
            <div className="text-[11px] font-mono font-bold text-[#E23636] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Launch PDF Editor</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </TiltCard>

          {/* Tool 2: 3-Pass PDF Checker */}
          <TiltCard
            onClick={onOpenPdfChecker}
            glareColor="rgba(56, 189, 248, 0.3)"
            className="cursor-pointer bg-[#0A101E] border border-[#1E2D4A] hover:border-[#38BDF8] rounded-xl p-5 shadow-lg group transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-[#1E3A8A]/20 border border-[#2563EB]/40 flex items-center justify-center text-[#38BDF8] mb-3 group-hover:scale-105 transition-transform">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-bold text-white uppercase font-mono tracking-wide mb-1 flex items-center justify-between">
              <span>3-Pass Deep PDF Checker</span>
              <span className="text-[10px] text-[#38BDF8] font-mono">3X SCAN</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Inspects spelling (Pass 1), grammar (Pass 2), and ATS (Pass 3). Prompts to launch PDF editor to apply fixes.
            </p>
            <div className="text-[11px] font-mono font-bold text-[#38BDF8] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Run 3-Pass Scan</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </TiltCard>

          {/* Tool 3: Photo Standards Audit */}
          <TiltCard
            onClick={onOpenPhotoAudit}
            glareColor="rgba(16, 185, 129, 0.25)"
            className="cursor-pointer bg-[#0A101E] border border-[#1E2D4A] hover:border-emerald-500 rounded-xl p-5 shadow-lg group transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-105 transition-transform">
              <UserCheck className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-bold text-white uppercase font-mono tracking-wide mb-1 flex items-center justify-between">
              <span>Photo Quality Audit</span>
              <span className="text-[10px] text-emerald-400 font-mono">EXECUTIVE</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Audits headshot posture, dress formality, hair grooming, and studio background with alignment reticle.
            </p>
            <div className="text-[11px] font-mono font-bold text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Inspect Headshot</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </TiltCard>
        </div>
      </section>

      {/* Template Selector Section */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 py-12 border-t border-[#141E34]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black uppercase font-mono text-white tracking-tight">
              Resume Templates
            </h2>
            <p className="text-xs text-slate-400">
              Select an archetype to preview layout and structure.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Tech Cyber */}
          <TiltCard
            onClick={() => onSelectTemplate('tech-cyber')}
            className="cursor-pointer bg-[#0A101E] border border-[#1E2D4A] hover:border-[#E23636] rounded-xl p-4 shadow-lg group transition-all"
          >
            <div className="h-24 rounded bg-white p-2.5 text-[7px] text-slate-800 overflow-hidden mb-2 border border-slate-300 select-none">
              <div className="font-mono font-bold border-b border-slate-900 pb-0.5 mb-1 text-[8px] flex justify-between">
                <span>CANDIDATE</span>
                <span className="text-[#E23636]">TECH CYBER</span>
              </div>
              <div className="text-slate-500 font-mono space-y-0.5">
                <div>• Distributed streaming pipeline architecture</div>
                <div>• 99.99% system availability metric</div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-xs font-bold text-white uppercase font-mono">Tech Cyber</h4>
                <p className="text-[10px] text-slate-400">Modern technical layout</p>
              </div>
              <span className="text-[10px] font-mono text-[#E23636]">Select →</span>
            </div>
          </TiltCard>

          {/* Executive */}
          <TiltCard
            onClick={() => onSelectTemplate('executive')}
            className="cursor-pointer bg-[#0A101E] border border-[#1E2D4A] hover:border-[#1E3A8A] rounded-xl p-4 shadow-lg group transition-all"
          >
            <div className="h-24 rounded bg-white p-2.5 text-[7px] text-slate-800 overflow-hidden mb-2 border border-slate-300 select-none font-serif">
              <div className="text-center border-b border-slate-300 pb-0.5 mb-1 text-[8px] font-bold">
                CANDIDATE NAME
              </div>
              <div className="text-[6.5px] text-center text-slate-500 italic mb-0.5 font-sans">
                Executive Leadership
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-xs font-bold text-white uppercase font-mono">Executive</h4>
                <p className="text-[10px] text-slate-400">Classic corporate style</p>
              </div>
              <span className="text-[10px] font-mono text-[#38BDF8]">Select →</span>
            </div>
          </TiltCard>

          {/* ATS Minimal */}
          <TiltCard
            onClick={() => onSelectTemplate('ats-minimal')}
            className="cursor-pointer bg-[#0A101E] border border-[#1E2D4A] hover:border-slate-400 rounded-xl p-4 shadow-lg group transition-all"
          >
            <div className="h-24 rounded bg-white p-2.5 text-[7px] text-black overflow-hidden mb-2 border border-slate-300 select-none font-sans">
              <div className="border-b border-black pb-0.5 mb-1 text-[8px] font-bold">
                CANDIDATE NAME
              </div>
              <div className="text-[6.5px] text-black font-semibold mb-0.5">
                PROFESSIONAL SUMMARY
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-xs font-bold text-white uppercase font-mono">ATS Minimal</h4>
                <p className="text-[10px] text-slate-400">Single column clean format</p>
              </div>
              <span className="text-[10px] font-mono text-slate-300">Select →</span>
            </div>
          </TiltCard>

          {/* Compact Grid */}
          <TiltCard
            onClick={() => onSelectTemplate('compact-grid')}
            className="cursor-pointer bg-[#0A101E] border border-[#1E2D4A] hover:border-[#E23636] rounded-xl p-4 shadow-lg group transition-all"
          >
            <div className="h-24 rounded bg-white p-2 text-[7px] text-slate-800 overflow-hidden mb-2 border border-slate-300 select-none">
              <div className="bg-[#0B101E] text-white p-0.5 rounded-sm text-[7px] font-bold font-mono mb-1">
                HEADER
              </div>
              <div className="grid grid-cols-3 gap-1 text-[6px]">
                <div className="border-r border-slate-200 pr-1">Skills</div>
                <div className="col-span-2">Experience</div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-xs font-bold text-white uppercase font-mono">Compact Grid</h4>
                <p className="text-[10px] text-slate-400">Dense single-page grid</p>
              </div>
              <span className="text-[10px] font-mono text-[#E23636]">Select →</span>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 border-t border-[#131B2D] py-5 text-center text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">SPODER RESUME</span>
            <span>•</span>
            <span>Professional Career Studio</span>
          </div>
          <p className="text-[11px] text-slate-400">
            ATS Verification &amp; Resume Enhancement
          </p>
        </div>
      </footer>
    </div>
  );
};
