<script setup lang="ts">
const { signOut } = useAuth()

const handelClick = async () => {
  window.Echo.leaveAllChannels()

  await useApiFetch('/api/auth/logout', {
    method: 'POST',
  })

  await signOut()
}
</script>

<template>
  <button @click="handelClick">logout</button>
</template>
