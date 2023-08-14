<script setup lang="ts">
const { signIn } = useAuth()

const { provider } = defineProps<{
  provider: string
}>()

const onClick = () => {
  signIn(provider)
}
</script>

<template>
  <button @click="onClick">
    <slot />
  </button>
</template>
