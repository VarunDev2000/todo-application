<template>
  <modal
    :open="open"
    title="Create task"
    submitButtonName="Create"
    noFooter
    :onSubmit="onConfirm"
    :onCancel="onCancel"
  >
    <slot />
  </modal>
</template>

<script>
import AppModal from '@/components/AppModal'

export default {
  name: 'ToDoCUDItemPopUpForm',
  components: {
    modal: AppModal
  },
  props: {
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
