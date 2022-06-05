<template>
  <div
    role="presentation"
    class="color-ring-set"
  >
    <ColorRing
      :value="meta?.roundedLuminance"
      color="#eee"
      size="128px"
    >
      <div
        aria-hidden
        class="circle-mask dot-color"
        :style="{
          '--dot-color': meta?.solidHEX
        }"
      />
      <span>Luminance</span>
      {{ meta?.roundedLuminance }}
    </ColorRing>
    R
    <ColorRing
      :value="meta?.rgba[0]"
      color="#c44"
    />
    G
    <ColorRing
      :value="meta?.rgba[1]"
      color="#2a2"
    />
    B
    <ColorRing
      :value="meta?.rgba[2]"
      color="#55f"
    />
  </div>
</template>

<script lang="ts" setup>
import { ColorMeta } from '@/store/color'
import { PropType } from 'vue'
import ColorRing from './ColorRing.vue'

defineProps({
  meta: {
    type: Object as PropType<ColorMeta>,
  },
})
</script>

<style>
.color-ring-set{
  display: flex;
  gap: 4px;
  padding: 16px;
  background-color: var(--dark-bg);
  border-radius: 8px;
  color: #ccc;
}

/* .circle-mask{
  clip-path: circle(50%);
} */
.dot-color{
  width: 22px;
  height: 22px;
  border-radius: 30%;
  flex-shrink: 0;
  background-color: var(--dot-color, #ccc);
}
</style>