<script setup lang="ts">
import type { Post } from '@/types/post'

type PostResult = {
  posts: {
    data: Post[]
  }
}

const query = gql`
  query {
    posts(first: 3, page: 1) {
      data {
        id
        title
      }
    }
  }
`

const { data } = await useAsyncQuery<PostResult>(query)
</script>

<template>
  <div>
    <!-- 標題 -->
    <h1 class="flex justify-center text-2xl">Graphql</h1>
    <pre>{{ data.posts }}</pre>
  </div>
</template>
