import { mergeDeepRight } from 'ramda'
import { getToDoId } from '@/helpers/random'

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
}

export const SET_SELECTED_TODO_TASK = (state, todo) => {
  state.selectedToDoTask = todo
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

// export const DELETE_TODO_TASK = (state, taskId) => {
//   state.selectedToDoTask = todo
// }

// export const DELETE_MULTIPLE_TODO_TASKS = (state, taskIds) => {
//   state.selectedToDoTask = todo
// }
