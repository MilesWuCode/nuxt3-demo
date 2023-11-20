<script setup lang="ts">
import type { Post } from '@/types/post'

const route = useRoute()

const { pending, data: post } = await useApiFetch<Post>(
  `/api/post/${route.params.id}`,
  {
    transform: (data: any) => {
      return data.data
    },
  },
)
</script>

<template>
  <div>
    <!-- hero -->
    <div
      class="hero h-80"
      :style="`background-image: url(${post?.cover_url});`"
    >
      <div class="hero-overlay bg-opacity-60"></div>
      <div class="hero-content text-center text-neutral-content">
        <div class="max-w-md">
          <h1 class="mb-5 text-5xl font-bold">{{ post?.title }}</h1>
        </div>
      </div>
    </div>

    <FavoriteButton
      :id="post?.id"
      :is-favorite="post?.reaction?.favorite_state"
    />

    <!-- content -->
    <div v-html="post?.content"></div>

    {{ post?.reaction }}
  </div>
</template>
