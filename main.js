/**
 * HENRIQUE AMARAL BORGES — MAIN INTERACTIONS & CANVAS
 * Inspired by the cyber-motorsport UI of landonorris.com
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCursorGlow();
  initHeroCanvas();
  initHeroTabs();
  initAudioFeedback();
  initStatsCounter();
  initEmailCopy();
  initMobileMenu();
});

/* --- HERO TABS (PORTRAIT & 3D SIMULATION) --- */
function initHeroTabs() {
  const tabs = document.querySelectorAll('.hero-tab-btn');
  const panels = document.querySelectorAll('.hero-view-panel');
  if (!tabs.length || !panels.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-target');
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
        // If switched to 3D Canvas, trigger resize
        if (targetId === 'viewCanvas') {
          window.dispatchEvent(new Event('resize'));
        }
      }
    });
  });
}

/* --- NAVBAR SCROLL STATE --- */
function initNavbar() {
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* --- INTERACTIVE CURSOR GLOW --- */
function initCursorGlow() {
  const cursorGlow = document.querySelector('.cursor-glow');
  if (!cursorGlow) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  function renderCursor() {
    currentX += (mouseX - currentX) * 0.15;
    currentY += (mouseY - currentY) * 0.15;
    cursorGlow.style.left = `${currentX}px`;
    cursorGlow.style.top = `${currentY}px`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);
}

/* --- HERO CANVAS: 3D ROTATING MECHATRONIC CORE & NEURAL NODES --- */
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height, dpr;
  let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

  function resize() {
    dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  }
  window.addEventListener('resize', resize);
  resize();

  // Mouse interaction
  canvas.parentElement.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.targetX = (e.clientX - rect.left - width / 2) * 0.002;
    mouse.targetY = (e.clientY - rect.top - height / 2) * 0.002;
  });

  canvas.parentElement.addEventListener('mouseleave', () => {
    mouse.targetX = 0;
    mouse.targetY = 0;
  });

  // Generate 3D Particle Ring Nodes (AI & Robotics nodes)
  const nodeCount = 48;
  const nodes = [];
  const radius = Math.min(width, height) * 0.32;

  for (let i = 0; i < nodeCount; i++) {
    const phi = Math.acos(-1 + (2 * i) / nodeCount);
    const theta = Math.sqrt(nodeCount * Math.PI) * phi;
    nodes.push({
      x: radius * Math.cos(theta) * Math.sin(phi),
      y: radius * Math.sin(theta) * Math.sin(phi),
      z: radius * Math.cos(phi),
      baseX: radius * Math.cos(theta) * Math.sin(phi),
      baseY: radius * Math.sin(theta) * Math.sin(phi),
      baseZ: radius * Math.cos(phi),
      color: i % 3 === 0 ? '#D2FF00' : (i % 3 === 1 ? '#00F0FF' : '#FFFFFF')
    });
  }

  let angleX = 0;
  let angleY = 0;

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Smooth mouse tilt
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    angleY += 0.008 + mouse.x;
    angleX += 0.004 + mouse.y;

    const centerX = width / 2;
    const centerY = height / 2;
    const fov = 350;

    // Projected nodes
    const projected = [];

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      // Rotate Y
      let cosY = Math.cos(angleY);
      let sinY = Math.sin(angleY);
      let x1 = node.baseX * cosY - node.baseZ * sinY;
      let z1 = node.baseZ * cosY + node.baseX * sinY;

      // Rotate X
      let cosX = Math.cos(angleX);
      let sinX = Math.sin(angleX);
      let y2 = node.baseY * cosX - z1 * sinX;
      let z2 = z1 * cosX + node.baseY * sinX;

      // Perspective projection
      const scale = fov / (fov + z2);
      const projX = centerX + x1 * scale;
      const projY = centerY + y2 * scale;
      const alpha = Math.max(0.15, Math.min(1, (z2 + radius) / (2 * radius)));

      projected.push({
        x: projX,
        y: projY,
        z: z2,
        scale: scale,
        alpha: alpha,
        color: node.color
      });
    }

    // Sort by depth
    projected.sort((a, b) => a.z - b.z);

    // Draw connecting mechatronic circuitry lines
    ctx.lineWidth = 1;
    for (let i = 0; i < projected.length; i++) {
      for (let j = i + 1; j < projected.length; j++) {
        const p1 = projected[i];
        const p2 = projected[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 75) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(210, 255, 0, ${0.25 * (1 - dist / 75)})`;
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    // Draw Nodes
    for (let i = 0; i < projected.length; i++) {
      const p = projected[i];
      const r = Math.max(1.5, 3.2 * p.scale);

      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();

      // Glow on foreground nodes
      if (p.z > 0 && p.color === '#D2FF00') {
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(210, 255, 0, 0.2)';
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;

    // Draw central spinning HUD crosshair ring
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(angleY * 0.5);
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([8, 12]);
    ctx.beginPath();
    ctx.arc(0, 0, 45, 0, Math.PI * 2);
    ctx.stroke();

    ctx.rotate(-angleY * 1.2);
    ctx.strokeStyle = 'rgba(210, 255, 0, 0.6)';
    ctx.setLineDash([16, 24]);
    ctx.beginPath();
    ctx.arc(0, 0, 28, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

/* --- WEB AUDIO API & SOUNDTRACK PLAYER --- */
function initAudioFeedback() {
  const toggleBtn = document.getElementById('audioToggle');
  const dock = document.getElementById('cyberAudioDock');
  const playBtn = document.getElementById('cyberPlayBtn');
  const playIcon = document.getElementById('playIcon');
  const pauseIcon = document.getElementById('pauseIcon');

  let audioCtx = null;
  let audioEnabled = false;

  // Background Soundtrack Audio
  const bgTrack = new Audio('assets/cyber-soundtrack.wav');
  bgTrack.loop = true;
  bgTrack.volume = 0.55;

  function playTone(freq, type, duration) {
    if (!audioEnabled) return;
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type || 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn('Audio not available', e);
    }
  }

  function setAudioState(enabled) {
    audioEnabled = enabled;
    if (audioEnabled) {
      bgTrack.play().then(() => {
        if (dock) dock.classList.add('playing');
        if (playIcon) playIcon.style.display = 'none';
        if (pauseIcon) pauseIcon.style.display = 'block';
        if (playBtn) playBtn.classList.add('playing');
        if (toggleBtn) {
          toggleBtn.classList.add('active');
          toggleBtn.innerHTML = '<span>●</span> AUDIO: ON';
        }
      }).catch(err => {
        console.log('Playback require user click', err);
      });
      playTone(880, 'sine', 0.1);
    } else {
      bgTrack.pause();
      if (dock) dock.classList.remove('playing');
      if (playIcon) playIcon.style.display = 'block';
      if (pauseIcon) pauseIcon.style.display = 'none';
      if (playBtn) playBtn.classList.remove('playing');
      if (toggleBtn) {
        toggleBtn.classList.remove('active');
        toggleBtn.innerHTML = '<span>○</span> AUDIO: OFF';
      }
    }
  }

  // Toggle button in header
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      setAudioState(!audioEnabled);
    });
  }

  // Play button in floating cyber dock
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      setAudioState(!audioEnabled);
    });
  }

  // Interactive hover sounds on buttons & links
  const interactives = document.querySelectorAll('.btn, .nav-link, .destaque-card, .social-btn');
  interactives.forEach(elem => {
    elem.addEventListener('mouseenter', () => {
      playTone(520, 'triangle', 0.04);
    });
    elem.addEventListener('click', () => {
      playTone(1040, 'square', 0.08);
    });
  });
}

/* --- STATS COUNTER ANIMATION --- */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target') || '0', 10);
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        animateValue(el, 0, target, 1600, prefix, suffix);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  statNumbers.forEach(el => observer.observe(el));
}

function animateValue(elem, start, end, duration, prefix = '', suffix = '') {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = Math.floor(easeProgress * (end - start) + start);
    elem.textContent = `${prefix}${current}${suffix}`;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      elem.textContent = `${prefix}${end}${suffix}`;
    }
  };
  window.requestAnimationFrame(step);
}

/* --- EMAIL QUICK-COPY WITH TOAST --- */
function initEmailCopy() {
  const copyBtn = document.getElementById('copyEmailBtn');
  const toast = document.getElementById('toastNotice');
  const emailText = document.getElementById('emailValue');

  if (!copyBtn || !toast || !emailText) return;

  copyBtn.addEventListener('click', () => {
    const textToCopy = emailText.textContent.trim();
    navigator.clipboard.writeText(textToCopy).then(() => {
      showToast('E-MAIL COPIADO COM SUCESSO!');
    }).catch(() => {
      // Fallback
      showToast('E-MAIL: ' + textToCopy);
    });
  });

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }
}

/* --- MOBILE NAVIGATION MENU --- */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');

  if (!menuBtn || !mainNav) return;

  menuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('mobile-active');
    menuBtn.textContent = mainNav.classList.contains('mobile-active') ? 'FECHAR ✕' : 'MENU ☰';
  });

  // Close when clicking nav links
  const navLinks = mainNav.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('mobile-active');
      menuBtn.textContent = 'MENU ☰';
    });
  });
}
