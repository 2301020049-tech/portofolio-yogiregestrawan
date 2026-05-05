<script setup lang="ts">
useHead({
  title: 'Design Work | Portfolio',
  meta: [{ name: 'description', content: 'A collection of graphic design work — logos, brand identity, and social media content.' }],
})

// ─── Local type ───────────────────────────────────────────────────────────────
interface DesignItem {
  id: string
  title: string
  client: string
  brief: string
  tools: string[]
  category: 'logo' | 'brand-post'
  year: number
  thumbnail: string
  images?: string[]
  tags: string[]
  accentColor: string
}

// ─── Fetch designs (typed via explicit generic) ───────────────────────────────
const { data: designs, status } = await useAsyncData<DesignItem[]>(
  'designs',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  () => (queryCollection as any)('designs').order('year', 'DESC').all(),
)

// Fallback data
const fallbackDesigns: DesignItem[] = [
  {
    id: 'logo-umkm-01',
    title: 'Brand Logo — Healthy Eats',
    client: 'Culinary Business',
    brief: 'A logo for a healthy food stall aiming for a modern and trustworthy look. Uses a warm green palette with leaf and bowl icons.',
    tools: ['Figma', 'Illustrator'],
    category: 'logo',
    year: 2024,
    thumbnail: '',
    tags: ['Logo', 'Brand Identity', 'Business'],
    accentColor: '#4ade80',
  },
  {
    id: 'logo-studio-02',
    title: 'Logo — Pixel & Co. Studio',
    client: 'Indie Creative Studio',
    brief: 'Visual identity for an indie design studio. Concept: minimal, geometric, futuristic. Custom typeface combined with an abstract fragmented pixel icon.',
    tools: ['Figma', 'Illustrator', 'After Effects'],
    category: 'logo',
    year: 2024,
    thumbnail: '',
    tags: ['Logo', 'Motion', 'Brand Identity'],
    accentColor: '#818cf8',
  },
  {
    id: 'post-ramadhan-03',
    title: 'Feed Series — Ramadan Campaign',
    client: 'Nusantara Herbal Clinic',
    brief: 'A series of Instagram posts for a Ramadan campaign. A total of 9 frames with lantern and crescent moon themes, using a warm palette (gold, dark brown, cream).',
    tools: ['Figma', 'Photoshop'],
    category: 'brand-post',
    year: 2024,
    thumbnail: '',
    tags: ['Brand Post', 'Social Media', 'Campaign'],
    accentColor: '#f59e0b',
  },
]

const allDesigns = computed<DesignItem[]>(() =>
  designs.value && designs.value.length > 0 ? (designs.value as DesignItem[]) : fallbackDesigns,
)
// ─── Filter Logic ─────────────────────────────────────────────────────────────
const filters = ['Projects', 'All', 'Logo', 'Brand Post']
const activeFilter = ref('Projects')

// Project filter (for cards)
const filteredDesigns = computed(() => {
  return designs.value?.length ? designs.value : fallbackDesigns
})

// Flatten all images for individual gallery views
const allImages = computed(() => {
  const images: string[] = []
  const source = designs.value?.length ? designs.value : fallbackDesigns
  source.forEach(project => {
    if (project.images) {
      project.images.forEach(img => images.push(img))
    }
  })
  return images
})

// Gallery filter (for individual images)
const filteredImages = computed(() => {
  if (activeFilter.value === 'All') return allImages.value
  if (activeFilter.value === 'Logo') {
    return allImages.value.filter(img => img.toLowerCase().includes('logo'))
  }
  if (activeFilter.value === 'Brand Post') {
    return allImages.value.filter(img => !img.toLowerCase().includes('logo'))
  }
  return []
})

// ─── Modal State (Project) ───────────────────────────────────────────────────
const isModalOpen = ref(false)
const selected = ref<DesignItem | null>(null)

function openModal(item: DesignItem) {
  selected.value = item
  isModalOpen.value = true
}
function closeModal() {
  isModalOpen.value = false
  selected.value = null
}

// ─── Lightbox State (Image) ──────────────────────────────────────────────────
const isImageModalOpen = ref(false)
const selectedImage = ref('')

function openImageModal(img: string) {
  selectedImage.value = img
  isImageModalOpen.value = true
}
function closeImageModal() {
  isImageModalOpen.value = false
}

// ─── Keyboard Events ──────────────────────────────────────────────────────────
onMounted(() => {
  window.addEventListener('keydown', (e) => { 
    if (e.key === 'Escape') {
      closeModal()
      closeImageModal()
    }
  })
})
</script>

<template>
  <div class="design-page">

    <!-- ─── Header ─────────────────────────────────────────────────────────── -->
    <header class="design-page__header">
      <div class="design-page__header-inner">
        <NuxtLink to="/" class="back-link" aria-label="Back to homepage">
          <svg viewBox="0 0 16 16" fill="currentColor" class="back-link__icon" aria-hidden="true">
            <path fill-rule="evenodd" d="M14 8a.5.5 0 01-.5.5H3.707l3.147 3.146a.5.5 0 01-.708.708l-4-4a.5.5 0 010-.708l4-4a.5.5 0 01.708.708L3.707 7.5H13.5A.5.5 0 0114 8z"/>
          </svg>
          <span>Home</span>
        </NuxtLink>

        <div class="design-page__text">
          <p class="design-page__eyebrow">
            <svg viewBox="0 0 20 20" fill="currentColor" class="design-page__eyebrow-icon" aria-hidden="true">
              <path d="M13.5 3A1.5 1.5 0 0015 4.5v.75a.75.75 0 001.5 0V4.5A3 3 0 0013.5 1.5h-.75a.75.75 0 000 1.5h.75zM4.5 3A1.5 1.5 0 003 4.5v.75a.75.75 0 01-1.5 0V4.5A3 3 0 014.5 1.5h.75a.75.75 0 010 1.5H4.5zM16.5 13.5A1.5 1.5 0 0015 15h-.75a.75.75 0 000 1.5h.75A3 3 0 0018 13.5v-.75a.75.75 0 00-1.5 0v.75zM3 15a1.5 1.5 0 001.5 1.5h.75a.75.75 0 010 1.5H4.5A3 3 0 011.5 15v-.75a.75.75 0 011.5 0V15z"/>
              <path d="M7 7a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H8a1 1 0 01-1-1V7z"/>
            </svg>
            Graphic Design · Brand Identity
          </p>
          <h1 class="design-page__title">Design Work</h1>
          <p class="design-page__subtitle">
            Logos, brand identities, and visual content — crafted with Figma, Illustrator, and intent.
          </p>
        </div>

        <!-- Filter tabs -->
        <nav class="filter-tabs" aria-label="Filter design categories">
          <button
            v-for="f in filters"
            :key="f"
            class="filter-tab"
            :class="{ 'filter-tab--active': activeFilter === f }"
            @click="activeFilter = f"
          >
            {{ f }}
          </button>
        </nav>
      </div>
    </header>

    <!-- ─── Grid ────────────────────────────────────────────────────────────── -->
    <section class="design-section" aria-label="Design portfolio">
      <div class="design-section__inner">
        
        <!-- Project Cards View -->
        <TransitionGroup name="grid" tag="div" class="design-grid" v-if="activeFilter === 'Projects'">
          <button
            v-for="item in filteredDesigns"
            :key="item.id"
            class="design-card"
            :class="`design-card--${item.category}`"
            :aria-label="`View detail: ${item.title}`"
            @click="openModal(item)"
          >
            <!-- Thumbnail -->
            <div class="design-card__thumb">
              <img :src="item.thumbnail" :alt="item.title" class="design-card__img" loading="lazy" />
              <!-- Hover overlay -->
              <div class="design-card__overlay">
                <p class="design-card__overlay-title">{{ item.title }}</p>
                <div class="design-card__overlay-tags">
                  <span v-for="tag in item.tags" :key="tag" class="chip chip--tag">{{ tag }}</span>
                </div>
              </div>
            </div>
          </button>
        </TransitionGroup>

        <!-- Image Gallery View (Masonry) -->
        <TransitionGroup name="grid" tag="div" class="masonry-grid" v-else>
          <div
            v-for="(img, i) in filteredImages"
            :key="i"
            class="masonry-item"
            role="button"
            tabindex="0"
            aria-label="View fullscreen image"
            @click="openImageModal(img)"
            @keydown.enter="openImageModal(img)"
          >
            <img :src="img" alt="Design item" loading="lazy" />
          </div>
        </TransitionGroup>
      </div>
    </section>

    <!-- ─── Modal ───────────────────────────────────────────────────────────── -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="isModalOpen && selected" class="modal-backdrop" role="dialog" aria-modal="true" :aria-label="selected.title" @click.self="closeModal">
          <div class="modal">
            <!-- Close -->
            <button class="modal__close" aria-label="Close modal" @click="closeModal">
              <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16" aria-hidden="true">
                <path d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"/>
              </svg>
            </button>

            <!-- Large thumbnail -->
            <div class="modal__thumb" :class="`modal__thumb--${selected.category}`">
              <img :src="selected.thumbnail" :alt="selected.title" class="modal__img" />
            </div>

            <!-- Content -->
            <div class="modal__body">
              <div class="modal__meta">
                <span class="modal__category-badge">{{ selected.category === 'logo' ? 'Logo' : 'Brand Post' }}</span>
                <span class="modal__year">{{ selected.year }}</span>
              </div>

              <h2 class="modal__title">{{ selected.title }}</h2>
              <p class="modal__client">
                <svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12" aria-hidden="true">
                  <path d="M8 8a3 3 0 100-6 3 3 0 000 6zM8 9a5 5 0 00-5 5h10a5 5 0 00-5-5z"/>
                </svg>
                {{ selected.client }}
              </p>
              <p class="modal__brief">{{ selected.brief }}</p>

              <!-- Tools -->
              <div class="modal__tools">
                <span class="modal__tools-label">Tools:</span>
                <span v-for="tool in selected.tools" :key="tool" class="chip chip--tech">{{ tool }}</span>
              </div>

              <!-- Tags -->
              <div class="modal__tags">
                <span v-for="tag in selected.tags" :key="tag" class="chip chip--tag">{{ tag }}</span>
              </div>

              <!-- Gallery Images -->
              <div v-if="selected.images && selected.images.length > 0" class="modal__gallery">
                <img
                  v-for="(img, i) in selected.images"
                  :key="i"
                  :src="img"
                  :alt="`${selected.title} image ${i + 1}`"
                  class="modal__gallery-img"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ─── Image Lightbox ──────────────────────────────────────────────────── -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="isImageModalOpen" class="image-lightbox" @click="closeImageModal">
          <button class="image-lightbox__close" aria-label="Close image" @click.stop="closeImageModal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="32" height="32" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img :src="selectedImage" alt="Fullscreen design" class="image-lightbox__img" @click.stop />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
/* ─── Page ────────────────────────────────────────────────────────────────── */
.design-page {
  min-height: 100vh;
  background-color: var(--color-bg);
}

/* ─── Header ──────────────────────────────────────────────────────────────── */
.design-page__header {
  border-bottom: 1px solid var(--color-border);
  padding: var(--space-16) var(--space-6) var(--space-10);
}
.design-page__header-inner {
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
.back-link:hover { color: var(--color-text); gap: var(--space-3); }
.back-link__icon {
  width: 14px; height: 14px; flex-shrink: 0;
  transition: transform var(--transition-fast);
}
.back-link:hover .back-link__icon { transform: translateX(-2px); }

/* Eyebrow */
.design-page__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: var(--space-3);
}
.design-page__eyebrow-icon {
  width: 16px; height: 16px;
  background-color: var(--color-accent);
  border-radius: var(--radius-sm);
  flex-shrink: 0;
}
.design-page__title {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 4vw, 3.25rem);
  font-weight: var(--font-regular);
  color: var(--color-text);
  line-height: 1.1;
  margin-bottom: var(--space-3);
}
.design-page__subtitle {
  font-family: var(--font-sans);
  font-size: var(--text-lg);
  color: var(--color-muted);
  line-height: 1.65;
  max-width: 540px;
}

/* ─── Filter tabs ─────────────────────────────────────────────────────────── */
.filter-tabs {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}
.filter-tab {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-muted);
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  padding: var(--space-2) var(--space-4);
  cursor: pointer;
  transition: color var(--transition-fast), border-color var(--transition-fast), background-color var(--transition-fast);
}
.filter-tab:hover {
  color: var(--color-text);
  border-color: var(--color-accent);
}
.filter-tab--active {
  color: var(--color-accent-fg);
  background-color: var(--color-accent);
  border-color: var(--color-accent);
}

/* ─── Section ─────────────────────────────────────────────────────────────── */
.design-section {
  padding: var(--space-12) var(--space-6) var(--space-20);
}
.design-section__inner {
  max-width: 1100px;
  margin: 0 auto;
}

/* ─── Grid ────────────────────────────────────────────────────────────────── */
.design-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-6);
}

/* ─── Masonry Grid ────────────────────────────────────────────────────────── */
.masonry-grid {
  column-count: 3;
  column-gap: var(--space-6);
}

@media (max-width: 900px) {
  .masonry-grid {
    column-count: 2;
  }
}
@media (max-width: 600px) {
  .masonry-grid {
    column-count: 1;
  }
}

.masonry-item {
  break-inside: avoid;
  margin-bottom: var(--space-6);
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
  position: relative;
  background-color: var(--color-surface-2);
}

.masonry-item img {
  width: 100%;
  display: block;
  transition: transform 0.3s ease;
}

.masonry-item:hover img {
  transform: scale(1.03);
}

/* ─── Card ────────────────────────────────────────────────────────────────── */
.design-card {
  display: block;
  break-inside: avoid;
  margin-bottom: var(--space-5);
  width: 100%;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.design-card__thumb {
  position: relative;
  background-color: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: border-color var(--transition-base);
}
.design-card:hover .design-card__thumb { border-color: var(--color-accent); }

/* logo: 1/1 — post: 9/16 */
.design-card--logo .design-card__thumb { aspect-ratio: 1 / 1; }
.design-card--brand-post .design-card__thumb { aspect-ratio: 9 / 16; }

.design-card__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Overlay */
.design-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, color-mix(in srgb, var(--color-bg) 85%, transparent) 0%, transparent 55%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: var(--space-4);
  opacity: 0;
  transition: opacity var(--transition-base);
}
.design-card:hover .design-card__overlay { opacity: 1; }

.design-card__overlay-title {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--color-text);
  margin-bottom: var(--space-2);
  line-height: 1.35;
  text-align: left;
}
.design-card__overlay-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
}

/* Skeleton */
.design-card--skeleton { pointer-events: none; }
.design-card__thumb--skeleton {
  aspect-ratio: 1 / 1;
  background-color: var(--color-surface-2);
  animation: shimmer 1.5s ease-in-out infinite;
}
@keyframes shimmer {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

/* Empty */
.design-empty {
  text-align: center;
  padding: var(--space-20) var(--space-6);
  color: var(--color-muted);
  font-family: var(--font-sans);
  font-size: var(--text-base);
}

/* ─── Chips ───────────────────────────────────────────────────────────────── */
.chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  border-radius: var(--radius-full);
  padding: 2px var(--space-2);
  line-height: 1.4;
  white-space: nowrap;
}
.chip--tag {
  background-color: color-mix(in srgb, var(--color-accent) 12%, transparent);
  color: var(--color-accent);
  border: 1px solid color-mix(in srgb, var(--color-accent) 25%, transparent);
}
.chip--tech {
  background-color: var(--color-surface-2);
  color: var(--color-muted);
  border: 1px solid var(--color-border);
}

/* ─── Modal ───────────────────────────────────────────────────────────────── */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: color-mix(in srgb, var(--color-bg) 70%, transparent);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-6);
}
.modal {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  max-width: 680px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
}
.modal__close {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  width: 32px; height: 32px;
  display: flex; align-items: center; justify-content: center;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background-color: var(--color-surface-2);
  color: var(--color-muted);
  cursor: pointer;
  transition: color var(--transition-fast), border-color var(--transition-fast);
  z-index: 1;
}
.modal__close:hover { color: var(--color-text); border-color: var(--color-accent); }

.modal__thumb {
  background-color: var(--color-surface-2);
  position: relative;
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  overflow: hidden;
  flex-shrink: 0;
}
.modal__thumb--logo { aspect-ratio: 16 / 7; }
.modal__thumb--brand-post { aspect-ratio: 16 / 7; }

.modal__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal__body {
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.modal__meta {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
.modal__category-badge {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent);
  background-color: color-mix(in srgb, var(--color-accent) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-accent) 25%, transparent);
  border-radius: var(--radius-full);
  padding: 2px var(--space-3);
}
.modal__year {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  color: var(--color-muted);
}
.modal__title {
  font-family: var(--font-sans);
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  color: var(--color-text);
  line-height: 1.3;
}
.modal__client {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  color: var(--color-muted);
}
.modal__brief {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  color: var(--color-muted);
  line-height: 1.75;
  border-left: 2px solid var(--color-accent);
  padding-left: var(--space-4);
}
.modal__tools {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2);
}
.modal__tools-label {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  color: var(--color-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-right: var(--space-1);
}
.modal__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.modal__gallery {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  margin-top: var(--space-4);
  padding-top: var(--space-6);
  border-top: 1px solid var(--color-border);
}

.modal__gallery-img {
  width: 100%;
  height: auto;
  border-radius: var(--radius-md);
  object-fit: contain;
}

/* ─── Image Lightbox ──────────────────────────────────────────────────────── */
.image-lightbox {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.95);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.image-lightbox__img {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  user-select: none;
}
.image-lightbox__close {
  position: absolute;
  top: var(--space-6);
  right: var(--space-6);
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  padding: var(--space-2);
  transition: color 0.2s ease;
}
.image-lightbox__close:hover {
  color: #fff;
}

/* ─── Transitions ─────────────────────────────────────────────────────────── */
.modal-enter-active, .modal-leave-active { transition: opacity 0.2s ease; }
.modal-enter-active .modal, .modal-leave-active .modal { transition: transform 0.2s ease, opacity 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-from .modal { transform: translateY(16px); opacity: 0; }
.modal-leave-to .modal { transform: translateY(8px); opacity: 0; }

/* ─── Responsive ──────────────────────────────────────────────────────────── */
@media (max-width: 640px) {
  .design-page__header { padding: var(--space-10) var(--space-4) var(--space-8); }
  .design-section { padding: var(--space-8) var(--space-4) var(--space-16); }
  .modal { border-radius: var(--radius-lg); }
}
</style>
