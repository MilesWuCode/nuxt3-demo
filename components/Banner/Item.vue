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
      :alt="banner.name"
    />
  </a>
</template>
