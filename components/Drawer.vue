<template>
  <div class="drawer">
    <input id="layout-default-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <!-- 頁面內容 -->
      <slot />
    </div>
    <div class="drawer-side">
      <label for="layout-default-drawer" class="drawer-overlay"></label>
      <!-- 滑出內容 -->
      <ul class="menu bg-base-200 h-full w-80 p-4">
        <!-- Sidebar content here -->
        <li><a>Sidebar Item 1</a></li>
        <li><a>Sidebar Item 2</a></li>
      </ul>
    </div>
  </div>
</template>
