<template>
  <transition :name="isMediumSizeScreen ? '' : 'fade'">
    <div
      id="appMenu"
      v-if="isMediumSizeScreen || appMenu.isMenuOpen"
      data-test="app-menu"
    >
      <div>
        <div class="flex flex-row justify-between items-center">
          <p class="title">Menu</p>
          <font-awesome-icon
            class="md:hidden text-2xl text-gray-700 lg:hover:text-gray-900 cursor-pointer ml-3"
            icon="fa-solid fa-xmark"
            title="Close menu"
            @click="toggleMenu(false)"
          />
        </div>

        <hr />

        <div>
          <p class="subtitle">Tasks</p>
          <div>
            <app-menu-task-item
              v-for="menuTask in MENU_TASKS"
              :key="menuTask.id"
              :task="menuTask"
              :selected="menuTask.id === appMenu.selectedTask"
              :count="getMenuTaskCount(menuTask.id)"
            />
          </div>
        </div>

        <hr />

        <div>
          <p class="subtitle">Lists</p>
          <div>
            <app-menu-list-item
              v-for="menuList in MENU_LISTS"
              :key="menuList.id"
              :list="menuList"
              :selected="menuList.id === appMenu.selectedList"
              :count="getMenuListCount(menuList.id)"
            />
          </div>
        </div>
      </div>

      <div
        class="flex flex-row items-center px-3 py-2 mt-7 rounded-md cursor-pointer lg:hover:bg-gray-200"
      >
        <font-awesome-icon icon="fa-solid fa-gear" />
        <p class="pl-3">Settings</p>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AppMenuTaskItem from './AppMenuTaskItem'
import AppMenuListItem from './AppMenuListItem'
import { MENU_TASKS, MENU_LISTS } from '../../utils/constants'
import { getFilteredData } from '@/utils/helpers'

export default {
  name: 'AppMenu',
  components: {
    'app-menu-task-item': AppMenuTaskItem,
    'app-menu-list-item': AppMenuListItem
  },
  data() {
    return {
      isMediumSizeScreen: false,
      MENU_TASKS,
      MENU_LISTS
    }
  },
  mounted() {
    window.addEventListener('resize', this.checkIsMediumSizeScreen)
    this.checkIsMediumSizeScreen()
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkIsMediumSizeScreen)
  },
  computed: {
    ...mapState(['appMenu', 'todo'])
  },
  methods: {
    ...mapActions(['toggleMenu']),
    checkIsMediumSizeScreen() {
      this.isMediumSizeScreen = window.innerWidth >= 768
    },
    getFilteredData,
    getMenuTaskCount(menuTask) {
      return this.getFilteredData(this.todo, menuTask).length
    },
    getMenuListCount(id) {
      return this.getFilteredData(this.todo, this.appMenu.selectedTask, id)
        .length
    }
  }
}
</script>

<style lang="postcss" scoped>
#appMenu {
  @apply w-screen h-screen fixed flex-col justify-between rounded-xl px-5 py-4 md:static md:w-[340px] md:h-full;
  background-color: #f4f4f4;
  overflow-x: hidden;
  overflow-y: auto;
}

hr {
  @apply border-gray-200 my-4;
}

.title {
  @apply text-xl font-semibold;
}

.subtitle {
  @apply font-semibold uppercase pb-2 tracking-wide text-[13px];
}
</style>
