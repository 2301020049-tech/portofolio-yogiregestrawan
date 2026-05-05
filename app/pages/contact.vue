<script setup lang="ts">
import { ref } from 'vue'

useHead({
  title: 'Contact | Portfolio',
  meta: [
    {
      name: 'description',
      content: 'Get in touch for Roblox development, photography, or graphic design inquiries.',
    },
  ],
})

const form = ref({
  name: '',
  email: '',
  service: '',
  message: '',
})

const isSubmitted = ref(false)

function handleSubmit() {
  console.log('Form Submitted Data:', form.value)
  isSubmitted.value = true
  
  // Reset after 5 seconds
  setTimeout(() => {
    isSubmitted.value = false
    form.value = {
      name: '',
      email: '',
      service: '',
      message: '',
    }
  }, 5000)
}
</script>

<template>
  <div class="contact-page">
    <div class="contact-page__inner">
      
      <!-- Header -->
      <header class="contact-header">
        <div class="contact-badge" role="status" aria-label="Status: Open for work">
          <span class="contact-badge__dot" aria-hidden="true" />
          <span class="contact-badge__text">Open for work</span>
        </div>
        
        <h1 class="contact-header__title">Let's Work Together</h1>
        <p class="contact-header__sub">
          Have a project in mind? Fill out the form below and I'll get back to you as soon as possible.
        </p>
      </header>

      <!-- Form Section -->
      <div class="contact-form-wrapper">
        <Transition name="fade" mode="out-in">
          <div v-if="isSubmitted" class="contact-success">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="contact-success__icon" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 class="contact-success__title">Message sent!</h2>
            <p class="contact-success__text">Thank you for reaching out. I'll get back to you soon.</p>
          </div>
          
          <form v-else class="contact-form" @submit.prevent="handleSubmit">
            <!-- Name -->
            <div class="form-group">
              <label for="name" class="form-label">Name</label>
              <input 
                id="name" 
                v-model="form.name" 
                type="text" 
                class="form-input" 
                placeholder="John Doe" 
                required 
              />
            </div>

            <!-- Email -->
            <div class="form-group">
              <label for="email" class="form-label">Email</label>
              <input 
                id="email" 
                v-model="form.email" 
                type="email" 
                class="form-input" 
                placeholder="john@example.com" 
                required 
              />
            </div>

            <!-- Service -->
            <div class="form-group">
              <label for="service" class="form-label">Required Service</label>
              <select id="service" v-model="form.service" class="form-input" required>
                <option value="" disabled selected>Select a service</option>
                <option value="Photo Session">Photo Session</option>
                <option value="Roblox Map">Roblox Map</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <!-- Message -->
            <div class="form-group">
              <label for="message" class="form-label">Message</label>
              <textarea 
                id="message" 
                v-model="form.message" 
                class="form-input form-input--textarea" 
                placeholder="Tell me about your project..." 
                rows="5"
                required
              ></textarea>
            </div>

            <!-- Submit -->
            <button type="submit" class="btn-submit">
              Send Message
              <svg viewBox="0 0 20 20" fill="currentColor" class="btn-submit__icon" aria-hidden="true">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </form>
        </Transition>
      </div>

      <!-- Socials -->
      <div class="contact-socials">
        <p class="contact-socials__label">Find me on</p>
        <div class="contact-socials__links">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="social-link__icon" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
            Instagram
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="social-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="social-link__icon" aria-hidden="true">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
            </svg>
            GitHub
          </a>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.contact-page {
  min-height: 100vh;
  background-color: var(--color-bg);
  padding: var(--space-16) var(--space-6) var(--space-20);
}

.contact-page__inner {
  max-width: 600px;
  margin: 0 auto;
}

/* ─── Header ─────────────────────────────────────────────────────────── */
.contact-header {
  text-align: center;
  margin-bottom: var(--space-12);
}

.contact-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  margin-bottom: var(--space-6);
}

.contact-badge__dot {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background-color: var(--color-accent);
  flex-shrink: 0;
  animation: pulse 2.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.6; transform: scale(0.85); }
}

.contact-badge__text {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.contact-header__title {
  font-family: var(--font-serif);
  font-size: var(--text-4xl);
  font-weight: var(--font-regular);
  color: var(--color-text);
  margin-bottom: var(--space-4);
}

.contact-header__sub {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  color: var(--color-muted);
  line-height: 1.6;
}

/* ─── Form ───────────────────────────────────────────────────────────── */
.contact-form-wrapper {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  margin-bottom: var(--space-12);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.form-label {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-text);
}

.form-input {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  color: var(--color-text);
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-4);
  outline: none;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.form-input::placeholder {
  color: var(--color-muted);
  opacity: 0.5;
}

.form-input:focus {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-accent) 20%, transparent);
}

.form-input--textarea {
  resize: vertical;
  min-height: 120px;
}

/* Select styling */
select.form-input {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%239A9690%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right var(--space-4) center;
  background-size: 16px;
  padding-right: var(--space-10);
}

/* Submit Button */
.btn-submit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--color-accent-fg);
  background-color: var(--color-accent);
  border: none;
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: opacity var(--transition-fast);
  margin-top: var(--space-2);
}

.btn-submit:hover {
  opacity: 0.85;
}

.btn-submit__icon {
  width: 18px;
  height: 18px;
}

/* Success State */
.contact-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--space-12) 0;
  color: var(--color-text);
}

.contact-success__icon {
  width: 48px;
  height: 48px;
  color: var(--color-accent);
  margin-bottom: var(--space-4);
}

.contact-success__title {
  font-family: var(--font-serif);
  font-size: var(--text-2xl);
  margin-bottom: var(--space-2);
}

.contact-success__text {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  color: var(--color-muted);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ─── Socials ────────────────────────────────────────────────────────── */
.contact-socials {
  text-align: center;
}

.contact-socials__label {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-muted);
  margin-bottom: var(--space-4);
}

.contact-socials__links {
  display: flex;
  justify-content: center;
  gap: var(--space-6);
}

.social-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-text);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.social-link:hover {
  color: var(--color-accent);
}

.social-link__icon {
  width: 20px;
  height: 20px;
}

/* ─── Responsive ─────────────────────────────────────────────────────── */
@media (max-width: 640px) {
  .contact-page {
    padding: var(--space-10) var(--space-4) var(--space-16);
  }
  
  .contact-form-wrapper {
    padding: var(--space-6) var(--space-4);
  }
}
</style>
