<script setup lang="ts">
import type { Banner } from '@/types/banner'

defineProps<{
  banner: Banner
}>()
</script>

<template>
  <a :href="banner.link">
    <NuxtImg
      :src="banner.cover"
      :alt="banner.name"
      width="600"
      height="300"
      loading="lazy"
      placeholder="placeholder.jpg"
      class="h-[300px] w-[600px] object-cover"
    />
  </a>
</template>
