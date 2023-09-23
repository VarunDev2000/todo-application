<template>
  <div id="todo-add-item-form">
    <form
      class="h-full flex flex-col justify-between"
      ref="addToDoItemForm"
      @submit.prevent="addToDoItem"
    >
      <div class="flex flex-col">
        <input type="text" placeholder="Task" v-model="newToDoItem" />
        <textarea placeholder="Task description" />
        <div class="flex flex-row items-center">
          <p class="mr-6">List</p>
          <select name="list">
            <option value="volvo">Personal</option>
            <option value="saab">Work</option>
            <option value="mercedes">Other</option>
          </select>
        </div>
      </div>
      <div>
        <app-primary-button>Save changes</app-primary-button>
        <app-secondary-button>Delete task</app-secondary-button>
      </div>
    </form>
  </div>
</template>

<script>
import AppPrimaryButton from '../../../components/AppPrimaryButton'
import AppSecondaryButton from '../../../components/AppSecondaryButton'

export default {
  name: 'ToDoAddItemForm',
  components: {
    'app-primary-button': AppPrimaryButton,
    'app-secondary-button': AppSecondaryButton
  },
  data() {
    return { newToDoItem: '' }
  },
  methods: {
    addToDoItem() {
      this.$store.dispatch('addToDoItem', this.newToDoItem)
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
</style>
