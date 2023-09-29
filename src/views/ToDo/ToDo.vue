<template>
  <div
    class="w-full h-full py-5 mx-3 md:w-[calc(100vw-360px)] md:flex md:flex-row md:py-3 md:mx-0 lg:w-[650px] 2xl:w-[1160px]"
    :class="[appMenu.isMenuOpen ? 'hidden mx-0' : 'flex']"
  >
    <div class="w-full md:pl-5 2xl:w-[730px] 2xl:px-5">
      <div
        class="flex flex-row justify-between pb-7 mx-1 md:mx-0 2xl:items-center"
      >
        <p class="text-2xl font-extrabold md:text-4xl">
          {{ getTitle(appMenu.selectedTask) }}
        </p>

        <div class="flex flex-col">
          <app-secondary-button
            v-if="selectedToDoTask !== null"
            :onclick="() => setSelectedToDoTask(null)"
            class="hidden 2xl:block"
            :data-test="DATA_TEST_ID.TODO_CREATE_TASK_BUTTON"
          >
            Create task</app-secondary-button
          >
          <div
            class="flex flex-row justify-end items-center ml-3 mr-1 mb-6 2xl:hidden"
          >
            <app-primary-button
              class="w-auto px-4 2xl:hidden"
              :onclick="() => openCreateToDoModal()"
              >Create task</app-primary-button
            >
            <font-awesome-icon
              class="text-xl text-gray-700 ml-7 md:hidden"
              icon="fa-solid fa-bars"
              title="Menu"
              @click="toggleMenu(true)"
            />
          </div>
          <div
            v-if="selectedToDoTaskList.length > 0"
            class="flex flex-row justify-between items-center"
            :data-test="DATA_TEST_ID.TODO_TASKS_ACTION_LIST"
          >
            <font-awesome-icon
              class="text-xl text-gray-700 mx-3 cursor-pointer lg:hover:text-gray-900"
              icon="fa-solid fa-check"
              title="Mark as completed"
              @click="setMultipleTaskCompleted(true)"
            />
            <font-awesome-icon
              class="text-xl text-gray-700 mx-3 cursor-pointer lg:hover:text-gray-900"
              icon="fa-solid fa-xmark"
              title="Mark as not completed"
              @click="setMultipleTaskCompleted(false)"
            />
            <font-awesome-icon
              class="text-md text-gray-700 ml-3 mr-5 cursor-pointer lg:hover:text-gray-900"
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
            <app-secondary-button
              class="w-auto px-6"
              :onclick="() => setSelectedToDoTaskList([])"
              >Cancel</app-secondary-button
            >
          </div>
        </div>
      </div>
      <todo-list />
    </div>
    <div class="hidden 2xl:block">
      <todo-cud-item-form />
    </div>

    <todo-cud-item-popup-form
      class="2xl:hidden"
      :open="modal.isCUDItemModalOpen"
      :title="selectedToDoTask === null ? 'Create task' : 'Edit task'"
      :onCancel="() => closeToDoCUDItemPopUpModal()"
      ><todo-cud-item-form
    /></todo-cud-item-popup-form>

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
import AppPrimaryButton from '@/components/AppPrimaryButton'
import AppSecondaryButton from '@/components/AppSecondaryButton'
import { getTitle } from '@/utils/helpers'
import { DATA_TEST_ID } from '@/utils/test/data-test-ids'
import ToDoList from './components/ToDoList'
import ToDoCUDItemForm from './components/ToDoCUDItemForm'
import ToDoCUDItemPopUpForm from './components/ToDoCUDItemPopUpForm'
import ToDoDeleteConfirmation from './components/ToDoDeleteConfirmation'

export default {
  name: 'ToDo',
  components: {
    'todo-list': ToDoList,
    'todo-cud-item-form': ToDoCUDItemForm,
    'app-primary-button': AppPrimaryButton,
    'app-secondary-button': AppSecondaryButton,
    'todo-cud-item-popup-form': ToDoCUDItemPopUpForm,
    'todo-delete-confirmation': ToDoDeleteConfirmation
  },
  data() {
    return {
      DATA_TEST_ID
    }
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
    openCreateToDoModal() {
      this.setSelectedToDoTask(null)
      this.toggleModal({
        name: 'isCUDItemModalOpen',
        value: true
      })
    },
    closeToDoCUDItemPopUpModal() {
      this.setSelectedToDoTask(null)
      this.toggleModal({
        name: 'isCUDItemModalOpen',
        value: false
      })
    },
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
