import { renderWrapper } from '@/utils/test/render'
import { MENU_TASKS } from '@/utils/constants'
import { DATA_TEST_ID } from '@/utils/test/data-test-ids'
import { state } from '@/store/state'
import ToDoList from '@/views/ToDo/components/ToDoList'
import ToDoListItem from '@/views/ToDo/components/ToDoListItem'

describe('ToDoList.vue', () => {
  let actions = {
    setTaskCompleted: jest.fn()
  }

  const renderToDoList = (
    selectedTask = MENU_TASKS[0].id,
    selectedList = ''
  ) => {
    let customStore = {
      state: {
        ...state,
        appMenu: {
          isMenuOpen: false,
          selectedTask,
          selectedList
        },
        todo: [
          {
            id: 123,
            task: 'Drink Water',
            description: 'Reminder to drink water',
            list: 'menu-list1',
            date: '2023-09-28',
            completed: false,
            createdTime:
              'Sat Sep 23 2023 20:32:58 GMT+0530 (India Standard Time)'
          },
          {
            id: 234,
            task: 'Check email',
            description: 'Check email regularly',
            list: 'menu-list2',
            date: '2023-09-08',
            completed: false,
            createdTime:
              'Tue Sep 05 2023 11:28:51 GMT+0530 (India Standard Time)'
          },
          {
            id: 456,
            task: 'Tax Submission',
            description: 'Service for vehicle',
            list: 'menu-list3',
            date: '2024-07-02',
            completed: true,
            createdTime:
              'Mon Sep 25 2023 07:30:23 GMT+0530 (India Standard Time)'
          }
        ]
      },
      actions
    }
    return renderWrapper(
      ToDoList,
      {
        stubs: {
          'todo-list-item': ToDoListItem
        }
      },
      customStore
    )
  }

  it('should display all todo tasks when "All" filter is selected in app menu', async () => {
    const wrapper = renderToDoList()
    await wrapper.vm.$nextTick()
    expect(
      wrapper.findAll(`[data-test="${DATA_TEST_ID.TODO_LIST_ITEM}"]`)
    ).toHaveLength(3)
  })

  it('should display only pending todo tasks when "Pending" filter is selected in app menu', async () => {
    const wrapper = renderToDoList(MENU_TASKS[1].id)
    await wrapper.vm.$nextTick()
    expect(
      wrapper.findAll(`[data-test="${DATA_TEST_ID.TODO_LIST_ITEM}"]`)
    ).toHaveLength(2)
  })

  it('should display "Nothing to show here" when "Today" filter is selected in app menu', async () => {
    const wrapper = renderToDoList(MENU_TASKS[3].id)
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Nothing to show here')
  })
})
