import { MENU_TASKS } from '@/utils/constants'

export const state = {
  appMenu: {
    isMenuOpen: false,
    selectedTask: MENU_TASKS[0].id,
    selectedList: ''
  },
  modal: {
    isCUDItemModalOpen: false,
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
      date: '2023-09-28',
      completed: false,
      createdTime: 'Sat Sep 23 2023 20:32:58 GMT+0530 (India Standard Time)'
    },
    {
      id: 234,
      task: 'Check email',
      description: 'Check email regularly',
      list: 'menu-list2',
      date: '2023-09-08',
      completed: false,
      createdTime: 'Tue Sep 05 2023 11:28:51 GMT+0530 (India Standard Time)'
    },
    {
      id: 456,
      task: 'Tax Submission',
      description: 'Service for vehicle',
      list: 'menu-list3',
      date: '2024-07-02',
      completed: true,
      createdTime: 'Mon Sep 25 2023 07:30:23 GMT+0530 (India Standard Time)'
    }
  ]
}
