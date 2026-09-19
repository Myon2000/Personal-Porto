"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/use-mounted";

interface Particle {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function HeroDotField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();

  const stateRef = useRef({
    mouseX: -9999,
    mouseY: -9999,
    isHovering: false,
    alpha: 0,
    targetAlpha: 0,
  });

  useEffect(() => {
    // Non-aktifkan di perangkat mobile / touch-only untuk efisiensi baterai & performa
    const isMobile =
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768);

    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Kalibrasi Retina Display (DPI Scaling)
    const setupDpi = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setupDpi();

    // 1. Inisialisasi Matriks Koordinat Grid Statis (Jarak seragam 24px)
    const GRID_GAP = 24;
    let particles: Particle[] = [];

    const initGrid = () => {
      particles = [];
      const cols = Math.ceil(width / GRID_GAP) + 1;
      const rows = Math.ceil(height / GRID_GAP) + 1;

      // Offset agar grid terpusat rapi
      const offsetX = (width - (cols - 1) * GRID_GAP) / 2;
      const offsetY = (height - (rows - 1) * GRID_GAP) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const bx = offsetX + c * GRID_GAP;
          const by = offsetY + r * GRID_GAP;
          particles.push({
            baseX: bx,
            baseY: by,
            x: bx,
            y: by,
            vx: 0,
            vy: 0,
          });
        }
      }
    };

    initGrid();

    const handleResize = () => {
      setupDpi();
      initGrid();
    };

    window.addEventListener("resize", handleResize);

    // 2. Event Listener Deteksi Kursor Masuk & Bergerak di Hero Section
    const parent = canvas.parentElement;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      stateRef.current.mouseX = e.clientX - rect.left;
      stateRef.current.mouseY = e.clientY - rect.top;
      stateRef.current.isHovering = true;
      stateRef.current.targetAlpha = 1; // Mulai muncul halus saat kursor masuk
    };

    const handleMouseLeave = () => {
      stateRef.current.isHovering = false;
      stateRef.current.targetAlpha = 0; // Menghilang kembali saat kursor keluar
    };

    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove, { passive: true });
      parent.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    }

    const isDark = resolvedTheme === "dark";

    // Parameter Fisika Interaksi Kursor (Sesuai Spesifikasi Vian)
    const REPEL_RADIUS = 110; // Radius pengaruh tolakan kursor
    const REPEL_MAX_FORCE = 32; // Kekuatan dorongan maksimum partikel menjauh
    const VISIBILITY_RADIUS = 270; // Radius pencahayaan grid titik di sekitar kursor
    const SPRING_STIFFNESS = 0.14; // Konstanta pegas hukum Hooke
    const DAMPING = 0.72; // Koefisien gesekan / redaman peredam getaran

    // 3. Render Loop Animasi (requestAnimationFrame)
    const render = () => {
      // Interpolasi opasitas global (bloom in & fade out)
      stateRef.current.alpha +=
        (stateRef.current.targetAlpha - stateRef.current.alpha) * 0.08;

      const currentAlpha = stateRef.current.alpha;

      ctx.clearRect(0, 0, width, height);

      // Hanya kalkulasi dan render ketika titik sedang terlihat
      if (currentAlpha > 0.003) {
        const mx = stateRef.current.mouseX;
        const my = stateRef.current.mouseY;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // Jarak Euclidean ke kursor
          const dxMouse = p.baseX - mx;
          const dyMouse = p.baseY - my;
          const distMouse = Math.hypot(dxMouse, dyMouse);

          // Partikel di luar radius cahaya diabaikan untuk performa tinggi
          if (distMouse > VISIBILITY_RADIUS) {
            // Partikel tetap kembali ke basis jika sebelumnya terdorong
            if (Math.abs(p.x - p.baseX) > 0.1 || Math.abs(p.y - p.baseY) > 0.1) {
              const ax = (p.baseX - p.x) * SPRING_STIFFNESS;
              const ay = (p.baseY - p.y) * SPRING_STIFFNESS;
              p.vx = (p.vx + ax) * DAMPING;
              p.vy = (p.vy + ay) * DAMPING;
              p.x += p.vx;
              p.y += p.vy;
            }
            continue;
          }

          // A. Kalkulasi Gaya Tolakan Radial (Repulsion Force)
          let targetX = p.baseX;
          let targetY = p.baseY;

          if (distMouse < REPEL_RADIUS && distMouse > 0.1) {
            // Gaya dorong berbanding terbalik dengan jarak
            const repelFactor = (1 - distMouse / REPEL_RADIUS);
            const repelDist = repelFactor * repelFactor * REPEL_MAX_FORCE;
            const angle = Math.atan2(dyMouse, dxMouse);
            targetX = p.baseX + Math.cos(angle) * repelDist;
            targetY = p.baseY + Math.sin(angle) * repelDist;
          }

          // B. Gaya Pegas Hukum Hooke & Redaman (Restoring Spring & Damping)
          const ax = (targetX - p.x) * SPRING_STIFFNESS;
          const ay = (targetY - p.y) * SPRING_STIFFNESS;
          p.vx = (p.vx + ax) * DAMPING;
          p.vy = (p.vy + ay) * DAMPING;
          p.x += p.vx;
          p.y += p.vy;

          // C. Intensitas Cahaya & Ukuran Titik berdasarkan Jarak ke Kursor
          const radialFactor = 1 - distMouse / VISIBILITY_RADIUS;
          const dotAlpha = radialFactor * radialFactor * currentAlpha;

          // Hindari render titik yang tidak terlihat
          if (dotAlpha < 0.01) continue;

          // Ukuran titik sedikit membesar di area fokus
          const dotRadius = 1.1 + radialFactor * 1.5;

          ctx.beginPath();
          ctx.arc(p.x, p.y, dotRadius, 0, Math.PI * 2);

          if (isDark) {
            ctx.fillStyle = `rgba(74, 222, 128, ${(dotAlpha * 0.95).toFixed(3)})`;
          } else {
            ctx.fillStyle = `rgba(22, 163, 74, ${(dotAlpha * 0.85).toFixed(3)})`;
          }
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // 4. Manajemen Memori & Clean-up Lengkap
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
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
