<script setup lang="ts">
import type { Post } from '@/types/post'

const route = useRoute()

const { data: post } = await useApiFetch<Post>(`/api/post/${route.params.id}`, {
  transform: (data: any): Post => {
    return data.data
  },
})
</script>

<template>
  <div v-if="post">
    <!-- hero -->
    <div class="hero" :style="`background-image: url(${post.cover_url});`">
      <div class="hero-overlay bg-opacity-60"></div>
      <div class="hero-content text-center text-neutral-content">
        <div class="max-w-md">
          <h1 class="mb-5 text-5xl font-bold">{{ post.title }}</h1>
        </div>
      </div>
    </div>

    <div class="flex space-x-3">
      <FavoriteButton
        :id="post.id"
        :is-favorite="post.reaction?.favorite_state"
      />

      <LikeButton
        v-if="post.reaction"
        :id="post.id"
        :reaction="post.reaction"
      />

      <ShareButton />
    </div>

    <!-- content -->
    <div v-html="post?.content"></div>
  </div>
</template>
