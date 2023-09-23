import { MENU_TASKS } from './constants'

export const getTitle = (task) => {
  const data = {}

  MENU_TASKS.forEach((menuTask) => {
    data[menuTask?.id] = menuTask?.menuTask
  })

  return data[task]
}
