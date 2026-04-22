/* ─────────────────────────────────────────────
   FEATHER PARTICLE SYSTEM
   White feathers burst on click
───────────────────────────────────────────── */

(function () {
  const canvas = document.getElementById('featherCanvas');
  const ctx    = canvas.getContext('2d');
  let   W = 0, H = 0;
  const feathers = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  /* ── Single Feather ── */
  class Feather {
    constructor(x, y) {
      this.x  = x;
      this.y  = y;
      this.vx = (Math.random() - 0.5) * 5;
      this.vy = (Math.random() - 0.5) * 5 - 3; // slight upward bias

      this.life    = 1;          // opacity
      this.decay   = 0.012 + Math.random() * 0.01;
      this.size    = 8 + Math.random() * 14;
      this.angle   = Math.random() * Math.PI * 2;
      this.spin    = (Math.random() - 0.5) * 0.12;
      this.gravity = 0.06 + Math.random() * 0.04;
      this.wobble  = 0;
      this.wobbleSpeed = 0.08 + Math.random() * 0.08;
      this.wobbleAmp   = 0.8 + Math.random() * 1.2;
      // Colour: white to soft lilac
      const r = 220 + Math.floor(Math.random() * 35);
      const g = 200 + Math.floor(Math.random() * 35);
      const b = 240 + Math.floor(Math.random() * 15);
      this.color = `rgba(${r},${g},${b},`;
    }

    update() {
      this.wobble += this.wobbleSpeed;
      this.vx += Math.sin(this.wobble) * this.wobbleAmp * 0.05;
      this.vy += this.gravity;
      this.x  += this.vx;
      this.y  += this.vy;
      this.angle += this.spin;
      this.life  -= this.decay;
      // Air resistance
      this.vx *= 0.98;
      this.vy *= 0.98;
    }

    draw() {
      if (this.life <= 0) return;
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.life);
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);

      const s = this.size;

      /* quill stem */
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.6);
      ctx.lineTo(0, s * 0.6);
      ctx.strokeStyle = this.color + '0.9)';
      ctx.lineWidth = 0.8;
      ctx.stroke();

      /* left vane */
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.5);
      ctx.bezierCurveTo(-s * 0.45, -s * 0.1, -s * 0.5, s * 0.2, 0, s * 0.55);
      ctx.fillStyle = this.color + '0.75)';
      ctx.fill();

      /* right vane */
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.5);
      ctx.bezierCurveTo(s * 0.45, -s * 0.1, s * 0.5, s * 0.2, 0, s * 0.55);
      ctx.fillStyle = this.color + '0.75)';
      ctx.fill();

      /* highlight */
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.45);
      ctx.bezierCurveTo(-s * 0.15, -s * 0.05, -s * 0.1, s * 0.15, 0, s * 0.45);
      ctx.fillStyle = `rgba(255,255,255,${this.life * 0.4})`;
      ctx.fill();

      ctx.restore();
    }

    get dead() { return this.life <= 0; }
  }

  /* ── Spawn feathers ── */
  function spawnFeathers(x, y, count = 10) {
    for (let i = 0; i < count; i++) {
      feathers.push(new Feather(x, y));
    }
  }

  /* ── Loop ── */
  function loop() {
    ctx.clearRect(0, 0, W, H);
    for (let i = feathers.length - 1; i >= 0; i--) {
      feathers[i].update();
      feathers[i].draw();
      if (feathers[i].dead) feathers.splice(i, 1);
    }
    requestAnimationFrame(loop);
  }
  loop();

  /* ── Listen ── */
  document.addEventListener('click', (e) => {
    spawnFeathers(e.clientX, e.clientY, 12);
  });

  /* Smaller burst on mousedown for tactile feel */
  document.addEventListener('mousedown', (e) => {
    spawnFeathers(e.clientX, e.clientY, 4);
  });

  /* Touch support */
  document.addEventListener('touchstart', (e) => {
    const t = e.touches[0];
    spawnFeathers(t.clientX, t.clientY, 10);
  }, { passive: true });

})();
