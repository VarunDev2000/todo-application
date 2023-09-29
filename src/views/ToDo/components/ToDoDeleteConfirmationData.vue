<template>
  <div>
    <p
      class="w-[97%] py-3 mx-3 break-words"
      :class="{
        'break-all': hasNoSpaces(todo.task)
      }"
    >
      {{ todo.task }}
    </p>

    <div class="text-[13px] pl-7 pr-4 pb-3">
      <p
        class="italic"
        :class="[
          todo.description !== '' ? 'mb-4' : '',
          hasNoSpaces(todo.task) ? 'break-all' : 'break-words'
        ]"
      >
        {{ todo.description }}
      </p>

      <div class="flex flex-row mt-0">
        <div class="flex flex-row items-center">
          <font-awesome-icon
            style="margin-bottom: 2px"
            icon="fa-solid fa-calendar-xmark"
            title="Due date"
          />
          <p class="ml-2">{{ todo.date }}</p>
        </div>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
import { hasNoSpaces } from '@/utils/helpers'

export default {
  name: 'ToDoDeleteConfirmationData',
  props: {
    todo: {
      type: Object,
      default: null
    }
  },
  methods: {
    hasNoSpaces
  }
}
</script>

<style scoped></style>
