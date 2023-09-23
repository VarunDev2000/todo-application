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
          class="w-full ml-3 py-3"
          :class="{
            'line-through': todo?.completed,
            'text-red-500': isPastDue()
          }"
          @click="toggleMoreDetails"
        >
          {{ todo?.task }}
        </p>
      </div>
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
    <div v-if="showMoreDetails" class="pl-8 pb-3">
      <p>{{ todo?.description }}</p>
      <p>{{ todo?.list }}</p>
      <button @click="setSelectedToDoTask(todo)">Edit</button>
    </div>
    <hr />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ToDoListItem',
  data() {
    return {
      selected: false,
      showMoreDetails: false
    }
  },
  props: {
    todo: Object
  },
  computed: {
    ...mapState(['selectedToDoTaskList'])
  },
  watch: {
    selectedToDoTaskList(newValue) {
      if (!newValue.includes(this.todo?.id)) {
        this.selected = false
      }
    }
  },
  methods: {
    ...mapActions([
      'setSelectedToDoTask',
      'setSelectedToDoTaskList',
      'setTaskCompleted'
    ]),
    toggleMoreDetails() {
      this.showMoreDetails = !this.showMoreDetails
    },
    isPastDue() {
      return new Date() > new Date(this.todo?.date) && !this.todo?.completed
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
