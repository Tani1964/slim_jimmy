import { useEffect } from 'react';
import gsap from 'gsap';

/* ─────────────────────────────────────────────
   Shared pools
───────────────────────────────────────────── */
const SPARKLES  = ['✨', '⭐', '💫', '✦', '·', '★'];
const CTA_EMOJIS = ['🎬', '🎨', '✨', '💫', '🚀', '🎯', '⭐', '🌟', '🎉', '💥', '🔥', '🎭'];
const PARTY     = ['🎉', '🎊', '🥳', '🎈', '✨', '💥', '🔥', '🌈', '🦋', '💎', '🌟', '🚀', '🎯', '🎨', '🎬', '💫', '⭐', '🎶', '🎵', '❤️'];

const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

/* ─────────────────────────────────────────────
   Core burst helper  (exported for Button / Header)
───────────────────────────────────────────── */
export const spawnEmojiBurst = (
  x: number,
  y: number,
  count = 8,
  pool = CTA_EMOJIS,
  maxDist = 110,
) => {
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.textContent = pick(pool);
    const size = Math.random() * 14 + 18;
    el.style.cssText = `position:fixed;left:${x}px;top:${y}px;pointer-events:none;font-size:${size}px;z-index:9999;user-select:none;transform:translate(-50%,-50%);`;
    document.body.appendChild(el);

    const angle = Math.random() * Math.PI * 2;
    const dist  = Math.random() * maxDist + 40;

    gsap.to(el, {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist - 30,
      opacity: 0,
      scale: Math.random() * 0.7 + 0.4,
      rotation: Math.random() * 540 - 270,
      duration: 0.75 + Math.random() * 0.5,
      ease: 'power2.out',
      delay: i * 0.03,
      onComplete: () => el.remove(),
    });
  }
};

/* ─────────────────────────────────────────────
   Full confetti rain  (Konami / avatar easter egg)
───────────────────────────────────────────── */
const launchParty = () => {
  const count = 60;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.textContent = pick(PARTY);
    const startX = Math.random() * window.innerWidth;
    const size   = Math.random() * 20 + 20;
    el.style.cssText = `position:fixed;left:${startX}px;top:-40px;pointer-events:none;font-size:${size}px;z-index:9999;user-select:none;`;
    document.body.appendChild(el);

    gsap.to(el, {
      y: window.innerHeight + 60,
      x: `+=${(Math.random() - 0.5) * 300}`,
      rotation: Math.random() * 720 - 360,
      opacity: 0,
      duration: 2 + Math.random() * 1.5,
      ease: 'power1.in',
      delay: Math.random() * 1.2,
      onComplete: () => el.remove(),
    });
  }
};

/* ─────────────────────────────────────────────
   Avatar / logo easter egg  (exported)
───────────────────────────────────────────── */
export const spawnAvatarEgg = (originEl: HTMLElement) => {
  const r   = originEl.getBoundingClientRect();
  const cx  = r.left + r.width  / 2;
  const cy  = r.top  + r.height / 2;
  spawnEmojiBurst(cx, cy, 24, CTA_EMOJIS, 220);
};

/* ─────────────────────────────────────────────
   Global component  (mount once in App)
   — cursor sparkle trail
   — Konami code detector
   — random idle floater every ~30 s
───────────────────────────────────────────── */
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

export const EmojiSurprises = () => {
  useEffect(() => {
    /* ── cursor sparkle trail (velocity-gated) ── */
    let lastX = 0, lastY = 0, lastTime = 0;

    const onMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime < 60) return;           // max ~16 fps
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const speed = Math.sqrt(dx * dx + dy * dy);
      lastX = e.clientX; lastY = e.clientY; lastTime = now;
      if (speed < 12) return;                     // only when moving fast

      const el = document.createElement('span');
      el.textContent = pick(SPARKLES);
      const size = Math.random() * 8 + 10;
      el.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;pointer-events:none;font-size:${size}px;z-index:9998;user-select:none;transform:translate(-50%,-50%);`;
      document.body.appendChild(el);

      gsap.to(el, {
        y: -35 - Math.random() * 20,
        x: (Math.random() - 0.5) * 24,
        opacity: 0,
        scale: 0.3,
        duration: 0.55 + Math.random() * 0.2,
        ease: 'power2.out',
        onComplete: () => el.remove(),
      });
    };

    /* ── Konami code ── */
    let seq: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      seq = [...seq.slice(-9), e.key];
      if (seq.join(',') === KONAMI.join(',')) {
        launchParty();
        seq = [];
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  return null;
};
