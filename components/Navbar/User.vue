<script setup lang="ts">
const { status, data } = useAuth()

watch(status, (newValue) => {
  if (newValue === 'authenticated') {
    echoConnect()
  }
})

onMounted(() => {
  if (status.value === 'authenticated') {
    echoConnect()
  }
})

function echoConnect() {
  window.Echo.private(`App.Models.User.${data.value?.user.id}`)
    // .listen('.PostUpdated', (e: any) => {
    //   console.log(e.model)
    // })
    // .listen('.UserUpdated', (e: any) => {
    //   console.log(e.model)
    // })
    // .listen('.App\\Events\\LikeReactionEvent', (e: any) => {
    //   console.log(e.user)
    // })
    .listen('.App\\Events\\FavoriteReactionEvent', (e: any) => {
      // const { id, model, favorite_state: state } = e

      // localforage.setItem(`${model}.${id}.favorite`, {
      //   state,
      //   time: new Date(),
      // })
      console.log(e)
    })
  // .notification((notification: any) => {
  //   console.log(notification.type)
  // })
}
</script>

<template>
  <div v-if="status === 'authenticated'" class="dropdown dropdown-end">
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
