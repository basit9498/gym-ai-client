'use client';

import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Apply cursor:none only while this component is mounted (landing page)
    document.body.classList.add('custom-cursor-active');

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let raf: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`;
        dotRef.current.style.top = `${mouseY}px`;
      }

      if (spotlightRef.current) {
        spotlightRef.current.style.left = `${mouseX}px`;
        spotlightRef.current.style.top = `${mouseY}px`;
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top = `${ringY}px`;
      }
      raf = requestAnimationFrame(animate);
    };

    const onMouseEnterLink = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '60px';
        ringRef.current.style.height = '60px';
        ringRef.current.style.borderColor = 'rgba(155, 89, 255, 0.7)';
      }
      if (dotRef.current) {
        dotRef.current.style.transform = 'scale(2) translate(-25%, -25%)';
        dotRef.current.style.background = '#9b59ff';
      }
    };

    const onMouseLeaveLink = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '40px';
        ringRef.current.style.height = '40px';
        ringRef.current.style.borderColor = 'rgba(0, 212, 255, 0.5)';
      }
      if (dotRef.current) {
        dotRef.current.style.transform = 'scale(1) translate(-50%, -50%)';
        dotRef.current.style.background = '#00d4ff';
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    const links = document.querySelectorAll('a, button');
    links.forEach(l => {
      l.addEventListener('mouseenter', onMouseEnterLink);
      l.addEventListener('mouseleave', onMouseLeaveLink);
    });

    raf = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouseMove);
      links.forEach(l => {
        l.removeEventListener('mouseenter', onMouseEnterLink);
        l.removeEventListener('mouseleave', onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div
        ref={spotlightRef}
        className="spotlight"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
}
