import ChatActions from '~/components/chat/chatMessenger/ChatActions.vue'
import {fireEvent, render, screen, user} from '~/test-util'
import flushPromises from 'flush-promises'

const renderChatActions = (options= {}) => {
  return render(ChatActions, options)
}

const getInputSend = () => {
  return screen.getByPlaceholderText('Сообщение')
}
const getButtonSend = () => {
  return screen.getByTestId('action-send')
}

describe('render ChatActions', () => {
  it('default render elements', () => {
    renderChatActions()

    const inputSend = getInputSend()
    const buttonSend = getButtonSend()

    expect(inputSend).toBeInTheDocument()
    expect(buttonSend).toBeInTheDocument()
  })

  it('when disabled button', () => {
    renderChatActions({
      props: {
        disabled: true,
      },
    })

    const buttonSend = getButtonSend()

    expect(buttonSend).toBeInTheDocument()
    expect(buttonSend).toHaveClass('v-btn--disabled')
  })

  it('when input message and send', async () => {
    const {emitted} = renderChatActions()
    const inputSend = getInputSend()
    const buttonSend = getButtonSend()

    await fireEvent.update(inputSend, 'Test message')

    expect(inputSend).toHaveValue('Test message')

    await user.click(buttonSend)
    await flushPromises()

    expect(emitted().sendMessage[0]).toEqual([{message:'Test message'}])
  })
})
