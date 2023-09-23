<template>
  <div id="todo">
    <div class="px-6">
      <div class="flex flex-row justify-between items-center pb-7">
        <p class="font-extrabold text-4xl">{{ TITLE[appMenu.selectedTask] }}</p>
        <app-secondary-button
          v-if="selectedToDoTask !== null"
          :onclick="() => setSelectedToDoTask(null)"
        >
          + Add task</app-secondary-button
        >
        <div
          class="flex flex-row justify-between items-center"
          v-if="selectedToDoTaskList.length > 0"
        >
          <font-awesome-icon
            class="text-xl text-gray-700 hover:text-gray-900 cursor-pointer mx-3"
            icon="fa-solid fa-check"
            title="Mark as completed"
            @click="setMultipleTaskCompleted(true)"
          />
          <font-awesome-icon
            class="text-xl text-gray-700 hover:text-gray-900 cursor-pointer mx-3"
            icon="fa-solid fa-xmark"
            title="Mark as incomplete"
            @click="setMultipleTaskCompleted(false)"
          />
          <font-awesome-icon
            class="text-md text-gray-700 hover:text-gray-900 cursor-pointer ml-3 mr-5"
            icon="fa-solid fa-trash"
            title="Delete"
            @click="deleteMultipleToDoTask()"
          />
          <app-secondary-button :onclick="() => setSelectedToDoTaskList([])"
            >Cancel</app-secondary-button
          >
        </div>
      </div>
      <todo-list />
    </div>
    <todo-cud-item-form />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ToDoList from './components/ToDoList'
import ToDoCUDItemForm from './components/ToDoCUDItemForm'
import AppSecondaryButton from '../../components/AppSecondaryButton'
import { TITLE } from '../../helpers/constants'

export default {
  name: 'ToDo',
  components: {
    'todo-list': ToDoList,
    'todo-cud-item-form': ToDoCUDItemForm,
    'app-secondary-button': AppSecondaryButton
  },
  data() {
    return {
      TITLE
    }
  },
  computed: {
    ...mapState(['appMenu', 'selectedToDoTask', 'selectedToDoTaskList'])
  },
  methods: {
    ...mapActions([
      'setSelectedToDoTask',
      'deleteMultipleToDoTask',
      'setSelectedToDoTaskList',
      'setMultipleTaskCompleted'
    ])
  }
}
</script>

<style lang="postcss" scoped>
#todo {
  @apply h-full flex flex-row py-3;
  width: 1160px;
}
</style>
