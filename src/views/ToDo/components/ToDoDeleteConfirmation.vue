<template>
  <modal
    :open="open"
    title="⚠️Warning"
    submitButtonName="Confirm"
    :onSubmit="onConfirm"
    :onCancel="onCancel"
  >
    <div>
      <p class="mb-5">
        The following task{{ data?.isArray ? 's' : '' }}
        will be deleted
      </p>
      <hr />

      <div v-if="!Array.isArray(data)"><ToBeDeletedData :todo="data" /></div>

      <div v-else>
        <div v-for="todo in data" :key="todo?.id">
          <tobe-deleted-data :todo="todo" />
        </div>
      </div>
    </div>

    <p class="mt-5">Please click on confirm to continue</p>
  </modal>
</template>

<script>
import Vue from 'vue'
import AppModal from '@/components/AppModal'

const ToBeDeletedData = Vue.component('ToBeDeletedData', {
  props: {
    todo: {
      type: Object,
      default: null
    }
  },
  template: `<div>
    <p class="w-full mx-3 py-3">
          {{ todo?.task }}
        </p>

        <div class="pl-7 pr-4 pb-3 text-[13px]">
          <p>{{ todo?.description }}</p>

          <div class="flex flex-row mt-2">
            <div class="flex flex-row items-center">
              <font-awesome-icon
                style="margin-bottom: 2px"
                icon="fa-solid fa-calendar-xmark"
                title="Due date"
              />
              <p class="text-black ml-2">{{ todo?.date }}</p>
            </div>
            <!-- <div
              class="flex flex-row mt-2 items-center md:justify-center md:mt-0 md:ml-12"
            >
              <p
                class="w-3 h-3 text-black rounded-md"
                :style="{ backgroundColor: list?.color }"
              />
              <p class="ml-2">{{ list?.name }}</p>
            </div> -->
          </div>
        </div>
        <hr />
    </div>`
})

export default {
  name: 'ToDoDeleteConfirmation',
  components: {
    modal: AppModal,
    'tobe-deleted-data': ToBeDeletedData
  },
  props: {
    data: {
      type: [Object, Array],
      default: null
    },
    open: {
      type: Boolean,
      default: true
    },
    onConfirm: {
      type: Function,
      default: null
    },
    onCancel: {
      type: Function,
      default: null
    }
  }
}
</script>

<style scoped></style>
