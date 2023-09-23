<template>
  <button
    class="w-40 bg-yellow-300 text-black py-2 rounded-lg font-semibold text-sm hover:bg-yellow-400"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'AppPrimaryButton'
}
</script>

<style scoped></style>
