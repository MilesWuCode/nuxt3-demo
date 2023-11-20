<script setup lang="ts">
const { signOut, data } = useAuth()

const handelClick = async () => {
  window.Echo.leave(`App.Models.User.${data.value?.user.id}`)

  await useApiFetch('/api/auth/logout', {
    method: 'POST',
  })

  await signOut()
}
</script>

<template>
  <button @click="handelClick">logout</button>
</template>
