<template>
  <div
    role="presentation"
    class="color-ring"
    :style="{
      '--color-turn': turns,
      '--ring-color': color,
      '--ring-size': size,
    }"
  >
    <div
      aria-hidden
      class="color-ring-center"
    />
    <div class="color-ring-text">
      <slot>{{ roundedValue }}</slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useFloor } from '@/composable'
import { computed, unref } from 'vue'

const props = defineProps({
  value: {
    type: Number,
    default: 0.3
  },
  color: {
    type: String,
    default: '#444'
  },
  size: {
    type: String,
    default: '64px'
  }
})
const roundedValue = useFloor(computed(() => props.value))
const turns = computed(() => `${unref(roundedValue)}turn`)
</script>


<style lang="scss">
.color-ring {
  --ring-size: 64px;
  --color-turn: 0turn;
  --ring-color: #444;
  position: relative;
  background: conic-gradient(var(--ring-color), var(--color-turn), var(--ring-color), var(--color-turn), #666);
  width: var(--ring-size);
  height: var(--ring-size);
  clip-path: circle(50% at 50% 50%);

  &-center {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--dark-bg);
    clip-path: circle(37.5% at 50% 50%);
  }

  &-text {
    position: absolute;
    display: flex;
    gap: 4px;
    flex-direction: column;
    width: 100%;
    height: 100%;
    white-space: nowrap;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: smaller;
  }
}
</style>