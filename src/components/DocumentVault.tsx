import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Trash2, 
  Sparkles, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  FileCheck, 
  FileUp, 
  Plus 
} from 'lucide-react';
import { UploadedDoc } from '../types';

interface DocumentVaultProps {
  documents: UploadedDoc[];
  onAddDocument: (doc: UploadedDoc) => void;
  onRemoveDocument: (id: string) => void;
  onUpdateDocument: (doc: UploadedDoc) => void;
  onLoadSampleDocs: () => void;
  onPrevStep: () => void;
  onGenerateCV: () => void;
  isAiBusy: boolean;
}

export const DocumentVault: React.FC<DocumentVaultProps> = ({
  documents,
  onAddDocument,
  onRemoveDocument,
  onLoadSampleDocs,
  onPrevStep,
  onGenerateCV,
  isAiBusy
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [showPasteModal, setShowPasteModal] = useState(false);
  const [pastedName, setPastedName] = useState('');
  const [pastedContent, setPastedContent] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const textContent = (e.target?.result as string) || '';
        const newDoc: UploadedDoc = {
          id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          name: file.name,
          type: file.name.endsWith('.pdf') ? 'application/pdf' : 'text/plain',
          category: file.name.endsWith('.pdf') ? 'resume' : 'other',
          size: file.size,
          contentPreview: textContent.slice(0, 500),
          status: 'parsed',
          extractedInsights: ['Auto-extracted from attached file']
        };
        onAddDocument(newDoc);
      };
      reader.readAsText(file);
    });
  };

  const handlePastedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pastedContent.trim()) return;

    const newDoc: UploadedDoc = {
      id: `doc-${Date.now()}`,
      name: pastedName.trim() || 'Pasted Notes / Document',
      type: 'text/plain',
      category: 'other',
      size: pastedContent.length,
      contentPreview: pastedContent.slice(0, 500),
      status: 'parsed',
      extractedInsights: ['Parsed from user notes']
    };
    onAddDocument(newDoc);
    setPastedName('');
    setPastedContent('');
    setShowPasteModal(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Guide Header */}
      <div className="text-center space-y-1 mb-6">
        <h2 className="text-2xl font-black tracking-tight text-white uppercase font-mono">
          Supporting Documents &amp; Credentials
        </h2>
        <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed">
          Upload existing resumes, certificates, or transcripts to incorporate verified achievements.
        </p>
      </div>

      {/* Main Drag & Drop Box */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
          isDragging 
            ? 'border-[#E23636] bg-[#E23636]/10 scale-[1.01]' 
            : 'border-[#22355A] bg-[#0B101E] hover:border-[#38BDF8]/60 hover:bg-[#0E1528]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#E23636] to-[#1E3A8A] flex items-center justify-center text-white mx-auto shadow-lg mb-3">
          <UploadCloud className="w-7 h-7" />
        </div>

        <h3 className="text-base font-bold text-white mb-1">
          Click or Drag & Drop Documents Here
        </h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
          Supported: PDF, Word, TXT, Markdown, or image exports of previous resumes, course transcripts, project briefs, and certificates.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowPasteModal(true);
            }}
            className="px-4 py-2 rounded-xl bg-[#141F36] hover:bg-[#1E2D4E] border border-[#233860] text-xs text-sky-200 font-medium transition-colors"
          >
            + Or Paste Text / Notes Directly
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onLoadSampleDocs();
            }}
            className="px-4 py-2 rounded-xl bg-[#141F36] hover:bg-[#1E2D4E] border border-[#233860] text-xs text-slate-200 font-medium transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E23636]" />
            <span>Try Sample Documents</span>
          </button>
        </div>
      </div>

      {/* Paste Modal */}
      {showPasteModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#0C1222] border border-[#22355A] rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase font-mono">
              Paste Document Text or Old CV
            </h3>
            <input
              type="text"
              value={pastedName}
              onChange={(e) => setPastedName(e.target.value)}
              placeholder="Document Title (e.g. 2023 Resume or Architecture Spec)"
              className="w-full px-3.5 py-2 rounded-xl bg-[#060A14] border border-[#1E2D4A] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#E23636]"
            />
            <textarea
              rows={6}
              value={pastedContent}
              onChange={(e) => setPastedContent(e.target.value)}
              placeholder="Paste the text from your previous resume, recommendation letter, or transcript here..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#060A14] border border-[#1E2D4A] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#E23636] leading-relaxed font-mono"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowPasteModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-slate-300 hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handlePastedSubmit}
                className="px-4 py-2 rounded-xl bg-[#E23636] text-xs text-white font-bold"
              >
                Attach Document
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Attached Files List */}
      <div className="bg-[#0B101E] border border-[#1A2640] rounded-2xl p-6 shadow-xl space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-[#162035]">
          <div className="flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wide font-mono">
              Attached Documents ({documents.length})
            </h3>
          </div>
          {documents.length > 0 && (
            <span className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verified & Ready for AI Synthesis</span>
            </span>
          )}
        </div>

        {documents.length === 0 ? (
          <div className="py-6 text-center text-xs text-slate-400">
            No files attached yet. You can attach files above, or skip straight to generating your CV!
          </div>
        ) : (
          <div className="space-y-2.5">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="p-3.5 rounded-xl bg-[#060A14] border border-[#1B2944] flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#1E3A8A]/20 border border-[#2563EB]/40 flex items-center justify-center text-[#38BDF8] shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">{doc.name}</p>
                    <p className="text-[11px] text-slate-400 font-mono">{(doc.size / 1024).toFixed(1)} KB • Verified</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onRemoveDocument(doc.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950/30 transition-colors"
                  title="Remove document"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        <button
          type="button"
          onClick={onPrevStep}
          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#121B30] hover:bg-[#1A2846] border border-[#233860] text-xs text-slate-200 font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back: Intake Questions</span>
        </button>

        <button
          type="button"
          onClick={onGenerateCV}
          disabled={isAiBusy}
          id="btn-generate-from-vault"
          className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#E23636] to-[#DC2626] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_16px_rgba(226,54,54,0.4)] flex items-center justify-center gap-2"
        >
          <Sparkles className={`w-4 h-4 ${isAiBusy ? 'animate-spin' : ''}`} />
          <span>{isAiBusy ? 'Compiling Resume...' : 'Generate Resume →'}</span>
        </button>
      </div>
    </div>
  );
};
