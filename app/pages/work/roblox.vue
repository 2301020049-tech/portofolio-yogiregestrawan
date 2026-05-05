<script setup lang="ts">
// ─── SEO ─────────────────────────────────────────────────────────────────────
useHead({
  title: 'Roblox Projects | Portfolio',
  meta: [
    {
      name: 'description',
      content: 'A collection of Roblox projects — Alchemy Lab, Sky Race, and Ant Kingdom Tycoon. Scripted with Lua in Roblox Studio.',
    },
  ],
})

// ─── Fetch data from @nuxt/content v3 ───────────────────────────────────────
const { data: projects, status } = await useAsyncData(
  'roblox-projects',
  () => queryCollection('projects')
    .where('category', '=', 'roblox')
    .order('year', 'DESC')
    .all(),
)

// Fallback: real data for 4 games if queryCollection has not resolved
const fallbackProjects = [
  {
    id: 'alchemy-lab',
    title: 'Alchemy Lab',
    description: 'A casual simulator where players take on the role of a potion maker. Gather magical ingredients from the forest, brew unique potions, sell them for coins, and upgrade your equipment and capacity.',
    features: ['Potion crafting system', 'Ingredient gathering', 'Upgrade system', 'Coin economy', 'Forest exploration'],
    year: 2024,
    thumbnail: '',
    robloxLink: 'https://www.roblox.com/games/71339412404479/Alchemy-Lab',
    tags: ['Casual', 'Simulator', 'Lua'],
    status: 'published',
    techStack: [] as string[],
  },
  {
    id: 'sky-race',
    title: 'Sky Race',
    description: 'A racing game with over 50 cars and 24 tracks for motorsport enthusiasts. From realistic races to fantasy themes — multiple track modes with an online leaderboard.',
    features: ['Online leaderboard', 'Multiplayer racing', 'Diverse themes'],
    year: 2024,
    thumbnail: '',
    robloxLink: 'https://www.roblox.com/games/122818539342526/Sky-Race',
    tags: ['Racing', 'Multiplayer', 'Lua'],
    status: 'published',
    techStack: [] as string[],
  },
  {
    id: 'ant-kingdom-tycoon',
    title: 'Ant Kingdom Tycoon',
    description: 'A sandbox tycoon where players build a vertical ant colony. Claim rare ant eggs from the giant machine at the center of the map, produce food, sell to buyers for cash, and build your nest as high as possible.',
    features: ['Vertical colony building', 'Egg conveyor system', 'Food production & sales', 'Upgrade system', 'VFX & animations'],
    year: 2024,
    thumbnail: '',
    robloxLink: 'https://www.roblox.com/games/112901443168287/Ant-Kingdom-Tycoon',
    tags: ['Tycoon', 'Sandbox', 'Lua'],
    status: 'published',
    techStack: ['Rojo', 'Knit', 'Roact', 'Rodux', 'RoactSpring'],
  },
  {
    id: 'roblox-wip-04',
    title: 'Untitled Project',
    description: 'A new game currently in active development. Details will be announced soon. Stay tuned!',
    features: ['In active development', 'More details soon'],
    year: 2025,
    thumbnail: '',
    robloxLink: '',
    tags: ['Lua', 'Coming Soon'],
    status: 'development',
    techStack: [] as string[],
  },
]

const displayProjects = computed(() =>
  (projects.value && projects.value.length > 0)
    ? projects.value
    : fallbackProjects,
)

// ─── Stats ────────────────────────────────────────────────────────────────────
const stats = [
  { label: 'Games published', value: '3' },
  { label: 'In development', value: '1' },
  { label: 'Language', value: 'Lua' },
]
</script>

<template>
  <div class="roblox-page">
    <!-- ─── Header ───────────────────────────────────────────────────────────── -->
    <header class="roblox-page__header">
      <div class="roblox-page__header-inner">
        <NuxtLink to="/" class="back-link" aria-label="Back to homepage">
          <svg viewBox="0 0 16 16" fill="currentColor" class="back-link__icon" aria-hidden="true">
            <path fill-rule="evenodd" d="M14 8a.5.5 0 01-.5.5H3.707l3.147 3.146a.5.5 0 01-.708.708l-4-4a.5.5 0 010-.708l4-4a.5.5 0 01.708.708L3.707 7.5H13.5A.5.5 0 0114 8z"/>
          </svg>
          <span>Home</span>
        </NuxtLink>

        <div class="roblox-page__text">
          <p class="roblox-page__eyebrow">
            <svg viewBox="0 0 20 20" fill="currentColor" class="roblox-page__eyebrow-icon" aria-hidden="true">
              <rect x="2" y="5" width="16" height="10" rx="3.5"/>
              <path d="M5 10h3M6.5 8.5v3" fill="none" stroke="var(--color-accent-fg)" stroke-width="1.5" stroke-linecap="round"/>
              <circle cx="13" cy="9" r="0.8" fill="var(--color-accent-fg)"/>
              <circle cx="15" cy="11" r="0.8" fill="var(--color-accent-fg)"/>
            </svg>
            Roblox Studio · Lua Scripting
          </p>
          <h1 class="roblox-page__title">Roblox Projects</h1>
          <p class="roblox-page__subtitle">
            Building interactive worlds in Roblox — from game mechanics to
            NPC behavior and leaderboards. Everything is scripted from scratch in Lua.
          </p>
        </div>

        <!-- Stats row -->
        <dl class="roblox-page__stats">
          <div v-for="stat in stats" :key="stat.label" class="roblox-page__stat">
            <dt class="roblox-page__stat-label">{{ stat.label }}</dt>
            <dd class="roblox-page__stat-value">{{ stat.value }}</dd>
          </div>
        </dl>
      </div>
    </header>

    <!-- ─── Projects Grid ────────────────────────────────────────────────────── -->
    <section class="projects" aria-label="Roblox Projects List">
      <div class="projects__inner">

        <div v-if="status === 'pending'" class="projects__loading" aria-live="polite">
          <!-- Loading state -->
          <div v-for="n in 2" :key="n" class="project-card project-card--skeleton" aria-hidden="true">
            <div class="project-card__thumb project-card__thumb--skeleton" />
            <div class="project-card__body">
              <div class="skeleton-line skeleton-line--title" />
              <div class="skeleton-line" />
              <div class="skeleton-line skeleton-line--short" />
            </div>
          </div>
        </div>

        <div v-else-if="displayProjects.length === 0" class="projects__empty">
          <!-- Empty state -->
          <p>No projects to display yet.</p>
        </div>

        <div v-else class="projects__grid">
          <!-- Projects grid -->
          <article
            v-for="project in displayProjects"
            :key="project.id"
            class="project-card"
            :class="{ 'project-card--wip': project.status === 'development' }"
          >
            <!-- Thumbnail -->
            <div class="project-card__thumb" aria-hidden="true">
              <div class="project-card__thumb-inner">
                <svg viewBox="0 0 200 112" class="project-card__thumb-svg" aria-hidden="true">
                  <rect width="200" height="112" fill="none"/>
                  <rect x="0" y="80" width="200" height="32" fill="currentColor" opacity="0.08"/>
                  <rect x="85" y="52" width="30" height="28" rx="3" fill="currentColor" opacity="0.18"/>
                  <rect x="90" y="42" width="20" height="14" rx="3" fill="currentColor" opacity="0.22"/>
                  <rect x="20" y="60" width="40" height="20" rx="2" fill="currentColor" opacity="0.1"/>
                  <rect x="28" y="48" width="24" height="14" rx="2" fill="currentColor" opacity="0.12"/>
                  <rect x="140" y="55" width="45" height="25" rx="2" fill="currentColor" opacity="0.1"/>
                  <rect x="150" y="43" width="25" height="14" rx="2" fill="currentColor" opacity="0.12"/>
                </svg>
                <!-- Status badge -->
                <span
                  class="project-card__status"
                  :class="project.status === 'development' ? 'project-card__status--wip' : 'project-card__status--live'"
                >
                  <span class="project-card__status-dot" aria-hidden="true" />
                  {{ project.status === 'development' ? 'In Development' : 'Live' }}
                </span>
                <span class="project-card__thumb-label">{{ project.year }}</span>
              </div>
            </div>

            <!-- Body -->
            <div class="project-card__body">
              <!-- Tags -->
              <div class="project-card__tags" aria-label="Tags project">
                <span
                  v-for="tag in project.tags"
                  :key="tag"
                  class="chip chip--tag"
                >{{ tag }}</span>
              </div>

              <h2 class="project-card__title">{{ project.title }}</h2>
              <p class="project-card__desc">{{ project.description }}</p>

              <!-- Features chips -->
              <div class="project-card__features" aria-label="Fitur project">
                <span
                  v-for="feature in project.features"
                  :key="feature"
                  class="chip chip--feature"
                >
                  <svg viewBox="0 0 12 12" fill="none" class="chip__check" aria-hidden="true">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  {{ feature }}
                </span>
              </div>

              <!-- Tech stack -->
              <div v-if="project.techStack && project.techStack.length > 0" class="project-card__tech">
                <span class="project-card__tech-label">Stack:</span>
                <span
                  v-for="tech in project.techStack"
                  :key="tech"
                  class="chip chip--tech"
                >{{ tech }}</span>
              </div>

              <!-- Footer: Play on Roblox | Coming Soon -->
              <div class="project-card__footer">
                <a
                  v-if="project.robloxLink"
                  :href="project.robloxLink"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-play"
                  :aria-label="`Play ${project.title} on Roblox`"
                >
                  <svg viewBox="0 0 16 16" fill="currentColor" class="btn-play__icon" aria-hidden="true">
                    <path d="M3 2.5l10 5.5-10 5.5V2.5z"/>
                  </svg>
                  Play on Roblox
                  <svg viewBox="0 0 12 12" fill="none" class="btn-play__external" aria-hidden="true">
                    <path d="M2 10L10 2M10 2H5M10 2V7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </a>
                <span v-else class="btn-soon" aria-label="Coming soon">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" class="btn-play__icon" aria-hidden="true">
                    <circle cx="8" cy="8" r="7"/>
                    <path d="M8 4.5v4l2.5 2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Coming Soon
                </span>
                <span class="project-card__year">{{ project.year }}</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ─── Page ───────────────────────────────────────────────────────────────────── */
.roblox-page {
  min-height: 100vh;
  background-color: var(--color-bg);
}

/* ─── Header ─────────────────────────────────────────────────────────────────── */
.roblox-page__header {
  border-bottom: 1px solid var(--color-border);
  padding: var(--space-16) var(--space-6) var(--space-12);
}

.roblox-page__header-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

/* Back link */
.back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-muted);
  text-decoration: none;
  width: fit-content;
  transition: color var(--transition-fast), gap var(--transition-fast);
}
.back-link:hover {
  color: var(--color-text);
  gap: var(--space-3);
}
.back-link__icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  transition: transform var(--transition-fast);
}
.back-link:hover .back-link__icon {
  transform: translateX(-2px);
}

/* Eyebrow */
.roblox-page__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: var(--space-4);
}
.roblox-page__eyebrow-icon {
  width: 16px;
  height: 16px;
  color: var(--color-accent);
  background-color: var(--color-accent);
  border-radius: var(--radius-sm);
  flex-shrink: 0;
}

.roblox-page__title {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 4vw, 3.25rem);
  font-weight: var(--font-regular);
  color: var(--color-text);
  line-height: 1.1;
  margin-bottom: var(--space-4);
}

.roblox-page__subtitle {
  font-family: var(--font-sans);
  font-size: var(--text-lg);
  color: var(--color-muted);
  line-height: 1.65;
  max-width: 600px;
}

/* Stats */
.roblox-page__stats {
  display: flex;
  gap: var(--space-8);
  flex-wrap: wrap;
  padding-top: var(--space-6);
  border-top: 1px solid var(--color-border);
}

.roblox-page__stat {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.roblox-page__stat-value {
  font-family: var(--font-serif);
  font-size: var(--text-3xl);
  font-weight: var(--font-regular);
  color: var(--color-text);
  line-height: 1;
}

.roblox-page__stat-label {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-muted);
}

/* ─── Projects Section ───────────────────────────────────────────────────────── */
.projects {
  padding: var(--space-12) var(--space-6) var(--space-20);
}

.projects__inner {
  max-width: 1100px;
  margin: 0 auto;
}

.projects__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);
}

/* ─── Project Card ───────────────────────────────────────────────────────────── */
.project-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: border-color var(--transition-base), background-color var(--transition-base);
}

.project-card:hover {
  border-color: var(--color-accent);
  background-color: var(--color-surface);
}

/* Thumbnail */
.project-card__thumb {
  aspect-ratio: 16 / 9;
  background-color: var(--color-surface-2);
  overflow: hidden;
  position: relative;
}

.project-card__thumb-inner {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: var(--color-accent);
}

.project-card__thumb-svg {
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  color: var(--color-accent);
}

.project-card__thumb-label {
  position: absolute;
  bottom: var(--space-3);
  right: var(--space-3);
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  color: var(--color-muted);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 2px var(--space-2);
  line-height: 1.4;
}

/* Skeleton loader */
.project-card--skeleton {
  pointer-events: none;
}
.project-card__thumb--skeleton {
  background-color: var(--color-surface-2);
  animation: shimmer 1.5s ease-in-out infinite;
}
.skeleton-line {
  height: 14px;
  background-color: var(--color-surface-2);
  border-radius: var(--radius-sm);
  margin-bottom: var(--space-3);
  animation: shimmer 1.5s ease-in-out infinite;
}
.skeleton-line--title { height: 22px; width: 70%; }
.skeleton-line--short { width: 40%; }

@keyframes shimmer {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}

/* Card body */
.project-card__body {
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  flex: 1;
}

/* ─── Chips ──────────────────────────────────────────────────────────────────── */
.project-card__tags,
.project-card__features {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  border-radius: var(--radius-full);
  padding: 3px var(--space-3);
  line-height: 1.4;
  white-space: nowrap;
}

/* Tag chips: filled accent */
.chip--tag {
  background-color: color-mix(in srgb, var(--color-accent) 12%, transparent);
  color: var(--color-accent);
  border: 1px solid color-mix(in srgb, var(--color-accent) 25%, transparent);
}

/* Feature chips: subtle border */
.chip--feature {
  background-color: var(--color-bg);
  color: var(--color-muted);
  border: 1px solid var(--color-border);
}

.chip__check {
  width: 10px;
  height: 10px;
  color: var(--color-accent);
  flex-shrink: 0;
}

/* ─── Card Title & Desc ──────────────────────────────────────────────────────── */
.project-card__title {
  font-family: var(--font-sans);
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--color-text);
  line-height: 1.3;
}

.project-card__desc {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  color: var(--color-muted);
  line-height: 1.7;
}

/* ─── Card Footer ────────────────────────────────────────────────────────────── */
.project-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-border);
  margin-top: auto;
}

.project-card__year {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  color: var(--color-muted);
  flex-shrink: 0;
}

/* Play button */
.btn-play {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--color-accent-fg);
  background-color: var(--color-accent);
  text-decoration: none;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  transition: opacity var(--transition-fast);
  white-space: nowrap;
}
.btn-play:hover { opacity: 0.85; }
.btn-play__icon {
  width: 12px;
  height: 12px;
  flex-shrink: 0;
}
.btn-play__external {
  width: 10px;
  height: 10px;
  flex-shrink: 0;
  opacity: 0.75;
}

/* ─── Empty state ────────────────────────────────────────────────────────────── */
.projects__empty {
  text-align: center;
  padding: var(--space-20) var(--space-6);
  color: var(--color-muted);
  font-family: var(--font-sans);
  font-size: var(--text-base);
}

/* ─── Responsive ─────────────────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .projects__grid {
    grid-template-columns: 1fr;
    max-width: 520px;
    margin: 0 auto;
  }

  .roblox-page__stats {
    gap: var(--space-6);
  }
}

@media (max-width: 640px) {
  .roblox-page__header {
    padding: var(--space-10) var(--space-4) var(--space-8);
  }

  .projects {
    padding: var(--space-8) var(--space-4) var(--space-16);
  }

  .project-card__footer {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-3);
  }
}
</style>
