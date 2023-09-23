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
