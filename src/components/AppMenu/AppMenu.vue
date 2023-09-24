<template>
  <div id="appMenu" :class="[appMenu.isMenuOpen ? 'flex' : 'hidden']">
    <div>
      <div class="flex flex-row justify-between items-center">
        <p class="title">Menu</p>
        <font-awesome-icon
          class="md:hidden text-2xl text-gray-700 hover:text-gray-900 cursor-pointer ml-3"
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
            :count="getMenuTaskCount(menuTask.menuTask)"
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
      class="flex flex-row items-center px-3 py-2 mt-7 rounded-md cursor-pointer hover:bg-gray-200"
    >
      <font-awesome-icon icon="fa-solid fa-gear" />
      <p class="pl-3">Settings</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AppMenuTaskItem from './AppMenuTaskItem'
import AppMenuListItem from './AppMenuListItem'
import { MENU_TASKS, MENU_LISTS } from '../../helpers/constants'
import { formatDate } from '@/helpers/date'

export default {
  name: 'AppMenu',
  components: {
    'app-menu-task-item': AppMenuTaskItem,
    'app-menu-list-item': AppMenuListItem
  },
  data() {
    return {
      MENU_TASKS,
      MENU_LISTS
    }
  },
  computed: {
    ...mapState(['appMenu', 'todo'])
  },
  methods: {
    ...mapActions(['toggleMenu']),
    getMenuTaskCount(menuTask) {
      var count = 0
      switch (menuTask) {
        case 'All':
          count = this.todo.length
          break
        case 'Pending':
          this.todo.forEach((todo) => {
            if (todo?.completed === false) {
              count++
            }
          })
          break
        case 'Completed':
          this.todo.forEach((todo) => {
            if (todo?.completed === true) {
              count++
            }
          })
          break
        case 'Today':
          this.todo.forEach((todo) => {
            if (todo?.date === formatDate(new Date())) {
              count++
            }
          })
          break
        case 'Upcoming':
          this.todo.forEach((todo) => {
            if (
              todo?.date !== formatDate(new Date()) &&
              new Date(todo?.date) > new Date()
            ) {
              count++
            }
          })
          break
        default:
          count = '-'
          break
      }

      return count
    },
    getMenuListCount(id) {
      var count = 0
      for (var i = 0; i < MENU_LISTS.length; i++) {
        if (MENU_LISTS[i].id === id) {
          this.todo.forEach((todo) => {
            if (todo?.list === id) {
              count++
            }
          })
        }
      }
      return count
    }
  }
}
</script>

<style lang="postcss" scoped>
#appMenu {
  @apply w-screen h-screen  md:flex flex-col justify-between rounded-xl px-5 py-4 md:w-[340px] md:h-full;
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
  @apply font-semibold uppercase pb-2 tracking-wide;
  font-size: 13px;
}
</style>
