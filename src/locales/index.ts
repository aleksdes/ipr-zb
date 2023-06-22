import { localize } from '@vee-validate/i18n'
import AllRules from '@vee-validate/rules'
import { configure, defineRule  } from 'vee-validate'
import ru from '@vee-validate/i18n/dist/locale/ru.json'

const locales = () => {
  Object.keys(AllRules).forEach((rule) => defineRule(rule, AllRules[rule]))

  configure({
    generateMessage: localize({
      ru,
    }),
  })
}
export default locales
