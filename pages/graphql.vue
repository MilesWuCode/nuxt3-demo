<script setup lang="ts">
const query = gql`
  query getShips($limit: Int!) {
    ships(limit: $limit) {
      id
      name
    }
  }
`
const variables = { limit: 5 }
const { data } = await useAsyncQuery(query, variables)
</script>

<template>
  <div>
    <!-- 標題 -->
    <h1 class="flex justify-center text-2xl">Graphql</h1>
  </div>
</template>
