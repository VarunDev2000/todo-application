<template>
  <button
    class="w-40 bg-red-600 text-white py-2 rounded-lg tracking-wider text-sm hover:bg-red-700"
    :type="type"
    @click="onclick"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'ToDoDeleteButton',
  props: {
    type: {
      type: String,
      default: 'button'
    },
    onclick: {
      type: Function,
      default: () => {}
    }
  }
}
</script>

<style scoped></style>
