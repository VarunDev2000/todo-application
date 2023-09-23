<template>
  <button
    class="w-40 bg-yellow-300 text-black py-2 rounded-lg font-semibold text-sm hover:bg-yellow-400"
    :type="type"
    @click="onclick"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'AppPrimaryButton',
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
