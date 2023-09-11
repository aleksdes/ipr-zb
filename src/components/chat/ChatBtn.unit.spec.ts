import ChatBtn from '~/components/chat/ChatBtn.vue'
import { render, screen, user } from '~/test-util'

const renderChatBtn = (active: boolean ) => {
  return render(ChatBtn, {
    props: {
      active,
    },
  })
}

const getChatBtn = () => {
  return screen.getByTestId('chat-btn')
}

const getChatBtnIcon = () => {
  return screen.getByTestId('chat-btn-icon')
}

describe('render ChatBtn', () => {
  it('when props active', () => {
    renderChatBtn(true)
    const chatBtnIcon= getChatBtnIcon()

    expect(chatBtnIcon).toHaveClass('mdi-window-close mdi')
  })

  it('when props not active', () => {
    renderChatBtn(false)
    const chatBtnIcon= getChatBtnIcon()

    expect(chatBtnIcon).toHaveClass('mdi-message mdi')
  })
})

test('click by ChatBtn', async () => {
  const render = renderChatBtn(false)
  const chatBtn= getChatBtn()

  await user.click(chatBtn)

  expect(render.emitted('onClick')).toBeTruthy()
})
