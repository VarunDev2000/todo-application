<template>
  <div
    class="w-[1500px] h-screen flex flex-row justify-center text-gray-700 p-0 overflow-hidden sm:justify-start md:justify-center md:px-3 md:p-4 lg:text-sm"
  >
    <app-menu />
    <router-view />
  </div>
</template>

<script>
import AppMenu from '@/components/AppMenu'

export default {
  components: {
    'app-menu': AppMenu
  }
}
</script>

<style lang="postcss">
body {
  font-family: 'Poppins', sans-serif;
  @apply flex justify-center items-center;
}

::-webkit-scrollbar {
  width: 0;
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #e8e8e8;
  border-radius: 10px;
}
</style>
