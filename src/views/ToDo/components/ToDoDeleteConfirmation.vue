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
        The following task{{
          Array.isArray(data) && data.length > 1 ? 's' : ''
        }}
        will be deleted
      </p>
      <hr />

      <div v-if="!Array.isArray(data)">
        <todo-delete-confirmation-data :todo="data" />
      </div>

      <div v-else>
        <div v-for="todoId in data" :key="todoId">
          <todo-delete-confirmation-data :todo="getToDoById(todoId)" />
        </div>
      </div>
    </div>

    <p class="mt-5">Please click on confirm to continue</p>
  </modal>
</template>

<script>
import { mapState } from 'vuex'
import AppModal from '@/components/AppModal'
import ToDoDeleteConfirmationData from './ToDoDeleteConfirmationData'

export default {
  name: 'ToDoDeleteConfirmation',
  components: {
    modal: AppModal,
    'todo-delete-confirmation-data': ToDoDeleteConfirmationData
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
  },
  computed: {
    ...mapState({ todoList: 'todo' })
  },
  methods: {
    getToDoById(id) {
      return this.todoList.find((todo) => todo.id === id)
    }
  }
}
</script>

<style scoped></style>
