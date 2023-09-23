<template>
  <div>
    <div class="flex flex-row justify-between items-center cursor-pointer py-3">
      <div class="flex flex-row justify-center items-center">
        <input type="checkbox" />
        <p class="pl-3 pt-0.5">{{ task }}</p>
      </div>
      <font-awesome-icon icon="fa-solid fa-chevron-down" />
    </div>
    <hr />
  </div>
</template>

<script>
export default {
  name: 'ToDoListItem',
  props: {
    task: String,
    description: String,
    date: Date,
    list: String
  }
}
</script>

<style lang="postcss" scoped>
hr {
  @apply border-gray-200;
}
</style>
