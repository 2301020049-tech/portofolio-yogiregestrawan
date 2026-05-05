<script setup lang="ts">
// ─── SEO ─────────────────────────────────────────────────────────────────────
useHead({
  title: 'Photo Work — Before & After | Portfolio',
  meta: [
    {
      name: 'description',
      content: 'A gallery of before & after photo editing comparisons. Drag the slider to see the difference.',
    },
  ],
})

// ─── Demo Data ───────────────────────────────────────────────────────────────
// Using picsum.photos as placeholder — different seeds for visual variety
const photos = [
  {
    id: 'dsc_4693',
    title: 'Portrait Session 1',
    category: 'Portrait',
    camera: 'Nikon D7000',
    lens: '18-105mm f/3.5-5.6G VR',
    settings: 'f/5.3, 1/100, ISO 140',
    mood: ['kebersamaan', 'hangat'],
    before: '/images/photos/Photo/DSC_4693_before.jpg',
    after:  '/images/photos/Photo/DSC_4693.jpg',
    initialPosition: 45,
  },
  {
    id: 'dsc_4718',
    title: 'Portrait Session 2',
    category: 'Portrait',
    camera: 'Nikon D7000',
    lens: '18-105mm f/3.5-5.6G VR',
    settings: 'f/5.3, 1/100, ISO 140',
    mood: ['intim'],
    before: '/images/photos/Photo/DSC_4718_before.jpg',
    after:  '/images/photos/Photo/DSC_4718.jpg',
    initialPosition: 50,
  },
  {
    id: 'dsc_4806',
    title: 'Portrait Session 3',
    category: 'Portrait',
    camera: 'Nikon D7000',
    lens: '18-105mm f/3.5-5.6G VR',
    settings: 'f/5.3, 1/100, ISO 140',
    mood: ['hangat'],
    before: '/images/photos/Photo/DSC_4806_before.jpg',
    after:  '/images/photos/Photo/DSC_4806.jpg',
    initialPosition: 55,
  },
]

// ─── Gallery Data & Logic ────────────────────────────────────────────────────
const { data: galleryData } = await useAsyncData(
  'gallery-photos',
  () => queryCollection('photos').all()
)

const activeMoodFilter = ref('semua')
const moodFilters = [
  { label: "Semua", value: "semua" },
  { label: "Hangat", value: "hangat" },
  { label: "Tenang", value: "tenang" },
  { label: "Energik", value: "energik" },
  { label: "Intim", value: "intim" },
]

const filteredGallery = computed(() => {
  if (!galleryData.value) return []
  if (activeMoodFilter.value === 'semua') return galleryData.value
  return galleryData.value.filter(photo => photo.mood && photo.mood.includes(activeMoodFilter.value))
})

// ─── Lightbox Logic ──────────────────────────────────────────────────────────
const isLightboxOpen = ref(false)
const lightboxIndex = ref(0)

function openLightbox(index: number) {
  lightboxIndex.value = index
  isLightboxOpen.value = true
}

function closeLightbox() {
  isLightboxOpen.value = false
}

function nextPhoto(e?: Event) {
  if (e) e.stopPropagation()
  if (lightboxIndex.value < filteredGallery.value.length - 1) {
    lightboxIndex.value++
  }
}

function prevPhoto(e?: Event) {
  if (e) e.stopPropagation()
  if (lightboxIndex.value > 0) {
    lightboxIndex.value--
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (!isLightboxOpen.value) return
  if (e.key === 'Escape') closeLightbox()
  else if (e.key === 'ArrowRight') nextPhoto()
  else if (e.key === 'ArrowLeft') prevPhoto()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <main class="photo-page">
    <!-- ─── Hero Header ──────────────────────────────────────────────────────── -->
    <header class="photo-page__header">
      <p class="photo-page__eyebrow">Portfolio</p>
      <h1 class="photo-page__title">Photo Work</h1>
      <p class="photo-page__subtitle">
        Drag the slider to see the difference between the original and edited photo.
      </p>
    </header>

    <!-- ─── Photo Grid ───────────────────────────────────────────────────────── -->
    <section class="photo-grid" aria-label="Photo comparison gallery">
      <article
        v-for="photo in photos"
        :key="photo.id"
        class="photo-card"
      >
        <!-- Slider -->
        <div class="photo-card__slider-wrap">
          <BeforeAfterSlider
            :before="photo.before"
            :after="photo.after"
            :initial-position="photo.initialPosition"
            label-before="Before"
            label-after="After"
          />
        </div>

        <!-- Meta -->
        <div class="photo-card__meta">
          <div class="photo-card__meta-top">
            <span class="photo-card__category">{{ photo.category }}</span>
            <div class="photo-card__mood">
              <span
                v-for="tag in photo.mood"
                :key="tag"
                class="photo-card__tag"
              >{{ tag }}</span>
            </div>
          </div>

          <h2 class="photo-card__title">{{ photo.title }}</h2>

          <dl class="photo-card__exif">
            <div class="photo-card__exif-item">
              <dt>Camera</dt>
              <dd>{{ photo.camera }}</dd>
            </div>
            <div class="photo-card__exif-item">
              <dt>Lens</dt>
              <dd>{{ photo.lens }}</dd>
            </div>
            <div class="photo-card__exif-item">
              <dt>Settings</dt>
              <dd>{{ photo.settings }}</dd>
            </div>
          </dl>
        </div>
      </article>
    </section>

    <!-- ─── Gallery Section ─────────────────────────────────────────────────── -->
    <section class="gallery-section" aria-label="Photo Gallery">
      <h2 class="gallery-section__title">Gallery</h2>
      
      <!-- Filter Bar -->
      <div class="gallery-filters" role="group" aria-label="Mood Filters">
        <button
          v-for="filter in moodFilters"
          :key="filter.value"
          class="gallery-filter-btn"
          :class="{ 'gallery-filter-btn--active': activeMoodFilter === filter.value }"
          @click="activeMoodFilter = filter.value"
        >
          {{ filter.label }}
        </button>
      </div>

      <!-- Masonry Grid -->
      <div class="masonry-grid">
        <div
          v-for="(photo, index) in filteredGallery"
          :key="photo.id"
          class="masonry-item"
          role="button"
          tabindex="0"
          :aria-label="`View ${photo.title}`"
          @click="openLightbox(index)"
          @keydown.enter="openLightbox(index)"
        >
          <img :src="photo.after" :alt="photo.title" loading="lazy" />
          <div class="masonry-item__overlay">
            <h3 class="masonry-item__title">{{ photo.title }}</h3>
            <div class="masonry-item__tags">
              <span v-for="tag in photo.mood" :key="tag" class="masonry-item__tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Lightbox ────────────────────────────────────────────────────────── -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="isLightboxOpen" class="lightbox" @click="closeLightbox">
          <button class="lightbox__close" aria-label="Close lightbox" @click.stop="closeLightbox">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="lightbox__icon" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <button 
            v-if="lightboxIndex > 0" 
            class="lightbox__nav lightbox__nav--prev" 
            aria-label="Previous photo" 
            @click.stop="prevPhoto"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="lightbox__icon" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <img 
            :src="filteredGallery[lightboxIndex]?.after" 
            :alt="filteredGallery[lightboxIndex]?.title" 
            class="lightbox__img" 
            @click.stop 
          />

          <button 
            v-if="lightboxIndex < filteredGallery.length - 1" 
            class="lightbox__nav lightbox__nav--next" 
            aria-label="Next photo" 
            @click.stop="nextPhoto"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="lightbox__icon" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </Transition>
    </Teleport>
  </main>
</template>

<style scoped>
/* ─── Page ───────────────────────────────────────────────────────────────────── */
.photo-page {
  min-height: 100vh;
  background-color: var(--color-bg);
  padding: var(--space-16) var(--space-6);
}

/* ─── Header ─────────────────────────────────────────────────────────────────── */
.photo-page__header {
  max-width: 720px;
  margin: 0 auto var(--space-16);
  text-align: center;
}

.photo-page__eyebrow {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: var(--space-3);
}

.photo-page__title {
  font-family: var(--font-serif);
  font-size: var(--text-5xl);
  font-weight: var(--font-regular);
  color: var(--color-text);
  line-height: 1.1;
  margin-bottom: var(--space-4);
}

.photo-page__subtitle {
  font-family: var(--font-sans);
  font-size: var(--text-lg);
  color: var(--color-muted);
  line-height: 1.6;
}

/* ─── Grid ───────────────────────────────────────────────────────────────────── */
.photo-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-16);
  max-width: 880px;
  margin: 0 auto;
}

/* ─── Card ───────────────────────────────────────────────────────────────────── */
.photo-card {
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  overflow: hidden;
  transition: border-color var(--transition-base);
}

.photo-card:hover {
  border-color: var(--color-accent);
}

.photo-card__slider-wrap {
  /* Fix aspect ratio 3:2 (standard photo) */
  aspect-ratio: 3 / 2;
}

.photo-card__slider-wrap :deep(.bas-container) {
  height: 100%;
  border-radius: 0;
  border: none;
  border-bottom: 1px solid var(--color-border);
}

.photo-card__slider-wrap :deep(.bas-img--after) {
  height: 100%;
  object-fit: cover;
}

/* ─── Meta ───────────────────────────────────────────────────────────────────── */
.photo-card__meta {
  padding: var(--space-6);
}

.photo-card__meta-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}

.photo-card__category {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.photo-card__mood {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.photo-card__tag {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  color: var(--color-muted);
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  padding: 2px var(--space-3);
}

.photo-card__title {
  font-family: var(--font-serif);
  font-size: var(--text-2xl);
  font-weight: var(--font-regular);
  color: var(--color-text);
  line-height: 1.3;
  margin-bottom: var(--space-5);
}

/* ─── EXIF ───────────────────────────────────────────────────────────────────── */
.photo-card__exif {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
  padding-top: var(--space-5);
  border-top: 1px solid var(--color-border);
}

.photo-card__exif-item dt {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-muted);
  margin-bottom: var(--space-1);
}

.photo-card__exif-item dd {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  color: var(--color-text);
  font-weight: var(--font-medium);
}

/* ─── Responsive ─────────────────────────────────────────────────────────────── */
@media (max-width: 640px) {
  .photo-page {
    padding: var(--space-10) var(--space-4);
  }

  .photo-page__title {
    font-size: var(--text-4xl);
  }

  .photo-card__exif {
    grid-template-columns: 1fr 1fr;
  }

  .photo-card__meta {
    padding: var(--space-4);
  }
}

/* ─── Gallery Section ────────────────────────────────────────────────────────── */
.gallery-section {
  padding-top: var(--space-16);
  margin-top: var(--space-16);
  border-top: 0.5px solid var(--color-border);
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
}

.gallery-section__title {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-muted);
  text-align: center;
  margin-bottom: var(--space-8);
}

.gallery-filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-3);
  margin-bottom: var(--space-10);
}

.gallery-filter-btn {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  background-color: transparent;
  color: var(--color-muted);
  border: 1px solid var(--color-border);
  cursor: pointer;
  transition: all 0.2s ease;
}

.gallery-filter-btn:hover {
  border-color: var(--color-text);
  color: var(--color-text);
}

.gallery-filter-btn--active {
  background-color: var(--color-text);
  color: var(--color-bg);
  border-color: var(--color-text);
}

/* Masonry Grid */
.masonry-grid {
  column-count: 3;
  column-gap: 6px;
}

@media (max-width: 768px) {
  .masonry-grid {
    column-count: 2;
  }
}

.masonry-item {
  position: relative;
  break-inside: avoid;
  margin-bottom: 6px;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
}

.masonry-item img {
  width: 100%;
  display: block;
}

.masonry-item__overlay {
  position: absolute;
  inset: 0;
  background-color: #000;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: var(--space-4);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.masonry-item:hover .masonry-item__overlay {
  opacity: 0.55;
}

.masonry-item__title {
  color: #fff;
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  margin-bottom: var(--space-2);
}

.masonry-item__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.masonry-item__tag {
  color: #fff;
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  padding: 2px 8px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: var(--radius-full);
}

/* ─── Lightbox ───────────────────────────────────────────────────────────────── */
.lightbox {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.92);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox__img {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  user-select: none;
}

.lightbox__close {
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

.lightbox__close:hover {
  color: #fff;
}

.lightbox__icon {
  width: 32px;
  height: 32px;
}

.lightbox__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  color: #fff;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.lightbox__nav:hover {
  background: rgba(255, 255, 255, 0.2);
}

.lightbox__nav--prev {
  left: var(--space-6);
}

.lightbox__nav--next {
  right: var(--space-6);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
