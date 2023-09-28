import { renderWrapper } from '@/utils/test/render'
import { state } from '@/store/state'
import ToDoCUDItemForm from '@/views/ToDo/components/ToDoCUDItemForm'
import ToDoDeleteConfirmation from '@/views/ToDo/components/ToDoDeleteConfirmation'
import AppPrimaryButton from '@/components/AppPrimaryButton'
import AppSecondaryButton from '@/components/AppSecondaryButton'
import ErrorWrapper from '@/components/ErrorWrapper'

describe('ToDoCUDItemForm.vue', () => {
  let actions = {
    toggleModal: jest.fn(),
    addToDoTask: jest.fn(),
    updateToDoTask: jest.fn(),
    deleteToDoTask: jest.fn()
  }

  describe('CreateToDoForm', () => {
    let wrapper
    let customStore = {
      state,
      actions
    }

    beforeEach(() => {
      wrapper = renderWrapper(
        ToDoCUDItemForm,
        {
          attachToDocument: true,
          stubs: {
            'app-primary-button': AppPrimaryButton,
            'app-secondary-button': AppSecondaryButton,
            'todo-delete-confirmation': ToDoDeleteConfirmation,
            'error-wrapper': ErrorWrapper
          }
        },
        customStore
      )
    })

    it('should render create task button', () => {
      expect(wrapper.find('[data-test="create-task-button"]').exists()).toBe(
        true
      )
    })

    it('should have empty values for task and description input', () => {
      const task = wrapper.find('[data-test="input-task-name"]').element.value
      const description = wrapper.find('[data-test="input-task-description"]')
        .element.value
      expect(task).toEqual('')
      expect(description).toEqual('')
    })

    it('should show error on invalid data', async () => {
      const taskInput = wrapper.find('[data-test="input-task-name"]')
      const descriptionInput = wrapper.find(
        '[data-test="input-task-description"]'
      )

      await taskInput.setValue('Test task *')
      await descriptionInput.setValue('#Test Description')

      expect(wrapper.text()).toContain(
        'Task name should not have special characters'
      )
      expect(wrapper.text()).toContain(
        'Description should not have special characters'
      )
    })

    it('should enable and disable create task button based on validity of the form', async () => {
      const taskInput = wrapper.find('[data-test="input-task-name"]')
      const createButton = wrapper.find('[data-test="create-task-button"]')

      await taskInput.setValue('Valid task name')

      expect(createButton.attributes('disabled')).toBeUndefined

      await taskInput.setValue('Invalid task%name')
      expect(createButton.attributes('disabled')).toBe('disabled')
    })

    it('should dispatch "addToDoTask" when create task button is clicked', async () => {
      const taskInput = wrapper.find('[data-test="input-task-name"]')
      const createButton = wrapper.find('[data-test="create-task-button"]')

      await taskInput.setValue('Valid task name')
      expect(createButton.attributes('disabled')).toBeUndefined
      await createButton.trigger('click')
      expect(actions.addToDoTask).toHaveBeenCalled()
    })
  })

  describe('UpdateToDoForm', () => {
    const selectedToDoTask = {
      id: 123,
      task: 'Drink Water',
      description: 'Reminder to drink water',
      list: 'menu-list1',
      date: '2023-09-29',
      completed: false,
      createdTime: 'Sat Sep 23 2023 20:32:58 GMT+0530 (India Standard Time)'
    }

    let wrapper
    let customStore = {
      state: {
        ...state,
        selectedToDoTask
      },
      actions
    }

    beforeEach(() => {
      wrapper = renderWrapper(
        ToDoCUDItemForm,
        {
          attachToDocument: true,
          stubs: {
            'app-primary-button': AppPrimaryButton,
            'app-secondary-button': AppSecondaryButton,
            'todo-delete-confirmation': ToDoDeleteConfirmation,
            'error-wrapper': ErrorWrapper
          }
        },
        customStore
      )
    })

    it('should render update and delete task button', () => {
      expect(wrapper.find('[data-test="update-task-button"]').exists()).toBe(
        true
      )
      expect(wrapper.find('[data-test="delete-task-button"]').exists()).toBe(
        true
      )
    })

    it('should have pre-filled values for task and description input', () => {
      const task = wrapper.find('[data-test="input-task-name"]').element.value
      const description = wrapper.find('[data-test="input-task-description"]')
        .element.value
      expect(task).toEqual(selectedToDoTask.task)
      expect(description).toEqual(selectedToDoTask.description)
    })

    it('should enable and disable update task button based on validity of the form', async () => {
      const taskInput = wrapper.find('[data-test="input-task-name"]')
      const updateButton = wrapper.find('[data-test="update-task-button"]')

      await taskInput.setValue('Valid task name')

      expect(updateButton.attributes('disabled')).toBeUndefined

      await taskInput.setValue('Invalid task%name')
      expect(updateButton.attributes('disabled')).toBe('disabled')
    })

    it('should dispatch "updateToDoTask" when update task button is clicked', async () => {
      const taskInput = wrapper.find('[data-test="input-task-name"]')
      const updateButton = wrapper.find('[data-test="update-task-button"]')

      await taskInput.setValue('Valid task name')
      expect(updateButton.attributes('disabled')).toBeUndefined
      await updateButton.trigger('click')
      expect(actions.updateToDoTask).toHaveBeenCalled()
    })

    it('should display warning popup on delete button click', async () => {
      const deleteButton = wrapper.find('[data-test="delete-task-button"]')
      await deleteButton.trigger('click')
      expect(actions.toggleModal).toHaveBeenCalled()
    })
  })
})
