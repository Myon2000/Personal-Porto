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

    // Initial center
    mouseRef.current.x = width * 0.52;
    mouseRef.current.y = height * 0.48;
    mouseRef.current.targetX = width * 0.52;
    mouseRef.current.targetY = height * 0.48;

    const handleResize = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      if (!mouseRef.current.isHovering) {
        mouseRef.current.targetX = width * 0.52;
        mouseRef.current.targetY = height * 0.48;
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
      mouseRef.current.targetX = width * 0.52;
      mouseRef.current.targetY = height * 0.48;
    };

    // Attach listener to parent section for wide capture
    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove);
      parent.addEventListener("mouseleave", handleMouseLeave);
    }

    let time = 0;
    const isDark = resolvedTheme === "dark";

    const render = () => {
      time += 0.012;

      // Smooth lerp mouse tracking
      mouseRef.current.x +=
        (mouseRef.current.targetX - mouseRef.current.x) * 0.045;
      mouseRef.current.y +=
        (mouseRef.current.targetY - mouseRef.current.y) * 0.045;

      // Idle subtle breathing drift when not hovered
      let cx = mouseRef.current.x;
      let cy = mouseRef.current.y;
      if (!mouseRef.current.isHovering) {
        cx += Math.sin(time * 0.8) * 25;
        cy += Math.cos(time * 0.6) * 18;
      }

      ctx.clearRect(0, 0, width, height);

      // Concentric vortex ring parameters
      const numRings = 22;
      const minRadius = 35;
      const maxRadius = Math.min(width * 0.48, 360);
      const radiusStep = (maxRadius - minRadius) / numRings;

      for (let rIdx = 0; rIdx < numRings; rIdx++) {
        const radius = minRadius + rIdx * radiusStep;
        // Dot count increases with radius
        const dotCount = Math.floor(14 + rIdx * 3.8);
        const ringProgress = rIdx / numRings; // 0 to 1

        // Smooth opacity falloff curve (bright in middle rings, fades at edges)
        const baseOpacity = Math.sin(ringProgress * Math.PI) * (isDark ? 0.75 : 0.65);
        const dotSize = 1.0 + Math.sin(ringProgress * Math.PI) * 1.5;

        // Spiral torsion angle offset
        const rotationOffset = time * 0.35 + ringProgress * 1.4;

        for (let d = 0; d < dotCount; d++) {
          const angle = (d / dotCount) * Math.PI * 2 + rotationOffset;

          // Gentle radial wave distortion
          const wave = Math.sin(time * 2 + d * 0.6 + rIdx * 0.3) * 2.5;
          const currentR = radius + wave;

          const px = cx + Math.cos(angle) * currentR;
          const py = cy + Math.sin(angle) * (currentR * 0.88); // slight perspective flattening

          // Skip if outside canvas
          if (px < -10 || px > width + 10 || py < -10 || py > height + 10) continue;

          ctx.beginPath();
          ctx.arc(px, py, dotSize, 0, Math.PI * 2);

          if (isDark) {
            ctx.fillStyle = `rgba(74, 222, 128, ${baseOpacity.toFixed(3)})`;
          } else {
            ctx.fillStyle = `rgba(22, 163, 74, ${(baseOpacity * 0.8).toFixed(3)})`;
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
      }
    };
  }, [resolvedTheme, mounted]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none -z-10"
      aria-hidden="true"
    />
  );
}
