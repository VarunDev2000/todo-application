<template>
  <div
    id="todo-list"
    class="w-auto h-[calc(100%-68px)] flex flex-col overflow-y-auto 2xl:w-full"
  >
    <transition name="fade">
      <div v-if="filteredToDoList.length > 0">
        <transition-group name="list">
          <todo-list-item
            v-for="todo in filteredToDoList"
            :key="todo.id"
            :todo="todo"
            :data-test="DATA_TEST_ID.TODO_LIST_ITEM"
          />
        </transition-group>
      </div>
    </transition>
    <div
      v-if="filteredToDoList.length <= 0"
      class="flex flex-col justify-center items-center"
    >
      <img
        class="w-[90%] h-[88%] md:w-[370px] md:h-[350px]"
        src="@/assets/images/404.png"
        alt="Nothing to show here"
      />
      <p class="text-lg text-gray-500 text-center italic mb-2">
        Nothing to show here....
      </p>
      <p
        v-if="todoList.length <= 0"
        class="text-[13px] text-gray-500 italic mb-10"
      >
        Tasks you add will be displayed here
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getFilteredData } from '@/utils/helpers'
import { DATA_TEST_ID } from '@/utils/test/data-test-ids'
import ToDoListItem from './ToDoListItem.vue'

export default {
  name: 'ToDoList',
  data() {
    return {
      filteredToDoList: [],
      DATA_TEST_ID
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
    filterChange() {
      return [this.appMenu.selectedTask, this.appMenu.selectedList].join()
    }
  },
  watch: {
    filterChange() {
      this.updateFilteredList()
    },
    todoList() {
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

<style scoped></style>
