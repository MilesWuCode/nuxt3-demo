<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
</script>

<template>
  <div class="navbar bg-base-100">
    <!-- 左邊 -->
    <div class="navbar-start">
      <NuxtLink to="/" class="btn btn-ghost text-xl normal-case">
        {{ runtimeConfig.public.appName }}
      </NuxtLink>
    </div>

    <!-- 中間 -->
    <div class="navbar-center"></div>

    <!-- 右邊 -->
    <div class="navbar-end">
      <!-- 搜尋 -->
      <button class="btn btn-circle btn-ghost">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>

      <!-- 語系 -->
      <LanguageSwitchButton />

      <!-- 通知 -->
      <button class="btn btn-circle btn-ghost">
        <div class="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span class="badge indicator-item badge-primary badge-xs"></span>
        </div>
      </button>

      <!-- 用戶 -->
      <NavbarUser />

      <!-- 小板目錄按鈕 -->
      <label
        for="layout-default-drawer"
        class="btn btn-circle btn-ghost lg:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block h-5 w-5 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </label>
    </div>
  </div>
</template>
