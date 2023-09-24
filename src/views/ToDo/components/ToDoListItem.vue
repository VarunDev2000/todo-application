<template>
  <div>
    <div class="flex flex-row justify-between items-center cursor-pointer px-3">
      <div class="w-full flex flex-row justify-center items-center">
        <input
          type="checkbox"
          v-model="selected"
          @change="setSelectedToDoList"
        />
        <p
          class="w-full mx-3 py-3"
          :class="{
            'line-through': todo?.completed,
            'text-red-500': isPastDue()
          }"
          @click="toggleMoreDetails"
        >
          {{ todo?.task }}
        </p>
      </div>
      <div class="flex flex-row justify-center items-center">
        <font-awesome-icon
          class="mx-8 cursor-pointer md:hidden"
          icon="fa-solid fa-clone"
          title="Duplicate"
          @click="duplicate()"
        />
        <div>
          <font-awesome-icon
            class="text-lg text-gray-700 hover:text-gray-900"
            v-if="!todo?.completed"
            icon="fa-solid fa-check"
            title="Mark as completed"
            @click="setTaskCompleted({ taskId: todo?.id, completed: true })"
          />
          <font-awesome-icon
            class="text-xl text-gray-700 hover:text-gray-900"
            v-else
            icon="fa-solid fa-xmark"
            title="Mark as incomplete"
            @click="setTaskCompleted({ taskId: todo?.id, completed: false })"
          />
        </div>
      </div>
    </div>
    <div
      v-if="showMoreDetails"
      class="pl-[38px] pr-4 pb-3 text-[14px] lg:text-[12px]"
    >
      <p>{{ todo?.description }}</p>
      <div class="flex flex-row justify-between items-center mt-5">
        <div class="flex flex-col md:flex-row">
          <div class="flex flex-row items-center">
            <font-awesome-icon
              style="margin-bottom: 2px"
              icon="fa-solid fa-calendar-xmark"
              title="Due date"
            />
            <p class="text-black ml-2">{{ todo?.date }}</p>
          </div>
          <div
            class="flex flex-row mt-2 items-center md:justify-center md:mt-0 md:ml-12"
          >
            <p
              class="w-3 h-3 text-black rounded-md"
              :style="{ backgroundColor: list?.color }"
            />
            <p class="ml-2">{{ list?.name }}</p>
          </div>
        </div>

        <div class="flex flex-row justify-center items-center ml-5">
          <font-awesome-icon
            class="hidden mx-5 cursor-pointer md:block"
            icon="fa-solid fa-clone"
            title="Duplicate"
            @click="duplicate()"
          />
          <button
            class="hidden 2xl:block underline hover:text-black"
            @click="setSelectedToDoTask(todo)"
          >
            Edit
          </button>
          <button class="2xl:hidden underline hover:text-black">Edit</button>
        </div>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { MENU_LISTS } from '@/helpers/constants'

export default {
  name: 'ToDoListItem',
  data() {
    return {
      selected: false,
      showMoreDetails: false,
      list: {
        name: '',
        color: '#000000'
      },
      MENU_LISTS
    }
  },
  props: {
    todo: Object
  },
  mounted() {
    this.getListDetails()
  },
  computed: {
    ...mapState(['selectedToDoTaskList']),
    ...mapState({ todoList: 'todo' })
  },
  watch: {
    todoList() {
      this.getListDetails()
    },
    selectedToDoTaskList(newValue) {
      if (!newValue.includes(this.todo?.id)) {
        this.selected = false
      }
    }
  },
  methods: {
    ...mapActions([
      'addToDoItem',
      'setSelectedToDoTask',
      'setSelectedToDoTaskList',
      'setTaskCompleted'
    ]),
    toggleMoreDetails() {
      this.showMoreDetails = !this.showMoreDetails
    },
    getListDetails() {
      const list = MENU_LISTS.filter((list) => {
        if (list?.id === this.todo?.list) {
          return list
        }
      })[0]

      this.list.name = list?.menuList
      this.list.color = list?.color
    },
    isPastDue() {
      return new Date() > new Date(this.todo?.date) && !this.todo?.completed
    },
    duplicate() {
      var duplicateToDo = Object.assign({}, this.todo)
      duplicateToDo.completed = false
      this.addToDoItem(duplicateToDo)
    },
    setSelectedToDoList() {
      const filteredList = this.selectedToDoTaskList.filter(
        (todoId) => todoId !== this.todo?.id
      )
      if (this.selected) {
        filteredList.push(this.todo?.id)
      }
      this.setSelectedToDoTaskList(filteredList)
    }
  }
}
</script>

<style lang="postcss" scoped>
hr {
  @apply border-gray-200;
}
</style>
