<template>
  <div class="container">
    <div
      id="contrast-ratio-notation"
      class="notation"
    >
      Contrast Ratio
    </div>
    <div
      class="cr"
      aria-describedby="contrast-ratio-notation"
    >
      1 : <span class="crv">{{ store.roundedContrastRatio }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useColorStore } from '@/store/color'

const store = useColorStore()

</script>

<style lang="scss" scoped>
.container{
  display: flex;
  flex-direction: column;
}

.notation{
  color: #666;
  font-size: small;
}

.cr{
  color: #ccc;
  font-size: 4rem;
}

.crv{
  color: #666;
  font-weight: 700;
}
</style>