<script setup lang="ts">
import type { Post } from '@/types/post'

type PostResult = {
  posts: {
    data: Post[]
  }
}

const query = gql`
  query ExampleQuery {
    company {
      ceo
    }
    roadster {
      apoapsis_au
    }
  }
`

const { data } = await useAsyncQuery<PostResult>(query)
</script>

<template>
  <div>
    <!-- 標題 -->
    <h1 class="flex justify-center text-2xl">Graphql</h1>
    <pre>{{ data }}</pre>
  </div>
</template>
