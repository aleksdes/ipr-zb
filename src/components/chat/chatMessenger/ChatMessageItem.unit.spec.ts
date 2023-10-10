import ChatMessageItem from '~/components/chat/chatMessenger/ChatMessageItem.vue'
import {fireEvent, render, screen, user} from '~/test-util'
import flushPromises from 'flush-promises'
import {computed} from 'vue'
import moment from 'moment'

const renderChatMessageItem = (options= {}) => {
  return render(ChatMessageItem, options)
}

const testDataMessage = {
  author: {
    id: 1,
    name: 'Test name',
  },
  timestamp: 1696937095,
  text: 'Testing text',
}

const getDateByTimestamp = () => {
  return moment(testDataMessage.timestamp).format('DD.MM.YYYY hh:mm')
}

describe('render ChatMessageItem', () => {
  it('when author message', () => {
    renderChatMessageItem({
      props: {
        item: testDataMessage,
      },
      global: {
        mocks: {
          userId: computed(() => 1),
        },
      },
    })

    const nameElement = screen.getByText(testDataMessage.author.name)
    const textElement = screen.getByText(testDataMessage.text)
    const dateElement = screen.getByText(getDateByTimestamp())

    expect(nameElement).toBeInTheDocument()
    expect(textElement).toBeInTheDocument()
    expect(dateElement).toBeInTheDocument()
    expect(nameElement).not.toHaveClass('message__author--other')
  })

  it('when not author message', () => {
    const dataMessage = testDataMessage
    dataMessage.author.id = 3

    renderChatMessageItem({
      props: {
        item: dataMessage,
      },
      global: {
        mocks: {
          userId: computed(() => 1),
        },
      },
    })

    const nameElement = screen.getByText(testDataMessage.author.name)

    expect(nameElement).toBeInTheDocument()
    expect(nameElement).toHaveClass('message__author--other')
  })
})
