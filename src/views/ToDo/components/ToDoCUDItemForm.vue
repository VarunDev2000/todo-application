<template>
  <div
    class="w-full h-full bg-[#f4f4f4] flex flex-col justify-between rounded-xl 2xl:w-[410px]"
  >
    <form
      class="h-full flex flex-col justify-between px-5 py-4"
      ref="addToDoItemForm"
      @submit.prevent="
        selectedToDoTask === null ? addToDoItem() : updateToDoItem()
      "
    >
      <div class="flex flex-col">
        <error-wrapper :error="error['task']">
          <input
            type="text"
            placeholder="Task"
            v-model="toDoItem.task"
            maxlength="100"
            @input="validateInput('task')"
            :class="{ errorOutline: error['task'] }"
            :data-test="DATA_TEST_ID.INPUT_TASK_NAME"
          />
        </error-wrapper>

        <error-wrapper :error="error['description']">
          <textarea
            placeholder="Description"
            v-model="toDoItem.description"
            maxlength="500"
            @input="validateInput('description')"
            :class="{ errorOutline: error['description'] }"
            :data-test="DATA_TEST_ID.INPUT_TASK_DESCRIPTION"
          />
        </error-wrapper>
        <div class="flex flex-row items-center mb-5">
          <p class="mr-6">List</p>
          <select name="list" v-model="toDoItem.list">
            <option
              v-for="menuList in MENU_LISTS"
              :key="menuList.id"
              :value="menuList.id"
            >
              {{ menuList.menuList }}
            </option>
          </select>
        </div>

        <div class="flex flex-row items-center mb-5">
          <p class="mr-6">Due date</p>
          <date-picker
            v-model="toDoItem.date"
            valueType="format"
            :clearable="false"
            class="w-[50%] md:w-auto"
          />
        </div>

        <div class="flex flex-row justify-left items-center">
          <input type="checkbox" v-model="toDoItem.completed" />
          <p class="mx-2 pt-[2px] md:pt-0">Completed</p>
        </div>
      </div>

      <app-primary-button
        v-if="selectedToDoTask === null"
        type="submit"
        :disabled="createOrSaveActionButtonDisabled"
        class="w-full mt-10 mr-2"
        :data-test="DATA_TEST_ID.TODO_CUD_ITEM_FORM_CREATE_TASK_BUTTON"
        >Create task</app-primary-button
      >

      <div v-else class="mt-10">
        <div class="flex flex-col justify-between items-center md:flex-row">
          <app-primary-button
            type="submit"
            :disabled="createOrSaveActionButtonDisabled"
            class="w-full mb-3 md:mr-2 md:mb-0"
            :data-test="DATA_TEST_ID.TODO_CUD_ITEM_FORM_UPDATE_TASK_BUTTON"
          >
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
            :data-test="DATA_TEST_ID.TODO_CUD_ITEM_FORM_DELETE_TASK_BUTTON"
            >Delete task</app-secondary-button
          >
        </div>

        <app-secondary-button
          class="w-full mt-3"
          :onclick="() => onCancelClick()"
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
import { equals } from 'ramda'
import { formatDate } from '@/utils/date'
import { isNullOrEmpty } from '@/utils/helpers'
import { MENU_LISTS } from '@/utils/constants'
import { DATA_TEST_ID } from '@/utils/test/data-test-ids'
import AppPrimaryButton from '@/components/AppPrimaryButton'
import AppSecondaryButton from '@/components/AppSecondaryButton'
import ToDoDeleteConfirmation from './ToDoDeleteConfirmation'
import ErrorWrapper from '@/components/ErrorWrapper'

export default {
  name: 'ToDoCUDItemForm',
  components: {
    'date-picker': DatePicker,
    'app-primary-button': AppPrimaryButton,
    'app-secondary-button': AppSecondaryButton,
    'todo-delete-confirmation': ToDoDeleteConfirmation,
    'error-wrapper': ErrorWrapper
  },
  data() {
    return {
      createOrSaveActionButtonDisabled: true,
      toDoItem: {
        id: null,
        task: '',
        description: '',
        list: MENU_LISTS[0].id,
        date: formatDate(new Date()),
        completed: false
      },
      error: {
        task: '',
        description: ''
      },
      MENU_LISTS,
      DATA_TEST_ID
    }
  },
  mounted() {
    this.setFormData(this.selectedToDoTask)
  },
  computed: {
    ...mapState(['modal', 'selectedToDoTask']),
    isFormValid() {
      return !isNullOrEmpty(this.toDoItem.task) &&
        isNullOrEmpty(this.error.task) &&
        isNullOrEmpty(this.error.description)
        ? true
        : false
    }
  },
  watch: {
    selectedToDoTask(newValue) {
      this.setFormData(newValue)
    },
    toDoItem: {
      handler: function (newValue) {
        if (equals(newValue, this.selectedToDoTask)) {
          this.createOrSaveActionButtonDisabled = true
        } else {
          this.createOrSaveActionButtonDisabled = !this.isFormValid
        }
      },
      deep: true
    }
  },
  methods: {
    ...mapActions([
      'toggleModal',
      'setSelectedToDoTask',
      'addToDoTask',
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
    validateInput(name) {
      const regexPattern = /^[A-Za-z\-0-9 ]+$/

      switch (name) {
        case 'task':
          if (isNullOrEmpty(this.toDoItem[name])) {
            this.error[name] = 'Task is required'
            break
          } else {
            this.error[name] = ''
          }
          if (!regexPattern.test(this.toDoItem[name])) {
            this.error[name] = 'Task name should not have special characters'
          } else {
            this.error[name] = ''
          }
          break
        case 'description':
          if (
            !regexPattern.test(this.toDoItem[name]) &&
            !isNullOrEmpty(this.toDoItem[name])
          ) {
            this.error[name] = 'Description should not have special characters'
          } else {
            this.error[name] = ''
          }
          break

        default:
          break
      }
    },
    addToDoItem() {
      if (this.isFormValid) {
        this.addToDoTask(this.toDoItem)
        this.clearForm()
        this.$refs.addToDoItemForm.reset()
        this.toggleModal({
          name: 'isCUDItemModalOpen',
          value: false
        })
      }
    },
    setFormData(data) {
      if (data !== null) {
        this.toDoItem = Object.assign({}, data)
      } else {
        this.clearForm()
      }
    },
    updateToDoItem() {
      if (this.isFormValid) {
        this.updateToDoTask(this.toDoItem)
        this.toggleModal({
          name: 'isCUDItemModalOpen',
          value: false
        })
      }
    },
    onCancelClick() {
      this.setSelectedToDoTask(null)
      this.toggleModal({
        name: 'isCUDItemModalOpen',
        value: false
      })
    },
    onDeleteConfirmClick() {
      this.deleteToDoTask(this.toDoItem.id)
      this.toggleModal({
        name: 'isDeleteConfirmationModalOpen',
        value: false
      })
      this.toggleModal({
        name: 'isCUDItemModalOpen',
        value: false
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
form {
  overflow-x: hidden;
  overflow-y: auto;
}

input[type='text'] {
  @apply w-full p-3 rounded-md;
}

textarea {
  @apply w-full h-[150px] p-3 rounded-md resize-none;
}

.errorOutline {
  outline: red;
  border: 2px solid red;
}

select {
  @apply px-3 py-2 rounded-md cursor-pointer bg-gray-100;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 50%;
  padding-right: 35px;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAUCAMAAACtdX32AAAAdVBMVEUAAAD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhMdQaAAAAJ3RSTlMAAAECAwQGBwsOFBwkJTg5RUZ4eYCHkJefpaytrsXGy8zW3+Do8vNn0bsyAAAAYElEQVR42tXROwJDQAAA0Ymw1p9kiT+L5P5HVEi3qJn2lcPjtIuzUIJ/rhIGy762N3XaThqMN1ZPALsZPEzG1x8LrFL77DHBnEMxBewz0fJ6LyFHTPL7xhwzWYrJ9z22AqmQBV757MHfAAAAAElFTkSuQmCC);
  background-position: 100%;
  background-repeat: no-repeat;
  border: 1px solid #ccc;
}

@import 'vue2-datepicker/index.css';
</style>
