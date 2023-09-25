<template>
  <div class="mb-5">
    <slot />
    <p v-if="error" class="mt-1 ml-1 text-[12px] text-red-500">*{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'ErrorWrapper',
  props: {
    error: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped></style>
