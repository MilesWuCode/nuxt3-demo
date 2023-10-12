<template>
  <div class="drawer">
    <!-- 切換的值 -->
    <input id="layout-default-drawer" type="checkbox" class="drawer-toggle" />

    <!-- 頁面內容 -->
    <div class="drawer-content flex flex-col overflow-x-auto">
      <slot />
    </div>

    <!-- 滑出內容 -->
    <div class="drawer-side z-10">
      <!-- 背景 -->
      <label for="layout-default-drawer" class="drawer-overlay"></label>

      <!-- 主目錄 -->
      <MainMenu />
    </div>
  </div>
</template>
