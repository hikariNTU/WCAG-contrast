<template>
  <h1 class="title">
    <span aria-hidden class="title-doppelganger">
      Can you
      <span class="underline-error aria-tooltip" aria-label="Contrast does not pass criteria">see these words
        clearly?</span></span>
    <span class="title-linear"> Can you see these words clearly? </span>
  </h1>
</template>

<style lang="scss">
.title {
  margin: 2rem 1rem;
  text-align: center;
}

.title-linear {
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-image: linear-gradient(to right, #777, #aaa, #ccc, #eee);
  background-clip: text;
}

.title-doppelganger {
  position: absolute;
  color: transparent;
  user-select: none;
  touch-action: none;
  pointer-events: none;
}

.underline-error {
  --x-font-size: 1rem !important;
  display: inline-block;
  pointer-events: initial;
  border-bottom: dashed rgb(230, 68, 68);
}
</style>
