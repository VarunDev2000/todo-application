<template>
  <div
    class="flex flex-row justify-between items-center px-3 py-2 mb-1 cursor-pointer rounded-md lg:hover:bg-gray-200"
    :class="{ 'bg-gray-200': selected }"
    @click="setSelectedMenuTask(task.id)"
  >
    <div class="flex flex-row justify-center items-center">
      <font-awesome-icon :icon="'fa-solid' + ' ' + task.icon" />
      <p class="pl-3">{{ task.menuTask }}</p>
    </div>
    <p
      class="w-7 h-5 bg-gray-200 flex justify-center items-center text-black text-xs font-bold rounded-sm"
      :class="{ 'bg-white': selected }"
    >
      {{ count }}
    </p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'AppMenuTaskItem',
  props: {
    task: Object,
    count: {
      type: [Number, String],
      default: '-'
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapActions(['setSelectedMenuTask'])
  }
}
</script>

<style scoped></style>
