<script setup lang="ts">
import type { Post } from '@/types/post'
import type { Paginate } from '@/types/paginate'
import { useApiFetch } from '@/composables/useApiFetch'

const { pending, data: posts } =
  await useApiFetch<Paginate<Post[]>>(`/api/post`)
</script>

<template>
  <div class="space-y-4">
    <div v-if="pending">L....</div>

    <div v-else class="flex flex-wrap justify-center gap-4">
      <PostCard v-for="post of posts?.data" :key="post.id" :post="post" />
    </div>
    <div class="flex justify-center">
      <div class="join">
        <button class="btn join-item">1</button>
        <button class="btn join-item">2</button>
        <button class="btn btn-disabled join-item">...</button>
        <button class="btn join-item">99</button>
        <button class="btn join-item">100</button>
      </div>
    </div>
  </div>
</template>
