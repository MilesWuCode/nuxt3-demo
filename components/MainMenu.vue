<script setup lang="ts">
const menu = [
  { name: 'Index', href: '/' },
  { name: 'Login', href: '/login' },
]
</script>

<template>
  <ul class="menu menu-md bg-base-100 h-full w-80 p-4">
    <li v-for="item in menu" :key="item.name">
      <NuxtLink :to="item.href">{{ item.name }}</NuxtLink>
    </li>
  </ul>
</template>
