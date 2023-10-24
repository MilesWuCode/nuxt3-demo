import { describe, it, expect, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'
// import { setActivePinia, createPinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import Todo from '@/components/Todo/Todo.client.vue'
import { useTodoStore } from '@/stores/todo'

describe('todo', () => {
  it('mount', () => {
    const wrapper = mount(Todo, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              todo: {
                list: [
                  {
                    id: Math.floor(Math.random() * 1000000),
                    content: 'abc',
                    state: 'active',
                  },
                ],
              },
            },
          }),
        ],
      },
    })

    // 測試mount
    expect(wrapper.exists()).toBe(true)

    // 取得store
    const store = useTodoStore()

    // 預設值是否存在
    expect(store.list.length).toBe(1)
  })
})
