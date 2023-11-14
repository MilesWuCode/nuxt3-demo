<script setup lang="ts">
const { status, data } = useAuth()

const isSignIn = computed(() => status.value === 'authenticated')
</script>

<template>
  <div v-if="isSignIn" class="dropdown dropdown-end">
    <label tabindex="0" class="avatar btn btn-circle btn-ghost">
      <div class="w-8 rounded-full">
        <NuxtImg :src="data?.user.avatar_url" placeholder="placeholder.jpg" />
      </div>
    </label>
    <ul
      tabindex="0"
      class="menu dropdown-content menu-sm z-10 mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
    >
      <li>
        <NuxtLink to="/profile" class="justify-between">Profile</NuxtLink>
      </li>
      <li><AuthLogoutButton>Logout</AuthLogoutButton></li>
    </ul>
  </div>
</template>
