<template>
  <a
    class="icon-link"
    :href="href"
    :title="title"
  >
    <slot />
    <span class="icon-link-title">{{ title }}</span>
  </a>
</template>

<script lang="ts" setup>
defineProps({
  href: {
    type: String,
    default: '',
  },
  title: {
    type: String,
  },
})
</script>

<style lang="scss">
.icon-link {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  margin: 0 4px;
  padding: 8px;
  border-radius: 4px;
  color: inherit;
  text-decoration: none;

  transition: background-color 0.1s;

  &:hover {
    background-color: #2221;
    color: #222;
  }

  &:active {
    background-color: #2222;
  }

  &-title {
    margin-left: 0.5rem;
  }
}
</style>
