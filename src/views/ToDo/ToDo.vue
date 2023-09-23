<template>
  <div id="todo">
    <div class="px-6">
      <div class="flex flex-row justify-between items-center pb-7">
        <p class="font-extrabold text-4xl">All Tasks</p>
        <app-secondary-button> + Add task</app-secondary-button>
      </div>
      <todo-list />
    </div>
    <todo-add-item-form />
  </div>
</template>

<script>
import ToDoList from './components/ToDoList'
import ToDoAddItemForm from './components/ToDoAddItemForm'
import AppSecondaryButton from '../../components/AppSecondaryButton'

export default {
  name: 'ToDo',
  components: {
    'todo-list': ToDoList,
    'todo-add-item-form': ToDoAddItemForm,
    'app-secondary-button': AppSecondaryButton
  }
}
</script>

<style lang="postcss" scoped>
#todo {
  @apply h-full flex flex-row py-3;
  width: 1160px;
}
</style>
