<template>
  <div class="color-template-container">
    <div
      role="presentation"
      class="color-template"
      :style="{
        '--ctx-color': store.text.color,
        '--ctx-bg': store.background.color,
      }"
    >
      <span>preview</span>
      <span style="font-size: 24px">{{ testText }}</span>
      <p>{{ testText }}</p>
      <p>{{ longDesc }}</p>
    </div>
    <div class="color-status">
      <ContrastRatio :value="store.roundedContrastRatio" />
    </div>
    <div class="color-picker-group">
      <ColorPicker
        label="Text Color"
        :color="textColor"
        :meta="store.textMeta"
        @change="(color) => store.$patch({ text: { color } })"
      />
      <ColorPicker
        label="Background Color"
        :color="bgColor"
        :meta="store.backgroundMeta"
        @change="(color) => store.$patch({ background: { color } })"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useColorStore, useHexColor } from '@/store/color'

import ColorPicker from './ColorPicker.vue'
import ContrastRatio from './ContrastRatio.vue'

const testText = 'The quick brown fox jumps over the lazy dog'
const longDesc = 'The intent of this Success Criterion is to provide enough contrast between text and its background so that it can be read by people with moderately low vision. For people without color deficiencies, hue and saturation have minimal or no effect on legibility as assessed by reading performance. Color deficiencies can affect luminance contrast somewhat. Therefore, in the recommendation, the contrast is calculated in such a way that color is not a key factor so that people who have a color vision deficit will also have adequate contrast between the text and the background.'
const store = useColorStore()
const textColor = useHexColor(computed(() => store.text.color))
const bgColor = useHexColor(computed(() => store.background.color))
</script>

<style lang="scss">
.color-template-container {
  display: grid;
  margin: 32px;
  grid-template-areas:
    'template status'
    'template picker';
  gap: 16px;
  grid-template-columns: min-content auto;
  justify-content: center;
  align-content: center;
}

.color-template {
  grid-area: template;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 40ch;
  padding: 32px;
  border-radius: 4px;
  border: var(--bd);
  color: var(--ctx-color);
  background-color: var(--ctx-bg);
  border-radius: 8px;
  font-size: 16px;
}

.color-status {
  grid-area: status;
}

.color-picker-group {
  grid-area: picker;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
