<script setup lang="ts">
import { type LocaleObject } from 'vue-i18n-routing'
import { useI18n } from '#imports'

const { locale, locales, setLocale } = useI18n()

const availableLocales = computed(() => {
  // 全部
  return locales.value as LocaleObject[]

  // 除了現在的語系
  // return (locales.value).filter(
  //   (i) => i.code !== locale.value,
  // )
})
</script>

<template>
  <div class="dropdown dropdown-end">
    <label tabindex="0" class="btn btn-circle btn-ghost">
      <Icon name="IconLanguage" />
    </label>
    <ul
      tabindex="0"
      class="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
    >
      <li v-for="item of availableLocales" :key="item.code">
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
