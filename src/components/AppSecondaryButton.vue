<template>
  <button
    class="w-40 border border-gray-200 text-gray-600 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100;"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'AppSecondaryButton'
}
</script>

<style scoped></style>
