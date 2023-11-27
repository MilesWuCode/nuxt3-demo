<script setup lang="ts">
// 使用第三方CSS不想跟tailwindcss混合到
const num = ref(0)

const htmlString = computed(() => `<button class="btn">${num.value}</button>`)

const change = () => {
  num.value++
}
</script>

<template>
  <div v-shadow-html="htmlString" class="bg-orange-400"></div>

  <button @click="change">Change</button>
</template>
