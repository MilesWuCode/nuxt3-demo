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
    <h1 class="flex justify-center text-2xl">Login</h1>

    <!-- 區塊 -->
    <div class="flex justify-center">
      <div class="w-full max-w-sm">
        <!-- 表單 -->
        <LoginForm />

        <!-- 水平線 -->
        <div class="divider">OR</div>

        <!-- 其他登入 -->
        <div class="space-y-2">
          <AuthSignInButton class="btn w-full" provider="google">
            <NuxtIcon name="google" />
            Google
          </AuthSignInButton>
          <button class="btn w-full">
            <NuxtIcon name="apple" />
            Apple
          </button>
          <AuthSignInButton class="btn w-full" provider="line">
            Line
          </AuthSignInButton>
        </div>
      </div>
    </div>
  </div>
</template>
