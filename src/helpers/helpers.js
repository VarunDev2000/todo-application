import { isEmpty, isNil } from 'ramda'
import { MENU_LISTS, MENU_TASKS } from './constants'
import { formatDate } from './date'

export const isNullOrEmpty = (value) => isNil(value) || isEmpty(value)

export const getTitle = (task) => {
  const data = {}

  MENU_TASKS.forEach((menuTask) => {
    data[menuTask?.id] = menuTask?.menuTask
  })

  return data[task]
}

const getMenuTaskNameById = (menuTaskId) => {
  const menuTask = MENU_TASKS.find((menuTask) => menuTask?.id === menuTaskId)

  return menuTask?.menuTask
}

export const getFilteredData = (
  todoList = [],
  selectedMenuTask = MENU_TASKS[0]?.id,
  selectedMenuList = ''
) => {
  var menuTask = getMenuTaskNameById(selectedMenuTask)
  var filteredToDoList = []

  // For Menu task
  switch (menuTask) {
    case 'All':
      filteredToDoList = todoList
      break
    case 'Pending':
      todoList.forEach((todo) => {
        if (todo?.completed === false) {
          filteredToDoList.push(todo)
        }
      })
      break
    case 'Completed':
      todoList.forEach((todo) => {
        if (todo?.completed === true) {
          filteredToDoList.push(todo)
        }
      })
      break
    case 'Today':
      todoList.forEach((todo) => {
        if (todo?.date === formatDate(new Date())) {
          filteredToDoList.push(todo)
        }
      })
      break
    case 'Upcoming':
      todoList.forEach((todo) => {
        if (
          todo?.date !== formatDate(new Date()) &&
          new Date(todo?.date) > new Date()
        ) {
          filteredToDoList.push(todo)
        }
      })
      break
    default:
      break
  }

  // For Menu list
  if (!isNullOrEmpty(selectedMenuList)) {
    for (var i = 0; i < MENU_LISTS.length; i++) {
      var menuList = MENU_LISTS[i]
      if (menuList?.id === selectedMenuList) {
        filteredToDoList = filteredToDoList.filter(
          (todo) => todo?.list === selectedMenuList
        )
        break
      }
    }
  }

  if (filteredToDoList.length > 1) {
    var sortedList = Object.assign([], filteredToDoList)
    sortedList.sort((todo1, todo2) => {
      return new Date(todo2?.createdTime) - new Date(todo1?.createdTime)
    })

    return sortedList
  }

  return filteredToDoList
}
