<template>
  <div
    class="flex flex-row justify-between items-center cursor-pointer rounded-md px-3 py-2 mb-1 lg:hover:bg-gray-200"
    :class="{ 'bg-gray-200': selected }"
    @click="setSelectedMenuList(list.id)"
  >
    <div class="flex flex-row justify-center items-center">
      <p
        class="w-4 h-4 text-black rounded-md"
        :style="{ backgroundColor: list.color }"
      />
      <p class="pl-3">{{ list.menuList }}</p>
    </div>
    <p
      class="bg-gray-200 w-7 h-5 flex justify-center items-center text-black text-xs font-bold rounded-sm"
      :class="{ 'bg-white': selected }"
    >
      {{ count }}
    </p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'AppMenuListItem',
  props: {
    list: Object,
    count: {
      type: [Number, String],
      default: '-'
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapActions(['setSelectedMenuList'])
  }
}
</script>

<style scoped></style>
