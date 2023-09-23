<template>
  <div id="app">
    <app-menu />
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
  @apply flex flex-row h-screen p-4 text-gray-700 text-sm;
  width: 1500px;
  overflow: hidden;
}

::-webkit-scrollbar {
  width: 0;
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #ff0000;
}
</style>
