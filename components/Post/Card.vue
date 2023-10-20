<script setup lang="ts">
import type { Post } from '@/types/post'

defineProps<{
  post: Post
}>()
</script>

<template>
  <NuxtLink :to="`/post/${post.id}`">
    <div class="card card-compact w-96 border border-base-300 bg-base-100">
      <figure>
        <NuxtImg
          :src="post.cover"
          :alt="post.title"
          width="384"
          height="192"
          loading="lazy"
          placeholder="placeholder.jpg"
          class="h-[192px] w-[384px] object-cover"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title line-clamp-4 h-20">{{ post.title }}</h2>
      </div>
    </div>
  </NuxtLink>
</template>
