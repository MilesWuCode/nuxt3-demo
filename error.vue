<script setup lang="ts">
defineProps<{
  error: {
    statusCode: number
    message: string
  }
}>()

// 使用useError
// const error = useError()
// if (error.value.statusCode === 404) {
//   error.value.message = 'Oops! Page not found 😔'
// }
</script>

<template>
  <NuxtLayout name="default">
    <div class="flex justify-center">
      <div class="max-w-md space-y-4 text-center">
        <h1 class="text-5xl font-bold">{{ error.statusCode }}</h1>

        <p class="text-2xl">
          {{ error.message }}
        </p>

        <div class="space-x-2">
          <button class="btn" @click="() => clearError({ redirect: '/' })">
            Back to home
          </button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
