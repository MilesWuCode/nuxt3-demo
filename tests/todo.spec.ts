import { describe, it, expect, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'
// import { setActivePinia, createPinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import Todo from '@/components/Todo/Todo.client.vue'
import Item from '@/components/Todo/Item.vue'
import { useTodoStore } from '@/stores/todo'
import type { Todo as TodoType } from '@/types/todo'

// https://test-utils.vuejs.org/

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

describe('todo.item', () => {
  it('mount', async () => {
    const todo: TodoType = {
      id: 'test-id',
      content: 'todo-content',
      // state: 'active',
      state: 'completed',
    }

    const wrapper = mount(Item, {
      props: {
        todo,
      },
    })

    // 測試mount
    expect(wrapper.exists()).toBe(true)

    // 顯示與資料相同
    expect(wrapper.text()).toContain(todo.content)
    console.log(wrapper.html())
    const checkbox = await wrapper.find('[data-test="state-checkbox"]')
    // // .element) as HTMLInputElement

    // console.log(checkbox.())
    // expect(checkbox.).toBe('active')
  })
})
