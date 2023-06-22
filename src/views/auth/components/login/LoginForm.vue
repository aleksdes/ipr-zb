<template>
  <v-form
    v-model='valid'
    class='login-form'
  >
    <Field
      v-slot='{ errors, field }'
      v-model='email'
      rules='required'
      name='email'
    >
      <v-text-field
        :model-value='email'
        v-bind='field'
        label='Логин'
        placeholder='Логин'
        required
        clearable
        :error-messages='errors'
        dense
        outlined
      />
    </Field>

    <Field
      v-slot='{ errors, field }'
      v-model='password'
      rules='required|min:4'
      name='password'
    >
      <v-text-field
        :model-value='password'
        v-bind='field'
        label='Пароль'
        placeholder='Пароль'
        required
        dense
        outlined
        clearable
        :error-messages='errors'
        :append-icon='passwordIsVisible ? "mdi-eye" : "mdi-eye-off"'
        :type='passwordIsVisible ? "text" : "password"'
        @click:append='passwordIsVisible = !passwordIsVisible'
      />
    </Field>

    <v-btn
      class='login-form-btn d-block white--text text-none w-100'
      color='light-blue'
      height='40'
      elevation='0'
      :disabled='!meta.valid'
      @click='sendLogin'
    >
      Вход
    </v-btn>
  </v-form>
</template>

<script lang="ts">
export default {
  name: 'LoginForm',
}
</script>

<script setup lang='ts'>
import {computed, ref} from 'vue'
import {useRouter} from 'vue-router'
import Auth from '@/assets/js/helpers/auth'
import {useForm, Form, Field} from 'vee-validate'
import { notify } from '@/assets/js/helpers/useNotify'
import { routeNames } from '@/router/RouteNames'

const { meta } = useForm()

const email = ref('kminchelle')
const password = ref('0lelplR')
const valid = ref(false)
const passwordIsVisible = ref(false)

const router = useRouter()

const sendLogin = async () => {
  if (!meta.value.valid) return
  const isValidateForm = true
  if (isValidateForm) {
    const dataLogin = {
      username: email.value,
      password: password.value,
    }

    const { errors }: any = await Auth.login(dataLogin)

    if (errors) {
      let notifyMessage = ''
      const status = errors?.response?.status

      if (status === 422 || status === 400) {
        notifyMessage = 'Неверный логин или пароль'
      } else {
        notifyMessage = 'Неизвестная ошибка. Попробуйте позже'
      }

      notify({ text: notifyMessage })
    } else {
      await router.push({
        name: routeNames.home,
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-form-btn {
  max-width: 207px;
  margin: 8px auto 24px;
}
</style>
