<script setup lang="ts">
const { status } = useAuth()

const isLogin = computed(() => status.value === 'authenticated')
</script>

<template>
  <div v-if="isLogin" class="dropdown-end dropdown">
    <label tabindex="0" class="avatar btn btn-circle btn-ghost">
      <div class="w-10 rounded-full">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
        />
      </div>
    </label>
    <ul
      tabindex="0"
      class="menu dropdown-content rounded-box menu-sm z-[1] mt-3 w-52 bg-base-100 p-2 shadow"
    >
      <li>
        <a class="justify-between">
          Profile
          <span class="badge">New</span>
        </a>
      </li>
      <li><a>Settings</a></li>
      <li><AuthLogoutButton>Logout</AuthLogoutButton></li>
    </ul>
  </div>
</template>
