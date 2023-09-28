<template>
  <button
    class="w-40 bg-yellow-300 text-black py-2 rounded-lg font-semibold text-sm lg:hover:bg-[#f0d13a] disabled:bg-yellow-200 disabled:opacity-80 transition ease-out duration-500 disabled:pointer-events-none"
    :type="type"
    :disabled="disabled"
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
    disabled: {
      type: Boolean,
      default: false
    },
    onclick: {
      type: Function,
      default: () => {}
    }
  }
}
</script>

<style scoped></style>
