<template>
  <div
    class="w-[1500px] h-screen flex flex-row justify-center text-gray-700 p-0 overflow-hidden sm:justify-start md:justify-center md:px-3 md:p-4 lg:text-sm"
  >
    <app-menu />
    <router-view />
    <app-welcome-popup />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import AppMenu from '@/components/AppMenu'
import AppWelcomePopUp from '@/components/AppWelcomePopUp'

export default {
  components: {
    'app-menu': AppMenu,
    'app-welcome-popup': AppWelcomePopUp
  },
  mounted() {
    window.addEventListener('storage', this.refreshApplicationOnStorageChange)
  },
  beforeUnmount() {
    window.removeEventListener(
      'storage',
      this.refreshApplicationOnStorageChange
    )
  },
  methods: {
    ...mapActions(['setToDoList']),
    refreshApplicationOnStorageChange() {
      window.location.reload()
    }
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
