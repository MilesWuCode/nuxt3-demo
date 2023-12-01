<script setup lang="ts">
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

const { data } = await useAsyncQuery(query)
</script>

<template>
  <div>
    <!-- 標題 -->
    <h1 class="flex justify-center text-2xl">Graphql</h1>
    <pre>{{ data }}</pre>
  </div>
</template>
