<script setup lang="ts">
// SSR-safe: useColorMode dari @nuxtjs/color-mode
const colorMode = useColorMode()

// Toggle dark/light — SSR safe karena useColorMode handle hydration
function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

// Aktif link detection
const route = useRoute()
function isActive(path: string) {
  return route.path.startsWith(path)
}

// Mobile menu
const mobileOpen = ref(false)
function closeMobile() { mobileOpen.value = false }
</script>

<template>
  <header class="navbar">
    <nav class="navbar__inner" aria-label="Main navigation">
      <!-- Logo / Name -->
      <NuxtLink to="/" class="navbar__logo" @click="closeMobile">
        yogi regestrawan<span class="navbar__dot">.</span>
      </NuxtLink>

      <!-- Desktop Links -->
      <ul class="navbar__links" role="list">
        <li>
          <NuxtLink
            to="/work/roblox"
            class="navbar__link"
            :class="{ 'is-active': isActive('/work/roblox') }"
          >Work</NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/work/photo"
            class="navbar__link"
            :class="{ 'is-active': isActive('/work/photo') }"
          >Photo</NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/work/design"
            class="navbar__link"
            :class="{ 'is-active': isActive('/work/design') }"
          >Design</NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/about"
            class="navbar__link"
            :class="{ 'is-active': isActive('/about') }"
          >About</NuxtLink>
        </li>
      </ul>

      <!-- Right actions -->
      <div class="navbar__actions">
        <!-- Color mode toggle — ClientOnly untuk hindari hydration mismatch -->
        <ClientOnly>
          <button
            class="navbar__mode-btn"
            :aria-label="colorMode.value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
            @click="toggleColorMode"
          >
            <!-- Sun icon (light mode) -->
            <svg
              v-if="colorMode.value === 'dark'"
              viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="navbar__mode-icon" aria-hidden="true"
            >
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
            <!-- Moon icon (dark mode) -->
            <svg
              v-else
              viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="navbar__mode-icon" aria-hidden="true"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          </button>
          <!-- Fallback saat SSR -->
          <template #fallback>
            <span class="navbar__mode-btn" aria-hidden="true" style="opacity:0" />
          </template>
        </ClientOnly>

        <NuxtLink to="/contact" class="navbar__hire">Hire Me</NuxtLink>

        <!-- Mobile hamburger -->
        <button
          class="navbar__hamburger"
          :aria-expanded="mobileOpen"
          aria-label="Toggle menu"
          @click="mobileOpen = !mobileOpen"
        >
          <span class="navbar__bar" :class="{ 'is-open': mobileOpen }" />
          <span class="navbar__bar" :class="{ 'is-open': mobileOpen }" />
          <span class="navbar__bar" :class="{ 'is-open': mobileOpen }" />
        </button>
      </div>
    </nav>

    <!-- Mobile dropdown -->
    <Transition name="mobile-menu">
      <div v-if="mobileOpen" class="navbar__mobile" role="navigation">
        <NuxtLink to="/work/roblox" class="navbar__mobile-link" @click="closeMobile">Work</NuxtLink>
        <NuxtLink to="/work/photo"  class="navbar__mobile-link" @click="closeMobile">Photo</NuxtLink>
        <NuxtLink to="/work/design" class="navbar__mobile-link" @click="closeMobile">Design</NuxtLink>
        <NuxtLink to="/about"       class="navbar__mobile-link" @click="closeMobile">About</NuxtLink>
        <NuxtLink to="/contact"     class="navbar__mobile-link navbar__mobile-link--accent" @click="closeMobile">Hire Me</NuxtLink>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
/* ─── Navbar wrapper ─────────────────────────────────────────────────────────── */
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  /* subtle blur for depth without shadow */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background-color: color-mix(in srgb, var(--color-bg) 88%, transparent);
}

.navbar__inner {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 var(--space-6);
  height: 60px;
}

/* ─── Logo ───────────────────────────────────────────────────────────────────── */
.navbar__logo {
  font-family: var(--font-serif);
  font-size: var(--text-xl);
  font-weight: var(--font-regular);
  color: var(--color-text);
  text-decoration: none;
  flex-shrink: 0;
  letter-spacing: -0.01em;
  transition: opacity var(--transition-fast);
}
.navbar__logo:hover { opacity: 0.75; }
.navbar__dot { color: var(--color-accent); }

/* ─── Desktop links ──────────────────────────────────────────────────────────── */
.navbar__links {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;
}

.navbar__link {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-muted);
  text-decoration: none;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  transition: color var(--transition-fast), background-color var(--transition-fast);
}
.navbar__link:hover,
.navbar__link.is-active {
  color: var(--color-text);
  background-color: var(--color-surface-2);
}
.navbar__link.is-active {
  font-weight: var(--font-semibold);
}

/* ─── Actions ────────────────────────────────────────────────────────────────── */
.navbar__actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  flex-shrink: 0;
}

/* Dark/light toggle */
.navbar__mode-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--color-muted);
  cursor: pointer;
  transition: color var(--transition-fast), border-color var(--transition-fast),
              background-color var(--transition-fast);
  padding: 0;
}
.navbar__mode-btn:hover {
  color: var(--color-text);
  background-color: var(--color-surface-2);
  border-color: var(--color-accent);
}
.navbar__mode-icon {
  width: 16px;
  height: 16px;
}

/* Hire Me button */
.navbar__hire {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--color-accent-fg);
  background-color: var(--color-accent);
  text-decoration: none;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  transition: opacity var(--transition-fast);
}
.navbar__hire:hover { opacity: 0.85; }

/* ─── Hamburger ──────────────────────────────────────────────────────────────── */
.navbar__hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 36px;
  height: 36px;
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  padding: 8px 9px;
}

.navbar__bar {
  display: block;
  width: 100%;
  height: 2px;
  background-color: var(--color-text);
  border-radius: 2px;
  transition: transform var(--transition-fast), opacity var(--transition-fast);
}

/* ─── Mobile dropdown ────────────────────────────────────────────────────────── */
.navbar__mobile {
  display: flex;
  flex-direction: column;
  background-color: var(--color-surface);
  border-top: 1px solid var(--color-border);
  padding: var(--space-4) var(--space-6);
  gap: var(--space-1);
}

.navbar__mobile-link {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  color: var(--color-muted);
  text-decoration: none;
  padding: var(--space-3) var(--space-2);
  border-radius: var(--radius-md);
  transition: color var(--transition-fast), background-color var(--transition-fast);
}
.navbar__mobile-link:hover {
  color: var(--color-text);
  background-color: var(--color-surface-2);
}
.navbar__mobile-link--accent {
  color: var(--color-accent);
  font-weight: var(--font-semibold);
}

/* ─── Transition ─────────────────────────────────────────────────────────────── */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity var(--transition-fast), transform var(--transition-fast);
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* ─── Responsive ─────────────────────────────────────────────────────────────── */
@media (max-width: 640px) {
  .navbar__links { display: none; }
  .navbar__hire  { display: none; }
  .navbar__hamburger { display: flex; }
}
</style>
