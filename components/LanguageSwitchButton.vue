<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()

const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value)
})
</script>

<template>
  <div class="dropdown-end dropdown">
    <label tabindex="0" class="btn btn-circle btn-ghost">
      <NuxtIcon name="languages" />
    </label>
    <ul
      tabindex="0"
      class="dropdown-content menu rounded-box menu-sm z-[1] mt-3 w-52 bg-base-100 p-2 shadow"
    >
      <li v-for="item of locales" :key="item.code">
        <button
          :class="locale === item.code && 'active'"
          @click="setLocale(item.code)"
        >
          {{ item.name }}
        </button>
      </li>
    </ul>
  </div>
</template>
