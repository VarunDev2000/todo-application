<template>
  <div>
    <div
      class="flex flex-row justify-between items-center cursor-pointer px-3 py-3"
      @click="toggleMoreDetails"
    >
      <div class="flex flex-row justify-center items-center">
        <input type="checkbox" />
        <p class="pl-3 pt-0.5">{{ todo?.task }}</p>
      </div>
      <font-awesome-icon v-if="showMoreDetails" icon="fa-solid fa-chevron-up" />
      <font-awesome-icon v-else icon="fa-solid fa-chevron-down" />
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
import { mapActions } from 'vuex'

export default {
  name: 'ToDoListItem',
  data() {
    return { showMoreDetails: false }
  },
  props: {
    todo: Object
  },
  methods: {
    ...mapActions(['setSelectedToDoTask']),
    toggleMoreDetails() {
      this.showMoreDetails = !this.showMoreDetails
    }
  }
}
</script>

<style lang="postcss" scoped>
hr {
  @apply border-gray-200;
}
</style>
