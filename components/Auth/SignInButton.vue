<script setup lang="ts">
const { signIn } = useAuth()

const { provider } = defineProps<{
  provider: string
}>()

const handelClick = async () => {
  await signIn(provider)
}
</script>

<template>
  <button @click="handelClick">
    <slot />
  </button>
</template>
