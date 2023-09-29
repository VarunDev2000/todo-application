import { renderWrapper } from '@/utils/test/render'
import { DATA_TEST_ID } from '@/utils/test/data-test-ids'
import { state } from '@/store/state'
import App from '@/App'
import AppMenu from '@/components/AppMenu'

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
    expect(
      wrapper.find(`[data-test="${DATA_TEST_ID.APP_MENU}"]`).exists()
    ).toBe(true)
  })
})
