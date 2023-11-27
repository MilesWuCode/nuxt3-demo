<script setup lang="ts">
const env = process.env.NODE_ENV
</script>

<template>
  <div>
    <!-- 標題 -->
    <h1 class="flex justify-center text-2xl">Index</h1>

    <!-- 區塊 -->
    <div class="flex justify-center">
      <div class="w-full max-w-sm">
        <p>{{ $t('lang') }}</p>
        <p>{{ env }}</p>
      </div>
    </div>
  </div>
</template>
