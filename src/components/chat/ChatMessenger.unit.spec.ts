import ChatMessenger from '~/components/chat/ChatMessenger.vue'
import { render, screen, user } from '~/test-util'

const renderChatMessenger = ({ props = {}, slots = {} }) => {
  return render(ChatMessenger, {
    props,
    slots,
  })
}

describe('render ChatMessenger', () => {
  it('with default emptyMessage', () => {
    const defaultEmptyText = 'Задайте вопросы'
    renderChatMessenger({props: {emptyMessage: defaultEmptyText}})

    const findElementByText = screen.getByText(defaultEmptyText)

    expect(findElementByText).toBeInTheDocument()
  })

  it('with custom slot empty', () => {
    const slotEmpty = '<p data-tid="slot-empty">Свяжитесь с нами</p>'
    renderChatMessenger({slots: {
        empty: slotEmpty,
      }})

    const findElement = screen.getByTestId('slot-empty')

    expect(findElement).toBeInTheDocument()
    screen.debug()
  })
})
