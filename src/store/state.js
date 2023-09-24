import { MENU_TASKS } from '@/helpers/constants'

export const state = {
  appMenu: {
    isMenuOpen: false,
    selectedTask: MENU_TASKS[0].id,
    selectedList: ''
  },
  modal: {
    isDeleteConfirmationModalOpen: false,
    isMultipleDeleteConfirmationModalOpen: false
  },
  selectedToDoTask: null,
  selectedToDoTaskList: [],
  todo: [
    {
      id: 123,
      task: 'Drink Water',
      description: 'Reminder to drink water',
      list: 'menu-list1',
      date: '2023-09-29',
      completed: false
    },
    {
      id: 234,
      task: 'Check email',
      description: 'Check email regularly',
      list: 'menu-list2',
      date: '2023-09-08',
      completed: false
    },
    {
      id: 456,
      task: 'Vehicle service',
      description: 'Service for vehicle',
      list: 'menu-list3',
      date: '2023-07-02',
      completed: true
    }
  ]
}
