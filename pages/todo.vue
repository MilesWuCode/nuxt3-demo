<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <div class="container m-2">
    <!-- 標題 -->
    <h1 class="flex justify-center text-2xl">Todo</h1>

    <!-- 區塊 -->
    <div class="flex justify-center">
      <div class="w-full max-w-sm">
        <Todo />
      </div>
    </div>
  </div>
</template>
