import { APP_STORAGE_KEY } from '@/utils/constants'

const localStoragePlugin = (store) => {
  store.subscribe((mutation, state) => {
    const persistedData = {
      todo: state.todo,
      modal: { showWelcomeModal: state.modal.showWelcomeModal }
    }

    localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(persistedData))
  })
}

export default [localStoragePlugin]
