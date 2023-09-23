<template>
  <div>
    <todo-list />
    <todo-add-item-form />
  </div>
</template>

<script>
import ToDoList from './components/ToDoList'
import ToDoAddItemForm from './components/ToDoAddItemForm'

export default {
  name: 'ToDo',
  components: {
    'todo-list': ToDoList,
    'todo-add-item-form': ToDoAddItemForm
  }
}
</script>

<style scoped></style>
