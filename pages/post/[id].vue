<script setup lang="ts">
type Post = {
  id: string | number
  name: string
}

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
    <!-- 標題 -->
    <h1 class="flex justify-center text-2xl">Post {{ $route.params.id }}</h1>

    <div v-if="pending">Loading...</div>

    <template v-else>
      {{ post }}
    </template>
  </div>
</template>
