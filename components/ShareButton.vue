<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()

const route = useRoute()

const url = runtimeConfig.public.appUrl + route.fullPath

const openFacebookShare = useShareLink('facebook', url)

const openLineShare = useShareLink('line', url)
</script>

<template>
  <div class="join">
    <button class="btn join-item" @click="openFacebookShare">Facebook</button>
    <button class="btn join-item" @click="openLineShare">Line</button>
  </div>
</template>
