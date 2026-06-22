<template>
  <div class="onboarding-layout">
    <div class="onboarding-container">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.onboarding-layout {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--va-background-secondary);
}

.onboarding-container {
  width: 100%;
  max-width: 720px;
  padding: 24px;
}
</style>