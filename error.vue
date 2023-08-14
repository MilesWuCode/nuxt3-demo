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

const router = useRouter()

const historyLength = history.length
</script>

<template>
  <div class="hero min-h-screen">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">{{ error.statusCode }}</h1>
        <p class="py-6">
          {{ error.message }}
        </p>
        <div class="space-x-2">
          <button v-if="historyLength > 1" class="btn" @click="router.back()">
            Go Back
          </button>
          <button
            class="btn btn-primary"
            @click="() => clearError({ redirect: '/' })"
          >
            Take Me Home
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
