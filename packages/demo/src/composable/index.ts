import { computed, Ref, unref } from 'vue'

export const useFloor = (v: number | Ref<number>, digit = 2) => {
  const div = 10 ** digit
  return computed(() => Math.floor(unref(v) * div) / div)
}
