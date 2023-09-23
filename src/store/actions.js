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

export const setSelectedToDoTaskListForDelete = (context, taskIdList) => {
  context.commit('SET_SELECTED_TODO_TASK_LIST_FOR_DELETE', taskIdList)
}

export const updateToDoTask = (context, task) => {
  context.commit('UPDATE_TODO_TASK', task)
}

export const deleteToDoTask = (context, taskId) => {
  context.commit('DELETE_TODO_TASK', taskId)
}

export const deleteMultipleToDoTask = (context) => {
  context.commit('DELETE_MULTIPLE_TODO_TASKS')
}
