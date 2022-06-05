<template>
  <div class="color-picker">
    <label class="color-input-label">
      {{ label }} ({{ meta?.solidHEX }})
      <input
        type="color"
        :value="color"
        name="text-color"
        @change="(event) => {
          $emit('change', (event.target as HTMLInputElement)?.value) }"
      />
    </label>
    <ColorRingSet :meta="meta" />
  </div>
</template>

<script lang="ts" setup>
import { ColorMeta } from '@/store/color'
import { PropType } from 'vue'
import ColorRing from './ColorRing.vue'
import ColorRingSet from './ColorRingSet.vue'

defineProps({
  color: {
    type: String,
  },
  meta: {
    type: Object as PropType<ColorMeta>,
  },
  label: {
    type: String,
  },
})
defineEmits<{
  (event: 'change', val: string): void
}>()
</script>

<style lang="scss">
.color-picker{
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.color-input-label{
  display: flex;
  color: #555;
  flex-direction: column;
  cursor: pointer;
  >input{
    cursor: pointer;
    width: 32px;
    height: 32px;
    border-radius: 4px;
    border: var(--bd);
    background-color: white;
  }
}
</style>