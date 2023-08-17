<script setup lang="ts">
const menu = [
  { name: 'Index', href: '/' },
  { name: 'Register', href: '/register' },
  { name: 'Login', href: '/login' },
  { name: 'Profile', href: '/profile' },
]

const hideMenu = () => {
  const drawerCheckbox = document.getElementById(
    'layout-default-drawer',
  ) as HTMLInputElement | null

  if (drawerCheckbox !== null) {
    drawerCheckbox.checked = false
  }
}
</script>

<template>
  <ul class="menu menu-md h-full w-80 bg-base-100 p-4">
    <li v-for="item in menu" :key="item.name">
      <NuxtLink :to="item.href" @click="hideMenu">{{ item.name }}</NuxtLink>
    </li>
  </ul>
</template>
