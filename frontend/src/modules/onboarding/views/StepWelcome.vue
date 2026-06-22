<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const start = () => {
  router.push('/onboarding/connect')
}
</script>

<template>
  <div class="welcome">

    <VaCard class="card">
      <VaCardContent class="content">

        
        <div class="logo">⚡</div>

        <h1>Welcome to DataFlow</h1>

        <p class="subtitle">
          Build your first data pipeline in under 2 minutes
        </p>

        
        <ul class="steps">
          <li>Connect a data source</li>
          <li>Configure scan scope</li>
          <li>See results instantly</li>
        </ul>

        
        <div class="hint">
          No setup complexity • fully guided experience
        </div>

        
        <div class="ctaWrap">
          <VaButton
            size="large"
            class="btn"
            @click="start"
          >
            Continue →
          </VaButton>
        </div>

      </VaCardContent>
    </VaCard>

  </div>
</template>

<style scoped>

.welcome {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 24px;

  background:
    radial-gradient(circle at top, rgba(94,114,228,0.10), transparent 55%),
    var(--va-background-secondary);
}


.card {
  width: 100%;
  max-width: 900px;
  min-height: 80vh;

  border-radius: 28px;

  border: 1px solid var(--va-background-border);

  box-shadow: 0 40px 120px rgba(0,0,0,0.15);
}


.content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;
  padding: 48px 28px;
}


.logo {
  font-size: 56px;
  margin-bottom: 14px;
  animation: float 2.5s ease-in-out infinite;
}

h1 {
  font-size: 36px;
  margin-bottom: 10px;
  font-weight: 700;
  letter-spacing: -0.03em;
}

.subtitle {
  opacity: 0.75;
  margin-bottom: 22px;
  font-size: 15px;
}

.steps {
  text-align: left;
  margin: 24px 0;
  max-width: 360px;
  font-size: 15px;
  opacity: 0.85;
}

.steps li {
  margin-bottom: 8px;
}

.hint {
  margin-top: 10px;
  font-size: 12px;
  opacity: 0.6;
}


.ctaWrap {
  margin-top: 32px;
  width: 100%;
  max-width: 320px;
}


.btn {
  width: 100%;
  font-weight: 700;
  font-size: 16px;

  border-radius: 14px;

  box-shadow: 0 16px 40px rgba(94,114,228,0.28);

  transition: all 0.2s ease;
}

.btn:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 22px 60px rgba(94,114,228,0.35);
}

.btn:active {
  transform: scale(0.98);
}


@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}


@media (max-width: 768px) {
  .card {
    min-height: 100vh;
    border-radius: 18px;
  }

  h1 {
    font-size: 28px;
  }

  .steps {
    font-size: 14px;
  }
}
</style>