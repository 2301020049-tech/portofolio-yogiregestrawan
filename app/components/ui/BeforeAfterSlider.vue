<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// ─── Props ───────────────────────────────────────────────────────────────────
const props = withDefaults(defineProps<{
  before: string
  after: string
  labelBefore?: string
  labelAfter?: string
  initialPosition?: number
}>(), {
  labelBefore: 'Before',
  labelAfter: 'After',
  initialPosition: 50,
})

// ─── State ───────────────────────────────────────────────────────────────────
const containerRef = ref<HTMLElement | null>(null)
const position = ref(props.initialPosition)
const isDragging = ref(false)

// ─── Computed ────────────────────────────────────────────────────────────────
// "after" image is revealed from the left; "before" is clipped
const clipBefore = computed(() => `inset(0 0 0 ${position.value}%)`)
const handleLeft = computed(() => `${position.value}%`)

// ─── Helpers ─────────────────────────────────────────────────────────────────
function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max)
}

function positionFromClientX(clientX: number): number {
  if (!containerRef.value) return position.value
  const rect = containerRef.value.getBoundingClientRect()
  const raw = ((clientX - rect.left) / rect.width) * 100
  return clamp(raw, 0, 100)
}

// ─── Mouse Events ────────────────────────────────────────────────────────────
function onMouseDown(e: MouseEvent) {
  e.preventDefault()
  isDragging.value = true
  position.value = positionFromClientX(e.clientX)
}

function onMouseMove(e: MouseEvent) {
  if (!isDragging.value) return
  position.value = positionFromClientX(e.clientX)
}

function onMouseUp() {
  isDragging.value = false
}

// ─── Touch Events ────────────────────────────────────────────────────────────
function onTouchStart(e: TouchEvent) {
  isDragging.value = true
  position.value = positionFromClientX(e.touches[0]!.clientX)
}

function onTouchMove(e: TouchEvent) {
  if (!isDragging.value) return
  e.preventDefault()
  position.value = positionFromClientX(e.touches[0]!.clientX)
}

function onTouchEnd() {
  isDragging.value = false
}

// ─── Keyboard Control ────────────────────────────────────────────────────────
function onKeyDown(e: KeyboardEvent) {
  const STEP = 5
  if (e.key === 'ArrowLeft') {
    e.preventDefault()
    position.value = clamp(position.value - STEP, 0, 100)
  } else if (e.key === 'ArrowRight') {
    e.preventDefault()
    position.value = clamp(position.value + STEP, 0, 100)
  } else if (e.key === 'Home') {
    e.preventDefault()
    position.value = 0
  } else if (e.key === 'End') {
    e.preventDefault()
    position.value = 100
  }
}

// ─── SSR-safe global event listeners ────────────────────────────────────────
onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)
})
</script>

<template>
  <div
    ref="containerRef"
    class="bas-container"
    :class="{ 'is-dragging': isDragging }"
    @mousedown="onMouseDown"
    @touchstart.passive="onTouchStart"
    @touchmove.prevent="onTouchMove"
    @touchend="onTouchEnd"
  >
    <!-- Layer 1: After image (base — fully visible) -->
    <img
      :src="after"
      :alt="labelAfter"
      class="bas-img bas-img--after"
      draggable="false"
    />

    <!-- Layer 2: Before image (clipped to right of handle) -->
    <img
      :src="before"
      :alt="labelBefore"
      class="bas-img bas-img--before"
      :style="{ clipPath: clipBefore }"
      draggable="false"
    />

    <!-- Divider line -->
    <div class="bas-line" :style="{ left: handleLeft }" />

    <!-- Handle -->
    <button
      class="bas-handle"
      :style="{ left: handleLeft }"
      aria-label="Geser untuk bandingkan foto"
      role="slider"
      :aria-valuenow="Math.round(position)"
      aria-valuemin="0"
      aria-valuemax="100"
      @keydown="onKeyDown"
      @mousedown.stop
    >
      <!-- Left arrow icon -->
      <svg class="bas-handle__arrow bas-handle__arrow--left" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <!-- Right arrow icon -->
      <svg class="bas-handle__arrow bas-handle__arrow--right" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <!-- Label: After (left side) -->
    <span class="bas-label bas-label--after" aria-hidden="true">{{ labelAfter }}</span>

    <!-- Label: Before (right side) -->
    <span class="bas-label bas-label--before" aria-hidden="true">{{ labelBefore }}</span>
  </div>
</template>

<style scoped>
/* ─── Container ─────────────────────────────────────────────────────────────── */
.bas-container {
  position: relative;
  display: block;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  cursor: col-resize;
  user-select: none;
  -webkit-user-select: none;
  touch-action: pan-y;
  /* flat design: no shadow */
  border: 1px solid var(--color-border);
}

.bas-container.is-dragging {
  cursor: grabbing;
}

/* ─── Images ─────────────────────────────────────────────────────────────────── */
.bas-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
  /* remove dragging ghost */
  -webkit-user-drag: none;
}

.bas-img--after {
  /* Base layer — always fully visible */
  position: relative;
  display: block;
}

.bas-img--before {
  /* Overlay layer — clipped to reveal only right portion */
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

/* ─── Divider Line ───────────────────────────────────────────────────────────── */
.bas-line {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: var(--color-accent);
  transform: translateX(-50%);
  pointer-events: none;
  z-index: 2;
}

/* ─── Handle Button ──────────────────────────────────────────────────────────── */
.bas-handle {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-full, 9999px);
  background-color: var(--color-accent);
  color: var(--color-accent-fg);
  border: none;
  cursor: col-resize;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 0;
  /* Keyboard focus ring */
  outline: none;
  transition: transform var(--transition-fast, 150ms ease);
}

.bas-handle:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}

.bas-container.is-dragging .bas-handle {
  transform: translate(-50%, -50%) scale(1.08);
}

/* ─── Handle Arrows ─────────────────────────────────────────────────────────── */
.bas-handle__arrow {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

/* ─── Labels ─────────────────────────────────────────────────────────────────── */
.bas-label {
  position: absolute;
  top: 12px;
  padding: 4px 10px;
  font-family: var(--font-sans, 'Inter', sans-serif);
  font-size: var(--text-xs, 0.75rem);
  font-weight: var(--font-semibold, 600);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text);
  background-color: color-mix(in srgb, var(--color-surface) 85%, transparent);
  border-radius: var(--radius-sm, 4px);
  border: 1px solid var(--color-border);
  pointer-events: none;
  z-index: 4;
  line-height: 1;
}

/* Fallback for browsers that don't support color-mix */
@supports not (background-color: color-mix(in srgb, white 85%, transparent)) {
  .bas-label {
    background-color: var(--color-surface);
    opacity: 0.9;
  }
}

.bas-label--after {
  left: 12px;
}

.bas-label--before {
  right: 12px;
}
</style>
