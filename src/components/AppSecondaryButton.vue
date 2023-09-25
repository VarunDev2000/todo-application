<template>
  <button
    class="w-40 border bg-gray-100 border-gray-200 text-gray-600 py-2 rounded-lg font-semibold text-sm hover:bg-gray-200"
    :type="type"
    @click="onclick"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'AppSecondaryButton',
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
