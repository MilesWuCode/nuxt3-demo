<script setup lang="ts">
const { signOut } = useAuth()

const handelClick = async () => {
  await signOut()
}
</script>

<template>
  <button @click="handelClick">logout</button>
</template>
