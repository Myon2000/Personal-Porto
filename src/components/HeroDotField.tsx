"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/use-mounted";

export default function HeroDotField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();

  const mouseRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    isHovering: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Initial center around upper-middle where headline sits
    const initX = width * 0.5;
    const initY = height * 0.45;
    mouseRef.current.x = initX;
    mouseRef.current.y = initY;
    mouseRef.current.targetX = initX;
    mouseRef.current.targetY = initY;

    const handleResize = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!mouseRef.current.isHovering) {
        mouseRef.current.targetX = width * 0.5;
        mouseRef.current.targetY = height * 0.45;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
      mouseRef.current.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.isHovering = false;
      mouseRef.current.targetX = width * 0.5;
      mouseRef.current.targetY = height * 0.45;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current.targetX = e.touches[0].clientX - rect.left;
        mouseRef.current.targetY = e.touches[0].clientY - rect.top;
        mouseRef.current.isHovering = true;
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current.isHovering = false;
      mouseRef.current.targetX = width * 0.5;
      mouseRef.current.targetY = height * 0.45;
    };

    // Listen on parent section for wide interactive zone
    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove, { passive: true });
      parent.addEventListener("mouseleave", handleMouseLeave, { passive: true });
      parent.addEventListener("touchstart", handleTouchMove, { passive: true });
      parent.addEventListener("touchmove", handleTouchMove, { passive: true });
      parent.addEventListener("touchend", handleTouchEnd, { passive: true });
    }

    let time = 0;
    const isDark = resolvedTheme === "dark";

    const render = () => {
      time += 0.015;

      // Responsive lerp mouse tracking (0.075 provides fluid, immediate feedback)
      mouseRef.current.x +=
        (mouseRef.current.targetX - mouseRef.current.x) * 0.075;
      mouseRef.current.y +=
        (mouseRef.current.targetY - mouseRef.current.y) * 0.075;

      let cx = mouseRef.current.x;
      let cy = mouseRef.current.y;

      // Active breathing and drift on mobile / when idle
      if (!mouseRef.current.isHovering) {
        cx += Math.sin(time * 0.9) * 60 + Math.cos(time * 0.4) * 25;
        cy += Math.cos(time * 0.75) * 45 + Math.sin(time * 0.5) * 20;
      }

      ctx.clearRect(0, 0, width, height);

      // Concentric vortex parameters
      const numRings = 24;
      const minRadius = 30;
      const maxRadius = Math.min(Math.max(width * 0.5, 360), 520);
      const radiusStep = (maxRadius - minRadius) / numRings;

      for (let rIdx = 0; rIdx < numRings; rIdx++) {
        const radius = minRadius + rIdx * radiusStep;
        const ringProgress = rIdx / numRings; // 0 to 1
        const dotCount = Math.floor(16 + rIdx * 4.2);

        // Bell curve opacity - clearly visible in center, smoothly dissipates outward
        const bell = Math.sin(ringProgress * Math.PI);
        const opacity = isDark
          ? 0.15 + bell * 0.75
          : 0.12 + bell * 0.65;

        // Distinct dot radius
        const dotSize = 1.4 + bell * 2.2;

        // Spiral torsion angle offset that reacts to time
        const rotationOffset = time * 0.4 + ringProgress * 1.8;

        for (let d = 0; d < dotCount; d++) {
          const angle = (d / dotCount) * Math.PI * 2 + rotationOffset;

          // Radial pulsation wave
          const wave = Math.sin(time * 2.5 + d * 0.7 + rIdx * 0.4) * 3.5;
          const currentR = radius + wave;

          const px = cx + Math.cos(angle) * currentR;
          const py = cy + Math.sin(angle) * (currentR * 0.9); // slight perspective flattening

          if (px < -15 || px > width + 15 || py < -15 || py > height + 15) continue;

          ctx.beginPath();
          ctx.arc(px, py, dotSize, 0, Math.PI * 2);

          if (isDark) {
            ctx.fillStyle = `rgba(74, 222, 128, ${opacity.toFixed(3)})`;
            ctx.shadowColor = "rgba(74, 222, 128, 0.4)";
            ctx.shadowBlur = 3;
          } else {
            ctx.fillStyle = `rgba(22, 163, 74, ${opacity.toFixed(3)})`;
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
      if (parent) {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
        parent.removeEventListener("touchstart", handleTouchMove);
        parent.removeEventListener("touchmove", handleTouchMove);
        parent.removeEventListener("touchend", handleTouchEnd);
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
