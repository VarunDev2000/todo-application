export const setSelectedMenuTask = (context, task) => {
  context.commit('SET_SELECTED_MENU_TASK', task)
}

export const setSelectedMenuList = (context, list) => {
  context.commit('SET_SELECTED_MENU_LIST', list)
}

export const addToDoItem = (context, item) => {
  context.commit('ADD_TODO_ITEM', item)
}
