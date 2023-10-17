import { defineStore, skipHydrate } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export type Todo = {
  id: string | number
  content: string
  state: 'active' | 'completed'
}

export type Filter = 'all' | 'active' | 'completed'

export const useTodoStore = defineStore('todo', () => {
  const list = useLocalStorage<Todo[]>('pinia/todo/list', [])

  const create = (todo: Todo) => {
    list.value.push(todo)
  }

  const changeState = (id: string | number, state: Todo['state']) => {
    // 測速1
    // console.time('TestSpeed #1')
    for (const item of list.value) {
      if (item.id === id) {
        item.state = state
        break
      }
    }
    // console.timeEnd('TestSpeed #1')

    // 測速2
    // console.time('TestSpeed #2')
    // this.list = this.list.map((item) =>
    //   item.id === id ? { ...item, state } : item
    // )
    // console.timeEnd('TestSpeed #2')
  }

  const remove = (id: string | number) => {
    list.value = list.value.filter((item) => item.id !== id)
  }

  const total = computed(() => list.value.length)

  const completedTotal = computed(() =>
    list.value.reduce(
      (counter, { state }) =>
        state === 'completed' ? (counter += 1) : counter,
      0,
    ),
  )

  const filterByState = computed(() => {
    return (filter: Filter) =>
      filter === 'all'
        ? list.value
        : list.value.filter((item) => item.state === filter)
  })

  return {
    list: skipHydrate(list),
    create,
    changeState,
    remove,
    total,
    completedTotal,
    filterByState,
  }
})
