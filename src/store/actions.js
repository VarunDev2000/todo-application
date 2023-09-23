export const setSelectedMenuTask = (context, task) => {
  context.commit('SET_SELECTED_MENU_TASK', task)
}

export const setSelectedMenuList = (context, list) => {
  context.commit('SET_SELECTED_MENU_LIST', list)
}

export const addToDoItem = (context, item) => {
  context.commit('ADD_TODO_ITEM', item)
}

export const setSelectedToDoTask = (context, todo) => {
  context.commit('SET_SELECTED_TODO_TASK', todo)
}

export const updateToDoTask = (context, task) => {
  context.commit('UPDATE_TODO_TASK', task)
}
