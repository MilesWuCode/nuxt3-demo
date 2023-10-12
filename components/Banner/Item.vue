<script setup lang="ts">
import { Banner } from './Banner.vue'

defineProps<{
  banner: Banner
}>()
</script>

<template>
  <a :href="banner.link">
    <img :src="banner.cover" :alt="banner.name" loading="lazy" />
  </a>
</template>
