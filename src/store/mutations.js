import { getToDoId } from '@/helpers/random'

export const ADD_TODO_ITEM = (state, item) => {
  item.id = getToDoId()
  state.todo.push(item)
}
