<script setup lang="ts">
import type { Post } from '@/types/post'

defineProps<{
  post: Post
}>()
</script>

<template>
  <NuxtLink :to="`/post/${post.id}`">
    <div class="card card-compact w-96 border border-base-300 bg-base-100">
      <img
        :src="post.cover"
        width="384"
        height="192"
        loading="lazy"
        :alt="post.title"
      />
      <div class="card-body">
        <h2 class="card-title">{{ post.title }}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
      </div>
    </div>
  </NuxtLink>
</template>
