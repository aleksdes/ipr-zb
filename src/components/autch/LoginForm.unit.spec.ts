import LoginForm from '~/components/autch/LoginForm.vue'
import { render, screen, fireEvent } from '~/test-util'
import flushPromises from 'flush-promises'

const labelsElement = {
  login: 'Логин',
  password: 'Пароль',
}
const  renderForm = () => {
  return render(LoginForm)
}
const getInputByLabelElement = (label: string) => {
  return screen.getByLabelText(label)
}
const getButtonElement = () => {
  return screen.getByText('Вход').parentElement
}

describe('rendering all element', () => {
  it('init', () => {
    renderForm()

    expect(getInputByLabelElement(labelsElement.login)).toBeInTheDocument()
    expect(getInputByLabelElement(labelsElement.password)).toBeInTheDocument()
    expect(getButtonElement()).toBeInTheDocument()
  })
})

describe('rendering button', () => {
  it('when login empty', async () => {
    renderForm()

    await fireEvent.update(getInputByLabelElement(labelsElement.login), '')

    expect(getInputByLabelElement(labelsElement.login)).toHaveValue('')
    await flushPromises()
    expect(getButtonElement()).toHaveClass('v-btn--disabled')
  })

  it('when password empty', async () => {
    renderForm()

    await fireEvent.update(getInputByLabelElement(labelsElement.password), '')

    expect(getInputByLabelElement(labelsElement.password)).toHaveValue('')
    await flushPromises()
    expect(getButtonElement()).toHaveClass('v-btn--disabled')
  })

  it('when password and login filled', async () => {
    renderForm()

    await fireEvent.update(getInputByLabelElement(labelsElement.password), 'test@email.ru')
    await fireEvent.update(getInputByLabelElement(labelsElement.password), 'testpassword')

    await flushPromises()
    expect(getButtonElement()).not.toHaveClass('v-btn--disabled')
  })
})
