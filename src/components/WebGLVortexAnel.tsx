import React, { useEffect, useRef } from 'react';

export function WebGLVortexAnel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { antialias: true, alpha: true });
    if (!gl) return;

    const vsSrc = `attribute vec3 a_pos; attribute float a_size; attribute vec4 a_color; uniform mat4 u_mvp; varying vec4 v_color; void main() { gl_Position = u_mvp * vec4(a_pos, 1.0); gl_PointSize = a_size * (320.0 / gl_Position.w); v_color = a_color; }`;
    const fsSrc = `precision mediump float; varying vec4 v_color; void main() { vec2 c = gl_PointCoord - 0.5; float d = length(c); if (d > 0.5) discard; float a = (1.0 - d * 2.0) * v_color.a; float glow = exp(-d * 5.0) * 0.5; gl_FragColor = vec4(v_color.rgb + glow * 0.4, a); }`;
    const program = gl.createProgram();
    if (!program) return;
    const vs = gl.createShader(gl.VERTEX_SHADER); if (!vs) return; gl.shaderSource(vs, vsSrc); gl.compileShader(vs); gl.attachShader(program, vs);
    const fs = gl.createShader(gl.FRAGMENT_SHADER); if (!fs) return; gl.shaderSource(fs, fsSrc); gl.compileShader(fs); gl.attachShader(program, fs);
    gl.linkProgram(program); gl.useProgram(program);

    const N = 4000;
    const positions = new Float32Array(N * 3); const sizes = new Float32Array(N); const colors = new Float32Array(N * 4);
    const angles = new Float32Array(N); const offsets = new Float32Array(N); const speeds = new Float32Array(N);
    const torusR = 0.65, tubeR = 0.22;
    const palette = [[1.0, 0.165, 0.165, 0.9], [1.0, 0.4, 0.2, 0.8], [1.0, 1.0, 1.0, 0.95], [1.0, 0.0, 0.267, 0.85]];

    for (let i = 0; i < N; i++) {
      const theta = Math.random() * Math.PI * 2, phi = Math.random() * Math.PI * 2, r = torusR + tubeR * Math.cos(phi);
      positions[i*3] = r * Math.cos(theta); positions[i*3+1] = tubeR * Math.sin(phi); positions[i*3+2] = r * Math.sin(theta);
      angles[i] = theta; offsets[i] = phi; speeds[i] = 0.0003 + Math.random() * 0.0003; sizes[i] = 1.5 + Math.random() * 2.5;
      const rand = Math.random(); let color = rand < 0.4 ? palette[0] : rand < 0.7 ? palette[1] : rand < 0.9 ? palette[2] : palette[3];
      colors[i*4] = color[0]; colors[i*4+1] = color[1]; colors[i*4+2] = color[2]; colors[i*4+3] = color[3] * (0.5 + Math.random() * 0.5);
    }

    const posBuffer = gl.createBuffer(); const sizeBuffer = gl.createBuffer(); const colBuffer = gl.createBuffer();
    const posLoc = gl.getAttribLocation(program, 'a_pos'); const sizeLoc = gl.getAttribLocation(program, 'a_size');
    const colLoc = gl.getAttribLocation(program, 'a_color'); const mvpLoc = gl.getUniformLocation(program, 'u_mvp');

    function multiply(a: Float32Array, b: Float32Array) {
      const r = new Float32Array(16);
      for(let i=0; i<4; i++) for(let j=0; j<4; j++) { let s = 0; for(let k=0; k<4; k++) s += a[k*4+i] * b[j*4+k]; r[j*4+i] = s; }
      return r;
    }
    function perspective(fov: number, aspect: number, near: number, far: number) {
      const f = 1.0 / Math.tan(fov / 2), nf = 1 / (near - far);
      return new Float32Array([f/aspect,0,0,0, 0,f,0,0, 0,0,(far+near)*nf,-1, 0,0,(2*far*near)*nf,0]);
    }
    function rotateX(m: Float32Array, angle: number) {
      const c = Math.cos(angle), s = Math.sin(angle); const r = new Float32Array(m);
      r[4] = m[4]*c + m[8]*s; r[5] = m[5]*c + m[9]*s; r[6] = m[6]*c + m[10]*s; r[7] = m[7]*c + m[11]*s;
      r[8] = m[4]*-s + m[8]*c; r[9] = m[5]*-s + m[9]*c; r[10] = m[6]*-s + m[10]*c; r[11] = m[7]*-s + m[11]*c;
      return r;
    }

    function resize() {
      if (!canvas || !canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth; canvas.height = canvas.parentElement.clientHeight;
      gl?.viewport(0, 0, canvas.width, canvas.height);
    }
    window.addEventListener('resize', resize); resize();
    let t = 0; let requestRef: number;

    function render() {
      if (!gl || !canvas) return;
      t += 0.0003; gl.clearColor(0,0,0,0); gl.clear(gl.COLOR_BUFFER_BIT); gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
      const aspect = canvas.width / canvas.height; let mvp = perspective(Math.PI/4, aspect, 0.1, 100);
      mvp = multiply(mvp, new Float32Array([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,-2.5,1]));
      mvp = rotateX(mvp, 0.44);
      const cosR = Math.cos(t * 0.1), sinR = Math.sin(t * 0.1);
      mvp = multiply(mvp, new Float32Array([cosR,0,sinR,0, 0,1,0,0, -sinR,0,cosR,0, 0,0,0,1]));
      const dynamicPositions = new Float32Array(positions.length);
      for (let i = 0; i < N; i++) {
        angles[i] += speeds[i]; const theta = angles[i], phi = offsets[i], r = torusR + tubeR * Math.cos(phi);
        let x = r * Math.cos(theta), y = tubeR * Math.sin(phi), z = r * Math.sin(theta);
        if (mouseRef.current.active) {
          const px = (x / 2.5) * (canvas.width / aspect) + canvas.width/2; const py = (y / 2.5) * canvas.height + canvas.height/2;
          const dx = mouseRef.current.x - px, dy = mouseRef.current.y - py, d = Math.sqrt(dx*dx + dy*dy);
          if (d < 120) { const f = (1.0 - d/120) * 0.02; x -= dx * f; y -= dy * f; }
        }
        dynamicPositions[i*3] = x; dynamicPositions[i*3+1] = y; dynamicPositions[i*3+2] = z;
      }
      gl.uniformMatrix4fv(mvpLoc, false, mvp);
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer); gl.bufferData(gl.ARRAY_BUFFER, dynamicPositions, gl.DYNAMIC_DRAW); gl.enableVertexAttribArray(posLoc); gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer); gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.STATIC_DRAW); gl.enableVertexAttribArray(sizeLoc); gl.vertexAttribPointer(sizeLoc, 1, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, colBuffer); gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW); gl.enableVertexAttribArray(colLoc); gl.vertexAttribPointer(colLoc, 4, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.POINTS, 0, N); requestRef = requestAnimationFrame(render);
    }
    const move = (e: MouseEvent) => { const r = canvas.getBoundingClientRect(); mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top, active: true }; };
    canvas.addEventListener('mousemove', move); canvas.addEventListener('mouseleave', () => mouseRef.current.active = false);
    render();
    return () => { window.removeEventListener('resize', resize); canvas.removeEventListener('mousemove', move); cancelAnimationFrame(requestRef); };
  }, []);

  return <canvas ref={canvasRef} id="cta-webgl-canvas" className="absolute top-0 left-0 w-full h-full pointer-events-auto" style={{ zIndex: 0 }} />;
}
