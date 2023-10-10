import { render } from '@testing-library/vue'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import AllRules from '@vee-validate/rules'
import { defineRule } from 'vee-validate'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { VuetifyLayoutKey } from 'vuetify/lib/composables/layout.mjs'

const vuetify= createVuetify({
  components,
  directives,
})

const locales = () => {
  Object.keys(AllRules).forEach((rule) => defineRule(rule, AllRules[rule]))
}
const getOptions = (overrides?: any) => {
  return {
    ...overrides,
    global: {
      ...(overrides?.global || {}),
      provide: {
        [VuetifyLayoutKey]: {
          mainStyles: {value: ''},
          register: () => ({
            layoutItemStyles: {value: {top: 0}},
          }),
          unregister: () => ({}),
        },
      },
      plugins: [
        createTestingPinia,
        [vuetify],
        locales,
        ...(overrides?.global?.plugins || []),
      ],
    },
  }
}

export const user = userEvent.setup()
export const customRender = (ui: any, overrides?: any) => {
  return render(ui, getOptions(overrides))
}

export const customRenderWithUtils = (ui: any, overrides?: any) => {
  return mount(ui, getOptions(overrides))
}

export * from '@testing-library/vue'
export { customRender as render }
export { customRenderWithUtils as renderUtils }
