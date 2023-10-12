<script setup lang="ts">
import { Banner } from './Banner.vue'
defineProps<{
  banner: Banner
}>()
</script>

<template>
  <a :href="banner.link">
    <NuxtImg
      :src="banner.cover"
      fit="cover"
      loading="lazy"
      width="600"
      height="300"
      :alt="banner.name"
    />
  </a>
</template>
