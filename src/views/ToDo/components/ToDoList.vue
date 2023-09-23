<template>
  <div id="todo-list">
    <div>
      <todo-list-item v-for="todo in todoList" :key="todo.id" :todo="todo" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ToDoListItem from './ToDoListItem.vue'

export default {
  name: 'ToDoList',
  components: {
    'todo-list-item': ToDoListItem
  },
  computed: {
    ...mapState({ todoList: 'todo' })
  }
}
</script>

<style lang="postcss" scoped>
#todo-list {
  @apply flex flex-col;
  height: calc(100% - 68px);
  width: 700px;
  overflow-y: auto;
}
</style>
