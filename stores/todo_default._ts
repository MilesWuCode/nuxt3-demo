import { defineStore } from 'pinia'

export type Todo = {
  id: string | number
  content: string
  state: 'active' | 'completed'
}

export type Filter = 'all' | 'active' | 'completed'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    list: [] as Todo[],
  }),
  getters: {
    total: (state) => state.list.length,
    completedTotal: (state) =>
      state.list.reduce(
        (counter, { state }) =>
          state === 'completed' ? (counter += 1) : counter,
        0,
      ),
    filterByState: (state) => {
      return (filter: Filter) =>
        filter === 'all'
          ? state.list
          : state.list.filter((item) => item.state === filter)
    },
  },
  actions: {
    create(todo: Todo) {
      this.list.push(todo)
    },
    changeState(id: string | number, state: Todo['state']) {
      // 測速1
      // console.time('TestSpeed #1')
      for (const item of this.list) {
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
    },
    remove(id: string | number) {
      this.list = this.list.filter((item) => item.id !== id)
    },
  },
})
