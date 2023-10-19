<script setup lang="ts">
import type { Post } from '@/types/post'
import type { Paginate } from '@/types/paginate'
import { useApiFetch } from '@/composables/useApiFetch'

const page = ref(1)

const { pending, data: posts } = await useApiFetch<Paginate<Post[]>>(
  `/api/post`,
  { query: { limit: 8, page } },
)
</script>

<template>
  <div class="space-y-4">
    <div v-if="pending">L....</div>

    <div v-else class="flex flex-wrap justify-center gap-4">
      <PostCard v-for="post of posts?.data" :key="post.id" :post="post" />
    </div>

    <div v-if="posts?.meta.total" class="flex justify-center">
      <Pagination v-model="page" :total-page="posts?.meta.last_page" />
    </div>
  </div>
</template>
