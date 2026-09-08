import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const ringRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isOverTextInput, setIsOverTextInput] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(true);

  // Position references for smooth interpolation
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Immediately ensure any legacy custom-cursor-active class is removed
    document.documentElement.classList.remove('custom-cursor-active');
    document.body.classList.remove('custom-cursor-active');

    // Check if device has a precise pointing device (mouse/trackpad)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsFinePointer(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsFinePointer(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange);
    }

    if (!mediaQuery.matches) return;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      setIsVisible(true);

      // Check target element
      const target = e.target as HTMLElement | null;
      if (target) {
        // Detect if hovering an input, textarea, or contenteditable where user needs clean text caret
        const isTextInput = Boolean(
          target.closest('input, textarea, select, [contenteditable="true"]')
        );
        setIsOverTextInput(isTextInput);

        // Check if hovering clickable/interactive target
        const isInteractive = Boolean(
          target.closest('button, a, [role="button"], .cursor-pointer, [data-interactive="true"]')
        );
        setIsHovered(isInteractive && !isTextInput);
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Animation frame for smooth trailing ring
    let animId: number;
    const animate = () => {
      // Smooth linear interpolation trailing the visible OS cursor
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.28;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.28;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      document.documentElement.classList.remove('custom-cursor-active');
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMediaChange);
      }
    };
  }, []);

  if (!isFinePointer) return null;

  // Fade out over text inputs so the user can type and select text without distraction
  const showRing = isVisible && !isOverTextInput;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden no-print">
      {/* Outer Smooth Follower Ring - trails native cursor with high contrast */}
      <div
        ref={ringRef}
        style={{
          opacity: showRing ? 1 : 0,
          transition: 'width 0.18s cubic-bezier(0.16, 1, 0.3, 1), height 0.18s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.18s, background-color 0.18s, opacity 0.15s, transform 0.04s ease-out',
          willChange: 'transform, width, height, opacity'
        }}
        className={`fixed top-0 left-0 rounded-full pointer-events-none flex items-center justify-center ${
          isHovered
            ? 'w-10 h-10 border-2 border-[#E23636] bg-[#E23636]/15 shadow-[0_0_14px_rgba(226,54,54,0.6)] backdrop-blur-[0.5px]'
            : isClicked
            ? 'w-6 h-6 border-2 border-[#38BDF8] bg-[#38BDF8]/25 shadow-[0_0_12px_rgba(56,189,248,0.7)]'
            : 'w-7 h-7 border border-[#E23636]/50 bg-[#E23636]/5 shadow-[0_0_6px_rgba(226,54,54,0.2)]'
        }`}
      >
        {/* Subtle pulsating center reticle when hovering actionable buttons */}
        {isHovered && (
          <div className="w-1.5 h-1.5 rounded-full bg-[#E23636] animate-ping" />
        )}
      </div>
    </div>
  );
};
