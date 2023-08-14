<script setup lang="ts">
const { signOut } = useAuth()
</script>

<template>
  <button @click="() => signOut()">logout</button>
</template>
