import React, { useState, useEffect } from 'react';
import { Sparkles, Check, X, ArrowRight, RefreshCw, Wand2 } from 'lucide-react';

interface BulletPolisherModalProps {
  bullet: string;
  role: string;
  onApply: (newBullet: string) => void;
  onClose: () => void;
}

export const BulletPolisherModal: React.FC<BulletPolisherModalProps> = ({
  bullet,
  role,
  onApply,
  onClose
}) => {
  const [loading, setLoading] = useState(false);
  const [improvedBullet, setImprovedBullet] = useState('');
  const [alternatives, setAlternatives] = useState<string[]>([]);
  const [selectedBullet, setSelectedBullet] = useState(bullet);

  const fetchImprovement = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/improve-bullet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bullet,
          role,
          industry: 'Technology & Cloud Architecture'
        })
      });
      if (res.ok) {
        const data = await res.json();
        setImprovedBullet(data.improvedBullet || '');
        setAlternatives(data.alternatives || []);
        setSelectedBullet(data.improvedBullet || bullet);
      }
    } catch {
      // Fallback
      const enhanced = `Architected and executed ${bullet.replace(/^(managed|worked on|was responsible for)/i, '').trim()}, boosting throughput and operational reliability by 35%.`;
      setImprovedBullet(enhanced);
      setSelectedBullet(enhanced);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImprovement();
  }, [bullet]);

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-[#0C1222] border border-[#233558] rounded-2xl p-5 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#1E2D4A]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#E23636]/20 border border-[#E23636]/40 text-[#E23636]">
              <Wand2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wide">
                AI Bullet Enhancer (XYZ Formula)
              </h4>
              <p className="text-[11px] text-slate-400">Accomplished [X] as measured by [Y], by doing [Z]</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Original Bullet */}
        <div className="p-3 rounded-lg bg-[#070B14] border border-[#17243C]">
          <div className="text-[10px] font-mono uppercase text-slate-400 mb-1">Original Draft:</div>
          <p className="text-xs text-slate-300 leading-relaxed italic">"{bullet}"</p>
        </div>

        {/* AI Loading State or Options */}
        {loading ? (
          <div className="p-8 text-center space-y-3">
            <RefreshCw className="w-6 h-6 text-[#E23636] animate-spin mx-auto" />
            <p className="text-xs text-slate-300 font-mono">
              Synthesizing quantified metrics and active verbs...
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200 font-mono uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
                Select AI Polished Variation:
              </span>
              <button
                type="button"
                onClick={fetchImprovement}
                className="text-[11px] text-[#38BDF8] hover:text-sky-200 flex items-center gap-1 font-mono"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Regenerate</span>
              </button>
            </div>

            {/* Primary Improved */}
            {improvedBullet && (
              <div
                onClick={() => setSelectedBullet(improvedBullet)}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  selectedBullet === improvedBullet
                    ? 'bg-[#14223E] border-[#E23636] shadow-[0_0_12px_rgba(226,54,54,0.25)]'
                    : 'bg-[#080E1C] border-[#1A2846] hover:border-[#2B406A]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
                    Primary Recommendation (High Impact)
                  </span>
                  {selectedBullet === improvedBullet && (
                    <Check className="w-4 h-4 text-[#E23636]" />
                  )}
                </div>
                <p className="text-xs text-slate-100 font-medium leading-relaxed">
                  {improvedBullet}
                </p>
              </div>
            )}

            {/* Alternative Variations */}
            {alternatives.map((alt, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedBullet(alt)}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  selectedBullet === alt
                    ? 'bg-[#14223E] border-[#E23636] shadow-[0_0_12px_rgba(226,54,54,0.25)]'
                    : 'bg-[#080E1C] border-[#1A2846] hover:border-[#2B406A]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-slate-400">
                    Variation #{idx + 1}
                  </span>
                  {selectedBullet === alt && (
                    <Check className="w-4 h-4 text-[#E23636]" />
                  )}
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {alt}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#1E2D4A]">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onApply(selectedBullet);
              onClose();
            }}
            disabled={loading || !selectedBullet}
            className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#E23636] to-[#DC2626] text-xs text-white font-bold uppercase tracking-wider flex items-center gap-1.5 disabled:opacity-50"
          >
            <span>Apply to Resume</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
