"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/use-mounted";

interface Particle {
  ringIdx: number;
  dotIdx: number;
  baseRadius: number;
  baseAngle: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

export default function HeroDotField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();

  const stateRef = useRef({
    mouseX: 0,
    mouseY: 0,
    centerX: 0,
    centerY: 0,
    isHovering: false,
    alpha: 0,
    targetAlpha: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Initial center point
    const initX = width * 0.5;
    const initY = height * 0.45;
    stateRef.current.mouseX = initX;
    stateRef.current.mouseY = initY;
    stateRef.current.centerX = initX;
    stateRef.current.centerY = initY;
    stateRef.current.alpha = 0;
    stateRef.current.targetAlpha = 0; // Starts completely empty as Vian requested!

    const handleResize = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Build concentric spiral particles
    const particles: Particle[] = [];
    const numRings = 22;
    const minRadius = 42; // inner open circle around cursor
    const maxRadius = 360;
    const radiusStep = (maxRadius - minRadius) / numRings;

    for (let rIdx = 0; rIdx < numRings; rIdx++) {
      const radius = minRadius + rIdx * radiusStep;
      const ringProgress = rIdx / numRings; // 0 to 1
      const count = Math.floor(14 + rIdx * 3.6);
      const dotSize = 1.3 + Math.sin(ringProgress * Math.PI) * 2.0;

      for (let d = 0; d < count; d++) {
        const baseAngle = (d / count) * Math.PI * 2;
        particles.push({
          ringIdx: rIdx,
          dotIdx: d,
          baseRadius: radius,
          baseAngle,
          x: initX,
          y: initY,
          vx: 0,
          vy: 0,
          size: dotSize,
        });
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      stateRef.current.mouseX = mx;
      stateRef.current.mouseY = my;
      stateRef.current.isHovering = true;
      stateRef.current.targetAlpha = 1; // Fade in when cursor enters
    };

    const handleMouseLeave = () => {
      stateRef.current.isHovering = false;
      stateRef.current.targetAlpha = 0; // Fade out completely when cursor leaves
    };

    let touchTimer: ReturnType<typeof setTimeout> | null = null;

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const tx = e.touches[0].clientX - rect.left;
        const ty = e.touches[0].clientY - rect.top;

        stateRef.current.mouseX = tx;
        stateRef.current.mouseY = ty;
        stateRef.current.isHovering = true;
        stateRef.current.targetAlpha = 1; // Fade in on touch

        if (touchTimer) clearTimeout(touchTimer);
        touchTimer = setTimeout(() => {
          stateRef.current.isHovering = false;
          stateRef.current.targetAlpha = 0; // Fade out after 2s of inactivity
        }, 2200);
      }
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove, { passive: true });
      parent.addEventListener("mouseleave", handleMouseLeave, { passive: true });
      parent.addEventListener("touchstart", handleTouchMove, { passive: true });
      parent.addEventListener("touchmove", handleTouchMove, { passive: true });
    }

    let time = 0;
    const isDark = resolvedTheme === "dark";

    const render = () => {
      time += 0.012;

      // Alpha transition: smooth fade in on hover, smooth fade out to 0 on exit
      stateRef.current.alpha +=
        (stateRef.current.targetAlpha - stateRef.current.alpha) * 0.085;

      const currentAlpha = stateRef.current.alpha;

      ctx.clearRect(0, 0, width, height);

      // Only calculate and render when visible
      if (currentAlpha > 0.005) {
        // Smooth lerp tracking for central hub of vortex
        stateRef.current.centerX +=
          (stateRef.current.mouseX - stateRef.current.centerX) * 0.09;
        stateRef.current.centerY +=
          (stateRef.current.mouseY - stateRef.current.centerY) * 0.09;

        const cx = stateRef.current.centerX;
        const cy = stateRef.current.centerY;
        const mx = stateRef.current.mouseX;
        const my = stateRef.current.mouseY;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const ringProgress = p.ringIdx / numRings;

          // Spiral torsion angle offset that breathes over time
          const spiralAngle =
            p.baseAngle + time * 0.35 + ringProgress * 1.5;

          // Radial wave oscillation
          const wave = Math.sin(time * 2.2 + p.dotIdx * 0.7 + p.ringIdx * 0.35) * 3;
          const currentR = p.baseRadius + wave;

          // Rest anchor position relative to center
          const targetX = cx + Math.cos(spiralAngle) * currentR;
          const targetY = cy + Math.sin(spiralAngle) * (currentR * 0.88);

          // Spring physics back to target anchor
          const dx = targetX - p.x;
          const dy = targetY - p.y;
          p.vx = (p.vx + dx * 0.16) * 0.76;
          p.vy = (p.vy + dy * 0.16) * 0.76;

          // Immediate mouse cursor repulsion / magnetic distortion wave
          const distToMouse = Math.hypot(p.x - mx, p.y - my);
          const repelRadius = 85;
          if (distToMouse < repelRadius && distToMouse > 0.1) {
            const repelForce = (1 - distToMouse / repelRadius) * 12;
            const rx = (p.x - mx) / distToMouse;
            const ry = (p.y - my) / distToMouse;
            p.vx += rx * repelForce;
            p.vy += ry * repelForce;
          }

          p.x += p.vx;
          p.y += p.vy;

          if (p.x < -20 || p.x > width + 20 || p.y < -20 || p.y > height + 20) continue;

          // Opacity falloff curve (bell curve radiating from center) multiplied by currentAlpha
          const bell = Math.sin(ringProgress * Math.PI);
          const dotAlpha = (isDark ? 0.2 + bell * 0.75 : 0.18 + bell * 0.7) * currentAlpha;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

          if (isDark) {
            ctx.fillStyle = `rgba(74, 222, 128, ${dotAlpha.toFixed(3)})`;
            ctx.shadowColor = "rgba(74, 222, 128, 0.4)";
            ctx.shadowBlur = 4;
          } else {
            ctx.fillStyle = `rgba(22, 163, 74, ${dotAlpha.toFixed(3)})`;
            ctx.shadowColor = "transparent";
            ctx.shadowBlur = 0;
          }
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (touchTimer) clearTimeout(touchTimer);
      if (parent) {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
        parent.removeEventListener("touchstart", handleTouchMove);
        parent.removeEventListener("touchmove", handleTouchMove);
      }
    };
  }, [resolvedTheme, mounted]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
