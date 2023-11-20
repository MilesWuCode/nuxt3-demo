<script setup lang="ts">
// SEO
const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true,
})

const { status, data } = useAuth()

watch(status, (newValue) => {
  if (newValue === 'authenticated') {
    echoPrivate(true)
  } else {
    echoPrivate(false)
  }
})

onMounted(() => {
  if (status.value === 'authenticated') {
    echoPrivate(true)
  }
})

onBeforeUnmount(() => {
  if (status.value === 'authenticated') {
    echoPrivate(false)
  }
})

function echoPrivate(run: boolean) {
  if (run) {
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
  } else {
    window.Echo.leave(`App.Models.User.${data.value?.user.id}`)
  }
}
</script>

<template>
  <!-- data-theme:daisyui主題 -->
  <Html :lang="head.htmlAttrs?.lang" data-theme="light">
    <Body>
      <NuxtLayout>
        <!-- 進度條 -->
        <NuxtLoadingIndicator />
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>
