<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})
const { data, status, getCsrfToken, getProviders } = useAuth()

const providers = await getProviders()
const csrfToken = await getCsrfToken()
</script>

<template>
  <div class="container m-2">
    <!-- 標題 -->
    <h1 class="flex justify-center text-2xl">Profile</h1>

    <!-- 區塊 -->
    <div class="flex justify-center">
      <div class="w-full max-w-sm">
        <p>providers: {{ providers }}</p>
        <p>csrfToken: {{ csrfToken }}</p>
      </div>
    </div>
  </div>
</template>
