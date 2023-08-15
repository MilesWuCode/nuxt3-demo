<script setup lang="ts">
const { signIn } = useAuth()

const { provider } = defineProps<{
  provider: string
}>()

const route = useRoute()

const handelClick = async () => {
  await signIn(provider, {
    callbackUrl: route.query.callbackUrl?.toString() || '/',
  })
}
</script>

<template>
  <button @click="handelClick">
    <slot />
  </button>
</template>
