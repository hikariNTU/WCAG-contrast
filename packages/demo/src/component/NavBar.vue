<template>
  <nav class="nav">
    <div class="nav-title">
      <img
        class="nav-title-icon"
        src="../assets/img/icon.svg"
        alt=""
        height="36"
      />
      <span class="nav-title-text">WCAG Contrast Utils</span>
      <span class="version-tag">{{ packageVersion }}</span>
    </div>
    <div class="nav-links">
      <IconLink
        href="./doc"
        title="Document"
      >
        <img
          src="../assets/img/doc.svg"
          height="24"
          alt="document"
        />
      </IconLink>
      <IconLink
        href="https://github.com/hikariNTU/WCAG-contrast"
        title="Github"
      >
        <img
          src="../assets/img/github.svg"
          height="24"
          alt="github"
        />
      </IconLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import IconLink from './IconLink.vue'
const packageVersion = PKG_VERSION
</script>

<style lang="scss">
.nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: var(--bd);
  gap: 24px;
}

.nav-title {
  display: grid;
  grid-template-areas: "icon title"
    "icon version";
  align-items: center;
  gap: 0 6px;

  &-icon {
    grid-area: icon;
  }

  &-text {
    font-weight: 700;
    color: #666;
    line-height: 1;
  }
}

.nav-links {
  color: #737373;
}


.version-tag {
  color: #737373;
  font-size: xx-small;
}
</style>