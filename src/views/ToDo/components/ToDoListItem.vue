<template>
  <div>
    <div
      class="w-full flex flex-row justify-end items-center px-3 cursor-pointer"
    >
      <div class="flex flex-row justify-end items-center flex-1">
        <input
          type="checkbox"
          v-model="selected"
          @change="setSelectedToDoList"
        />
        <p
          class="flex-1 mx-3 py-3 break-words"
          :class="{
            'line-through': todo.completed,
            'text-red-500': isPastDue(),
            'break-all': hasNoSpaces(todo.task)
          }"
          @click="toggleMoreDetails"
          :data-test="DATA_TEST_ID.TODO_TASK"
        >
          {{ todo.task }}
        </p>
      </div>
      <div class="flex flex-row justify-center items-center">
        <font-awesome-icon
          class="ml-2 mr-8 cursor-pointer md:hidden"
          icon="fa-solid fa-clone"
          title="Duplicate"
          @click="duplicate()"
        />
        <div>
          <font-awesome-icon
            v-if="!todo.completed"
            class="text-lg text-gray-700 lg:hover:text-gray-900"
            icon="fa-solid fa-check"
            title="Mark as completed"
            @click="setTaskCompleted({ taskId: todo.id, completed: true })"
            :data-test="DATA_TEST_ID.TODO_MARK_COMPLETED_BUTTON"
          />
          <font-awesome-icon
            v-else
            class="text-xl text-gray-700 lg:hover:text-gray-900"
            icon="fa-solid fa-xmark"
            title="Mark as not completed"
            @click="setTaskCompleted({ taskId: todo.id, completed: false })"
          />
        </div>
      </div>
    </div>

    <transition name="slide-fade">
      <div
        v-if="showMoreDetails"
        class="text-[14px] pb-3 pl-[38px] pr-4 lg:text-[12px]"
        :data-test="DATA_TEST_ID.TODO_MORE_INFO"
      >
        <p
          class="italic"
          :class="[
            todo.description !== '' ? 'mb-4' : '',
            hasNoSpaces(todo.task) ? 'break-all' : 'break-words'
          ]"
        >
          {{ todo.description }}
        </p>
        <div class="flex flex-row justify-between items-center mt-1">
          <div class="flex flex-col md:flex-row">
            <div class="flex flex-row items-center">
              <font-awesome-icon
                style="margin-bottom: 2px"
                icon="fa-solid fa-calendar-xmark"
                title="Due date"
              />
              <p class="ml-2">{{ todo.date }}</p>
            </div>
            <div
              class="flex flex-row items-center mt-2 md:justify-center md:mt-0 md:ml-12"
            >
              <p
                class="w-3 h-3 text-black rounded-md"
                :style="{ backgroundColor: list.color }"
              />
              <p class="ml-2">{{ list.name }}</p>
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
              class="underline lg:hover:text-black"
              @click="editToDo(todo)"
              :data-test="DATA_TEST_ID.TODO_ITEM_EDIT_BUTTON"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </transition>
    <hr />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { MENU_LISTS } from '@/utils/constants'
import { formatDate } from '@/utils/date'
import { hasNoSpaces } from '@/utils/helpers'
import { DATA_TEST_ID } from '@/utils/test/data-test-ids'

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
      MENU_LISTS,
      DATA_TEST_ID
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
      if (!newValue.includes(this.todo.id)) {
        this.selected = false
      }
    }
  },
  methods: {
    ...mapActions([
      'toggleModal',
      'addToDoTask',
      'setSelectedToDoTask',
      'setSelectedToDoTaskList',
      'setTaskCompleted'
    ]),
    hasNoSpaces,
    toggleMoreDetails() {
      this.showMoreDetails = !this.showMoreDetails
    },
    getListDetails() {
      const list = MENU_LISTS.filter((list) => {
        if (list.id === this.todo.list) {
          return list
        }
      })[0]

      this.list.name = list.menuList
      this.list.color = list.color
    },
    isPastDue() {
      return (
        this.todo.date !== formatDate(new Date()) &&
        new Date() > new Date(this.todo.date) &&
        !this.todo.completed
      )
    },
    duplicate() {
      var duplicateToDo = Object.assign({}, this.todo)
      duplicateToDo.completed = false
      this.addToDoTask(duplicateToDo)
    },
    editToDo(todo) {
      this.setSelectedToDoTask(todo)
      this.toggleModal({
        name: 'isCUDItemModalOpen',
        value: true
      })
    },
    setSelectedToDoList() {
      const filteredList = this.selectedToDoTaskList.filter(
        (todoId) => todoId !== this.todo.id
      )
      if (this.selected) {
        filteredList.push(this.todo.id)
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
