import {App} from '@vue/runtime-core'

const filesLayouts = require.context('.', true, /\.vue$/i)

export default {
  install(app: App) {
    const globalLayouts = filesLayouts.keys().filter((key) => key.split('/').length === 2)
    globalLayouts.map((key: string) => {
        return app.component(
          filesLayouts(key).default.name || 'defaultName',
          filesLayouts(key).default,
        )
      },
    )
  },
}
