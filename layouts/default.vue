<template>
  <Drawer>
    <!-- 導覽列 -->
    <Navbar />

    <slot />

    <!-- 導覽列 -->
    <BottomNavigation class="lg:hidden" />
  </Drawer>
</template>
