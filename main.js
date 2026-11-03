/**
 * HENRIQUE AMARAL BORGES — OFFICIAL ANIMATIONS & INTERACTION ENGINE
 * Sincronizado com os efeitos de alta performance de landonorris.com (OFF+BRAND)
 * Inclui: Lenis Smooth Scroll, GSAP ScrollTrigger, 3D Tilt Parallax, Magnetic Buttons,
 * Velocity Marquee, Page Speed Wipe e Simulação 3D em Canvas.
 */

document.addEventListener('DOMContentLoaded', () => {
  initLenisSmoothScroll();
  initPageIntroWipe();
  initHeroTextReveal();
  initScrollAnimations();
  initCard3DTilt();
  initMagneticButtons();
  initVelocityMarquee();
  initNavbar();
  initCursorGlow();
  initHeroCanvas();
  initHeroTabs();
  initAudioFeedback();
  initStatsCounter();
  initEmailCopy();
  initMobileMenu();
});

/* ==========================================================================
   1. LENIS SMOOTH INERTIAL SCROLL (Estilo F1 Track Gliding)
   ========================================================================== */
let lenis = null;
function initLenisSmoothScroll() {
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
      smoothWheel: true,
      touchMultiplier: 1.5,
      infinite: false
    });

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }
}

/* ==========================================================================
   2. PAGE SPEED WIPE INTRO (Cortina de Velocidade de landonorris.com)
   ========================================================================== */
function initPageIntroWipe() {
  const wipe = document.getElementById('pageIntroWipe');
  if (!wipe) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      wipe.classList.add('done');
      triggerHeroLines();
    }, 350);
  });

  // Fallback se load demorar
  setTimeout(() => {
    if (!wipe.classList.contains('done')) {
      wipe.classList.add('done');
      triggerHeroLines();
    }
  }, 1200);
}

/* ==========================================================================
   3. HERO TEXT REVEAL (Linhas Staggered com Máscara e Aceleração)
   ========================================================================== */
function triggerHeroLines() {
  const lines = document.querySelectorAll('.text-reveal-line');
  lines.forEach((line, index) => {
    setTimeout(() => {
      line.classList.add('revealed');
    }, 150 + index * 140);
  });
}

function initHeroTextReveal() {
  // Se o wipe já passou ou foi desativado
  const wipe = document.getElementById('pageIntroWipe');
  if (!wipe) {
    triggerHeroLines();
  }
}

/* ==========================================================================
   4. SCROLL REVEAL (GSAP ScrollTrigger ou IntersectionObserver Fallback)
   ========================================================================== */
function initScrollAnimations() {
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Reveal ON-TRACK & OFF-TRACK Columns
    const otot1 = document.querySelector('.otot-home-text-col.is-1');
    const otot2 = document.querySelector('.otot-home-text-col.is-2');
    if (otot1 && otot2) {
      gsap.from(otot1, {
        scrollTrigger: {
          trigger: '.is-otot-home',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        x: -60,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out'
      });

      gsap.from(otot2, {
        scrollTrigger: {
          trigger: '.is-otot-home',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        x: 60,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.15
      });
    }

    // Bento Grid Cards Stagger
    const cards = document.querySelectorAll('.destaque-card');
    if (cards.length) {
      gsap.from(cards, {
        scrollTrigger: {
          trigger: '.destaques-grid',
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.85,
        stagger: 0.14,
        ease: 'power3.out'
      });
    }

    // Partner Cards Stagger
    const partners = document.querySelectorAll('.partner-card');
    if (partners.length) {
      gsap.from(partners, {
        scrollTrigger: {
          trigger: '.partners-grid',
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        scale: 0.92,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out'
      });
    }

    // Timeline Items Stagger
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length) {
      timelineItems.forEach((item, i) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 88%',
            toggleActions: 'play none none none'
          },
          x: -30,
          opacity: 0,
          duration: 0.65,
          ease: 'power2.out'
        });
      });
    }

  } else {
    // Robust IntersectionObserver Fallback
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('[data-scroll-reveal], [data-scroll-slide]').forEach(el => {
      observer.observe(el);
    });
  }
}

/* ==========================================================================
   5. INTERACTIVE 3D MOUSE PARALLAX & CARD TILT
   ========================================================================== */
function initCard3DTilt() {
  const tiltElements = document.querySelectorAll('.destaque-card, .otot-home-text-col, .partner-card, .hero-visual-card');

  tiltElements.forEach(card => {
    card.classList.add('tilt-card');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Ângulo de inclinação sutil e controlado (máx 6 graus)
      const rotateX = ((centerY - y) / centerY) * 5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* ==========================================================================
   6. MAGNETIC BUTTON PHYSICS (Efeito Ímã ao aproximar o cursor)
   ========================================================================== */
function initMagneticButtons() {
  const magnets = document.querySelectorAll('.btn-w, .btn, .audio-play-btn, .brand-link');

  magnets.forEach(btn => {
    btn.classList.add('magnetic-target');

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - btnCenterX) * 0.28;
      const deltaY = (e.clientY - btnCenterY) * 0.28;

      btn.style.transform = `translate(${deltaX.toFixed(1)}px, ${deltaY.toFixed(1)}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });
}

/* ==========================================================================
   7. VELOCITY MARQUEE TICKER (Acelera conforme a velocidade de rolagem)
   ========================================================================== */
function initVelocityMarquee() {
  const marquee = document.querySelector('.marquee-track');
  if (!marquee) return;

  let lastScrollY = window.scrollY;
  let currentSpeed = 26; // segundos base
  let targetSpeed = 26;

  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    const delta = Math.abs(currentY - lastScrollY);
    lastScrollY = currentY;

    // Acelera a esteira quando o usuário rola a página rápido (simula aceleração de F1)
    if (delta > 5) {
      targetSpeed = Math.max(8, 26 - delta * 0.35);
    }
  }, { passive: true });

  function updateMarqueeSpeed() {
    currentSpeed += (targetSpeed - currentSpeed) * 0.08;
    marquee.style.animationDuration = `${currentSpeed.toFixed(2)}s`;

    // Retorna gradualmente à velocidade de cruzeiro
    targetSpeed += (26 - targetSpeed) * 0.03;

    requestAnimationFrame(updateMarqueeSpeed);
  }
  requestAnimationFrame(updateMarqueeSpeed);
}

/* ==========================================================================
   8. HERO TABS (PORTRAIT & 3D SIMULATION SWITCHER)
   ========================================================================== */
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
        if (targetId === 'viewCanvas') {
          window.dispatchEvent(new Event('resize'));
        }
      }
    });
  });
}

/* ==========================================================================
   9. NAVBAR SCROLL STATE
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ==========================================================================
   10. INTERACTIVE CURSOR GLOW
   ========================================================================== */
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

/* ==========================================================================
   11. HERO CANVAS: 3D ROTATING MECHATRONIC CORE & NEURAL NODES
   ========================================================================== */
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

  // Click burst ripple effect
  let burstRadius = 0;
  canvas.addEventListener('click', () => {
    burstRadius = 1;
  });

  // Generate 3D Particle Ring Nodes
  const nodeCount = 52;
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
      color: i % 3 === 0 ? '#D2FF00' : (i % 3 === 1 ? '#00F0FF' : '#F4F4ED')
    });
  }

  let angleX = 0;
  let angleY = 0;

  function render() {
    ctx.clearRect(0, 0, width, height);

    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    angleY += 0.008 + mouse.x;
    angleX += 0.004 + mouse.y;

    const centerX = width / 2;
    const centerY = height / 2;
    const fov = 350;

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

      // Click ripple impulse
      if (burstRadius > 0 && burstRadius < 180) {
        const distFromCenter = Math.sqrt(x1 * x1 + y2 * y2);
        const wave = Math.sin((distFromCenter - burstRadius) * 0.1);
        if (Math.abs(distFromCenter - burstRadius) < 30) {
          x1 += (x1 / distFromCenter) * wave * 12;
          y2 += (y2 / distFromCenter) * wave * 12;
        }
      }

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

    if (burstRadius > 0) {
      burstRadius += 6;
      if (burstRadius > 220) burstRadius = 0;
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
          ctx.strokeStyle = `rgba(210, 255, 0, ${0.28 * (1 - dist / 75)})`;
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
        ctx.fillStyle = 'rgba(210, 255, 0, 0.22)';
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;

    // Central HUD Crosshair Ring
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

/* ==========================================================================
   12. WEB AUDIO API & SOUNDTRACK PLAYER
   ========================================================================== */
function initAudioFeedback() {
  const toggleBtn = document.getElementById('audioToggle');
  const dock = document.getElementById('cyberAudioDock');
  const playBtn = document.getElementById('cyberPlayBtn');
  const playIcon = document.getElementById('playIcon');
  const pauseIcon = document.getElementById('pauseIcon');

  let audioCtx = null;
  let audioEnabled = false;

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
        console.log('Playback requires user interaction', err);
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

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => setAudioState(!audioEnabled));
  }

  if (playBtn) {
    playBtn.addEventListener('click', () => setAudioState(!audioEnabled));
  }

  const interactives = document.querySelectorAll('.btn, .btn-w, .nav-link, .destaque-card, .social-btn');
  interactives.forEach(elem => {
    elem.addEventListener('mouseenter', () => playTone(520, 'triangle', 0.04));
    elem.addEventListener('click', () => playTone(1040, 'square', 0.08));
  });
}

/* ==========================================================================
   13. STATS COUNTER ANIMATION
   ========================================================================== */
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
    const easeProgress = 1 - Math.pow(1 - progress, 3);
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

/* ==========================================================================
   14. EMAIL QUICK-COPY WITH TOAST NOTIFICATION
   ========================================================================== */
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

/* ==========================================================================
   15. MOBILE NAVIGATION MENU
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');

  if (!menuBtn || !mainNav) return;

  menuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('mobile-active');
    menuBtn.textContent = mainNav.classList.contains('mobile-active') ? 'FECHAR ✕' : 'MENU ☰';
  });

  const navLinks = mainNav.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('mobile-active');
      menuBtn.textContent = 'MENU ☰';
    });
  });
}
