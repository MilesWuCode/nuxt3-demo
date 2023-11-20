<script setup lang="ts">
const isFavorite = ref(false)
const loading = ref(false)
</script>

<template>
  <span v-if="loading" class="loading loading-spinner loading-sm"></span>

  <label v-else class="swap">
    <input v-model="isFavorite" type="checkbox" />
    <div class="swap-off"><Icon name="IconHeartOutline" /></div>
    <div class="swap-on"><Icon name="IconHeartSolid" /></div>
  </label>
</template>
