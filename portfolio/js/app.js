/**
 * RAJAT SARASWAT — CREATIVE TECHNOLOGIST & VISUAL PORTFOLIO CONTROLLER
 * Handles custom aperture cursor, Web Audio interaction, 24fps timecode,
 * cinema letterbox mode, showreel canvas visualizer, project filtering & modals.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Projects Data
  const projectsData = [
    {
      id: 'chronos',
      title: 'CHRONOS: THE PARADOX',
      category: 'virtual-production',
      categoryLabel: 'Virtual Production / Feature Film',
      year: '2026',
      aspectRatio: '2.39:1',
      aspectClass: '239',
      image: 'assets/images/chronos.jpg',
      logline: 'An exploratory astronaut confronts a temporal monolith in the volcanic black sand tundras of Iceland, shattering the continuum of human perception.',
      synopsis: 'Shot using groundbreaking in-camera visual effects (ICVFX) across a 180-degree LED volume stage in London and on location across the glacial sands of Vik, Chronos fuses raw landscape cinematography with Unreal Engine 5 quantum simulations.',
      specs: {
        camera: 'ARRI ALEXA 65 (6.5K Open Gate)',
        lenses: 'Hasselblad Prime DNA Anamorphic',
        aspect: '2.39:1 CinemaScope',
        color: 'ACEScc • Kodak 2383 Film LUT',
        sound: 'Dolby Atmos 7.1.4 Spatial Mix',
        tools: 'Unreal Engine 5.4, DaVinci Resolve'
      },
      tags: ['Unreal Engine 5', 'ARRI Alexa 65', 'LED Volume', 'ACEScc', 'Dolby Atmos']
    },
    {
      id: 'neotokyo',
      title: 'NEO-TOKYO 2099',
      category: 'feature-film',
      categoryLabel: 'Sci-Fi / Narrative Cinema',
      year: '2025',
      aspectRatio: '2.39:1',
      aspectClass: '239',
      image: 'assets/images/neotokyo.jpg',
      logline: 'Beneath torrential acid rain and towering holographic shrines, a memory broker searches for the final untainted human consciousness in the subterranean alleys of Shibuya.',
      synopsis: 'A high-contrast neo-noir visual study capturing rain reflections, neon bleed, and atmospheric volumetric smoke. Built with physical practical lighting rigs intertwined with real-time digital crowd simulations.',
      specs: {
        camera: 'RED V-RAPTOR XL 8K VV',
        lenses: 'Cooke Anamorphic /i Full Frame Plus',
        aspect: '2.39:1 Widescreen',
        color: 'DaVinci Wide Gamut • Custom Grain Stock',
        sound: 'Synthesizer Drone & Spatial Sound Design',
        tools: 'Maya, Houdini FX, DaVinci Resolve Studio'
      },
      tags: ['8K HDR', 'Cooke Anamorphic', 'Blade Runner Aesthetic', 'Houdini FX']
    },
    {
      id: 'sands',
      title: 'THE WHISPERING SANDS',
      category: 'commercials',
      categoryLabel: 'IMAX Documentary / Commercial',
      year: '2025',
      aspectRatio: '1.43:1',
      aspectClass: '169',
      image: 'assets/images/sands.jpg',
      logline: 'An intimate portrait of nomadic survival across the world’s most unforgiving desert dunes, capturing light shifting across millennia.',
      synopsis: 'Filmed over 60 days across the Rub\' al Khali and Sahara deserts. Natural solar lighting only, pushing ultra-high dynamic range sensors to preserve deep shadow gradients and blinding golden crest highlights.',
      specs: {
        camera: 'ARRI ALEXA LF Large Format',
        lenses: 'Panavision Ultra 70 Primes',
        aspect: '1.43:1 Native IMAX Aspect',
        color: 'FilmLight Baselight Natural HDR Grade',
        sound: 'Binaural Field Recordings',
        tools: 'Baselight, Pro Tools Ultimate'
      },
      tags: ['IMAX 65mm', 'Natural Lighting', 'Desert Expedition', 'Baselight HDR']
    },
    {
      id: 'aeon',
      title: 'AEON CORE: SINGULARITY',
      category: '3d-art',
      categoryLabel: '3D Art / Interactive Installation',
      year: '2026',
      aspectRatio: '16:9',
      aspectClass: '169',
      image: 'assets/images/aeon.jpg',
      logline: 'A levitating obsidian artifact humming with bioluminescent quantum filaments, presented as an immersive audio-reactive gallery installation.',
      synopsis: 'Commissioned for the Venice Biennale of Digital Arts. The sculpture’s internal quantum filaments dynamically react to visitor proximity and ambient sound pressure using generative shaders.',
      specs: {
        camera: 'Procedural Raytraced Virtual Sensor',
        lenses: 'Custom Synthetic 35mm f/0.95 Optics',
        aspect: '16:9 Ultra HD 120fps',
        color: 'ACEScg Wide Color Space',
        sound: 'Generative Modular Web Audio Drone',
        tools: 'Octane Render, TouchDesigner, Three.js'
      },
      tags: ['TouchDesigner', 'Octane Render', 'Audio-Reactive', 'Venice Biennale']
    }
  ];

  // 2. DOM Elements
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  const cursorLabel = document.getElementById('cursorLabel');
  const spotlight = document.getElementById('cinematicSpotlight');
  const timecodeEl = document.getElementById('liveTimecode');
  const audioBtn = document.getElementById('audioToggleBtn');
  const audioBtnText = document.getElementById('audioBtnText');
  const audioQuirkSub = document.getElementById('audioQuirkSub');
  const cinemaModeBtn = document.getElementById('cinemaModeBtn');
  const cinemaModeText = document.getElementById('cinemaModeText');
  const showreelBtn = document.getElementById('watchShowreelBtn');
  const showreelModal = document.getElementById('showreelModal');
  const closeShowreelBtn = document.getElementById('closeShowreelBtn');
  const projectModal = document.getElementById('projectDetailModal');
  const closeProjectModalBtn = document.getElementById('closeProjectModalBtn');
  const creditsOverlay = document.getElementById('creditsOverlay');
  const rollCreditsBtn = document.getElementById('rollCreditsBtn');
  const closeCreditsBtn = document.getElementById('closeCreditsBtn');
  const projectsGrid = document.getElementById('projectsGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const hudRecIndicator = document.getElementById('hudRecIndicator');
  const recStatusLabel = document.getElementById('recStatusLabel');
  const hudCoordinates = document.getElementById('hudCoordinates');
  const idleToast = document.getElementById('idleToast');
  const closeIdleToastBtn = document.getElementById('closeIdleToastBtn');
  const directorMistakeBtn = document.getElementById('directorMistakeBtn');
  const directorMistakePopup = document.getElementById('directorMistakePopup');
  const openDeletedFrameBtn = document.getElementById('openDeletedFrameBtn');
  const deletedFrameModal = document.getElementById('deletedFrameModal');
  const closeDeletedFrameBtn = document.getElementById('closeDeletedFrameBtn');
  const restoreTimelineBtn = document.getElementById('restoreTimelineBtn');

  // =========================================================================
  // CINEMATIC ENTRANCE LOADING SEQUENCE
  // =========================================================================
  const loader = document.getElementById('cinematicLoader');
  const loaderFill = document.getElementById('loaderProgressFill');
  const loaderCounter = document.getElementById('loaderCounter');
  const loaderSkipBtn = document.getElementById('loaderSkipBtn');
  let loadProgress = 0;
  let hasFinishedLoading = false;

  function finishLoadingSequence() {
    if (hasFinishedLoading) return;
    hasFinishedLoading = true;
    if (loaderFill) loaderFill.style.width = '100%';
    if (loaderCounter) loaderCounter.textContent = '100%';

    setTimeout(() => {
      loader?.classList.add('is-loaded');
      window.cinematicAudio?.playClick();
      triggerScrollReveals();
    }, 280);
  }

  const loadInterval = setInterval(() => {
    loadProgress += Math.floor(Math.random() * 8) + 4;
    if (loadProgress >= 100) {
      loadProgress = 100;
      clearInterval(loadInterval);
      finishLoadingSequence();
    }
    if (loaderFill) loaderFill.style.width = `${loadProgress}%`;
    if (loaderCounter) loaderCounter.textContent = `${String(loadProgress).padStart(2, '0')}%`;
  }, 40);

  if (loaderSkipBtn) {
    loaderSkipBtn.addEventListener('click', () => {
      clearInterval(loadInterval);
      finishLoadingSequence();
    });
  }
  if (loader) {
    loader.addEventListener('click', () => {
      clearInterval(loadInterval);
      finishLoadingSequence();
    });
  }

  // 3. Custom Aperture Cursor & Spotlight Tracking
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (!isTouchDevice) {
    document.body.classList.add('has-custom-cursor');

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (cursorDot) {
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
      }

      if (cursorLabel) {
        cursorLabel.style.left = `${mouseX}px`;
        cursorLabel.style.top = `${mouseY}px`;
      }

      // Update Spotlight position
      document.documentElement.style.setProperty('--mouse-x', `${mouseX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${mouseY}px`);

      // Mouse Heading Movement (2–5px range)
      const normX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const normY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      document.documentElement.style.setProperty('--heading-offset-x', `${(normX * 4).toFixed(1)}px`);
      document.documentElement.style.setProperty('--heading-offset-y', `${(normY * 4).toFixed(1)}px`);
    });

    // Parallax on Scroll for Hero Background
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      document.documentElement.style.setProperty('--hero-bg-parallax', `${(scrollY * 0.22).toFixed(1)}px`);
    }, { passive: true });

    // Smooth Lerp for Cursor Ring
    function animateCursorRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (cursorRing) {
        cursorRing.style.left = `${ringX}px`;
        cursorRing.style.top = `${ringY}px`;
      }
      requestAnimationFrame(animateCursorRing);
    }
    requestAnimationFrame(animateCursorRing);

    // Click feedback
    window.addEventListener('mousedown', () => {
      cursorRing?.classList.add('is-clicking');
      window.cinematicAudio?.playClick();
    });

    window.addEventListener('mouseup', () => {
      cursorRing?.classList.remove('is-clicking');
    });

    // Magnetic Button Effect on Key Controls
    const magneticTargets = document.querySelectorAll('.btn-cinema-primary, .btn-cinema-secondary, .btn-hud, .btn-slate-clap, .brand-logo-mark');
    magneticTargets.forEach((btn) => {
      btn.classList.add('magnetic-btn');
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const deltaX = (e.clientX - (rect.left + rect.width / 2)) * 0.28;
        const deltaY = (e.clientY - (rect.top + rect.height / 2)) * 0.28;
        btn.style.transform = `translate3d(${deltaX.toFixed(1)}px, ${deltaY.toFixed(1)}px, 0)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });

    // Interactive element hover detection
    function bindCursorInteractions() {
      const interactives = document.querySelectorAll('a, button, .project-card, .filter-btn, input, textarea, .module-card');
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          cursorRing?.classList.add('is-hovering');
          window.cinematicAudio?.playHover();
        });
        el.addEventListener('mouseleave', () => {
          cursorRing?.classList.remove('is-hovering');
        });
      });
    }
    bindCursorInteractions();
  }

  // Smooth Scroll on Navigation Links with Subtle Acoustic Blip
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const el = document.querySelector(targetId);
        if (el) {
          window.cinematicAudio?.playHover();
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // 4. SMPTE 24fps Live Timecode Generator
  let frame = 12;
  let second = new Date().getSeconds();
  let minute = new Date().getMinutes();
  let hour = new Date().getHours();

  function updateTimecode() {
    frame++;
    if (frame >= 24) {
      frame = 0;
      second++;
      if (second >= 60) {
        second = 0;
        minute++;
        if (minute >= 60) {
          minute = 0;
          hour = (hour + 1) % 24;
        }
      }
    }

    const pad = (n) => String(n).padStart(2, '0');
    if (timecodeEl) {
      timecodeEl.textContent = `${pad(hour)}:${pad(minute)}:${pad(second)}:${pad(frame)}`;
    }
  }
  setInterval(updateTimecode, 1000 / 24);

  // 5. Audio Toggle with Quirky State
  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      const isPlaying = window.cinematicAudio.toggleSound();
      if (isPlaying) {
        audioBtn.classList.add('playing');
        if (audioBtnText) audioBtnText.textContent = 'SOUND: ON';
        if (audioQuirkSub) {
          audioQuirkSub.classList.add('active');
          setTimeout(() => {
            audioQuirkSub.classList.remove('active');
          }, 3800);
        }
      } else {
        audioBtn.classList.remove('playing');
        if (audioBtnText) audioBtnText.textContent = 'SOUND: OFF';
        if (audioQuirkSub) audioQuirkSub.classList.remove('active');
      }
    });
  }

  // Easter Egg: REC Indicator Click (Director is Watching)
  let isRecAlertActive = false;
  if (hudRecIndicator) {
    hudRecIndicator.addEventListener('click', () => {
      if (isRecAlertActive) return;
      isRecAlertActive = true;
      hudRecIndicator.classList.add('director-watching');
      if (recStatusLabel) {
        recStatusLabel.innerHTML = `REC [24 FPS]<span style="font-size: 8px; color: #ff334b; display: block; letter-spacing: 0.12em;">DIRECTOR IS WATCHING</span>`;
      }
      window.cinematicAudio?.playClick();

      setTimeout(() => {
        hudRecIndicator.classList.remove('director-watching');
        if (recStatusLabel) recStatusLabel.textContent = 'REC [24 FPS]';
        isRecAlertActive = false;
      }, 3400);
    });
  }

  // Easter Egg: Periodic Coordinates Glitch
  const glitchCoords = ['0x28.38::ERR_SYNC', '89°99\'X 00°00\'Y', 'SYS//POS_DRIFT', '0xFA3C::77°13\'E'];
  const defaultCoords = '28°38\'N 77°13\'E';

  function triggerCoordinatesGlitch() {
    if (!hudCoordinates) return;
    const randomGlitch = glitchCoords[Math.floor(Math.random() * glitchCoords.length)];
    hudCoordinates.textContent = randomGlitch;
    hudCoordinates.classList.add('is-glitching');

    setTimeout(() => {
      hudCoordinates.textContent = defaultCoords;
      hudCoordinates.classList.remove('is-glitching');
    }, 400);
  }
  setInterval(triggerCoordinatesGlitch, 12000);

  // Easter Egg: 20-Second Inactivity / Idle Status Toast
  let idleTimer = null;
  function showIdleToast() {
    idleToast?.classList.add('active');
    window.cinematicAudio?.playHover();
  }

  function resetIdleTimer() {
    if (idleToast?.classList.contains('active')) {
      setTimeout(() => {
        idleToast?.classList.remove('active');
      }, 4000);
    }
    clearTimeout(idleTimer);
    idleTimer = setTimeout(showIdleToast, 20000);
  }

  ['mousemove', 'keydown', 'scroll', 'touchstart'].forEach((evt) => {
    window.addEventListener(evt, resetIdleTimer, { passive: true });
  });
  resetIdleTimer();

  if (closeIdleToastBtn) {
    closeIdleToastBtn.addEventListener('click', () => {
      idleToast?.classList.remove('active');
    });
  }

  // 6. Cinema Mode (2.39:1 Anamorphic Widescreen) Toggle
  let isCinemaMode = false;
  if (cinemaModeBtn) {
    cinemaModeBtn.addEventListener('click', () => {
      isCinemaMode = !isCinemaMode;
      document.body.classList.toggle('cinema-mode-active', isCinemaMode);
      window.cinematicAudio?.playWhoosh();
      if (cinemaModeText) {
        cinemaModeText.textContent = isCinemaMode ? 'CINEMA: 2.39:1' : 'CINEMA MODE';
      }
    });
  }

  // 7. Render Projects Grid with REC Indicator & Smooth Filtering
  function renderProjects(filter = 'all') {
    if (!projectsGrid) return;
    projectsGrid.innerHTML = '';

    const filtered = filter === 'all'
      ? projectsData
      : projectsData.filter((p) => p.category === filter);

    filtered.forEach((p, idx) => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.setAttribute('data-id', p.id);

      const pillsHtml = p.tags
        .slice(0, 3)
        .map((t) => `<span class="tech-pill">${t}</span>`)
        .join('');

      card.innerHTML = `
        <div class="project-media-wrap">
          <img src="${p.image}" alt="${p.title}" class="project-thumb" loading="lazy" />
          <div class="project-rec-badge"><span class="project-rec-dot"></span> REC</div>
          <div class="project-aspect-tag flicker-badge">${p.aspectRatio}</div>
          <div class="project-overlay-scan"></div>
          <div class="project-hover-cta">
            <i class="fas fa-eye"></i> INSPECT ARCHIVE
          </div>
        </div>
        <div class="project-info">
          <div class="project-meta-row">
            <span class="project-category">SCENE // 0${idx + 1} — ${p.categoryLabel}</span>
            <span class="project-year">${p.year}</span>
          </div>
          <h3 class="project-name">${p.title}</h3>
          <p class="project-logline">${p.logline}</p>
          <div class="project-tech-pills">
            ${pillsHtml}
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        openProjectModal(p.id);
      });

      // Show 'VIEW FRAME →' cursor label on hover
      if (!isTouchDevice && cursorLabel) {
        card.addEventListener('mouseenter', () => {
          cursorLabel.classList.add('visible');
          cursorRing?.classList.add('is-hovering');
        });
        card.addEventListener('mouseleave', () => {
          cursorLabel.classList.remove('visible');
          cursorRing?.classList.remove('is-hovering');
        });
      }

      projectsGrid.appendChild(card);
    });
  }

  // Initial Render
  renderProjects();

  // Project Filtering with Smooth Animated Rearrangement
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      window.cinematicAudio?.playClick();

      // Fade/Scale out existing cards
      const currentCards = projectsGrid.querySelectorAll('.project-card');
      currentCards.forEach((c) => {
        c.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        c.style.opacity = '0';
        c.style.transform = 'scale(0.96)';
      });

      setTimeout(() => {
        renderProjects(filter);
        const newCards = projectsGrid.querySelectorAll('.project-card');
        newCards.forEach((c) => {
          c.style.opacity = '0';
          c.style.transform = 'scale(0.96)';
          requestAnimationFrame(() => {
            c.style.transition = 'opacity 0.4s var(--ease-cinematic), transform 0.4s var(--ease-cinematic)';
            c.style.opacity = '1';
            c.style.transform = 'scale(1)';
          });
        });
      }, 200);
    });
  });

  // 8. Project Details Modal
  function openProjectModal(projectId) {
    const project = projectsData.find((p) => p.id === projectId);
    if (!project) return;

    window.cinematicAudio?.playWhoosh();

    const bannerImg = document.getElementById('projectModalBanner');
    const catEl = document.getElementById('projectModalCategory');
    const titleEl = document.getElementById('projectModalTitle');
    const loglineEl = document.getElementById('projectModalLogline');
    const synopsisEl = document.getElementById('projectModalSynopsis');
    const specsContainer = document.getElementById('projectModalSpecs');

    if (bannerImg) bannerImg.src = project.image;
    if (catEl) catEl.textContent = `${project.year} • ${project.categoryLabel}`;
    if (titleEl) titleEl.textContent = project.title;
    if (loglineEl) loglineEl.textContent = `"${project.logline}"`;
    if (synopsisEl) synopsisEl.textContent = project.synopsis;

    if (specsContainer) {
      specsContainer.innerHTML = `
        <div class="spec-box">
          <span class="spec-title">PRIMARY CAMERA</span>
          <span class="spec-value">${project.specs.camera}</span>
        </div>
        <div class="spec-box">
          <span class="spec-title">ANAMORPHIC GLASS</span>
          <span class="spec-value">${project.specs.lenses}</span>
        </div>
        <div class="spec-box">
          <span class="spec-title">COLOR PIPELINE</span>
          <span class="spec-value">${project.specs.color}</span>
        </div>
        <div class="spec-box">
          <span class="spec-title">SPATIAL SOUND</span>
          <span class="spec-value">${project.specs.sound}</span>
        </div>
      `;
    }

    projectModal?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    projectModal?.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeProjectModalBtn) {
    closeProjectModalBtn.addEventListener('click', closeProjectModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeProjectModal();
    });
  }

  // 9. Interactive Showreel Player & Generative Canvas Simulation
  let canvasAnimationId = null;
  const canvas = document.getElementById('showreelCanvas');
  let ctx = null;
  if (canvas) {
    ctx = canvas.getContext('2d');
  }

  let isPlayingReel = true;
  let reelProgress = 25;
  const scrubProgressBar = document.getElementById('scrubProgress');
  const deckPlayBtn = document.getElementById('deckPlayBtn');
  const showreelViewport = document.getElementById('showreelViewport');
  const aspectBtns = document.querySelectorAll('.aspect-btn');

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
  }

  // Generative Canvas Visuals (Cinematic Nebulae, anamorphic streak, floating particles)
  const particles = [];
  for (let i = 0; i < 80; i++) {
    particles.push({
      x: Math.random() * 1200,
      y: Math.random() * 800,
      radius: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      color: Math.random() > 0.5 ? 'rgba(229, 176, 97,' : 'rgba(56, 217, 212,',
      alpha: Math.random() * 0.6 + 0.2
    });
  }

  let scanlineY = 0;

  function renderShowreelCanvas() {
    if (!ctx || !canvas) return;

    ctx.fillStyle = 'rgba(6, 8, 12, 0.25)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Deep cosmic center glow
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const gradient = ctx.createRadialGradient(cx, cy, 10, cx, cy, canvas.width * 0.6);
    gradient.addColorStop(0, 'rgba(56, 217, 212, 0.12)');
    gradient.addColorStop(0.4, 'rgba(229, 176, 97, 0.08)');
    gradient.addColorStop(1, 'rgba(6, 7, 10, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Anamorphic horizontal flare streak
    ctx.save();
    ctx.shadowColor = 'rgba(56, 217, 212, 0.8)';
    ctx.shadowBlur = 15;
    ctx.strokeStyle = 'rgba(56, 217, 212, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, cy);
    ctx.lineTo(canvas.width, cy);
    ctx.stroke();
    ctx.restore();

    // Floating Cinematic Stardust Particles
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color}${p.alpha})`;
      ctx.fill();
    });

    // 35mm Scan line sweep
    scanlineY = (scanlineY + 1.2) % canvas.height;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.fillRect(0, scanlineY, canvas.width, 2);

    // Cinema crosshair markings
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    // Center reticle
    ctx.moveTo(cx - 20, cy);
    ctx.lineTo(cx + 20, cy);
    ctx.moveTo(cx, cy - 20);
    ctx.lineTo(cx, cy + 20);
    ctx.stroke();

    // Text in center
    ctx.font = '600 13px "JetBrains Mono"';
    ctx.fillStyle = 'rgba(229, 176, 97, 0.7)';
    ctx.textAlign = 'center';
    ctx.fillText('DIRECTOR SHOWREEL // 4K 24FPS ACES', cx, cy + 45);

    // Progress scrub update if playing
    if (isPlayingReel) {
      reelProgress += 0.04;
      if (reelProgress > 100) reelProgress = 0;
      if (scrubProgressBar) {
        scrubProgressBar.style.width = `${reelProgress}%`;
      }
    }

    canvasAnimationId = requestAnimationFrame(renderShowreelCanvas);
  }

  function openShowreel() {
    showreelModal?.classList.add('open');
    document.body.style.overflow = 'hidden';
    window.cinematicAudio?.playWhoosh();
    resizeCanvas();
    if (!canvasAnimationId) {
      renderShowreelCanvas();
    }
  }

  function closeShowreel() {
    showreelModal?.classList.remove('open');
    document.body.style.overflow = '';
    if (canvasAnimationId) {
      cancelAnimationFrame(canvasAnimationId);
      canvasAnimationId = null;
    }
  }

  if (showreelBtn) showreelBtn.addEventListener('click', openShowreel);
  if (closeShowreelBtn) closeShowreelBtn.addEventListener('click', closeShowreel);
  if (showreelModal) {
    showreelModal.addEventListener('click', (e) => {
      if (e.target === showreelModal) closeShowreel();
    });
  }

  window.addEventListener('resize', () => {
    if (showreelModal?.classList.contains('open')) {
      resizeCanvas();
    }
  });

  // Deck Play/Pause Toggle
  if (deckPlayBtn) {
    deckPlayBtn.addEventListener('click', () => {
      isPlayingReel = !isPlayingReel;
      deckPlayBtn.innerHTML = isPlayingReel ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
      window.cinematicAudio?.playClick();
    });
  }

  // Aspect ratio switcher in showreel
  aspectBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      aspectBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const ratio = btn.getAttribute('data-ratio');
      if (showreelViewport) {
        showreelViewport.className = `showreel-viewport ratio-${ratio}`;
        setTimeout(resizeCanvas, 300);
      }
      window.cinematicAudio?.playClick();
    });
  });

  // Timeline scrub click
  const scrubTimeline = document.getElementById('scrubTimeline');
  if (scrubTimeline) {
    scrubTimeline.addEventListener('click', (e) => {
      const rect = scrubTimeline.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      reelProgress = (clickX / rect.width) * 100;
      if (scrubProgressBar) {
        scrubProgressBar.style.width = `${reelProgress}%`;
      }
      window.cinematicAudio?.playClick();
    });
  }

  // 10. Clapperboard Contact Slate Form & Transmission Dispatch
  const contactForm = document.getElementById('slateContactForm');
  const slateTakeNum = document.getElementById('slateTakeNum');
  const slateSceneNum = document.getElementById('slateSceneNum');
  const dispatchBtn = document.getElementById('dispatchSubmitBtn');
  const dispatchBtnText = document.getElementById('dispatchBtnText');
  const terminalLog = document.getElementById('terminalDispatchLog');

  if (slateSceneNum) {
    slateSceneNum.textContent = String(new Date().getDate()).padStart(2, '0');
  }
  if (slateTakeNum) {
    slateTakeNum.textContent = String((new Date().getSeconds() % 10) + 1).padStart(2, '0');
  }

  if (dispatchBtn) {
    dispatchBtn.addEventListener('mouseenter', () => {
      if (!dispatchBtn.disabled && dispatchBtnText) {
        dispatchBtnText.textContent = 'ESTABLISH CONNECTION →';
      }
    });
    dispatchBtn.addEventListener('mouseleave', () => {
      if (!dispatchBtn.disabled && dispatchBtnText) {
        dispatchBtnText.textContent = 'SEND TRANSMISSION →';
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      window.cinematicAudio?.playClick();

      if (dispatchBtn) {
        dispatchBtn.disabled = true;
        dispatchBtn.style.background = 'var(--accent-cyan)';
        dispatchBtn.style.color = '#06070a';
        if (dispatchBtnText) dispatchBtnText.textContent = 'TRANSMITTING...';
      }

      if (terminalLog) {
        terminalLog.classList.add('active');
        terminalLog.innerHTML = `<div>&gt; INITIALIZING FREQUENCY 28.38 GHz... [LOCKED]</div>`;

        setTimeout(() => {
          terminalLog.innerHTML += `<div>&gt; ENCRYPTING PAYLOAD &amp; TELEMETRY... [100%]</div>`;
        }, 450);

        setTimeout(() => {
          terminalLog.innerHTML += `<div>&gt; DISPATCHING SIGNAL TO SARASWAT LABS... [SENT]</div>`;
          window.cinematicAudio?.playHover();
        }, 950);

        setTimeout(() => {
          terminalLog.innerHTML += `<div style="color: var(--accent-gold); font-weight: 700;">&gt; TRANSMISSION CONFIRMED. SLATE CLAPPED. RAJAT SARASWAT WILL REVIEW WITHIN 24H.</div>`;
          window.cinematicAudio?.playWhoosh();
          contactForm.reset();
        }, 1600);

        setTimeout(() => {
          if (dispatchBtn) {
            dispatchBtn.disabled = false;
            dispatchBtn.style.background = '';
            dispatchBtn.style.color = '';
            if (dispatchBtnText) dispatchBtnText.textContent = 'SEND TRANSMISSION →';
          }
          terminalLog.classList.remove('active');
          terminalLog.innerHTML = '';
        }, 6000);
      }
    });
  }

  // Director's Mistake Easter Egg
  if (directorMistakeBtn) {
    directorMistakeBtn.addEventListener('click', () => {
      directorMistakePopup?.classList.toggle('visible');
      window.cinematicAudio?.playClick();
      setTimeout(() => {
        directorMistakePopup?.classList.remove('visible');
      }, 3500);
    });
  }

  // 11. End Credits Roll Easter Egg
  if (rollCreditsBtn) {
    rollCreditsBtn.addEventListener('click', () => {
      creditsOverlay?.classList.add('active');
      document.body.style.overflow = 'hidden';
      window.cinematicAudio?.playWhoosh();
    });
  }

  if (closeCreditsBtn) {
    closeCreditsBtn.addEventListener('click', () => {
      creditsOverlay?.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // 12. 404 Deleted Frame Modal Easter Egg
  function openDeletedFrame() {
    deletedFrameModal?.classList.add('open');
    document.body.style.overflow = 'hidden';
    window.cinematicAudio?.playWhoosh();
  }

  function closeDeletedFrame() {
    deletedFrameModal?.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (openDeletedFrameBtn) openDeletedFrameBtn.addEventListener('click', openDeletedFrame);
  if (closeDeletedFrameBtn) closeDeletedFrameBtn.addEventListener('click', closeDeletedFrame);
  if (restoreTimelineBtn) restoreTimelineBtn.addEventListener('click', closeDeletedFrame);
  if (deletedFrameModal) {
    deletedFrameModal.addEventListener('click', (e) => {
      if (e.target === deletedFrameModal) closeDeletedFrame();
    });
  }

  // Global ESC key listener for all modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeShowreel();
      closeProjectModal();
      closeDeletedFrame();
      creditsOverlay?.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // 13. Scroll Reveal Observer for Headings, Lines & Module Cards
  function triggerScrollReveals() {
    const reveals = document.querySelectorAll('.cinematic-heading-reveal, .manifesto-line, .module-card');
    if (!('IntersectionObserver' in window)) {
      reveals.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        }
      });
    }, { threshold: 0.1 });

    reveals.forEach((el) => observer.observe(el));
  }
  triggerScrollReveals();
});
