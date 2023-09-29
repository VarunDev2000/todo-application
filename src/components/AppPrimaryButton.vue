<template>
  <button
    class="w-40 bg-yellow-300 py-2 text-sm text-black font-semibold rounded-lg disabled:bg-yellow-200 disabled:opacity-80 disabled:pointer-events-none lg:hover:bg-[#f0d13a] transition ease-out duration-500"
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
