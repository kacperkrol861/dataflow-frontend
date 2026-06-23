<script setup lang="ts">
import { computed, ref, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useOnboarding } from '@/shared/composables/useOnboarding'

const router = useRouter()
const onboarding = useOnboarding()

type State = 'idle' | 'running' | 'done'
const state = ref<State>('idle')

const progress = ref(0)
let interval: ReturnType<typeof setInterval> | null = null

type OptionId = 'files' | 'db' | 'logs' | 'users'

const selectedOptionsMap: Record<OptionId, string> = {
  files: 'Files & Documents',
  db: 'Database Tables',
  logs: 'System Logs',
  users: 'User Activity',
}

const selectedOptions = computed(() => {
  return onboarding.scanOptions.value
    .map((id) => selectedOptionsMap[id as OptionId])
    .filter(Boolean)
})

const startScan = () => {
  state.value = 'running'
  progress.value = 0

  interval = setInterval(() => {
    progress.value += Math.floor(Math.random() * 15) + 5

    if (progress.value >= 100) {
      progress.value = 100
      state.value = 'done'
      if (interval) clearInterval(interval)
    }
  }, 400)
}

const reset = () => {
  onboarding.reset()
  router.push('/onboarding/connect')
}

onBeforeUnmount(() => {
  if (interval) clearInterval(interval)
})
</script>

<template>
  <div class="page">

    <VaCard class="card">
      <VaCardContent class="content">

        <div class="header">
          <h2>Review & Start</h2>
          <p>Check your configuration before running the scan</p>
        </div>

        <!-- SUMMARY -->
        <div class="summary">

          <div class="block">
            <h3>Data source</h3>
            <p>{{ onboarding.source.value ?? 'No source selected' }}</p>
          </div>

          <div class="block">
            <h3>Scan scope</h3>

            <ul v-if="selectedOptions.length">
              <li v-for="o in selectedOptions" :key="o">
                {{ o }}
              </li>
            </ul>

            <p v-else>No options selected</p>
          </div>

          <div class="block">
            <h3>Schedule</h3>
            <p>
              {{ onboarding.schedule.value
                ? 'Daily automated scan enabled'
                : 'One-time scan' }}
            </p>
          </div>

        </div>

        <!-- RUNNING -->
        <div v-if="state === 'running'" class="progress">
          <VaProgressBar :model-value="progress" />
          <p>Scanning... {{ progress }}%</p>

          <div class="preview">
            <div class="fake-row" v-for="n in 3" :key="n">
              Processing dataset {{ n }}...
            </div>
          </div>
        </div>

        <!-- DONE -->
        <div v-else-if="state === 'done'" class="done">
          <VaIcon name="check_circle" size="64px" color="success" />
          <h3>Scan completed</h3>
          <p>Results are ready</p>

          <div class="preview">
            <div class="fake-row success">✔ Files analyzed</div>
            <div class="fake-row success">✔ Patterns detected</div>
            <div class="fake-row success">✔ Report generated</div>
          </div>
        </div>

        <!-- CTA -->
        <div class="ctaWrap">

          <VaButton
            v-if="state === 'idle'"
            class="cta"
            @click="startScan"
          >
            Start scan →
          </VaButton>

          <VaButton
            v-else-if="state === 'done'"
            class="cta"
            @click="reset"
          >
            New scan
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
  justify-content: center;
  align-items: center;
  padding: 24px;
  background: var(--va-background-secondary);
}

.card {
  width: 100%;
  max-width: 900px;
  border-radius: 24px;
}

.content {
  text-align: center;
  padding: 48px 24px;
}

.header h2 {
  font-size: 28px;
  margin-bottom: 6px;
}

.summary {
  text-align: left;
  max-width: 520px;
  margin: 24px auto;
  display: grid;
  gap: 16px;
}

.block h3 {
  font-size: 14px;
  opacity: 0.7;
}

.block p,
.block li {
  font-weight: 500;
}

.progress {
  margin-top: 24px;
}

.preview {
  margin-top: 16px;
  font-size: 13px;
  opacity: 0.7;
}

.fake-row {
  padding: 4px 0;
}

.fake-row.success {
  color: var(--va-primary);
  font-weight: 600;
}

.done {
  margin-top: 24px;
}

.ctaWrap {
  margin-top: 32px;
}

.cta {
  width: 100%;
  max-width: 280px;
  font-weight: 700;
}
</style>