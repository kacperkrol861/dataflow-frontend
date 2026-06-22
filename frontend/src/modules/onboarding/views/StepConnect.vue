<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

type State = 'idle' | 'loading' | 'success' | 'error'

const state = ref<State>('idle')
const selected = ref<string | null>(null)

const sources = [
  { id: 'gdrive', label: 'Google Drive', icon: 'cloud' },
  { id: 'postgres', label: 'PostgreSQL', icon: 'storage' },
  { id: 's3', label: 'S3 Bucket', icon: 'cloud_queue' },
]

const canConnect = computed(() => !!selected.value)

const connect = () => {
  if (!selected.value) return

  state.value = 'loading'

  setTimeout(() => {
    const ok = Math.random() > 0.2
    state.value = ok ? 'success' : 'error'
  }, 1200)
}

const retry = () => {
  state.value = 'idle'
  selected.value = null
}

const next = () => {
  router.push('/onboarding/configure')
}
</script>

<template>
  <div class="page">

    <VaCard class="card">
      <VaCardContent class="content">

        <!-- HEADER -->
        <div class="header">
          <h2>Connect your data source</h2>
          <p>Choose where your data lives</p>
        </div>

        <!-- IDLE -->
        <div v-if="state === 'idle'" class="grid">

          <VaCard
            v-for="s in sources"
            :key="s.id"
            class="source"
            :class="{ active: selected === s.id }"
            @click="selected = s.id"
          >
            <div class="source-inner">

              <VaIcon
                :name="s.icon"
                size="22px"
                color="primary"
              />

              <div class="text">
                <div class="label">{{ s.label }}</div>
                <div class="desc">Click to connect</div>
              </div>

              <VaIcon
                v-if="selected === s.id"
                name="check"
                color="primary"
                size="18px"
                class="check"
              />

            </div>
          </VaCard>

        </div>

        
        <div v-else-if="state === 'loading'" class="state">
          <VaProgressCircle indeterminate size="48px" />
          <h3>Connecting...</h3>
          <p>Establishing secure connection</p>
        </div>

        
        <div v-else-if="state === 'success'" class="state success">
          <VaIcon name="check" color="success" size="56px" />
          <h3>Connected</h3>
          <p>Your source is ready for scanning</p>
        </div>

        
        <div v-else class="state error">
          <VaIcon name="error" color="danger" size="56px" />
          <h3>Connection failed</h3>
          <p>Please try again or choose another source</p>
        </div>

        
        <div class="ctaWrap">

          <VaButton
            v-if="state === 'idle'"
            class="cta"
            :disabled="!canConnect"
            @click="connect"
          >
            Connect →
          </VaButton>

          <VaButton
            v-else-if="state === 'success'"
            class="cta primary"
            @click="next"
          >
            Continue →
          </VaButton>

          <VaButton
            v-else-if="state === 'error'"
            class="cta"
            @click="retry"
          >
            Try again
          </VaButton>

        </div>

      </VaCardContent>
    </VaCard>

  </div>
</template>

<style scoped>

.page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 24px;

  background:
    radial-gradient(circle at top, rgba(94,114,228,0.12), transparent 55%),
    var(--va-background-secondary);
}


.card {
  width: 100%;
  max-width: 900px;
  min-height: 80vh;

  border-radius: 28px;
  border: 1px solid var(--va-background-border);

  box-shadow: 0 40px 120px rgba(0,0,0,0.18);
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


.header h2 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 6px;
}

.header p {
  opacity: 0.7;
  margin-bottom: 28px;
}


.grid {
  width: 100%;
  max-width: 520px;

  display: grid;
  gap: 12px;
}


.source {
  cursor: pointer;

  padding: 16px;

  border-radius: 14px;
  border: 1px solid var(--va-background-border);

  transition: all 0.2s ease;
}

.source:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(0,0,0,0.10);
}

.source-inner {
  display: flex;
  align-items: center;
  gap: 12px;
}

.text {
  flex: 1;
  text-align: left;
}

.label {
  font-weight: 600;
}

.desc {
  font-size: 12px;
  opacity: 0.6;
}

.check {
  margin-left: auto;
}


.active {
  border: 2px solid var(--va-primary);
  background: var(--va-background-secondary);

  box-shadow:
    0 0 0 3px rgba(94,114,228,0.15),
    0 10px 24px rgba(0,0,0,0.10);

  transform: scale(1.02);
}


.state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  padding: 40px 0;
}


.ctaWrap {
  margin-top: auto;
  width: 100%;
  max-width: 320px;
}

.cta {
  width: 100%;
  font-weight: 700;

  box-shadow: 0 14px 36px rgba(94,114,228,0.25);
}

.primary {
  transform: scale(1.03);
}
</style>