/* ============================================
   Do You Love Me? — App Logic
   ============================================ */

// --- STATE ---
const state = {
  noClicks: 0,
  maxPhase: 7,
  isCelebration: false,
  mouseX: 0,
  mouseY: 0,
  soundOn: false,
  thoughtTimer: null,
  factIndex: 0
};

// --- DOM ---
const $ = (id) => document.getElementById(id);

const canvas = $('bg-canvas');
const ctx = canvas.getContext('2d');
const introSplash = $('intro-splash');
const questionCard = $('question-card');
const letterCard = $('letter-card');
const btnYes = $('btn-yes');
const btnNo = $('btn-no');
const btnArea = $('btn-area');
const questionText = $('question-text');
const reactionText = $('reaction-text');
const moodFace = $('mood-face');
const moodFill = $('mood-fill');
const attemptCount = $('attempt-count');
const heartbreakVal = $('heartbreak-val');
const toastArea = $('toast-area');
const thoughtBubble = $('thought-bubble');
const thoughtText = $('thought-text');
const soundToggle = $('sound-toggle');
const soundIcon = $('sound-icon');
const soundLabel = $('sound-label');
const factText = $('fact-text');
const letterBody = $('letter-body');
const hugOverlay = $('hug-overlay');
const hugDismiss = $('hug-dismiss');
const cursorTrail = $('cursor-trail');

// --- FUN FACTS ---
const funFacts = [
  "Did you know? Hugging for 20 seconds releases oxytocin, which makes you trust someone more.",
  "Fun fact: Couples who laugh together stay together longer. Science said so.",
  "Love fact: Your heart actually syncs its beat with your partner's when you stare at each other.",
  "Did you know? Butterflies in your stomach are caused by adrenaline during fight-or-flight... or love.",
  "Fun fact: It only takes 4 minutes to decide if you like someone.",
  "Love fact: Cuddling releases natural painkillers. Free healthcare!",
  "Did you know? Falling in love has the same neurological effect as cocaine. You're basically a drug.",
  "Fun fact: A study found that looking at a photo of a loved one can reduce pain by up to 44%.",
  "Love fact: Couples who are too similar to each other are less likely to last. Differences are good!",
  "Did you know? The longest recorded marriage lasted 86 years. Goals."
];

// --- PHASE MESSAGES ---
const phaseMessages = [
  { question: "Do you love me?", reaction: "sachai answer dinu hai 🤞", face: "🥺" },
  { question: "Do you love me?", reaction: "really? 😭 ekchoti feri socha na…", face: "😮" },
  { question: "Do you love me?", reaction: "are you sure? yo answer ali suspicious lagyo 🤨", face: "😢" },
  { question: "Do you love me?", reaction: "wait wait wait… timro finger slip bhako ho ki? 👀", face: "😭" },
  { question: "Do you love me?", reaction: "okay but ma snacks ra unlimited attention dinchu ni 🍕", face: "😤" },
  { question: "Do you love me?", reaction: "bruh… timi ta mero emotional damage gardai chau 😭", face: "🥺" },
  { question: "Last chance… timi malai maya garchau ki ma roidim? 😭", reaction: "system le yo answer reject gardiyo. ramrari choose gara 😤", face: "😭" },
  { question: "Fine. I'll stop asking.", reaction: "…tara ma timilai ajhai pani maya garchu 💔", face: "💔" }
];

const thoughts = [
  "pls yes click gara 😭",
  "maile pura website banako yaar",
  "yo ta personal attack bho",
  "just click yes challenge impossible",
  "mero feelings ta crash bhairacha",
  "timro lagi yetro coding gare 😔",
  "aba ta daya gara",
  "plot twist: timi pani maya garchau",
  "ma emotionally bankrupt huna lage 😭",
  "yes click garda tax lagdaina hai"
];

const toastMessages = [
  "love probability recalculating…",
  "yo answer ali illegal cha 🚫",
  "emotional damage +20",
  "system recommends pressing Yes 💖",
  "warning: heartbreak critical huna lagyo",
  "invalid answer detected 😭",
  "timro choice le developer lai dukha lagyo",
  "retry garera Yes choose gara",
  "AI le bhanyo timi malai maya garchau",
  "server emotionally unstable cha"
];

const noButtonTexts = ["Maybe 😭", "Try Again", "Naiii", "Hmm 👀", "Illegal", "Think Again", "Suspicious", "No 😭"];

// --- AUDIO ENGINE (Web Audio API) ---
class Audio {
  constructor() {
    this.ctx = null;
    this.bgmInterval = null;
    this.bgmStep = 0;
    this.chords = [
      [174.61, 220.00, 261.63, 329.63],
      [196.00, 246.94, 293.66, 392.00],
      [164.81, 196.00, 246.94, 293.66],
      [220.00, 261.63, 329.63, 440.00]
    ];
  }

  init() {
    if (this.ctx) return;
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.startBGM();
    } catch (e) { /* no audio support */ }
  }

  startBGM() {
    if (this.bgmInterval) clearInterval(this.bgmInterval);
    this.bgmInterval = setInterval(() => {
      if (!state.soundOn || !this.ctx || this.ctx.state === 'suspended') return;
      this.bgmNote();
    }, 480);
  }

  bgmNote() {
    const ci = Math.floor(this.bgmStep / 8) % this.chords.length;
    const ni = this.bgmStep % 8;
    const chord = this.chords[ci];
    const pattern = [0, 1, 2, 3, 2, 1, 3, 0];
    const freq = chord[pattern[ni]];

    const osc = this.ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    const filt = this.ctx.createBiquadFilter();
    filt.type = 'lowpass';
    filt.frequency.setValueAtTime(500, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.035, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.9);

    osc.connect(filt).connect(gain).connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.95);
    this.bgmStep++;
  }

  pop() { this._tone('sine', 800, 1200, 0.06, 0.02); }
  sad() { this._tone('sawtooth', 280, 60, 0.2, 0.035); }
  yay() {
    if (!state.soundOn || !this.ctx) return;
    const now = this.ctx.currentTime;
    [523, 587, 659, 698, 784, 880, 988, 1047].forEach((f, i) => {
      const o = this.ctx.createOscillator(); o.type = 'sine';
      o.frequency.setValueAtTime(f, now + i * 0.06);
      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0.025, now + i * 0.06);
      g.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.06 + 0.5);
      o.connect(g).connect(this.ctx.destination);
      o.start(now + i * 0.06); o.stop(now + i * 0.06 + 0.55);
    });
  }

  _tone(type, f1, f2, dur, vol) {
    if (!state.soundOn || !this.ctx) return;
    const o = this.ctx.createOscillator(); o.type = type;
    o.frequency.setValueAtTime(f1, this.ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(f2, this.ctx.currentTime + dur);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(vol, this.ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + dur);
    o.connect(g).connect(this.ctx.destination);
    o.start(); o.stop(this.ctx.currentTime + dur + 0.02);
  }

  toggle() {
    this.init();
    state.soundOn = !state.soundOn;
    if (this.ctx) {
      state.soundOn ? this.ctx.resume() : this.ctx.suspend();
    }
    soundIcon.textContent = state.soundOn ? '🔊' : '🔇';
    soundLabel.textContent = state.soundOn ? 'music on' : 'music off';
  }
}

const audio = new Audio();

// --- PARTICLES ---
const particles = [];

class Particle {
  constructor(type, x, y) {
    this.type = type;
    this.x = x ?? Math.random() * canvas.width;
    this.y = y ?? (type === 'confetti' ? canvas.height / 2 : canvas.height + 20);
    this.size = type === 'confetti' ? Math.random() * 5 + 3 : Math.random() * 6 + 5;
    this.opacity = type === 'confetti' ? 1 : Math.random() * 0.25 + 0.08;
    this.life = 1;
    this.decay = Math.random() * 0.013 + 0.005;

    if (type === 'confetti') {
      const a = Math.random() * Math.PI * 2;
      const s = Math.random() * 7 + 3;
      this.vx = Math.cos(a) * s;
      this.vy = Math.sin(a) * s - 2;
      this.color = `hsl(${Math.random() * 360}, 85%, 65%)`;
    } else {
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = -(Math.random() * 0.5 + 0.2);
    }
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.type === 'confetti') {
      this.vy += 0.1;
      this.vx *= 0.98;
      this.life -= this.decay;
      this.opacity = this.life;
    } else if (this.y < -20) {
      this.y = canvas.height + 20;
      this.x = Math.random() * canvas.width;
    }
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.opacity);
    if (this.type === 'heart' || (this.type === 'confetti' && Math.random() > 0.6)) {
      drawHeart(ctx, this.x, this.y, this.size, this.type === 'confetti' ? this.color : 'rgba(255, 77, 138, 0.35)');
    } else if (this.type === 'confetti') {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = 'rgba(168, 85, 247, 0.15)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

function drawHeart(c, x, y, s, color) {
  c.fillStyle = color;
  c.beginPath();
  c.translate(x, y);
  c.moveTo(0, -s / 4);
  c.bezierCurveTo(s / 2, -s / 2, s, 0, 0, s * 0.65);
  c.bezierCurveTo(-s, 0, -s / 2, -s / 2, 0, -s / 4);
  c.fill();
  c.setTransform(1, 0, 0, 1, 0, 0);
}

function initParticles() {
  particles.length = 0;
  for (let i = 0; i < 30; i++) {
    particles.push(new Particle(Math.random() > 0.5 ? 'heart' : 'star'));
  }
}

function confettiBurst(x, y) {
  for (let i = 0; i < 60; i++) particles.push(new Particle('confetti', x, y));
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].draw();
    if (particles[i].type === 'confetti' && particles[i].life <= 0) particles.splice(i, 1);
  }
  requestAnimationFrame(animateParticles);
}

// --- CURSOR HEART TRAIL ---
let trailThrottle = 0;
window.addEventListener('mousemove', (e) => {
  state.mouseX = e.clientX;
  state.mouseY = e.clientY;

  // Spawn a tiny heart every ~80ms
  if (Date.now() - trailThrottle > 80) {
    trailThrottle = Date.now();
    const heart = document.createElement('div');
    heart.className = 'trail-heart';
    heart.textContent = ['💗', '💖', '✨', '💕', '♥'][Math.floor(Math.random() * 5)];
    heart.style.left = (e.clientX - 7) + 'px';
    heart.style.top = (e.clientY - 7) + 'px';
    cursorTrail.appendChild(heart);
    setTimeout(() => heart.remove(), 800);
  }
});

// --- TOAST SYSTEM ---
function showToast(msg) {
  const el = document.createElement('div');
  el.className = 'toast-msg';
  el.textContent = msg;
  toastArea.appendChild(el);
  setTimeout(() => el.remove(), 3200);
}

// --- THOUGHT BUBBLE ---
function showThought() {
  if (state.isCelebration) return;
  thoughtText.textContent = thoughts[Math.floor(Math.random() * thoughts.length)];
  thoughtBubble.classList.remove('hidden');
  clearTimeout(state.thoughtTimer);
  state.thoughtTimer = setTimeout(() => thoughtBubble.classList.add('hidden'), 3000);
}

// --- MOOD RING UPDATE ---
function updateMood() {
  const phase = Math.min(state.maxPhase, state.noClicks);
  const pm = phaseMessages[phase];

  moodFace.textContent = pm.face;

  // Circle fill: 276.46 circumference, phase 0 = nearly full, phase 7 = empty
  const fillRatio = 1 - (phase / state.maxPhase);
  const offset = 276.46 * (1 - fillRatio);
  moodFill.setAttribute('stroke-dashoffset', offset);

  // Change circle color with a gradient trick via inline style
  const hue = fillRatio * 330; // pink -> darker
  moodFill.setAttribute('stroke', `hsl(${hue}, 80%, 65%)`);
}

// --- FUN FACT ROTATOR ---
function rotateFact() {
  state.factIndex = (state.factIndex + 1) % funFacts.length;
  factText.style.opacity = '0';
  setTimeout(() => {
    factText.textContent = funFacts[state.factIndex];
    factText.style.opacity = '1';
  }, 300);
}

// --- NO BUTTON DODGE SYSTEM ---
const phaseConfig = {
  0: { range: 20,  candidates: 2,  step: 15,  speed: '0.4s'  },
  1: { range: 35,  candidates: 4,  step: 40,  speed: '0.32s' },
  2: { range: 55,  candidates: 6,  step: 70,  speed: '0.25s' },
  3: { range: 80,  candidates: 12, step: 120, speed: '0.18s' },
  4: { range: 110, candidates: 18, step: 800, speed: '0.1s'  },
  5: { range: 145, candidates: 28, step: 800, speed: '0.05s' },
  6: { range: 185, candidates: 45, step: 800, speed: '0s'    }
};

function dodgeNoButton() {
  const areaRect = btnArea.getBoundingClientRect();
  const noRect = btnNo.getBoundingClientRect();

  const maxL = Math.max(0, areaRect.width - noRect.width);
  const maxT = Math.max(0, areaRect.height - noRect.height);

  const mxRel = state.mouseX - areaRect.left;
  const myRel = state.mouseY - areaRect.top;

  const isFirstEscape = !btnNo.classList.contains('escaped');
  if (isFirstEscape) {
    const origL = btnNo.offsetLeft;
    const origT = btnNo.offsetTop;
    btnNo.classList.add('escaped');
    btnNo.style.left = origL + 'px';
    btnNo.style.top = origT + 'px';
  }

  const cfg = phaseConfig[Math.min(6, state.noClicks)] || phaseConfig[6];
  btnNo.style.setProperty('--dodge-speed', cfg.speed);

  const curL = btnNo.offsetLeft;
  const curT = btnNo.offsetTop;
  let bestL = curL, bestT = curT, bestDist = -1;

  for (let i = 0; i < cfg.candidates; i++) {
    const tL = Math.random() * maxL;
    const tT = Math.random() * maxT;
    if (Math.hypot(tL - curL, tT - curT) > cfg.step) continue;
    const d = Math.hypot(tL + noRect.width / 2 - mxRel, tT + noRect.height / 2 - myRel);
    if (d > bestDist) { bestDist = d; bestL = tL; bestT = tT; }
  }

  btnNo.style.left = bestL + 'px';
  btnNo.style.top = bestT + 'px';

  // Phase-specific visual tweaks
  let scale = 1, rot = 0;
  if (state.noClicks >= 2 && state.noClicks < 4) scale = 0.85;
  else if (state.noClicks >= 4 && state.noClicks < 6) { scale = 0.7; rot = (Math.random() > 0.5 ? 1 : -1) * 8; }
  else if (state.noClicks >= 6) { scale = 0.6; rot = (Math.random() > 0.5 ? 1 : -1) * 15; }
  btnNo.style.transform = `scale(${scale}) rotate(${rot}deg)`;

  // Phase 4+: change text randomly
  if (state.noClicks >= 4 && state.noClicks < 7) {
    btnNo.textContent = noButtonTexts[Math.floor(Math.random() * noButtonTexts.length)];
  }

  audio.pop();
}

// Mouse proximity check
window.addEventListener('mousemove', () => {
  if (state.isCelebration || state.noClicks >= state.maxPhase) return;
  const r = btnNo.getBoundingClientRect();
  const d = Math.hypot(state.mouseX - (r.left + r.width / 2), state.mouseY - (r.top + r.height / 2));
  const range = (phaseConfig[Math.min(6, state.noClicks)] || phaseConfig[6]).range;
  if (d < range) dodgeNoButton();
});

// Touch support
window.addEventListener('touchmove', (e) => {
  if (e.touches.length > 0) {
    state.mouseX = e.touches[0].clientX;
    state.mouseY = e.touches[0].clientY;
  }
  if (state.isCelebration || state.noClicks >= state.maxPhase) return;
  const r = btnNo.getBoundingClientRect();
  const d = Math.hypot(state.mouseX - (r.left + r.width / 2), state.mouseY - (r.top + r.height / 2));
  const range = (phaseConfig[Math.min(6, state.noClicks)] || phaseConfig[6]).range;
  if (d < range) dodgeNoButton();
});

// --- NO CLICK HANDLER ---
function handleNo() {
  const phase = Math.min(state.maxPhase - 1, state.noClicks);
  state.noClicks++;

  audio.sad();

  // Update counters
  attemptCount.textContent = state.noClicks;
  const hbPct = Math.min(100, state.noClicks * 14);
  heartbreakVal.textContent = hbPct + '%';

  // Update card text
  const nextPhase = Math.min(state.maxPhase, state.noClicks);
  const pm = phaseMessages[nextPhase];
  questionText.textContent = pm.question;
  reactionText.textContent = pm.reaction;

  // Update mood ring
  updateMood();

  // Toast
  showToast(toastMessages[Math.floor(Math.random() * toastMessages.length)]);

  // Show thought bubble randomly
  if (Math.random() > 0.4) showThought();

  // Phase 3: extra warning toast
  if (state.noClicks === 3) {
    setTimeout(() => showToast("⚠️ WARNING: heartbreak level increasing"), 800);
  }

  // Phase 7: disable the button
  if (state.noClicks >= state.maxPhase) {
    btnNo.classList.remove('escaped');
    btnNo.classList.add('disabled');
    btnNo.style.position = '';
    btnNo.style.left = '';
    btnNo.style.top = '';
    btnNo.style.transform = '';
    btnNo.textContent = "no option currently unavailable due to emotional damage";
    btnNo.disabled = true;
  }

  // Grow Yes button slightly with each rejection
  const yesScale = 1 + state.noClicks * 0.06;
  btnYes.style.transform = `scale(${Math.min(yesScale, 1.5)})`;
}

btnNo.addEventListener('click', (e) => { handleNo(); e.stopPropagation(); });

// --- YES HANDLER ---
function triggerYes() {
  if (state.isCelebration) return;
  state.isCelebration = true;

  audio.yay();

  // Confetti bursts
  const r = btnYes.getBoundingClientRect();
  confettiBurst(r.left + r.width / 2, r.top + r.height / 2);
  const cInterval = setInterval(() => {
    if (!state.isCelebration) return clearInterval(cInterval);
    confettiBurst(Math.random() * canvas.width, Math.random() * canvas.height * 0.5);
  }, 1400);

  // Swap cards
  questionCard.classList.add('hidden');
  letterCard.classList.remove('hidden');
  thoughtBubble.classList.add('hidden');
}

btnYes.addEventListener('click', triggerYes);

// --- END SCREEN ---
$('btn-read-again').addEventListener('click', () => {
  audio.pop();
  letterBody.scrollTo({ top: 0, behavior: 'smooth' });
});

$('btn-replay').addEventListener('click', () => {
  audio.pop();
  state.noClicks = 0;
  state.isCelebration = false;

  btnNo.disabled = false;
  btnNo.classList.remove('disabled', 'escaped');
  btnNo.style.cssText = '';
  btnNo.textContent = 'No 😭';

  btnYes.style.transform = '';

  const pm = phaseMessages[0];
  questionText.textContent = pm.question;
  reactionText.textContent = pm.reaction;
  moodFace.textContent = pm.face;
  attemptCount.textContent = '0';
  heartbreakVal.textContent = '0%';

  updateMood();

  letterCard.classList.add('hidden');
  questionCard.classList.remove('hidden');

  initParticles();
});

$('btn-hug').addEventListener('click', () => {
  audio.yay();
  hugOverlay.classList.remove('hidden');
});

hugDismiss.addEventListener('click', () => {
  hugOverlay.classList.add('hidden');
});

// --- SOUND TOGGLE ---
soundToggle.addEventListener('click', () => audio.toggle());

// --- KEYBOARD LOVE EASTER EGG ---
let keyBuf = '';
window.addEventListener('keydown', (e) => {
  keyBuf += e.key.toLowerCase();
  if (keyBuf.length > 20) keyBuf = keyBuf.slice(-20);
  if (keyBuf.includes('love')) {
    keyBuf = '';
    if (!state.isCelebration) triggerYes();
  }
});

// --- INIT ---
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('DOMContentLoaded', () => {
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  initParticles();
  animateParticles();
  updateMood();

  // Add SVG gradient definition for mood ring
  const svgNS = 'http://www.w3.org/2000/svg';
  const defs = document.createElementNS(svgNS, 'defs');
  const grad = document.createElementNS(svgNS, 'linearGradient');
  grad.id = 'mood-gradient';
  const s1 = document.createElementNS(svgNS, 'stop');
  s1.setAttribute('offset', '0%'); s1.setAttribute('stop-color', '#ff4d8a');
  const s2 = document.createElementNS(svgNS, 'stop');
  s2.setAttribute('offset', '100%'); s2.setAttribute('stop-color', '#a855f7');
  grad.appendChild(s1); grad.appendChild(s2);
  defs.appendChild(grad);
  document.querySelector('.mood-circle').prepend(defs);

  // Intro splash fade after 1.8s
  setTimeout(() => {
    introSplash.classList.add('fade-out');
    setTimeout(() => introSplash.remove(), 600);
  }, 1800);

  // Rotate fun facts every 8 seconds
  setInterval(rotateFact, 8000);

  // Random thought bubbles every 12-18 seconds
  setInterval(() => {
    if (!state.isCelebration && state.noClicks > 0) showThought();
  }, 14000);

  // Randomize initial fact
  state.factIndex = Math.floor(Math.random() * funFacts.length);
  factText.textContent = funFacts[state.factIndex];
});
