import React, { useEffect, useRef } from 'react';

// ─── Asymmetric pulse envelope ────────────────────────────────────────────────
// cycle: 0→1→1(hold)→0 with: slow build (3s), fast burst (0.5s), hold full (5s), slow decay (2s)
function pulseEnvelope(t: number): number {
  const period = 10.5; // total cycle seconds
  const phase = t % period;
  if (phase < 3.0)   return Math.pow(phase / 3.0, 2);                    // build
  if (phase < 3.5)   return 1.0;                                          // burst peak
  if (phase < 8.5)   return 1.0;                                          // HOLD expanded
  return Math.pow(1 - (phase - 8.5) / 2.0, 1.5);                         // decay
}

export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) return;

    // ── Size canvas to its PARENT SECTION, not the viewport ──────────────────
    // This is critical: the canvas lives inside the hero section (position:absolute inset-0)
    // so its coordinate space is the section, not the full page.
    let w = 0, h = 0;

    function sizeCanvas() {
      const rect = parent!.getBoundingClientRect();
      w = canvas!.width  = Math.round(rect.width);
      h = canvas!.height = Math.round(rect.height);
    }
    sizeCanvas();

    let mouse = { x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 };

    // Mouse coords relative to the SECTION, not the viewport
    const onMouseMove = (e: MouseEvent) => {
      const rect = parent!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseout',  onMouseLeave, { passive: true });

    let isMobile = w < 768;

    // ── Anchor point: óculos do personagem ───────────────────────────────────
    // Desktop: personagem ocupa lado direito ~55–80% X, óculos ~35–42% Y da section
    // Mobile : personagem centralizado, óculos ~28–32% Y
    let cx = 0, cy = 0;
    let clusterRadiusX = 0, clusterRadiusY = 0;

    function recalcOrigin() {
      isMobile = w < 768;
      cx = isMobile ? w * 0.54 : w * 0.66;
      cy = isMobile ? h * 0.30 : h * 0.38;
      clusterRadiusX = isMobile ? w * 0.30 : w * 0.22;
      clusterRadiusY = clusterRadiusX * 0.22; // muito achatado horizontalmente
    }
    recalcOrigin();

    const onResize = () => { sizeCanvas(); recalcOrigin(); init(); };
    window.addEventListener('resize', onResize, { passive: true });

    // ── Particle class ────────────────────────────────────────────────────────
    class Particle {
      x = 0; y = 0; baseX = 0; baseY = 0;
      size = 0; density = 0; baseOpacity = 0; baseHue = 0;
      angle = 0; distanceX = 0; distanceY = 0; speed = 0;
      wobbleSpeed = 0; wobbleAngle = 0;
      oscSpeedX = 0; oscSpeedY = 0;
      oscPhaseX = 0; oscPhaseY = 0;
      life = 0; maxLife = 0;

      constructor(idx: number) { this.reset(true, idx); }

      reset(firstSpawn = false, idx = 0) {
        this.angle = Math.random() * Math.PI * 2;
        const distFactor = Math.pow(Math.random(), 2.2);
        this.distanceX = distFactor * clusterRadiusX;
        this.distanceY = distFactor * clusterRadiusY;
        this.baseX = cx + Math.cos(this.angle) * this.distanceX;
        this.baseY = cy + Math.sin(this.angle) * this.distanceY;
        this.x = this.baseX;
        this.y = this.baseY;
        this.size = 0.6 + Math.random() * 1.2;
        this.density = Math.random() * 30 + 1;
        this.baseOpacity = 0.25 + Math.random() * 0.35;
        // Color palette: 60% deep red, 25% amber, 15% red-orange
        const r = idx % 20;
        this.baseHue = r < 12 ? 355 : r < 17 ? 33 : 15;
        this.speed = (Math.random() * 0.005) - 0.0025;
        this.wobbleSpeed  = Math.random() * 0.06;
        this.wobbleAngle  = Math.random() * Math.PI * 2;
        this.oscSpeedX    = Math.random() * 0.018 + 0.008;
        this.oscSpeedY    = Math.random() * 0.010 + 0.004;
        this.oscPhaseX    = Math.random() * Math.PI * 2;
        this.oscPhaseY    = Math.random() * Math.PI * 2;
        this.maxLife = 160 + Math.random() * 280;
        this.life = firstSpawn ? Math.random() * this.maxLife : 0;
      }

      draw(globalTime: number, idx: number, mSpeed: number, pulse: number) {
        this.life++;
        if (this.life >= this.maxLife) { this.reset(false, idx); }

        const lp = this.life / this.maxLife;
        let opacity = this.baseOpacity;
        if (lp < 0.08) opacity *= lp / 0.08;
        else if (lp > 0.92) opacity *= (1 - lp) / 0.08;

        // Pulse expands the orbit — bigger hold means they spin expanded longer
        const expandedDistX = this.distanceX + pulse * w * 0.28;
        const expandedDistY = this.distanceY + pulse * h * 0.10;
        // Speed up rotation during hold phase
        const rotSpeed = this.speed + pulse * 0.008;
        this.angle += rotSpeed;
        this.wobbleAngle += this.wobbleSpeed;

        const oscX = Math.sin(globalTime * this.oscSpeedX + this.oscPhaseX) * 10;
        const oscY = Math.cos(globalTime * this.oscSpeedY + this.oscPhaseY) * 3;
        this.baseX = cx + Math.cos(this.angle) * expandedDistX + oscX;
        this.baseY = cy + Math.sin(this.angle) * expandedDistY + oscY;

        // Vertical confinement within the section
        const minY = h * 0.10, maxY = h * 0.68;
        if (this.baseY < minY) this.baseY = minY;
        if (this.baseY > maxY) this.baseY = maxY;

        const targetX = this.baseX + Math.cos(this.wobbleAngle) * 1.5;
        const targetY = this.baseY + Math.sin(this.wobbleAngle) * 0.5;

        let hue = this.baseHue;

        // Mouse interaction (only if mouse is inside section)
        if (mouse.x > -100 && mouse.y > -100) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const radius = Math.max(180, 700 - mSpeed * 12);
          if (dist < radius && dist > 0.5) {
            const force = Math.pow((radius - dist) / radius, 1.5);
            const pull  = Math.max(0.02, 0.18 - mSpeed * 0.004);
            const swirl = mSpeed * 1.4 + 2;
            this.x += dx * force * pull + (dy / dist) * force * swirl;
            this.y += dy * force * pull - (dx / dist) * force * swirl;
            // Color shift on speed
            const th = mSpeed > 20 ? 50 : mSpeed > 5 ? 30 : 355;
            const bh = this.baseHue === 355 ? -5 : this.baseHue;
            const tt = th === 355 ? -5 : th;
            const bld = bh + (tt - bh) * force;
            hue = bld < 0 ? bld + 360 : bld;
            opacity = Math.min(1, opacity + force * (mSpeed > 15 ? 1.4 : 0.7));
          } else {
            this.x += (targetX - this.x) * 0.05;
            this.y += (targetY - this.y) * 0.05;
          }
        } else {
          this.x += (targetX - this.x) * 0.05;
          this.y += (targetY - this.y) * 0.05;
        }

        ctx!.fillStyle = `hsla(${hue},100%,55%,${opacity.toFixed(3)})`;
        ctx!.fillRect(this.x, this.y, this.size, this.size);
      }
    }

    let particles: Particle[] = [];
    function init() {
      particles = [];
      const count = isMobile ? 3500 : 7000;
      for (let i = 0; i < count; i++) particles.push(new Particle(i));
    }
    init();

    let rafId: number;
    let time = 0;

    function animate() {
      ctx!.clearRect(0, 0, w, h);

      // Mouse speed
      if (mouse.x > -100 && mouse.prevX > -100) {
        const sdx = mouse.x - mouse.prevX;
        const sdy = mouse.y - mouse.prevY;
        mouse.speed = mouse.speed * 0.8 + Math.sqrt(sdx*sdx + sdy*sdy) * 0.2;
      } else { mouse.speed *= 0.9; }
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;

      ctx!.globalCompositeOperation = 'screen';
      time += 0.016;

      const pulse = pulseEnvelope(time);

      for (let i = 0; i < particles.length; i++) {
        particles[i].draw(time, i, mouse.speed, pulse);
      }

      // ── FLARE: ponto de luz fixo nos óculos ──────────────────────────────
      // Tamanho base pequeno, explode durante o burst, fica brilhante no hold
      const flareR = 20 + pulse * 55;
      const flareA = 0.35 + pulse * 0.65;

      const fg = ctx!.createRadialGradient(cx, cy, 0, cx, cy, flareR);
      fg.addColorStop(0,   `rgba(255,255,255,${flareA})`);
      fg.addColorStop(0.08,`rgba(255,220,120,${flareA * 0.85})`);
      fg.addColorStop(0.35,`rgba(232,39,42,${flareA * 0.45})`);
      fg.addColorStop(1,   'rgba(232,39,42,0)');

      ctx!.globalCompositeOperation = 'screen';
      ctx!.fillStyle = fg;
      ctx!.beginPath();
      ctx!.arc(cx, cy, flareR, 0, Math.PI * 2);
      ctx!.fill();

      // Tiny bright core that never disappears
      ctx!.globalCompositeOperation = 'source-over';
      ctx!.fillStyle = `rgba(255,240,200,${0.15 + pulse * 0.25})`;
      ctx!.beginPath();
      ctx!.arc(cx, cy, 2.5, 0, Math.PI * 2);
      ctx!.fill();

      rafId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseout',  onMouseLeave);
      window.removeEventListener('resize',    onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-20"
    />
  );
}
