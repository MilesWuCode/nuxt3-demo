<script setup lang="ts">
import { v4 as uuid } from 'uuid'
import { type Todo, type Filter, useTodoStore } from '@/stores/todo'

const store = useTodoStore()

const input = ref('')

const tabs: Filter[] = ['all', 'active', 'completed']

const filter = ref<Filter>(tabs[0])

const addTodo = () => {
  if (input.value.length === 0) return

  store.create({
    id: uuid(),
    content: input.value,
    state: 'active',
  })

  input.value = ''
}

const changeState = (id: string, state: Todo['state']) => {
  store.changeState(id, state)
}

const removeTodo = (id: string) => {
  store.remove(id)
}
</script>

<template>
  <div class="flex flex-col space-y-2">
    <!-- input -->
    <div class="form-control">
      <div class="input-group">
        <input
          v-model.trim="input"
          type="text"
          class="input-bordered input w-full"
        />
        <button class="btn-square btn" @click="addTodo">add</button>
      </div>
    </div>

    <!-- tabs -->
    <div class="tabs justify-around">
      <!-- completed / total -->
      <span class="tab">{{ store.completedTotal }} / {{ store.total }}</span>

      <!-- select filter -->
      <button
        v-for="item of tabs"
        :key="item"
        class="tab"
        :class="filter === item && 'tab-active'"
        @click="() => (filter = item)"
      >
        {{ item }}
      </button>
    </div>

    <!-- list -->
    <ul class="space-y-2">
      <li v-for="item of store.filterByState(filter)" :key="item.id">
        <TodoItem
          :todo="item"
          @change-state="changeState"
          @remove-todo="removeTodo"
        />
      </li>
    </ul>
  </div>
</template>
