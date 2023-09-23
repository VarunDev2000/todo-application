<template>
  <div
    class="flex flex-row justify-between items-center cursor-pointer rounded-md px-3 py-2 hover:bg-gray-200"
  >
    <div class="flex flex-row justify-center items-center">
      <font-awesome-icon :icon="'fa-solid' + ' ' + icon" />
      <p class="pl-3">{{ name }}</p>
    </div>
    <p
      class="bg-gray-200 w-7 h-5 flex justify-center items-center text-black text-xs font-bold rounded-sm"
    >
      {{ count }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'AppMenuTaskItem',
  props: {
    icon: String,
    name: String,
    count: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped></style>
