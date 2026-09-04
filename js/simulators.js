/**
 * simulators.js
 * High-performance interactive HTML5 Canvas physics and AI simulation engines
 * for Sai Teja Lodagala's portfolio.
 */

// ==========================================
// 1. AUTONOMOUS VEHICLE MPPI SIMULATOR
// ==========================================
class MPPISimulator {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.isRunning = false;

    // Vehicle State
    this.state = {
      x: 80,
      y: 160,
      psi: 0,        // heading angle
      v: 24,         // longitudinal velocity
      delta: 0,      // steering angle
      beta: 0        // slip angle
    };

    // Obstacles
    this.obstacles = [
      { x: 300, y: 150, radius: 24, isDragging: false },
      { x: 520, y: 180, radius: 26, isDragging: false }
    ];

    // Trajectory Waypoints (Reference Path)
    this.refPath = [];
    this.generateRefPath();

    // Rollouts
    this.numRollouts = 30;
    this.horizon = 18;
    this.dt = 0.08;
    this.rolloutPaths = [];
    this.bestPath = [];

    this.targetSpeed = 28;
    this.frictionMu = 0.85;

    this.setupEvents();
    this.resize();
  }

  generateRefPath() {
    this.refPath = [];
    const w = this.canvas ? this.canvas.width : 700;
    for (let x = 0; x < w + 200; x += 15) {
      const y = 160 + Math.sin(x * 0.008) * 35;
      this.refPath.push({ x, y });
    }
  }

  setupEvents() {
    window.addEventListener('resize', () => this.resize());

    let activeDrag = null;

    const getPos = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: (clientX - rect.left) * (this.canvas.width / rect.width),
        y: (clientY - rect.top) * (this.canvas.height / rect.height)
      };
    };

    const onDown = (e) => {
      const p = getPos(e);
      for (const obs of this.obstacles) {
        const d = Math.hypot(obs.x - p.x, obs.y - p.y);
        if (d < obs.radius + 15) {
          obs.isDragging = true;
          activeDrag = obs;
          break;
        }
      }
    };

    const onMove = (e) => {
      if (!activeDrag) return;
      const p = getPos(e);
      activeDrag.x = Math.max(80, Math.min(this.canvas.width - 60, p.x));
      activeDrag.y = Math.max(60, Math.min(this.canvas.height - 60, p.y));
    };

    const onUp = () => {
      if (activeDrag) activeDrag.isDragging = false;
      activeDrag = null;
    };

    this.canvas.addEventListener('mousedown', onDown);
    this.canvas.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);

    this.canvas.addEventListener('touchstart', onDown, { passive: true });
    this.canvas.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onUp);
  }

  resize() {
    if (!this.canvas) return;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = 320 * dpr;
    this.ctx.scale(dpr, dpr);
    this.virtualWidth = rect.width;
    this.virtualHeight = 320;
    this.generateRefPath();
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.loop();
  }

  stop() {
    this.isRunning = false;
  }

  stepMPPI() {
    // Generate parallel stochastic rollouts
    this.rolloutPaths = [];
    let minCost = Infinity;
    let bestTrajectory = [];
    let bestDelta = 0;

    for (let k = 0; k < this.numRollouts; k++) {
      let simX = this.state.x;
      let simY = this.state.y;
      let simPsi = this.state.psi;
      let simV = this.state.v;
      let path = [{ x: simX, y: simY }];
      let cost = 0;

      // Base perturbation sequence
      const deltaNoise = (Math.random() - 0.5) * 0.45 + (Math.sin(k * 0.7) * 0.2);

      for (let t = 0; t < this.horizon; t++) {
        // Target path tracking error
        const targetY = 160 + Math.sin(simX * 0.008) * 35;
        const crossTrackErr = Math.abs(simY - targetY);
        cost += crossTrackErr * 1.8;

        // Obstacle avoidance repulsion field
        for (const obs of this.obstacles) {
          const distToObs = Math.hypot(simX - obs.x, simY - obs.y);
          if (distToObs < obs.radius + 35) {
            cost += Math.pow((obs.radius + 35 - distToObs), 3) * 15;
          }
        }

        // Boundary penalties
        if (simY < 40 || simY > 280) {
          cost += 2000;
        }

        // Bicycle kinematic update with Pacejka-inspired slip
        const steer = Math.max(-0.55, Math.min(0.55, (targetY - simY) * 0.015 + deltaNoise));
        const beta = Math.atan(0.5 * Math.tan(steer));
        simPsi += (simV / 28) * Math.sin(beta) * this.dt;
        simX += simV * Math.cos(simPsi + beta) * this.dt * 4;
        simY += simV * Math.sin(simPsi + beta) * this.dt * 4;

        path.push({ x: simX, y: simY });
      }

      this.rolloutPaths.push({ path, cost });

      if (cost < minCost) {
        minCost = cost;
        bestTrajectory = path;
        bestDelta = (bestTrajectory[1].y - this.state.y) * 0.04;
      }
    }

    this.bestPath = bestTrajectory;

    // Apply optimal control to vehicle state
    if (this.bestPath && this.bestPath.length > 1) {
      const nextStep = this.bestPath[1];
      const dx = nextStep.x - this.state.x;
      const dy = nextStep.y - this.state.y;
      this.state.psi = Math.atan2(dy, dx);
      this.state.x += Math.cos(this.state.psi) * this.state.v * this.dt * 0.8;
      this.state.y += Math.sin(this.state.psi) * this.state.v * this.dt * 0.8;
      this.state.delta = bestDelta;
      this.state.beta = 0.5 * this.state.delta * (this.state.v / 30);
    }

    // Wrap around screen for continuous demo
    if (this.state.x > this.virtualWidth + 40) {
      this.state.x = -20;
      this.state.y = 160;
      this.state.psi = 0;
    }

    this.updateHUD(minCost);
  }

  updateHUD(cost) {
    const elSpeed = document.getElementById('mppi-telemetry-speed');
    const elHeading = document.getElementById('mppi-telemetry-heading');
    const elSlip = document.getElementById('mppi-telemetry-slip');
    const elCost = document.getElementById('mppi-telemetry-cost');

    if (elSpeed) elSpeed.innerText = `${(this.state.v * 3.6).toFixed(1)} km/h`;
    if (elHeading) elHeading.innerText = `${(this.state.psi * 180 / Math.PI).toFixed(1)}°`;
    if (elSlip) elSlip.innerText = `${(this.state.beta * 180 / Math.PI).toFixed(2)}°`;
    if (elCost) elCost.innerText = `${cost ? Math.min(999, cost).toFixed(0) : '0'}`;
  }

  draw() {
    const ctx = this.ctx;
    const w = this.virtualWidth;
    const h = this.virtualHeight;

    ctx.clearRect(0, 0, w, h);

    // Background Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Road Track Boundaries
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 6]);
    ctx.beginPath();
    ctx.moveTo(0, 50);
    ctx.lineTo(w, 50);
    ctx.moveTo(0, 270);
    ctx.lineTo(w, 270);
    ctx.stroke();
    ctx.setLineDash([]);

    // Reference Centerline
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < this.refPath.length; i++) {
      if (i === 0) ctx.moveTo(this.refPath[i].x, this.refPath[i].y);
      else ctx.lineTo(this.refPath[i].x, this.refPath[i].y);
    }
    ctx.stroke();

    // Draw Obstacles with Repulsion Glow
    for (const obs of this.obstacles) {
      const grad = ctx.createRadialGradient(obs.x, obs.y, obs.radius * 0.2, obs.x, obs.y, obs.radius + 20);
      grad.addColorStop(0, 'rgba(239, 68, 68, 0.6)');
      grad.addColorStop(0.6, 'rgba(239, 68, 68, 0.18)');
      grad.addColorStop(1, 'rgba(239, 68, 68, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(obs.x, obs.y, obs.radius + 20, 0, Math.PI * 2);
      ctx.fill();

      // Obstacle core
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(obs.x, obs.y, obs.radius, 0, Math.PI * 2);
      ctx.fill();

      // Border and label
      ctx.strokeStyle = '#fca5a5';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('OBSTACLE', obs.x, obs.y + 4);
    }

    // Draw MPPI Sampled Candidate Rollouts
    ctx.lineWidth = 1;
    for (const r of this.rolloutPaths) {
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.15)';
      ctx.beginPath();
      for (let i = 0; i < r.path.length; i++) {
        if (i === 0) ctx.moveTo(r.path[i].x, r.path[i].y);
        else ctx.lineTo(r.path[i].x, r.path[i].y);
      }
      ctx.stroke();
    }

    // Draw Best MPPI Trajectory
    if (this.bestPath && this.bestPath.length > 0) {
      ctx.strokeStyle = '#38bdf8';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 10;
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let i = 0; i < this.bestPath.length; i++) {
        if (i === 0) ctx.moveTo(this.bestPath[i].x, this.bestPath[i].y);
        else ctx.lineTo(this.bestPath[i].x, this.bestPath[i].y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // Draw Autonomous Vehicle
    ctx.save();
    ctx.translate(this.state.x, this.state.y);
    ctx.rotate(this.state.psi);

    // Vehicle Shadow / Glow
    ctx.shadowColor = '#0284c7';
    ctx.shadowBlur = 12;

    // Vehicle Body
    ctx.fillStyle = '#0284c7';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;

    const vl = 28;
    const vw = 16;
    ctx.beginPath();
    ctx.roundRect(-vl / 2, -vw / 2, vl, vw, 4);
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Windshield & Roof
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.roundRect(-vl * 0.2, -vw * 0.35, vl * 0.45, vw * 0.7, 2);
    ctx.fill();

    // Headlights
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(vl / 2 - 3, -vw / 2 + 2, 3, 3);
    ctx.fillRect(vl / 2 - 3, vw / 2 - 5, 3, 3);

    // Steer Vector Arrow
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(vl / 2, 0);
    ctx.lineTo(vl / 2 + Math.cos(this.state.delta) * 14, Math.sin(this.state.delta) * 14);
    ctx.stroke();

    ctx.restore();
  }

  loop() {
    if (!this.isRunning) return;
    this.stepMPPI();
    this.draw();
    requestAnimationFrame(() => this.loop());
  }
}


// ==========================================
// 2. INVERTED PENDULUM (CART-POLE) SIMULATOR
// ==========================================
class PendulumSimulator {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.isRunning = false;

    // Physical Constants
    this.M = 1.0;     // Cart mass (kg)
    this.m = 0.2;     // Pole mass (kg)
    this.L = 100;     // Pole length in pixels (approx 0.5m)
    this.g = 9.81;    // Gravity (m/s^2)

    // State: [x, x_dot, theta, theta_dot]
    // theta = 0 is vertically upright
    this.state = {
      x: 0,
      x_dot: 0,
      theta: 0.08,    // initial small perturbation
      theta_dot: 0
    };

    // Controller Mode: 'lqr' or 'pid'
    this.mode = 'lqr';
    this.lqrGains = { k1: -8.0, k2: -12.5, k3: 145.0, k4: 28.0 }; // [K_x, K_xdot, K_theta, K_thetadot]

    // PID Gains
    this.pidGains = { kp: 120.0, ki: 2.0, kd: 22.0 };
    this.pidIntegral = 0;

    this.controlEffort = 0;
    this.history = []; // Phase space [theta, theta_dot]

    this.setupEvents();
    this.resize();
  }

  setupEvents() {
    window.addEventListener('resize', () => this.resize());

    // Drag cart to inject disturbance
    let isDragging = false;
    const onDown = () => { isDragging = true; };
    const onMove = (e) => {
      if (!isDragging) return;
      const rect = this.canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const relX = (clientX - rect.left) - rect.width / 2;
      this.state.x = relX * 0.8;
      this.state.theta += (Math.random() - 0.5) * 0.1;
    };
    const onUp = () => { isDragging = false; };

    this.canvas.addEventListener('mousedown', onDown);
    this.canvas.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);

    this.canvas.addEventListener('touchstart', onDown, { passive: true });
    this.canvas.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onUp);
  }

  resize() {
    if (!this.canvas) return;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = 300 * dpr;
    this.ctx.scale(dpr, dpr);
    this.virtualWidth = rect.width;
    this.virtualHeight = 300;
  }

  applyImpulse(direction = 1) {
    this.state.theta_dot += direction * 0.8;
    this.state.x_dot += direction * 15;
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.loop();
  }

  stop() {
    this.isRunning = false;
  }

  stepPhysics(dt = 0.02) {
    // 1. Calculate Control Effort u(t)
    let u = 0;
    if (this.mode === 'lqr') {
      u = -(
        this.lqrGains.k1 * this.state.x * 0.05 +
        this.lqrGains.k2 * this.state.x_dot * 0.05 +
        this.lqrGains.k3 * this.state.theta +
        this.lqrGains.k4 * this.state.theta_dot
      );
    } else {
      // Cascaded PID
      this.pidIntegral += this.state.theta * dt;
      u = (
        this.pidGains.kp * this.state.theta +
        this.pidGains.ki * this.pidIntegral +
        this.pidGains.kd * this.state.theta_dot -
        this.state.x * 0.5 - this.state.x_dot * 0.8
      );
    }

    // Force limit
    u = Math.max(-60, Math.min(60, u));
    this.controlEffort = u;

    // 2. Nonlinear Equations of Motion (Euler-Lagrange)
    const sinT = Math.sin(this.state.theta);
    const cosT = Math.cos(this.state.theta);
    const totalMass = this.M + this.m;
    const l = this.L * 0.01; // scale to SI meters

    // Explicit angular acceleration (theta_ddot)
    const temp = (u + this.m * l * this.state.theta_dot * this.state.theta_dot * sinT) / totalMass;
    const theta_ddot = (this.g * sinT - cosT * temp) / (l * (4.0 / 3.0 - (this.m * cosT * cosT) / totalMass));

    // Cart linear acceleration (x_ddot)
    const x_ddot = temp - (this.m * l * theta_ddot * cosT) / totalMass;

    // 3. Numerical Integration (Symplectic Euler)
    this.state.theta_dot += theta_ddot * dt;
    this.state.theta += this.state.theta_dot * dt;
    this.state.x_dot += x_ddot * dt * 20;
    this.state.x += this.state.x_dot * dt;

    // Damping / Friction
    this.state.theta_dot *= 0.998;
    this.state.x_dot *= 0.995;

    // Hard boundary spring for cart
    const maxX = this.virtualWidth / 2 - 80;
    if (Math.abs(this.state.x) > maxX) {
      this.state.x = Math.sign(this.state.x) * maxX;
      this.state.x_dot *= -0.5;
    }

    // Record phase space
    this.history.push({ theta: this.state.theta, theta_dot: this.state.theta_dot });
    if (this.history.length > 80) this.history.shift();

    this.updateHUD();
  }

  updateHUD() {
    const elAngle = document.getElementById('pendulum-angle');
    const elPos = document.getElementById('pendulum-pos');
    const elForce = document.getElementById('pendulum-force');

    if (elAngle) elAngle.innerText = `${(this.state.theta * 180 / Math.PI).toFixed(2)}°`;
    if (elPos) elPos.innerText = `${(this.state.x * 0.01).toFixed(2)} m`;
    if (elForce) elForce.innerText = `${this.controlEffort.toFixed(1)} N`;
  }

  draw() {
    const ctx = this.ctx;
    const w = this.virtualWidth;
    const h = this.virtualHeight;

    ctx.clearRect(0, 0, w, h);

    const centerX = w / 2;
    const trackY = h * 0.72;

    // Draw Track
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.3)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(30, trackY);
    ctx.lineTo(w - 30, trackY);
    ctx.stroke();

    // Track Rail markers
    for (let x = 40; x < w - 30; x += 40) {
      ctx.fillStyle = 'rgba(148, 163, 184, 0.4)';
      ctx.fillRect(x, trackY + 2, 2, 8);
    }

    // Cart Position
    const cartX = centerX + this.state.x;
    const cartW = 70;
    const cartH = 34;
    const cartY = trackY - cartH;

    // Cart Body
    ctx.shadowColor = '#10b981';
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#065f46';
    ctx.strokeStyle = '#34d399';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(cartX - cartW / 2, cartY, cartW, cartH, 6);
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Cart Wheels
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cartX - cartW / 3, trackY, 7, 0, Math.PI * 2);
    ctx.arc(cartX + cartW / 3, trackY, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Hinge Pivot Point
    const pivotX = cartX;
    const pivotY = cartY + 6;

    // Pole Tip
    const tipX = pivotX + this.L * Math.sin(this.state.theta);
    const tipY = pivotY - this.L * Math.cos(this.state.theta);

    // Pole Beam
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(pivotX, pivotY);
    ctx.lineTo(tipX, tipY);
    ctx.stroke();

    // Pole Tip Mass
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 12;
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(tipX, tipY, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Center Hinge
    ctx.fillStyle = '#e2e8f0';
    ctx.beginPath();
    ctx.arc(pivotX, pivotY, 4, 0, Math.PI * 2);
    ctx.fill();

    // Control Force Indicator Arrow
    if (Math.abs(this.controlEffort) > 2) {
      ctx.strokeStyle = '#38bdf8';
      ctx.fillStyle = '#38bdf8';
      ctx.lineWidth = 3;
      const arrowLen = this.controlEffort * 0.8;
      ctx.beginPath();
      ctx.moveTo(cartX, cartY - 14);
      ctx.lineTo(cartX + arrowLen, cartY - 14);
      ctx.stroke();

      // Arrow head
      ctx.beginPath();
      ctx.moveTo(cartX + arrowLen, cartY - 14);
      ctx.lineTo(cartX + arrowLen - Math.sign(arrowLen) * 6, cartY - 18);
      ctx.lineTo(cartX + arrowLen - Math.sign(arrowLen) * 6, cartY - 10);
      ctx.fill();
    }
  }

  loop() {
    if (!this.isRunning) return;
    this.stepPhysics();
    this.draw();
    requestAnimationFrame(() => this.loop());
  }
}


// ==========================================
// 3. SWARSTUDIO AUDIO DSP SPECTRUM SIMULATOR
// ==========================================
class AudioDSPSimulator {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.isRunning = false;

    this.numBands = 48;
    this.bands = new Array(this.numBands).fill(0);
    this.stems = {
      vocals: { active: true, color: '#38bdf8', label: 'Vocals (UNet Denoised)', gain: 1.0 },
      drums: { active: true, color: '#f97316', label: 'Drums / Transient', gain: 1.0 },
      bass: { active: true, color: '#a855f7', label: 'Bass / Sub (40-120Hz)', gain: 1.0 },
      other: { active: true, color: '#10b981', label: 'Harmonics / Instruments', gain: 1.0 }
    };

    this.showPhonCurve = true;
    this.phase = 0;

    this.resize();
  }

  resize() {
    if (!this.canvas) return;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = 240 * dpr;
    this.ctx.scale(dpr, dpr);
    this.virtualWidth = rect.width;
    this.virtualHeight = 240;
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.loop();
  }

  stop() {
    this.isRunning = false;
  }

  toggleStem(stemName) {
    if (this.stems[stemName]) {
      this.stems[stemName].active = !this.stems[stemName].active;
    }
  }

  draw() {
    const ctx = this.ctx;
    const w = this.virtualWidth;
    const h = this.virtualHeight;

    ctx.clearRect(0, 0, w, h);
    this.phase += 0.05;

    // Calculate synthetic multi-stem FFT spectrum
    const barWidth = (w - 40) / this.numBands;

    for (let i = 0; i < this.numBands; i++) {
      const freqRatio = i / this.numBands;
      let energy = 0;

      // Bass Stem (Low freqs)
      if (this.stems.bass.active && freqRatio < 0.25) {
        energy += (Math.sin(this.phase * 2.5 + i * 0.4) * 0.35 + 0.6) * (1 - freqRatio * 3.5);
      }

      // Drums / Kick Transients
      if (this.stems.drums.active) {
        energy += Math.abs(Math.sin(this.phase * 4.0)) * 0.3 * (freqRatio < 0.4 ? 1.0 : 0.4);
      }

      // Vocals (Mid range 300Hz - 4kHz)
      if (this.stems.vocals.active && freqRatio > 0.15 && freqRatio < 0.65) {
        energy += (Math.sin(this.phase * 3.2 + i * 0.6) * 0.3 + 0.45) * Math.sin((freqRatio - 0.15) / 0.5 * Math.PI);
      }

      // Harmonics / Other (Highs)
      if (this.stems.other.active && freqRatio > 0.4) {
        energy += (Math.sin(this.phase * 5.0 + i * 0.8) * 0.2 + 0.25) * freqRatio;
      }

      // Add gentle random excitation
      energy += Math.random() * 0.05;

      // Smooth envelope
      this.bands[i] = this.bands[i] * 0.7 + energy * 0.3;

      const barHeight = Math.min(h - 30, this.bands[i] * (h * 0.85));
      const barX = 20 + i * barWidth;
      const barY = h - 20 - barHeight;

      // Stem-blended gradient
      const grad = ctx.createLinearGradient(barX, h - 20, barX, barY);
      grad.addColorStop(0, '#0284c7');
      grad.addColorStop(0.5, '#38bdf8');
      grad.addColorStop(1, '#a855f7');

      ctx.fillStyle = grad;
      ctx.fillRect(barX, barY, barWidth - 2, barHeight);
    }

    // Draw ISO 226:2023 Equal-Loudness Phon Contour
    if (this.showPhonCurve) {
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      for (let i = 0; i < this.numBands; i++) {
        const x = 20 + i * barWidth + barWidth / 2;
        const norm = i / this.numBands;
        // ISO 226 contour shape (dip around 3-4kHz, high at 20Hz and 15kHz)
        const dip = Math.pow(norm - 0.45, 2) * 220 + 40;
        const y = Math.min(h - 25, dip);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#f59e0b';
      ctx.font = '10px monospace';
      ctx.fillText('ISO 226 Equal-Loudness (60 Phon)', 30, 25);
    }

    // X-Axis Frequency Markers
    ctx.fillStyle = '#64748b';
    ctx.font = '9px monospace';
    ctx.fillText('20Hz', 20, h - 6);
    ctx.fillText('250Hz', w * 0.25, h - 6);
    ctx.fillText('1kHz', w * 0.5, h - 6);
    ctx.fillText('4kHz', w * 0.75, h - 6);
    ctx.fillText('20kHz', w - 45, h - 6);
  }

  loop() {
    if (!this.isRunning) return;
    this.draw();
    requestAnimationFrame(() => this.loop());
  }
}


// ==========================================
// 4. FRAUDSENTINEL THREAT FUSION SIMULATOR
// ==========================================
class ThreatFusionSimulator {
  constructor() {
    this.smsScore = 88;       // 0 - 100%
    this.txAnomaly = 3.8;      // 0 - 5.0 Z-score
    this.timeMinutes = 12;     // 0 - 60 mins
    this.decayRate = 0.08;     // lambda

    this.initControls();
    this.calculate();
  }

  initControls() {
    const elSms = document.getElementById('fusion-sms-slider');
    const elTx = document.getElementById('fusion-tx-slider');
    const elTime = document.getElementById('fusion-time-slider');

    if (elSms) {
      elSms.addEventListener('input', (e) => {
        this.smsScore = parseFloat(e.target.value);
        document.getElementById('fusion-sms-val').innerText = `${this.smsScore}%`;
        this.calculate();
      });
    }

    if (elTx) {
      elTx.addEventListener('input', (e) => {
        this.txAnomaly = parseFloat(e.target.value);
        document.getElementById('fusion-tx-val').innerText = `${this.txAnomaly}σ`;
        this.calculate();
      });
    }

    if (elTime) {
      elTime.addEventListener('input', (e) => {
        this.timeMinutes = parseFloat(e.target.value);
        document.getElementById('fusion-time-val').innerText = `${this.timeMinutes} mins ago`;
        this.calculate();
      });
    }
  }

  calculate() {
    // Normalization
    const s_sms = this.smsScore / 100.0;
    const s_tx = Math.min(1.0, this.txAnomaly / 4.0);

    // Exponential Decay
    const decay = Math.exp(-this.decayRate * this.timeMinutes);

    // Cross-channel Fusion Formula
    // S_fused = 0.45 * S_tx + 0.35 * (S_sms * decay) + 0.20 * (S_tx * S_sms * decay)
    const fusedScore = (0.45 * s_tx + 0.35 * (s_sms * decay) + 0.25 * (s_tx * s_sms * decay)) * 100;

    const elGauge = document.getElementById('fusion-gauge-bar');
    const elScore = document.getElementById('fusion-score-val');
    const elStatus = document.getElementById('fusion-status-badge');
    const elAction = document.getElementById('fusion-action-text');

    if (elScore) elScore.innerText = `${fusedScore.toFixed(1)} / 100`;
    if (elGauge) {
      elGauge.style.width = `${Math.min(100, fusedScore)}%`;

      if (fusedScore >= 70) {
        elGauge.className = 'h-3 rounded-full bg-rose-500 shadow-lg shadow-rose-500/50 transition-all duration-300';
        if (elStatus) {
          elStatus.className = 'px-3 py-1 text-xs font-semibold rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse';
          elStatus.innerText = 'CRITICAL THREAT: QUARANTINE';
        }
        if (elAction) {
          elAction.innerText = 'Automated Action: Outgoing wire transfer BLOCKED, Account placed in emergency quarantine, 2FA credentials invalidated.';
        }
      } else if (fusedScore >= 45) {
        elGauge.className = 'h-3 rounded-full bg-amber-500 shadow-lg shadow-amber-500/50 transition-all duration-300';
        if (elStatus) {
          elStatus.className = 'px-3 py-1 text-xs font-semibold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40';
          elStatus.innerText = 'ELEVATED RISK: STEP-UP AUTH';
        }
        if (elAction) {
          elAction.innerText = 'Automated Action: Transaction paused. Triggering out-of-band biometric authentication & live operator review.';
        }
      } else {
        elGauge.className = 'h-3 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50 transition-all duration-300';
        if (elStatus) {
          elStatus.className = 'px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40';
          elStatus.innerText = 'NORMAL BASELINE: APPROVED';
        }
        if (elAction) {
          elAction.innerText = 'Automated Action: Threat within safe statistical margin. Transaction processed with normal fraud logs.';
        }
      }
    }
  }
}

// Global Export for App initialization
window.Simulators = {
  MPPISimulator,
  PendulumSimulator,
  AudioDSPSimulator,
  ThreatFusionSimulator
};
