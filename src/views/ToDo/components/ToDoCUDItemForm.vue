<template>
  <div id="todo-add-item-form">
    <form
      class="h-full flex flex-col justify-between"
      ref="addToDoItemForm"
      @submit.prevent="
        selectedToDoTask === null ? addToDoItem() : updateToDoTask(newToDoItem)
      "
    >
      <div class="flex flex-col">
        <input type="text" placeholder="Task" v-model="newToDoItem.task" />
        <textarea placeholder="Description" v-model="newToDoItem.description" />
        <div class="flex flex-row items-center mb-5">
          <p class="mr-6">List</p>
          <select name="list" v-model="newToDoItem.list">
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div class="flex flex-row items-center">
          <p class="mr-6">Due date</p>
          <date-picker
            v-model="newToDoItem.date"
            valueType="format"
            :clearable="false"
          />
        </div>
      </div>

      <div v-if="selectedToDoTask === null">
        <app-primary-button type="submit">Create task</app-primary-button>
        <app-secondary-button>Clear</app-secondary-button>
      </div>
      <div v-else>
        <app-primary-button type="submit"> Save changes </app-primary-button>
        <app-secondary-button :onclick="() => deleteToDoTask(newToDoItem.id)"
          >Delete task</app-secondary-button
        >
        <app-secondary-button :onclick="() => setSelectedToDoTask(null)"
          >Cancel</app-secondary-button
        >
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import DatePicker from 'vue2-datepicker'
import AppPrimaryButton from '../../../components/AppPrimaryButton'
import AppSecondaryButton from '../../../components/AppSecondaryButton'
import { formatDate } from '../../../helpers/date'

export default {
  name: 'ToDoCUDItemForm',
  components: {
    'date-picker': DatePicker,
    'app-primary-button': AppPrimaryButton,
    'app-secondary-button': AppSecondaryButton
  },
  data() {
    return {
      newToDoItem: {
        id: null,
        task: '',
        description: '',
        list: 'Personal',
        date: formatDate(new Date())
      }
    }
  },
  computed: {
    ...mapState(['selectedToDoTask'])
  },
  watch: {
    selectedToDoTask(newValue) {
      if (newValue !== null) {
        this.newToDoItem = Object.assign({}, newValue)
      } else {
        this.newToDoItem = {
          id: null,
          task: '',
          description: '',
          list: 'Personal',
          date: formatDate(new Date())
        }
      }
    }
  },
  methods: {
    ...mapActions(['setSelectedToDoTask', 'updateToDoTask', 'deleteToDoTask']),
    addToDoItem() {
      this.$store.dispatch('addToDoItem', this.newToDoItem)
      this.newToDoItem = {
        id: null,
        task: '',
        description: '',
        list: 'Personal',
        date: formatDate(new Date())
      }
      this.$refs.addToDoItemForm.reset()
    }
  }
}
</script>

<style lang="postcss" scoped>
#todo-add-item-form {
  @apply flex flex-col justify-between rounded-xl px-5 py-4 h-full;
  background-color: #f4f4f4;
  width: 460px;
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
