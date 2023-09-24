<template>
  <div id="todo-add-item-form">
    <form
      class="h-full flex flex-col justify-between px-5 py-4"
      ref="addToDoItemForm"
      @submit.prevent="
        selectedToDoTask === null ? addToDoItem() : updateToDoTask(toDoItem)
      "
    >
      <div class="flex flex-col">
        <input
          type="text"
          placeholder="Task"
          v-model="toDoItem.task"
          maxlength="100"
          required
        />
        <textarea
          placeholder="Description"
          v-model="toDoItem.description"
          maxlength="500"
        />
        <div class="flex flex-row items-center mb-5">
          <p class="mr-6">List</p>
          <select name="list" v-model="toDoItem.list">
            <option
              v-for="menuList in MENU_LISTS"
              :key="menuList?.id"
              :value="menuList?.id"
            >
              {{ menuList?.menuList }}
            </option>
          </select>
        </div>

        <div class="flex flex-row items-center">
          <p class="mr-6">Due date</p>
          <date-picker
            v-model="toDoItem.date"
            valueType="format"
            :clearable="false"
          />
        </div>
      </div>

      <div
        v-if="selectedToDoTask === null"
        class="flex flex-row justify-between items-center mt-10"
      >
        <app-primary-button type="submit" class="w-full mr-2"
          >Create task</app-primary-button
        >
        <app-secondary-button class="w-full" :onclick="() => clearForm()"
          >Clear</app-secondary-button
        >
      </div>
      <div v-else class="mt-10">
        <div class="flex flex-row justify-between items-center">
          <app-primary-button class="w-full mr-2" type="submit">
            Save changes
          </app-primary-button>
          <app-secondary-button
            class="w-full"
            :onclick="
              () =>
                toggleModal({
                  name: 'isDeleteConfirmationModalOpen',
                  value: true
                })
            "
            >Delete task</app-secondary-button
          >
        </div>

        <app-secondary-button
          class="w-full mt-3"
          :onclick="() => setSelectedToDoTask(null)"
          >Cancel</app-secondary-button
        >
      </div>
    </form>

    <todo-delete-confirmation
      :open="modal.isDeleteConfirmationModalOpen"
      :data="selectedToDoTask"
      :onConfirm="() => onDeleteConfirmClick()"
      :onCancel="
        () =>
          toggleModal({
            name: 'isDeleteConfirmationModalOpen',
            value: false
          })
      "
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import DatePicker from 'vue2-datepicker'
import AppPrimaryButton from '../../../components/AppPrimaryButton'
import AppSecondaryButton from '../../../components/AppSecondaryButton'
import ToDoDeleteConfirmation from './ToDoDeleteConfirmation'
import { formatDate } from '../../../helpers/date'
import { MENU_LISTS } from '@/helpers/constants'

export default {
  name: 'ToDoCUDItemForm',
  components: {
    'date-picker': DatePicker,
    'app-primary-button': AppPrimaryButton,
    'app-secondary-button': AppSecondaryButton,
    'todo-delete-confirmation': ToDoDeleteConfirmation
  },
  data() {
    return {
      toDoItem: {
        id: null,
        task: '',
        description: '',
        list: MENU_LISTS[0].id,
        date: formatDate(new Date()),
        completed: false
      },
      MENU_LISTS
    }
  },
  computed: {
    ...mapState(['modal', 'selectedToDoTask'])
  },
  watch: {
    selectedToDoTask(newValue) {
      if (newValue !== null) {
        this.toDoItem = Object.assign({}, newValue)
      } else {
        this.clearForm()
      }
    }
  },
  methods: {
    ...mapActions([
      'toggleModal',
      'setSelectedToDoTask',
      'updateToDoTask',
      'deleteToDoTask'
    ]),
    clearForm() {
      this.toDoItem = {
        id: null,
        task: '',
        description: '',
        list: MENU_LISTS[0].id,
        date: formatDate(new Date()),
        completed: false
      }
    },
    addToDoItem() {
      this.$store.dispatch('addToDoItem', this.toDoItem)
      this.clearForm()
      this.$refs.addToDoItemForm.reset()
    },
    onDeleteConfirmClick() {
      this.deleteToDoTask(this.toDoItem.id)
      this.toggleModal({
        name: 'isDeleteConfirmationModalOpen',
        value: false
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
#todo-add-item-form {
  @apply flex flex-col justify-between rounded-xl h-full;
  background-color: #f4f4f4;
  width: 410px;
}

form {
  overflow-x: hidden;
  overflow-y: auto;
}

input {
  @apply p-3 mb-5 rounded-md;
}

textarea {
  @apply p-3 mb-5 rounded-md resize-none;
  height: 150px;
}

select {
  @apply px-3 py-2 rounded-md cursor-pointer bg-gray-100;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 50%;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAUCAMAAACtdX32AAAAdVBMVEUAAAD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhMdQaAAAAJ3RSTlMAAAECAwQGBwsOFBwkJTg5RUZ4eYCHkJefpaytrsXGy8zW3+Do8vNn0bsyAAAAYElEQVR42tXROwJDQAAA0Ymw1p9kiT+L5P5HVEi3qJn2lcPjtIuzUIJ/rhIGy762N3XaThqMN1ZPALsZPEzG1x8LrFL77DHBnEMxBewz0fJ6LyFHTPL7xhwzWYrJ9z22AqmQBV757MHfAAAAAElFTkSuQmCC);
  background-position: 100%;
  background-repeat: no-repeat;
  border: 1px solid #ccc;
}

@import 'vue2-datepicker/index.css';
</style>
