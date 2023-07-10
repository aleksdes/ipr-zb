import {App} from '@vue/runtime-core'
import { defineAsyncComponent } from 'vue'

const filesLayouts = require.context('.', true, /\.vue$/i)
console.log('filesLayouts', filesLayouts)

export default {
  install(app: App) {
    const globalLayouts = filesLayouts.keys().filter((key) => key.split('/').length === 2)
    globalLayouts.map((key: string) =>
      app.component(
        key?.split('/')?.pop()?.split('.')[0] || 'defaultName',
        filesLayouts(key).default))
  },
}
