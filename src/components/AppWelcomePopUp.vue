<template>
  <modal :open="modal.showWelcomeModal" noHeader noFooter>
    <div class="flex flex-col justify-center items-center bg-white text-sm">
      <p class="text-4xl font-semibold mb-5">Hello there👋</p>
      <img src="@/assets/images/rocket.gif" class="md:w-[270px] md:h-[200px]" />

      <p class="text-xl font-semibold mt-3 mb-4">Welcome to To Do App🙏</p>
      <p class="max-w-[90%] mb-5">
        You can create and manage all your to do stuff with this app. For a
        start we have added some example todo tasks to your queue.
      </p>
      <p class="mb-8">Again welcome to have you onboard, have a look around!</p>
      <app-primary-button
        class="w-auto text-[15px] rounded-lg px-7 py-3"
        :onclick="() => closeWelcomePopUpModal()"
        >Let's go🔥</app-primary-button
      >
    </div>
  </modal>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AppModal from '@/components/AppModal'
import AppPrimaryButton from '@/components/AppPrimaryButton'

export default {
  name: 'AppWelcomePopUp',
  components: {
    modal: AppModal,
    'app-primary-button': AppPrimaryButton
  },
  computed: {
    ...mapState({ todoList: 'todo' }),
    ...mapState(['modal'])
  },
  methods: {
    ...mapActions(['toggleModal']),
    closeWelcomePopUpModal() {
      this.toggleModal({
        name: 'showWelcomeModal',
        value: false
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
p {
  @apply text-center;
}
</style>
