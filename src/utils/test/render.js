import Vuex from 'vuex'
import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import { isNullOrEmpty } from '@/utils/helpers'

const localVue = createLocalVue()

localVue.use(Vuex)

const makeTestStore = (customStore) => {
  const store = new Vuex.Store(customStore)
  return store
}

export const renderWrapper = (component, data = {}, customStore = {}) => {
  let wrapper = null
  const store = makeTestStore(customStore)

  if (isNullOrEmpty(customStore)) {
    wrapper = mount(component, { ...data })
  } else {
    wrapper = shallowMount(component, { ...data, store, localVue })
  }

  return wrapper
}
