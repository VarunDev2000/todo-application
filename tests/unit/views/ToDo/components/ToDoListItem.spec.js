import { renderWrapper } from '@/utils/test/render'
import { DATA_TEST_ID } from '@/utils/test/data-test-ids'
import { state } from '@/store/state'
import ToDoListItem from '@/views/ToDo/components/ToDoListItem'

describe('ToDoListItem.vue', () => {
  let wrapper
  let propsData = {
    todo: {
      id: 123,
      task: 'Drink Water',
      description: 'Reminder to drink water',
      list: 'menu-list1',
      date: '2023-09-29',
      completed: false,
      createdTime: 'Sat Sep 23 2023 20:32:58 GMT+0530 (India Standard Time)'
    }
  }
  let actions = {
    toggleModal: jest.fn(),
    setTaskCompleted: jest.fn()
  }
  let customStore = {
    state,
    actions
  }

  beforeEach(() => {
    wrapper = renderWrapper(
      ToDoListItem,
      {
        propsData
      },
      customStore
    )
  })

  it('should display all todo details', async () => {
    expect(wrapper.text()).toContain(propsData.todo.task)
    await wrapper
      .findAll(`[data-test="${DATA_TEST_ID.TODO_TASK}"`)
      .trigger('click')
    expect(wrapper.text()).toContain(propsData.todo.description)
    expect(wrapper.text()).toContain(propsData.todo.date)
  })

  it('should show todo more info only on task name click', async () => {
    expect(
      wrapper.findAll(`[data-test="${DATA_TEST_ID.TODO_MORE_INFO}"]`)
    ).toHaveLength(0)
    await wrapper
      .findAll(`[data-test="${DATA_TEST_ID.TODO_TASK}"`)
      .trigger('click')
    expect(
      wrapper.findAll(`[data-test="${DATA_TEST_ID.TODO_MORE_INFO}"]`)
    ).toHaveLength(1)
  })

  it('should dispatch "toggleModal" when edit button is clicked', async () => {
    await wrapper
      .findAll(`[data-test="${DATA_TEST_ID.TODO_TASK}"`)
      .trigger('click')
    await wrapper
      .findAll(`[data-test="${DATA_TEST_ID.TODO_ITEM_EDIT_BUTTON}"`)
      .trigger('click')
    expect(actions.toggleModal).toHaveBeenCalled()
  })

  it('should dispatch "setTaskCompleted" when completed or not completed button is clicked', async () => {
    await wrapper
      .findAll(`[data-test="${DATA_TEST_ID.TODO_MARK_COMPLETED_BUTTON}"]`)
      .trigger('click')
    expect(actions.setTaskCompleted).toHaveBeenCalled()
  })
})
