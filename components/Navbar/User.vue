<script setup lang="ts">
const { status } = useAuth()

const isSignIn = computed(() => status.value === 'authenticated')
</script>

<template>
  <div v-if="isSignIn" class="dropdown dropdown-end">
    <label tabindex="0" class="avatar btn btn-circle btn-ghost">
      <div class="w-8 rounded-full">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
        />
      </div>
    </label>
    <ul
      tabindex="0"
      class="menu dropdown-content rounded-box menu-sm z-10 mt-3 w-52 bg-base-100 p-2 shadow"
    >
      <li>
        <NuxtLink to="/profile" class="justify-between">Profile</NuxtLink>
      </li>
      <li><AuthLogoutButton>Logout</AuthLogoutButton></li>
    </ul>
  </div>
</template>
