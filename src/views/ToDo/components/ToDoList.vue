<template>
  <div id="todo-list" class="w-auto 2xl:w-full">
    <div v-if="todoList.length > 0">
      <todo-list-item v-for="todo in todoList" :key="todo.id" :todo="todo" />
    </div>
    <div v-else class="flex flex-col justify-center items-center">
      <img
        class="w-[90%] h-[88%] md:w-[370px] md:h-[350px]"
        src="@/assets/images/404.png"
        alt="Nothing to show here"
      />
      <p class="text-gray-500 text-lg">Nothing to show here....</p>
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
  overflow-y: auto;
}
</style>
