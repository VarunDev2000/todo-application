import { renderWrapper } from '@/utils/test/render'
import { state } from '@/store/state'
import App from '@/App'
import AppMenu from '@/components/AppMenu/AppMenu'

describe('App.vue', () => {
  it('should render app menu', async () => {
    const wrapper = renderWrapper(
      App,
      {
        stubs: {
          'app-menu': AppMenu
        }
      },
      {
        state: {
          ...state,
          appMenu: {
            ...state.appMenu,
            isMenuOpen: true
          }
        }
      }
    )
    expect(wrapper.find('[data-test="app-menu"]').exists()).toBe(true)
  })
})
