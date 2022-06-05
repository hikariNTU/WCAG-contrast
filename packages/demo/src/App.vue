<template>
  <div class="container">
    <NavBar
      style="
         {
          grid-area: nav;
        }
      "
    />
    <LinearTitle
      style="
         {
          grid-area: title;
        }
      "
    />
    <img
      src="@/assets/img/under-construction.svg"
      alt="under-construction"
      height="128"
      :style="{
        margin: '16px auto'
      }"
    />
    <ColorTemplate />
  </div>
</template>

<script setup lang="ts">
import NavBar from './component/NavBar.vue'
import LinearTitle from './component/LinearTitle.vue'
import ColorTemplate from './component/ColorTemplate.vue'
</script>

<style lang="scss" src="./assets/style.scss"></style>

<style lang="scss">
.container {
  display: grid;
  grid-template-areas:
    'nav'
    'title'
    'desc';
  grid-template-rows: min-content min-content min-content;
  min-height: 100%;
}

.desc {
  // grid-area: desc;
  display: flex;
  justify-content: center;
  text-align: left;
  padding: 12px;
  color: #666;
}
</style>
