import { describe, it, expect, beforeAll, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import Todo from '@/components/Todo/Todo.client.vue'
import Item from '@/components/Todo/Item.vue'
import { useTodoStore } from '@/stores/todo'
import type { Todo as TodoType } from '@/types/todo'

// 參考語法 https://vitest.dev/ & https://test-utils.vuejs.org/

describe('todo組件', () => {
  beforeAll(() => {
    // 全部it之前執行
  })

  beforeEach(() => {
    // 每1個it之前執行
    setActivePinia(createPinia())
  })

  // 記錄用
  // afterEach(() => {
  //   vi.unstubAllGlobals()
  //   vi.stubGlobals('useNuxtApp', () => {})
  // })

  it('測試掛載', () => {
    // 掛載
    const wrapper = mount(Todo)

    // 測試掛載
    expect(wrapper.exists()).toBe(true)
  })

  it('新增修改刪除', async () => {
    // 掛載
    const wrapper = mount(Todo)

    // 取得store
    const store = useTodoStore()

    expect(store.total).toBe(0)

    /** 新增 */
    const todoInput = wrapper.find('[data-test="todo-input"]')

    expect(todoInput.exists()).toBe(true)

    todoInput.setValue('test')

    const todoAddButton = wrapper.find('[data-test="todo-add-button"]')

    expect(todoAddButton.exists()).toBe(true)

    await todoAddButton.trigger('click')

    expect(store.total).toBe(1)

    /** 顯示 active */
    const filterActive = wrapper.find('[data-test="filter-active"]')

    await filterActive.trigger('click')

    expect(wrapper.findAll('[data-test="todo-item"]').length).toBe(1)

    /** 修改 */

    // 取得元件
    const checkbox = wrapper.find('[data-test="state-checkbox"]')

    // 取得element和TS檢查
    const checkboxElement = checkbox.element as HTMLInputElement

    // 檢查false
    expect(checkboxElement.checked).toBe(false)

    expect(store.list.at(0)?.state).toBe('active')

    // 觸發事件
    await checkbox.setValue('completed')

    // 檢查true
    expect(checkboxElement.checked).toBe(true)

    expect(store.list.at(0)?.state).toBe('completed')

    /** 顯示 active */
    expect(wrapper.findAll('[data-test="todo-item"]').length).toBe(0)

    /** 顯示 completed */
    const filterCompleted = wrapper.find('[data-test="filter-completed"]')

    await filterCompleted.trigger('click')

    expect(wrapper.findAll('[data-test="todo-item"]').length).toBe(1)

    /** 刪除 */
    const deleteButton = await wrapper.find('[data-test="delete-button"]')

    expect(deleteButton.exists()).toBe(true)

    await deleteButton.trigger('click')

    expect(store.total).toBe(0)
  })
})

describe('預設值', () => {
  it('檢查', () => {
    // 掛載
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

    // 取得store
    const store = useTodoStore()

    // 預設值是否存在
    expect(store.total).toBe(1)

    const todoItem = wrapper.find('[data-test="todo-item"]')

    expect(todoItem.text()).toContain(store.list.at(0)?.content)
  })

  it('spy範例', async () => {
    // 掛載
    const wrapper = mount(Todo, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
            initialState: {
              todo: {
                list: [
                  {
                    id: 'test-id',
                    content: 'test-content',
                    state: 'active',
                  },
                ],
              },
            },
          }),
        ],
      },
    })

    // 取得store
    const store = useTodoStore()

    // 預設值是否存在
    expect(store.total).toBe(1)

    const deleteButton = await wrapper.find('[data-test="delete-button"]')

    expect(deleteButton.exists()).toBe(true)

    await deleteButton.trigger('click')

    // 呼叫次數
    expect(store.remove).toHaveBeenCalledTimes(1)

    // 呼叫時傳的參數
    expect(store.remove).toHaveBeenLastCalledWith('test-id')

    expect(store.total).toBe(0)
  })
})

describe('todo組件的item子組件', () => {
  beforeEach(() => {
    // 每1個it之前執行
    setActivePinia(createPinia())
  })

  it('mount', async () => {
    // 假資料
    const todo: TodoType = {
      id: 'test-id',
      content: 'todo-content',
      state: 'active',
    }

    // 掛載
    const wrapper = mount(Item, {
      props: {
        todo,
      },
    })

    // 測試掛載
    expect(wrapper.exists()).toBe(true)

    // 顯示與資料相同
    expect(wrapper.text()).toContain(todo.content)

    // 取得元件
    const checkbox = wrapper.find('[data-test="state-checkbox"]')

    // 取得element和TS檢查
    const checkboxElement = checkbox.element as HTMLInputElement

    // 檢查false
    expect(checkboxElement.checked).toBe(false)

    // 觸發事件
    await checkbox.setValue('completed')

    // 檢查true
    expect(checkboxElement.checked).toBe(true)
  })
})
