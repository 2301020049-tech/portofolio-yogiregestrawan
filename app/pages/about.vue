<script setup lang="ts">
useHead({
  title: 'About Me | Portfolio',
  meta: [
    {
      name: 'description',
      content: 'Learn more about me — a passionate Roblox developer, photographer, and graphic designer based in Indonesia.',
    },
  ],
})

const tools = [
  'Roblox Studio', 'Lua', 'Figma', 'Adobe Illustrator',
  'Nikon D7000', 'Lightroom', 'Git'
]

const experiences = [
  {
    year: '2025',
    title: 'Roblox Developer',
    desc: 'Led a small team in creating immersive Roblox experiences, handling both Lua scripting and map design.'
  },
  {
    year: '2024',
    title: 'Freelance Photographer & Designer',
    desc: 'Provided photography services for campus events and designed brand identities for local businesses.'
  },
]
</script>

<template>
  <div class="about-page">
    <div class="about-page__inner">
      
      <!-- Header -->
      <header class="about-header">
        <div class="about-header__photo" style="padding: 0; border: none;">
          <img src="/images/20250822_190754_362.jpg" alt="Yogi Regestrawan" style="width: 100%; height: 100%; object-fit: cover;" />
        </div>
        <h1 class="about-header__name">Yogi Regestrawan</h1>
        <p class="about-header__tagline">Roblox Developer · Photographer · Designer</p>
      </header>

      <div class="about-content">
        <!-- About Me Bio -->
        <section class="about-section" aria-labelledby="about-me-title">
          <h2 id="about-me-title" class="about-section__title">About Me</h2>
          <p class="about-section__text">
            I am a multi-disciplinary creator based in Indonesia, specializing in building engaging digital worlds and capturing authentic moments. Whether I'm scripting complex game mechanics in Lua, designing intuitive user interfaces, or photographing memorable events, I always strive to blend technical precision with creative vision. My goal is to craft experiences that leave a lasting impact.
          </p>
        </section>

        <!-- Tools & Stack -->
        <section class="about-section" aria-labelledby="tools-stack-title">
          <h2 id="tools-stack-title" class="about-section__title">Tools & Stack</h2>
          <div class="about-tools">
            <span v-for="tool in tools" :key="tool" class="tool-chip">
              {{ tool }}
            </span>
          </div>
        </section>

        <!-- Experience Timeline -->
        <section class="about-section" aria-labelledby="experience-title">
          <h2 id="experience-title" class="about-section__title">Experience</h2>
          <div class="timeline">
            <div v-for="(exp, index) in experiences" :key="index" class="timeline__item">
              <div class="timeline__marker">
                <span class="timeline__dot"></span>
                <span v-if="index !== experiences.length - 1" class="timeline__line"></span>
              </div>
              <div class="timeline__content">
                <span class="timeline__year">{{ exp.year }}</span>
                <h3 class="timeline__job-title">{{ exp.title }}</h3>
                <p class="timeline__job-desc">{{ exp.desc }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- CTA -->
        <div class="about-cta">
          <NuxtLink to="/contact" class="btn-hire">Let's Work Together</NuxtLink>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.about-page {
  min-height: 100vh;
  background-color: var(--color-bg);
  padding: var(--space-16) var(--space-6) var(--space-20);
}

.about-page__inner {
  max-width: 680px;
  margin: 0 auto;
}

/* ─── Header ─────────────────────────────────────────────────────────── */
.about-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: var(--space-16);
}

.about-header__photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-6);
  color: var(--color-muted);
  overflow: hidden;
}

.about-header__icon {
  width: 120px;
  height: 120px;
  margin-top: 20px;
}

.about-header__name {
  font-family: var(--font-serif);
  font-size: var(--text-4xl);
  font-weight: var(--font-regular);
  color: var(--color-text);
  margin-bottom: var(--space-2);
}

.about-header__tagline {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  color: var(--color-muted);
}

/* ─── Sections ───────────────────────────────────────────────────────── */
.about-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-16);
}

.about-section__title {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: var(--space-6);
}

.about-section__text {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  color: var(--color-muted);
  line-height: 1.8;
}

/* ─── Tools & Stack ──────────────────────────────────────────────────── */
.about-tools {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.tool-chip {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-text);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
}

/* ─── Timeline ───────────────────────────────────────────────────────── */
.timeline {
  display: flex;
  flex-direction: column;
}

.timeline__item {
  display: flex;
  gap: var(--space-6);
}

.timeline__marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 12px;
}

.timeline__dot {
  width: 12px;
  height: 12px;
  background-color: var(--color-surface);
  border: 2px solid var(--color-accent);
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 4px;
}

.timeline__line {
  width: 2px;
  flex-grow: 1;
  background-color: var(--color-border);
  margin: var(--space-2) 0;
}

.timeline__content {
  padding-bottom: var(--space-10);
}

.timeline__item:last-child .timeline__content {
  padding-bottom: 0;
}

.timeline__year {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--color-accent);
  display: block;
  margin-bottom: var(--space-1);
}

.timeline__job-title {
  font-family: var(--font-sans);
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--color-text);
  margin-bottom: var(--space-2);
}

.timeline__job-desc {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  color: var(--color-muted);
  line-height: 1.6;
}

/* ─── CTA ────────────────────────────────────────────────────────────── */
.about-cta {
  text-align: center;
  padding-top: var(--space-8);
  border-top: 1px solid var(--color-border);
}

.btn-hire {
  display: inline-flex;
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--color-accent-fg);
  background-color: var(--color-accent);
  text-decoration: none;
  padding: var(--space-4) var(--space-8);
  border-radius: var(--radius-md);
  transition: opacity var(--transition-fast);
}

.btn-hire:hover {
  opacity: 0.85;
}

/* ─── Responsive ─────────────────────────────────────────────────────── */
@media (max-width: 640px) {
  .about-page {
    padding: var(--space-10) var(--space-4) var(--space-16);
  }
}
</style>
