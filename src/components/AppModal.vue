<template>
  <div>
    <!-- For modal backdrop -->
    <transition name="fade" appear>
      <div
        v-if="open"
        class="fixed flex justify-center items-center bg-black inset-0 opacity-[0.5] z-[998]"
      />
    </transition>

    <transition name="bounce" appear>
      <div
        v-if="open"
        class="fixed flex justify-center items-center overflow-x-hidden overflow-y-auto inset-0 z-[999]"
      >
        <div
          class="relative h-auto max-h-[95%] w-[85%] bg-white p-5 rounded-md overflow-x-hidden overflow-y-auto z-[999] md:w-[70%] xl:w-[55%] 2xl:w-[40%] boxShadow"
        >
          <!-- Modal title -->
          <div
            v-if="!noHeader"
            class="flex flex-row justify-between items-center"
          >
            <p class="text-2xl font-semibold">{{ title }}</p>
            <font-awesome-icon
              v-if="noFooter"
              class="ml-3 text-2xl text-gray-700 cursor-pointer lg:hover:text-gray-900"
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
          <div v-if="!noFooter" class="w-full flex justify-end items-center">
            <app-primary-button class="mr-3" :onclick="() => onSubmit()">{{
              submitButtonName
            }}</app-primary-button>
            <app-secondary-button :onclick="() => onCancel()"
              >Cancel</app-secondary-button
            >
          </div>
        </div>
      </div>
    </transition>
  </div>
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
    noHeader: {
      type: Boolean,
      default: false
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

<style scoped>
.boxShadow {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.fade-enter-active {
  transition: opacity 0.3s ease;
}

.fade-leave-active {
  transition: opacity 0.8s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
