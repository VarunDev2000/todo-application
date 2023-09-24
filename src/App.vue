<template>
  <div id="app">
    <div class="hidden md:block">
      <app-menu />
    </div>
    <router-view />
  </div>
</template>

<script>
import AppMenu from './components/AppMenu/AppMenu'

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

#app {
  @apply flex flex-row justify-center h-screen p-0 px-3 text-gray-700 text-sm sm:justify-start md:justify-center md:p-4;
  width: 1500px;
  overflow: hidden;
}

::-webkit-scrollbar {
  width: 0;
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: black;
  border-radius: 10px;
}
</style>
