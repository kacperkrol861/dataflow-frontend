import { ref, computed } from 'vue'

const source = ref<string | null>(null)
const scanOptions = ref<string[]>([])
const schedule = ref(false)

export const useOnboarding = () => {

  const setSource = (value: string) => {
    source.value = value
  }

  const toggleOption = (value: string) => {
    const i = scanOptions.value.indexOf(value)

    if (i !== -1) {
      scanOptions.value.splice(i, 1)
    } else {
      scanOptions.value.push(value)
    }
  }

  const setSchedule = (value: boolean) => {
    schedule.value = value
  }

  const reset = () => {
    source.value = null
    scanOptions.value = []
    schedule.value = false
  }

  const selectedCount = computed(() => scanOptions.value.length)

  return {
    source,
    scanOptions,
    schedule,
    selectedCount,
    setSource,
    toggleOption,
    setSchedule,
    reset,
  }
}