<script setup lang="ts">
useHead({
  title: 'yogi regestrawan. — Roblox Developer · Photographer · Designer',
  meta: [
    {
      name: 'description',
      content: 'Visual stories & digital worlds. Roblox developer, photographer, and designer based in Indonesia.',
    },
  ],
})

// Skill cards data
const skills = [
  {
    id: 'roblox',
    icon: 'gamepad',
    title: 'Roblox Developer',
    desc: 'Lua scripting in Roblox Studio — maps, gameplay mechanics, and game systems.',
    link: '/work/roblox',
    linkLabel: 'View Roblox Projects',
  },
  {
    id: 'photo',
    icon: 'camera',
    title: 'Photography',
    desc: 'Maternity, campus events, and candid photography. Before/After edit comparisons available.',
    link: '/work/photo',
    linkLabel: 'View Photo Gallery',
  },
  {
    id: 'design',
    icon: 'pen',
    title: 'Graphic Design',
    desc: 'Logo and brand content for small businesses. Designs that speak for themselves.',
    link: '/work/design',
    linkLabel: 'View Designs',
  },
]
</script>

<template>
  <div class="home">
    <!-- ═══════════════════════════════════════════════════════
         SECTION 1 — HERO
    ════════════════════════════════════════════════════════ -->
    <section class="hero" aria-label="Hero section">
      <div class="hero__inner">
        <!-- Left: Text content -->
        <div class="hero__content">
          <!-- Open for work badge -->
          <div class="hero__badge" role="status" aria-label="Status: Open for work">
            <span class="hero__badge-dot" aria-hidden="true" />
            <span class="hero__badge-text">Open for work</span>
          </div>

          <!-- Heading -->
          <h1 class="hero__heading">
            Visual stories<br />
            &amp; digital worlds.
          </h1>

          <!-- Subtext -->
          <p class="hero__sub">
            Roblox developer&nbsp;·&nbsp;Photographer&nbsp;·&nbsp;Designer
            <span class="hero__sub-location">— based in Indonesia.</span>
          </p>

          <!-- CTA Buttons -->
          <div class="hero__ctas">
            <NuxtLink to="/work/photo" class="btn btn--filled">
              View Work
              <!-- Arrow right icon -->
              <svg viewBox="0 0 20 20" fill="currentColor" class="btn__icon" aria-hidden="true">
                <path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clip-rule="evenodd" />
              </svg>
            </NuxtLink>
            <NuxtLink to="/about" class="btn btn--outlined">About Me</NuxtLink>
          </div>
        </div>

        <!-- Right: Profile placeholder -->
        <div class="hero__visual" aria-hidden="true">
          <div class="hero__photo-placeholder" style="padding: 0; background: none; border: none;">
            <img src="/images/20250822_190754_362.jpg" alt="Profile Photo" style="width: 100%; height: 100%; object-fit: cover; border-radius: var(--radius-xl);" />
          </div>
          <!-- Decorative corner tags -->
          <div class="hero__tag hero__tag--tl">IDN 🇮🇩</div>
          <div class="hero__tag hero__tag--br">Since 2025</div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════
         SECTION 2 — SKILL CARDS
    ════════════════════════════════════════════════════════ -->
    <section class="skills" aria-label="Areas of expertise">
      <div class="skills__inner">
        <p class="skills__eyebrow">What I can do</p>
        <h2 class="skills__heading">Areas of Expertise</h2>

        <div class="skills__grid" role="list">
          <article
            v-for="skill in skills"
            :key="skill.id"
            class="skill-card"
            role="listitem"
          >
            <!-- Icon -->
            <div class="skill-card__icon-wrap" aria-hidden="true">
              <!-- Gamepad icon -->
              <svg v-if="skill.icon === 'gamepad'" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="1.75" stroke-linecap="round"
                stroke-linejoin="round" class="skill-card__icon">
                <rect x="2" y="6" width="20" height="12" rx="4"/>
                <path d="M6 12h4M8 10v4"/>
                <circle cx="16" cy="11" r="1" fill="currentColor" stroke="none"/>
                <circle cx="18" cy="13" r="1" fill="currentColor" stroke="none"/>
              </svg>
              <!-- Camera icon -->
              <svg v-if="skill.icon === 'camera'" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="1.75" stroke-linecap="round"
                stroke-linejoin="round" class="skill-card__icon">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
              <!-- Pen icon -->
              <svg v-if="skill.icon === 'pen'" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="1.75" stroke-linecap="round"
                stroke-linejoin="round" class="skill-card__icon">
                <path d="M12 20h9"/>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
            </div>

            <!-- Text -->
            <div class="skill-card__body">
              <h3 class="skill-card__title">{{ skill.title }}</h3>
              <p class="skill-card__desc">{{ skill.desc }}</p>
            </div>

            <!-- Link -->
            <NuxtLink :to="skill.link" class="skill-card__link" :aria-label="skill.linkLabel">
              <span>View work</span>
              <svg viewBox="0 0 16 16" fill="currentColor" class="skill-card__arrow" aria-hidden="true">
                <path fill-rule="evenodd" d="M2 8a.5.5 0 01.5-.5h9.793L9.146 4.354a.5.5 0 11.708-.708l4 4a.5.5 0 010 .708l-4 4a.5.5 0 01-.708-.708L12.293 8.5H2.5A.5.5 0 012 8z"/>
              </svg>
            </NuxtLink>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ─── Page ───────────────────────────────────────────────────────────────────── */
.home {
  background-color: var(--color-bg);
}

/* ═══════════════════════════════════════════════════════
   HERO
════════════════════════════════════════════════════════ */
.hero {
  min-height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--color-border);
}

.hero__inner {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: var(--space-16);
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
  padding: var(--space-20) var(--space-6);
  width: 100%;
}

/* ─── Badge ──────────────────────────────────────────────────────────────────── */
.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  margin-bottom: var(--space-6);
  width: fit-content;
}

.hero__badge-dot {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background-color: var(--color-accent);
  flex-shrink: 0;
  /* Pulse animation */
  animation: pulse 2.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.6; transform: scale(0.85); }
}

.hero__badge-text {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-accent);
}

/* ─── Heading ────────────────────────────────────────────────────────────────── */
.hero__heading {
  font-family: var(--font-serif);
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: var(--font-regular);
  color: var(--color-text);
  line-height: 1.08;
  letter-spacing: -0.02em;
  margin-bottom: var(--space-6);
}

/* ─── Subtext ────────────────────────────────────────────────────────────────── */
.hero__sub {
  font-family: var(--font-sans);
  font-size: var(--text-lg);
  color: var(--color-muted);
  line-height: 1.6;
  margin-bottom: var(--space-10);
}

.hero__sub-location {
  display: inline-block;
}

/* ─── CTA buttons ────────────────────────────────────────────────────────────── */
.hero__ctas {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  text-decoration: none;
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-md);
  transition: opacity var(--transition-fast), background-color var(--transition-fast),
              color var(--transition-fast);
  cursor: pointer;
  white-space: nowrap;
}

.btn--filled {
  background-color: var(--color-accent);
  color: var(--color-accent-fg);
  border: 1px solid var(--color-accent);
}
.btn--filled:hover { opacity: 0.85; }

.btn--outlined {
  background-color: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-border);
}
.btn--outlined:hover {
  background-color: var(--color-surface-2);
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.btn__icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

/* ─── Photo placeholder ──────────────────────────────────────────────────────── */
.hero__visual {
  position: relative;
}

.hero__photo-placeholder {
  aspect-ratio: 3 / 4;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  color: var(--color-muted);
}

.hero__photo-icon {
  width: 80px;
  height: 90px;
  color: var(--color-muted);
}

.hero__photo-label {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-muted);
}

/* Decorative tags */
.hero__tag {
  position: absolute;
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  color: var(--color-text);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-2) var(--space-3);
}
.hero__tag--tl { top: -12px; left: -12px; }
.hero__tag--br { bottom: -12px; right: -12px; }

/* ═══════════════════════════════════════════════════════
   SKILLS SECTION
════════════════════════════════════════════════════════ */
.skills {
  padding: var(--space-20) var(--space-6);
}

.skills__inner {
  max-width: 1100px;
  margin: 0 auto;
}

.skills__eyebrow {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: var(--space-3);
  text-align: center;
}

.skills__heading {
  font-family: var(--font-serif);
  font-size: var(--text-4xl);
  font-weight: var(--font-regular);
  color: var(--color-text);
  text-align: center;
  margin-bottom: var(--space-12);
  line-height: 1.15;
}

/* ─── Card grid ──────────────────────────────────────────────────────────────── */
.skills__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}

/* ─── Individual card ────────────────────────────────────────────────────────── */
.skill-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  padding: var(--space-8);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  text-decoration: none;
  transition: background-color var(--transition-base), border-color var(--transition-base);
}

.skill-card:hover {
  background-color: var(--color-surface-2);
  border-color: var(--color-accent);
}

/* ─── Icon ───────────────────────────────────────────────────────────────────── */
.skill-card__icon-wrap {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  flex-shrink: 0;
}

.skill-card__icon {
  width: 24px;
  height: 24px;
  color: var(--color-accent);
}

/* ─── Body ───────────────────────────────────────────────────────────────────── */
.skill-card__body {
  flex: 1;
}

.skill-card__title {
  font-family: var(--font-sans);
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--color-text);
  margin-bottom: var(--space-3);
}

.skill-card__desc {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  color: var(--color-muted);
  line-height: 1.65;
}

/* ─── Link ───────────────────────────────────────────────────────────────────── */
.skill-card__link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--color-accent);
  text-decoration: none;
  padding-top: var(--space-3);
  border-top: 1px solid var(--color-border);
  transition: gap var(--transition-fast);
  margin-top: auto;
}
.skill-card__link:hover { gap: var(--space-3); }

.skill-card__arrow {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  transition: transform var(--transition-fast);
}
.skill-card__link:hover .skill-card__arrow {
  transform: translateX(3px);
}

/* ═══════════════════════════════════════════════════════
   RESPONSIVE
════════════════════════════════════════════════════════ */
@media (max-width: 900px) {
  .hero__inner {
    grid-template-columns: 1fr;
    gap: var(--space-10);
    padding: var(--space-16) var(--space-6);
  }

  .hero__visual {
    display: flex;
    justify-content: center;
    order: -1; /* foto di atas teks pada mobile */
  }

  .hero__photo-placeholder {
    max-width: 280px;
    width: 100%;
  }

  .skills__grid {
    grid-template-columns: 1fr;
    max-width: 480px;
    margin: 0 auto;
  }
}

@media (max-width: 640px) {
  .hero__heading {
    font-size: clamp(2rem, 8vw, 2.5rem);
  }

  .skills__heading {
    font-size: var(--text-3xl);
  }

  .skills {
    padding: var(--space-16) var(--space-4);
  }
}
</style>
