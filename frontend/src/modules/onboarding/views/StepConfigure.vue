<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useOnboarding } from '@/shared/composables/useOnboarding'

const router = useRouter()
const onboarding = useOnboarding()

const options = [
  { id: 'files', label: 'Files & Documents' },
  { id: 'db', label: 'Database Tables' },
  { id: 'logs', label: 'System Logs' },
  { id: 'users', label: 'User Activity' },
]

const canContinue = computed(() => onboarding.selectedCount.value > 0)

const toggle = (id: string) => {
  onboarding.toggleOption(id)
}

const onKey = (e: KeyboardEvent, id: string) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    toggle(id)
  }
}

const next = () => {
  router.push('/onboarding/review')
}
</script>

<template>
  <div class="page">

    <VaCard class="card">
      <VaCardContent class="content">

        <div class="header">
          <h2>Configure your scan</h2>
          <p>Select what data should be included in analysis</p>
        </div>

        <div class="grid" role="group" aria-label="Scan configuration options">

          <div
            v-for="opt in options"
            :key="opt.id"
            class="option"
            :class="{ active: onboarding.scanOptions.value.includes(opt.id) }"
            tabindex="0"
            role="checkbox"
            :aria-checked="onboarding.scanOptions.value.includes(opt.id)"
            @click="toggle(opt.id)"
            @keydown="onKey($event, opt.id)"
          >
            <div class="option-inner">

              <VaIcon
                :name="onboarding.scanOptions.value.includes(opt.id)
                  ? 'check_circle'
                  : 'radio_button_unchecked'"
                size="22px"
                color="primary"
              />

              <div class="text">
                <div class="label">{{ opt.label }}</div>
                <div class="desc">
                  {{ onboarding.scanOptions.value.includes(opt.id)
                    ? 'Included in scan'
                    : 'Click to include' }}
                </div>
              </div>

            </div>
          </div>

        </div>

        <VaDivider class="divider" />

        <div class="schedule">
          <VaCheckbox
            v-model="onboarding.schedule.value"
            label="Run scan daily (scheduled)"
          />

          <p class="hint">
            Optional automation to keep data continuously updated
          </p>
        </div>

        <div class="ctaWrap">

          <VaButton
            class="cta"
            :disabled="!canContinue"
            @click="next"
          >
            Continue →
          </VaButton>

          <div class="meta" aria-live="polite">
            {{ onboarding.selectedCount.value }} selected
          </div>

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

  padding: var(--va-spacing-lg, 24px);

  background:
    radial-gradient(circle at top, rgba(94,114,228,0.12), transparent 55%),
    var(--va-background-secondary);
}

.card {
  width: 100%;
  max-width: 900px;
  min-height: 82vh;

  border-radius: var(--va-border-radius-xl, 28px);
  border: 1px solid var(--va-background-border);

  box-shadow: var(--va-shadow-xl);
}

.content {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;
  padding: var(--va-spacing-xl, 48px) var(--va-spacing-lg, 28px);
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

/* GRID */
.grid {
  width: 100%;
  max-width: 520px;
  display: grid;
  gap: 12px;
}

/* OPTION */
.option {
  cursor: pointer;
  padding: 16px;
  border-radius: 14px;
  border: 1px solid var(--va-background-border);
  transition: all 0.2s ease;
  outline: none;
}

.option:hover {
  transform: translateY(-2px);
  box-shadow: var(--va-shadow-md);
}

.option:focus-visible {
  outline: 2px solid var(--va-primary);
  outline-offset: 3px;
}

.option-inner {
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

/* ACTIVE */
.active {
  border: 2px solid var(--va-primary);
  background: var(--va-background-secondary);
  box-shadow:
    0 0 0 3px rgba(94,114,228,0.12),
    var(--va-shadow-md);
}

/* SCHEDULE */
.schedule {
  margin-top: 16px;
  text-align: left;
  width: 100%;
  max-width: 520px;
}

.hint {
  font-size: 12px;
  opacity: 0.6;
  margin-left: 28px;
}

/* CTA */
.ctaWrap {
  margin-top: 28px;
  width: 100%;
  max-width: 320px;
}

.cta {
  width: 100%;
  font-weight: 700;
  box-shadow: var(--va-shadow-lg);
}

.meta {
  margin-top: 10px;
  font-size: 12px;
  opacity: 0.6;
}
</style>