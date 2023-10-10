import Chat from '~/components/chat/Chat.vue'
import { render, screen, user } from '~/test-util'
import {computed} from 'vue'

window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }))

const renderChat = (options = {}) => {
  return render(Chat, options)
}
const getChatButtonElement = () => {
  return screen.getByTestId('chat-btn')
}
const getChatMenu = () => {
  return screen.queryByTestId('chat-menu')
}
const getChatNavigationDrawer = () => {
  return screen.queryByTestId('chat-drawer')
}
const getCloseChatBtnNavigationDrawer = () => {
  return screen.queryByTestId('close-chat-drawer')
}


test('render btn chat', () => {
  renderChat()
  const findChatBtn = getChatButtonElement()

  expect(findChatBtn).toBeInTheDocument()
})

describe('renderer chat', () => {
  describe('when display desktop', () => {
    it('when click btn chat',async () => {
      renderChat()

      expect(getChatMenu()).toBe(null)

      await user.click(getChatButtonElement())
      expect(getChatMenu()).toBeInTheDocument()

      const overlaysModal = document.getElementsByClassName('v-overlay__content')

      if (overlaysModal.length) {
        await user.click(getChatButtonElement())
        expect(overlaysModal[0]).toHaveStyle('display: none;')

        await user.click(getChatButtonElement())
        expect(overlaysModal[0]).not.toHaveStyle('display: none;')

        await user.click(getChatButtonElement().parentElement as HTMLElement)
        expect(overlaysModal[0]).toHaveStyle('display: none;')
      }
    })
  })

  describe('when display mobile', () => {
    it('when click btn chat',async () => {
      const onCloseDrawer = jest.fn()
      const chat = renderChat({
        global: {
          mocks: {
            isMobile: computed(() => true),
            closeDrawer: onCloseDrawer,
          },
        },
      })

      expect(getChatNavigationDrawer()).toBeInTheDocument()
      expect(getChatNavigationDrawer()).toHaveStyle('transition: none;')

      await user.click(getChatButtonElement())

      expect(getChatNavigationDrawer()).toBeInTheDocument()
      expect(getChatNavigationDrawer()).not.toHaveStyle('transition: none;')
      expect(getCloseChatBtnNavigationDrawer()).toBeInTheDocument()

      await user.click(getCloseChatBtnNavigationDrawer() as HTMLElement)

      expect(onCloseDrawer).toHaveBeenCalled()
    })
  })
})
