import { useEffect, useRef } from 'react';

const PHI = (1 + Math.sqrt(5)) / 2;
const PI2 = Math.PI * 2;

function hash(n: number): number {
  const x = Math.sin(n) * 43758.5453123;
  return x - Math.floor(x);
}

interface Particle {
  x: number; y: number; z: number;
  tx: number; ty: number;
  phase: number;
  size: number;
  alpha: number;
}

function formTorus(i: number, n: number) {
  const t = (i / n) * PI2;
  const R = 1.8, r = 0.7 + hash(i * 2.9) * 0.2;
  return {
    x: (R + r * Math.cos(3 * t)) * Math.cos(2 * t),
    y: (R + r * Math.cos(3 * t)) * Math.sin(2 * t),
    z: r * Math.sin(3 * t),
  };
}

function formVortex(i: number, n: number) {
  const t = i / n;
  const a = t * PI2 * 6;
  const r = (1 - t) * 2.8;
  return { x: r * Math.cos(a), y: (t - 0.5) * 4, z: r * Math.sin(a) };
}

function formSphere(i: number, n: number) {
  const p = Math.acos(1 - (2 * (i + 0.5)) / n);
  const t = PI2 * PHI * i;
  const r = 2.2 + hash(i * 6.7) * 0.3;
  return {
    x: r * Math.sin(p) * Math.cos(t),
    y: r * Math.sin(p) * Math.sin(t),
    z: r * Math.cos(p),
  };
}

function formGalaxy(i: number, n: number) {
  const arm = Math.floor(i % 3);
  const t = i / n;
  const r = Math.pow(t, 0.5) * 3.2;
  const a = t * 10 + (arm * PI2) / 3;
  return { x: r * Math.cos(a), y: (hash(i * 8.7) - 0.5) * 0.5, z: r * Math.sin(a) };
}

const FORMS = [formTorus, formVortex, formSphere, formGalaxy];
const FORM_DURATION = 6000;
const N = 2000;

export function HeroAmbientEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0;
    let rafId = 0;
    let mouseX = 0.5, mouseY = 0.5;
    let currentForm = 0;
    let morphProgress = 0;
    const particles: Particle[] = [];

    const scale = () => Math.min(W, H) * 0.22;
    // Pushed to the right to act together with the dense particle ball, adjusted for mobile
    const originX = () => (W < 768 ? W * 0.65 : W * 0.78);
    const originY = () => (W < 768 ? H * 0.28 : H * 0.38);

    function buildTargets(formIdx: number) {
      const fn = FORMS[formIdx % FORMS.length];
      const s = scale();
      for (let i = 0; i < N; i++) {
        const p3 = fn(i, N);
        particles[i].tx = originX() + p3.x * s;
        particles[i].ty = originY() + p3.y * s;
      }
    }

    function init() {
      particles.length = 0;
      const s = scale();
      const fn = FORMS[0];
      for (let i = 0; i < N; i++) {
        const p3 = fn(i, N);
        const px = originX() + p3.x * s;
        const py = originY() + p3.y * s;
        particles.push({ x: px, y: py, z: p3.z, tx: px, ty: py, phase: hash(i * 3.7) * PI2, size: 0.7 + hash(i * 1.3) * 1.2, alpha: 0.2 + hash(i * 5.1) * 0.5 });
      }
    }

    function resize() {
      W = canvas!.offsetWidth;
      H = canvas!.offsetHeight;
      canvas!.width = W;
      canvas!.height = H;
      if (particles.length > 0) buildTargets(currentForm);
    }
    window.addEventListener('resize', resize);
    resize();
    init();

    function onMouse(e: MouseEvent) {
      mouseX = e.clientX / window.innerWidth;
      mouseY = e.clientY / window.innerHeight;
    }
    window.addEventListener('mousemove', onMouse);

    let lastTime = performance.now();

    function render(now: number) {
      rafId = requestAnimationFrame(render);
      const dt = now - lastTime;
      lastTime = now;

      const elapsed = now;
      const formIdx = Math.floor(elapsed / FORM_DURATION) % FORMS.length;
      if (formIdx !== currentForm) {
        currentForm = formIdx;
        buildTargets(formIdx);
        morphProgress = 0;
      }
      morphProgress = Math.min(1, morphProgress + dt * 0.0003);
      const eased = morphProgress * morphProgress * (3 - 2 * morphProgress);

      ctx.clearRect(0, 0, W, H);
      
      // Crucial Z-Index/Clipping: The effect must not go behind the character's face
      // We clip the canvas so particles are only drawn to the right of the glasses
      // We use a slight curve or just a straight line at originX
      ctx.save();
      ctx.beginPath();
      // Start slightly left of the origin to allow the origin point itself to be visible
      ctx.rect(originX() - 20, 0, W, H);
      ctx.clip();

      const mx = mouseX * W;
      const my = mouseY * H;
      const t = now * 0.0003;

      for (let i = 0; i < N; i++) {
        const p = particles[i];
        p.x += (p.tx - p.x) * (0.012 + eased * 0.018);
        p.y += (p.ty - p.y) * (0.012 + eased * 0.018);

        const ox = Math.sin(p.phase + t * 1.1) * 0.8;
        const oy = Math.cos(p.phase * 1.3 + t * 0.9) * 0.8;

        const dx = (p.x + ox) - mx;
        const dy = (p.y + oy) - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let rx = 0, ry = 0;
        if (dist < 120 && dist > 0.5) {
          const f = ((1 - dist / 120) ** 2) * 5;
          rx = (dx / dist) * f;
          ry = (dy / dist) * f;
        }

        const fx = p.x + ox + rx;
        const fy = p.y + oy + ry;
        const zNorm = (p.z + 3) / 6;
        const finalAlpha = p.alpha * (0.25 + zNorm * 0.75) * 0.5;
        const finalSize = p.size * (0.4 + zNorm * 0.9);

        const rv = Math.round(232 + (255 - 232) * zNorm * 0.25);
        const gv = Math.round(39 * (1 - zNorm * 0.5));
        const bv = Math.round(42 * (1 - zNorm * 0.4));

        ctx.beginPath();
        ctx.arc(fx, fy, Math.max(0.3, finalSize), 0, PI2);
        ctx.fillStyle = `rgba(${rv},${gv},${bv},${finalAlpha.toFixed(3)})`;
        ctx.fill();
      }
      
      ctx.restore();
    }

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none', zIndex: 20 }} />;
}
