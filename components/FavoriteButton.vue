<script setup lang="ts">
const isFavorite = ref(false)
</script>

<template>
  <label class="swap">
    <input v-model="isFavorite" type="checkbox" />
    <div class="swap-off"><Icon name="IconHeartOutline" /></div>
    <div class="swap-on"><Icon name="IconHeartSolid" /></div>
  </label>
</template>
