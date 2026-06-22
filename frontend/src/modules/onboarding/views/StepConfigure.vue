<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const schedule = ref(false)

const options = ref([
  { id: 'files', label: 'Files & Documents', value: false },
  { id: 'db', label: 'Database Tables', value: false },
  { id: 'logs', label: 'System Logs', value: false },
  { id: 'users', label: 'User Activity', value: false },
])

const selectedCount = computed(() =>
  options.value.filter(o => o.value).length
)

const canContinue = computed(() => selectedCount.value > 0)

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
          <p>Select what data should be included</p>
        </div>

        
        <div class="grid">

          <VaCard
            v-for="opt in options"
            :key="opt.id"
            class="option"
            :class="{ active: opt.value }"
            @click="opt.value = !opt.value"
          >
            <div class="option-inner">

              <VaCheckbox v-model="opt.value" />

              <div class="text">
                <div class="label">{{ opt.label }}</div>
                <div class="desc">Included in analysis</div>
              </div>

              <VaIcon
                v-if="opt.value"
                name="check"
                size="18px"
                color="primary"
                class="check"
              />

            </div>
          </VaCard>

        </div>

        <VaDivider class="divider" />

        <!-- SCHEDULE -->
        <div class="schedule">

          <VaCheckbox
            v-model="schedule"
            label="Run scan daily (scheduled)"
          />

          <p class="hint">
            Optional automation to keep your data continuously updated
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

/* GRID */
.grid {
  width: 100%;
  max-width: 520px;

  display: grid;
  gap: 12px;
}


.option {
  cursor: pointer;

  padding: 16px;

  border-radius: 14px;

  border: 1px solid var(--va-background-border);

  transition: all 0.2s ease;
  text-align: left;
}

.option:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(0,0,0,0.10);
}


.option-inner {
  display: flex;
  align-items: center;
  gap: 12px;
}

.text {
  flex: 1;
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

.schedule {
  margin-top: 16px;
  opacity: 0.9;
  text-align: left;
  width: 100%;
  max-width: 520px;
}

.hint {
  font-size: 12px;
  opacity: 0.6;
  margin-left: 28px;
}

.divider {
  width: 100%;
  max-width: 520px;
  margin: 18px 0;
}

.ctaWrap {
  margin-top: 28px;
  width: 100%;
  max-width: 320px;
}

.cta {
  width: 100%;
  font-weight: 700;

  box-shadow: 0 14px 36px rgba(94,114,228,0.25);
}
</style>