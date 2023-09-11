import { render } from '@testing-library/vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import AllRules from '@vee-validate/rules'
import { defineRule } from 'vee-validate'

const vuetify = createVuetify({
  components,
  directives,
})

const locales = () => {
  Object.keys(AllRules).forEach((rule) => defineRule(rule, AllRules[rule]))
}

export const user = userEvent.setup()
export const customRender = (ui: any, overrides?: any) => {
  return render(ui, {
    ...overrides,
    global: {
      ...(overrides?.global || {}),
      plugins: [
        [vuetify],
        locales,
        ...(overrides?.global?.plugins || []),
      ],
    },
  })
}

export * from '@testing-library/vue'
export { customRender as render }
