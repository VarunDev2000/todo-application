<template>
  <div>
    <div
      class="flex flex-row justify-between items-center cursor-pointer px-3 py-3"
    >
      <div class="w-full flex flex-row justify-center items-center">
        <input
          type="checkbox"
          v-model="selected"
          @change="setSelectedToDoList"
        />
        <p class="w-full ml-3 pt-0.5" @click="toggleMoreDetails">
          {{ todo?.task }}
        </p>
      </div>
      <font-awesome-icon
        v-if="showMoreDetails"
        icon="fa-solid fa-chevron-up"
        @click="toggleMoreDetails"
      />
      <font-awesome-icon
        v-else
        icon="fa-solid fa-chevron-down"
        @click="toggleMoreDetails"
      />
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
    ...mapState({ selectedToDoList: 'selectedToDoTaskListForDelete' })
  },
  watch: {
    selectedToDoList(newValue) {
      if (!newValue.includes(this.todo?.id)) {
        this.selected = false
      }
    }
  },
  methods: {
    ...mapActions(['setSelectedToDoTask', 'setSelectedToDoTaskListForDelete']),
    toggleMoreDetails() {
      this.showMoreDetails = !this.showMoreDetails
    },
    setSelectedToDoList() {
      const filteredList = this.selectedToDoList.filter(
        (todoId) => todoId !== this.todo?.id
      )
      if (this.selected) {
        filteredList.push(this.todo?.id)
      }
      this.setSelectedToDoTaskListForDelete(filteredList)
    }
  }
}
</script>

<style lang="postcss" scoped>
hr {
  @apply border-gray-200;
}
</style>
