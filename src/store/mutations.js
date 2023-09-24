import { mergeDeepRight } from 'ramda'
import { getToDoId } from '@/helpers/random'

export const TOGGLE_MENU = (state, value) => {
  state.appMenu.isMenuOpen = value
}

export const SET_SELECTED_MENU_TASK = (state, task) => {
  state.appMenu.selectedTask = task
}

export const SET_SELECTED_MENU_LIST = (state, list) => {
  const selectedListDataInStore = state.appMenu.selectedList
  if (selectedListDataInStore === list) {
    state.appMenu.selectedList = ''
  } else {
    state.appMenu.selectedList = list
  }
}

export const ADD_TODO_ITEM = (state, item) => {
  item.id = getToDoId()
  state.todo.push(item)
  state.selectedToDoTaskList = []
}

export const SET_SELECTED_TODO_TASK = (state, todo) => {
  state.selectedToDoTask = todo
  state.selectedToDoTaskList = []
}

export const SET_SELECTED_TODO_TASK_LIST = (state, taskIdList) => {
  if (taskIdList.length > 0) {
    state.selectedToDoTask = null
  }
  state.selectedToDoTaskList = taskIdList
}

export const UPDATE_TODO_TASK = (state, task) => {
  state.todo = state.todo.map((todo) => {
    if (todo.id === task.id) {
      return mergeDeepRight(todo, task)
    }

    return todo
  })
  state.selectedToDoTask = null
}

export const DELETE_TODO_TASK = (state, taskId) => {
  state.todo = state.todo.filter((todo) => todo.id !== taskId)
  state.selectedToDoTaskList = state.selectedToDoTaskList.filter(
    (id) => id !== taskId
  )
  state.selectedToDoTask = null
}

export const DELETE_MULTIPLE_TODO_TASKS = (state) => {
  const tasksTobeDeleted = state.selectedToDoTaskList
  state.todo = state.todo.filter((todo) => !tasksTobeDeleted.includes(todo?.id))
  state.selectedToDoTaskList = []
}

export const SET_TASK_COMPLETED = (state, payload) => {
  state.todo = state.todo.map((todo) => {
    if (todo?.id === payload.taskId && todo?.completed !== payload.completed) {
      todo.completed = payload.completed
    }
    return todo
  })
}

export const SET_MULTIPLE_TASK_COMPLETED = (state, completed) => {
  const taskIdList = state.selectedToDoTaskList
  state.todo = state.todo.map((todo) => {
    if (taskIdList.includes(todo?.id) && todo?.completed !== completed) {
      todo.completed = completed
    }
    return todo
  })
  state.selectedToDoTaskList = []
}
