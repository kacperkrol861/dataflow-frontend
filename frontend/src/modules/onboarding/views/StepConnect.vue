<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useOnboarding } from '@/shared/composables/useOnboarding'

const router = useRouter()
const onboarding = useOnboarding()

type State = 'idle' | 'loading' | 'success' | 'error'

const state = ref<State>('idle')

const loadingStep = ref<string>('Establishing connection...')

const sources = [
  { id: 'gdrive', label: 'Google Drive', icon: 'cloud' },
  { id: 'postgres', label: 'PostgreSQL', icon: 'storage' },
  { id: 's3', label: 'S3 Bucket', icon: 'cloud_queue' },
]

const steps = [
  'Establishing connection...',
  'Validating credentials...',
  'Syncing schema...',
  'Finalizing setup...',
]

let interval: ReturnType<typeof setInterval> | null = null
let stepIndex = 0

const clearStepInterval = () => {
  if (interval) {
    clearInterval(interval)
    interval = null
  }
}

const startLoadingSteps = () => {
  stepIndex = 0
  clearStepInterval()

  interval = setInterval(() => {
    loadingStep.value = steps[stepIndex] ?? steps.at(-1)!
    stepIndex++

    if (stepIndex >= steps.length) {
      clearStepInterval()
    }
  }, 650)
}

const canConnect = computed(() => onboarding.source !== null)

const connect = () => {
  if (!onboarding.source) return

  state.value = 'loading'
  startLoadingSteps()

  setTimeout(() => {
    const ok = Math.random() > 0.2

    clearStepInterval()
    state.value = ok ? 'success' : 'error'
  }, 2800)
}

const retry = () => {
  state.value = 'idle'
  onboarding.reset()
  loadingStep.value = 'Establishing connection...'
  clearStepInterval()
}

const next = () => {
  router.push('/onboarding/configure')
}

const selectSource = (id: string) => {
  onboarding.setSource(id)
}

onBeforeUnmount(() => {
  clearStepInterval()
})
</script>

<template>
  <div class="page">

    <VaCard class="card">
      <VaCardContent class="content">

        <div class="header">
          <h2>Connect your data source</h2>
          <p>Select where your data lives</p>
        </div>

        <!-- IDLE -->
        <div v-if="state === 'idle'" class="grid" role="group" aria-label="Data sources">

          <VaCard
            v-for="s in sources"
            :key="s.id"
            class="source"
            :class="{ active: onboarding.source?.value === s.id}"
            tabindex="0"
            role="button"
            :aria-pressed="onboarding.source?.value === s.id"
            @click="selectSource(s.id)"
          >
            <div class="source-inner">

              <VaIcon :name="s.icon" size="24px" color="primary" />

              <div class="text">
                <div class="label">{{ s.label }}</div>
                <div class="desc">Click to connect</div>
              </div>

              <VaIcon
                v-if="onboarding.source?.value === s.id"
                name="check_circle"
                size="18px"
                color="primary"
              />

            </div>
          </VaCard>

        </div>

        <!-- LOADING -->
        <div v-else-if="state === 'loading'" class="state">
          <VaProgressCircle indeterminate size="56px" />
          <h3>Connecting...</h3>
          <p class="muted">{{ loadingStep }}</p>
        </div>

        <!-- SUCCESS -->
        <div v-else-if="state === 'success'" class="state success">
          <VaIcon name="check_circle" color="success" size="64px" />
          <h3>Connection successful</h3>
          <p class="muted">Your source is ready for scanning</p>

          <div class="nextHint">
            Next step: configure scan scope
          </div>
        </div>

        <!-- ERROR -->
        <div v-else class="state error">
          <VaIcon name="error" color="danger" size="64px" />
          <h3>Connection failed</h3>
          <p class="muted">Please try again or choose another source</p>
        </div>

        <!-- CTA -->
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
  max-width: 960px;
  min-height: 82vh;

  border-radius: 28px;
  border: 1px solid var(--va-background-border);

  box-shadow: 0 40px 120px rgba(0,0,0,0.18);
}

.content {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

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

.muted {
  opacity: 0.7;
}

.nextHint {
  margin-top: 10px;
  font-size: 13px;
  color: var(--va-primary);
}

.ctaWrap {
  margin-top: auto;
  width: 100%;
  max-width: 340px;
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