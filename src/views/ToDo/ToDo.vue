<template>
  <div
    id="todo"
    class="w-full h-full py-5 mx-3 md:flex md:flex-row md:py-3 md:w-[calc(100vw-360px)] lg:w-[650px] 2xl:w-[1160px]"
    :class="[appMenu.isMenuOpen ? 'hidden mx-0' : 'flex']"
  >
    <div class="w-full md:pl-5 2xl:px-5">
      <div class="flex flex-row justify-between items-center pb-7">
        <p class="font-extrabold text-4xl">
          {{ getTitle(appMenu.selectedTask) }}
        </p>
        <app-secondary-button
          v-if="selectedToDoTask !== null"
          :onclick="() => setSelectedToDoTask(null)"
          class="hidden 2xl:block"
        >
          Create task</app-secondary-button
        >
        <div
          class="flex flex-row items-center justify-center ml-3 mr-1 2xl:hidden"
        >
          <app-primary-button class="2xl:hidden w-auto px-4"
            >Create task</app-primary-button
          >
          <font-awesome-icon
            class="md:hidden text-xl ml-7 text-gray-700 hover:text-gray-900 cursor-pointer"
            icon="fa-solid fa-bars"
            title="Menu"
            @click="toggleMenu(true)"
          />
        </div>
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
            @click="
              () =>
                toggleModal({
                  name: 'isMultipleDeleteConfirmationModalOpen',
                  value: true
                })
            "
          />
          <app-secondary-button :onclick="() => setSelectedToDoTaskList([])"
            >Cancel</app-secondary-button
          >
        </div>
      </div>
      <todo-list />
    </div>
    <div class="hidden 2xl:block">
      <todo-cud-item-form />
    </div>

    <todo-delete-confirmation
      :open="modal.isMultipleDeleteConfirmationModalOpen"
      :data="selectedToDoTaskList"
      :onConfirm="() => onDeleteConfirmClick()"
      :onCancel="
        () =>
          toggleModal({
            name: 'isMultipleDeleteConfirmationModalOpen',
            value: false
          })
      "
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ToDoList from './components/ToDoList'
import ToDoCUDItemForm from './components/ToDoCUDItemForm'
import AppPrimaryButton from '@/components/AppPrimaryButton'
import AppSecondaryButton from '../../components/AppSecondaryButton'
import ToDoDeleteConfirmation from './components/ToDoDeleteConfirmation'
import { getTitle } from '../../helpers/helpers'

export default {
  name: 'ToDo',
  components: {
    'todo-list': ToDoList,
    'todo-cud-item-form': ToDoCUDItemForm,
    'app-primary-button': AppPrimaryButton,
    'app-secondary-button': AppSecondaryButton,
    'todo-delete-confirmation': ToDoDeleteConfirmation
  },
  computed: {
    ...mapState([
      'modal',
      'appMenu',
      'selectedToDoTask',
      'selectedToDoTaskList'
    ])
  },
  methods: {
    getTitle,
    ...mapActions([
      'toggleMenu',
      'toggleModal',
      'setSelectedToDoTask',
      'deleteMultipleToDoTask',
      'setSelectedToDoTaskList',
      'setMultipleTaskCompleted'
    ]),
    onDeleteConfirmClick() {
      this.deleteMultipleToDoTask()
      this.toggleModal({
        name: 'isMultipleDeleteConfirmationModalOpen',
        value: false
      })
    }
  }
}
</script>

<style scoped></style>
