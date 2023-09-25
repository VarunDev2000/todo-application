<template>
  <div id="todo-list" class="w-auto 2xl:w-full">
    <div v-if="filteredToDoList.length > 0">
      <todo-list-item
        v-for="todo in filteredToDoList"
        :key="todo.id"
        :todo="todo"
      />
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
import { getFilteredData } from '@/helpers/helpers'
import ToDoListItem from './ToDoListItem.vue'

export default {
  name: 'ToDoList',
  data() {
    return {
      filteredToDoList: []
    }
  },
  components: {
    'todo-list-item': ToDoListItem
  },
  mounted() {
    this.updateFilteredList()
  },
  computed: {
    ...mapState(['appMenu']),
    ...mapState({ todoList: 'todo' }),
    filterOrDataChange() {
      return [
        this.todoList,
        this.appMenu.selectedTask,
        this.appMenu.selectedList
      ].join()
    }
  },
  watch: {
    filterOrDataChange() {
      this.updateFilteredList()
    }
  },
  methods: {
    updateFilteredList() {
      this.filteredToDoList = getFilteredData(
        this.todoList,
        this.appMenu.selectedTask,
        this.appMenu.selectedList
      )
    }
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
