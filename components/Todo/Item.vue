<script setup lang="ts">
import { ref } from 'vue'
import type { Todo } from '@/stores/todo'

const props = defineProps<{
  todo: Todo
}>()

const emit = defineEmits<{
  (e: 'changeState', id: string | number, state: Todo['state']): void
  (e: 'removeTodo', id: string | number): void
}>()

const state = ref(props.todo.state)

const onChange = () => {
  emit('changeState', props.todo.id, state.value)
}

const onRemove = () => {
  emit('removeTodo', props.todo.id)
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
      @change="onChange"
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
    <button class="btn btn-sm flex-none" @click="onRemove" data-test="deleteButton">Del</button>
  </div>
</template>
