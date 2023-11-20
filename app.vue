<script setup lang="ts">
// SEO
const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true,
})
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
