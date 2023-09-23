<template>
  <div id="appMenu">
    <div>
      <p class="title">Menu</p>

      <hr />

      <div>
        <p class="subtitle">Tasks</p>
        <div>
          <app-menu-task-item
            v-for="menuTask in MENU_TASKS"
            :key="menuTask.id"
            :task="menuTask"
            :selected="menuTask.id === appMenu.selectedTask"
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
          />
        </div>
      </div>
    </div>

    <div
      class="flex flex-row items-center px-3 py-2 rounded-md cursor-pointer hover:bg-gray-200"
    >
      <font-awesome-icon icon="fa-solid fa-gear" />
      <p class="pl-3">Settings</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AppMenuTaskItem from './AppMenuTaskItem.vue'
import AppMenuListItem from './AppMenuListItem.vue'
import { MENU_TASKS, MENU_LISTS } from '../../helpers/constants'

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
    ...mapState(['appMenu'])
  }
}
</script>

<style lang="postcss" scoped>
#appMenu {
  @apply flex flex-col justify-between rounded-xl px-5 py-4 h-full;
  background-color: #f4f4f4;
  width: 340px;
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
