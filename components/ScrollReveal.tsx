import React, { useRef, useEffect, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  // 'trigger': Animations start when element enters viewport
  // 'scroll': Animations linked to scroll position (scrubbing)
  mode?: 'trigger' | 'scroll'; 
  direction?: 'left' | 'right' | 'up' | 'down' | 'zoom' | 'random';
  x?: number; // Custom start X offset (px)
  y?: number; // Custom start Y offset (px)
  blur?: number; // Start blur amount (px)
  rotate?: number; // Start rotation (deg)
  scale?: number; // Start scale (0-1)
  delay?: number;
  className?: string;
  threshold?: number;
  speed?: number; // For scroll mode: how fast it completes (0.5 = finishes at center, 1 = finishes at top)
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  mode = 'trigger',
  direction = 'up', 
  x, y, blur = 0, rotate = 0, scale = 1,
  delay = 0,
  className = "",
  threshold = 0.15,
  speed = 0.5
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Default offsets based on direction if x/y not provided
  let startX = x !== undefined ? x : 0;
  let startY = y !== undefined ? y : 0;

  if (x === undefined && y === undefined) {
    switch (direction) {
      case 'left': startX = -100; break;
      case 'right': startX = 100; break;
      case 'up': startY = 100; break;
      case 'down': startY = -100; break;
      case 'random': 
         startX = (Math.random() - 0.5) * 200;
         startY = (Math.random() - 0.5) * 200;
         break;
      default: break;
    }
  }

  // Trigger Mode Effect
  useEffect(() => {
    if (mode === 'scroll') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: "0px 0px -10% 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [mode, threshold]);

  // Scroll Scrubbing Mode Effect
  useEffect(() => {
    if (mode !== 'scroll') return;

    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress based on element position in viewport
      // 0: Top of element enters bottom of screen
      // 1: Top of element reaches target position (defined by speed)
      
      const start = windowHeight;
      const end = windowHeight * (1 - speed); // e.g., finishes when 50% up the screen
      
      let p = (start - rect.top) / (start - end);
      p = Math.max(0, Math.min(1, p));
      
      // Use requestAnimationFrame for smoother updates
      requestAnimationFrame(() => setScrollProgress(p));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mode, speed]);

  // Styles generation
  const getStyle = () => {
    if (mode === 'trigger') {
      const isHidden = !isVisible;
      return {
        transform: isHidden 
          ? `translate3d(${startX}px, ${startY}px, 0) scale(${scale}) rotate(${rotate}deg)` 
          : `translate3d(0, 0, 0) scale(1) rotate(0deg)`,
        opacity: isHidden ? 0 : 1,
        filter: isHidden ? `blur(${blur || 10}px)` : 'blur(0px)',
        transition: `all 1000ms cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}ms`
      };
    } else {
      // Scroll mode: Interpolate values based on scrollProgress
      // progress goes 0 -> 1. We want to go from startValues -> 0/1.
      const invP = 1 - scrollProgress; // 1 -> 0
      
      // Easing for smoother feel
      const easedP = scrollProgress === 1 ? 1 : 1 - Math.pow(2, -10 * scrollProgress); // Exponential ease out
      const easedInvP = 1 - easedP;

      const currentX = startX * easedInvP;
      const currentY = startY * easedInvP;
      const currentScale = scale + (1 - scale) * easedP;
      const currentRotate = rotate * easedInvP;
      const currentBlur = (blur || 0) * easedInvP;

      return {
        transform: `translate3d(${currentX}px, ${currentY}px, 0) scale(${currentScale}) rotate(${currentRotate}deg)`,
        opacity: Math.min(1, scrollProgress * 1.5), // Fade in quickly
        filter: `blur(${currentBlur}px)`,
        transition: 'transform 0.1s linear, filter 0.1s linear, opacity 0.1s linear', // Short transition for smoothing scroll jumps
        willChange: 'transform, opacity, filter'
      };
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={getStyle()}
    >
      {children}
    </div>
  );
};