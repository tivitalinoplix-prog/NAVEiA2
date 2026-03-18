import React, { useEffect, useRef } from 'react';

export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Optimization: use desynchronized for lower latency if supported
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    
    let mouse = { x: -1000, y: -1000, prevX: -1000, prevY: -1000, speed: 0 };
    
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseout', onMouseLeave, { passive: true });

    // Responsive positioning: move up and left on mobile to align with glasses
    let isMobile = w < 768;
    let cx = isMobile ? w * 0.65 : w * 0.65; // Fixed at 0.65
    let cy = isMobile ? h * 0.30 : h * 0.30; // Fixed at 0.30
    let clusterRadiusX = isMobile ? w * 0.4 : w * 0.25;
    let clusterRadiusY = clusterRadiusX * 0.25; // Flattened vertically

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      isMobile = w < 768;
      cx = isMobile ? w * 0.65 : w * 0.65;
      cy = isMobile ? h * 0.30 : h * 0.30;
      clusterRadiusX = isMobile ? w * 0.4 : w * 0.25;
      clusterRadiusY = clusterRadiusX * 0.25;
      init();
    };
    window.addEventListener('resize', onResize, { passive: true });

    class Particle {
      x!: number;
      y!: number;
      baseX!: number;
      baseY!: number;
      size!: number;
      density!: number;
      baseOpacity!: number;
      baseHue!: number;
      angle!: number;
      distanceX!: number;
      distanceY!: number;
      speed!: number;
      wobbleSpeed!: number;
      wobbleAngle!: number;
      baseHue!: number;
      oscillationSpeedX!: number;
      oscillationSpeedY!: number;
      oscillationPhaseX!: number;
      oscillationPhaseY!: number;
      life!: number;
      maxLife!: number;

      constructor(index: number) {
        this.init(true, index);
      }

      init(isFirstSpawn = false, index = 0) {
        this.angle = Math.random() * Math.PI * 2;
        // Concentrate much more towards the beam/flare
        let distFactor = Math.pow(Math.random(), 2.5); // Higher power = closer to center
        this.distanceX = distFactor * clusterRadiusX * 0.6; 
        this.distanceY = distFactor * clusterRadiusY * 0.6;
        
        this.baseX = cx + Math.cos(this.angle) * this.distanceX;
        this.baseY = cy + Math.sin(this.angle) * this.distanceY;
        this.x = this.baseX;
        this.y = this.baseY;
        
        // Consistent size: 0.5px to 1.5px
        this.size = Math.random() * 1.0 + 0.5;
        this.density = (Math.random() * 30) + 1;
        
        this.baseOpacity = Math.random() * 0.3 + 0.2; // 0.2 to 0.5
        
        // Restore old colors (Red/Amber/Orange)
        const rand = Math.random();
        if (rand < 0.60) {
          this.baseHue = 355; // Deep Red
        } else if (rand < 0.85) {
          this.baseHue = 33; // Amber-Orange
        } else {
          this.baseHue = 15; // Red-Orange
        }
        
        this.speed = (Math.random() * 0.004) - 0.002;
        this.wobbleSpeed = Math.random() * 0.05;
        this.wobbleAngle = Math.random() * Math.PI * 2;

        this.oscillationSpeedX = Math.random() * 0.02 + 0.01;
        this.oscillationSpeedY = Math.random() * 0.02 + 0.01;
        this.oscillationPhaseX = Math.random() * Math.PI * 2;
        this.oscillationPhaseY = Math.random() * Math.PI * 2;

        this.maxLife = 150 + Math.random() * 250;
        this.life = isFirstSpawn ? Math.random() * this.maxLife : 0;
      }

      updateAndDraw(globalTime: number, index: number, mouseSpeed: number) {
        this.life++;
        if (this.life >= this.maxLife) {
          this.init(false, index);
        }

        let lifeProgress = this.life / this.maxLife;
        let currentOpacity = this.baseOpacity;
        // Smooth fade in and out
        if (lifeProgress < 0.1) currentOpacity *= (lifeProgress / 0.1);
        else if (lifeProgress > 0.9) currentOpacity *= ((1 - lifeProgress) / 0.1);

        // Slowly rotate the base position around the center
        this.angle += this.speed;
        this.wobbleAngle += this.wobbleSpeed;
        
        // Add subtle, slow oscillation using a sine wave based on time
        let oscX = Math.sin(globalTime * this.oscillationSpeedX + this.oscillationPhaseX) * 10;
        let oscY = Math.cos(globalTime * this.oscillationSpeedY + this.oscillationPhaseY) * 5;

        this.baseX = cx + Math.cos(this.angle) * this.distanceX + oscX;
        this.baseY = cy + Math.sin(this.angle) * this.distanceY + oscY;

        // Confine base position vertically to ±15% of total height (so they naturally orbit here)
        const minHeight = h * 0.15;
        const maxHeight = h * 0.45;
        if (this.baseY < minHeight) this.baseY = minHeight;
        if (this.baseY > maxHeight) this.baseY = maxHeight;

        // Subtle rotation/wobble around own axis
        let targetX = this.baseX + Math.cos(this.wobbleAngle) * 1.5;
        let targetY = this.baseY + Math.sin(this.wobbleAngle) * 0.75;

        // Mouse interaction (dynamic based on speed)
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let hue = this.baseHue;

        if (Math.abs(dx) < 1000 && Math.abs(dy) < 1000) {
          let distanceToMouse = Math.sqrt(dx * dx + dy * dy);
          
          // Dynamic radius: Slower = larger radius (pulls more), Faster = smaller radius
          let activeRadius = Math.max(200, 800 - mouseSpeed * 15);
          
          if (distanceToMouse < activeRadius) {
            let force = Math.pow((activeRadius - distanceToMouse) / activeRadius, 1.5);
            
            // Dynamic forces based on speed
            // Slow: high pull, low swirl. Fast: low pull, high swirl.
            let pullStrength = Math.max(0.02, 0.2 - mouseSpeed * 0.004); 
            let swirlStrength = mouseSpeed * 1.5 + 2;
            
            // Apply Attraction
            this.x += dx * force * pullStrength;
            this.y += dy * force * pullStrength;
            
            // Apply Swirl
            this.x += (dy / distanceToMouse) * force * swirlStrength;
            this.y -= (dx / distanceToMouse) * force * swirlStrength;
            
            // Dynamic Color based on speed
            let targetHue = 355; // Slow = Red
            if (mouseSpeed > 5 && mouseSpeed <= 20) {
               targetHue = 30; // Medium = Orange
            } else if (mouseSpeed > 20) {
               targetHue = 50; // Fast = Yellow/Bright
            }
            
            // Smoothly blend hue (treating 355 as -5 to avoid rainbow wrap)
            let currentBaseHue = this.baseHue === 355 ? -5 : this.baseHue;
            let currentTargetHue = targetHue === 355 ? -5 : targetHue;
            
            let blendedHue = currentBaseHue + (currentTargetHue - currentBaseHue) * force;
            hue = blendedHue < 0 ? blendedHue + 360 : blendedHue;
            
            // Opacity spikes more when fast
            let opacityBoost = mouseSpeed > 15 ? 1.5 : 0.8;
            currentOpacity = Math.min(1, currentOpacity + force * opacityBoost);
          } else {
            this.x += (targetX - this.x) * 0.05;
            this.y += (targetY - this.y) * 0.05;
          }
        } else {
          this.x += (targetX - this.x) * 0.05;
          this.y += (targetY - this.y) * 0.05;
        }

        // Optimization: fillRect instead of arc is massively faster for thousands of tiny particles
        ctx!.fillStyle = `hsla(${hue}, 100%, 55%, ${currentOpacity})`;
        ctx!.fillRect(this.x, this.y, this.size, this.size);
      }
    }

    let particleArray: Particle[] = [];
    function init() {
      particleArray = [];
      // Increased particle count for denser look
      for (let i = 0; i < 6000; i++) {
        particleArray.push(new Particle(i));
      }
    }
    init();

    let rafId: number;
    let time = 0;
    function animate() {
      ctx!.clearRect(0, 0, w, h);
      
      // Calculate mouse speed
      if (mouse.x !== -1000 && mouse.prevX !== -1000) {
        let dx = mouse.x - mouse.prevX;
        let dy = mouse.y - mouse.prevY;
        let currentSpeed = Math.sqrt(dx * dx + dy * dy);
        mouse.speed = mouse.speed * 0.8 + currentSpeed * 0.2;
      } else {
        mouse.speed = mouse.speed * 0.9;
      }
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;

      // Use screen for glowing overlap
      ctx!.globalCompositeOperation = 'screen';
      
      time += 0.015;
      // Create a periodic pulse (e.g., every ~4 seconds)
      // Math.sin(time) goes from -1 to 1. We want a sharp peak.
      let pulse = Math.pow(Math.max(0, Math.sin(time)), 4); 
      
      // Combined update and draw loop for performance
      for (let i = 0; i < particleArray.length; i++) {
        let p = particleArray[i];
        
        // Temporarily increase speed and distance during the pulse
        let originalSpeed = p.speed;
        let originalDistanceX = p.distanceX;
        let originalDistanceY = p.distanceY;
        
        p.speed += (p.speed > 0 ? 1 : -1) * pulse * 0.05;
        // Massive expansion during the pulse
        p.distanceX += pulse * (w * 0.3); 
        p.distanceY += pulse * (h * 0.3); 
        
        p.updateAndDraw(time, i, mouse.speed);
        
        // Restore
        p.speed = originalSpeed;
        p.distanceX = originalDistanceX;
        p.distanceY = originalDistanceY;
      }
      
      // Draw the bright light point (flare) at the origin (VR headset rim)
      // The flare gets larger and brighter during the pulse
      let flareRadius = 60 + pulse * 40;
      let flareOpacity = 0.6 + pulse * 0.4;
      
      const flareGradient = ctx!.createRadialGradient(cx, cy, 0, cx, cy, flareRadius);
      flareGradient.addColorStop(0, `rgba(255, 255, 255, ${flareOpacity})`);
      flareGradient.addColorStop(0.1, `rgba(255, 200, 100, ${flareOpacity * 0.7})`);
      flareGradient.addColorStop(0.4, `rgba(232, 39, 42, ${flareOpacity * 0.3})`);
      flareGradient.addColorStop(1, 'rgba(232, 39, 42, 0)');
      
      ctx!.fillStyle = flareGradient;
      ctx!.beginPath();
      ctx!.arc(cx, cy, flareRadius, 0, Math.PI * 2);
      ctx!.fill();

      rafId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseout', onMouseLeave);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none z-20" 
    />
  );
}
