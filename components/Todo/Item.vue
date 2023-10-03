<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { type Todo, useTodoStore } from '@/stores/todo'

const props = defineProps<{
  todo: Todo
}>()

const store = useTodoStore()

// 可用storeToRefs
const { list } = storeToRefs(store)

const state = computed({
  get() {
    return (
      // 若不用storeToRefs:store.list.find(...)
      list.value.find((item) => item.id === props.todo.id)?.state || 'active'
    )
  },
  set(newVal) {
    store.changeState(props.todo.id, newVal)
  },
})

const onRemove = () => {
  store.remove(props.todo.id)
}
</script>

<template>
  <div class="flex space-x-2">
    <!-- checkbox -->
    <input
      v-model="state"
      true-value="completed"
      false-value="active"
      type="checkbox"
      class="checkbox flex-none"
      data-test="stateChangeButton"
    />

    <!-- content -->
    <div
      class="w-full grow break-words"
      :class="state === 'completed' && 'line-through'"
      data-test="content"
    >
      {{ todo.content }}
    </div>

    <!-- delete button -->
    <button
      class="btn btn-sm flex-none"
      data-test="deleteButton"
      @click="onRemove"
    >
      Del
    </button>
  </div>
</template>
