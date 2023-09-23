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
    ...mapState(['appMenu', 'selectedToDoTask'])
  },
  methods: {
    ...mapActions(['setSelectedToDoTask'])
  }
}
</script>

<style lang="postcss" scoped>
#todo {
  @apply h-full flex flex-row py-3;
  width: 1160px;
}
</style>
