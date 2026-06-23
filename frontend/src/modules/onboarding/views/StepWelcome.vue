<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const start = () => {
  router.push('/onboarding/connect')
}
</script>

<template>
  <main class="welcome" role="main">

    <VaCard class="card">
      <VaCardContent class="content">

        <div class="logo" aria-hidden="true">⚡</div>

        <h1>Welcome to DataFlow</h1>

        <p class="subtitle">
          Build your first data pipeline in under 2 minutes
        </p>

        <ul class="steps">
          <li><span>1.</span> Connect a data source</li>
          <li><span>2.</span> Configure scan scope</li>
          <li><span>3.</span> See results instantly</li>
        </ul>

        <div class="hint">
          Fully guided onboarding • no setup complexity
        </div>

        <div class="ctaWrap">
          <VaButton
            size="large"
            class="btn"
            @click="start"
            aria-label="Start onboarding"
          >
            Start onboarding →
          </VaButton>
        </div>

      </VaCardContent>
    </VaCard>

  </main>
</template>

<style scoped>
.welcome {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: var(--va-spacing-xl, 24px);

  background:
    radial-gradient(circle at top,
      rgba(94,114,228,0.10),
      transparent 55%
    ),
    var(--va-background-secondary);
}

.card {
  width: 100%;
  max-width: 900px;
  min-height: 80vh;

  border-radius: var(--va-border-radius-xl, 28px);
  border: 1px solid var(--va-background-border);

  box-shadow: var(--va-shadow-xl);
}

.content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;
  padding: var(--va-spacing-xl, 48px) var(--va-spacing-lg, 28px);
}

.logo {
  font-size: 56px;
  margin-bottom: 14px;
  animation: float 2.5s ease-in-out infinite;
}

h1 {
  margin-bottom: 10px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.subtitle {
  opacity: 0.75;
  margin-bottom: 24px;
}

.steps {
  text-align: left;
  margin: 24px 0;
  max-width: 360px;
  opacity: 0.85;
  list-style: none;
  padding: 0;
}

.steps li {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.steps span {
  color: var(--va-primary);
  font-weight: 600;
}

.hint {
  margin-top: 10px;
  font-size: 12px;
  opacity: 0.6;
}

/* CTA */
.ctaWrap {
  margin-top: 32px;
  width: 100%;
  max-width: 320px;
}

.btn {
  width: 100%;
  font-weight: 700;

  box-shadow: var(--va-shadow-lg);

  transition: all 0.2s ease;
}

.btn:hover {
  transform: translateY(-3px);
}

.btn:active {
  transform: scale(0.98);
}

/* accessibility */
.btn:focus-visible {
  outline: 2px solid var(--va-primary);
  outline-offset: 3px;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
</style>