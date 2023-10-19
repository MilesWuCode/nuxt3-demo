<script setup lang="ts">
export interface Props {
  totalPage?: number
  modelValue?: number
  max?: number
  divider?: string
}

const props = withDefaults(defineProps<Props>(), {
  totalPage: 0,
  modelValue: 0,
  max: 7,
  divider: '…',
})

const emit = defineEmits<{
  (e: 'update:modelValue', val: number): void
}>()

const currentPage = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const pages = computed(() =>
  Array.from({ length: props.totalPage }, (_, i) => i + 1),
)

const displayedPages = computed(() => {
  if (!props.max || pages.value.length <= 5) {
    return pages.value
  } else {
    const current = currentPage.value
    const max = pages.value.length
    const r = Math.floor((Math.min(props.max, max) - 5) / 2)
    const r1 = current - r
    const r2 = current + r
    const beforeWrapped = r1 - 1 > 1
    const afterWrapped = r2 + 1 < max
    const items: Array<number | string> = [1]

    if (beforeWrapped) items.push(props.divider)

    if (!afterWrapped) {
      const addedItems = current + r + 2 - max
      for (let i = current - r - addedItems; i <= current - r - 1; i++) {
        items.push(i)
      }
    }

    for (let i = r1 > 2 ? r1 : 2; i <= Math.min(max, r2); i++) {
      items.push(i)
    }

    if (!beforeWrapped) {
      const addedItems = 1 - (current - r - 2)
      for (let i = current + r + 1; i <= current + r + addedItems; i++) {
        items.push(i)
      }
    }

    if (afterWrapped) items.push(props.divider)

    if (r2 < max) items.push(max)

    // Replace divider by number on start edge case [1, '…', 3, ...]
    if (items.length >= 3 && items[1] === props.divider && items[2] === 3) {
      items[1] = 2
    }

    // Replace divider by number on end edge case [..., 48, '…', 50]
    if (
      items.length >= 3 &&
      items[items.length - 2] === props.divider &&
      items[items.length - 1] === items.length
    ) {
      items[items.length - 2] = items.length - 1
    }

    return items
  }
})

const onClickPage = (page: number | string) => {
  if (typeof page === 'string') {
    return
  }

  currentPage.value = page
}
</script>

<template>
  <div class="join">
    <!-- 上一頁 -->
    <button
      class="btn join-item"
      :disabled="currentPage <= 1"
      @click="() => onClickPage(currentPage - 1)"
    >
      <NuxtIcon name="left" />
    </button>

    <!-- 頁碼 -->
    <button
      v-for="(page, index) in displayedPages"
      :key="index"
      class="btn join-item"
      :class="page === modelValue && 'btn-active'"
      @click="() => onClickPage(page)"
    >
      {{ page }}
    </button>

    <!-- 下一頁 -->
    <button
      class="btn join-item"
      :disabled="currentPage >= totalPage"
      @click="() => onClickPage(currentPage + 1)"
    >
      <NuxtIcon name="right" />
    </button>
  </div>
</template>
