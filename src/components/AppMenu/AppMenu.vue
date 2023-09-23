<template>
  <div id="appMenu">
    <div>
      <p class="title">Menu</p>

      <hr />

      <div>
        <p class="subtitle">Tasks</p>
        <div>
          <app-menu-task-item name="All" icon="fa-list" count="14" />
          <app-menu-task-item name="Today" icon="fa-calendar-day" count="2" />
          <app-menu-task-item
            name="Upcoming"
            icon="fa-calendar-week"
            count="10"
          />
          <app-menu-task-item name="Completed" icon="fa-check" count="2" />
        </div>
      </div>

      <hr />

      <div>
        <p class="subtitle">Lists</p>
        <div>
          <app-menu-list-item name="Personal" color="#f05959" count="10" />
          <app-menu-list-item name="Work" color="#8400ff" count="3" />
          <app-menu-list-item name="Other" color="#3a55c9" count="1" />
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
import AppMenuTaskItem from './AppMenuTaskItem.vue'
import AppMenuListItem from './AppMenuListItem.vue'

export default {
  name: 'AppMenu',
  components: {
    'app-menu-task-item': AppMenuTaskItem,
    'app-menu-list-item': AppMenuListItem
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
