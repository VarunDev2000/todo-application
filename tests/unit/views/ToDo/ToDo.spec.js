import { renderWrapper } from '@/utils/test/render'
import { MENU_TASKS } from '@/utils/constants'
import { DATA_TEST_ID } from '@/utils/test/data-test-ids'
import { state } from '@/store/state'
import ToDo from '@/views/ToDo/ToDo'

describe('ToDo.vue', () => {
  const renderToDo = (customStore = { state }) => {
    return renderWrapper(ToDo, {}, customStore)
  }

  it('should display appropriate title based on the app menu filter', async () => {
    let store = {
      state: {
        ...state,
        appMenu: {
          ...state.appMenu,
          selectedTask: MENU_TASKS[0].id
        }
      }
    }
    let wrapper = renderToDo(store)

    expect(wrapper.text()).toContain('All')

    store = {
      state: {
        ...state,
        appMenu: {
          ...state.appMenu,
          selectedTask: MENU_TASKS[1].id
        }
      }
    }
    wrapper = renderToDo(store)

    expect(wrapper.text()).toContain('Pending')
  })

  it('should show create task button while editing a todo task', async () => {
    let wrapper = renderToDo({ state })

    expect(
      wrapper
        .find(`[data-test="${DATA_TEST_ID.TODO_CREATE_TASK_BUTTON}"]`)
        .exists()
    ).toBe(false)

    // Task selected for editing
    let store = {
      state: {
        ...state,
        selectedToDoTask: {
          id: 123,
          task: 'Drink Water',
          description: 'Reminder to drink water',
          list: 'menu-list1',
          date: '2023-09-29',
          completed: false,
          createdTime: 'Sat Sep 23 2023 20:32:58 GMT+0530 (India Standard Time)'
        }
      }
    }
    wrapper = renderToDo(store)

    expect(
      wrapper
        .find(`[data-test="${DATA_TEST_ID.TODO_CREATE_TASK_BUTTON}"]`)
        .exists()
    ).toBe(true)
  })

  it('should show action list(Mark complete, Mark as not complete, Delete, Cancel) when todo task(s) are checked', async () => {
    let store = {
      state: {
        ...state,
        selectedToDoTaskList: [123]
      }
    }
    const wrapper = renderToDo(store)

    expect(
      wrapper
        .find(`[data-test="${DATA_TEST_ID.TODO_TASKS_ACTION_LIST}"]`)
        .exists()
    ).toBe(true)
  })
})
