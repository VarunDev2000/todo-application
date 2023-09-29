<template>
  <button
    class="w-40 bg-gray-100 border border-gray-200 py-2 text-sm text-gray-600 rounded-lg font-semibold lg:hover:bg-gray-200 transition ease-out duration-500"
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
