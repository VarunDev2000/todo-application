import { mergeDeepRight } from 'ramda'
import { isNullOrEmpty } from '@/utils/helpers'
import { APP_STORAGE_KEY, MENU_TASKS } from '@/utils/constants'

let persistedData = {
  todo: [],
  modal: {
    showWelcomeModal: false
  }
}

let state = {
  appMenu: {
    isMenuOpen: false,
    selectedTask: MENU_TASKS[0].id,
    selectedList: ''
  },
  modal: {
    showWelcomeModal: true,
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
      date: '2023-09-23',
      completed: true,
      createdTime: 'Sat Sep 23 2023 20:32:58 GMT+0530 (India Standard Time)'
    },
    {
      id: 234,
      task: 'Check email',
      description: 'Check email today',
      list: 'menu-list2',
      date: '2023-09-05',
      completed: false,
      createdTime: 'Tue Sep 05 2023 11:28:51 GMT+0530 (India Standard Time)'
    },
    {
      id: 456,
      task: 'Buy gift for George',
      description: 'Reminder to buy birthday present for George',
      list: 'menu-list3',
      date: '2023-10-15',
      completed: false,
      createdTime: 'Tue Sep 26 2023 07:30:23 GMT+0530 (India Standard Time)'
    }
  ]
}

// Sync data with local storage.
if (!isNullOrEmpty(localStorage.getItem(APP_STORAGE_KEY))) {
  persistedData = JSON.parse(localStorage.getItem(APP_STORAGE_KEY))
  if (!isNullOrEmpty(persistedData)) {
    state = mergeDeepRight(state, persistedData)
  }
}

export { state }
