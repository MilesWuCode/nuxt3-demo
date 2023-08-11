<template>
  <!-- 抽屜功能 -->
  <Drawer>
    <!-- 導覽列 -->
    <Navbar />

    <!-- 中間 -->
    <div class="flex min-h-[calc(100dvh-64px-68px)]">
      <!-- 左側主目錄 -->
      <MainMenu class="hidden lg:block" />

      <!-- 右側頁面內容 -->
      <slot />
    </div>

    <!-- 頁腳 -->
    <Footer />

    <!-- 導覽列 -->
    <BottomNavigation class="lg:hidden" />
  </Drawer>
</template>
