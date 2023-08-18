<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  },
})
</script>

<template>
  <div class="container m-2">
    <!-- 標題 -->
    <h1 class="flex justify-center text-2xl">Index</h1>

    <!-- 區塊 -->
    <div class="flex justify-center">
      <div class="w-full max-w-sm">
        {{ $t('lang') }}
      </div>
    </div>
  </div>
</template>
