<template>
  <div class="layout">
    <AppNavbar />
    <main class="layout__main">
      <slot />
    </main>
  </div>
</template>

<style>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.layout__main {
  flex: 1;
}
</style>
