<template>
  <transition name="modal-fade">
    <div v-if="open">
      <!-- For modal backdrop -->
      <div
        class="absolute inset-0 bg-black opacity-30 flex justify-center items-center z-40"
      />

      <div
        class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center z-50"
      >
        <div
          class="relative h-auto max-h-[80%] w-[85%] md:w-[70%] xl:w-[55%] 2xl:w-[40%] overflow-x-hidden overflow-y-auto bg-white z-50 p-5 rounded-md"
        >
          <!-- Modal title -->
          <div class="flex flex-row justify-between items-center">
            <p class="text-2xl font-semibold">{{ title }}</p>
            <font-awesome-icon
              class="text-2xl text-gray-700 hover:text-gray-900 cursor-pointer ml-3"
              :class="[noFooter ? 'block' : 'hidden']"
              icon="fa-solid fa-xmark"
              title="Close"
              @click="onCancel()"
            />
          </div>

          <!-- Modal body -->
          <div class="my-5">
            <slot />
          </div>
          <!-- Modal footer -->
          <div
            class="w-full flex justify-end items-center"
            :class="{ hidden: noFooter }"
          >
            <app-primary-button class="mr-3" :onclick="() => onSubmit()">{{
              submitButtonName
            }}</app-primary-button>
            <app-secondary-button :onclick="() => onCancel()"
              >Cancel</app-secondary-button
            >
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import AppPrimaryButton from './AppPrimaryButton'
import AppSecondaryButton from './AppSecondaryButton'

export default {
  name: 'AppModal',
  props: {
    open: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Modal'
    },
    submitButtonName: {
      type: String,
      default: 'Submit'
    },
    noFooter: {
      type: Boolean,
      default: false
    },
    onSubmit: {
      type: Function,
      default: null
    },
    onCancel: {
      type: Function,
      default: null
    }
  },
  components: {
    'app-primary-button': AppPrimaryButton,
    'app-secondary-button': AppSecondaryButton
  }
}
</script>

<style scoped></style>
