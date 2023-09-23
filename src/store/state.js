import { MENU_TASKS } from '@/helpers/constants'

export const state = {
  appMenu: {
    selectedTask: MENU_TASKS[0].id,
    selectedList: ''
  },
  selectedToDoTask: null,
  selectedToDoTaskList: [],
  todo: [
    {
      id: 123,
      task: 'Drink Water',
      description: 'Reminder to drink water',
      list: 'Personal',
      date: '2023-09-29',
      completed: false
    },
    {
      id: 234,
      task: 'Check email',
      description: 'Check email regularly',
      list: 'Work',
      date: '2023-09-08',
      completed: false
    },
    {
      id: 456,
      task: 'Vehicle service',
      description: 'Service for vehicle',
      list: 'Personal',
      date: '2023-07-02',
      completed: true
    }
  ]
}
